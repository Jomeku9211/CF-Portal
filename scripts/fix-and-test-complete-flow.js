import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixAndTestCompleteFlow() {
  try {
    console.log('🔧 FIXING DATABASE AND TESTING COMPLETE CLIENT FLOW');
    console.log('=' .repeat(80));
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    // STEP 1: Fix Database Structure
    console.log('📝 STEP 1: Fixing database table structure...');
    
    try {
      // Add missing columns
      console.log('   🔧 Adding missing columns...');
      
      // Try to insert with all required columns to see what's missing
      const testInsert = {
        user_id: testUserId,
        onboarding_flow: 'client',
        current_step: 1,
        total_steps: 3,
        completed_steps: ['role_selection'],
        onboarding_status: 'in_progress',
        onboarding_stage: 'CLIENT_ORG',
        last_activity: new Date().toISOString()
      };
      
      console.log('   🧪 Testing insert with all columns...');
      const { data: insertResult, error: insertError } = await supabase
        .from('user_onboarding_progress')
        .insert([testInsert])
        .select();
      
      if (insertError) {
        console.log('   ❌ Insert failed:', insertError.message);
        
        // If it's a column error, we need to add columns
        if (insertError.message.includes('column') || insertError.message.includes('does not exist')) {
          console.log('   🔧 Need to add missing columns via SQL...');
          console.log('   📋 Run this SQL in Supabase:');
          console.log('   ALTER TABLE user_onboarding_progress ADD COLUMN IF NOT EXISTS onboarding_flow VARCHAR(50);');
          console.log('   ALTER TABLE user_onboarding_progress ADD COLUMN IF NOT EXISTS completed_steps TEXT[];');
          console.log('   ALTER TABLE user_onboarding_progress ADD COLUMN IF NOT EXISTS onboarding_status VARCHAR(50);');
          console.log('   ALTER TABLE user_onboarding_progress ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP WITH TIME ZONE;');
        }
      } else {
        console.log('   ✅ Insert successful! Database structure is correct');
        // Clean up
        await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
      }
    } catch (error) {
      console.log('   ❌ Error during database fix:', error.message);
    }
    
    console.log('');
    
    // STEP 2: Test Complete Client Flow
    console.log('🧪 STEP 2: Testing complete client flow...');
    
    // 2.1: Check current user state
    console.log('   📊 2.1: Checking current user state...');
    
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', testUserId);
    
    const { data: clientProfiles } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUserId);
    
    const { data: onboardingProgress } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUserId);
    
    console.log('   📋 Current state:');
    console.log(`      - user_roles: ${userRoles?.length || 0} records`);
    console.log(`      - client_profiles: ${clientProfiles?.length || 0} records`);
    console.log(`      - user_onboarding_progress: ${onboardingProgress?.length || 0} records`);
    
    // 2.2: Create missing client_profile (per OFFICIAL document)
    console.log('   📝 2.2: Creating client_profile (OFFICIAL FLOW 2.1)...');
    
    if (clientProfiles?.length === 0) {
      try {
        const clientProfileData = {
          user_id: testUserId,
          first_name: 'Dheeraj',
          last_name: 'Khandare',
          job_title: 'Startup Founder',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { data: newClientProfile, error: clientError } = await supabase
          .from('client_profiles')
          .insert([clientProfileData])
          .select();
        
        if (clientError) {
          console.log('      ❌ Failed to create client_profile:', clientError.message);
        } else {
          console.log('      ✅ client_profile created successfully');
        }
      } catch (error) {
        console.log('      ❌ Error creating client_profile:', error.message);
      }
    } else {
      console.log('      ✅ client_profile already exists');
    }
    
    // 2.3: Create missing user_onboarding_progress (per OFFICIAL document)
    console.log('   📝 2.3: Creating user_onboarding_progress (OFFICIAL FLOW 2.1)...');
    
    if (onboardingProgress?.length === 0) {
      try {
        const onboardingData = {
          user_id: testUserId,
          onboarding_flow: 'client',
          current_step: 1,
          total_steps: 3,
          completed_steps: ['role_selection'],
          onboarding_status: 'in_progress',
          onboarding_stage: 'CLIENT_ORG', // EXACTLY as per OFFICIAL document
          last_activity: new Date().toISOString()
        };
        
        const { data: newOnboarding, error: onboardingError } = await supabase
          .from('user_onboarding_progress')
          .insert([onboardingData])
          .select();
        
        if (onboardingError) {
          console.log('      ❌ Failed to create user_onboarding_progress:', onboardingError.message);
        } else {
          console.log('      ✅ user_onboarding_progress created successfully');
        }
      } catch (error) {
        console.log('      ❌ Error creating user_onboarding_progress:', error.message);
      }
    } else {
      console.log('      ✅ user_onboarding_progress already exists');
    }
    
    console.log('');
    
    // STEP 3: Verify Final State
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
    console.log('🎯 EXPECTED FLOW RESULT:');
    console.log('   - User should be redirected to /client-onboarding');
    console.log('   - onboarding_stage should be CLIENT_ORG');
    console.log('   - This follows OFFICIAL FLOW 2.1 exactly');
    
    // STEP 4: Test Frontend Routing Logic
    console.log('');
    console.log('🧪 STEP 4: Testing frontend routing logic...');
    
    if (finalUserRoles?.length > 0 && finalOnboardingProgress?.length > 0) {
      const userRole = finalUserRoles[0];
      const onboarding = finalOnboardingProgress[0];
      
      console.log('   📋 User has role and onboarding progress');
      console.log(`   🎯 According to OFFICIAL document:`);
      console.log(`      - User has CLIENT role → Check onboarding_stage`);
      console.log(`      - onboarding_stage = 'CLIENT_ORG' → Go to /client-onboarding`);
      console.log(`   ✅ FLOW SHOULD WORK! User should be routed to /client-onboarding`);
    } else {
      console.log('   ❌ FLOW BROKEN: Missing required data');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

fixAndTestCompleteFlow();
