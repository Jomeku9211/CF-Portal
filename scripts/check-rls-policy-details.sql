-- ============================================
-- Check RLS policy details that are blocking inserts
-- ============================================

-- 1. Check all RLS policies with their conditions
SELECT 
    policyname,
    cmd as operation,
    qual as using_condition,
    with_check as check_condition,
    roles
FROM pg_policies 
WHERE tablename = 'user_onboarding_progress'
ORDER BY cmd, policyname;

-- 2. Check if there are any INSERT policies specifically
SELECT 
    policyname,
    cmd as operation,
    with_check as insert_check_condition
FROM pg_policies 
WHERE tablename = 'user_onboarding_progress' 
    AND cmd = 'INSERT';

-- 3. Check what the current auth context looks like
SELECT 
    'Current Auth Context' as info,
    current_user as current_user,
    session_user as session_user,
    current_setting('role') as current_role;

-- 4. Test what happens when we try to insert with current auth context
-- This will show us exactly what the RLS policy is checking
SELECT 
    'RLS Policy Test' as test_type,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'user_onboarding_progress' 
                AND cmd = 'INSERT'
        ) THEN 'INSERT policies exist'
        ELSE 'No INSERT policies found'
    END as insert_policy_status;
