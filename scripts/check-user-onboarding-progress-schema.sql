-- Check user_onboarding_progress table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_onboarding_progress' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check constraints
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_onboarding_progress'::regclass;

-- Check if table exists and has data
SELECT COUNT(*) as row_count FROM user_onboarding_progress;

-- Check sample data structure
SELECT * FROM user_onboarding_progress LIMIT 1;
