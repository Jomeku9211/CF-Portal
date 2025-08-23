-- ============================================
-- Fix permissions for user_onboarding_progress table
-- ============================================

-- 1. Grant basic permissions to authenticated users
GRANT ALL ON TABLE public.user_onboarding_progress TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can insert their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can update their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can delete their own onboarding progress" ON public.user_onboarding_progress;

-- 4. Create new RLS policies
CREATE POLICY "Users can view their own onboarding progress" ON public.user_onboarding_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding progress" ON public.user_onboarding_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding progress" ON public.user_onboarding_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding progress" ON public.user_onboarding_progress
    FOR DELETE USING (auth.uid() = user_id);

-- 5. Also grant permissions to service_role for admin operations
GRANT ALL ON TABLE public.user_onboarding_progress TO service_role;

-- 6. Verify the policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'user_onboarding_progress';

-- 7. Show table permissions
SELECT 
    grantee,
    privilege_type,
    is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'user_onboarding_progress';
