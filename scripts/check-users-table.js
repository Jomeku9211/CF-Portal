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

async function checkUsersTable() {
  console.log('🔍 Checking users table...');
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error querying users table:', error);
    } else {
      console.log('✅ users table is accessible');
      console.log('📋 Sample data structure:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function checkAuthUsers() {
  console.log('\n🔍 Checking auth.users...');
  
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log('❌ Error getting auth user:', error);
    } else {
      console.log('✅ Auth user accessible');
      console.log('📋 User data:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Users Table Check...\n');
  
  await checkUsersTable();
  await checkAuthUsers();
  
  console.log('\n🎉 Users Table Check Complete!');
}

main().catch(console.error);
