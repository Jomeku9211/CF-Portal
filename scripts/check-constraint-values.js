import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConstraintValues() {
  try {
    console.log('🔍 CHECKING WHAT onboarding_stage VALUES ARE ALLOWED');
    console.log('=' .repeat(80));
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    // Test different stage values to see what's allowed
    const stageValues = [
      'CLIENT_ORG',
      'client_org',
      'organization',
      'organization_onboarding',
      'role_selection',
      'profile_setup',
      'DEV_STEP_1',
      'dev_step_1'
    ];
    
    console.log('🧪 Testing different onboarding_stage values...');
    
    for (const stage of stageValues) {
      try {
        console.log(`   Testing: '${stage}'`);
        
        const testData = {
          user_id: testUserId,
          role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
          category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
          onboarding_flow: 'client',
          current_step: 1,
          total_steps: 3,
          completed_steps: ['role_selection'],
          onboarding_status: 'in_progress',
          onboarding_stage: stage,
          last_activity: new Date().toISOString()
        };
        
        const { data, error } = await supabase
          .from('user_onboarding_progress')
          .insert([testData])
          .select();
        
        if (error) {
          if (error.message.includes('check constraint')) {
            console.log(`      ❌ '${stage}': NOT ALLOWED (check constraint)`);
          } else {
            console.log(`      ❌ '${stage}': Failed for other reason: ${error.message}`);
          }
        } else {
          console.log(`      ✅ '${stage}': ALLOWED - SUCCESS!`);
          console.log(`      📊 Record created:`, data[0]);
          
          // Clean up and return - we found a working value
          await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
          
          console.log('');
          console.log('🎯 SOLUTION FOUND:');
          console.log(`   Use onboarding_stage = '${stage}' instead of 'CLIENT_ORG'`);
          console.log('   This value is allowed by the check constraint');
          
          return stage; // Return the working value
        }
      } catch (err) {
        console.log(`      ❌ '${stage}': Exception: ${err.message}`);
      }
    }
    
    // Test developer onboarding stages
    console.log('🧪 Testing developer onboarding stages...');
    const developerStages = [
      'DEV_STEP_1',
      'dev_step_1', 
      'developer_step_1',
      'developer_onboarding',
      'dev_onboarding',
      'step_1',
      'developer'
    ];
    
    for (const stage of developerStages) {
      console.log(`   Testing: '${stage}'`);
      
      const testData = {
        user_id: testUserId,
        role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
        category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
        onboarding_flow: 'developer',
        current_step: 1,
        total_steps: 5,
        completed_steps: ['role_selection'],
        onboarding_status: 'in_progress',
        onboarding_stage: stage,
        last_activity: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .insert([testData])
        .select();
      
      if (error) {
        console.log(`      ❌ '${stage}': NOT ALLOWED (${error.message})`);
      } else {
        console.log(`      ✅ '${stage}': ALLOWED - SUCCESS!`);
        console.log(`      📊 Record created:`, data[0]);
        
        // Clean up this test record
        await supabase
          .from('user_onboarding_progress')
          .delete()
          .eq('id', data[0].id);
        
        break; // Found a working value
      }
    }
    
    console.log('');
    console.log('❌ None of the tested values worked!');
    console.log('🔧 Need to check the actual constraint definition in Supabase');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkConstraintValues();
