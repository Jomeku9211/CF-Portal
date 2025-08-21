-- =====================================================
-- SUPABASE DATABASE TABLES SETUP SCRIPT
-- =====================================================
-- Run this script in your Supabase SQL Editor
-- Go to: https://cwamnibqfldesbqordeu.supabase.co/project/default/sql/new

-- =====================================================
-- 1. CREATE ROLES TABLE
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

-- Allow public read access
CREATE POLICY "Allow public read access to roles" ON public.roles
  FOR SELECT USING (true);

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

-- Enable Row Level Security
ALTER TABLE public.role_categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to role categories" ON public.role_categories
  FOR SELECT USING (true);

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

-- Enable Row Level Security
ALTER TABLE public.experience_levels ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to experience levels" ON public.experience_levels
  FOR SELECT USING (true);

-- =====================================================
-- 4. CREATE PROFILES TABLE (Extended for our project)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  
  -- Developer-specific fields
  bio TEXT,
  skills TEXT[], -- Array of skills
  hourly_rate DECIMAL(10,2),
  years_experience INTEGER,
  location TEXT,
  timezone TEXT,
  availability TEXT, -- 'full-time', 'part-time', 'freelance'
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  
  -- Company/Client fields (for non-developers)
  company_name TEXT,
  company_size TEXT, -- '1-10', '11-50', '51-200', '200+'
  industry TEXT,
  funding_stage TEXT, -- 'seed', 'series-a', 'series-b', 'established'

  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- =====================================================
-- 5. CREATE USER ROLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.role_categories(id) ON DELETE CASCADE NOT NULL,
  specialization TEXT,
  experience_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Ensure one role selection per user
  UNIQUE(user_id)
);

-- =====================================================
-- 6. CREATE USER SKILLS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')) NOT NULL,
  years_experience INTEGER,
  endorsed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Ensure unique skill per user
  UNIQUE(user_id, skill_name)
);

-- =====================================================
-- 7. CREATE USER PORTFOLIO TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_title TEXT NOT NULL,
  project_description TEXT,
  project_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technologies used
  project_image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =====================================================
-- 8. SET UP ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING ((SELECT auth.uid()) = id);

-- User Roles RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own role selections." ON public.user_roles
  FOR SELECT USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert their own role selections." ON public.user_roles
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own role selections." ON public.user_roles
  FOR UPDATE USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own role selections." ON public.user_roles
  FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- User Skills RLS
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own skills." ON public.user_skills
  FOR SELECT USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert their own skills." ON public.user_skills
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own skills." ON public.user_skills
  FOR UPDATE USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own skills." ON public.user_skills
  FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- User Portfolio RLS
ALTER TABLE public.user_portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own portfolio." ON public.user_portfolio
  FOR SELECT USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert their own portfolio items." ON public.user_portfolio
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own portfolio items." ON public.user_portfolio
  FOR UPDATE USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own portfolio items." ON public.user_portfolio
  FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- =====================================================
-- 9. CREATE TRIGGERS AND FUNCTIONS
-- =====================================================

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, username)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'username'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
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

CREATE OR REPLACE TRIGGER handle_user_portfolio_updated_at
  BEFORE UPDATE ON public.user_portfolio
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- =====================================================
-- 10. SET UP STORAGE
-- =====================================================

-- Set up Storage buckets
INSERT INTO storage.buckets (id, name)
  VALUES ('avatars', 'avatars')
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name)
  VALUES ('portfolio', 'portfolio')
ON CONFLICT (id) DO NOTHING;

-- Set up access controls for storage
-- Avatar storage policies
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload an avatar." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar." ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own avatar." ON storage.objects
  FOR DELETE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Portfolio storage policies
