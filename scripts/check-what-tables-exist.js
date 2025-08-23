import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  try {
    console.log('🔍 Checking what tables exist in the database...\n');

    // 1. List all tables in public schema
    console.log('1. All tables in public schema:');
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('schemaname, tablename, tableowner')
      .eq('schemaname', 'public')
      .order('tablename');

    if (tablesError) {
      console.log('   ❌ Error fetching tables:', tablesError.message);
    } else {
      console.log('   ✅ Tables found:', tables?.length || 0);
      tables?.forEach(table => {
        console.log(`      - ${table.tablename} (owner: ${table.tableowner})`);
      });
    }

    // 2. Check if user_onboarding_progress exists
    console.log('\n2. Checking if user_onboarding_progress exists:');
    const { data: onboardingTable, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(1);

    if (onboardingError) {
      if (onboardingError.code === 'PGRST204') {
        console.log('   ❌ Table user_onboarding_progress DOES NOT EXIST');
      } else {
        console.log('   ❌ Error checking table:', onboardingError.message);
      }
    } else {
      console.log('   ✅ Table user_onboarding_progress EXISTS');
    }

    // 3. Check for tables with similar names
    console.log('\n3. Tables with similar names:');
    const similarTables = tables?.filter(table => 
      table.tablename.includes('onboarding') || 
      table.tablename.includes('progress') || 
      table.tablename.includes('user')
    ) || [];

    if (similarTables.length > 0) {
      similarTables.forEach(table => {
        console.log(`      - ${table.tablename}`);
      });
    } else {
      console.log('   No similar tables found');
    }

    // 4. Count onboarding-related tables
    console.log('\n4. Count of onboarding-related tables:');
    const onboardingCount = tables?.filter(table => 
      table.tablename.includes('onboarding')
    ).length || 0;
    console.log(`   Found ${onboardingCount} tables with 'onboarding' in the name`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkTables();
