-- ============================================
-- Check current permissions on user_onboarding_progress table
-- ============================================

-- 1. Check table existence and basic info
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'user_onboarding_progress';

-- 2. Check current grants/permissions
SELECT 
    grantee,
    privilege_type,
    is_grantable,
    table_name
FROM information_schema.role_table_grants 
WHERE table_name = 'user_onboarding_progress'
ORDER BY grantee, privilege_type;

-- 3. Check RLS (Row Level Security) status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'user_onboarding_progress';

-- 4. Check existing RLS policies
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
WHERE tablename = 'user_onboarding_progress';

-- 5. Check if authenticated role can access the table
SELECT 
    has_table_privilege('authenticated', 'user_onboarding_progress', 'SELECT') as can_select,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'INSERT') as can_insert,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'UPDATE') as can_update,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'DELETE') as can_delete;

-- 6. Check if service_role can access the table
SELECT 
    has_table_privilege('service_role', 'user_onboarding_progress', 'SELECT') as can_select,
    has_table_privilege('service_role', 'user_onboarding_progress', 'INSERT') as can_insert,
    has_table_privilege('service_role', 'user_onboarding_progress', 'UPDATE') as can_update,
    has_table_privilege('service_role', 'user_onboarding_progress', 'DELETE') as can_delete;

-- 7. Check sequence permissions (for auto-incrementing IDs)
SELECT 
    grantee,
    privilege_type,
    is_grantable,
    sequence_name
FROM information_schema.role_usage_grants 
WHERE sequence_name LIKE '%user_onboarding_progress%';

-- 8. Summary of what we found
SELECT 
    'Table Permissions Summary' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_onboarding_progress') 
        THEN 'Table EXISTS' 
        ELSE 'Table DOES NOT EXIST' 
    END as table_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_onboarding_progress' AND rowsecurity = true) 
        THEN 'RLS ENABLED' 
        ELSE 'RLS DISABLED' 
    END as rls_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_onboarding_progress') 
        THEN 'Has RLS Policies' 
        ELSE 'No RLS Policies' 
    END as policy_status;
