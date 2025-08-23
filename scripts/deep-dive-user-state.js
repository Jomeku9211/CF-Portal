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

async function deepDiveUserState() {
  console.log('🔍 Deep diving into user state...');
  
  const userId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // 1. Check user_roles table in detail
    console.log('1️⃣ User Roles Table (Detailed):');
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select(`
        *,
        roles(name, description, button_label),
        role_categories(name, description)
      `)
      .eq('user_id', userId);
    
    if (rolesError) {
      console.log('❌ User roles error:', rolesError.message);
    } else {
      console.log('✅ User roles found:', userRoles?.length || 0, 'records');
      userRoles?.forEach((role, index) => {
        console.log(`   ${index + 1}. Role: ${role.roles.name}`);
        console.log(`      Category: ${role.role_categories.name}`);
        console.log(`      Role ID: ${role.role_id}`);
        console.log(`      Category ID: ${role.category_id}`);
        console.log(`      Active: ${role.is_active}`);
        console.log(`      Primary: ${role.is_primary}`);
        console.log(`      Created: ${role.created_at}`);
      });
    }
    
    // 2. Check user_onboarding_progress table (with service role if needed)
    console.log('\n2️⃣ User Onboarding Progress Table:');
    try {
      const { data: progressData, error: progressError } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .eq('user_id', userId);
      
      if (progressError) {
        console.log('❌ Onboarding progress error:', progressError.message);
        console.log('🔧 This suggests permission issues with the table');
      } else {
        console.log('✅ Onboarding progress found:', progressData?.length || 0, 'records');
        if (progressData && progressData.length > 0) {
          progressData.forEach((progress, index) => {
            console.log(`   ${index + 1}. Flow: ${progress.onboarding_flow}`);
            console.log(`      Step: ${progress.current_step}/${progress.total_steps}`);
            console.log(`      Status: ${progress.onboarding_status}`);
            console.log(`      Role ID: ${progress.role_id}`);
            console.log(`      Category ID: ${progress.category_id}`);
            console.log(`      Created: ${progress.created_at}`);
          });
        } else {
          console.log('   ℹ️ No onboarding progress records found');
        }
      }
    } catch (err) {
      console.log('❌ Error accessing onboarding progress:', err.message);
    }
    
    // 3. Check if there are any conflicting role records
    console.log('\n3️⃣ Checking for conflicting role records:');
    const { data: allUserRoles, error: allRolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);
    
    if (allRolesError) {
      console.log('❌ Error checking all user roles:', allRolesError.message);
    } else {
      console.log('✅ Total user role records:', allUserRoles?.length || 0);
      
      // Check if there are multiple roles or conflicting data
      if (allUserRoles && allUserRoles.length > 1) {
        console.log('⚠️ Multiple role records found - this could cause conflicts!');
        allUserRoles.forEach((role, index) => {
          console.log(`   ${index + 1}. Role ID: ${role.role_id}, Category: ${role.category_id}`);
        });
      }
    }
    
    // 4. Check the actual role and category data
    console.log('\n4️⃣ Role and Category Data:');
    if (userRoles && userRoles.length > 0) {
      const userRole = userRoles[0];
      
      // Check the role details
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('*')
        .eq('id', userRole.role_id)
        .single();
      
      if (roleError) {
        console.log('❌ Role data error:', roleError.message);
      } else {
        console.log('✅ Role data:');
        console.log(`   Name: ${roleData.name}`);
        console.log(`   Description: ${roleData.description}`);
        console.log(`   Button Label: ${roleData.button_label}`);
      }
      
      // Check the category details
      const { data: categoryData, error: categoryError } = await supabase
        .from('role_categories')
        .select('*')
        .eq('id', userRole.category_id)
        .single();
      
      if (categoryError) {
        console.log('❌ Category data error:', categoryError.message);
      } else {
        console.log('✅ Category data:');
        console.log(`   Name: ${categoryData.name}`);
        console.log(`   Description: ${categoryData.description}`);
        console.log(`   Role ID: ${categoryData.role_id}`);
      }
    }
    
    // 5. Check what URL this user should see
    console.log('\n5️⃣ URL Routing Analysis:');
    if (userRoles && userRoles.length > 0) {
      const userRole = userRoles[0];
      const roleName = userRole.roles.name;
      
      console.log(`🎯 User has role: ${roleName}`);
      
      if (roleName === 'client') {
        console.log('🔧 Should redirect to: /client-onboarding');
        console.log('🔧 Expected flow: 4-step client onboarding');
      } else if (roleName === 'service-provider') {
        console.log('🔧 Should redirect to: /developer-onboarding');
        console.log('🔧 Expected flow: 5-step developer onboarding');
      } else if (roleName === 'agency') {
        console.log('🔧 Should redirect to: /agency-onboarding');
        console.log('🔧 Expected flow: 3-step agency onboarding');
      }
      
      // Check if there's a mismatch
      if (roleName === 'client' && userRole.role_categories.name === 'startup-founder') {
        console.log('✅ Role and category match: client + startup-founder');
        console.log('🔧 This should definitely go to client onboarding');
      }
    }
    
    // 6. Summary and recommendations
    console.log('\n📋 Summary & Recommendations:');
    if (userRoles && userRoles.length > 0) {
      const userRole = userRoles[0];
      const roleName = userRole.roles.name;
      
      if (roleName === 'client') {
        console.log('✅ User is correctly identified as CLIENT');
        console.log('🔧 They should see /client-onboarding');
        console.log('🔧 If they see /developer-onboarding, there\'s a routing bug');
      } else {
        console.log(`⚠️ User has unexpected role: ${roleName}`);
        console.log('🔧 This explains why they see the wrong onboarding');
      }
    }
    
    console.log('\n🔍 Next steps to investigate:');
    console.log('1. Check the routing logic in the UI');
    console.log('2. Check if there are conflicting role records');
    console.log('3. Verify the onboarding progress table permissions');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Deep Dive User State Analysis...\n');
  
  await deepDiveUserState();
  
  console.log('\n🎉 Deep Dive Analysis Complete!');
}

main().catch(console.error);
