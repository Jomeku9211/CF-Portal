-- Check which columns are required (NOT NULL) in service_provider_profiles table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'service_provider_profiles'
AND is_nullable = 'NO'
ORDER BY ordinal_position;

-- Also show columns with default values
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'service_provider_profiles'
AND column_default IS NOT NULL
ORDER BY ordinal_position;


