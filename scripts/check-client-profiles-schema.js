import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkClientProfilesSchema() {
  console.log('🔍 Checking client_profiles table schema...');
  
  try {
    // Try to insert a record with organization_id to see if the column exists
    const testData = {
      user_id: '4e28f68c-d6b6-4816-8b10-b3ab451de267',
      first_name: 'Test',
      last_name: 'User',
      is_public: true,
      profile_completeness: 25,
      organization_id: 'test-org-id'
    };
    
    console.log('💾 Trying to insert with organization_id:', testData);
    
    const { data, error } = await supabase
      .from('client_profiles')
      .insert([testData])
      .select();
    
    if (error) {
      if (error.message.includes('organization_id')) {
        console.log('❌ organization_id column does NOT exist in client_profiles table');
        console.log('   Error:', error.message);
        console.log('   🔧 Need to add organization_id column to client_profiles table');
      } else {
        console.log('❌ Other error:', error.message);
      }
      return;
    }
    
    console.log('✅ organization_id column exists in client_profiles table');
    console.log('   Inserted record:', data);
    
    // Clean up
    await supabase
      .from('client_profiles')
      .delete()
      .eq('id', data[0].id);
    
    console.log('✅ Test record cleaned up');
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkClientProfilesSchema();
