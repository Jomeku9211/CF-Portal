import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCurrentUserRole() {
  console.log('🔍 Checking current user role...\n');
  
  try {
    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError);
      return;
    }
    
    if (!session) {
      console.log('❌ No active session found');
      return;
    }
    
    const user = session.user;
    console.log('👤 Current user:', user.email);
    console.log('🆔 User ID:', user.id);
    
    // Check if user has role in user_roles table
    const { data: userRoles, error: userRolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id);
    
    if (userRolesError) {
      console.error('❌ Error checking user_roles:', userRolesError);
      return;
    }
    
    if (userRoles && userRoles.length > 0) {
      console.log('✅ User HAS role(s):', userRoles.length);
      userRoles.forEach((role, index) => {
        console.log(`   ${index + 1}. Role ID: ${role.role_id}`);
        console.log(`      Category ID: ${role.category_id}`);
        console.log(`      Specialization: ${role.specialization}`);
        console.log(`      Experience Level: ${role.experience_level_id}`);
      });
    } else {
      console.log('❌ User has NO role assigned');
    }
    
    // Check onboarding progress
    const { data: onboardingProgress, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', user.id);
    
    if (onboardingError) {
      console.error('❌ Error checking onboarding progress:', onboardingError);
    } else if (onboardingProgress && onboardingProgress.length > 0) {
      console.log('📊 Onboarding progress found:', onboardingProgress.length);
      onboardingProgress.forEach((progress, index) => {
        console.log(`   ${index + 1}. Flow: ${progress.onboarding_flow}`);
        console.log(`      Stage: ${progress.onboarding_stage}`);
        console.log(`      Status: ${progress.onboarding_status}`);
        console.log(`      Current Step: ${progress.current_step}/${progress.total_steps}`);
      });
    } else {
      console.log('📊 No onboarding progress found');
    }
    
    console.log('\n🎯 Based on this:');
    if (userRoles && userRoles.length > 0) {
      console.log('   → User has role → Should check onboarding_stage for routing');
    } else {
      console.log('   → User has NO role → Should go to /role-selection');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the check
checkCurrentUserRole();
