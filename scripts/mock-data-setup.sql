-- Mock Data Setup for CF Portal
-- This script populates the database with test data for development and testing

-- Clear existing data (optional - uncomment if you want fresh start)
-- DELETE FROM public.user_onboarding_progress;
-- DELETE FROM public.user_roles;
-- DELETE FROM public.organizations;
-- DELETE FROM public.teams;
-- DELETE FROM public.job_posts;
-- DELETE FROM public.onboarding_step_completions;

-- 1. Insert Roles
INSERT INTO public.roles (id, name, description, created_at, updated_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'client', 'Client looking to hire services', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'service-provider', 'Individual service provider/freelancer', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'agency', 'Agency providing services', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Role Categories
INSERT INTO public.role_categories (id, role_id, name, description, created_at, updated_at) VALUES
  -- Client categories
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'startup', 'Startup company', NOW(), NOW()),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'enterprise', 'Enterprise company', NOW(), NOW()),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'founder', 'Individual founder', NOW(), NOW()),
  
  -- Service Provider categories
  ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'software-developer', 'Software developer', NOW(), NOW()),
  ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'designer', 'UI/UX designer', NOW(), NOW()),
  ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'marketer', 'Digital marketer', NOW(), NOW()),
  
  -- Agency categories
  ('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'web-agency', 'Web development agency', NOW(), NOW()),
  ('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'design-agency', 'Design agency', NOW(), NOW()),
  ('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', 'marketing-agency', 'Marketing agency', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Experience Levels (only for service providers)
INSERT INTO public.experience_levels (id, name, description, years_experience, created_at, updated_at) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'entry', 'Entry level (0-2 years)', 1, NOW(), NOW()),
  ('770e8400-e29b-41d4-a716-446655440002', 'junior', 'Junior level (2-4 years)', 3, NOW(), NOW()),
  ('770e8400-e29b-41d4-a716-446655440003', 'mid', 'Mid level (4-7 years)', 5, NOW(), NOW()),
  ('770e8400-e29b-41d4-a716-446655440004', 'senior', 'Senior level (7-10 years)', 8, NOW(), NOW()),
  ('770e8400-e29b-41d4-a716-446655440005', 'expert', 'Expert level (10+ years)', 12, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Specializations (for service providers)
INSERT INTO public.specializations (id, category_id, name, description, created_at, updated_at) VALUES
  -- Software Developer specializations
  ('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440004', 'frontend', 'Frontend development', NOW(), NOW()),
  ('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', 'backend', 'Backend development', NOW(), NOW()),
  ('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004', 'fullstack', 'Full-stack development', NOW(), NOW()),
  ('880e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 'mobile', 'Mobile development', NOW(), NOW()),
  
  -- Designer specializations
  ('880e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', 'ui', 'User Interface design', NOW(), NOW()),
  ('880e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440005', 'ux', 'User Experience design', NOW(), NOW()),
  ('880e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440005', 'graphic', 'Graphic design', NOW(), NOW()),
  
  -- Marketer specializations
  ('880e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440006', 'social-media', 'Social media marketing', NOW(), NOW()),
  ('880e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440006', 'seo', 'Search engine optimization', NOW(), NOW()),
  ('880e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440006', 'ppc', 'Pay-per-click advertising', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. Insert test users (these will be created by Supabase Auth, but we can reference them)
-- Note: Replace these UUIDs with actual user IDs from your Supabase Auth when testing

-- 6. Insert test organizations
INSERT INTO public.organizations (id, name, description, industry, organization_size, current_funding_status, website, location, created_at, updated_at) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'TechStart Inc', 'Innovative startup focused on AI solutions', 'Technology', '10-50', 'seed', 'https://techstart.com', 'San Francisco, CA', NOW(), NOW()),
  ('990e8400-e29b-41d4-a716-446655440002', 'DesignHub Agency', 'Creative design agency for modern brands', 'Design', '5-10', 'bootstrapped', 'https://designhub.com', 'New York, NY', NOW(), NOW()),
  ('990e8400-e29b-41d4-a716-446655440003', 'DevCorp Solutions', 'Full-service development company', 'Technology', '50-100', 'series-a', 'https://devcorp.com', 'Austin, TX', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 7. Insert test teams
INSERT INTO public.teams (id, organization_id, name, description, team_size, created_at, updated_at) VALUES
  ('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'Engineering Team', 'Core development team', 15, NOW(), NOW()),
  ('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 'Product Team', 'Product management and design', 8, NOW(), NOW()),
  ('aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', 'Creative Team', 'Design and creative services', 12, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 8. Insert test job posts
INSERT INTO public.job_posts (id, organization_id, title, description, requirements, budget_range, project_duration, skills_needed, created_at, updated_at) VALUES
  ('bb0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'Senior Frontend Developer', 'Looking for an experienced React developer', '5+ years React, TypeScript, CSS', '5000-8000', '3-6 months', 'React, TypeScript, CSS, UI/UX', NOW(), NOW()),
  ('bb0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', 'UI/UX Designer', 'Creative designer for brand identity', '3+ years design experience', '3000-6000', '2-4 months', 'Figma, Adobe Creative Suite, Branding', NOW(), NOW()),
  ('bb0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', 'Full-Stack Developer', 'Developer for e-commerce platform', '4+ years full-stack experience', '8000-12000', '4-8 months', 'Node.js, React, PostgreSQL, AWS', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 9. Insert test onboarding step completions
INSERT INTO public.onboarding_step_completions (id, user_id, step_name, step_data, completed, created_at, updated_at) VALUES
  ('cc0e8400-e29b-41d4-a716-446655440001', 'test-user-1', 'role_selection', '{"role": "client", "category": "founder"}', true, NOW(), NOW()),
  ('cc0e8400-e29b-41d4-a716-446655440002', 'test-user-2', 'role_selection', '{"role": "service-provider", "category": "software-developer", "specialization": "frontend", "experience_level": "mid"}', true, NOW(), NOW()),
  ('cc0e8400-e29b-41d4-a716-446655440003', 'test-user-3', 'organization_profile', '{"name": "TestOrg", "industry": "Technology"}', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 10. Insert test user onboarding progress
INSERT INTO public.user_onboarding_progress (id, user_id, role_id, category_id, experience_level_id, onboarding_flow, current_step, total_steps, completed_steps, onboarding_status, created_at, updated_at) VALUES
  ('dd0e8400-e29b-41d4-a716-446655440001', 'test-user-1', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', NULL, 'client', 2, 3, '["role_selection"]', 'in_progress', NOW(), NOW()),
  ('dd0e8400-e29b-41d4-a716-446655440002', 'test-user-2', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440003', 'developer', 3, 5, '["role_selection", "experience_selection"]', 'in_progress', NOW(), NOW()),
  ('dd0e8400-e29b-41d4-a716-446655440003', 'test-user-3', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', NULL, 'client', 1, 3, '[]', 'not_started', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 11. Insert test user roles
INSERT INTO public.user_roles (id, user_id, role_id, category_id, specialization_id, experience_level_id, created_at, updated_at) VALUES
  ('ee0e8400-e29b-41d4-a716-446655440001', 'test-user-1', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', NULL, NULL, NOW(), NOW()),
  ('ee0e8400-e29b-41d4-a716-446655440002', 'test-user-2', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
  ('ee0e8400-e29b-41d4-a716-446655440003', 'test-user-3', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', NULL, NULL, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Display the inserted data
SELECT 'Roles' as table_name, COUNT(*) as count FROM public.roles
UNION ALL
SELECT 'Role Categories' as table_name, COUNT(*) as count FROM public.role_categories
UNION ALL
SELECT 'Experience Levels' as table_name, COUNT(*) as count FROM public.experience_levels
UNION ALL
SELECT 'Specializations' as table_name, COUNT(*) as count FROM public.specializations
UNION ALL
SELECT 'Organizations' as table_name, COUNT(*) as count FROM public.organizations
UNION ALL
SELECT 'Teams' as table_name, COUNT(*) as count FROM public.teams
UNION ALL
SELECT 'Job Posts' as table_name, COUNT(*) as count FROM public.job_posts
UNION ALL
SELECT 'Onboarding Step Completions' as table_name, COUNT(*) as count FROM public.onboarding_step_completions
UNION ALL
SELECT 'User Onboarding Progress' as table_name, COUNT(*) as count FROM public.user_onboarding_progress
UNION ALL
SELECT 'User Roles' as table_name, COUNT(*) as count FROM public.user_roles;

-- Display sample data for verification
SELECT 'Sample Roles:' as info;
SELECT id, name, description FROM public.roles LIMIT 3;

SELECT 'Sample Role Categories:' as info;
SELECT rc.id, rc.name, r.name as role_name 
FROM public.role_categories rc 
JOIN public.roles r ON rc.role_id = r.id 
LIMIT 5;

SELECT 'Sample Experience Levels:' as info;
SELECT id, name, years_experience FROM public.experience_levels LIMIT 3;





