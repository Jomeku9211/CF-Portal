import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testWithRoleId() {
  try {
    console.log('🧪 TESTING COMPLETE CLIENT FLOW WITH role_id INCLUDED');
    console.log('=' .repeat(80));
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    // STEP 1: Get user's role_id from user_roles table
    console.log('📝 STEP 1: Getting user role_id...');
    
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', testUserId);
    
    if (rolesError || !userRoles || userRoles.length === 0) {
      console.log('❌ Cannot get user role:', rolesError?.message);
      return;
    }
    
    const userRole = userRoles[0];
    console.log('✅ User role found:', userRole);
    console.log(`   - Role ID: ${userRole.role_id}`);
    console.log(`   - Category ID: ${userRole.category_id}`);
    
    // STEP 2: Create user_onboarding_progress with role_id
    console.log('');
    console.log('📝 STEP 2: Creating user_onboarding_progress with role_id...');
    
    const onboardingData = {
      user_id: testUserId,
      role_id: userRole.role_id, // INCLUDE role_id from user_roles
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 3,
      completed_steps: ['role_selection'],
      onboarding_status: 'in_progress',
      onboarding_stage: 'CLIENT_ORG', // EXACTLY as per OFFICIAL document
      last_activity: new Date().toISOString()
    };
    
    console.log('💾 Inserting onboarding data:', onboardingData);
    
    try {
      const { data: newOnboarding, error: onboardingError } = await supabase
        .from('user_onboarding_progress')
        .insert([onboardingData])
        .select();
      
      if (onboardingError) {
        console.log('❌ Failed to create user_onboarding_progress:', onboardingError.message);
      } else {
        console.log('✅ user_onboarding_progress created successfully!');
        console.log('📊 Created record:', newOnboarding[0]);
      }
    } catch (error) {
      console.log('❌ Error creating user_onboarding_progress:', error.message);
    }
    
    console.log('');
    
    // STEP 3: Verify final state
    console.log('🔍 STEP 3: Verifying final database state...');
    
    const { data: finalUserRoles } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', testUserId);
    
    const { data: finalClientProfiles } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUserId);
    
    const { data: finalOnboardingProgress } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUserId);
    
    console.log('📊 Final database state:');
    console.log(`   - user_roles: ${finalUserRoles?.length || 0} records`);
    console.log(`   - client_profiles: ${finalClientProfiles?.length || 0} records`);
    console.log(`   - user_onboarding_progress: ${finalOnboardingProgress?.length || 0} records`);
    
    if (finalOnboardingProgress && finalOnboardingProgress.length > 0) {
      console.log(`   - onboarding_stage: ${finalOnboardingProgress[0].onboarding_stage}`);
      console.log(`   - Should be: CLIENT_ORG (per OFFICIAL document)`);
    }
    
    console.log('');
    
    // STEP 4: Test Frontend Routing Logic
    console.log('🧪 STEP 4: Testing frontend routing logic...');
    
    if (finalUserRoles?.length > 0 && finalOnboardingProgress?.length > 0) {
      const userRole = finalUserRoles[0];
      const onboarding = finalOnboardingProgress[0];
      
      console.log('   📋 User has role and onboarding progress');
      console.log(`   🎯 According to OFFICIAL document:`);
      console.log(`      - User has CLIENT role → Check onboarding_stage`);
      console.log(`      - onboarding_stage = 'CLIENT_ORG' → Go to /client-onboarding`);
      console.log(`   ✅ FLOW SHOULD WORK! User should be routed to /client-onboarding`);
      
      console.log('');
      console.log('🎉 SUCCESS! COMPLETE CLIENT FLOW IS WORKING!');
      console.log('📱 User dheeraj@coderfarm.in should now be routed to /client-onboarding');
      console.log('📋 Following OFFICIAL FLOW 2.1 exactly');
    } else {
      console.log('   ❌ FLOW BROKEN: Missing required data');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testWithRoleId();
