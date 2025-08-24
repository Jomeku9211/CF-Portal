-- ============================================
-- Step 3: Add Constraints and Clean Up client_profiles
-- ============================================
-- Run this AFTER migrating data to organizations table

-- 1. Add foreign key constraint
ALTER TABLE public.organizations 
    ADD CONSTRAINT fk_organizations_client_profiles 
    FOREIGN KEY (client_profile_id) 
    REFERENCES public.client_profiles(id) 
    ON DELETE CASCADE;

-- 2. Clean up client_profiles table by removing organization-specific columns
-- First, let's backup the current structure (uncomment if needed)
-- CREATE TABLE client_profiles_backup AS SELECT * FROM client_profiles;

-- Remove organization-specific columns from client_profiles
ALTER TABLE public.client_profiles 
    DROP COLUMN IF EXISTS company_name,
    DROP COLUMN IF EXISTS company_size,
    DROP COLUMN IF EXISTS industry,
    DROP COLUMN IF EXISTS funding_status,
    DROP COLUMN IF EXISTS company_function,
    DROP COLUMN IF EXISTS revenue_status,
    DROP COLUMN IF EXISTS key_investors,
    DROP COLUMN IF EXISTS origin_story,
    DROP COLUMN IF EXISTS what_we_do,
    DROP COLUMN IF EXISTS who_we_serve,
    DROP COLUMN IF EXISTS vision,
    DROP COLUMN IF EXISTS why_join_us,
    DROP COLUMN IF EXISTS growth_plans,
    DROP COLUMN IF EXISTS success_metrics,
    DROP COLUMN IF EXISTS core_values_today,
    DROP COLUMN IF EXISTS core_values_aspirations,
    DROP COLUMN IF EXISTS culture_in_action;

-- 3. Add any missing client-specific columns if needed
ALTER TABLE public.client_profiles 
    ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
    ADD COLUMN IF NOT EXISTS job_title VARCHAR(100),
    ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255);

-- 4. Grant proper permissions for organizations table
-- Allow authenticated users to perform all operations
GRANT ALL ON TABLE public.organizations TO authenticated;

-- Allow authenticated users to insert, select, update, delete
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.organizations TO authenticated;

-- Allow authenticated users to use sequences (if any)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 5. Enable RLS on organizations table
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for organizations
CREATE POLICY "Users can view their own organizations" ON public.organizations
    FOR SELECT USING (
        client_profile_id IN (
            SELECT id FROM public.client_profiles 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own organizations" ON public.organizations
    FOR INSERT WITH CHECK (
        client_profile_id IN (
            SELECT id FROM public.client_profiles 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own organizations" ON public.organizations
    FOR UPDATE USING (
        client_profile_id IN (
            SELECT id FROM public.client_profiles 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own organizations" ON public.organizations
    FOR DELETE USING (
        client_profile_id IN (
            SELECT id FROM public.client_profiles 
            WHERE user_id = auth.uid()
        )
    );

-- 7. Verify cleanup
SELECT 
    'Cleanup Summary' as info,
    COUNT(*) as total_client_profiles,
    COUNT(CASE WHEN first_name IS NOT NULL OR last_name IS NOT NULL THEN 1 END) as profiles_with_names
FROM public.client_profiles;

-- 8. Show final client_profiles structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'client_profiles' 
ORDER BY ordinal_position; 
nte