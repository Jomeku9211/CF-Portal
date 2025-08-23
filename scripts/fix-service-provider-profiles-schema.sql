-- Fix the service_provider_profiles table schema
-- Add missing columns that are needed for the profile data

-- 1. Check current schema
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'service_provider_profiles'
ORDER BY ordinal_position;

-- 2. Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Add role_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'role_id') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN role_id UUID REFERENCES public.roles(id);
        RAISE NOTICE 'Added role_id column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'role_id column already exists in service_provider_profiles table';
    END IF;

    -- Add category_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'category_id') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN category_id UUID REFERENCES public.role_categories(id);
        RAISE NOTICE 'Added category_id column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'category_id column already exists in service_provider_profiles table';
    END IF;

    -- Add specialization column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'specialization') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN specialization TEXT;
        RAISE NOTICE 'Added specialization column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'specialization column already exists in service_provider_profiles table';
    END IF;

    -- Add experience_level_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'experience_level_id') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN experience_level_id UUID REFERENCES public.experience_levels(id);
        RAISE NOTICE 'Added experience_level_id column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'experience_level_id column already exists in service_provider_profiles table';
    END IF;

    -- Add bio column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'bio') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN bio TEXT;
        RAISE NOTICE 'Added bio column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'bio column already exists in service_provider_profiles table';
    END IF;

    -- Add skills column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'skills') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN skills TEXT[];
        RAISE NOTICE 'Added skills column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'skills column already exists in service_provider_profiles table';
    END IF;

    -- Add hourly_rate column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'hourly_rate') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN hourly_rate INTEGER;
        RAISE NOTICE 'Added hourly_rate column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'hourly_rate column already exists in service_provider_profiles table';
    END IF;

    -- Add availability column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'availability') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN availability TEXT;
        RAISE NOTICE 'Added availability column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'availability column already exists in service_provider_profiles table';
    END IF;

    -- Add portfolio_url column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'portfolio_url') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN portfolio_url TEXT;
        RAISE NOTICE 'Added portfolio_url column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'portfolio_url column already exists in service_provider_profiles table';
    END IF;

    -- Add linkedin_url column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'linkedin_url') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN linkedin_url TEXT;
        RAISE NOTICE 'Added linkedin_url column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'linkedin_url column already exists in service_provider_profiles table';
    END IF;

    -- Add github_url column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'github_url') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN github_url TEXT;
        RAISE NOTICE 'Added github_url column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'github_url column already exists in service_provider_profiles table';
    END IF;

    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'created_at') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added created_at column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'created_at column already exists in service_provider_profiles table';
    END IF;

    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'service_provider_profiles' AND column_name = 'updated_at') THEN
        ALTER TABLE public.service_provider_profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column to service_provider_profiles table';
    ELSE
        RAISE NOTICE 'updated_at column already exists in service_provider_profiles table';
    END IF;

END $$;

-- 3. Show the updated schema
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'service_provider_profiles'
ORDER BY ordinal_position;

-- 4. Verify the table is ready for data insertion
SELECT 
    'service_provider_profiles' as table_name,
    COUNT(*) as column_count
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'service_provider_profiles';
