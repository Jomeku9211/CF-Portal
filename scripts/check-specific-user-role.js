import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSpecificUser() {
  try {
    console.log('🔍 Checking user: dheeraj@coderfarm.in');
    
    // First, find the user by email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', 'dheeraj@coderfarm.in')
      .single();
    
    if (userError) {
      console.error('❌ Error finding user:', userError);
      return;
    }
    
    if (!userData) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:', userData);
    
    // Check user_roles table
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userData.id);
    
    if (rolesError) {
      console.error('❌ Error checking user_roles:', rolesError);
    } else {
      console.log('📋 User roles:', userRoles);
      
      // Check what columns exist in roles table
      if (userRoles && userRoles.length > 0) {
        console.log('\n🔍 Checking roles table structure...');
        const { data: roleInfo, error: roleError } = await supabase
          .from('roles')
          .select('*')
          .eq('id', userRoles[0].role_id)
          .single();
        
        if (roleError) {
          console.error('❌ Error checking role details:', roleError);
        } else {
          console.log('📋 Role details:', roleInfo);
        }
        
        // Check category info
        console.log('\n🔍 Checking role_categories table structure...');
        const { data: categoryInfo, error: categoryError } = await supabase
          .from('role_categories')
          .select('*')
          .eq('id', userRoles[0].category_id)
          .single();
        
        if (categoryError) {
          console.error('❌ Error checking category details:', categoryError);
        } else {
          console.log('📋 Category details:', categoryInfo);
        }
      }
    }
    
    // Check user_onboarding_progress table
    const { data: onboardingProgress, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', userData.id);
    
    if (onboardingError) {
      console.error('❌ Error checking onboarding progress:', onboardingError);
    } else {
      console.log('📊 Onboarding progress:', onboardingProgress);
    }
    
    // Check if user has any role at all
    if (userRoles && userRoles.length > 0) {
      console.log('✅ User HAS roles assigned');
      userRoles.forEach(role => {
        console.log(`   - Role ID: ${role.role_id}`);
        console.log(`   - Role Name: ${role.roles?.name || 'N/A'}`);
        console.log(`   - Role Display: ${role.roles?.display_name || 'N/A'}`);
        console.log(`   - Category ID: ${role.category_id}`);
        console.log(`   - Category Name: ${role.role_categories?.name || 'N/A'}`);
        console.log(`   - Category Display: ${role.role_categories?.display_name || 'N/A'}`);
        console.log(`   - Specialization: ${role.specialization}`);
        console.log(`   - Experience Level: ${role.experience_level_id}`);
        console.log('');
      });
    } else {
      console.log('❌ User has NO roles assigned');
    }
    
    // Check onboarding stage
    if (onboardingProgress && onboardingProgress.length > 0) {
      console.log('✅ User HAS onboarding progress');
      onboardingProgress.forEach(progress => {
        console.log(`   - Stage: ${progress.onboarding_stage}, Status: ${progress.onboarding_status}`);
      });
    } else {
      console.log('❌ User has NO onboarding progress');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkSpecificUser();
