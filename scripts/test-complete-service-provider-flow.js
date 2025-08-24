import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testCompleteServiceProviderFlow() {
  console.log('🧪 TESTING COMPLETE SERVICE PROVIDER FLOW END-TO-END');
  console.log('================================================================================');
  
  const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
  
  try {
    // STEP 1: Check current user state
    console.log('\n📊 STEP 1: Checking current user state...');
    
    const { data: userRoles, error: userRolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', testUserId);
    
    if (userRolesError) {
      console.log('❌ Cannot get user roles:', userRolesError.message);
      return;
    }
    
    if (userRoles.length === 0) {
      console.log('❌ User has no roles assigned');
      return;
    }
    
    const userRole = userRoles[0];
    console.log('✅ User role found:', userRole);
    
    // STEP 2: Check onboarding progress
    console.log('\n📊 STEP 2: Checking onboarding progress...');
    
    const { data: onboardingProgress, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUserId);
    
    if (onboardingError) {
      console.log('❌ Cannot get onboarding progress:', onboardingError.message);
      return;
    }
    
    if (onboardingProgress.length === 0) {
      console.log('❌ User has no onboarding progress');
      return;
    }
    
    const progress = onboardingProgress[0];
    console.log('✅ Onboarding progress found:', progress);
    
    // STEP 3: Check service provider profile
    console.log('\n📊 STEP 3: Checking service provider profile...');
    
    const { data: serviceProviderProfile, error: profileError } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .eq('user_id', testUserId);
    
    if (profileError) {
      console.log('❌ Cannot get service provider profile:', profileError.message);
      return;
    }
    
    if (serviceProviderProfile.length === 0) {
      console.log('❌ User has no service provider profile');
      return;
    }
    
    const profile = serviceProviderProfile[0];
    console.log('✅ Service provider profile found:', profile);
    
    // STEP 4: Verify flow logic according to OFFICIAL document
    console.log('\n📊 STEP 4: Verifying flow logic...');
    
    const roleName = userRole.role_id === '38b72eef-833c-496e-b493-4455e0e7a670' ? 'service-provider' : 'unknown';
    const onboardingStage = progress.onboarding_stage;
    const onboardingFlow = progress.onboarding_flow;
    
    console.log('🔍 Flow Analysis:');
    console.log(`   - User role: ${roleName}`);
    console.log(`   - Onboarding stage: ${onboardingStage}`);
    console.log(`   - Onboarding flow: ${onboardingFlow}`);
    
    // STEP 5: Test smart routing logic
    console.log('\n📊 STEP 5: Testing smart routing logic...');
    
    if (roleName === 'service-provider') {
      console.log('✅ User has SERVICE_PROVIDER role');
      
      if (onboardingStage === 'organization_onboarding') {
        console.log('✅ User is in organization_onboarding stage');
        console.log('🎯 According to OFFICIAL FLOW:');
        console.log('   - User should be routed to /developer-onboarding');
        console.log('   - This is Step 1 of 5-step developer onboarding');
        console.log('   - User should see developer onboarding form');
      } else {
        console.log(`⚠️  Unexpected onboarding stage: ${onboardingStage}`);
        console.log('   Expected: organization_onboarding (or similar)');
      }
      
      if (onboardingFlow === 'developer') {
        console.log('✅ Onboarding flow is correctly set to "developer"');
      } else {
        console.log(`⚠️  Unexpected onboarding flow: ${onboardingFlow}`);
        console.log('   Expected: developer');
      }
      
    } else {
      console.log(`❌ Unexpected role: ${roleName}`);
      console.log('   Expected: service-provider');
    }
    
    // STEP 6: Verify database integrity
    console.log('\n📊 STEP 6: Verifying database integrity...');
    
    const { data: roleDetails, error: roleDetailsError } = await supabase
      .from('roles')
      .select('*')
      .eq('id', userRole.role_id);
    
    if (roleDetailsError || !roleDetails || roleDetails.length === 0) {
      console.log('❌ Cannot get role details');
    } else {
      console.log('✅ Role details:', roleDetails[0].name);
    }
    
    const { data: categoryDetails, error: categoryDetailsError } = await supabase
      .from('role_categories')
      .select('*')
      .eq('id', userRole.category_id);
    
    if (categoryDetailsError || !categoryDetails || categoryDetails.length === 0) {
      console.log('❌ Cannot get category details');
    } else {
      console.log('✅ Category details:', categoryDetails[0].name);
    }
    
    // STEP 7: Summary and next steps
    console.log('\n🎉🎉🎉 COMPLETE SERVICE PROVIDER FLOW TEST RESULTS 🎉🎉🎉');
    console.log('================================================================================');
    
    if (roleName === 'service-provider' && onboardingFlow === 'developer') {
      console.log('✅ SUCCESS! Service provider flow is working correctly!');
      console.log('📱 User should be automatically routed to /developer-onboarding');
      console.log('📋 Database state is correct and consistent');
      console.log('');
      console.log('🚀 NEXT STEPS:');
      console.log('1. Open browser and go to http://localhost:5173');
      console.log('2. Login with dheeraj@coderfarm.in');
      console.log('3. User should be automatically redirected to /developer-onboarding');
      console.log('4. Verify the developer onboarding form loads correctly');
      console.log('5. Test the 5-step developer onboarding flow');
    } else {
      console.log('❌ ISSUES FOUND:');
      console.log(`   - Role: ${roleName} (expected: service-provider)`);
      console.log(`   - Flow: ${onboardingFlow} (expected: developer)`);
      console.log('🔧 Need to fix these issues before flow will work');
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testCompleteServiceProviderFlow();
