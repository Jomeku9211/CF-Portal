-- =====================================================
-- DELETE SPECIFIC USER: f077f485-a1d9-4d52-9caa-8a85fd615f63
-- =====================================================
-- WARNING: This will completely remove the user and all their data!

-- =====================================================
-- STEP 1: SAFETY CHECK - See what data this user has
-- =====================================================

SELECT 
    'Profiles' as table_name,
    COUNT(*) as count
FROM public.profiles 
WHERE id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63'
UNION ALL
SELECT 
    'User Roles' as table_name,
    COUNT(*) as count
FROM public.user_roles 
WHERE user_id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63'
UNION ALL
SELECT 
    'Projects' as table_name,
    COUNT(*) as count
FROM public.projects 
WHERE client_id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63'
UNION ALL
SELECT 
    'Portfolio Items' as table_name,
    COUNT(*) as count
FROM public.user_portfolio 
WHERE user_id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63'
UNION ALL
SELECT 
    'User Skills' as table_name,
    COUNT(*) as count
FROM public.user_skills 
WHERE user_id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63'
UNION ALL
SELECT 
    'Service Provider Profile' as table_name,
    COUNT(*) as count
FROM public.service_provider_profiles 
WHERE user_id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63'
UNION ALL
SELECT 
    'Agency Profile' as table_name,
    COUNT(*) as count
FROM public.agency_profiles 
WHERE user_id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63'
UNION ALL
SELECT 
    'Client Profile' as table_name,
    COUNT(*) as count
FROM public.client_profiles 
WHERE user_id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63';

-- =====================================================
-- STEP 2: SHOW USER DETAILS BEFORE DELETION
-- =====================================================

SELECT 
    'User Details' as info,
    u.id,
    u.email,
    u.created_at,
    p.username,
    p.full_name,
    p.company_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63';

-- =====================================================
-- STEP 3: COMPLETE USER DELETION
-- =====================================================
-- Uncomment the section below when you're ready to delete

/*
DO $$
DECLARE
    user_uuid UUID := 'f077f485-a1d9-4d52-9caa-8a85fd615f63';
BEGIN
    RAISE NOTICE 'Starting deletion of user %', user_uuid;
    
    -- Delete from project applications
    DELETE FROM public.project_applications WHERE applicant_id = user_uuid;
    RAISE NOTICE 'Deleted project applications';
    
    -- Delete from collaborations
    DELETE FROM public.collaborations WHERE client_id = user_uuid OR service_provider_id = user_uuid;
    RAISE NOTICE 'Deleted collaborations';
    
    -- Delete from projects
    DELETE FROM public.projects WHERE client_id = user_uuid;
    RAISE NOTICE 'Deleted projects';
    
    -- Delete from user portfolio
    DELETE FROM public.user_portfolio WHERE user_id = user_uuid;
    RAISE NOTICE 'Deleted portfolio items';
    
    -- Delete from user skills
    DELETE FROM public.user_skills WHERE user_id = user_uuid;
    RAISE NOTICE 'Deleted user skills';
    
    -- Delete from client profiles
    DELETE FROM public.client_profiles WHERE user_id = user_uuid;
    RAISE NOTICE 'Deleted client profile';
    
    -- Delete from agency profiles
    DELETE FROM public.agency_profiles WHERE user_id = user_uuid;
    RAISE NOTICE 'Deleted agency profile';
    
    -- Delete from service provider profiles
    DELETE FROM public.service_provider_profiles WHERE user_id = user_uuid;
    RAISE NOTICE 'Deleted service provider profile';
    
    -- Delete from user roles
    DELETE FROM public.user_roles WHERE user_id = user_uuid;
    RAISE NOTICE 'Deleted user roles';
    
    -- Delete from profiles
    DELETE FROM public.profiles WHERE id = user_uuid;
    RAISE NOTICE 'Deleted profile';
    
    -- Finally, delete from auth.users
    DELETE FROM auth.users WHERE id = user_uuid;
    RAISE NOTICE 'Deleted from auth.users';
    
    RAISE NOTICE 'User % and all associated data has been successfully deleted', user_uuid;
END $$;
*/

-- =====================================================
-- STEP 4: VERIFY DELETION (run after deletion)
-- =====================================================
-- Uncomment the section below after running the deletion

/*
SELECT 
    'Verification - User should not exist' as check,
    COUNT(*) as user_count
FROM auth.users 
WHERE id = 'f077f485-a1d9-4d52-9caa-8a85fd615f63';
*/







