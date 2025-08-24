import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkActualSchema() {
  console.log('🔍 Checking actual service_provider_profiles table schema...');
  
  try {
    // Try to insert a minimal record to see what columns are required
    const minimalData = {
      user_id: '4e28f68c-d6b6-4816-8b10-b3ab451de267',
      primary_stack: 'full-stack'
    };
    
    console.log('💾 Trying minimal insert:', minimalData);
    
    const { data, error } = await supabase
      .from('service_provider_profiles')
      .insert([minimalData])
      .select();
    
    if (error) {
      console.log('❌ Minimal insert failed:', error.message);
      console.log('   Error code:', error.code);
      console.log('   Error details:', error.details);
      
      // Try to get existing records to see the structure
      const { data: existing, error: existingError } = await supabase
        .from('service_provider_profiles')
        .select('*')
        .limit(1);
      
      if (existingError) {
        console.log('❌ Cannot get existing records:', existingError.message);
      } else if (existing && existing.length > 0) {
        console.log('📋 Existing record structure:');
        console.log('   Columns:', Object.keys(existing[0]));
        console.log('   Sample data:', existing[0]);
      } else {
        console.log('📋 No existing records found');
      }
      
    } else {
      console.log('✅ Minimal insert successful:', data);
      
      // Clean up
      await supabase
        .from('service_provider_profiles')
        .delete()
        .eq('user_id', '4e28f68c-d6b6-4816-8b10-b3ab451de267');
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkActualSchema();
