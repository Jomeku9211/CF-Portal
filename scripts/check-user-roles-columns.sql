-- Check user_roles table columns and fix duplicate experience level columns
-- This script will identify and fix the column naming issue

-- 1. Check all columns in user_roles table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'user_roles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check if both experience_level and experience_level_id exist
SELECT 
    'experience_level' as column_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_roles' 
            AND column_name = 'experience_level'
        ) THEN 'EXISTS'
        ELSE 'MISSING'
    END as status
UNION ALL
SELECT 
    'experience_level_id' as column_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_roles' 
            AND column_name = 'experience_level_id'
        ) THEN 'EXISTS'
        ELSE 'MISSING'
    END as status;

-- 3. Check the data types of both columns
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_roles' 
AND table_schema = 'public'
AND column_name IN ('experience_level', 'experience_level_id');

-- 4. Check which column has data
SELECT 
    'experience_level' as column_name,
    COUNT(*) as non_null_count
FROM user_roles 
WHERE experience_level IS NOT NULL
UNION ALL
SELECT 
    'experience_level_id' as column_name,
    COUNT(*) as non_null_count
FROM user_roles 
WHERE experience_level_id IS NOT NULL;

-- 5. Drop the duplicate column (keep experience_level_id as it's more standard)
DO $$
BEGIN
    -- Check if both columns exist
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_roles' 
        AND column_name = 'experience_level'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_roles' 
        AND column_name = 'experience_level_id'
    ) THEN
        -- Drop the experience_level column (keep experience_level_id)
        ALTER TABLE public.user_roles DROP COLUMN experience_level;
        RAISE NOTICE '✅ Dropped duplicate experience_level column, keeping experience_level_id';
    ELSE
        RAISE NOTICE 'ℹ️ No duplicate columns found';
    END IF;
END $$;

-- 6. Verify the final schema
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_roles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 7. Test insert with the correct column name
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
        -- Try to insert with experience_level_id (the correct column)
        INSERT INTO public.user_roles (
            user_id, 
            role_id, 
            category_id, 
            specialization, 
            experience_level_id
        ) VALUES (
            test_user_id,
            test_role_id,
            test_category_id,
            'test-specialization',
            test_experience_level_id
        ) RETURNING id INTO test_result;
        
        RAISE NOTICE '✅ Test insert successful with experience_level_id. New ID: %', test_result;
        
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
