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

async function checkUserRoleSimple() {
  try {
    console.log('🔍 Checking user roles from user_roles table...\n');

    // 1. Check all user_roles to see what's in the table
    console.log('1. All user roles in the system:');
    const { data: allUserRoles, error: allRolesError } = await supabase
      .from('user_roles')
      .select(`
        user_id,
        role_id,
        category_id,
        roles(name),
        role_categories(name)
      `)
      .limit(10);

    if (allRolesError) {
      console.log('   ❌ Error fetching all user roles:', allRolesError.message);
    } else {
      console.log('   ✅ Found user roles:');
      allUserRoles?.forEach((role, index) => {
        console.log(`      ${index + 1}. User ${role.user_id.substring(0, 8)}...`);
        console.log(`         Role: ${role.roles?.name || 'Unknown'}`);
        console.log(`         Category: ${role.role_categories?.name || 'Unknown'}`);
      });
    }

    // 2. Check if there are any users with 'dheeraj@coderfarm.in' pattern
    console.log('\n2. Looking for users with similar email pattern...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email')
      .like('email', '%dheeraj%')
      .limit(5);

    if (usersError) {
      console.log('   ❌ Error fetching users:', usersError.message);
    } else if (users && users.length > 0) {
      console.log('   ✅ Found users:');
      users.forEach((user, index) => {
        console.log(`      ${index + 1}. ${user.email} (ID: ${user.id.substring(0, 8)}...)`);
      });
    } else {
      console.log('   ❌ No users found with that email pattern');
    }

    // 3. Check the roles table to see what roles exist
    console.log('\n3. Available roles in the system:');
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('id, name')
      .order('name');

    if (rolesError) {
      console.log('   ❌ Error fetching roles:', rolesError.message);
    } else {
      console.log('   ✅ Available roles:');
      roles?.forEach((role, index) => {
        console.log(`      ${index + 1}. ${role.name} (ID: ${role.id.substring(0, 8)}...)`);
      });
    }

    // 4. Check role categories
    console.log('\n4. Available role categories:');
    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .select('id, name')
      .order('name');

    if (categoriesError) {
      console.log('   ❌ Error fetching categories:', categoriesError.message);
    } else {
      console.log('   ✅ Available categories:');
      categories?.forEach((category, index) => {
        console.log(`      ${index + 1}. ${category.name} (ID: ${category.id.substring(0, 8)}...)`);
      });
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkUserRoleSimple();
