import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCompleteClientFlow() {
  try {
    console.log('🧪 TESTING COMPLETE CLIENT FLOW - FOLLOWING OFFICIAL DOCUMENT EXACTLY');
    console.log('=' .repeat(80));
    
    // Test user: dheeraj@coderfarm.in
    const testUser = {
      id: '4e28f68c-d6b6-4816-8b10-b3ab451de267',
      email: 'dheeraj@coderfarm.in'
    };
    
    console.log('👤 Test User:', testUser);
    console.log('');
    
    // STEP 1: Check current state
    console.log('📊 STEP 1: Checking current database state...');
    
    // Check user_roles
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', testUser.id);
    
    if (rolesError) {
      console.error('❌ Error checking user_roles:', rolesError);
    } else {
      console.log('✅ user_roles found:', userRoles?.length || 0);
      if (userRoles && userRoles.length > 0) {
        console.log('   - Role ID:', userRoles[0].role_id);
        console.log('   - Category ID:', userRoles[0].category_id);
      }
    }
    
    // Check client_profiles
    const { data: clientProfiles, error: clientError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUser.id);
    
    if (clientError) {
      console.error('❌ Error checking client_profiles:', clientError);
    } else {
      console.log('✅ client_profiles found:', clientProfiles?.length || 0);
    }
    
    // Check user_onboarding_progress
    const { data: onboardingProgress, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUser.id);
    
    if (onboardingError) {
      console.error('❌ Error checking user_onboarding_progress:', onboardingError);
    } else {
      console.log('✅ user_onboarding_progress found:', onboardingProgress?.length || 0);
    }
    
    console.log('');
    
    // STEP 2: Test inserting client_profile (as per OFFICIAL document)
    console.log('📝 STEP 2: Testing client_profile insertion (OFFICIAL FLOW 2.1)...');
    
    try {
      const clientProfileData = {
        user_id: testUser.id,
        role_category: 'startup-founder',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('💾 Inserting client_profile:', clientProfileData);
      
      const { data: newClientProfile, error: insertError } = await supabase
        .from('client_profiles')
        .insert([clientProfileData])
        .select()
        .single();
      
      if (insertError) {
        console.error('❌ Failed to insert client_profile:', insertError);
      } else {
        console.log('✅ client_profile inserted successfully:', newClientProfile);
      }
    } catch (error) {
      console.error('❌ Error in client_profile insertion:', error);
    }
    
    console.log('');
    
    // STEP 3: Test inserting user_onboarding_progress (as per OFFICIAL document)
    console.log('📝 STEP 3: Testing user_onboarding_progress insertion (OFFICIAL FLOW 2.1)...');
    
    try {
      const onboardingData = {
        user_id: testUser.id,
        onboarding_flow: 'client',
        current_step: 1,
        total_steps: 3,
        completed_steps: ['role_selection'],
        onboarding_status: 'in_progress',
        onboarding_stage: 'CLIENT_ORG', // EXACTLY as per OFFICIAL document
        last_activity: new Date().toISOString()
      };
      
      console.log('💾 Inserting user_onboarding_progress:', onboardingData);
      
      const { data: newOnboarding, error: onboardingInsertError } = await supabase
        .from('user_onboarding_progress')
        .insert([onboardingData])
        .select()
        .single();
      
      if (onboardingInsertError) {
        console.error('❌ Failed to insert user_onboarding_progress:', onboardingInsertError);
      } else {
        console.log('✅ user_onboarding_progress inserted successfully:', newOnboarding);
      }
    } catch (error) {
      console.error('❌ Error in user_onboarding_progress insertion:', error);
    }
    
    console.log('');
    
    // STEP 4: Verify final state
    console.log('🔍 STEP 4: Verifying final database state...');
    
    const { data: finalClientProfiles } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUser.id);
    
    const { data: finalOnboarding } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUser.id);
    
    console.log('📊 Final state:');
    console.log('   - client_profiles:', finalClientProfiles?.length || 0);
    console.log('   - user_onboarding_progress:', finalOnboarding?.length || 0);
    
    if (finalOnboarding && finalOnboarding.length > 0) {
      console.log('   - onboarding_stage:', finalOnboarding[0].onboarding_stage);
      console.log('   - Should be: CLIENT_ORG (as per OFFICIAL document)');
    }
    
    console.log('');
    console.log('🎯 EXPECTED RESULT:');
    console.log('   - User should be redirected to Client Onboarding Step 1 (Organization)');
    console.log('   - onboarding_stage should be CLIENT_ORG');
    console.log('   - This follows OFFICIAL FLOW 2.1 exactly');
    
  } catch (error) {
    console.error('❌ Unexpected error in test:', error);
  }
}

testCompleteClientFlow();
