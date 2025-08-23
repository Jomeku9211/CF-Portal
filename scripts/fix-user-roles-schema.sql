-- Fix user_roles table schema - Add missing experience_level column
-- This script will check the current schema and add the missing column

-- 1. Check current user_roles table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_roles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check if experience_level column exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_roles' 
            AND column_name = 'experience_level'
        ) THEN '✅ experience_level column EXISTS'
        ELSE '❌ experience_level column MISSING'
    END as column_status;

-- 3. Add experience_level column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_roles' 
        AND column_name = 'experience_level'
    ) THEN
        ALTER TABLE public.user_roles 
        ADD COLUMN experience_level UUID REFERENCES public.experience_levels(id);
        
        RAISE NOTICE '✅ Added experience_level column to user_roles table';
    ELSE
        RAISE NOTICE 'ℹ️ experience_level column already exists';
    END IF;
END $$;

-- 4. Verify the column was added
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_roles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Check foreign key constraints
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name = 'user_roles';

-- 6. Test insert with experience_level
DO $$
DECLARE
    test_user_id UUID;
    test_role_id UUID;
    test_category_id UUID;
    test_experience_level_id UUID;
    test_result UUID;
BEGIN
    -- Get test data
    SELECT id INTO test_user_id FROM public.users LIMIT 1;
    SELECT id INTO test_role_id FROM public.roles WHERE name = 'service-provider' LIMIT 1;
    SELECT id INTO test_category_id FROM public.role_categories LIMIT 1;
    SELECT id INTO test_experience_level_id FROM public.experience_levels LIMIT 1;
    
    IF test_user_id IS NOT NULL AND test_role_id IS NOT NULL AND test_category_id IS NOT NULL AND test_experience_level_id IS NOT NULL THEN
        -- Try to insert with experience_level
        INSERT INTO public.user_roles (
            user_id, 
            role_id, 
            category_id, 
            specialization, 
            experience_level
        ) VALUES (
            test_user_id,
            test_role_id,
            test_category_id,
            'test-specialization',
            test_experience_level_id
        ) RETURNING id INTO test_result;
        
        RAISE NOTICE '✅ Test insert successful with experience_level. New ID: %', test_result;
        
        -- Clean up test data
        DELETE FROM public.user_roles WHERE id = test_result;
        RAISE NOTICE '🧹 Test data cleaned up';
        
    ELSE
        RAISE NOTICE '⚠️ Missing test data: user_id=%, role_id=%, category_id=%, experience_level_id=%', 
            test_user_id, test_role_id, test_category_id, test_experience_level_id;
    END IF;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Error during test insert: %', SQLERRM;
END $$;
