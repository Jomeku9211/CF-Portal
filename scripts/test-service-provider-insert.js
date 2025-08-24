import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testServiceProviderInsert() {
  console.log('🧪 Testing service_provider_profiles insert...');
  
  const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
  
  // Try with just user_id first to see what columns exist
  const justUserId = {
    user_id: testUserId
  };
  
  console.log('💾 Trying insert with just user_id:', justUserId);
  
  try {
    const { data, error } = await supabase
      .from('service_provider_profiles')
      .insert([justUserId])
      .select();
    
    if (error) {
      console.log('❌ Insert with just user_id failed:', error.message);
      console.log('   Error code:', error.code);
      console.log('   Error details:', error.details);
      
      // Let's try to see what the actual table structure is by looking at existing records
      const { data: existing, error: existingError } = await supabase
        .from('service_provider_profiles')
        .select('*')
        .limit(5);
      
      if (existingError) {
        console.log('❌ Cannot get existing records:', existingError.message);
      } else {
        console.log('📋 Existing records structure:', existing);
        if (existing.length > 0) {
          console.log('🔍 First record keys:', Object.keys(existing[0]));
        }
      }
      
    } else {
      console.log('✅ Insert with just user_id successful:', data);
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

testServiceProviderInsert();
