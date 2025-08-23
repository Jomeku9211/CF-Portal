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

async function testRolesTable() {
  console.log('🔍 Testing roles table access...');
  
  try {
    // 1. Test basic roles table access
    console.log('1️⃣ Testing roles table:');
    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .select('*');
    
    if (rolesError) {
      console.log('❌ Roles table error:', rolesError.message);
      console.log('🔧 This suggests the table might not exist or has permission issues');
    } else {
      console.log('✅ Roles table accessible');
      console.log('📊 Found', rolesData?.length || 0, 'roles');
      if (rolesData && rolesData.length > 0) {
        rolesData.forEach((role, index) => {
          console.log(`   ${index + 1}. ${role.name}: ${role.description}`);
        });
      }
    }
    
    // 2. Test role_categories table
    console.log('\n2️⃣ Testing role_categories table:');
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('role_categories')
      .select('*');
    
    if (categoriesError) {
      console.log('❌ Role categories error:', categoriesError.message);
    } else {
      console.log('✅ Role categories table accessible');
      console.log('📊 Found', categoriesData?.length || 0, 'categories');
    }
    
    // 3. Test experience_levels table
    console.log('\n3️⃣ Testing experience_levels table:');
    const { data: levelsData, error: levelsError } = await supabase
      .from('experience_levels')
      .select('*');
    
    if (levelsError) {
      console.log('❌ Experience levels error:', levelsError.message);
    } else {
      console.log('✅ Experience levels table accessible');
      console.log('📊 Found', levelsData?.length || 0, 'levels');
    }
    
    // 4. Summary
    console.log('\n📋 Summary:');
    if (rolesError) {
      console.log('❌ Roles table has issues - this is why UI shows "Loading roles..."');
      console.log('🔧 Need to check if table exists and has proper permissions');
    } else {
      console.log('✅ Roles table is working - UI should be able to load roles');
      console.log('🔧 If UI still shows "Loading roles...", check the frontend code');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Roles Table Test...\n');
  
  await testRolesTable();
  
  console.log('\n🎉 Roles Table Test Complete!');
}

main().catch(console.error);
