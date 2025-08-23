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

async function testRoleSelectionFlow() {
  console.log('🔍 Testing role selection flow...');
  
  const testUserId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // 1. Test if user exists
    console.log('1️⃣ Testing user existence:');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', testUserId)
      .single();
    
    if (userError) {
      console.log('❌ User error:', userError.message);
      return;
    } else {
      console.log('✅ User found:', userData.email);
    }
    
    // 2. Test user_roles table access (this is what checkExistingUserRole does)
    console.log('\n2️⃣ Testing user_roles table access:');
    const { data: userRole, error: roleError } = await supabase
      .from('user_roles')
      .select('*, roles(*)')
      .eq('user_id', testUserId)
      .single();
    
    if (roleError) {
      console.log('❌ User role error:', roleError.message);
      console.log('🔧 This would cause the UI to stay on role selection');
    } else {
      console.log('✅ User role found:', userRole.roles.name);
      console.log('🔧 This should trigger a redirect in the UI');
    }
    
    // 3. Test user_onboarding_progress table access (this is what causes the permission issue)
    console.log('\n3️⃣ Testing user_onboarding_progress table access:');
    const { data: progressData, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUserId);
    
    if (progressError) {
      console.log('❌ Onboarding progress error:', progressError.message);
      console.log('🔧 This permission issue is preventing the UI from working properly');
    } else {
      console.log('✅ Onboarding progress accessible');
      console.log('📊 Found', progressData?.length || 0, 'progress records');
    }
    
    // 4. Test the exact query that checkExistingUserRole uses
    console.log('\n4️⃣ Testing the exact query from checkExistingUserRole:');
    try {
      const { data: userRole2, error: roleError2 } = await supabase
        .from('user_roles')
        .select('*, roles(*)')
        .eq('user_id', testUserId)
        .single();
      
      if (roleError2) {
        console.log('❌ Query failed:', roleError2.message);
      } else {
        console.log('✅ Query successful');
        console.log('   Role:', userRole2.roles.name);
        console.log('   Category ID:', userRole2.category_id);
        
        // Now test if we can create onboarding progress
        console.log('\n5️⃣ Testing onboarding progress creation:');
        const onboardingFlow = userRole2.roles.name === 'client' ? 'client' : 'developer';
        
        const { data: newProgress, error: createError } = await supabase
          .from('user_onboarding_progress')
          .insert({
            user_id: testUserId,
            role_id: userRole2.role_id,
            category_id: userRole2.category_id,
            onboarding_flow: onboardingFlow,
            current_step: 1,
            total_steps: 4,
            completed_steps: [],
            onboarding_status: 'in_progress'
          })
          .select()
          .single();
        
        if (createError) {
          console.log('❌ Create onboarding progress error:', createError.message);
        } else {
          console.log('✅ Onboarding progress created successfully');
        }
      }
    } catch (err) {
      console.log('❌ Error in role query:', err.message);
    }
    
    // 5. Summary
    console.log('\n📋 Summary:');
    if (roleError) {
      console.log('❌ User role table has issues - UI cannot check existing roles');
    } else if (progressError) {
      console.log('⚠️ User role works but onboarding progress has permission issues');
      console.log('🔧 This prevents the UI from redirecting users with existing roles');
      console.log('🔧 The UI gets stuck on "Loading roles..." because it cannot complete the flow');
    } else {
      console.log('✅ All tables working - UI should work properly');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Role Selection Flow Test...\n');
  
  await testRoleSelectionFlow();
  
  console.log('\n🎉 Role Selection Flow Test Complete!');
}

main().catch(console.error);
