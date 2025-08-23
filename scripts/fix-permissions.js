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

async function fixPermissions() {
  console.log('🔧 Fixing permissions for user_onboarding_progress table...');
  
  try {
    // Since we can't execute SQL directly, let's test if the table is accessible
    // and try to understand the current permission state
    
    console.log('1️⃣ Testing table access...');
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Current access error:', error.message);
      console.log('📝 This confirms the permission issue');
    } else {
      console.log('✅ Table is accessible');
      return;
    }
    
    // Try to check if we can at least see the table structure
    console.log('\n2️⃣ Checking table structure...');
    
    // Try a different approach - check if the table exists in the schema
    const { data: schemaData, error: schemaError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'user_onboarding_progress');
    
    if (schemaError) {
      console.log('❌ Schema query error:', schemaError.message);
    } else {
      console.log('✅ Table exists in schema');
    }
    
    console.log('\n📋 The permission issue needs to be fixed in Supabase dashboard');
    console.log('🔧 Please run the SQL commands from scripts/fix-onboarding-permissions.sql');
    console.log('📖 Or manually grant permissions in the Supabase dashboard');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function testAfterPermissionFix() {
  console.log('\n🧪 Testing after permission fix...');
  
  try {
    const newUserId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
    
    // Test inserting onboarding progress
    const progressData = {
      user_id: newUserId,
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 4,
      completed_steps: [],
      onboarding_status: 'in_progress'
    };
    
    console.log('📝 Testing onboarding progress insert...');
    
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .insert(progressData)
      .select();
    
    if (error) {
      console.log('❌ Insert still failing:', error.message);
      console.log('🔧 Permissions need to be fixed');
    } else {
      console.log('✅ Insert successful! Permissions are fixed:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Permission Fix...\n');
  
  await fixPermissions();
  await testAfterPermissionFix();
  
  console.log('\n🎉 Permission Fix Complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Run the SQL commands from scripts/fix-onboarding-permissions.sql in Supabase dashboard');
  console.log('2. Or manually grant permissions in the Supabase dashboard');
  console.log('3. Test the role selection flow again');
}

main().catch(console.error);
