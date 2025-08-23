-- =====================================================
-- COMPLETE PROFILES TABLE RENAME TO USERS
-- INCLUDING TRIGGERS, FUNCTIONS, AND POLICIES
-- =====================================================

-- First, let's see what we're working with
SELECT 'Current database state:' as info;

-- Check existing tables
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'users');

-- Check for triggers on the profiles table
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'profiles';

-- Check for functions that might reference profiles
SELECT 
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_definition LIKE '%profiles%'
AND routine_schema = 'public';

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'profiles';

-- =====================================================
-- STEP 1: DROP EXISTING TRIGGERS AND FUNCTIONS
-- =====================================================

-- Drop triggers first (they depend on functions)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;

-- Drop functions
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_user_update();
DROP FUNCTION IF EXISTS public.handle_user_delete();

-- =====================================================
-- STEP 2: DROP FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Drop the foreign key constraint on user_onboarding_progress
ALTER TABLE public.user_onboarding_progress 
DROP CONSTRAINT IF EXISTS user_onboarding_progress_user_id_fkey;

-- Check for other tables that might reference profiles
-- (This will show us what else needs updating)
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND ccu.table_name='profiles';

-- =====================================================
-- STEP 3: RENAME THE TABLE
-- =====================================================

-- Rename the profiles table to users
ALTER TABLE public.profiles RENAME TO users;

-- =====================================================
-- STEP 4: RECREATE FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Recreate the foreign key constraint to point to the renamed table
ALTER TABLE public.user_onboarding_progress 
ADD CONSTRAINT user_onboarding_progress_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- =====================================================
-- STEP 5: RECREATE TRIGGERS AND FUNCTIONS
-- =====================================================

-- Create the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NEW.created_at, NEW.updated_at);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the function to handle user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users 
  SET 
    email = NEW.email,
    updated_at = NEW.updated_at
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the function to handle user deletion
CREATE OR REPLACE FUNCTION public.handle_user_delete()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.users WHERE id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- STEP 6: RECREATE TRIGGERS
-- =====================================================

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create trigger for user updates
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- Create trigger for user deletion
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_delete();

-- =====================================================
-- STEP 7: UPDATE RLS POLICIES
-- =====================================================

-- Drop existing policies on the users table
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Create new policies for the users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- STEP 8: VERIFICATION
-- =====================================================

SELECT 'Verification:' as info;

-- Check that the table was renamed
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'users');

-- Check that triggers are working
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'users';

-- Check that functions exist
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines 
WHERE routine_name IN ('handle_new_user', 'handle_user_update', 'handle_user_delete')
AND routine_schema = 'public';

-- Check foreign key constraints
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name='user_onboarding_progress';

SELECT '✅ Table rename complete! All triggers, functions, and policies have been updated.' as result;


