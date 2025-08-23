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

async function testNewUserAccess() {
  console.log('🧪 Testing new user access...');
  
  const newUserId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // 1. Check if user exists in users table
    console.log('1️⃣ Checking if user exists in users table...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', newUserId)
      .single();
    
    if (userError) {
      console.log('❌ User not found in users table:', userError.message);
      console.log('📝 This means the user sync is not working');
      return false;
    } else {
      console.log('✅ User found in users table:', userData.email);
    }
    
    // 2. Check if user can access user_roles table
    console.log('\n2️⃣ Testing user_roles table access...');
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', newUserId);
    
    if (rolesError) {
      console.log('❌ Error accessing user_roles:', rolesError.message);
    } else {
      console.log('✅ user_roles table accessible, found records:', rolesData.length);
    }
    
    // 3. Check if user can access user_onboarding_progress table
    console.log('\n3️⃣ Testing user_onboarding_progress table access...');
    const { data: progressData, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', newUserId);
    
    if (progressError) {
      console.log('❌ Error accessing user_onboarding_progress:', progressError.message);
    } else {
      console.log('✅ user_onboarding_progress table accessible, found records:', progressData.length);
    }
    
    // 4. Test inserting a role selection
    console.log('\n4️⃣ Testing role selection insert...');
    const roleData = {
      user_id: newUserId,
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('user_roles')
      .insert(roleData)
      .select();
    
    if (insertError) {
      console.log('❌ Role selection insert failed:', insertError.message);
    } else {
      console.log('✅ Role selection inserted successfully:', insertData);
    }
    
    // 5. Test inserting onboarding progress
    console.log('\n5️⃣ Testing onboarding progress insert...');
    const progressInsertData = {
      user_id: newUserId,
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 4,
      completed_steps: [],
      onboarding_status: 'in_progress'
    };
    
    const { data: progressInsertResult, error: progressInsertError } = await supabase
      .from('user_onboarding_progress')
      .insert(progressInsertData)
      .select();
    
    if (progressInsertError) {
      console.log('❌ Onboarding progress insert failed:', progressInsertError.message);
    } else {
      console.log('✅ Onboarding progress inserted successfully:', progressInsertResult);
    }
    
    return true;
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting New User Flow Test...\n');
  
  const success = await testNewUserAccess();
  
  if (success) {
    console.log('\n🎉 New user flow test completed successfully!');
    console.log('✅ The new user should now be able to use the role selection system');
  } else {
    console.log('\n❌ New user flow test failed');
    console.log('🔧 Some setup may be needed');
  }
}

main().catch(console.error);
