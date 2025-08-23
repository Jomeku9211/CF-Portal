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

async function checkUserRole() {
  console.log('🔍 Checking user role...');
  
  const userId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // 1. Check user details
    console.log('1️⃣ User details:');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) {
      console.log('❌ User error:', userError.message);
    } else {
      console.log('✅ User found:', userData.email, 'Status:', userData.status);
    }
    
    // 2. Check user role
    console.log('\n2️⃣ User role:');
    const { data: userRole, error: roleError } = await supabase
      .from('user_roles')
      .select(`
        *,
        roles(name, description),
        role_categories(name, description)
      `)
      .eq('user_id', userId)
      .single();
    
    if (roleError) {
      if (roleError.code === 'PGRST116') {
        console.log('❌ User has no role selected yet');
      } else {
        console.log('❌ Role error:', roleError.message);
      }
    } else {
      console.log('✅ User role found:');
      console.log(`   Role: ${userRole.roles.name}`);
      console.log(`   Category: ${userRole.role_categories.name}`);
      console.log(`   Status: ${userRole.is_active ? 'Active' : 'Inactive'}`);
      console.log(`   Primary: ${userRole.is_primary ? 'Yes' : 'No'}`);
    }
    
    // 3. Check onboarding progress
    console.log('\n3️⃣ Onboarding progress:');
    const { data: progressData, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (progressError) {
      console.log('❌ Onboarding progress error:', progressError.message);
    } else {
      console.log('✅ Onboarding progress:', progressData?.length || 0, 'records');
      if (progressData && progressData.length > 0) {
        progressData.forEach((progress, index) => {
          console.log(`   ${index + 1}. Flow: ${progress.onboarding_flow}, Step: ${progress.current_step}/${progress.total_steps}`);
          console.log(`      Status: ${progress.onboarding_status}`);
        });
      }
    }
    
    // 4. Check profile tables
    console.log('\n4️⃣ Profile tables:');
    
    // Check client profile
    const { data: clientProfile, error: clientError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', userId);
    
    if (clientError) {
      console.log('❌ Client profile error:', clientError.message);
    } else {
      console.log('✅ Client profile:', clientProfile?.length || 0, 'records');
    }
    
    // Check service provider profile
    const { data: serviceProfile, error: serviceError } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .eq('user_id', userId);
    
    if (serviceError) {
      console.log('❌ Service provider profile error:', serviceError.message);
    } else {
      console.log('✅ Service provider profile:', serviceProfile?.length || 0, 'records');
    }
    
    // Check agency profile
    const { data: agencyProfile, error: agencyError } = await supabase
      .from('agency_profiles')
      .select('*')
      .eq('user_id', userId);
    
    if (agencyError) {
      console.log('❌ Agency profile error:', agencyError.message);
    } else {
      console.log('✅ Agency profile:', agencyProfile?.length || 0, 'records');
    }
    
    // 5. Summary
    console.log('\n📋 Summary:');
    if (roleError && roleError.code === 'PGRST116') {
      console.log('❌ User has NO ROLE selected yet');
      console.log('🔧 They need to go through role selection first');
    } else if (roleError) {
      console.log('❌ Error checking user role');
    } else {
      console.log(`✅ User has role: ${userRole.roles.name} → ${userRole.role_categories.name}`);
      
      if (userRole.roles.name === 'client') {
        console.log('🎯 This is a CLIENT user');
        console.log('🔧 They should be redirected to /client-onboarding');
      } else if (userRole.roles.name === 'service-provider') {
        console.log('🎯 This is a SERVICE PROVIDER user');
        console.log('🔧 They should be redirected to /developer-onboarding');
      } else if (userRole.roles.name === 'agency') {
        console.log('🎯 This is an AGENCY user');
        console.log('🔧 They should be redirected to /agency-onboarding');
      }
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting User Role Check...\n');
  
  await checkUserRole();
  
  console.log('\n🎉 User Role Check Complete!');
}

main().catch(console.error);
