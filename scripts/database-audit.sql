-- =====================================================
-- COMPREHENSIVE DATABASE AUDIT & CLEANUP
-- =====================================================

-- =====================================================
-- STEP 1: INVENTORY ALL TABLES
-- =====================================================

SELECT '=== ALL TABLES IN DATABASE ===' as info;

SELECT 
    schemaname,
    tablename,
    tableowner,
    CASE 
        WHEN schemaname = 'information_schema' THEN 'System Schema'
        WHEN schemaname = 'pg_catalog' THEN 'PostgreSQL Catalog'
        WHEN schemaname = 'pg_toast' THEN 'PostgreSQL Toast'
        WHEN schemaname = 'auth' THEN 'Supabase Auth'
        WHEN schemaname = 'storage' THEN 'Supabase Storage'
        WHEN schemaname = 'public' THEN 'Application Tables'
        ELSE 'Other Schema'
    END as schema_type
FROM pg_tables 
WHERE schemaname NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
ORDER BY schemaname, tablename;

-- =====================================================
-- STEP 2: APPLICATION TABLES DETAILED REVIEW
-- =====================================================

SELECT '=== APPLICATION TABLES (public schema) ===' as info;

SELECT 
    table_name,
    table_type,
    CASE 
        WHEN table_name IN (
            'users', 'organizations', 'teams', 'job_posts', 
            'user_onboarding_progress', 'user_roles', 'onboarding_step_completions',
            'roles', 'role_categories', 'experience_levels', 'specializations'
        ) THEN '✅ Core Onboarding Tables'
        WHEN table_name IN (
            'agency_profiles', 'client_profiles', 'service_provider_profiles',
            'collaborations', 'project_applications', 'projects', 'user_portfolio', 'user_skills'
        ) THEN '⚠️  Legacy/Unused Tables'
        ELSE '❓ Unknown Purpose'
    END as table_purpose,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_purpose, table_name;

-- =====================================================
-- STEP 3: CHECK TABLE RELATIONSHIPS & DEPENDENCIES
-- =====================================================

SELECT '=== FOREIGN KEY RELATIONSHIPS ===' as info;

SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    CASE 
        WHEN tc.table_name IN ('users', 'organizations', 'teams', 'job_posts', 'user_onboarding_progress') 
        THEN '✅ Core Table'
        ELSE '⚠️  Check if needed'
    END as status
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
ORDER BY tc.table_name, kcu.column_name;

-- =====================================================
-- STEP 4: CHECK FOR UNUSED TABLES
-- =====================================================

SELECT '=== POTENTIALLY UNUSED TABLES ===' as info;

-- Tables that might be legacy or unused
SELECT 
    table_name,
    'Consider removing if not needed' as recommendation
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
-- STEP 5: CHECK TABLE USAGE & DATA
-- =====================================================

SELECT '=== TABLE DATA COUNTS ===' as info;

-- This will show how much data is in each table
SELECT 
    schemaname,
    tablename,
    'Run: SELECT COUNT(*) FROM ' || schemaname || '.' || tablename || ';' as count_query
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- =====================================================
-- STEP 6: IDENTIFY DUPLICATE FUNCTIONALITY
-- =====================================================

SELECT '=== POTENTIAL DUPLICATE FUNCTIONALITY ===' as info;

SELECT 
    'Multiple profile tables detected' as issue,
    'Consider consolidating into single users table' as recommendation
WHERE EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('agency_profiles', 'client_profiles', 'service_provider_profiles')
);

-- =====================================================
-- STEP 7: RECOMMENDED CLEANUP ACTIONS
-- =====================================================

SELECT '=== RECOMMENDED CLEANUP ACTIONS ===' as info;

SELECT '1. Review and potentially remove legacy profile tables' as action
UNION ALL
SELECT '2. Check if collaborations/projects tables are needed' as action
UNION ALL
SELECT '3. Verify user_portfolio and user_skills usage' as action
UNION ALL
SELECT '4. Ensure all core onboarding tables have proper RLS policies' as action
UNION ALL
SELECT '5. Test foreign key relationships after any table removals' as action;

-- =====================================================
-- STEP 8: SAFE REMOVAL QUERIES (COMMENTED OUT)
-- =====================================================

SELECT '=== SAFE REMOVAL QUERIES (REVIEW BEFORE RUNNING) ===' as info;

-- These are commented out for safety - uncomment only after review
/*
-- Remove legacy profile tables (if confirmed unused)
-- DROP TABLE IF EXISTS public.agency_profiles CASCADE;
-- DROP TABLE IF EXISTS public.client_profiles CASCADE;
-- DROP TABLE IF EXISTS public.service_provider_profiles CASCADE;

-- Remove other potentially unused tables (if confirmed unused)
-- DROP TABLE IF EXISTS public.collaborations CASCADE;
-- DROP TABLE IF EXISTS public.project_applications CASCADE;
-- DROP TABLE IF EXISTS public.projects CASCADE;
-- DROP TABLE IF EXISTS public.user_portfolio CASCADE;
-- DROP TABLE IF EXISTS public.user_skills CASCADE;
*/

SELECT '✅ Database audit complete! Review the results above.' as result;


