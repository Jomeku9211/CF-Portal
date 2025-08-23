-- Fix Organizations Table Permissions
-- This script will completely disable RLS and remove all policies

-- 1. Check current RLS status
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    CASE WHEN rowsecurity THEN '❌ RLS ENABLED' ELSE '✅ RLS DISABLED' END as rls_status
FROM pg_tables 
WHERE tablename = 'organizations';

-- 2. Check existing policies
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename = 'organizations';

-- 3. Force disable RLS on organizations table
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- 4. Drop ALL existing policies (if any exist)
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'organizations'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(policy_record.policyname) || ' ON public.organizations';
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
END $$;

-- 5. Verify RLS is disabled
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    CASE WHEN rowsecurity THEN '❌ RLS ENABLED' ELSE '✅ RLS DISABLED' END as rls_status
FROM pg_tables 
WHERE tablename = 'organizations';

-- 6. Test insert permission (this should work now)
-- First, let's check if we have a test user
SELECT id, email FROM public.users LIMIT 1;

-- 7. Test organization creation with a sample user
DO $$
DECLARE
    test_user_id UUID;
    test_org_id UUID;
BEGIN
    -- Get first available user
    SELECT id INTO test_user_id FROM public.users LIMIT 1;
    
    IF test_user_id IS NOT NULL THEN
        -- Try to create a test organization
        INSERT INTO public.organizations (
            name, 
            description, 
            industry, 
            organization_size, 
            current_funding_status, 
            website, 
            location, 
            created_by, 
            flow_metadata
        ) VALUES (
            'Test Organization', 
            'Test description', 
            'Technology', 
            '1-10', 
            'Bootstrapped', 
            'https://test.com', 
            'Test City', 
            test_user_id, 
            '{"test": true}'::jsonb
        ) RETURNING id INTO test_org_id;
        
        RAISE NOTICE '✅ Test organization created successfully with ID: %', test_org_id;
        
        -- Clean up test data
        DELETE FROM public.organizations WHERE id = test_org_id;
        RAISE NOTICE '🧹 Test organization cleaned up';
        
    ELSE
        RAISE NOTICE '⚠️ No users found to test with';
    END IF;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Error creating test organization: %', SQLERRM;
END $$;

-- 8. Final verification
SELECT 
    'organizations' as table_name,
    CASE WHEN rowsecurity THEN '❌ RLS ENABLED' ELSE '✅ RLS DISABLED' END as rls_status,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'organizations') as policy_count
FROM pg_tables 
WHERE tablename = 'organizations';
