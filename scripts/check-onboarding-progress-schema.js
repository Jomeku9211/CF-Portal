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

async function checkOnboardingProgressSchema() {
  console.log('🔍 Checking user_onboarding_progress table schema...');
  
  try {
    // Get a sample record to see all columns
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error querying table:', error);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('✅ Table accessible, sample record:');
      console.log('📋 All columns:', Object.keys(data[0]));
      console.log('📋 Sample data:', JSON.stringify(data[0], null, 2));
    } else {
      console.log('✅ Table accessible but no data');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Onboarding Progress Schema Check...\n');
  
  await checkOnboardingProgressSchema();
  
  console.log('\n🎉 Schema Check Complete!');
}

main().catch(console.error);
