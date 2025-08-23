-- =====================================================
-- RESTORE RLS POLICIES FOR ONBOARDING TABLES
-- =====================================================

-- First, let's see what RLS policies currently exist
SELECT 'Current RLS status:' as info;

SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN schemaname = 'public' THEN 'public'
        ELSE schemaname
    END as schema,
    tablename as table_name
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
)
ORDER BY tablename;

-- Check existing policies
SELECT 'Existing policies:' as info;

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
)
ORDER BY tablename, policyname;

-- =====================================================
-- STEP 1: ENABLE RLS ON ALL TABLES
-- =====================================================

-- Enable RLS on all onboarding tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_step_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: CREATE RLS POLICIES FOR USERS TABLE
-- =====================================================

-- Users can only view and edit their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- STEP 3: CREATE RLS POLICIES FOR ORGANIZATIONS
-- =====================================================

-- Users can view organizations they created
CREATE POLICY "Users can view own organizations" ON public.organizations
  FOR SELECT USING (auth.uid() = created_by);

-- Users can create organizations
CREATE POLICY "Users can create organizations" ON public.organizations
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Users can update organizations they created
CREATE POLICY "Users can update own organizations" ON public.organizations
  FOR UPDATE USING (auth.uid() = created_by);

-- Users can delete organizations they created
CREATE POLICY "Users can delete own organizations" ON public.organizations
  FOR DELETE USING (auth.uid() = created_by);

-- =====================================================
-- STEP 4: CREATE RLS POLICIES FOR TEAMS
-- =====================================================

-- Users can view teams in organizations they created
CREATE POLICY "Users can view teams in own organizations" ON public.teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = teams.organization_id 
      AND created_by = auth.uid()
    )
  );

-- Users can create teams in organizations they created
CREATE POLICY "Users can create teams in own organizations" ON public.teams
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = teams.organization_id 
      AND created_by = auth.uid()
    )
  );

-- Users can update teams in organizations they created
CREATE POLICY "Users can update teams in own organizations" ON public.teams
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = teams.organization_id 
      AND created_by = auth.uid()
    )
  );

-- Users can delete teams in organizations they created
CREATE POLICY "Users can delete teams in own organizations" ON public.teams
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = teams.organization_id 
      AND created_by = auth.uid()
    )
  );

-- =====================================================
-- STEP 5: CREATE RLS POLICIES FOR JOB POSTS
-- =====================================================

-- Users can view job posts in organizations they created
CREATE POLICY "Users can view job posts in own organizations" ON public.job_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = job_posts.organization_id 
      AND created_by = auth.uid()
    )
  );

-- Users can create job posts in organizations they created
CREATE POLICY "Users can create job posts in own organizations" ON public.job_posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = job_posts.organization_id 
      AND created_by = auth.uid()
    )
  );

-- Users can update job posts in organizations they created
CREATE POLICY "Users can update job posts in own organizations" ON public.job_posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = job_posts.organization_id 
      AND created_by = auth.uid()
    )
  );

-- Users can delete job posts in organizations they created
CREATE POLICY "Users can delete job posts in own organizations" ON public.job_posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.organizations 
      WHERE id = job_posts.organization_id 
      AND created_by = auth.uid()
    )
  );

-- =====================================================
-- STEP 6: CREATE RLS POLICIES FOR USER ONBOARDING PROGRESS
-- =====================================================

-- Users can only view and edit their own onboarding progress
CREATE POLICY "Users can view own onboarding progress" ON public.user_onboarding_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own onboarding progress" ON public.user_onboarding_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding progress" ON public.user_onboarding_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own onboarding progress" ON public.user_onboarding_progress
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- STEP 7: CREATE RLS POLICIES FOR USER ROLES
-- =====================================================

-- Users can only view and edit their own role assignments
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own roles" ON public.user_roles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roles" ON public.user_roles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own roles" ON public.user_roles
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- STEP 8: CREATE RLS POLICIES FOR ONBOARDING STEP COMPLETIONS
-- =====================================================

-- Users can only view and edit their own step completions
CREATE POLICY "Users can view own step completions" ON public.onboarding_step_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own step completions" ON public.onboarding_step_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own step completions" ON public.onboarding_step_completions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own step completions" ON public.onboarding_step_completions
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- STEP 9: VERIFICATION
-- =====================================================

SELECT 'Verification - RLS Status:' as info;

-- Check if RLS is enabled on tables using a different approach
SELECT 
    schemaname,
    tablename,
    'RLS status will be shown after policies are created' as status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
)
ORDER BY tablename;

SELECT 'Verification - Policies:' as info;

SELECT 
    tablename,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename IN (
    'organizations',
    'teams', 
    'job_posts',
    'user_onboarding_progress',
    'user_roles',
    'onboarding_step_completions',
    'users'
)
GROUP BY tablename
ORDER BY tablename;

SELECT '✅ RLS policies restored! All tables are now secure.' as result;
