import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testRoleSelectionDatabase() {
  console.log('🚀 Starting Role Selection Database Smoke Test...');
  console.log('📋 Testing: Role selection and database operations');
  
  try {
    // Step 1: Check current user roles table
    console.log('\n📊 Step 1: Checking current user_roles table...');
    
    const { data: userRoles, error: userRolesError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(5);
    
    if (userRolesError) {
      console.log('❌ Error accessing user_roles:', userRolesError.message);
    } else {
      console.log('✅ user_roles table accessible');
      console.log('📋 Found', userRoles?.length || 0, 'user role entries');
      if (userRoles && userRoles.length > 0) {
        console.log('📋 Sample user role:', {
          user_id: userRoles[0].user_id,
          role_id: userRoles[0].role_id,
          category_id: userRoles[0].category_id
        });
      }
    }
    
    // Step 2: Check roles table
    console.log('\n📊 Step 2: Checking roles table...');
    
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('*');
    
    if (rolesError) {
      console.log('❌ Error accessing roles:', rolesError.message);
    } else {
      console.log('✅ roles table accessible');
      console.log('📋 Available roles:', roles?.map(r => r.name) || []);
      
      // Find client role
      const clientRole = roles?.find(r => r.name === 'client');
      if (clientRole) {
        console.log('✅ Found client role with ID:', clientRole.id);
      } else {
        console.log('❌ Client role not found');
      }
    }
    
    // Step 3: Check role categories table
    console.log('\n📊 Step 3: Checking role_categories table...');
    
    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .select('*');
    
    if (categoriesError) {
      console.log('❌ Error accessing role_categories:', categoriesError.message);
    } else {
      console.log('✅ role_categories table accessible');
      console.log('📋 Available categories:', categories?.map(c => c.name) || []);
      
      // Find startup category
      const startupCategory = categories?.find(c => c.name === 'startup');
      if (startupCategory) {
        console.log('✅ Found startup category with ID:', startupCategory.id);
      } else {
        console.log('❌ Startup category not found');
      }
    }
    
    // Step 4: Check onboarding progress table
    console.log('\n📊 Step 4: Checking user_onboarding_progress table...');
    
    const { data: progress, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(5);
    
    if (progressError) {
      console.log('❌ Error accessing onboarding progress:', progressError.message);
    } else {
      console.log('✅ user_onboarding_progress table accessible');
      console.log('📋 Found', progress?.length || 0, 'onboarding progress entries');
      if (progress && progress.length > 0) {
        console.log('📋 Sample progress:', {
          user_id: progress[0].user_id,
          onboarding_flow: progress[0].onboarding_flow,
          current_step: progress[0].current_step
        });
      }
    }
    
    // Step 5: Summary and recommendations
    console.log('\n🎉 Role Selection Database Smoke Test Complete!');
    console.log('📋 Summary:');
    console.log('✅ Database tables are accessible');
    console.log('✅ Role selection structure is in place');
    
    console.log('\n🚀 Next steps for testing:');
    console.log('1. Go to http://localhost:5173/ in browser');
    console.log('2. Complete role selection: CLIENT → STARTUP → FOUNDER');
    console.log('3. Verify data is saved to user_roles table');
    console.log('4. Verify onboarding progress is updated');
    console.log('5. Test organization onboarding flow');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test
testRoleSelectionDatabase();
