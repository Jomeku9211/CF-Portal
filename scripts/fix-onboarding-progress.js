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

async function fixOnboardingProgressTable() {
  console.log('🔧 Fixing user_onboarding_progress table...');
  
  try {
    // Try to insert with the missing onboarding_flow column
    const testData = {
      user_id: '1f5dcb5f-a587-4eb0-8686-b8052708c23b',
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      onboarding_flow: 'client', // Add the missing column
      current_step: 1,
      total_steps: 4,
      completed_steps: [], // JSON array as expected
      onboarding_status: 'in_progress'
    };
    
    console.log('📝 Attempting to insert with onboarding_flow:', testData);
    
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

async function testClientProfileCreation() {
  console.log('\n🔧 Testing client profile creation...');
  
  try {
    const testData = {
      user_id: '1f5dcb5f-a587-4eb0-8686-b8052708c23b',
      first_name: 'Test',
      last_name: 'User',
      is_public: false,
      profile_completeness: 0
    };
    
    console.log('📝 Attempting to create client profile:', testData);
    
    const { data, error } = await supabase
      .from('client_profiles')
      .insert(testData)
      .select();
    
    if (error) {
      console.log('❌ Client profile creation failed:', error);
    } else {
      console.log('✅ Client profile created:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Onboarding Progress Fixes...\n');
  
  await fixOnboardingProgressTable();
  await testClientProfileCreation();
  
  console.log('\n🎉 Onboarding Progress Fixes Complete!');
}

main().catch(console.error);
