-- =====================================================
-- SIMPLE ORGANIZATION TEST - USE REAL USER ID
-- =====================================================

-- This script tests organization creation using the actual authenticated user
-- without trying to create fake users

SELECT '=== SIMPLE ORGANIZATION TEST ===' as info;

-- =====================================================
-- STEP 1: CHECK IF WE CAN ACCESS TABLES
-- =====================================================

SELECT '=== CHECKING TABLE ACCESS ===' as info;

-- Test if we can now access the tables directly
SELECT 'Testing organizations access:' as test_type;
SELECT COUNT(*) as organizations_count FROM public.organizations;

SELECT 'Testing onboarding progress access:' as test_type;
SELECT COUNT(*) as progress_count FROM public.user_onboarding_progress;

SELECT 'Testing users table access:' as test_type;
SELECT COUNT(*) as users_count FROM public.users;

-- =====================================================
-- STEP 2: CHECK EXISTING USERS
-- =====================================================

SELECT '=== CHECKING EXISTING USERS ===' as info;

SELECT 
    id,
    email,
    'EXISTING USERS' as info
FROM public.users
ORDER BY id
LIMIT 5;

-- =====================================================
-- STEP 3: TEST ORGANIZATION INSERT WITH EXISTING USER
-- =====================================================

SELECT '=== TESTING ORGANIZATION INSERT WITH EXISTING USER ===' as info;

-- Try to insert using an existing user ID
DO $$
DECLARE
    existing_user_id uuid;
BEGIN
    -- Get the first existing user ID
    SELECT id INTO existing_user_id FROM public.users LIMIT 1;
    
    IF existing_user_id IS NOT NULL THEN
        -- Try to insert organization using existing user ID
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
            'TEST ORGANIZATION REAL USER', 
            'Test description using real user', 
            'Technology', 
            '1-10', 
            'Bootstrapped', 
            'https://test-real-user.com', 
            existing_user_id, 
            '{"test": true, "real_user": true}'::jsonb
        );
        
        RAISE NOTICE '✅ Test insert successful using user ID: %', existing_user_id;
        
        -- Clean up test data
        DELETE FROM public.organizations WHERE name = 'TEST ORGANIZATION REAL USER';
        RAISE NOTICE '✅ Test data cleaned up';
        
    ELSE
        RAISE NOTICE '❌ No users found in public.users table';
    END IF;
END $$;

-- =====================================================
-- FINAL STATUS
-- =====================================================

SELECT '=== FINAL STATUS ===' as info;
SELECT 'If the test insert worked, organization creation should work in your app!' as success;
SELECT 'If it failed, we need to check the foreign key relationships' as note;


