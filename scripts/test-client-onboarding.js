import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testClientOnboarding() {
  console.log('🧪 Starting Client Onboarding Smoke Test...\n');

  try {
    // Test user token (partial - we'll need to get the full user from auth)
    const partialToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImVmc0I0dHZERHlvcmVRTWwiLCJ0eXAiOiJKV1QifQ';
    
    // First, let's check what users exist and find the one with this token
    console.log('🔍 Checking existing users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email')
      .limit(5);

    if (usersError) {
      console.error('❌ Error fetching users:', usersError);
      return;
    }

    console.log('📋 Found users:');
    users.forEach(user => {
      console.log(`  - ID: ${user.id}, Email: ${user.email}`);
    });

    // Let's check the most recent user (assuming it's the test user)
    const testUserId = users[0]?.id;
    if (!testUserId) {
      console.error('❌ No users found');
      return;
    }

    console.log(`\n🎯 Using test user ID: ${testUserId}`);

    // Check current state
    console.log('\n📊 Checking current database state...');
    
    // Check user_roles
    const { data: userRoles, error: userRolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', testUserId);

    if (userRolesError) {
      console.error('❌ Error fetching user_roles:', userRolesError);
    } else {
      console.log('👥 User Roles:', userRoles);
    }

    // Check client_profiles
    const { data: clientProfiles, error: clientProfilesError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUserId);

    if (clientProfilesError) {
      console.error('❌ Error fetching client_profiles:', clientProfilesError);
    } else {
      console.log('🏢 Client Profiles:', clientProfiles);
    }

    // Check user_onboarding_progress
    const { data: onboardingProgress, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUserId);

    if (onboardingError) {
      console.error('❌ Error fetching onboarding progress:', onboardingError);
    } else {
      console.log('📈 Onboarding Progress:', onboardingProgress);
    }

    // Now simulate the role selection process
    console.log('\n🎭 Simulating role selection...');
    
    // First, let's check what roles and categories exist
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('*');

    if (rolesError) {
      console.error('❌ Error fetching roles:', rolesError);
      return;
    }

    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .select('*');

    if (categoriesError) {
      console.error('❌ Error fetching categories:', categoriesError);
      return;
    }

    console.log('🎭 Available roles:', roles);
    console.log('📂 Available categories:', categories);

    // Find client role and startup-founder category
    const clientRole = roles.find(r => r.name === 'client');
    const startupFounderCategory = categories.find(c => c.name === 'startup-founder');

    if (!clientRole) {
      console.error('❌ Client role not found');
      return;
    }

    if (!startupFounderCategory) {
      console.error('❌ Startup--founder category not found');
      return;
    }

    console.log(`\n✅ Found client role: ${clientRole.name} (ID: ${clientRole.id})`);
    console.log(`✅ Found startup-founder category: ${startupFounderCategory.name} (ID: ${startupFounderCategory.id})`);

    // Simulate inserting user_roles (this is what happens when role is selected)
    console.log('\n💾 Simulating role selection in user_roles...');
    
    const { data: insertUserRole, error: insertUserRoleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: testUserId,
        role_id: clientRole.id,
        category_id: startupFounderCategory.id,
        specialization: null,
        experience_level_id: null
      }, {
        onConflict: 'user_id,role_id'
      })
      .select();

    if (insertUserRoleError) {
      console.error('❌ Error inserting user_roles:', insertUserRoleError);
    } else {
      console.log('✅ Successfully inserted/updated user_roles:', insertUserRole);
    }

    // Simulate creating client profile (this should happen automatically)
    console.log('\n🏢 Simulating client profile creation...');
    
    const { data: insertClientProfile, error: insertClientProfileError } = await supabase
      .from('client_profiles')
      .insert({
        user_id: testUserId,
        company_name: 'Test Startup'
      })
      .select();

    if (insertClientProfileError) {
      console.error('❌ Error inserting client_profile:', insertClientProfileError);
    } else {
      console.log('✅ Successfully inserted client_profile:', insertClientProfile);
    }

    // Simulate creating onboarding progress
    console.log('\n📈 Simulating onboarding progress creation...');
    
    const { data: insertOnboarding, error: insertOnboardingError } = await supabase
      .from('user_onboarding_progress')
      .insert({
        user_id: testUserId,
        onboarding_flow: 'client',
        current_step: 1,
        total_steps: 4,
        completed_steps: []
      })
      .select();

    if (insertOnboardingError) {
      console.error('❌ Error inserting onboarding progress:', insertOnboardingError);
    } else {
      console.log('✅ Successfully inserted/updated onboarding progress:', insertOnboarding);

      // Verify the data was inserted
      console.log('\n🔍 Verifying data insertion...');
      
      const { data: verifyUserRoles } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', testUserId);

      const { data: verifyClientProfiles } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('user_id', testUserId);

      const { data: verifyOnboarding } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .eq('user_id', testUserId);

      console.log('\n📊 Final verification:');
      console.log('👥 User Roles:', verifyUserRoles);
      console.log('🏢 Client Profiles:', verifyClientProfiles);
      console.log('📈 Onboarding Progress:', verifyOnboarding);

      if (verifyUserRoles && verifyUserRoles.length > 0) {
        console.log('✅ user_roles: Data inserted successfully');
      } else {
        console.log('❌ user_roles: No data found');
      }

      if (verifyClientProfiles && verifyClientProfiles.length > 0) {
        console.log('✅ client_profiles: Data inserted successfully');
      } else {
        console.log('❌ client_profiles: No data found');
      }

      if (verifyOnboarding && verifyOnboarding.length > 0) {
        console.log('✅ user_onboarding_progress: Data inserted successfully');
      } else {
        console.log('❌ user_onboarding_progress: No data found');
      }
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testClientOnboarding();
