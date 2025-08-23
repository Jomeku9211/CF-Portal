-- ============================================
-- Clean up user_onboarding_progress table
-- Remove all non-onboarding related columns
-- ============================================

-- First, let's see what columns currently exist
-- This will help identify what needs to be removed

-- 1. Create a backup of the current table (optional)
-- CREATE TABLE user_onboarding_progress_backup AS SELECT * FROM user_onboarding_progress;

-- 2. Drop the current table and recreate it with only onboarding columns
DROP TABLE IF EXISTS public.user_onboarding_progress CASCADE;

-- 3. Recreate the table with only essential onboarding columns
CREATE TABLE public.user_onboarding_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.role_categories(id) ON DELETE CASCADE,
    experience_level_id UUID REFERENCES public.experience_levels(id) ON DELETE SET NULL,
    onboarding_flow TEXT NOT NULL,
    current_step INTEGER DEFAULT 1,
    total_steps INTEGER DEFAULT 4,
    completed_steps TEXT[] DEFAULT '{}',
    onboarding_status TEXT DEFAULT 'in_progress',
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX idx_user_onboarding_progress_user_id ON public.user_onboarding_progress(user_id);
CREATE INDEX idx_user_onboarding_progress_role_id ON public.user_onboarding_progress(role_id);
CREATE INDEX idx_user_onboarding_progress_status ON public.user_onboarding_progress(onboarding_status);

-- 5. Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_user_onboarding_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_onboarding_progress_updated_at
    BEFORE UPDATE ON public.user_onboarding_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_user_onboarding_progress_updated_at();

-- 6. Enable Row Level Security
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies
CREATE POLICY "Users can view their own onboarding progress" ON public.user_onboarding_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding progress" ON public.user_onboarding_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding progress" ON public.user_onboarding_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding progress" ON public.user_onboarding_progress
    FOR DELETE USING (auth.uid() = user_id);

-- 8. Grant permissions
GRANT ALL ON TABLE public.user_onboarding_progress TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 9. Verify the new structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_onboarding_progress' 
ORDER BY ordinal_position;

-- 10. Show the final table structure
\d public.user_onboarding_progress
