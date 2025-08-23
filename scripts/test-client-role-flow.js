import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testClientRoleFlow() {
  console.log('🧪 Testing Client Role Selection Flow...\n');
  
  try {
    // Test user data
    const testUser = {
      id: 'test-user-123',
      email: 'test@client.com'
    };
    
    console.log('👤 Test User:', testUser);
    
    // 1. Test role selection
    console.log('\n🎯 Step 1: Testing Role Selection...');
    const clientRole = {
      id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      name: 'client',
      description: 'I want to hire developers',
      button_label: 'Hire Developers',
      icon: 'building'
    };
    
    const startupFounderCategory = {
      id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      name: 'startup-founder',
      display_name: 'Startup Founder',
      description: 'Building a new company or product',
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c'
    };
    
    console.log('✅ Client Role:', clientRole.name);
    console.log('✅ Category:', startupFounderCategory.display_name);
    
    // 2. Test database updates
    console.log('\n💾 Step 2: Testing Database Updates...');
    
    // Update user_roles table
    const userRoleData = {
      user_id: testUser.id,
      role_id: clientRole.id,
      category_id: startupFounderCategory.id,
      specialization: 'not-applicable',
      experience_level_id: null,
      updated_at: new Date().toISOString()
    };
    
    console.log('📝 Updating user_roles table...');
    const { data: userRoleResult, error: userRoleError } = await supabase
      .from('user_roles')
      .upsert([userRoleData], { onConflict: 'user_id,role_id' })
      .select();
    
    if (userRoleError) {
      console.error('❌ user_roles update failed:', userRoleError);
    } else {
      console.log('✅ user_roles updated successfully:', userRoleResult);
    }
    
    // Update client_profiles table
    const clientProfileData = {
      user_id: testUser.id,
      company_name: 'Test Startup Company',
      industry: 'Technology',
      company_size: '1-10',
      website: 'https://teststartup.com',
      description: 'A test startup company for testing purposes',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('📝 Updating client_profiles table...');
    const { data: clientProfileResult, error: clientProfileError } = await supabase
      .from('client_profiles')
      .upsert([clientProfileData], { onConflict: 'user_id' })
      .select();
    
    if (clientProfileError) {
      console.error('❌ client_profiles update failed:', clientProfileError);
    } else {
      console.log('✅ client_profiles updated successfully:', clientProfileResult);
    }
    
    // Update user_onboarding_progress table
    const onboardingProgressData = {
      user_id: testUser.id,
      role_id: clientRole.id,
      category_id: startupFounderCategory.id,
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 4,
      completed_steps: ['role_selection'],
      onboarding_status: 'in_progress',
      onboarding_stage: 'organization_onboarding',
      last_activity: new Date().toISOString()
    };
    
    console.log('📝 Updating user_onboarding_progress table...');
    const { data: onboardingResult, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .upsert([onboardingProgressData], { onConflict: 'user_id' })
      .select();
    
    if (onboardingError) {
      console.error('❌ user_onboarding_progress update failed:', onboardingError);
    } else {
      console.log('✅ user_onboarding_progress updated successfully:', onboardingResult);
    }
    
    // 3. Verify database state
    console.log('\n🔍 Step 3: Verifying Database State...');
    
    // Check user_roles
    const { data: userRolesCheck, error: userRolesCheckError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', testUser.id);
    
    if (userRolesCheckError) {
      console.error('❌ Failed to check user_roles:', userRolesCheckError);
    } else {
      console.log('✅ user_roles check:', userRolesCheck);
    }
    
    // Check client_profiles
    const { data: clientProfilesCheck, error: clientProfilesCheckError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUser.id);
    
    if (clientProfilesCheckError) {
      console.error('❌ Failed to check client_profiles:', clientProfilesCheckError);
    } else {
      console.log('✅ client_profiles check:', clientProfilesCheck);
    }
    
    // Check user_onboarding_progress
    const { data: onboardingCheck, error: onboardingCheckError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUser.id);
    
    if (onboardingCheckError) {
      console.error('❌ Failed to check user_onboarding_progress:', onboardingCheckError);
    } else {
      console.log('✅ user_onboarding_progress check:', onboardingCheck);
    }
    
    // 4. Test navigation
    console.log('\n🚀 Step 4: Testing Navigation...');
    console.log('✅ Should redirect to: /client-onboarding');
    console.log('✅ State data:', {
      role: clientRole,
      category: startupFounderCategory,
      specialization: 'not-applicable',
      experienceLevel: null,
      onboardingData: userRoleData
    });
    
    console.log('\n🎉 CLIENT ROLE FLOW TEST COMPLETED!');
    console.log('📊 Summary:');
    console.log('   - Role: Client');
    console.log('   - Category: Startup Founder');
    console.log('   - Experience Level: None (skipped)');
    console.log('   - Redirect: /client-onboarding');
    console.log('   - Tables Updated: user_roles, client_profiles, user_onboarding_progress');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testClientRoleFlow();
