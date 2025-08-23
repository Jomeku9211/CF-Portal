import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  console.log('🔍 Checking database schema...\n');

  try {
    // Check client_profiles table structure
    console.log('📋 Checking client_profiles table...');
    const { data: clientProfilesData, error: clientProfilesError } = await supabase
      .from('client_profiles')
      .select('*')
      .limit(1);

    if (clientProfilesError) {
      console.error('❌ Error accessing client_profiles:', clientProfilesError);
    } else {
      console.log('✅ client_profiles table accessible');
      if (clientProfilesData && clientProfilesData.length > 0) {
        console.log('📊 Sample data structure:', Object.keys(clientProfilesData[0]));
      } else {
        console.log('📊 Table is empty');
      }
    }

    // Check user_onboarding_progress table structure
    console.log('\n📋 Checking user_onboarding_progress table...');
    const { data: onboardingData, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(1);

    if (onboardingError) {
      console.error('❌ Error accessing user_onboarding_progress:', onboardingError);
    } else {
      console.log('✅ user_onboarding_progress table accessible');
      if (onboardingData && onboardingData.length > 0) {
        console.log('📊 Sample data structure:', Object.keys(onboardingData[0]));
      } else {
        console.log('📊 Table is empty');
      }
    }

    // Try to insert a minimal record to see what columns are required
    console.log('\n🧪 Testing minimal insert into client_profiles...');
    const { data: testInsert, error: testInsertError } = await supabase
      .from('client_profiles')
      .insert({
        user_id: '00000000-0000-0000-0000-000000000000', // dummy ID
        company_name: 'Test Company'
      })
      .select();

    if (testInsertError) {
      console.log('❌ Test insert failed:', testInsertError.message);
      if (testInsertError.code === 'PGRST204') {
        console.log('💡 This suggests missing columns in the schema');
      }
    } else {
      console.log('✅ Test insert successful');
      // Clean up test data
      await supabase
        .from('client_profiles')
        .delete()
        .eq('user_id', '00000000-0000-0000-0000-000000000000');
    }

  } catch (error) {
    console.error('❌ Schema check failed:', error);
  }
}

checkSchema();

