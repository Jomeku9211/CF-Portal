import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkExistingRecord() {
  console.log('🔍 Checking existing service provider record...');
  
  try {
    // Get the record we just created
    const { data: existing, error: existingError } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .eq('user_id', '4e28f68c-d6b6-4816-8b10-b3ab451de267');
    
    if (existingError) {
      console.log('❌ Cannot get existing record:', existingError.message);
      return;
    }
    
    if (existing && existing.length > 0) {
      const record = existing[0];
      console.log('📋 Existing record found:');
      console.log('   ID:', record.id);
      console.log('   Available columns:', Object.keys(record));
      console.log('   Sample data:', record);
      
      // Show which fields are null vs populated
      console.log('\n🔍 Field Analysis:');
      Object.keys(record).forEach(key => {
        const value = record[key];
        const status = value !== null && value !== undefined ? '✅ Populated' : '❌ Null';
        console.log(`   ${key}: ${status} (${value})`);
      });
      
    } else {
      console.log('📋 No existing records found');
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkExistingRecord();
