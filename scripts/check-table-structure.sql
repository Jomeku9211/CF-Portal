-- =====================================================
-- CHECK TABLE STRUCTURE AND FOREIGN KEYS
-- =====================================================

-- This script checks the actual table structure and foreign key relationships
-- to understand why we can't insert into the users table

SELECT '=== CHECKING TABLE STRUCTURE ===' as info;

-- =====================================================
-- STEP 1: CHECK USERS TABLE STRUCTURE
-- =====================================================

SELECT '=== CHECKING USERS TABLE STRUCTURE ===' as info;

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    'USERS TABLE COLUMNS' as info
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- =====================================================
-- STEP 2: CHECK FOREIGN KEY CONSTRAINTS
-- =====================================================

SELECT '=== CHECKING FOREIGN KEY CONSTRAINTS ===' as info;

SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    'FOREIGN KEY INFO' as info
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name IN ('users', 'organizations', 'user_onboarding_progress')
ORDER BY tc.table_name, tc.constraint_name;

-- =====================================================
-- STEP 3: CHECK IF PROFILES TABLE EXISTS
-- =====================================================

SELECT '=== CHECKING IF PROFILES TABLE EXISTS ===' as info;

SELECT 
    schemaname,
    tablename,
    tableowner,
    'TABLE EXISTENCE' as info
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'users')
ORDER BY tablename;

-- =====================================================
-- STEP 4: CHECK AUTH.USERS TABLE
-- =====================================================

SELECT '=== CHECKING AUTH.USERS TABLE ===' as info;

SELECT 
    schemaname,
    tablename,
    tableowner,
    'AUTH SCHEMA TABLES' as info
FROM pg_tables 
WHERE schemaname = 'auth' 
AND tablename = 'users';

-- =====================================================
-- STEP 5: CHECK TRIGGERS ON USERS TABLE
-- =====================================================

SELECT '=== CHECKING TRIGGERS ON USERS TABLE ===' as info;

SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    'TRIGGER INFO' as info
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table = 'users';

-- =====================================================
-- STEP 6: ATTEMPT TO INSERT WITH REAL USER ID
-- =====================================================

SELECT '=== ATTEMPTING TO INSERT WITH REAL USER ID ===' as info;

-- Try to insert using a real user ID from auth.users
SELECT 'Available user IDs from auth.users:' as info;
SELECT id, email FROM auth.users LIMIT 3;

-- Try to insert using the first available user ID
DO $$
DECLARE
    real_user_id uuid;
BEGIN
    SELECT id INTO real_user_id FROM auth.users LIMIT 1;
    
    IF real_user_id IS NOT NULL THEN
        -- Insert into public.users using real auth.users ID
        INSERT INTO public.users (id, email)
        VALUES (real_user_id, 'real-user@example.com')
        ON CONFLICT (id) DO NOTHING;
        
        RAISE NOTICE 'Successfully inserted user with ID: %', real_user_id;
    ELSE
        RAISE NOTICE 'No users found in auth.users';
    END IF;
END $$;
