import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabaseSchema() {
  try {
    console.log('🔍 CHECKING DATABASE SCHEMA - COMPARING WITH OFFICIAL DOCUMENT');
    console.log('=' .repeat(80));
    
    // Check client_profiles table structure
    console.log('📋 Checking client_profiles table structure...');
    try {
      const { data: clientProfilesSample, error: clientError } = await supabase
        .from('client_profiles')
        .select('*')
        .limit(1);
      
      if (clientError) {
        console.error('❌ Error accessing client_profiles:', clientError);
      } else {
        console.log('✅ client_profiles table accessible');
        if (clientProfilesSample && clientProfilesSample.length > 0) {
          console.log('📊 Sample record columns:', Object.keys(clientProfilesSample[0]));
        } else {
          console.log('📊 Table is empty, checking schema...');
          // Try to get column info by attempting insert with minimal data
          const testData = {
            user_id: 'test-user-id',
            created_at: new Date().toISOString()
          };
          console.log('🧪 Testing minimal insert to see schema...');
          const { error: testError } = await supabase
            .from('client_profiles')
            .insert([testData]);
          
          if (testError) {
            console.log('📋 Schema error reveals columns:', testError.message);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error checking client_profiles schema:', error);
    }
    
    console.log('');
    
    // Check user_onboarding_progress table structure
    console.log('📋 Checking user_onboarding_progress table structure...');
    try {
      const { data: onboardingSample, error: onboardingError } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(1);
      
      if (onboardingError) {
        console.error('❌ Error accessing user_onboarding_progress:', onboardingError);
      } else {
        console.log('✅ user_onboarding_progress table accessible');
        if (onboardingSample && onboardingSample.length > 0) {
          console.log('📊 Sample record columns:', Object.keys(onboardingSample[0]));
        } else {
          console.log('📊 Table is empty');
        }
      }
    } catch (error) {
      console.error('❌ Error checking user_onboarding_progress schema:', error);
    }
    
    console.log('');
    
    // Check what tables actually exist
    console.log('🔍 Checking what tables exist in the database...');
    try {
      // Try to access common tables mentioned in OFFICIAL document
      const tablesToCheck = [
        'users', 'user_roles', 'client_profiles', 'service_provider_profiles',
        'organizations', 'teams', 'job_posts', 'user_onboarding_progress'
      ];
      
      for (const tableName of tablesToCheck) {
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .limit(1);
          
          if (error) {
            console.log(`❌ ${tableName}: ${error.message}`);
          } else {
            console.log(`✅ ${tableName}: Accessible`);
          }
        } catch (err) {
          console.log(`❌ ${tableName}: ${err.message}`);
        }
      }
    } catch (error) {
      console.error('❌ Error checking tables:', error);
    }
    
    console.log('');
    console.log('🎯 OFFICIAL DOCUMENT REQUIREMENTS:');
    console.log('   - client_profile: {user_id, role_category}');
    console.log('   - user_onboarding_progress: {user_id, stage}');
    console.log('   - onboarding_stage: CLIENT_ORG (for client)');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkDatabaseSchema();
