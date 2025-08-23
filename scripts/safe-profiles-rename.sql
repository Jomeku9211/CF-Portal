-- =====================================================
-- SAFE PROFILES TABLE RENAME TO USERS
-- HANDLES ORPHANED DATA AND EXISTING CONSTRAINTS
-- =====================================================

-- First, let's see what we're working with
SELECT 'Current database state:' as info;

-- Check existing tables
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'users');

-- Check for orphaned records in user_onboarding_progress
SELECT 'Checking for orphaned records...' as info;

SELECT 
    uop.user_id,
    uop.id as progress_id,
    CASE 
        WHEN p.id IS NOT NULL THEN '✅ Profile exists'
        WHEN au.id IS NOT NULL THEN '⚠️  Auth user exists but no profile'
        ELSE '❌ No auth user found'
    END as status
FROM user_onboarding_progress uop
LEFT JOIN profiles p ON uop.user_id = p.id
LEFT JOIN auth.users au ON uop.user_id = au.id
ORDER BY status;

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
    routine_type
FROM information_schema.routines 
WHERE routine_definition LIKE '%profiles%'
AND routine_schema = 'public';

-- =====================================================
-- STEP 1: CLEAN UP ORPHANED DATA
-- =====================================================

-- Remove orphaned onboarding progress records (users that don't exist in auth.users)
DELETE FROM user_onboarding_progress 
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- Remove orphaned onboarding progress records (users that don't exist in profiles)
DELETE FROM user_onboarding_progress 
WHERE user_id NOT IN (SELECT id FROM profiles);

-- =====================================================
-- STEP 2: DROP EXISTING TRIGGERS AND FUNCTIONS
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
-- STEP 3: DROP FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Drop the foreign key constraint on user_onboarding_progress
ALTER TABLE public.user_onboarding_progress 
DROP CONSTRAINT IF EXISTS user_onboarding_progress_user_id_fkey;

-- =====================================================
-- STEP 4: RENAME THE TABLE
-- =====================================================

-- Rename the profiles table to users
ALTER TABLE public.profiles RENAME TO users;

-- =====================================================
-- STEP 5: RECREATE FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Recreate the foreign key constraint to point to the renamed table
ALTER TABLE public.user_onboarding_progress 
ADD CONSTRAINT user_onboarding_progress_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- =====================================================
-- STEP 6: RECREATE TRIGGERS AND FUNCTIONS
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
-- STEP 7: RECREATE TRIGGERS
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
-- STEP 8: UPDATE RLS POLICIES
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
-- STEP 9: SYNC EXISTING AUTH USERS
-- =====================================================

-- Create profiles for any auth users that don't have them yet
INSERT INTO public.users (id, email, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    au.created_at,
    au.updated_at
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL;

-- =====================================================
-- STEP 10: VERIFICATION
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

-- Final data integrity check
SELECT 'Final data integrity check:' as info;

SELECT 
    COUNT(*) as total_auth_users,
    (SELECT COUNT(*) FROM public.users) as total_profiles,
    (SELECT COUNT(*) FROM user_onboarding_progress) as total_onboarding_progress
FROM auth.users;

SELECT '✅ Safe table rename complete! All triggers, functions, and policies have been updated.' as result;


