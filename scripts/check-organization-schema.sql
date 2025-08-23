-- =====================================================
-- CHECK ORGANIZATION TABLE STRUCTURE
-- =====================================================

-- Check the current organization table structure
SELECT 'Organization table structure:' as info;

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'organizations'
ORDER BY ordinal_position;

-- Check if there are any existing organizations
SELECT 'Existing organizations:' as info;
SELECT COUNT(*) as total_organizations FROM public.organizations;

-- Show a sample of the data structure (if any exists)
SELECT 'Sample data (if exists):' as info;
SELECT * FROM public.organizations LIMIT 1;

-- Check RLS policies on organizations table
SELECT 'RLS policies on organizations:' as info;
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'organizations';

-- Check for any constraints
SELECT 'Constraints on organizations:' as info;
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    LEFT JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.table_name = 'organizations';

-- Check what the form is trying to save vs what the table expects
SELECT 'Form data mapping analysis:' as info;
SELECT 
    'Form field' as field_type,
    'name' as form_field,
    'name' as table_column,
    '✅ Matches' as status
UNION ALL
SELECT 
    'Form field',
    'website', 
    'website',
    '✅ Matches'
UNION ALL
SELECT 
    'Form field',
    'size',
    'organization_size',
    '⚠️  Different names'
UNION ALL
SELECT 
    'Form field',
    'fundingStatus',
    'current_funding_status',
    '⚠️  Different names'
UNION ALL
SELECT 
    'Form field',
    'industry',
    'industry',
    '✅ Matches'
UNION ALL
SELECT 
    'Form field',
    'whatWeDo',
    'description',
    '⚠️  Different names';
