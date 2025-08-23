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







