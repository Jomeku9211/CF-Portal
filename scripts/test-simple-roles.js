import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSimpleRolesLoading() {
  console.log('🔍 Testing simple roles loading (without database setup)...');
  
  try {
    // 1. Test direct roles table access
    console.log('1️⃣ Testing direct roles table access:');
    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .select('*')
      .order('name');
    
    if (rolesError) {
      console.log('❌ Roles table error:', rolesError.message);
    } else {
      console.log('✅ Roles table accessible');
      console.log('📊 Found', rolesData?.length || 0, 'roles');
      if (rolesData && rolesData.length > 0) {
        rolesData.forEach((role, index) => {
          console.log(`   ${index + 1}. ${role.name}: ${role.description}`);
        });
      }
    }
    
    // 2. Test role_categories table access
    console.log('\n2️⃣ Testing role_categories table access:');
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('role_categories')
      .select('*')
      .limit(5);
    
    if (categoriesError) {
      console.log('❌ Role categories error:', categoriesError.message);
    } else {
      console.log('✅ Role categories table accessible');
      console.log('📊 Found', categoriesData?.length || 0, 'categories');
    }
    
    // 3. Test experience_levels table access
    console.log('\n3️⃣ Testing experience_levels table access:');
    const { data: levelsData, error: levelsError } = await supabase
      .from('experience_levels')
      .select('*')
      .limit(5);
    
    if (levelsError) {
      console.log('❌ Experience levels error:', levelsError.message);
    } else {
      console.log('✅ Experience levels table accessible');
      console.log('📊 Found', levelsData?.length || 0, 'levels');
    }
    
    // 4. Summary
    console.log('\n📋 Summary:');
    if (rolesError || categoriesError || levelsError) {
      console.log('❌ Some tables have access issues');
      if (rolesError) console.log('   - Roles table:', rolesError.message);
      if (categoriesError) console.log('   - Categories table:', categoriesError.message);
      if (levelsError) console.log('   - Experience levels table:', levelsError.message);
    } else {
      console.log('✅ All required tables are accessible');
      console.log('🔧 The UI should now be able to load roles without getting stuck');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Simple Roles Loading Test...\n');
  
  await testSimpleRolesLoading();
  
  console.log('\n🎉 Simple Roles Loading Test Complete!');
}

main().catch(console.error);
