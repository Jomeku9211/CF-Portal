import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkServiceProviderSchema() {
  console.log('🔍 Checking service_provider_profiles table schema...');
  
  try {
    // First, let's see if we can access the table
    const { data, error } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .limit(0);
    
    if (error) {
      console.log('❌ Error accessing table:', error.message);
      return;
    }
    
    console.log('✅ Table is accessible');
    
    // Try to get a sample record to see the structure
    const { data: sample, error: sampleError } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .limit(1);
    
    if (sampleError) {
      console.log('❌ Error getting sample:', sampleError.message);
    } else {
      console.log('📋 Sample record structure:', sample);
    }
    
    // Try to get column information
    const { data: columns, error: colError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'service_provider_profiles')
      .eq('table_schema', 'public')
      .order('ordinal_position');
    
    if (colError) {
      console.log('❌ Error getting column info:', colError.message);
    } else {
      console.log('📊 Table columns:');
      columns.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkServiceProviderSchema();
