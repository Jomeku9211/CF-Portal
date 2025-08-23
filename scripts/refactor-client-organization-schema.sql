-- ============================================
-- Client Profile and Organization Schema Refactor
-- ============================================
-- This script separates client profiles from organization data
-- One client can have multiple organizations (one-to-many relationship)

-- 1. Create organizations table first (without any constraints initially)
DROP TABLE IF EXISTS public.organizations CASCADE;
CREATE TABLE public.organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_profile_id UUID NOT NULL, -- Will add foreign key constraint later
    
    -- Basic Organization Info
    name VARCHAR(255) NOT NULL,
    company_size VARCHAR(50),
    industry VARCHAR(100),
    website VARCHAR(255),
    
    -- Financial Info
    funding_status VARCHAR(100),
    revenue_status VARCHAR(100),
    key_investors TEXT[],
    
    -- Organization Identity
    company_function VARCHAR(100),
    origin_story TEXT,
    what_we_do TEXT,
    who_we_serve TEXT[],
    vision TEXT,
    why_join_us TEXT,
    growth_plans TEXT,
    success_metrics TEXT[],
    
    -- Culture & Values
    core_values_today TEXT[],
    core_values_aspirations TEXT[],
    culture_in_action TEXT[],
    
    -- Metadata
    is_primary BOOLEAN DEFAULT false, -- Mark primary organization for client
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create index for faster lookups
CREATE INDEX idx_organizations_client_profile_id ON public.organizations(client_profile_id);
CREATE INDEX idx_organizations_primary ON public.organizations(client_profile_id, is_primary) WHERE is_primary = true;

-- 3. Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_organizations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_organizations_updated_at();

-- 4. Migrate existing data from client_profiles to organizations
-- Only migrate if there's data in client_profiles
INSERT INTO public.organizations (
    client_profile_id,
    name,
    company_size,
    industry,
    funding_status,
    revenue_status,
    key_investors,
    company_function,
    origin_story,
    what_we_do,
    who_we_serve,
    vision,
    why_join_us,
    growth_plans,
    success_metrics,
    core_values_today,
    core_values_aspirations,
    culture_in_action,
    is_primary
)
SELECT 
    id as client_profile_id,
    COALESCE(company_name, 'Default Organization') as name,
    company_size,
    industry,
    funding_status,
    revenue_status,
    key_investors,
    company_function,
    origin_story,
    what_we_do,
    who_we_serve,
    vision,
    why_join_us,
    growth_plans,
    success_metrics,
    core_values_today,
    core_values_aspirations,
    culture_in_action,
    true as is_primary -- First organization is primary
FROM public.client_profiles
WHERE company_name IS NOT NULL 
   OR company_size IS NOT NULL 
   OR industry IS NOT NULL;

-- 5. Now add the foreign key constraint after data migration
ALTER TABLE public.organizations 
    ADD CONSTRAINT fk_organizations_client_profiles 
    FOREIGN KEY (client_profile_id) 
    REFERENCES public.client_profiles(id) 
    ON DELETE CASCADE;

-- 6. Clean up client_profiles table by removing organization-specific columns
-- First, let's backup the current structure (commented out - uncomment if needed)
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

-- 7. Add any missing client-specific columns if needed
ALTER TABLE public.client_profiles 
    ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
    ADD COLUMN IF NOT EXISTS job_title VARCHAR(100),
    ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255);

-- 8. Enable RLS on organizations table
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for organizations
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

-- 10. Grant necessary permissions
-- Allow authenticated users to perform all operations
GRANT ALL ON TABLE public.organizations TO authenticated;

-- Allow authenticated users to insert, select, update, delete
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.organizations TO authenticated;

-- Allow authenticated users to use sequences (if any)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Service role permissions (for admin operations)
GRANT ALL ON public.organizations TO service_role;

COMMENT ON TABLE public.organizations IS 'Organizations table - one client can have multiple organizations';
COMMENT ON COLUMN public.organizations.client_profile_id IS 'Foreign key to client_profiles table';
COMMENT ON COLUMN public.organizations.is_primary IS 'Indicates if this is the primary organization for the client';
