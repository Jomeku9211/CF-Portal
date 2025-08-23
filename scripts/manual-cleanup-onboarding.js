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

async function checkCurrentTable() {
  console.log('🔍 Checking current user_onboarding_progress table...');
  
  try {
    // Try to get table info
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error accessing table:', error);
      return false;
    }
    
    console.log('✅ Table accessible');
    if (data && data.length > 0) {
      console.log('📋 Sample record columns:', Object.keys(data[0]));
    } else {
      console.log('📋 Table is empty');
    }
    
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

async function cleanupTable() {
  console.log('\n🧹 Cleaning up user_onboarding_progress table...');
  
  try {
    // Since we can't drop and recreate the table directly, 
    // let's check what columns exist and work with the current structure
    
    // First, let's try to insert a test record to see what columns are expected
    const testData = {
      user_id: 'd10a4429-884c-400c-89c8-2cacaddcb9c7', // Use the new user ID
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 4,
      completed_steps: [],
      onboarding_status: 'in_progress'
    };
    
    console.log('📝 Testing insert with new user ID:', testData);
    
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .insert(testData)
      .select();
    
    if (error) {
      console.log('❌ Insert failed:', error);
      
      // If insert fails, let's check what columns are actually in the table
      console.log('\n🔍 Checking table structure...');
      
      // Try to get a record to see the structure
      const { data: existingData, error: selectError } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(1);
      
      if (selectError) {
        console.log('❌ Error selecting from table:', selectError);
      } else if (existingData && existingData.length > 0) {
        console.log('📋 Current table columns:', Object.keys(existingData[0]));
        console.log('📋 Sample data:', existingData[0]);
      } else {
        console.log('📋 Table is empty');
      }
      
    } else {
      console.log('✅ Insert successful:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function testWithNewUser() {
  console.log('\n🧪 Testing with the new user ID...');
  
  try {
    // Test inserting with the new user ID from your signup
    const testData = {
      user_id: 'd10a4429-884c-400c-89c8-2cacaddcb9c7',
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 4,
      completed_steps: [],
      onboarding_status: 'in_progress'
    };
    
    console.log('📝 Testing insert with new user:', testData);
    
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .insert(testData)
      .select();
    
    if (error) {
      console.log('❌ Insert failed:', error);
    } else {
      console.log('✅ Insert successful:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Manual Onboarding Progress Cleanup...\n');
  
  const tableExists = await checkCurrentTable();
  
  if (tableExists) {
    await cleanupTable();
    await testWithNewUser();
  }
  
  console.log('\n🎉 Manual Cleanup Complete!');
}

main().catch(console.error);
