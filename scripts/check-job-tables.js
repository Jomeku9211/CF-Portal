import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkJobTables() {
  console.log('🔍 Checking for job-related tables...');
  
  try {
    // Common job table names to check
    const possibleJobTables = [
      'jobs',
      'job_posts',
      'job_listings',
      'job_requirements',
      'job_applications',
      'job_categories',
      'job_skills',
      'job_budgets',
      'job_timelines',
      'hiring_requests',
      'project_requirements',
      'work_orders'
    ];
    
    console.log('📋 Checking for job tables:');
    
    for (const tableName of possibleJobTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (error) {
          if (error.code === '42P01') {
            // Table doesn't exist
            console.log(`   ❌ ${tableName}: Table does not exist`);
          } else if (error.code === '42501') {
            // Permission denied - table exists but RLS blocking
            console.log(`   ⚠️  ${tableName}: Table exists but RLS blocking access`);
          } else {
            console.log(`   ❓ ${tableName}: ${error.message}`);
          }
        } else {
          console.log(`   ✅ ${tableName}: Table exists and accessible`);
          if (data && data.length > 0) {
            console.log(`      - Sample record: ${Object.keys(data[0]).length} fields`);
          } else {
            console.log(`      - Table is empty`);
          }
        }
      } catch (err) {
        console.log(`   ❌ ${tableName}: ${err.message}`);
      }
    }
    
    // Check if there are any tables with 'job' in the name
    console.log('\n🔍 Checking for any tables with "job" in the name...');
    
    // Try to get table names from information_schema
    try {
      const { data: allTables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .ilike('table_name', '%job%');
      
      if (tablesError) {
        console.log('❌ Cannot check table names:', tablesError.message);
      } else if (allTables && allTables.length > 0) {
        console.log('📋 Found tables with "job" in name:');
        allTables.forEach(table => {
          console.log(`   - ${table.table_name}`);
        });
      } else {
        console.log('📋 No tables found with "job" in name');
      }
    } catch (err) {
      console.log('⚠️  Cannot check information_schema:', err.message);
    }
    
    // Check if organizations table has job-related fields
    console.log('\n🔍 Checking organizations table for job-related fields...');
    
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .limit(1);
    
    if (orgError) {
      console.log('❌ Cannot access organizations table:', orgError.message);
    } else if (orgData && orgData.length > 0) {
      const org = orgData[0];
      const jobFields = Object.keys(org).filter(field => 
        field.toLowerCase().includes('job') ||
        field.toLowerCase().includes('hiring') ||
        field.toLowerCase().includes('project') ||
        field.toLowerCase().includes('work') ||
        field.toLowerCase().includes('requirement')
      );
      
      if (jobFields.length > 0) {
        console.log('📋 Found job-related fields in organizations:');
        jobFields.forEach(field => {
          console.log(`   - ${field}: ${org[field]}`);
        });
      } else {
        console.log('📋 No job-related fields found in organizations table');
      }
    }
    
    // Check if teams table has job-related fields
    console.log('\n🔍 Checking teams table for job-related fields...');
    
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .limit(1);
    
    if (teamError) {
      console.log('❌ Cannot access teams table:', teamError.message);
    } else if (teamData && teamData.length > 0) {
      const team = teamData[0];
      const jobFields = Object.keys(team).filter(field => 
        field.toLowerCase().includes('job') ||
        field.toLowerCase().includes('hiring') ||
        field.toLowerCase().includes('project') ||
        field.toLowerCase().includes('work') ||
        field.toLowerCase().includes('requirement')
      );
      
      if (jobFields.length > 0) {
        console.log('📋 Found job-related fields in teams:');
        jobFields.forEach(field => {
          console.log(`   - ${field}: ${team[field]}`);
        });
      } else {
        console.log('📋 No job-related fields found in teams table');
      }
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkJobTables();
