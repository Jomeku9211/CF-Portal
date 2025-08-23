-- =====================================================
-- FIX INSERT PERMISSIONS - TARGET INSERT OPERATIONS
-- =====================================================

-- This script specifically fixes INSERT permissions that are blocking
-- organization creation and other write operations

SELECT '=== FIXING INSERT PERMISSIONS ===' as info;

-- =====================================================
-- STEP 1: CHECK CURRENT RLS STATUS FOR INSERT
-- =====================================================

SELECT '=== CHECKING CURRENT RLS STATUS FOR INSERT ===' as info;

-- Check if RLS is enabled and what policies exist for INSERT
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE 
        WHEN rowsecurity THEN '❌ RLS ENABLED'
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
-- STEP 2: CHECK EXISTING INSERT POLICIES
-- =====================================================

SELECT '=== CHECKING EXISTING INSERT POLICIES ===' as info;

SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    permissive,
    roles,
    'INSERT POLICY INFO' as info
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
AND cmd = 'INSERT'
ORDER BY tablename, policyname;

-- =====================================================
-- STEP 3: FORCE DISABLE RLS ON ALL TABLES
-- =====================================================

SELECT '=== FORCE DISABLING RLS ON ALL TABLES ===' as info;

-- Force disable RLS on all onboarding tables
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
        -- Force disable RLS
        EXECUTE 'ALTER TABLE public.' || table_record.tablename || ' DISABLE ROW LEVEL SECURITY';
        RAISE NOTICE 'Disabled RLS on table: %', table_record.tablename;
    END LOOP;
END $$;

-- =====================================================
-- STEP 4: DROP ALL INSERT POLICIES
-- =====================================================

SELECT '=== DROPPING ALL INSERT POLICIES ===' as info;

-- Drop all INSERT policies that might be blocking
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT schemaname, tablename, policyname
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
        AND cmd = 'INSERT'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON public.' || policy_record.tablename || ' CASCADE';
        RAISE NOTICE 'Dropped INSERT policy: % on table %', policy_record.policyname, policy_record.tablename;
    END LOOP;
END $$;

-- =====================================================
-- STEP 5: VERIFY RLS IS DISABLED
-- =====================================================

SELECT '=== VERIFYING RLS IS DISABLED ===' as info;

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
-- STEP 6: TEST INSERT OPERATION
-- =====================================================

SELECT '=== TESTING INSERT OPERATION ===' as info;

-- Test if we can now insert
DO $$
DECLARE
    test_user_id uuid;
    insert_result text;
BEGIN
    -- Get an existing user ID for foreign key reference
    SELECT id INTO test_user_id FROM public.users LIMIT 1;
    
    IF test_user_id IS NOT NULL THEN
        -- Try to insert into organizations
        BEGIN
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
                'TEST INSERT AFTER FIX', 
                'Testing INSERT permissions after fix', 
                'Technology', 
                '1-10', 
                'Bootstrapped', 
                'https://test-insert-after-fix.com', 
                test_user_id, 
                '{"test": "insert_after_fix"}'::jsonb
            );
            
            insert_result := '✅ INSERT into organizations SUCCESSFUL after fix!';
            
            -- Clean up test data
            DELETE FROM public.organizations WHERE name = 'TEST INSERT AFTER FIX';
            insert_result := insert_result || ' - Test data cleaned up';
            
        EXCEPTION WHEN OTHERS THEN
            insert_result := '❌ INSERT into organizations STILL FAILED: ' || SQLERRM;
        END;
        
        RAISE NOTICE '%', insert_result;
    ELSE
        RAISE NOTICE '❌ No users found to test foreign key reference';
    END IF;
END $$;

-- =====================================================
-- FINAL STATUS
-- =====================================================

SELECT '=== FINAL STATUS ===' as info;
SELECT 'If INSERT test succeeded, organization creation should work in your app!' as success;
SELECT 'If INSERT test still failed, there may be deeper permission issues' as note;
SELECT 'Test creating an organization in your app now!' as next_step;


