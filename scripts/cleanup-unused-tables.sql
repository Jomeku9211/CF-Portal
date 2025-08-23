-- =====================================================
-- CLEANUP UNUSED TABLES
-- WARNING: REVIEW CAREFULLY BEFORE RUNNING
-- =====================================================

-- =====================================================
-- STEP 1: CHECK WHAT WILL BE REMOVED
-- =====================================================

SELECT '=== TABLES TO BE REMOVED ===' as info;

SELECT 
    table_name,
    'Will be dropped' as action,
    'Review data before proceeding' as warning
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN (
    'agency_profiles',
    'client_profiles', 
    'service_provider_profiles',
    'collaborations',
    'project_applications',
    'projects',
    'user_portfolio',
    'user_skills'
)
ORDER BY table_name;

-- =====================================================
-- STEP 2: CHECK FOR DEPENDENCIES
-- =====================================================

SELECT '=== CHECKING FOR DEPENDENCIES ===' as info;

-- Check if any other tables reference these tables
SELECT 
    tc.constraint_name,
    tc.table_name as dependent_table,
    kcu.column_name,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_schema = 'public'
AND ccu.table_name IN (
    'agency_profiles',
    'client_profiles', 
    'service_provider_profiles',
    'collaborations',
    'project_applications',
    'projects',
    'user_portfolio',
    'user_skills'
)
ORDER BY ccu.table_name, tc.table_name;

-- =====================================================
-- STEP 3: SAFE REMOVAL (COMMENTED OUT FOR SAFETY)
-- =====================================================

SELECT '=== SAFE REMOVAL COMMANDS ===' as info;
SELECT 'Uncomment the commands below only after confirming tables are not needed' as warning;

/*
-- =====================================================
-- REMOVE LEGACY PROFILE TABLES
-- =====================================================

-- These were replaced by the unified 'users' table
DROP TABLE IF EXISTS public.agency_profiles CASCADE;
DROP TABLE IF EXISTS public.client_profiles CASCADE;
DROP TABLE IF EXISTS public.service_provider_profiles CASCADE;

-- =====================================================
-- REMOVE UNUSED FEATURE TABLES
-- =====================================================

-- These appear to be for features not yet implemented
DROP TABLE IF EXISTS public.collaborations CASCADE;
DROP TABLE IF EXISTS public.project_applications CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.user_portfolio CASCADE;
DROP TABLE IF EXISTS public.user_skills CASCADE;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check remaining tables
SELECT 'Remaining tables after cleanup:' as info;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
*/

-- =====================================================
-- STEP 4: ALTERNATIVE - RENAME INSTEAD OF DROP
-- =====================================================

SELECT '=== ALTERNATIVE: RENAME TABLES INSTEAD OF DROP ===' as info;
SELECT 'This preserves data in case you need to restore later' as note;

/*
-- Rename tables instead of dropping (safer approach)
ALTER TABLE public.agency_profiles RENAME TO _archived_agency_profiles;
ALTER TABLE public.client_profiles RENAME TO _archived_client_profiles;
ALTER TABLE public.service_provider_profiles RENAME TO _archived_service_provider_profiles;
ALTER TABLE public.collaborations RENAME TO _archived_collaborations;
ALTER TABLE public.project_applications RENAME TO _archived_project_applications;
ALTER TABLE public.projects RENAME TO _archived_projects;
ALTER TABLE public.user_portfolio RENAME TO _archived_user_portfolio;
ALTER TABLE public.user_skills RENAME TO _archived_user_skills;
*/

SELECT '✅ Cleanup script ready. Review and uncomment commands as needed.' as result;


