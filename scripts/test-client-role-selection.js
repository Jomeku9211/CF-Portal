import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testClientRoleSelection() {
  try {
    console.log('🧪 Starting client role selection smoke test...');
    
    // For testing purposes, let's simulate the process by directly working with the database
    // First, let's check what users exist
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email')
      .limit(5);
    
    if (usersError) {
      console.error('❌ Failed to get users:', usersError);
      return;
    }
    
    if (!users || users.length === 0) {
      console.error('❌ No users found in database');
      return;
    }
    
    // Use the first available user for testing
    const testUser = users[0];
    console.log('✅ Using test user:', testUser.email, 'ID:', testUser.id);
    
    // Get client role
    const { data: clientRole, error: roleError } = await supabase
      .from('roles')
      .select('*')
      .eq('name', 'client')
      .single();
    
    if (roleError || !clientRole) {
      console.error('❌ Client role not found:', roleError);
      return;
    }
    
    console.log('✅ Client role found:', clientRole.id);
    
    // Get startup-founder category
    const { data: startupCategory, error: categoryError } = await supabase
      .from('role_categories')
      .select('*')
      .eq('name', 'startup-founder')
      .eq('role_id', clientRole.id)
      .single();
    
    if (categoryError || !startupCategory) {
      console.error('❌ Startup-founder category not found:', categoryError);
      return;
    }
    
    console.log('✅ Startup-founder category found:', startupCategory.id);
    
    // Insert into user_roles
    const { data: userRole, error: userRoleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: testUser.id,
        role_id: clientRole.id,
        category_id: startupCategory.id
      })
      .select()
      .single();
    
    if (userRoleError) {
      console.error('❌ Failed to insert user_roles:', userRoleError);
      return;
    }
    
    console.log('✅ User role created:', userRole.id);
    
    // Insert into client_profiles
    const { data: clientProfile, error: profileError } = await supabase
      .from('client_profiles')
      .insert({
        user_id: testUser.id,
        company_name: 'Test Startup'
      })
      .select()
      .single();
    
    if (profileError) {
      console.error('❌ Failed to insert client_profiles:', profileError);
      return;
    }
    
    console.log('✅ Client profile created:', clientProfile.id);
    
    // Insert into user_onboarding_progress
    const { data: onboardingProgress, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .insert({
        user_id: testUser.id,
        onboarding_flow: 'client',
        current_step: 1,
        total_steps: 4,
        completed_steps: [],
        onboarding_status: 'in_progress'
      })
      .select()
      .single();
    
    if (onboardingError) {
      console.error('❌ Failed to insert user_onboarding_progress:', onboardingError);
      return;
    }
    
    console.log('✅ Onboarding progress created:', onboardingProgress.id);
    
    // Verify all data was inserted
    console.log('\n🔍 Verifying database state...');
    
    const { data: finalUserRole } = await supabase
      .from('user_roles')
      .select('*, roles(*)')
      .eq('user_id', testUser.id)
      .single();
    
    const { data: finalClientProfile } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUser.id)
      .single();
    
    const { data: finalOnboarding } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUser.id)
      .single();
    
    console.log('✅ Final user_roles:', finalUserRole);
    console.log('✅ Final client_profiles:', finalClientProfile);
    console.log('✅ Final onboarding progress:', finalOnboarding);
    
    console.log('\n🎯 Test completed successfully!');
    console.log('📋 Expected behavior:');
    console.log('   - User should be redirected to /client-onboarding');
    console.log('   - client_profiles table should have user data');
    console.log('   - user_onboarding_progress should show client flow');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testClientRoleSelection();
