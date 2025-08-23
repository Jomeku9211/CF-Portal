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

async function testUserRoleCheck() {
  console.log('🔍 Testing user role check functionality...');
  
  const testUserId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // 1. Test the exact query that checkExistingUserRole uses
    console.log('1️⃣ Testing user role check query:');
    const { data: userRole, error } = await supabase
      .from('user_roles')
      .select('*, roles(*)')
      .eq('user_id', testUserId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ User has no role yet - this would stay on role selection');
      } else {
        console.log('❌ User role error:', error.message);
      }
    } else {
      console.log('✅ User role found:', userRole.roles.name);
      console.log('   Category ID:', userRole.category_id);
      console.log('🔧 This should trigger a redirect in the UI');
      
      // 2. Test what the redirect logic would do
      console.log('\n2️⃣ Testing redirect logic:');
      const roleName = userRole.roles.name;
      
      if (roleName === 'client') {
        console.log('   🎯 Would redirect to: /client-onboarding');
      } else if (roleName === 'agency') {
        console.log('   🎯 Would redirect to: /agency-onboarding');
      } else if (roleName === 'service-provider') {
        console.log('   🎯 Would redirect to: /developer-onboarding');
      }
    }
    
    // 3. Test if we can access the basic tables needed for role selection
    console.log('\n3️⃣ Testing basic table access for role selection:');
    
    // Test roles table
    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .select('*');
    
    if (rolesError) {
      console.log('❌ Roles table error:', rolesError.message);
    } else {
      console.log('✅ Roles table accessible');
    }
    
    // Test role_categories table
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('role_categories')
      .select('*');
    
    if (categoriesError) {
      console.log('❌ Categories table error:', categoriesError.message);
    } else {
      console.log('✅ Categories table accessible');
    }
    
    // 4. Summary
    console.log('\n📋 Summary:');
    if (error && error.code === 'PGRST116') {
      console.log('✅ User has no role - UI should show role selection');
    } else if (error) {
      console.log('❌ Error checking user role - UI cannot determine user state');
    } else {
      console.log('✅ User has role - UI should redirect to appropriate onboarding');
      console.log('🔧 No more "Loading roles..." stuck state');
    }
    
    if (rolesError || categoriesError) {
      console.log('⚠️ Some tables have access issues that could affect role selection');
    } else {
      console.log('✅ All required tables accessible for role selection');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting User Role Check Test...\n');
  
  await testUserRoleCheck();
  
  console.log('\n🎉 User Role Check Test Complete!');
}

main().catch(console.error);
