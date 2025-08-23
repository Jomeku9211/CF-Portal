import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkActualTableStructure() {
  try {
    console.log('🔍 CHECKING ACTUAL TABLE STRUCTURE vs CODE LOGIC');
    console.log('=' .repeat(80));
    
    // STEP 1: Check what columns actually exist
    console.log('📋 STEP 1: Checking actual table structure...');
    
    try {
      // Try to get column info by selecting with limit 0
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(0);
      
      if (error) {
        console.log('❌ Cannot access table structure:', error.message);
      } else {
        console.log('✅ Table structure accessible');
        
        // Try to get one record to see actual columns
        const { data: sampleData } = await supabase
          .from('user_onboarding_progress')
          .select('*')
          .limit(1);
        
        if (sampleData && sampleData.length > 0) {
          console.log('📊 ACTUAL COLUMNS IN TABLE:');
          const actualColumns = Object.keys(sampleData[0]);
          actualColumns.forEach((col, index) => {
            console.log(`   ${index + 1}. ${col}`);
          });
        } else {
          console.log('📊 Table is empty, checking by attempting different inserts...');
          
          // Test different column combinations to find what exists
          const testColumns = [
            'user_id',
            'onboarding_stage',
            'onboarding_flow',
            'current_step',
            'total_steps',
            'completed_steps',
            'onboarding_status',
            'last_activity',
            'flow_metadata',
            'status',
            'stage',
            'flow'
          ];
          
          console.log('🧪 Testing which columns exist...');
          
          for (const column of testColumns) {
            try {
              const testData = { user_id: 'test-id', [column]: 'test-value' };
              const { error: testError } = await supabase
                .from('user_onboarding_progress')
                .insert([testData]);
              
              if (testError) {
                if (testError.message.includes('column') || testError.message.includes('does not exist')) {
                  console.log(`   ❌ ${column}: DOES NOT EXIST`);
                } else {
                  console.log(`   ✅ ${column}: EXISTS (but insert failed for other reason)`);
                }
              } else {
                console.log(`   ✅ ${column}: EXISTS and working`);
                // Clean up
                await supabase.from('user_onboarding_progress').delete().eq('user_id', 'test-id');
              }
            } catch (err) {
              console.log(`   ❌ ${column}: Error testing`);
            }
          }
        }
      }
    } catch (err) {
      console.log('❌ Exception during structure check:', err.message);
    }
    
    console.log('');
    
    // STEP 2: Check what my code logic is trying to use
    console.log('📋 STEP 2: What my code logic is trying to use...');
    
    const codeLogicColumns = [
      'user_id',
      'onboarding_flow',
      'current_step', 
      'total_steps',
      'completed_steps',
      'onboarding_status',
      'onboarding_stage',
      'last_activity'
    ];
    
    console.log('🔧 COLUMNS MY CODE LOGIC NEEDS:');
    codeLogicColumns.forEach((col, index) => {
      console.log(`   ${index + 1}. ${col}`);
    });
    
    console.log('');
    
    // STEP 3: Check what the OFFICIAL document requires
    console.log('📋 STEP 3: What OFFICIAL document requires...');
    
    const officialDocumentColumns = [
      'user_id',
      'stage' // This might be different from 'onboarding_stage'
    ];
    
    console.log('📄 COLUMNS OFFICIAL DOCUMENT REQUIRES:');
    officialDocumentColumns.forEach((col, index) => {
      console.log(`   ${index + 1}. ${col}`);
    });
    
    console.log('');
    console.log('🎯 ANALYSIS:');
    console.log('   - Need to find what columns actually exist');
    console.log('   - Compare with what my code logic needs');
    console.log('   - Update code logic to use correct column names');
    console.log('   - This is NOT an RLS issue - it\'s a column mismatch issue');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkActualTableStructure();
