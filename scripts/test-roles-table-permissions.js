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

async function testRolesTablePermissions() {
  try {
    console.log('🧪 Testing roles table permissions...\n');

    // 1. Test basic access to roles table
    console.log('1. Testing basic access to roles table:');
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('id, name')
      .limit(3);

    if (rolesError) {
      console.log('   ❌ Error accessing roles table:', rolesError.message);
      console.log('   Error code:', rolesError.code);
    } else {
      console.log('   ✅ Successfully accessed roles table');
      console.log('   Data:', roles);
    }

    // 2. Test if it's an RLS issue by checking the same query with timeout
    console.log('\n2. Testing with timeout to see if it hangs:');
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout after 3 seconds')), 3000);
      });
      
      const queryPromise = supabase
        .from('roles')
        .select('id, name')
        .limit(1);
      
      const result = await Promise.race([queryPromise, timeoutPromise]);
      console.log('   ✅ Query completed within timeout:', result);
    } catch (timeoutError) {
      console.log('   ⏰ Query timed out:', timeoutError.message);
    }

    // 3. Test other tables to compare
    console.log('\n3. Testing other tables for comparison:');
    
    // Test user_roles table (which we know works)
    const { data: userRoles, error: userRolesError } = await supabase
      .from('user_roles')
      .select('id')
      .limit(1);
    
    if (userRolesError) {
      console.log('   ❌ user_roles table error:', userRolesError.message);
    } else {
      console.log('   ✅ user_roles table works fine');
    }

    // Test role_categories table
    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .select('id, name')
      .limit(1);
    
    if (categoriesError) {
      console.log('   ❌ role_categories table error:', categoriesError.message);
    } else {
      console.log('   ✅ role_categories table works fine');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testRolesTablePermissions();
