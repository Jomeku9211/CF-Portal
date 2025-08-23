-- =====================================================
-- CREATE UNIVERSAL ONBOARDING PROGRESS TRACKING
-- =====================================================

-- Universal onboarding progress table for ALL roles
CREATE TABLE IF NOT EXISTS public.user_onboarding_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- User's selected role path
  role_id UUID REFERENCES public.roles(id) NOT NULL,
  category_id UUID REFERENCES public.role_categories(id) NOT NULL,
  experience_level_id UUID REFERENCES public.experience_levels(id), -- NULL for clients who don't need experience levels
  
  -- Current onboarding flow and step
  onboarding_flow TEXT NOT NULL, -- 'developer', 'client', 'agency'
  current_step INTEGER DEFAULT 0 NOT NULL,
  total_steps INTEGER NOT NULL,
  
  -- Step completion status (stored as JSON for flexibility)
  completed_steps JSONB DEFAULT '[]',
  
  -- Overall onboarding status
  onboarding_status TEXT DEFAULT 'in_progress' CHECK (onboarding_status IN ('in_progress', 'completed', 'abandoned')),
  
  -- Last activity timestamp
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Additional metadata for the specific onboarding flow
  flow_metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  UNIQUE(user_id)
);

-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_user_onboarding_progress_user_id ON public.user_onboarding_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_progress_status ON public.user_onboarding_progress(onboarding_status);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_progress_flow ON public.user_onboarding_progress(onboarding_flow);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES
-- =====================================================

-- Users can view their own onboarding progress
CREATE POLICY "Users can view their own onboarding progress" ON public.user_onboarding_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own onboarding progress
CREATE POLICY "Users can insert their own onboarding progress" ON public.user_onboarding_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own onboarding progress
CREATE POLICY "Users can update their own onboarding progress" ON public.user_onboarding_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own onboarding progress
CREATE POLICY "Users can delete their own onboarding progress" ON public.user_onboarding_progress
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- GRANT PERMISSIONS TO AUTHENTICATED USERS
-- =====================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_onboarding_progress TO authenticated;

-- =====================================================
-- VERIFY TABLE CREATION
-- =====================================================

SELECT 'Universal onboarding progress table created successfully!' as status;

-- Show table structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'user_onboarding_progress'
ORDER BY ordinal_position;

