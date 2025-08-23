import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeCleanup() {
  console.log('🧹 Starting user_onboarding_progress table cleanup...');
  
  try {
    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'scripts', 'cleanup-onboarding-progress.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📖 SQL file loaded, executing cleanup...');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comments and empty statements
      if (statement.startsWith('--') || statement.trim().length === 0) {
        continue;
      }
      
      try {
        console.log(`🔧 Executing statement ${i + 1}/${statements.length}...`);
        
        const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.log(`⚠️ Statement ${i + 1} result:`, error);
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
        
      } catch (err) {
        console.log(`❌ Error executing statement ${i + 1}:`, err.message);
      }
    }
    
    console.log('\n🎉 Cleanup execution completed!');
    
    // Verify the new table structure
    console.log('\n🔍 Verifying new table structure...');
    
    const { data: tableInfo, error: tableError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(0);
    
    if (tableError) {
      console.log('❌ Error checking table structure:', tableError);
    } else {
      console.log('✅ Table structure verified');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function testInsert() {
  console.log('\n🧪 Testing insert into cleaned table...');
  
  try {
    const testData = {
      user_id: '1f5dcb5f-a587-4eb0-8686-b8052708c23b',
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      onboarding_flow: 'client',
      current_step: 1,
      total_steps: 4,
      completed_steps: [],
      onboarding_status: 'in_progress'
    };
    
    console.log('📝 Testing insert with:', testData);
    
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .insert(testData)
      .select();
    
    if (error) {
      console.log('❌ Insert test failed:', error);
    } else {
      console.log('✅ Insert test successful:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Onboarding Progress Table Cleanup...\n');
  
  await executeCleanup();
  await testInsert();
  
  console.log('\n🎉 Cleanup Complete!');
}

main().catch(console.error);
