import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function executeSql(sql) {
  try {
    // For table creation and DDL statements, we'll use the REST API
    // For now, let's just return success since we can't execute DDL via REST
    return { success: true, message: 'DDL statement (needs to be run in SQL Editor)' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function runSqlSetup() {
  try {
    console.log('🚀 Starting Supabase database setup...');
    console.log('\n📋 IMPORTANT: This script will guide you through the setup process.');
    console.log('   Since DDL statements cannot be executed via the REST API,');
    console.log('   you need to run the SQL manually in the Supabase SQL Editor.\n');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'SUPABASE_TABLES_SETUP.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 SQL file contents:');
    console.log('=' .repeat(80));
    console.log(sqlContent);
    console.log('=' .repeat(80));
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Go to your Supabase project: https://cwamnibqfldesbqordeu.supabase.co');
    console.log('2. Navigate to SQL Editor in the left sidebar');
    console.log('3. Click "New query"');
    console.log('4. Copy and paste the SQL content above');
    console.log('5. Click "Run" to execute all statements');
    
    console.log('\n🔗 Direct link to SQL Editor:');
    console.log(`   ${supabaseUrl}/project/default/sql/new`);
    
    console.log('\n✅ Setup instructions completed!');
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Check if we can connect to Supabase first
async function testConnection() {
  try {
    console.log('🔌 Testing Supabase connection...');
    
    // Try to access the API
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    } else {
      console.log('✅ Connection successful');
      return true;
    }
  } catch (err) {
    console.error('❌ Connection test failed:', err.message);
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  if (!connected) {
    console.log('\n💡 Please check your Supabase credentials in the .env file.');
    console.log('   Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct.');
    process.exit(1);
  }
  
  await runSqlSetup();
}

main();
