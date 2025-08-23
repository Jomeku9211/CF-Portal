-- Create all required tables for CF Portal onboarding flow
-- This script creates the missing tables that the application needs

-- 1. Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    organization_size VARCHAR(50),
    current_funding_status VARCHAR(100),
    website VARCHAR(255),
    location VARCHAR(255),
    created_by UUID REFERENCES auth.users(id),
    flow_metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    team_size VARCHAR(50),
    created_by UUID REFERENCES auth.users(id),
    flow_metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create job_posts table
CREATE TABLE IF NOT EXISTS public.job_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    budget_range VARCHAR(100),
    project_duration VARCHAR(100),
    skills_needed TEXT[],
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
    created_by UUID REFERENCES auth.users(id),
    flow_metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create onboarding_step_completions table (if not exists)
CREATE TABLE IF NOT EXISTS public.onboarding_step_completions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    step_name VARCHAR(100) NOT NULL,
    step_data JSONB,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create user_roles table (if not exists)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.role_categories(id) ON DELETE CASCADE,
    specialization_id UUID REFERENCES public.specializations(id) ON DELETE SET NULL,
    experience_level_id UUID REFERENCES public.experience_levels(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create user_onboarding_progress table (if not exists)
CREATE TABLE IF NOT EXISTS public.user_onboarding_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.role_categories(id) ON DELETE CASCADE,
    experience_level_id UUID REFERENCES public.experience_levels(id) ON DELETE SET NULL,
    onboarding_flow TEXT NOT NULL,
    current_step INTEGER DEFAULT 1,
    total_steps INTEGER DEFAULT 3,
    completed_steps TEXT[],
    onboarding_status TEXT DEFAULT 'in_progress',
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    flow_metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create roles table (if not exists)
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create role_categories table (if not exists)
CREATE TABLE IF NOT EXISTS public.role_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create experience_levels table (if not exists)
CREATE TABLE IF NOT EXISTS public.experience_levels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    years_experience INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create specializations table (if not exists)
CREATE TABLE IF NOT EXISTS public.specializations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.role_categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data for roles
INSERT INTO public.roles (id, name, description) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'client', 'Client looking to hire services'),
    ('550e8400-e29b-41d4-a716-446655440002', 'service-provider', 'Individual service provider/freelancer'),
    ('550e8400-e29b-41d4-a716-446655440003', 'agency', 'Agency providing services')
ON CONFLICT (name) DO NOTHING;

-- Insert default data for role categories
INSERT INTO public.role_categories (id, role_id, name, description) VALUES
    ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'startup', 'Startup company'),
    ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'enterprise', 'Enterprise company'),
    ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'founder', 'Individual founder'),
    ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'software-developer', 'Software developer'),
    ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'designer', 'UI/UX designer'),
    ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'marketer', 'Digital marketer')
ON CONFLICT DO NOTHING;

-- Insert default data for experience levels
INSERT INTO public.experience_levels (id, name, description, years_experience) VALUES
    ('770e8400-e29b-41d4-a716-446655440001', 'entry', 'Entry level (0-2 years)', 1),
    ('770e8400-e29b-41d4-a716-446655440002', 'junior', 'Junior level (2-4 years)', 3),
    ('770e8400-e29b-41d4-a716-446655440003', 'mid', 'Mid level (4-7 years)', 5),
    ('770e8400-e29b-41d4-a716-446655440004', 'senior', 'Senior level (7-10 years)', 8),
    ('770e8400-e29b-41d4-a716-446655440005', 'expert', 'Expert level (10+ years)', 12)
ON CONFLICT (name) DO NOTHING;

-- Insert default data for specializations
INSERT INTO public.specializations (id, category_id, name, description) VALUES
    ('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440004', 'frontend', 'Frontend development'),
    ('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', 'backend', 'Backend development'),
    ('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004', 'fullstack', 'Full-stack development'),
    ('880e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 'mobile', 'Mobile development')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_step_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specializations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for organizations
CREATE POLICY "Users can view their own organizations" ON public.organizations
    FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can insert their own organizations" ON public.organizations
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own organizations" ON public.organizations
    FOR UPDATE USING (auth.uid() = created_by);

-- Create RLS policies for teams
CREATE POLICY "Users can view teams in their organizations" ON public.teams
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organizations 
            WHERE organizations.id = teams.organization_id 
            AND organizations.created_by = auth.uid()
        )
    );

CREATE POLICY "Users can insert teams in their organizations" ON public.teams
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.organizations 
            WHERE organizations.id = teams.organization_id 
            AND organizations.created_by = auth.uid()
        )
    );

-- Create RLS policies for job posts
CREATE POLICY "Users can view job posts in their organizations" ON public.job_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organizations 
            WHERE organizations.id = job_posts.organization_id 
            AND organizations.created_by = auth.uid()
        )
    );

CREATE POLICY "Users can insert job posts in their organizations" ON public.job_posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.organizations 
            WHERE organizations.id = job_posts.organization_id 
            AND organizations.created_by = auth.uid()
        )
    );

-- Create RLS policies for onboarding progress
CREATE POLICY "Users can view their own onboarding progress" ON public.user_onboarding_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding progress" ON public.user_onboarding_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding progress" ON public.user_onboarding_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for step completions
CREATE POLICY "Users can view their own step completions" ON public.onboarding_step_completions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own step completions" ON public.onboarding_step_completions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own step completions" ON public.onboarding_step_completions
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles" ON public.user_roles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own roles" ON public.user_roles
    FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for reference tables
CREATE POLICY "Anyone can view roles" ON public.roles FOR SELECT USING (true);
CREATE POLICY "Anyone can view role categories" ON public.role_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view experience levels" ON public.experience_levels FOR SELECT USING (true);
CREATE POLICY "Anyone can view specializations" ON public.specializations FOR SELECT USING (true);

-- Display created tables
SELECT 'Tables created successfully!' as status;

-- Show table counts
SELECT 'organizations' as table_name, COUNT(*) as count FROM public.organizations
UNION ALL
SELECT 'teams' as table_name, COUNT(*) as count FROM public.teams
UNION ALL
SELECT 'job_posts' as table_name, COUNT(*) as count FROM public.job_posts
UNION ALL
SELECT 'roles' as table_name, COUNT(*) as count FROM public.roles
UNION ALL
SELECT 'role_categories' as table_name, COUNT(*) as count FROM public.role_categories
UNION ALL
SELECT 'experience_levels' as table_name, COUNT(*) as count FROM public.experience_levels
UNION ALL
SELECT 'specializations' as table_name, COUNT(*) as count FROM public.specializations;





