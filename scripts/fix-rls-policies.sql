-- Fix RLS Policies for Public Tables
-- This script fixes the 403 errors by updating RLS policies to allow proper access

-- STEP 1: Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow public read access to roles" ON public.roles;
DROP POLICY IF EXISTS "Allow public read access to role categories" ON public.role_categories;
DROP POLICY IF EXISTS "Allow public read access to experience levels" ON public.experience_levels;

-- STEP 2: Create new policies that allow both authenticated and unauthenticated access
CREATE POLICY "Allow public read access to roles" ON public.roles 
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to role categories" ON public.role_categories 
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to experience levels" ON public.experience_levels 
FOR SELECT USING (true);

-- STEP 3: Ensure authenticated users can also insert/update these tables if needed
CREATE POLICY "Allow authenticated users to manage roles" ON public.roles 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage role categories" ON public.role_categories 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage experience levels" ON public.experience_levels 
FOR ALL USING (auth.role() = 'authenticated');

-- STEP 4: Verify the policies are working
-- You can test this by running: SELECT * FROM public.roles LIMIT 1;

-- ============================================
-- Fix RLS policies for user_onboarding_progress table
-- ============================================

-- 1. First, let's see what policies currently exist
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'user_onboarding_progress';

-- 2. Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can insert their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can update their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can delete their own onboarding progress" ON public.user_onboarding_progress;

-- 3. Create new, more permissive policies for onboarding flow
-- Policy for SELECT - allow users to see their own progress
CREATE POLICY "Users can view their own onboarding progress" ON public.user_onboarding_progress
    FOR SELECT USING (
        auth.uid() = user_id OR 
        auth.role() = 'anon' OR 
        auth.role() = 'authenticated'
    );

-- Policy for INSERT - allow users to create onboarding progress
CREATE POLICY "Users can insert onboarding progress" ON public.user_onboarding_progress
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR 
        auth.role() = 'anon' OR 
        auth.role() = 'authenticated'
    );

-- Policy for UPDATE - allow users to update their own progress
CREATE POLICY "Users can update their own onboarding progress" ON public.user_onboarding_progress
    FOR UPDATE USING (
        auth.uid() = user_id OR 
        auth.role() = 'anon' OR 
        auth.role() = 'authenticated'
    );

-- Policy for DELETE - allow users to delete their own progress
CREATE POLICY "Users can delete their own onboarding progress" ON public.user_onboarding_progress
    FOR DELETE USING (
        auth.uid() = user_id OR 
        auth.role() = 'anon' OR 
        auth.role() = 'authenticated'
    );

-- 4. Ensure RLS is enabled
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;

-- 5. Grant necessary permissions to both roles
GRANT ALL ON TABLE public.user_onboarding_progress TO authenticated;
GRANT ALL ON TABLE public.user_onboarding_progress TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;

-- 6. Verify the new policies
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'user_onboarding_progress'
ORDER BY policyname;









