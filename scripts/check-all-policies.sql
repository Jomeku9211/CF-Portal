-- ============================================
-- Check ALL policies for user_onboarding_progress table
-- ============================================

-- 1. Check all existing policies with full details
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'user_onboarding_progress'
ORDER BY policyname;

-- 2. Check if RLS is enabled on the table
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'user_onboarding_progress';

-- 3. Check current grants/permissions for the table
SELECT 
    grantee,
    privilege_type,
    is_grantable,
    table_name
FROM information_schema.role_table_grants 
WHERE table_name = 'user_onboarding_progress'
ORDER BY grantee, privilege_type;

-- 4. Check if authenticated role can access the table
SELECT 
    'Authenticated Role Permissions' as check_type,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'SELECT') as can_select,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'INSERT') as can_insert,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'UPDATE') as can_update,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'DELETE') as can_delete;

-- 5. Check if anon role can access the table
SELECT 
    'Anon Role Permissions' as check_type,
    has_table_privilege('anon', 'user_onboarding_progress', 'SELECT') as can_select,
    has_table_privilege('anon', 'user_onboarding_progress', 'INSERT') as can_insert,
    has_table_privilege('anon', 'user_onboarding_progress', 'UPDATE') as can_update,
    has_table_privilege('anon', 'user_onboarding_progress', 'DELETE') as can_delete;
