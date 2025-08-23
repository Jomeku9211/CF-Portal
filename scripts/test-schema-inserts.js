import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSchemaInserts() {
  try {
    console.log('🧪 TESTING SCHEMA INSERTS - FINDING ACTUAL COLUMNS');
    console.log('=' .repeat(80));
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    // Test 1: client_profiles table
    console.log('📝 TEST 1: Testing client_profiles table columns...');
    
    const clientProfileTests = [
      // Test with minimal data
      { user_id: testUserId },
      
      // Test with role_category
      { user_id: testUserId, role_category: 'startup-founder' },
      
      // Test with common fields
      { 
        user_id: testUserId, 
        role_category: 'startup-founder',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      
      // Test with organization_id
      { 
        user_id: testUserId, 
        role_category: 'startup-founder',
        organization_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    for (let i = 0; i < clientProfileTests.length; i++) {
      const testData = clientProfileTests[i];
      console.log(`   🧪 Test ${i + 1}:`, Object.keys(testData));
      
      try {
        const { data, error } = await supabase
          .from('client_profiles')
          .insert([testData])
          .select();
        
        if (error) {
          console.log(`      ❌ Error: ${error.message}`);
        } else {
          console.log(`      ✅ Success! Columns: ${Object.keys(data[0])}`);
          // Clean up
          await supabase.from('client_profiles').delete().eq('user_id', testUserId);
          break;
        }
      } catch (err) {
        console.log(`      ❌ Exception: ${err.message}`);
      }
    }
    
    console.log('');
    
    // Test 2: user_onboarding_progress table
    console.log('📝 TEST 2: Testing user_onboarding_progress table columns...');
    
    const onboardingTests = [
      // Test with minimal data
      { user_id: testUserId },
      
      // Test with stage
      { user_id: testUserId, onboarding_stage: 'CLIENT_ORG' },
      
      // Test with full data as per OFFICIAL document
      { 
        user_id: testUserId,
        onboarding_flow: 'client',
        current_step: 1,
        total_steps: 3,
        completed_steps: ['role_selection'],
        onboarding_status: 'in_progress',
        onboarding_stage: 'CLIENT_ORG',
        last_activity: new Date().toISOString()
      }
    ];
    
    for (let i = 0; i < onboardingTests.length; i++) {
      const testData = onboardingTests[i];
      console.log(`   🧪 Test ${i + 1}:`, Object.keys(testData));
      
      try {
        const { data, error } = await supabase
          .from('user_onboarding_progress')
          .insert([testData])
          .select();
        
        if (error) {
          console.log(`      ❌ Error: ${error.message}`);
        } else {
          console.log(`      ✅ Success! Columns: ${Object.keys(data[0])}`);
          // Clean up
          await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
          break;
        }
      } catch (err) {
        console.log(`      ❌ Exception: ${err.message}`);
      }
    }
    
    console.log('');
    console.log('🎯 SUMMARY:');
    console.log('   - Need to find correct column names for both tables');
    console.log('   - Then implement OFFICIAL FLOW 2.1 exactly');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testSchemaInserts();
