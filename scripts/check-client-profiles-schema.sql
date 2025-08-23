-- Check client_profiles table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'client_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if table exists and has data
SELECT COUNT(*) as row_count FROM client_profiles;

-- Check sample data structure
SELECT * FROM client_profiles LIMIT 1;

