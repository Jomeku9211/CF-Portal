import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixUserRolesTable() {
  console.log('🔧 Fixing user_roles table...');
  
  try {
    // First, let's see what columns exist
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .limit(0);
    
    if (error) {
      console.log('❌ Error checking user_roles structure:', error);
      return;
    }
    
    console.log('✅ user_roles table structure checked');
    
    // Try to insert with minimal data
    const testData = {
      user_id: '1f5dcb5f-a587-4eb0-8686-b8052708c23b', // Use existing user ID
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78'
    };
    
    console.log('📝 Attempting to insert:', testData);
    
    const { data: insertData, error: insertError } = await supabase
      .from('user_roles')
      .insert(testData)
      .select();
    
    if (insertError) {
      console.log('❌ Insert failed:', insertError);
    } else {
      console.log('✅ Insert successful:', insertData);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function fixOnboardingProgressTable() {
  console.log('\n🔧 Fixing user_onboarding_progress table...');
  
  try {
    // Try to insert with correct data types
    const testData = {
      user_id: '1f5dcb5f-a587-4eb0-8686-b8052708c23b', // Use existing user ID
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
      current_step: 1,
      total_steps: 4,
      completed_steps: [], // JSON array as expected
      onboarding_status: 'in_progress'
    };
    
    console.log('📝 Attempting to insert:', testData);
    
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .insert(testData)
      .select();
    
    if (error) {
      console.log('❌ Insert failed:', error);
    } else {
      console.log('✅ Insert successful:', data);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function syncAuthUser() {
  console.log('\n🔧 Syncing auth user to users table...');
  
  try {
    // Check if we need to create a user record for the current auth user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.log('❌ Auth error:', authError);
      return;
    }
    
    if (!user) {
      console.log('❌ No authenticated user');
      return;
    }
    
    console.log('📋 Auth user:', user.id, user.email);
    
    // Check if user exists in users table
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single();
    
    if (userError && userError.code === 'PGRST116') {
      // User doesn't exist, create them
      console.log('📝 Creating user record...');
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          status: 'active'
        })
        .select()
        .single();
      
      if (createError) {
        console.log('❌ Error creating user:', createError);
      } else {
        console.log('✅ User created:', newUser);
      }
    } else if (userError) {
      console.log('❌ Error checking user:', userError);
    } else {
      console.log('✅ User already exists in users table');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting Database Fixes...\n');
  
  await syncAuthUser();
  await fixUserRolesTable();
  await fixOnboardingProgressTable();
  
  console.log('\n🎉 Database Fixes Complete!');
}

main().catch(console.error);
