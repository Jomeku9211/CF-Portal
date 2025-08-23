-- =====================================================
-- TEST DIFFERENT DATABASE OPERATIONS
-- =====================================================

-- This script tests different operations to see which ones are blocked
-- This will help identify if it's a specific operation permission issue

SELECT '=== TESTING DIFFERENT DATABASE OPERATIONS ===' as info;

-- =====================================================
-- STEP 1: TEST SELECT OPERATIONS (READ)
-- =====================================================

SELECT '=== TESTING SELECT OPERATIONS (READ) ===' as info;

-- Test if we can read from tables
SELECT 'Testing organizations SELECT:' as test_type;
SELECT COUNT(*) as organizations_count FROM public.organizations;

SELECT 'Testing onboarding progress SELECT:' as test_type;
SELECT COUNT(*) as progress_count FROM public.user_onboarding_progress;

SELECT 'Testing users SELECT:' as test_type;
SELECT COUNT(*) as users_count FROM public.users;

-- =====================================================
-- STEP 2: TEST INSERT OPERATIONS (CREATE)
-- =====================================================

SELECT '=== TESTING INSERT OPERATIONS (CREATE) ===' as info;

-- Test if we can insert into tables
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
                'TEST INSERT OPERATION', 
                'Testing INSERT permissions', 
                'Technology', 
                '1-10', 
                'Bootstrapped', 
                'https://test-insert.com', 
                test_user_id, 
                '{"test": "insert_permission"}'::jsonb
            );
            
            insert_result := '✅ INSERT into organizations SUCCESSFUL';
            
            -- Clean up test data
            DELETE FROM public.organizations WHERE name = 'TEST INSERT OPERATION';
            insert_result := insert_result || ' - Test data cleaned up';
            
        EXCEPTION WHEN OTHERS THEN
            insert_result := '❌ INSERT into organizations FAILED: ' || SQLERRM;
        END;
        
        RAISE NOTICE '%', insert_result;
    ELSE
        RAISE NOTICE '❌ No users found to test foreign key reference';
    END IF;
END $$;

-- =====================================================
-- STEP 3: TEST UPDATE OPERATIONS (MODIFY)
-- =====================================================

SELECT '=== TESTING UPDATE OPERATIONS (MODIFY) ===' as info;

-- Test if we can update existing records
DO $$
DECLARE
    test_org_id uuid;
    update_result text;
BEGIN
    -- Get an existing organization ID
    SELECT id INTO test_org_id FROM public.organizations LIMIT 1;
    
    IF test_org_id IS NOT NULL THEN
        -- Try to update the organization
        BEGIN
            UPDATE public.organizations 
            SET name = name || ' - UPDATED'
            WHERE id = test_org_id;
            
            update_result := '✅ UPDATE organizations SUCCESSFUL';
            
            -- Revert the change
            UPDATE public.organizations 
            SET name = REPLACE(name, ' - UPDATED', '')
            WHERE id = test_org_id;
            
            update_result := update_result || ' - Changes reverted';
            
        EXCEPTION WHEN OTHERS THEN
            update_result := '❌ UPDATE organizations FAILED: ' || SQLERRM;
        END;
        
        RAISE NOTICE '%', update_result;
    ELSE
        RAISE NOTICE '❌ No organizations found to test UPDATE';
    END IF;
END $$;

-- =====================================================
-- STEP 4: TEST DELETE OPERATIONS (REMOVE)
-- =====================================================

SELECT '=== TESTING DELETE OPERATIONS (REMOVE) ===' as info;

-- Test if we can delete records (we'll create a test record first)
DO $$
DECLARE
    test_user_id uuid;
    test_org_id uuid;
    delete_result text;
BEGIN
    -- Get an existing user ID
    SELECT id INTO test_user_id FROM public.users LIMIT 1;
    
    IF test_user_id IS NOT NULL THEN
        -- Create a test organization for deletion
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
                'TEST DELETE OPERATION', 
                'Testing DELETE permissions', 
                'Technology', 
                '1-10', 
                'Bootstrapped', 
                'https://test-delete.com', 
                test_user_id, 
                '{"test": "delete_permission"}'::jsonb
            ) RETURNING id INTO test_org_id;
            
            -- Try to delete the test organization
            BEGIN
                DELETE FROM public.organizations WHERE id = test_org_id;
                delete_result := '✅ DELETE organizations SUCCESSFUL';
            EXCEPTION WHEN OTHERS THEN
                delete_result := '❌ DELETE organizations FAILED: ' || SQLERRM;
            END;
            
        EXCEPTION WHEN OTHERS THEN
            delete_result := '❌ Could not create test organization for DELETE test: ' || SQLERRM;
        END;
        
        RAISE NOTICE '%', delete_result;
    ELSE
        RAISE NOTICE '❌ No users found to test DELETE';
    END IF;
END $$;

-- =====================================================
-- FINAL DIAGNOSIS
-- =====================================================

SELECT '=== FINAL DIAGNOSIS ===' as info;
SELECT 'This test shows which specific operations are blocked by RLS' as explanation;
SELECT 'If INSERT fails but SELECT works, we have a permissions issue' as note;
SELECT 'Check the results above to see which operations succeeded/failed' as next_step;


