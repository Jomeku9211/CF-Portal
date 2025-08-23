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

async function testInsertUserRole() {
  console.log('🧪 Testing user_roles table insert...');
  
  const testData = {
    user_id: '7a0e2ef8-8036-4b60-bca8-ba1844de608a',
    role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
    category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78'
  };
  
  try {
    console.log('📝 Attempting to insert:', testData);
    
    const { data, error } = await supabase
      .from('user_roles')
      .insert(testData)
      .select();
    
    if (error) {
      console.log('❌ Insert failed:', error);
      
      // Try to get table info
      const { data: tableInfo, error: tableError } = await supabase
        .from('user_roles')
        .select('*')
        .limit(0);
      
      if (tableError) {
        console.log('❌ Table info error:', tableError);
      } else {
        console.log('📋 Table structure available');
      }
      
    } else {
      console.log('✅ Insert successful:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function testInsertOnboardingProgress() {
  console.log('\n🧪 Testing user_onboarding_progress table insert...');
  
  const testData = {
    user_id: '7a0e2ef8-8036-4b60-bca8-ba1844de608a',
    role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
    category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
    current_step: 1,
    total_steps: 4,
    completed_steps: 0,
    onboarding_status: 'in_progress'
  };
  
  try {
    console.log('📝 Attempting to insert:', testData);
    
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
  console.log('🚀 Starting Insert Tests...\n');
  
  await testInsertUserRole();
  await testInsertOnboardingProgress();
  
  console.log('\n🎉 Insert Tests Complete!');
}

main().catch(console.error);
