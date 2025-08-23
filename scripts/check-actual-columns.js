import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkActualColumns() {
  try {
    console.log('🔍 CHECKING ACTUAL COLUMNS IN user_onboarding_progress TABLE');
    console.log('=' .repeat(80));
    
    // Test 1: Try to get column info by attempting different insert combinations
    console.log('📝 TEST 1: Testing different column combinations...');
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    const columnTests = [
      // Test with old column names (flow_metadata)
      {
        user_id: testUserId,
        flow_metadata: { stage: 'CLIENT_ORG' }
      },
      
      // Test with new column names (onboarding_stage)
      {
        user_id: testUserId,
        onboarding_stage: 'CLIENT_ORG'
      },
      
      // Test with minimal columns
      {
        user_id: testUserId
      },
      
      // Test with common timestamp columns
      {
        user_id: testUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      
      // Test with status columns
      {
        user_id: testUserId,
        status: 'in_progress'
      },
      
      // Test with step columns
      {
        user_id: testUserId,
        current_step: 1,
        total_steps: 3
      }
    ];
    
    for (let i = 0; i < columnTests.length; i++) {
      const testData = columnTests[i];
      console.log(`   🧪 Test ${i + 1}:`, Object.keys(testData));
      
      try {
        const { data, error } = await supabase
          .from('user_onboarding_progress')
          .insert([testData])
          .select();
        
        if (error) {
          console.log(`      ❌ Error: ${error.message}`);
          
          // Check if it's a column error
          if (error.message.includes('column') || error.message.includes('does not exist')) {
            console.log(`      🔍 This suggests column names are wrong`);
          }
        } else {
          console.log(`      ✅ Success! Found working columns: ${Object.keys(data[0])}`);
          console.log(`      📊 Full record structure:`, data[0]);
          
          // Clean up
          await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
          console.log(`      🧹 Cleaned up test data`);
          break;
        }
      } catch (err) {
        console.log(`      ❌ Exception: ${err.message}`);
      }
    }
    
    console.log('');
    
    // Test 2: Check if we can select and see what columns exist
    console.log('📝 TEST 2: Checking table structure by selecting...');
    
    try {
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(0); // Just get column info, no data
      
      if (error) {
        console.log('❌ Cannot access table structure:', error.message);
      } else {
        console.log('✅ Table structure accessible');
        // Try to get one record to see columns
        const { data: sampleData } = await supabase
          .from('user_onboarding_progress')
          .select('*')
          .limit(1);
        
        if (sampleData && sampleData.length > 0) {
          console.log('📊 Sample record columns:', Object.keys(sampleData[0]));
        } else {
          console.log('📊 Table is empty, but structure accessible');
        }
      }
    } catch (err) {
      console.log('❌ Exception during structure check:', err.message);
    }
    
    console.log('');
    console.log('🎯 NEXT STEPS:');
    console.log('   - Find the correct column names');
    console.log('   - Update the logic to use new column names');
    console.log('   - Test the complete flow with correct columns');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkActualColumns();
