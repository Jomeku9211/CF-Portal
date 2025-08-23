-- =====================================================
-- FLEXIBLE SUPABASE DATABASE DESIGN
-- Supporting Multiple Roles per User
-- =====================================================
-- Users can be: client, service provider, agency, or any combination
-- A service provider can hire other service providers
-- An agency can be a client for other services
-- A client can also offer services

-- =====================================================
-- 1. CREATE ROLES TABLE (Core role definitions)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  button_label VARCHAR(100),
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to roles" ON public.roles FOR SELECT USING (true);

-- =====================================================
-- 2. CREATE ROLE CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.role_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.role_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to role categories" ON public.role_categories FOR SELECT USING (true);

-- =====================================================
-- 3. CREATE EXPERIENCE LEVELS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.experience_levels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  years VARCHAR(50),
  tagline VARCHAR(200),
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.experience_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to experience levels" ON public.experience_levels FOR SELECT USING (true);

-- =====================================================
-- 4. CREATE PROFILES TABLE (Base user profile)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  
  -- Common fields for all user types
  bio TEXT,
  location TEXT,
  timezone TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  
  -- Company/Organization fields (for agencies and some clients)
  company_name TEXT,
  company_size TEXT, -- '1-10', '11-50', '51-200', '200+'
  industry TEXT,
  funding_stage TEXT, -- 'seed', 'series-a', 'series-b', 'established'
  
  -- Verification and status
  is_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'suspended'
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- =====================================================
-- 5. CREATE USER ROLES TABLE (Multiple roles per user)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.role_categories(id) ON DELETE CASCADE,
  specialization TEXT,
  experience_level_id UUID REFERENCES public.experience_levels(id),
  
  -- Role-specific metadata
  role_metadata JSONB DEFAULT '{}',
  
  -- Status for this specific role
  is_active BOOLEAN DEFAULT TRUE,
  is_primary BOOLEAN DEFAULT FALSE, -- Primary role for display purposes
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- A user can have multiple roles, but only one primary role
  UNIQUE(user_id, role_id),
  UNIQUE(user_id) WHERE is_primary = TRUE
);

-- =====================================================
-- 6. CREATE SERVICE PROVIDER PROFILES (When user acts as service provider)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.service_provider_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_role_id UUID REFERENCES public.user_roles(id) ON DELETE CASCADE NOT NULL,
  
  -- Service provider specific fields
  hourly_rate DECIMAL(10,2),
  daily_rate DECIMAL(10,2),
  project_rate DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  
  -- Availability and preferences
  availability TEXT, -- 'full-time', 'part-time', 'freelance', 'contract'
  remote_preference TEXT, -- 'remote-only', 'hybrid', 'on-site'
  timezone_preference TEXT[],
  
  -- Skills and expertise
  skills TEXT[],
  technologies TEXT[],
  certifications TEXT[],
  
  -- Work preferences
  min_project_size DECIMAL(10,2),
  max_project_size DECIMAL(10,2),
  preferred_project_types TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  UNIQUE(user_id, user_role_id)
);

-- =====================================================
-- 7. CREATE AGENCY PROFILES (When user acts as agency)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.agency_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_role_id UUID REFERENCES public.user_roles(id) ON DELETE CASCADE NOT NULL,
  
  -- Agency specific fields
  team_size INTEGER,
  services_offered TEXT[],
  industries_served TEXT[],
  client_types TEXT[], -- 'startup', 'enterprise', 'government', etc.
  
  -- Agency capabilities
  project_capacity INTEGER, -- How many projects can handle simultaneously
  avg_project_duration TEXT, -- '1-3 months', '3-6 months', '6+ months'
  
  -- Team structure
  team_structure JSONB, -- Detailed team composition
  key_team_members JSONB[], -- Array of key team member info
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  UNIQUE(user_id, user_role_id)
);

-- =====================================================
-- 8. CREATE CLIENT PROFILES (When user acts as client)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.client_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_role_id UUID REFERENCES public.user_roles(id) ON DELETE CASCADE NOT NULL,
  
  -- Client specific fields
  project_budget_range TEXT, -- '0-10k', '10k-50k', '50k-100k', '100k+'
  project_timeline TEXT, -- '1-3 months', '3-6 months', '6+ months'
  project_urgency TEXT, -- 'low', 'medium', 'high', 'urgent'
  
  -- Project requirements
  project_type TEXT, -- 'web-app', 'mobile-app', 'design', 'consulting', etc.
  project_scope TEXT, -- 'MVP', 'full-featured', 'enterprise', etc.
  
  -- Client preferences
  preferred_team_size TEXT, -- 'individual', 'small-team', 'large-team'
  preferred_experience_level TEXT, -- 'junior', 'mid-level', 'senior', 'mixed'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  UNIQUE(user_id, user_role_id)
);

-- =====================================================
-- 9. CREATE USER SKILLS TABLE (Skills for service providers)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')) NOT NULL,
  years_experience INTEGER,
  endorsed_count INTEGER DEFAULT 0,
  endorsements JSONB[], -- Array of endorsement objects
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  UNIQUE(user_id, skill_name)
);

