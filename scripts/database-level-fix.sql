-- =====================================================
-- DATABASE-LEVEL FIX - ADDRESS ROOT CAUSE
-- =====================================================

-- This script addresses database-level restrictions that might be
-- preventing access to tables even after RLS is disabled

SELECT '=== DATABASE-LEVEL FIX STARTING ===' as info;

-- =====================================================
-- STEP 1: CHECK CURRENT DATABASE STATE
-- =====================================================

SELECT '=== CHECKING CURRENT DATABASE STATE ===' as info;

-- Check if tables exist and their current state
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
-- STEP 2: FORCE DISABLE RLS WITH SUPERUSER PRIVILEGES
-- =====================================================

SELECT '=== FORCE DISABLING RLS WITH SUPERUSER PRIVILEGES ===' as info;

-- Try to disable RLS with elevated privileges
DO $$
DECLARE
    table_record RECORD;
    sql_command TEXT;
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
        sql_command := 'ALTER TABLE public.' || table_record.tablename || ' DISABLE ROW LEVEL SECURITY';
        EXECUTE sql_command;
        
        -- Also try to drop any remaining policies
        sql_command := 'DROP POLICY IF EXISTS "Users can view own organizations" ON public.' || table_record.tablename || ' CASCADE';
        EXECUTE sql_command;
        
        sql_command := 'DROP POLICY IF EXISTS "Users can create organizations" ON public.' || table_record.tablename || ' CASCADE';
        EXECUTE sql_command;
        
        sql_command := 'DROP POLICY IF EXISTS "Users can update own organizations" ON public.' || table_record.tablename || ' CASCADE';
        EXECUTE sql_command;
        
        sql_command := 'DROP POLICY IF EXISTS "Users can delete own organizations" ON public.' || table_record.tablename || ' CASCADE';
        EXECUTE sql_command;
        
        RAISE NOTICE 'Processed table: %', table_record.tablename;
    END LOOP;
END $$;

-- =====================================================
-- STEP 3: CHECK FOR ANY REMAINING POLICIES
-- =====================================================

SELECT '=== CHECKING FOR ANY REMAINING POLICIES ===' as info;

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
-- STEP 5: TEST DIRECT ACCESS
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


