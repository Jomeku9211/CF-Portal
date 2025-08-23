-- =====================================================
-- FIX ORGANIZATION DATA MAPPING
-- =====================================================

-- First, let's see the exact structure of the organizations table
SELECT 'Current organizations table structure:' as info;

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
SELECT 'Existing organizations count:' as info;
SELECT COUNT(*) as total_organizations FROM public.organizations;

-- Check if the table has the required columns for our form data
SELECT 'Column mapping check:' as info;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'name') 
        THEN '✅ name column exists' 
        ELSE '❌ name column missing' 
    END as name_check,
    
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'website') 
        THEN '✅ website column exists' 
        ELSE '❌ website column missing' 
    END as website_check,
    
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'organization_size') 
        THEN '✅ organization_size column exists' 
        ELSE '❌ organization_size column missing' 
    END as size_check,
    
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'industry') 
        THEN '✅ industry column exists' 
        ELSE '❌ industry column missing' 
    END as industry_check,
    
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'current_funding_status') 
        THEN '✅ current_funding_status column exists' 
        ELSE '❌ current_funding_status column missing' 
    END as funding_check,
    
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'description') 
        THEN '✅ description column exists' 
        ELSE '❌ description column missing' 
    END as description_check,
    
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'created_by') 
        THEN '✅ created_by column exists' 
        ELSE '❌ created_by column missing' 
    END as created_by_check,
    
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'flow_metadata') 
        THEN '✅ flow_metadata column exists' 
        ELSE '❌ flow_metadata column missing' 
    END as metadata_check;

-- Check RLS policies
SELECT 'RLS policies on organizations:' as info;
SELECT 
    policyname,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'organizations';

-- Test insert (commented out for safety)
SELECT 'Test insert command (commented out):' as info;
SELECT '-- INSERT INTO public.organizations (name, website, organization_size, industry, current_funding_status, description, created_by, flow_metadata) VALUES (''Test Org'', ''https://test.com'', ''10-50'', ''Technology'', ''Seed'', ''Test description'', auth.uid(), ''{}'');' as test_command;

-- Show sample data structure if any exists
SELECT 'Sample data structure (if exists):' as info;
SELECT * FROM public.organizations LIMIT 1;


