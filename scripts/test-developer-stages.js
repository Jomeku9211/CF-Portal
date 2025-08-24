import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testDeveloperStages() {
  console.log('🧪 Testing developer onboarding stage values...');
  
  const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
  const testRoleId = '2432c7cb-e41f-4af9-8014-c080cd9862c5'; // From previous test
  const testCategoryId = 'e1ca2ec0-4857-4e50-8ec6-8fd004f4c750'; // From previous test
  
  const developerStages = [
    'organization_onboarding', // Try the one that worked for client
    'DEV_STEP_1',
    'dev_step_1', 
    'developer_step_1',
    'developer_onboarding',
    'dev_onboarding',
    'step_1',
    'developer',
    'developer_step1',
    'dev_step1',
    'service_provider_onboarding',
    'service_provider_step_1',
    'service_provider_step1',
    'provider_onboarding',
    'provider_step_1',
    'freelancer_onboarding',
    'freelancer_step_1',
    'contractor_onboarding',
    'contractor_step_1'
  ];
  
  for (const stage of developerStages) {
    console.log(`   Testing: '${stage}'`);
    
    const testData = {
      user_id: testUserId,
      role_id: testRoleId,
      category_id: testCategoryId,
      onboarding_flow: 'developer',
      current_step: 1,
      total_steps: 5,
      completed_steps: ['role_selection'],
      onboarding_status: 'in_progress',
      onboarding_stage: stage,
      last_activity: new Date().toISOString()
    };
    
    try {
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
        
        console.log(`🎯 SOLUTION FOUND: Use '${stage}' for developer onboarding`);
        return stage; // Found a working value
      }
    } catch (err) {
      console.log(`      ❌ '${stage}': Exception: ${err.message}`);
    }
  }
  
  console.log('');
  console.log('❌ None of the tested developer stage values worked!');
  console.log('🔧 Need to check the actual constraint definition in Supabase');
}

testDeveloperStages();
