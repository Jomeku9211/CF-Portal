-- ============================================
-- Simple permissions check for user_onboarding_progress table
-- ============================================

-- 1. Check if table exists
SELECT 
    'Table Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_onboarding_progress') 
        THEN 'EXISTS' 
        ELSE 'DOES NOT EXIST' 
    END as result;

-- 2. Check current permissions for authenticated role
SELECT 
    'Authenticated Role Permissions' as check_type,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'SELECT') as can_select,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'INSERT') as can_insert,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'UPDATE') as can_update,
    has_table_privilege('authenticated', 'user_onboarding_progress', 'DELETE') as can_delete;

-- 3. Check current permissions for anon role
SELECT 
    'Anon Role Permissions' as check_type,
    has_table_privilege('anon', 'user_onboarding_progress', 'SELECT') as can_select,
    has_table_privilege('anon', 'user_onboarding_progress', 'INSERT') as can_insert,
    has_table_privilege('anon', 'user_onboarding_progress', 'UPDATE') as can_update,
    has_table_privilege('anon', 'user_onboarding_progress', 'DELETE') as can_delete;

-- 4. Check RLS status
SELECT 
    'RLS Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_onboarding_progress' AND rowsecurity = true) 
        THEN 'ENABLED' 
        ELSE 'DISABLED' 
    END as result;

-- 5. Check if there are any RLS policies
SELECT 
    'RLS Policies' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_onboarding_progress') 
        THEN 'EXIST' 
        ELSE 'NONE' 
    END as result;
