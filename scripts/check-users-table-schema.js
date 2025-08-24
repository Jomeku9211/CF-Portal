import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkUsersTableSchema() {
  console.log('🔍 Checking users table schema...');
  
  try {
    // Try to insert a minimal user record to see what columns are required
    const minimalUserData = {
      id: '4e28f68c-d6b6-4816-8b10-b3ab451de267',
      email: 'dheeraj@coderfarm.in'
    };
    
    console.log('💾 Trying minimal user insert:', minimalUserData);
    
    const { data, error } = await supabase
      .from('users')
      .insert([minimalUserData])
      .select();
    
    if (error) {
      console.log('❌ Minimal user insert failed:', error.message);
      console.log('   Error code:', error.code);
      console.log('   Error details:', error.details);
      
      // Try to get existing records to see the structure
      const { data: existing, error: existingError } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      if (existingError) {
        console.log('❌ Cannot get existing users:', existingError.message);
      } else if (existing && existing.length > 0) {
        console.log('📋 Existing user record structure:');
        console.log('   Columns:', Object.keys(existing[0]));
        console.log('   Sample data:', existing[0]);
      } else {
        console.log('📋 No existing users found');
      }
      
    } else {
      console.log('✅ Minimal user insert successful:', data);
      
      // Clean up
      await supabase
        .from('users')
        .delete()
        .eq('id', '4e28f68c-d6b6-4816-8b10-b3ab451de267');
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkUsersTableSchema();
