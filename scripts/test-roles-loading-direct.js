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

async function testRolesLoading() {
  try {
    console.log('🧪 Testing roles loading directly...\n');

    // 1. Test direct access to roles table
    console.log('1. Testing direct access to roles table:');
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('*')
      .order('name');

    if (rolesError) {
      console.log('   ❌ Error fetching roles:', rolesError.message);
      console.log('   Error code:', rolesError.code);
    } else {
      console.log('   ✅ Roles fetched successfully:', roles?.length || 0);
      roles?.forEach((role, index) => {
        console.log(`      ${index + 1}. ${role.name} (ID: ${role.id.substring(0, 8)}...)`);
      });
    }

    // 2. Test role categories
    console.log('\n2. Testing role categories:');
    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .select('*')
      .limit(5);

    if (categoriesError) {
      console.log('   ❌ Error fetching categories:', categoriesError.message);
    } else {
      console.log('   ✅ Categories fetched successfully:', categories?.length || 0);
      categories?.forEach((cat, index) => {
        console.log(`      ${index + 1}. ${cat.name} (Role ID: ${cat.role_id.substring(0, 8)}...)`);
      });
    }

    // 3. Test experience levels
    console.log('\n3. Testing experience levels:');
    const { data: levels, error: levelsError } = await supabase
      .from('experience_levels')
      .select('*')
      .limit(5);

    if (levelsError) {
      console.log('   ❌ Error fetching experience levels:', levelsError.message);
    } else {
      console.log('   ✅ Experience levels fetched successfully:', levels?.length || 0);
      levels?.forEach((level, index) => {
        console.log(`      ${index + 1}. ${level.name}`);
      });
    }

    // 4. Test if there are any permission issues
    console.log('\n4. Testing permissions:');
    const { data: testSelect, error: testError } = await supabase
      .from('roles')
      .select('id')
      .limit(1);

    if (testError) {
      console.log('   ❌ Permission test failed:', testError.message);
      console.log('   This suggests a permissions/RLS issue');
    } else {
      console.log('   ✅ Permission test passed - can access roles table');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testRolesLoading();
