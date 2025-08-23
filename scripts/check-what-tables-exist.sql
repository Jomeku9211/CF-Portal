-- ============================================
-- Check what tables actually exist in the database
-- ============================================

-- 1. List all tables in public schema
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Check if user_onboarding_progress exists
SELECT 
    'user_onboarding_progress table check' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_onboarding_progress') 
        THEN 'EXISTS' 
        ELSE 'DOES NOT EXIST' 
    END as result;

-- 3. Check if there are any tables with similar names
SELECT 
    schemaname,
    tablename
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename LIKE '%onboarding%'
    OR tablename LIKE '%progress%'
    OR tablename LIKE '%user%'
ORDER BY tablename;

-- 4. Check if there are any tables with 'onboarding' in the name
SELECT 
    'Tables with onboarding in name' as check_type,
    COUNT(*) as count
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename LIKE '%onboarding%';
