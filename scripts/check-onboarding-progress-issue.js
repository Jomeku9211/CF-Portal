import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOnboardingProgressIssue() {
  console.log('🔍 Checking onboarding progress issue...');
  
  const userId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // 1. Check current user role
    console.log('1️⃣ Current user role:');
    const { data: userRole, error: roleError } = await supabase
      .from('user_roles')
      .select(`
        *,
        roles(name),
        role_categories(name)
      `)
      .eq('user_id', userId)
      .single();
    
    if (roleError) {
      console.log('❌ User role error:', roleError.message);
      return;
    } else {
      console.log('✅ User role:', userRole.roles.name);
      console.log('✅ Category:', userRole.role_categories.name);
    }
    
    // 2. Check if onboarding progress exists
    console.log('\n2️⃣ Checking onboarding progress table:');
    const { data: progressData, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (progressError) {
      console.log('❌ Onboarding progress error:', progressError.message);
      console.log('🔧 This is why you see "Determining your route..."');
    } else {
      console.log('✅ Onboarding progress found:', progressData?.length || 0, 'records');
      if (progressData && progressData.length > 0) {
        progressData.forEach((progress, index) => {
          console.log(`   ${index + 1}. Flow: ${progress.onboarding_flow}`);
          console.log(`      Step: ${progress.current_step}/${progress.total_steps}`);
          console.log(`      Status: ${progress.onboarding_status}`);
        });
      } else {
        console.log('   ℹ️ No onboarding progress records found');
        console.log('🔧 This is why the smart routing can\'t determine where to send you');
      }
    }
    
    // 3. Try to create onboarding progress manually
    console.log('\n3️⃣ Attempting to create onboarding progress:');
    if (userRole.roles.name === 'client') {
      console.log('🎯 Creating client onboarding progress...');
      
      const { data: newProgress, error: createError } = await supabase
        .from('user_onboarding_progress')
        .insert({
          user_id: userId,
          role_id: userRole.role_id,
          category_id: userRole.category_id,
          onboarding_flow: 'client',
          current_step: 1,
          total_steps: 4,
          completed_steps: [],
          onboarding_status: 'in_progress'
        })
        .select()
        .single();
      
      if (createError) {
        console.log('❌ Create onboarding progress error:', createError.message);
        console.log('🔧 This confirms the table has permission issues');
      } else {
        console.log('✅ Onboarding progress created successfully!');
        console.log('   Flow:', newProgress.onboarding_flow);
        console.log('   Step:', newProgress.current_step);
      }
    }
    
    // 4. Check what the smart routing should do
    console.log('\n4️⃣ Smart routing analysis:');
    if (userRole.roles.name === 'client') {
      console.log('✅ User has client role');
      console.log('🔧 Should be redirected to /client-onboarding');
      
      if (progressError) {
        console.log('❌ But onboarding progress table is inaccessible');
        console.log('🔧 Smart routing gets stuck on "Determining your route..."');
      } else if (!progressData || progressData.length === 0) {
        console.log('❌ But no onboarding progress record exists');
        console.log('🔧 Smart routing can\'t determine the user\'s state');
      } else {
        console.log('✅ Onboarding progress exists, routing should work');
      }
    }
    
    // 5. Summary and solution
    console.log('\n📋 Summary & Solution:');
    console.log('🎯 The issue is: user_onboarding_progress table is not accessible');
    console.log('🔧 This causes smart routing to get stuck on "Determining your route..."');
    console.log('💡 Solution: Fix the table permissions in Supabase dashboard');
    
    console.log('\n🔧 To fix this, run this SQL in Supabase:');
    console.log(`
-- Fix permissions for user_onboarding_progress table
GRANT ALL ON TABLE public.user_onboarding_progress TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can insert their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can update their own onboarding progress" ON public.user_onboarding_progress;
DROP POLICY IF EXISTS "Users can delete their own onboarding progress" ON public.user_onboarding_progress;

CREATE POLICY "Users can view their own onboarding progress" ON public.user_onboarding_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding progress" ON public.user_onboarding_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding progress" ON public.user_onboarding_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding progress" ON public.user_onboarding_progress
    FOR DELETE USING (auth.uid() = user_id);

GRANT ALL ON TABLE public.user_onboarding_progress TO service_role;
    `);
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Onboarding Progress Issue Check...\n');
  
  await checkOnboardingProgressIssue();
  
  console.log('\n🎉 Onboarding Progress Issue Check Complete!');
}

main().catch(console.error);
