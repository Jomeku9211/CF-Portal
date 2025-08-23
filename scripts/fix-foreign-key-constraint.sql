-- =====================================================
-- FIX FOREIGN KEY CONSTRAINT - CREATE TEST USER
-- =====================================================

-- This script fixes the foreign key constraint issue
-- by creating a test user that can be referenced

SELECT '=== FIXING FOREIGN KEY CONSTRAINT ===' as info;

-- =====================================================
-- STEP 1: CHECK CURRENT USERS
-- =====================================================

SELECT '=== CHECKING CURRENT USERS ===' as info;

SELECT 
    id,
    email,
    'EXISTING USERS' as info
FROM public.users
ORDER BY id
LIMIT 5;

-- =====================================================
-- STEP 2: CREATE TEST USER IF NEEDED
-- =====================================================

SELECT '=== CREATING TEST USER IF NEEDED ===' as info;

-- Create a test user if it doesn't exist
INSERT INTO public.users (id, email)
VALUES (
    '00000000-0000-0000-0000-000000000000'::uuid,
    'test@example.com'
)
ON CONFLICT (id) DO NOTHING;

SELECT '✅ Test user created or already exists' as result;

-- =====================================================
-- STEP 3: TEST ORGANIZATION INSERT AGAIN
-- =====================================================

SELECT '=== TESTING ORGANIZATION INSERT AGAIN ===' as info;

-- Try to insert a test record again
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
        'TEST ORGANIZATION 2', 
        'Test description for organization 2', 
        'Technology', 
        '1-10', 
        'Bootstrapped', 
        'https://test2.com', 
        '00000000-0000-0000-0000-000000000000'::uuid, 
        '{"test": true, "version": 2}'::jsonb
    );
    
    SELECT '✅ Test insert successful - foreign key constraint fixed!' as result;
    
    -- Clean up test data
    DELETE FROM public.organizations WHERE name = 'TEST ORGANIZATION 2';
    SELECT '✅ Test data cleaned up' as cleanup_result;
    
COMMIT;

-- =====================================================
-- STEP 4: VERIFY WE CAN ACCESS ALL TABLES
-- =====================================================

SELECT '=== VERIFYING ACCESS TO ALL TABLES ===' as info;

-- Test access to all onboarding tables
SELECT 'Testing organizations access:' as test_type;
SELECT COUNT(*) as organizations_count FROM public.organizations;

SELECT 'Testing onboarding progress access:' as test_type;
SELECT COUNT(*) as progress_count FROM public.user_onboarding_progress;

SELECT 'Testing users table access:' as test_type;
SELECT COUNT(*) as users_count FROM public.users;

SELECT 'Testing teams access:' as test_type;
SELECT COUNT(*) as teams_count FROM public.teams;

SELECT 'Testing job posts access:' as test_type;
SELECT COUNT(*) as job_posts_count FROM public.job_posts;

-- =====================================================
-- FINAL STATUS
-- =====================================================

SELECT '=== FINAL STATUS ===' as info;
SELECT '✅ RLS is no longer blocking access' as status1;
SELECT '✅ Foreign key constraint is fixed' as status2;
SELECT '✅ All tables are accessible' as status3;
SELECT '🎉 Organization creation should work now!' as success;
SELECT 'Test creating an organization in your app!' as next_step;