-- =====================================================
-- 10. CREATE USER PORTFOLIO TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_title TEXT NOT NULL,
  project_description TEXT,
  project_url TEXT,
  github_url TEXT,
  technologies TEXT[],
  project_image_url TEXT,
  project_video_url TEXT,
  
  -- Project metadata
  project_type TEXT,
  client_name TEXT,
  project_duration TEXT,
  project_budget TEXT,
  team_size INTEGER,
  
  -- Portfolio settings
  is_featured BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =====================================================
-- 11. CREATE PROJECTS TABLE (For job postings and collaborations)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  client_role_id UUID REFERENCES public.user_roles(id) ON DELETE CASCADE NOT NULL,
  
  -- Project details
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  
  -- Project specifications
  project_type TEXT,
  project_scope TEXT,
  budget_range TEXT,
  timeline TEXT,
  urgency TEXT,
  
  -- Team requirements
  required_team_size INTEGER,
  required_experience_level TEXT,
  required_skills TEXT[],
  required_technologies TEXT[],
  
  -- Project status
  status TEXT DEFAULT 'open', -- 'open', 'in-progress', 'completed', 'cancelled'
  visibility TEXT DEFAULT 'public', -- 'public', 'private', 'invite-only'
  
  -- Location and remote work
  location TEXT,
  remote_allowed BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =====================================================
-- 12. CREATE PROJECT APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.project_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  applicant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  applicant_role_id UUID REFERENCES public.user_roles(id) ON DELETE CASCADE NOT NULL,
  
  -- Application details
  proposal TEXT,
  proposed_budget DECIMAL(10,2),
  proposed_timeline TEXT,
  
  -- Application status
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'
  
  -- Additional info
  attachments JSONB[], -- Array of attachment objects
  questions_answers JSONB, -- Q&A if client has specific questions
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  UNIQUE(project_id, applicant_id)
);

-- =====================================================
-- 13. CREATE COLLABORATIONS TABLE (For ongoing projects)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.collaborations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  service_provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Collaboration details
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'paused', 'cancelled'
  
  -- Terms and conditions
  agreed_budget DECIMAL(10,2),
  agreed_timeline TEXT,
  payment_terms TEXT,
  
  -- Performance tracking
  milestones JSONB[],
  deliverables JSONB[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =====================================================
-- 14. SET UP ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING ((SELECT auth.uid()) = id);

-- User Roles RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles." ON public.user_roles FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can insert their own roles." ON public.user_roles FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can update their own roles." ON public.user_roles FOR UPDATE USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can delete their own roles." ON public.user_roles FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- Service Provider Profiles RLS
ALTER TABLE public.service_provider_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service provider profiles are viewable by everyone." ON public.service_provider_profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their own service provider profile." ON public.service_provider_profiles FOR ALL USING ((SELECT auth.uid()) = user_id);

-- Agency Profiles RLS
ALTER TABLE public.agency_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agency profiles are viewable by everyone." ON public.agency_profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their own agency profile." ON public.agency_profiles FOR ALL USING ((SELECT auth.uid()) = user_id);

-- Client Profiles RLS
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Client profiles are viewable by everyone." ON public.client_profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their own client profile." ON public.client_profiles FOR ALL USING ((SELECT auth.uid()) = user_id);

-- Projects RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public projects are viewable by everyone." ON public.projects FOR SELECT USING (visibility = 'public');
CREATE POLICY "Users can view their own projects." ON public.projects FOR SELECT USING ((SELECT auth.uid()) = client_id);
CREATE POLICY "Users can manage their own projects." ON public.projects FOR ALL USING ((SELECT auth.uid()) = client_id);

-- Project Applications RLS
ALTER TABLE public.project_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view applications for their projects." ON public.projects FOR SELECT USING ((SELECT auth.uid()) = client_id);
CREATE POLICY "Users can manage their own applications." ON public.project_applications FOR ALL USING ((SELECT auth.uid()) = applicant_id);

-- =====================================================
-- 15. CREATE TRIGGERS AND FUNCTIONS
-- =====================================================

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, username, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'username',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE OR REPLACE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER handle_user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER handle_service_provider_profiles_updated_at
  BEFORE UPDATE ON public.service_provider_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER handle_agency_profiles_updated_at
  BEFORE UPDATE ON public.agency_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER handle_client_profiles_updated_at
  BEFORE UPDATE ON public.client_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER handle_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- =====================================================
-- 16. SET UP STORAGE
-- =====================================================

-- Set up Storage buckets
INSERT INTO storage.buckets (id, name)
  VALUES ('avatars', 'avatars')
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name)
  VALUES ('portfolio', 'portfolio')
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name)
  VALUES ('project-files', 'project-files')
ON CONFLICT (id) DO NOTHING;

-- Set up access controls for storage
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Anyone can upload an avatar." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Users can update their own avatar." ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can delete their own avatar." ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Portfolio images are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Users can upload portfolio images." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Users can update their own portfolio images." ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can delete their own portfolio images." ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND (storage.foldername(name))[1] = auth.uid()::text);

