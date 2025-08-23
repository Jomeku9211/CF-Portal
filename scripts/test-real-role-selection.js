// Real integration test for role selection → database insertion flow
// This tests the actual Supabase database connection

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test configuration - using real data from your database
const TEST_USER_ID = '5e3f4957-e33a-4269-b9ab-c3ba31e50061'; // Your test user ID
const TEST_ROLE_ID = '38b72eef-833c-496e-b493-4455e0e7a670'; // service-provider role
const TEST_CATEGORY_ID = 'e1ca2ec0-4857-4e50-8ec6-8fd004f4c750'; // Your category ID
const TEST_EXPERIENCE_LEVEL_ID = '73c56679-b260-4425-b916-737682da9365'; // Your experience level ID

// Test the real role selection flow
async function testRealRoleSelectionFlow() {
  console.log('🧪 Starting Real Role Selection Flow Test...\n');
  console.log('🔗 Connecting to Supabase:', supabaseUrl);

  try {
    // Step 1: Check existing data
    console.log('1️⃣ Checking existing data in database...');
    
    const { data: existingUserRole, error: userRoleError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', TEST_USER_ID)
      .single();

    if (userRoleError && userRoleError.code !== 'PGRST116') {
      console.error('❌ Error checking existing user role:', userRoleError);
    } else if (existingUserRole) {
      console.log('   📋 Found existing user role:', {
        id: existingUserRole.id,
        role_id: existingUserRole.role_id,
        category_id: existingUserRole.category_id,
        experience_level_id: existingUserRole.experience_level_id
      });
    } else {
      console.log('   ℹ️ No existing user role found');
    }

    // Step 2: Check onboarding progress
    const { data: existingProgress, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', TEST_USER_ID)
      .single();

    if (progressError && progressError.code !== 'PGRST116') {
      console.error('❌ Error checking existing progress:', progressError);
    } else if (existingProgress) {
      console.log('   📋 Found existing onboarding progress:', {
        current_step: existingProgress.current_step,
        onboarding_flow: existingProgress.onboarding_flow,
        onboarding_status: existingProgress.onboarding_status
      });
    } else {
      console.log('   ℹ️ No existing onboarding progress found');
    }

    // Step 3: Check service provider profile
    const { data: existingProfile, error: profileError } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .eq('user_id', TEST_USER_ID)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('❌ Error checking existing profile:', profileError);
    } else if (existingProfile) {
      console.log('   📋 Found existing service provider profile:', {
        id: existingProfile.id,
        role_id: existingProfile.role_id,
        category_id: existingProfile.category_id
      });
    } else {
      console.log('   ℹ️ No existing service provider profile found');
    }

    // Step 4: Verify database schema
    console.log('\n2️⃣ Verifying database schema...');
    
    const tables = ['user_roles', 'user_onboarding_progress', 'service_provider_profiles'];
    for (const table of tables) {
      try {
        const { data: columns, error: schemaError } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (schemaError) {
          console.log(`   ❌ Error accessing ${table}:`, schemaError.message);
        } else {
          console.log(`   ✅ ${table} table accessible`);
        }
      } catch (error) {
        console.log(`   ❌ ${table} table error:`, error.message);
      }
    }

    // Step 5: Test data insertion (if no existing data)
    console.log('\n3️⃣ Testing data insertion...');
    
    if (!existingUserRole) {
      console.log('   🔄 Inserting test user role...');
      const roleData = {
        user_id: TEST_USER_ID,
        role_id: TEST_ROLE_ID,
        category_id: TEST_CATEGORY_ID,
        specialization: 'frontend-development',
        experience_level_id: TEST_EXPERIENCE_LEVEL_ID
      };

      const { data: newUserRole, error: insertError } = await supabase
        .from('user_roles')
        .insert([roleData])
        .select()
        .single();

      if (insertError) {
        console.error('   ❌ Failed to insert user role:', insertError);
      } else {
        console.log('   ✅ Test user role inserted:', newUserRole.id);
      }
    }

    // Step 6: Check final state
    console.log('\n4️⃣ Checking final database state...');
    
    const { data: finalUserRole } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', TEST_USER_ID)
      .single();

    const { data: finalProgress } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', TEST_USER_ID)
      .single();

    const { data: finalProfile } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .eq('user_id', TEST_USER_ID)
      .single();

    console.log('\n📊 Final Database State:');
    console.log('   • user_roles:', finalUserRole ? '✅ Found' : '❌ Missing');
    console.log('   • user_onboarding_progress:', finalProgress ? '✅ Found' : '❌ Missing');
    console.log('   • service_provider_profiles:', finalProfile ? '✅ Found' : '❌ Missing');

    if (finalUserRole && finalProgress && finalProfile) {
      console.log('\n🎉 All tables have data! Role selection flow is working.');
    } else {
      console.log('\n⚠️ Some tables are missing data. Check the flow implementation.');
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the test
testRealRoleSelectionFlow();


