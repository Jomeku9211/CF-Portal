-- ============================================
-- Step 2: Migrate Data from client_profiles to organizations
-- ============================================
-- Run this AFTER creating the organizations table

-- 1. Create indexes for better performance
CREATE INDEX idx_organizations_client_profile_id ON public.organizations(client_profile_id);
CREATE INDEX idx_organizations_primary ON public.organizations(client_profile_id, is_primary) WHERE is_primary = true;

-- 2. Create trigger for updated_at
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

-- 3. Migrate existing data from client_profiles to organizations
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

-- 4. Verify migration
SELECT 
    'Migration Summary' as info,
    COUNT(*) as total_organizations_created,
    COUNT(DISTINCT client_profile_id) as unique_clients_with_organizations
FROM public.organizations;

-- 5. Show sample migrated data
SELECT 
    o.name as organization_name,
    o.industry,
    o.company_size,
    cp.user_id
FROM public.organizations o
JOIN public.client_profiles cp ON o.client_profile_id = cp.id
LIMIT 5;
