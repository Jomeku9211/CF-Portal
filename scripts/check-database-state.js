// Check the actual state of the database
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

async function checkDatabaseState() {
  console.log('🔍 Checking Database State...\n');
  console.log('🔗 Connecting to Supabase:', supabaseUrl);

  try {
    // Check users table
    console.log('1️⃣ Checking users table...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, created_at')
      .limit(5);

    if (usersError) {
      console.error('   ❌ Error accessing users:', usersError.message);
    } else {
      console.log(`   ✅ Found ${users?.length || 0} users:`);
      users?.forEach(user => {
        console.log(`      • ${user.id} (${user.email}) - ${user.created_at}`);
      });
    }

    // Check user_roles table
    console.log('\n2️⃣ Checking user_roles table...');
    const { data: userRoles, error: userRolesError } = await supabase
      .from('user_roles')
      .select('id, user_id, role_id, category_id, experience_level_id')
      .limit(5);

    if (userRolesError) {
      console.error('   ❌ Error accessing user_roles:', userRolesError.message);
    } else {
      console.log(`   ✅ Found ${userRoles?.length || 0} user roles:`);
      userRoles?.forEach(role => {
        console.log(`      • ${role.id} - User: ${role.user_id}, Role: ${role.role_id}, Category: ${role.category_id}`);
      });
    }

    // Check user_onboarding_progress table
    console.log('\n3️⃣ Checking user_onboarding_progress table...');
    const { data: progress, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('id, user_id, onboarding_flow, current_step, onboarding_status')
      .limit(5);

    if (progressError) {
      console.error('   ❌ Error accessing user_onboarding_progress:', progressError.message);
    } else {
      console.log(`   ✅ Found ${progress?.length || 0} onboarding progress records:`);
      progress?.forEach(p => {
        console.log(`      • ${p.id} - User: ${p.user_id}, Flow: ${p.onboarding_flow}, Step: ${p.current_step}, Status: ${p.onboarding_status}`);
      });
    }

    // Check service_provider_profiles table
    console.log('\n4️⃣ Checking service_provider_profiles table...');
    const { data: profiles, error: profilesError } = await supabase
      .from('service_provider_profiles')
      .select('id, user_id, role_id, category_id')
      .limit(5);

    if (profilesError) {
      console.error('   ❌ Error accessing service_provider_profiles:', profilesError.message);
    } else {
      console.log(`   ✅ Found ${profiles?.length || 0} service provider profiles:`);
      profiles?.forEach(profile => {
        console.log(`      • ${profile.id} - User: ${profile.user_id}, Role: ${profile.role_id}, Category: ${profile.category_id}`);
      });
    }

    // Check roles table
    console.log('\n5️⃣ Checking roles table...');
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('id, name, description')
      .limit(5);

    if (rolesError) {
      console.error('   ❌ Error accessing roles:', rolesError.message);
    } else {
      console.log(`   ✅ Found ${roles?.length || 0} roles:`);
      roles?.forEach(role => {
        console.log(`      • ${role.id} - ${role.name}: ${role.description}`);
      });
    }

    // Check role_categories table
    console.log('\n6️⃣ Checking role_categories table...');
    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .select('id, name, role_id')
      .limit(5);

    if (categoriesError) {
      console.error('   ❌ Error accessing role_categories:', categoriesError.message);
    } else {
      console.log(`   ✅ Found ${roles?.length || 0} role categories:`);
      categories?.forEach(category => {
        console.log(`      • ${category.id} - ${category.name} (Role: ${category.role_id})`);
      });
    }

    // Check experience_levels table
    console.log('\n7️⃣ Checking experience_levels table...');
    const { data: levels, error: levelsError } = await supabase
      .from('experience_levels')
      .select('id, name, years')
      .limit(5);

    if (levelsError) {
      console.error('   ❌ Error accessing experience_levels:', levelsError.message);
    } else {
      console.log(`   ✅ Found ${levels?.length || 0} experience levels:`);
      levels?.forEach(level => {
        console.log(`      • ${level.id} - ${level.name} (${level.years})`);
      });
    }

    console.log('\n📊 Database State Summary:');
    console.log('   • Users:', users?.length || 0);
    console.log('   • User Roles:', userRoles?.length || 0);
    console.log('   • Onboarding Progress:', progress?.length || 0);
    console.log('   • Service Provider Profiles:', profiles?.length || 0);
    console.log('   • Roles:', roles?.length || 0);
    console.log('   • Categories:', categories?.length || 0);
    console.log('   • Experience Levels:', levels?.length || 0);

  } catch (error) {
    console.error('\n❌ Error checking database state:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the check
checkDatabaseState();


