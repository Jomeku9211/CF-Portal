-- =====================================================
-- NUCLEAR RLS DISABLE - FORCE DISABLE ALL SECURITY
-- =====================================================

-- This script will force-disable RLS and remove ALL security restrictions
-- Use this as a last resort when other methods fail

SELECT '=== NUCLEAR RLS DISABLE STARTING ===' as info;

-- =====================================================
-- STEP 1: FORCE DISABLE RLS ON ALL TABLES
-- =====================================================

SELECT '=== FORCE DISABLING RLS ===' as info;

-- Force disable RLS on all onboarding tables
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_onboarding_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_step_completions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: DROP ALL POLICIES WITH CASCADE
-- =====================================================

SELECT '=== DROPPING ALL POLICIES WITH CASCADE ===' as info;

-- Drop all policies on organizations (with CASCADE to remove dependencies)
DROP POLICY IF EXISTS "Users can view own organizations" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Users can create organizations" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Users can update own organizations" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Users can delete own organizations" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Enable select for users based on created_by" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Enable update for users based on created_by" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Enable delete for users based on created_by" ON public.organizations CASCADE;
DROP POLICY IF EXISTS "Users can manage their own organizations" ON public.organizations CASCADE;

-- Drop all policies on user_onboarding_progress
DROP POLICY IF EXISTS "Users can view own onboarding progress" ON public.user_onboarding_progress CASCADE;
DROP POLICY IF EXISTS "Users can create own onboarding progress" ON public.user_onboarding_progress CASCADE;
DROP POLICY IF EXISTS "Users can update own onboarding progress" ON public.user_onboarding_progress CASCADE;
DROP POLICY IF EXISTS "Users can delete own onboarding progress" ON public.user_onboarding_progress CASCADE;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_onboarding_progress CASCADE;
DROP POLICY IF EXISTS "Enable select for users based on user_id" ON public.user_onboarding_progress CASCADE;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.user_onboarding_progress CASCADE;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.user_onboarding_progress CASCADE;

-- Drop all policies on users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users CASCADE;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users CASCADE;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users CASCADE;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users CASCADE;
DROP POLICY IF EXISTS "Enable select for users based on id" ON public.users CASCADE;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users CASCADE;

-- =====================================================
-- STEP 3: CHECK FOR ANY REMAINING POLICIES
-- =====================================================

SELECT '=== CHECKING FOR REMAINING POLICIES ===' as info;

SELECT 
    schemaname,
    tablename,
    policyname,
    'REMAINING POLICY - REMOVE MANUALLY' as status
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
);

-- =====================================================
-- STEP 4: VERIFY RLS IS COMPLETELY DISABLED
-- =====================================================

SELECT '=== VERIFYING RLS IS COMPLETELY DISABLED ===' as info;

SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN rowsecurity THEN '❌ RLS STILL ENABLED - FORCE DISABLE'
        ELSE '✅ RLS DISABLED'
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

-- =====================================================
-- STEP 5: TEST ACCESS (SHOULD WORK NOW)
-- =====================================================

SELECT '=== TESTING ACCESS (SHOULD WORK NOW) ===' as info;

-- Test if we can now access the tables
SELECT 'Testing organizations access:' as test_type;
SELECT COUNT(*) as organizations_count FROM public.organizations;

SELECT 'Testing onboarding progress access:' as test_type;
SELECT COUNT(*) as progress_count FROM public.user_onboarding_progress;

SELECT 'Testing users table access:' as test_type;
SELECT COUNT(*) as users_count FROM public.users;

-- =====================================================
-- STEP 6: MANUAL POLICY REMOVAL (IF NEEDED)
-- =====================================================

SELECT '=== MANUAL POLICY REMOVAL INSTRUCTIONS ===' as info;
SELECT 'If you still see policies above, manually remove them:' as instruction;

-- This will show any remaining policies that need manual removal
SELECT 
    'DROP POLICY IF EXISTS "' || policyname || '" ON public.' || tablename || ' CASCADE;' as manual_remove_command
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
);

-- =====================================================
-- FINAL STATUS
-- =====================================================

SELECT '=== FINAL STATUS ===' as info;
SELECT 'RLS should now be COMPLETELY DISABLED on all onboarding tables' as status;
SELECT 'If you still see permission errors, there may be database-level restrictions' as note;
SELECT 'Test creating an organization in your app now!' as next_step;


