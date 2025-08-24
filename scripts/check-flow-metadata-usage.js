import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkFlowMetadataUsage() {
  console.log('🔍 Checking flow_metadata usage in user_onboarding_progress...');
  
  try {
    // Check current onboarding progress records
    const { data: onboardingRecords, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', '4e28f68c-d6b6-4816-8b10-b3ab451de267');
    
    if (onboardingError) {
      console.log('❌ Cannot access onboarding progress:', onboardingError.message);
      return;
    }
    
    if (onboardingRecords && onboardingRecords.length > 0) {
      console.log('📋 Current onboarding progress records:');
      onboardingRecords.forEach((record, index) => {
        console.log(`   ${index + 1}. Record ID: ${record.id}`);
        console.log(`      - onboarding_flow: ${record.onboarding_flow}`);
        console.log(`      - onboarding_stage: ${record.onboarding_stage}`);
        console.log(`      - current_step: ${record.current_step}`);
        console.log(`      - flow_metadata: ${record.flow_metadata}`);
        console.log(`      - completed_steps: ${record.completed_steps?.length || 0} steps`);
        console.log(`      - status: ${record.onboarding_status}`);
      });
    } else {
      console.log('📋 No onboarding progress records found');
    }
    
    // Check what other tables use flow_metadata
    console.log('\n🔍 Checking flow_metadata usage in other tables...');
    
    // Check organizations table
    const { data: orgRecords, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('client_profile_id', 'd7470f54-c55c-4951-90ee-8a86b81c4b91');
    
    if (orgError) {
      console.log('❌ Cannot access organizations:', orgError.message);
    } else if (orgRecords && orgRecords.length > 0) {
      console.log('📋 Organizations flow_metadata:');
      orgRecords.forEach(org => {
        console.log(`   - ${org.name}: flow_metadata = ${org.flow_metadata}`);
      });
    }
    
    // Check teams table
    const { data: teamRecords, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .eq('organization_id', '91fb5ba2-3c7e-41d3-b422-919e31fc651c');
    
    if (teamError) {
      console.log('❌ Cannot access teams:', teamError.message);
    } else if (teamRecords && teamRecords.length > 0) {
      console.log('📋 Teams flow_metadata:');
      teamRecords.forEach(team => {
        console.log(`   - ${team.name}: flow_metadata = ${team.flow_metadata}`);
      });
    }
    
    // Check job_posts table
    const { data: jobRecords, error: jobError } = await supabase
      .from('job_posts')
      .select('*')
      .eq('organization_id', '91fb5ba2-3c7e-41d3-b422-919e31fc651c');
    
    if (jobError) {
      console.log('❌ Cannot access job_posts:', jobError.message);
    } else if (jobRecords && jobRecords.length > 0) {
      console.log('📋 Job posts flow_metadata:');
      jobRecords.forEach(job => {
        console.log(`   - ${job.title}: flow_metadata = ${job.flow_metadata}`);
      });
    }
    
    // Check the schema of user_onboarding_progress
    console.log('\n🔍 Checking user_onboarding_progress table schema...');
    
    try {
      const { data: schemaData, error: schemaError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_name', 'user_onboarding_progress')
        .eq('table_schema', 'public')
        .order('ordinal_position');
      
      if (schemaError) {
        console.log('⚠️  Cannot get schema info:', schemaError.message);
      } else {
        console.log('📊 user_onboarding_progress columns:');
        schemaData.forEach(col => {
          console.log(`   - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
        });
      }
    } catch (err) {
      console.log('⚠️  Cannot check schema:', err.message);
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkFlowMetadataUsage();