CREATE POLICY "Portfolio images are publicly accessible." ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Users can upload portfolio images." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Users can update their own portfolio images." ON storage.objects
  FOR UPDATE USING (bucket_id = 'portfolio' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own portfolio images." ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio' AND (storage.foldername(name))[1] = auth.uid()::text);

-- =====================================================
-- 11. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_skills ON public.profiles USING gin(skills);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_portfolio_user_id ON public.user_portfolio(user_id);
CREATE INDEX IF NOT EXISTS idx_user_portfolio_featured ON public.user_portfolio(is_featured) WHERE is_featured = true;

-- =====================================================
-- 12. INSERT SAMPLE DATA - ROLES
-- =====================================================
INSERT INTO public.roles (name, description, button_label, icon) VALUES
('client', 'I''m an IT founder or HR looking to hire developers for my company or team.', 'Hire Talent', 'users'),
('freelancer', 'I''m a developer who wants to list myself and get hired by startups and companies.', 'List Myself', 'user'),
('agency', 'I run a team or agency and want to list my employees for outsourced projects.', 'List My Team', 'building')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 13. INSERT SAMPLE DATA - ROLE CATEGORIES
-- =====================================================
INSERT INTO public.role_categories (name, description, role_id, metadata) VALUES
-- Client categories
('founder', 'Company founder or co-founder looking to build a team', (SELECT id FROM public.roles WHERE name = 'client'), '{"companySize": "0-50", "fundingStage": "seed"}'),
('hr-recruiter', 'Human resources professional responsible for hiring', (SELECT id FROM public.roles WHERE name = 'client'), '{"companySize": "50+", "fundingStage": "established"}'),
('cto', 'Chief Technology Officer managing technical team', (SELECT id FROM public.roles WHERE name = 'client'), '{"companySize": "100+", "fundingStage": "series-a"}'),

-- Service Provider categories
('software-development', 'Programming, coding, and technical implementation', (SELECT id FROM public.roles WHERE name = 'freelancer'), '{"skills": ["Programming", "Problem Solving", "Technical"]}'),
('creative-design', 'UI/UX design, visual design, and creative work', (SELECT id FROM public.roles WHERE name = 'freelancer'), '{"skills": ["Design", "Creativity", "User Research"]}'),
('quality-assurance', 'Testing, QA, and quality management', (SELECT id FROM public.roles WHERE name = 'freelancer'), '{"skills": ["Testing", "Quality", "Analytical"]}'),
('product-management', 'Product strategy, project management, and coordination', (SELECT id FROM public.roles WHERE name = 'freelancer'), '{"skills": ["Strategy", "Management", "Communication"]}'),

-- Agency categories
('web-dev-agency', 'Specialized in custom web applications and websites', (SELECT id FROM public.roles WHERE name = 'agency'), '{"services": ["Web Development", "E-commerce", "CMS"]}'),
('mobile-app-agency', 'Focused on iOS and Android mobile applications', (SELECT id FROM public.roles WHERE name = 'agency'), '{"services": ["Mobile Apps", "Cross-platform", "Native"]}')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 14. INSERT SAMPLE DATA - EXPERIENCE LEVELS
-- =====================================================
INSERT INTO public.experience_levels (name, description, years, tagline, features) VALUES
('junior', 'Early career professionals building foundational skills', '0–2 years', 'Potential builders', ARRAY['Learning core technologies', 'Building foundational skills', 'Working under guidance', 'Contributing to team projects']),
('mid-level', 'Experienced professionals driving development', '2–6 years', 'Core contributors', ARRAY['Independent project delivery', 'Mentoring junior developers', 'Technical decision making', 'Cross-functional collaboration']),
('senior', 'Expert professionals leading teams and projects', '6–10 years', 'Lead developers / team leads', ARRAY['Leading development teams', 'Architectural decision making', 'Project planning & execution', 'Stakeholder communication']),
('principal', 'Strategic leaders shaping technical direction', '10+ years', 'Strategic leaders', ARRAY['Technical strategy & vision', 'System architecture design', 'Team leadership & mentoring', 'Business impact focus'])
ON CONFLICT DO NOTHING;

-- =====================================================
-- 15. VERIFY DATA INSERTION
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
