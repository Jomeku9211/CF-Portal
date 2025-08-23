-- Check the actual schema of service_provider_profiles table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'service_provider_profiles'
ORDER BY ordinal_position;
