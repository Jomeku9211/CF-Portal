-- =====================================================
-- USER DELETION SCRIPT
-- =====================================================
-- This script will completely remove a user and all their data
-- WARNING: This is irreversible!

-- =====================================================
-- OPTION 1: DELETE BY USER ID (UUID)
-- =====================================================

-- Replace 'USER_UUID_HERE' with the actual user ID you want to delete
-- You can find the user ID in Supabase Auth → Users

-- Example: DELETE FROM auth.users WHERE id = '123e4567-e89b-12d3-a456-426614174000';

-- =====================================================
-- OPTION 2: DELETE BY EMAIL
-- =====================================================

-- Replace 'user@example.com' with the actual email
-- Example: DELETE FROM auth.users WHERE email = 'user@example.com';

-- =====================================================
-- OPTION 3: DELETE BY USERNAME
-- =====================================================

-- Replace 'username' with the actual username
-- Example: DELETE FROM public.profiles WHERE username = 'username';

-- =====================================================
-- OPTION 4: COMPLETE USER DATA CLEANUP (Recommended)
-- =====================================================

-- This will delete all user data in the correct order
-- Replace 'USER_UUID_HERE' with the actual user ID

DO $$
DECLARE
    user_uuid UUID := 'USER_UUID_HERE'; -- Replace with actual UUID
BEGIN
    -- Delete from project applications
    DELETE FROM public.project_applications WHERE applicant_id = user_uuid;
    
    -- Delete from collaborations
    DELETE FROM public.collaborations WHERE client_id = user_uuid OR service_provider_id = user_uuid;
    
    -- Delete from projects
    DELETE FROM public.projects WHERE client_id = user_uuid;
    
    -- Delete from user portfolio
    DELETE FROM public.user_portfolio WHERE user_id = user_uuid;
    
    -- Delete from user skills
    DELETE FROM public.user_skills WHERE user_id = user_uuid;
    
    -- Delete from client profiles
    DELETE FROM public.client_profiles WHERE user_id = user_uuid;
    
    -- Delete from agency profiles
    DELETE FROM public.agency_profiles WHERE user_id = user_uuid;
    
    -- Delete from service provider profiles
    DELETE FROM public.service_provider_profiles WHERE user_id = user_uuid;
    
    -- Delete from user roles
    DELETE FROM public.user_roles WHERE user_id = user_uuid;
    
    -- Delete from profiles
    DELETE FROM public.profiles WHERE id = user_uuid;
    
    -- Finally, delete from auth.users
    DELETE FROM auth.users WHERE id = user_uuid;
    
    RAISE NOTICE 'User % and all associated data has been deleted', user_uuid;
END $$;

-- =====================================================
-- OPTION 5: LIST ALL USERS (to find the one you want to delete)
-- =====================================================

-- List all users in your system
SELECT 
    u.id,
    u.email,
    u.created_at,
    p.username,
    p.full_name,
    p.company_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- =====================================================
-- OPTION 6: FIND USER BY EMAIL OR USERNAME
-- =====================================================

-- Find a specific user by email
-- SELECT * FROM auth.users WHERE email = 'user@example.com';

-- Find a specific user by username
-- SELECT * FROM public.profiles WHERE username = 'username';

-- =====================================================
-- SAFETY CHECK: COUNT USER DATA BEFORE DELETION
-- =====================================================

-- Check how much data a user has before deleting
-- Replace 'USER_UUID_HERE' with the actual user ID

SELECT 
    'Profiles' as table_name,
    COUNT(*) as count
FROM public.profiles 
WHERE id = 'USER_UUID_HERE'
UNION ALL
SELECT 
    'User Roles' as table_name,
    COUNT(*) as count
FROM public.user_roles 
WHERE user_id = 'USER_UUID_HERE'
UNION ALL
SELECT 
    'Projects' as table_name,
    COUNT(*) as count
FROM public.projects 
WHERE client_id = 'USER_UUID_HERE'
UNION ALL
SELECT 
    'Portfolio Items' as table_name,
    COUNT(*) as count
FROM public.user_portfolio 
WHERE user_id = 'USER_UUID_HERE';







