import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkTeamTables() {
  console.log('🔍 Checking for team-related tables...');
  
  try {
    // Common team table names to check
    const possibleTeamTables = [
      'teams',
      'team_members',
      'team_roles',
      'team_structure',
      'organization_teams',
      'company_teams',
      'staff',
      'employees',
      'team_profiles'
    ];
    
    console.log('📋 Checking for team tables:');
    
    for (const tableName of possibleTeamTables) {
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
    
    // Check if there are any tables with 'team' in the name
    console.log('\n🔍 Checking for any tables with "team" in the name...');
    
    const { data: allTables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .ilike('table_name', '%team%');
    
    if (tablesError) {
      console.log('❌ Cannot check table names:', tablesError.message);
    } else if (allTables && allTables.length > 0) {
      console.log('📋 Found tables with "team" in name:');
      allTables.forEach(table => {
        console.log(`   - ${table.table_name}`);
      });
    } else {
      console.log('📋 No tables found with "team" in name');
    }
    
    // Check if organizations table has team-related fields
    console.log('\n🔍 Checking organizations table for team-related fields...');
    
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .limit(1);
    
    if (orgError) {
      console.log('❌ Cannot access organizations table:', orgError.message);
    } else if (orgData && orgData.length > 0) {
      const org = orgData[0];
      const teamFields = Object.keys(org).filter(field => 
        field.toLowerCase().includes('team') ||
        field.toLowerCase().includes('member') ||
        field.toLowerCase().includes('staff') ||
        field.toLowerCase().includes('employee')
      );
      
      if (teamFields.length > 0) {
        console.log('📋 Found team-related fields in organizations:');
        teamFields.forEach(field => {
          console.log(`   - ${field}: ${org[field]}`);
        });
      } else {
        console.log('📋 No team-related fields found in organizations table');
      }
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkTeamTables();