-- =====================================================
-- 17. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_primary ON public.user_roles(is_primary) WHERE is_primary = TRUE;
CREATE INDEX IF NOT EXISTS idx_service_provider_profiles_user_id ON public.service_provider_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_agency_profiles_user_id ON public.agency_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_client_profiles_user_id ON public.client_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_visibility ON public.projects(visibility);
CREATE INDEX IF NOT EXISTS idx_project_applications_project_id ON public.project_applications(project_id);
CREATE INDEX IF NOT EXISTS idx_project_applications_applicant_id ON public.project_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_project_applications_status ON public.project_applications(status);

-- =====================================================
-- 18. INSERT SAMPLE DATA - ROLES
-- =====================================================
INSERT INTO public.roles (name, description, button_label, icon) VALUES
('client', 'I need to hire talent for my projects or company', 'Hire Talent', 'users'),
('service-provider', 'I offer services and want to get hired', 'Offer Services', 'user'),
('agency', 'I run a team/agency and want to list my services', 'List My Agency', 'building')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 19. INSERT SAMPLE DATA - ROLE CATEGORIES
-- =====================================================
INSERT INTO public.role_categories (name, description, role_id, metadata) VALUES
-- Client categories
('startup-founder', 'Startup founder looking to build a team', (SELECT id FROM public.roles WHERE name = 'client'), '{"companySize": "0-50", "fundingStage": "seed"}'),
('enterprise-hr', 'Enterprise HR professional hiring talent', (SELECT id FROM public.roles WHERE name = 'client'), '{"companySize": "100+", "fundingStage": "established"}'),
('agency-client', 'Agency that needs additional talent', (SELECT id FROM public.roles WHERE name = 'client'), '{"companySize": "10-100", "fundingStage": "bootstrapped"}'),

-- Service Provider categories
('full-stack-developer', 'Full-stack web and mobile development', (SELECT id FROM public.roles WHERE name = 'service-provider'), '{"skills": ["Programming", "Problem Solving", "Technical"]}'),
('ui-ux-designer', 'User interface and experience design', (SELECT id FROM public.roles WHERE name = 'service-provider'), '{"skills": ["Design", "Creativity", "User Research"]}'),
('devops-engineer', 'Infrastructure and deployment expertise', (SELECT id FROM public.roles WHERE name = 'service-provider'), '{"skills": ["DevOps", "Infrastructure", "Automation"]}'),
('project-manager', 'Project coordination and management', (SELECT id FROM public.roles WHERE name = 'service-provider'), '{"skills": ["Management", "Communication", "Planning"]}'),

-- Agency categories
('web-development-agency', 'Specialized in custom web applications', (SELECT id FROM public.roles WHERE name = 'agency'), '{"services": ["Web Development", "E-commerce", "CMS"]}'),
('mobile-app-agency', 'Focused on iOS and Android development', (SELECT id FROM public.roles WHERE name = 'agency'), '{"services": ["Mobile Apps", "Cross-platform", "Native"]}'),
('design-agency', 'Creative design and branding services', (SELECT id FROM public.roles WHERE name = 'agency'), '{"services": ["UI/UX Design", "Branding", "Creative"]}')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 20. INSERT SAMPLE DATA - EXPERIENCE LEVELS
-- =====================================================
INSERT INTO public.experience_levels (name, description, years, tagline, features) VALUES
('junior', 'Early career professionals building foundational skills', '0–2 years', 'Potential builders', ARRAY['Learning core technologies', 'Building foundational skills', 'Working under guidance', 'Contributing to team projects']),
('mid-level', 'Experienced professionals driving development', '2–6 years', 'Core contributors', ARRAY['Independent project delivery', 'Mentoring junior developers', 'Technical decision making', 'Cross-functional collaboration']),
('senior', 'Expert professionals leading teams and projects', '6–10 years', 'Lead developers / team leads', ARRAY['Leading development teams', 'Architectural decision making', 'Project planning & execution', 'Stakeholder communication']),
('principal', 'Strategic leaders shaping technical direction', '10+ years', 'Strategic leaders', ARRAY['Technical strategy & vision', 'System architecture design', 'Team leadership & mentoring', 'Business impact focus'])
ON CONFLICT DO NOTHING;

-- =====================================================
-- 21. VERIFY DATA INSERTION
-- =====================================================
-- Check if data was inserted correctly
SELECT 'Roles' as table_name, COUNT(*) as count FROM public.roles
UNION ALL
SELECT 'Role Categories' as table_name, COUNT(*) as count FROM public.role_categories
UNION ALL
SELECT 'Experience Levels' as table_name, COUNT(*) as count FROM public.experience_levels;

-- Show sample data
SELECT 'Roles Sample:' as info;
SELECT name, description, button_label FROM public.roles;

SELECT 'Role Categories Sample:' as info;
SELECT rc.name, r.name as role_name, rc.description 
FROM public.role_categories rc 
JOIN public.roles r ON rc.role_id = r.id;

SELECT 'Experience Levels Sample:' as info;
SELECT name, years, tagline FROM public.experience_levels;









