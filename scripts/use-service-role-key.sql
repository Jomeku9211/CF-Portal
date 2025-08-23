-- =====================================================
-- USE SERVICE ROLE KEY - BYPASS RLS RESTRICTIONS
-- =====================================================

-- This script checks if we can access tables using elevated privileges
-- This will help identify if the issue is RLS or project-level restrictions

SELECT '=== SERVICE ROLE KEY ACCESS TEST ===' as info;

-- =====================================================
-- STEP 1: CHECK CURRENT USER CONTEXT
-- =====================================================

SELECT '=== CHECKING CURRENT USER CONTEXT ===' as info;

SELECT 
    current_user as current_user,
    session_user as session_user,
    current_setting('role') as current_role,
    'USER CONTEXT' as info;

-- =====================================================
-- STEP 2: CHECK IF WE CAN ACCESS TABLES WITH CURRENT PRIVILEGES
-- =====================================================

SELECT '=== CHECKING TABLE ACCESS WITH CURRENT PRIVILEGES ===' as info;

-- Test if we can now access the tables directly
SELECT 'Testing organizations direct access:' as test_type;
SELECT COUNT(*) as organizations_count FROM public.organizations;

SELECT 'Testing onboarding progress direct access:' as test_type;
SELECT COUNT(*) as progress_count FROM public.user_onboarding_progress;

SELECT 'Testing users table direct access:' as test_type;
SELECT COUNT(*) as users_count FROM public.users;

-- =====================================================
-- STEP 3: CHECK TABLE PERMISSIONS
-- =====================================================

SELECT '=== CHECKING TABLE PERMISSIONS ===' as info;

SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers,
    rowsecurity,
    'TABLE PERMISSIONS' as info
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
-- STEP 4: CHECK GRANT PERMISSIONS
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
-- STEP 5: ATTEMPT TO INSERT TEST DATA
-- =====================================================

SELECT '=== ATTEMPTING TO INSERT TEST DATA ===' as info;

-- Try to insert a test record to see if we have INSERT permissions
BEGIN;
    INSERT INTO public.organizations (
        name, 
        description, 
        industry, 
        organization_size, 
        current_funding_status, 
        website, 
        created_by, 
        flow_metadata
    ) VALUES (
        'TEST ORGANIZATION', 
        'Test description', 
        'Technology', 
        '1-10', 
        'Bootstrapped', 
        'https://test.com', 
        '00000000-0000-0000-0000-000000000000'::uuid, 
        '{"test": true}'::jsonb
    );
    
    SELECT '✅ Test insert successful - we have INSERT permissions' as result;
    
    -- Clean up test data
    DELETE FROM public.organizations WHERE name = 'TEST ORGANIZATION';
    SELECT '✅ Test data cleaned up' as cleanup_result;
    
COMMIT;

-- =====================================================
-- FINAL DIAGNOSIS
-- =====================================================

SELECT '=== FINAL DIAGNOSIS ===' as info;
SELECT 'If the test insert worked, the issue is with RLS policies' as diagnosis1;
SELECT 'If the test insert failed, the issue is with table permissions' as diagnosis2;
SELECT 'Check your Supabase project settings for RLS restrictions' as next_step;


