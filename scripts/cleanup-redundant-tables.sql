-- Clean up redundant onboarding tables and columns
-- This script removes unnecessary tables and simplifies the schema

-- 1. Drop the flow_metadata column from user_onboarding_progress
ALTER TABLE public.user_onboarding_progress 
DROP COLUMN IF EXISTS flow_metadata;

-- 2. Drop redundant tables that are no longer needed
DROP TABLE IF EXISTS public.project_applications CASCADE;
DROP TABLE IF EXISTS public.user_skills CASCADE;
DROP TABLE IF EXISTS public.onboarding_step_completions CASCADE;
DROP TABLE IF EXISTS public.user_onboarding_profiles CASCADE;

-- 3. Verify the cleaned up schema
-- user_onboarding_progress should now have only these essential columns:
-- - id, user_id, role_id, category_id, experience_level_id
-- - onboarding_flow, current_step, total_steps, completed_steps
-- - onboarding_status, last_activity
-- - location, primary_stack, experience_level, salary_min, salary_max
-- - work_style, availability_status, skills, domain_experience
-- - created_at, updated_at

-- 4. Check what tables remain
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%onboarding%' 
OR table_name LIKE '%profile%'
ORDER BY table_name;

-- 5. Show the final clean schema
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('user_onboarding_progress', 'service_provider_profiles', 'client_profiles', 'agency_profiles')
ORDER BY table_name, ordinal_position;
