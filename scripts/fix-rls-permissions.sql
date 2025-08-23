-- =====================================================
-- FIX RLS PERMISSIONS - CHECK AND REPAIR
-- =====================================================

-- First, let's see what RLS policies currently exist
SELECT '=== CURRENT RLS POLICIES ===' as info;

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
)
ORDER BY tablename, policyname;

-- Check RLS status on tables
SELECT '=== RLS STATUS ON TABLES ===' as info;

SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN rowsecurity THEN '✅ RLS ENABLED'
        ELSE '❌ RLS DISABLED'
    END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
)
ORDER BY tablename;

-- Check if the current user can access these tables
SELECT '=== CURRENT USER ACCESS TEST ===' as info;
SELECT 
    current_user as current_user_name,
    auth.uid() as auth_uid,
    auth.role() as auth_role;

-- =====================================================
-- STEP 1: DROP ALL EXISTING POLICIES
-- =====================================================

SELECT '=== DROPPING EXISTING POLICIES ===' as info;

-- Drop all policies on organizations
DROP POLICY IF EXISTS "Users can view own organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can update own organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can delete own organizations" ON public.organizations;

-- Drop all policies on user_onboarding_progress
DROP POLICY IF EXISTS "Users can view own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can create own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can update own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can delete own onboarding progress" ON public.user_onboarding_progress;

-- Drop all policies on users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- =====================================================
-- STEP 2: CREATE SIMPLIFIED POLICIES
-- =====================================================

SELECT '=== CREATING SIMPLIFIED POLICIES ===' as info;

-- Organizations: Allow authenticated users to create/view their own
CREATE POLICY "Enable insert for authenticated users" ON public.organizations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable select for users based on created_by" ON public.organizations
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Enable update for users based on created_by" ON public.organizations
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Enable delete for users based on created_by" ON public.organizations
  FOR DELETE USING (auth.uid() = created_by);

-- User onboarding progress: Allow authenticated users to manage their own
CREATE POLICY "Enable insert for authenticated users" ON public.user_onboarding_progress
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable select for users based on user_id" ON public.user_onboarding_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" ON public.user_onboarding_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id" ON public.user_onboarding_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Users table: Allow authenticated users to manage their own profile
CREATE POLICY "Enable insert for authenticated users" ON public.users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable select for users based on id" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on id" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- =====================================================
-- STEP 3: VERIFICATION
-- =====================================================

SELECT '=== VERIFICATION - POLICIES CREATED ===' as info;

SELECT 
    tablename,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename IN (
    'organizations',
    'user_onboarding_progress',
    'users'
)
GROUP BY tablename
ORDER BY tablename;

-- Test if we can now access the tables
SELECT '=== TESTING ACCESS ===' as info;
SELECT 'Run these commands to test access:' as note;

-- Test organizations table access
SELECT 'Test organizations access:' as test_type;
SELECT COUNT(*) as organizations_count FROM public.organizations;

-- Test user_onboarding_progress table access
SELECT 'Test onboarding progress access:' as test_type;
SELECT COUNT(*) as progress_count FROM public.user_onboarding_progress;

-- Test users table access
SELECT 'Test users table access:' as test_type;
SELECT COUNT(*) as users_count FROM public.users;

SELECT '✅ RLS policies simplified and should now work!' as result;


