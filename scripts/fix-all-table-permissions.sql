-- Fix ALL Table Permissions - Comprehensive Solution
-- This script will disable RLS on all tables that the app needs to access

-- 1. Check current RLS status for all relevant tables
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    CASE WHEN rowsecurity THEN '❌ RLS ENABLED' ELSE '✅ RLS DISABLED' END as rls_status
FROM pg_tables 
WHERE tablename IN (
    'organizations',
    'user_onboarding_progress', 
    'user_roles',
    'teams',
    'job_posts',
    'onboarding_step_completions',
    'client_profiles',
    'agency_profiles',
    'service_provider_profiles',
    'projects',
    'project_applications',
    'collaborations',
    'user_portfolio',
    'user_skills'
)
ORDER BY tablename;

-- 2. Disable RLS on ALL relevant tables
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
            'user_onboarding_progress', 
            'user_roles',
            'teams',
            'job_posts',
            'onboarding_step_completions',
            'client_profiles',
            'agency_profiles',
            'service_provider_profiles',
            'projects',
            'project_applications',
            'collaborations',
            'user_portfolio',
            'user_skills'
        )
    LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(table_record.tablename) || ' DISABLE ROW LEVEL SECURITY';
        RAISE NOTICE '✅ Disabled RLS on table: %', table_record.tablename;
    END LOOP;
END $$;

-- 3. Drop ALL policies from relevant tables
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
            'user_onboarding_progress', 
            'user_roles',
            'teams',
            'job_posts',
            'onboarding_step_completions',
            'client_profiles',
            'agency_profiles',
            'service_provider_profiles',
            'projects',
            'project_applications',
            'collaborations',
            'user_portfolio',
            'user_skills'
        )
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(policy_record.policyname) || ' ON public.' || quote_ident(policy_record.tablename);
        RAISE NOTICE '🗑️ Dropped policy: % on table %', policy_record.policyname, policy_record.tablename;
    END LOOP;
END $$;

-- 4. Verify all tables have RLS disabled
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    CASE WHEN rowsecurity THEN '❌ RLS ENABLED' ELSE '✅ RLS DISABLED' END as rls_status,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = t.tablename) as policy_count
FROM pg_tables t
WHERE t.schemaname = 'public' 
AND t.tablename IN (
    'organizations',
    'user_onboarding_progress', 
    'user_roles',
    'teams',
    'job_posts',
    'onboarding_step_completions',
    'client_profiles',
    'agency_profiles',
    'service_provider_profiles',
    'projects',
    'project_applications',
    'collaborations',
    'user_portfolio',
    'user_skills'
)
ORDER BY tablename;

-- 5. Test basic operations on key tables
DO $$
DECLARE
    test_user_id UUID;
    test_result TEXT;
BEGIN
    -- Get a test user
    SELECT id INTO test_user_id FROM public.users LIMIT 1;
    
    IF test_user_id IS NOT NULL THEN
        RAISE NOTICE '🧪 Testing with user ID: %', test_user_id;
        
        -- Test user_roles table
        BEGIN
            INSERT INTO public.user_roles (user_id, role_id, category_id, specialization, experience_level_id)
            VALUES (test_user_id, '3dbcccbb-3007-4112-bf5b-804d0950046c', '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78', 'test', NULL);
            RAISE NOTICE '✅ user_roles INSERT test: PASSED';
            
            -- Clean up
            DELETE FROM public.user_roles WHERE user_id = test_user_id AND role_id = '3dbcccbb-3007-4112-bf5b-804d0950046c';
            RAISE NOTICE '🧹 user_roles test data cleaned up';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ user_roles INSERT test: FAILED - %', SQLERRM;
        END;
        
        -- Test user_onboarding_progress table
        BEGIN
            INSERT INTO public.user_onboarding_progress (
                user_id, role_id, category_id, experience_level_id, onboarding_flow, 
                current_step, total_steps, completed_steps, onboarding_status, flow_metadata
            ) VALUES (
                test_user_id, '3dbcccbb-3007-4112-bf5b-804d0950046c', '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78', 
                NULL, 'client', 1, 3, ARRAY[1], 'in_progress', '{"test": true}'::jsonb
            );
            RAISE NOTICE '✅ user_onboarding_progress INSERT test: PASSED';
            
            -- Clean up
            DELETE FROM public.user_onboarding_progress WHERE user_id = test_user_id;
            RAISE NOTICE '🧹 user_onboarding_progress test data cleaned up';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ user_onboarding_progress INSERT test: FAILED - %', SQLERRM;
        END;
        
        -- Test organizations table
        BEGIN
            INSERT INTO public.organizations (
                name, description, industry, organization_size, current_funding_status, 
                website, location, created_by, flow_metadata
            ) VALUES (
                'Test Org', 'Test desc', 'Technology', '1-10', 'Bootstrapped', 
                'https://test.com', 'Test City', test_user_id, '{"test": true}'::jsonb
            );
            RAISE NOTICE '✅ organizations INSERT test: PASSED';
            
            -- Clean up
            DELETE FROM public.organizations WHERE created_by = test_user_id;
            RAISE NOTICE '🧹 organizations test data cleaned up';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ organizations INSERT test: FAILED - %', SQLERRM;
        END;
        
    ELSE
        RAISE NOTICE '⚠️ No users found to test with';
    END IF;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Error during testing: %', SQLERRM;
END $$;

-- 6. Final summary
SELECT 
    'SUMMARY' as status,
    COUNT(*) as total_tables,
    COUNT(CASE WHEN rowsecurity THEN 1 END) as rls_enabled_count,
    COUNT(CASE WHEN NOT rowsecurity THEN 1 END) as rls_disabled_count
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'organizations',
    'user_onboarding_progress', 
    'user_roles',
    'teams',
    'job_posts',
    'onboarding_step_completions',
    'client_profiles',
    'agency_profiles',
    'service_provider_profiles',
    'projects',
    'project_applications',
    'collaborations',
    'user_portfolio',
    'user_skills'
);
