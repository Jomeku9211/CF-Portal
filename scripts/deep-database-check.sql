-- =====================================================
-- DEEP DATABASE DIAGNOSTIC - FIND THE ROOT CAUSE
-- =====================================================

-- This script will check for any database-level restrictions
-- that might be preventing access to tables

SELECT '=== DEEP DATABASE DIAGNOSTIC STARTING ===' as info;

-- =====================================================
-- STEP 1: CHECK TABLE OWNERSHIP AND PERMISSIONS
-- =====================================================

SELECT '=== CHECKING TABLE OWNERSHIP AND PERMISSIONS ===' as info;

SELECT 
    schemaname,
    tablename,
    tableowner,
    CASE 
        WHEN tableowner = 'postgres' THEN '✅ Postgres owned'
        WHEN tableowner = 'supabase_admin' THEN '✅ Supabase owned'
        ELSE '⚠️ Custom owner: ' || tableowner
    END as ownership_status
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
-- STEP 2: CHECK GRANT PERMISSIONS
-- =====================================================

SELECT '=== CHECKING GRANT PERMISSIONS ===' as info;

SELECT 
    table_schema,
    table_name,
    privilege_type,
    grantee,
    'GRANT INFO' as info
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND table_name IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
)
ORDER BY table_name, privilege_type;

-- =====================================================
-- STEP 3: CHECK RLS STATUS IN DETAIL
-- =====================================================

SELECT '=== CHECKING RLS STATUS IN DETAIL ===' as info;

SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE 
        WHEN rowsecurity THEN '❌ RLS ENABLED'
        ELSE '✅ RLS DISABLED'
    END as rls_status,
    'RLS DETAIL' as info
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
-- STEP 4: CHECK FOR ANY REMAINING POLICIES
-- =====================================================

SELECT '=== CHECKING FOR ANY REMAINING POLICIES ===' as info;

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    'POLICY DETAIL' as info
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
)
ORDER BY tablename, policyname;

-- =====================================================
-- STEP 5: CHECK DATABASE ROLE PERMISSIONS
-- =====================================================

SELECT '=== CHECKING DATABASE ROLE PERMISSIONS ===' as info;

SELECT 
    rolname,
    rolsuper,
    rolinherit,
    rolcreaterole,
    rolcreatedb,
    rolcanlogin,
    'ROLE PERMISSIONS' as info
FROM pg_roles 
WHERE rolname IN ('authenticated', 'anon', 'postgres', 'supabase_admin')
ORDER BY rolname;

-- =====================================================
-- STEP 6: CHECK SCHEMA PERMISSIONS
-- =====================================================

SELECT '=== CHECKING SCHEMA PERMISSIONS ===' as info;

SELECT 
    schema_name,
    schema_owner,
    'SCHEMA INFO' as info
FROM information_schema.schemata 
WHERE schema_name = 'public';

-- =====================================================
-- STEP 7: ATTEMPT TO FORCE DISABLE RLS AGAIN
-- =====================================================

SELECT '=== ATTEMPTING TO FORCE DISABLE RLS AGAIN ===' as info;

-- Try to disable RLS with more aggressive approach
DO $$
DECLARE
    table_record RECORD;
BEGIN
    FOR table_record IN 
        SELECT tablename 
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
    LOOP
        EXECUTE 'ALTER TABLE public.' || table_record.tablename || ' DISABLE ROW LEVEL SECURITY';
        RAISE NOTICE 'Disabled RLS on table: %', table_record.tablename;
    END LOOP;
END $$;

-- =====================================================
-- STEP 8: VERIFY RLS IS NOW DISABLED
-- =====================================================

SELECT '=== VERIFYING RLS IS NOW DISABLED ===' as info;

SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN rowsecurity THEN '❌ RLS STILL ENABLED - CRITICAL ISSUE'
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
-- STEP 9: TEST DIRECT ACCESS
-- =====================================================

SELECT '=== TESTING DIRECT ACCESS ===' as info;

-- Test if we can now access the tables directly
SELECT 'Testing organizations direct access:' as test_type;
SELECT COUNT(*) as organizations_count FROM public.organizations;

SELECT 'Testing onboarding progress direct access:' as test_type;
SELECT COUNT(*) as progress_count FROM public.user_onboarding_progress;

SELECT 'Testing users table direct access:' as test_type;
SELECT COUNT(*) as users_count FROM public.users;

-- =====================================================
-- FINAL DIAGNOSIS
-- =====================================================

SELECT '=== FINAL DIAGNOSIS ===' as info;
SELECT 'If RLS is still enabled after this script, there is a database-level restriction' as diagnosis;
SELECT 'This could be due to:' as possible_causes;
SELECT '1. Database-level security policies' as cause1;
SELECT '2. Supabase project settings' as cause2;
SELECT '3. Custom database configuration' as cause3;
SELECT '4. Network-level restrictions' as cause4;


