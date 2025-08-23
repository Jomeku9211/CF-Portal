-- Fix database schema issues
-- This script addresses the column mismatches found in the smoke test

-- 1. Check the actual schema of the users table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- 2. Check the actual schema of the service_provider_profiles table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'service_provider_profiles'
ORDER BY ordinal_position;

-- 3. Add missing columns if they don't exist
-- Add created_at to users table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'created_at') THEN
        ALTER TABLE public.users ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added created_at column to users table';
    ELSE
        RAISE NOTICE 'created_at column already exists in users table';
    END IF;
END $$;

-- Add role_id to service_provider_profiles table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'role_id') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN role_id UUID REFERENCES public.roles(id);
        RAISE NOTICE 'Added role_id column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'role_id column already exists in service_provider_profiles table';
    END IF;
END $$;

-- 4. Verify the current data
SELECT 'user_roles' as table_name, COUNT(*) as record_count FROM public.user_roles
UNION ALL
SELECT 'user_onboarding_progress', COUNT(*) FROM public.user_onboarding_progress
UNION ALL
SELECT 'service_provider_profiles', COUNT(*) FROM public.service_provider_profiles
UNION ALL
SELECT 'roles', COUNT(*) FROM public.roles
UNION ALL
SELECT 'role_categories', COUNT(*) FROM public.role_categories
UNION ALL
SELECT 'experience_levels', COUNT(*) FROM public.experience_levels;

-- 5. Show the specific user's data
SELECT 
    'user_roles' as table_name,
    ur.id,
    ur.user_id,
    ur.role_id,
    ur.category_id,
    ur.experience_level_id
FROM public.user_roles ur
WHERE ur.user_id = 'ea25f868-9887-4bfa-9207-dbccef4a3d71'

UNION ALL

SELECT 
    'user_onboarding_progress' as table_name,
    uop.id,
    uop.user_id,
    uop.role_id,
    uop.category_id,
    uop.experience_level_id
FROM public.user_onboarding_progress uop
WHERE uop.user_id = 'ea25f868-9887-4bfa-9207-dbccef4a3d71';


