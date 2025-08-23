// Test script to insert data into user_onboarding_progress table
// This will help us verify if the database permissions are working

const { createClient } = require('@supabase/supabase-js');

// Your Supabase credentials
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'your-anon-key-here'; // You'll need to provide this

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseInsert() {
  try {
    console.log('🧪 Testing database insertion...');
    
    // Test data
    const testData = {
      user_id: 'd48cb410-48be-4825-bec6-38d51dab0153',
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      experience_level_id: null,
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 4,
      completed_steps: ['role_selection'],
      onboarding_status: 'in_progress',
      last_activity: new Date().toISOString(),
      flow_metadata: { test: true }
    };
    
    console.log('📤 Attempting to insert:', testData);
    
    // Try to insert
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .insert([testData])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Insert failed:', error);
    } else {
      console.log('✅ Insert successful:', data);
    }
    
  } catch (err) {
    console.error('💥 Error:', err);
  }
}

// Run the test
testDatabaseInsert();
