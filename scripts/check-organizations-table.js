import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkOrganizationsTable() {
  console.log('🔍 Checking organizations table...');
  
  try {
    // Check if we can access the table
    const { data, error } = await supabase
      .from('organizations')
      .select('*');
    
    if (error) {
      console.log('❌ Cannot access organizations table:', error.message);
      console.log('   Error code:', error.code);
      console.log('   This suggests RLS is blocking access');
      return;
    }
    
    if (data && data.length > 0) {
      console.log('📋 Found organizations in table:');
      data.forEach((org, index) => {
        console.log(`   ${index + 1}. ${org.name} (ID: ${org.id})`);
        console.log(`      - Client Profile ID: ${org.client_profile_id}`);
        console.log(`      - Industry: ${org.industry}`);
        console.log(`      - Company Size: ${org.company_size}`);
      });
    } else {
      console.log('📋 Organizations table is empty (no records found)');
    }
    
    // Try to get table schema
    console.log('\n🔍 Checking table schema...');
    const { data: schemaData, error: schemaError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'organizations')
      .eq('table_schema', 'public')
      .order('ordinal_position');
    
    if (schemaError) {
      console.log('❌ Cannot get schema info:', schemaError.message);
    } else {
      console.log('📊 Organizations table columns:');
      schemaData.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkOrganizationsTable();
