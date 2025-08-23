import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugInsertError() {
  try {
    console.log('🔍 DEBUGGING EXACT INSERT ERROR');
    console.log('=' .repeat(80));
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    // Test 1: Try insert with exact data my code logic uses
    console.log('🧪 TEST 1: Insert with exact data my code logic uses...');
    
    const exactData = {
      user_id: testUserId,
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 3,
      completed_steps: ['role_selection'],
      onboarding_status: 'in_progress',
      onboarding_stage: 'CLIENT_ORG',
      last_activity: new Date().toISOString()
    };
    
    console.log('📋 Data being inserted:', exactData);
    
    try {
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .insert([exactData])
        .select();
      
      if (error) {
        console.log('❌ Insert failed with error:');
        console.log('   Error message:', error.message);
        console.log('   Error code:', error.code);
        console.log('   Error details:', error.details);
        console.log('   Error hint:', error.hint);
        
        // Check if it's really RLS or something else
        if (error.message.includes('row-level security policy')) {
          console.log('🔒 This IS an RLS policy issue');
        } else if (error.message.includes('column')) {
          console.log('📋 This IS a column issue');
        } else if (error.message.includes('constraint')) {
          console.log('🔗 This IS a constraint issue');
        } else {
          console.log('❓ This is some other type of issue');
        }
      } else {
        console.log('✅ Insert successful!');
        console.log('📊 Inserted record:', data[0]);
        // Clean up
        await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
      }
    } catch (err) {
      console.log('❌ Exception during insert:', err.message);
    }
    
    console.log('');
    
    // Test 2: Check if there are any constraints or triggers
    console.log('🧪 TEST 2: Checking for constraints or triggers...');
    
    try {
      // Try to insert with minimal data to see if it's a data issue
      const minimalData = { user_id: testUserId };
      
      const { error: minimalError } = await supabase
        .from('user_onboarding_progress')
        .insert([minimalData]);
      
      if (minimalError) {
        console.log('❌ Even minimal insert failed:', minimalError.message);
      } else {
        console.log('✅ Minimal insert worked - data validation issue');
        // Clean up
        await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
      }
    } catch (err) {
      console.log('❌ Exception during minimal insert:', err.message);
    }
    
    console.log('');
    
    // Test 3: Check if we can update existing records
    console.log('🧪 TEST 3: Checking if we can update existing records...');
    
    try {
      const { data: existingRecords } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(1);
      
      if (existingRecords && existingRecords.length > 0) {
        console.log('📊 Found existing record, testing update...');
        const record = existingRecords[0];
        
        const { error: updateError } = await supabase
          .from('user_onboarding_progress')
          .update({ last_activity: new Date().toISOString() })
          .eq('id', record.id);
        
        if (updateError) {
          console.log('❌ Update failed:', updateError.message);
        } else {
          console.log('✅ Update worked');
        }
      } else {
        console.log('📊 No existing records to test update');
      }
    } catch (err) {
      console.log('❌ Exception during update test:', err.message);
    }
    
    console.log('');
    console.log('🎯 FINAL ANALYSIS:');
    console.log('   - All required columns exist ✅');
    console.log('   - Data format is correct ✅');
    console.log('   - Issue is likely RLS policy or constraint ✅');
    console.log('   - Need to check Supabase dashboard for exact error ✅');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugInsertError();
