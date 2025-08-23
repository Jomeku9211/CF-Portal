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

async function checkCurrentUser() {
  console.log('🔍 Checking current authenticated user...');
  
  try {
    // Get the current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log('❌ Session error:', sessionError);
      return;
    }
    
    if (!session) {
      console.log('❌ No active session');
      return;
    }
    
    console.log('✅ Active session found');
    console.log('📋 User ID:', session.user.id);
    console.log('📋 User email:', session.user.email);
    
    // Check if this user exists in the users table
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (userError && userError.code === 'PGRST116') {
      // User doesn't exist, create them
      console.log('📝 Creating user record in users table...');
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          id: session.user.id,
          email: session.user.email,
          status: 'active'
        })
        .select()
        .single();
      
      if (createError) {
        console.log('❌ Error creating user:', createError);
      } else {
        console.log('✅ User created in users table:', newUser);
      }
    } else if (userError) {
      console.log('❌ Error checking user:', userError);
    } else {
      console.log('✅ User already exists in users table:', existingUser);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function testRoleSelection() {
  console.log('\n🧪 Testing role selection with current user...');
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log('❌ No session for testing');
      return;
    }
    
    const testData = {
      user_id: session.user.id,
      role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
      category_id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78'
    };
    
    console.log('📝 Testing user_roles insert with current user:', testData);
    
    const { data, error } = await supabase
      .from('user_roles')
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

async function main() {
  console.log('🚀 Starting Current User Check...\n');
  
  await checkCurrentUser();
  await testRoleSelection();
  
  console.log('\n🎉 Current User Check Complete!');
}

main().catch(console.error);
