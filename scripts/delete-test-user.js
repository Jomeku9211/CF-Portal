import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function deleteTestUser() {
  console.log('🧹 Deleting test user and all associated data...');
  
  const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
  
  try {
    // Delete in order to respect foreign key constraints
    
    // 1. Delete onboarding progress
    console.log('📝 Deleting onboarding progress...');
    const { error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .delete()
      .eq('user_id', testUserId);
    
    if (onboardingError) {
      console.log('❌ Failed to delete onboarding progress:', onboardingError.message);
    } else {
      console.log('✅ Onboarding progress deleted');
    }
    
    // 2. Delete service provider profile
    console.log('👨‍💻 Deleting service provider profile...');
    const { error: profileError } = await supabase
      .from('service_provider_profiles')
      .delete()
      .eq('user_id', testUserId);
    
    if (profileError) {
      console.log('❌ Failed to delete service provider profile:', profileError.message);
    } else {
      console.log('✅ Service provider profile deleted');
    }
    
    // 3. Delete client profile (if exists)
    console.log('👔 Deleting client profile...');
    const { error: clientError } = await supabase
      .from('client_profiles')
      .delete()
      .eq('user_id', testUserId);
    
    if (clientError) {
      console.log('❌ Failed to delete client profile:', clientError.message);
    } else {
      console.log('✅ Client profile deleted');
    }
    
    // 4. Delete organizations (if exists)
    console.log('🏢 Deleting organizations...');
    const { error: orgError } = await supabase
      .from('organizations')
      .delete()
      .eq('client_profile_id', testUserId);
    
    if (orgError) {
      console.log('❌ Failed to delete organizations:', orgError.message);
    } else {
      console.log('✅ Organizations deleted');
    }
    
    // 5. Delete user roles
    console.log('🎭 Deleting user roles...');
    const { error: roleError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', testUserId);
    
    if (roleError) {
      console.log('❌ Failed to delete user roles:', roleError.message);
    } else {
      console.log('✅ User roles deleted');
    }
    
    // 6. Delete from users table (if exists)
    console.log('👤 Deleting from users table...');
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', testUserId);
    
    if (userError) {
      console.log('❌ Failed to delete from users table:', userError.message);
    } else {
      console.log('✅ User deleted from users table');
    }
    
    console.log('\n🎉 Test user cleanup complete!');
    console.log('📋 Ready for client flow smoke testing');
    
  } catch (error) {
    console.error('❌ Unexpected error during cleanup:', error);
  }
}

deleteTestUser();
