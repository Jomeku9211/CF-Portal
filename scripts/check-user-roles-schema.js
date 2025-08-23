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

async function checkUserRolesSchema() {
  console.log('🔍 Checking user_roles table schema...');
  
  try {
    // Try to get the table structure
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error querying user_roles:', error);
    } else {
      console.log('✅ user_roles table is accessible');
      console.log('📋 Sample data structure:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function checkOnboardingProgressSchema() {
  console.log('\n🔍 Checking user_onboarding_progress table schema...');
  
  try {
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error querying user_onboarding_progress:', error);
    } else {
      console.log('✅ user_onboarding_progress table is accessible');
      console.log('📋 Sample data structure:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function checkClientProfilesSchema() {
  console.log('\n🔍 Checking client_profiles table schema...');
  
  try {
    const { data, error } = await supabase
      .from('client_profiles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error querying client_profiles:', error);
    } else {
      console.log('✅ client_profiles table is accessible');
      console.log('📋 Sample data structure:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Schema Check...\n');
  
  await checkUserRolesSchema();
  await checkOnboardingProgressSchema();
  await checkClientProfilesSchema();
  
  console.log('\n🎉 Schema Check Complete!');
}

main().catch(console.error);
