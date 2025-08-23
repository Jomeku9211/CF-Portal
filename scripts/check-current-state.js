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

async function checkCurrentState() {
  console.log('🔍 Checking current user state...');
  
  const newUserId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // 1. Check user details
    console.log('1️⃣ User details:');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', newUserId)
      .single();
    
    if (userError) {
      console.log('❌ User error:', userError.message);
    } else {
      console.log('✅ User:', userData.email, 'Status:', userData.status);
    }
    
    // 2. Check user roles
    console.log('\n2️⃣ User roles:');
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select(`
        *,
        roles(name, description),
        role_categories(name, description)
      `)
      .eq('user_id', newUserId);
    
    if (rolesError) {
      console.log('❌ Roles error:', rolesError.message);
    } else {
      console.log('✅ User roles:', rolesData.length, 'records');
      rolesData.forEach((role, index) => {
        console.log(`   ${index + 1}. Role: ${role.roles?.name}, Category: ${role.role_categories?.name}`);
        console.log(`      Status: ${role.is_active ? 'Active' : 'Inactive'}, Primary: ${role.is_primary ? 'Yes' : 'No'}`);
      });
    }
    
    // 3. Check onboarding progress
    console.log('\n3️⃣ Onboarding progress:');
    const { data: progressData, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', newUserId);
    
    if (progressError) {
      console.log('❌ Progress error:', progressError.message);
      console.log('🔧 This table has permission issues');
    } else {
      console.log('✅ Onboarding progress:', progressData.length, 'records');
      progressData.forEach((progress, index) => {
        console.log(`   ${index + 1}. Flow: ${progress.onboarding_flow}, Step: ${progress.current_step}/${progress.total_steps}`);
        console.log(`      Status: ${progress.onboarding_status}`);
      });
    }
    
    // 4. Check client profile
    console.log('\n4️⃣ Client profile:');
    const { data: profileData, error: profileError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', newUserId);
    
    if (profileError) {
      console.log('❌ Profile error:', profileError.message);
    } else {
      console.log('✅ Client profile:', profileData.length, 'records');
      profileData.forEach((profile, index) => {
        console.log(`   ${index + 1}. Name: ${profile.first_name} ${profile.last_name}`);
        console.log(`      Public: ${profile.is_public ? 'Yes' : 'No'}, Completeness: ${profile.profile_completeness}%`);
      });
    }
    
    // 5. Summary
    console.log('\n📋 Summary:');
    if (rolesData && rolesData.length > 0) {
      const role = rolesData[0];
      console.log(`✅ User has selected: ${role.roles?.name} → ${role.role_categories?.name}`);
      console.log(`🔧 Next step: Test the UI role selection flow`);
    } else {
      console.log('❌ No role selected yet');
    }
    
    if (progressError) {
      console.log('⚠️ Onboarding progress table has permission issues');
      console.log('🔧 This needs to be fixed in Supabase dashboard');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Current State Check...\n');
  
  await checkCurrentState();
  
  console.log('\n🎉 Current State Check Complete!');
}

main().catch(console.error);
