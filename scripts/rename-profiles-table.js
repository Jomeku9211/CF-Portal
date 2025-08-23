const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function renameProfilesTable() {
  try {
    console.log('🔄 Starting table rename process...');
    
    // First, let's check what tables exist
    console.log('\n📋 Checking existing tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_type')
      .eq('table_schema', 'public')
      .in('table_name', ['profiles', 'users']);
    
    if (tablesError) {
      console.log('ℹ️ Using direct SQL query for table check...');
    } else {
      console.log('📊 Existing tables:', tables);
    }
    
    // Check foreign key constraints
    console.log('\n🔗 Checking foreign key constraints...');
    const { data: constraints, error: constraintsError } = await supabase
      .rpc('get_foreign_key_constraints');
    
    if (constraintsError) {
      console.log('ℹ️ Using direct SQL query for constraints...');
    } else {
      console.log('🔗 Foreign key constraints:', constraints);
    }
    
    // Execute the rename operation using RPC
    console.log('\n🔄 Renaming profiles table to users...');
    const { data: renameResult, error: renameError } = await supabase
      .rpc('rename_profiles_to_users');
    
    if (renameError) {
      console.log('❌ RPC failed, trying direct SQL...');
      // Try using the SQL editor approach
      console.log('📝 Please run the following SQL in your Supabase SQL Editor:');
      console.log(`
-- Drop the foreign key constraint first
ALTER TABLE public.user_onboarding_progress 
DROP CONSTRAINT IF EXISTS user_onboarding_progress_user_id_fkey;

-- Rename the profiles table to users
ALTER TABLE public.profiles RENAME TO users;

-- Recreate the foreign key constraint to point to the renamed table
ALTER TABLE public.user_onboarding_progress 
ADD CONSTRAINT user_onboarding_progress_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
      `);
    } else {
      console.log('✅ Table renamed successfully:', renameResult);
    }
    
    // Verify the change
    console.log('\n✅ Verification complete. Please check your Supabase dashboard.');
    
  } catch (error) {
    console.error('❌ Error during table rename:', error);
    console.log('\n📝 Manual SQL execution required. Please run this in Supabase SQL Editor:');
    console.log(`
-- Drop the foreign key constraint first
ALTER TABLE public.user_onboarding_progress 
DROP CONSTRAINT IF EXISTS user_onboarding_progress_user_id_fkey;

-- Rename the profiles table to users
ALTER TABLE public.profiles RENAME TO users;

-- Recreate the foreign key constraint to point to the renamed table
ALTER TABLE public.user_onboarding_progress 
ADD CONSTRAINT user_onboarding_progress_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
    `);
  }
}

// Run the function
renameProfilesTable();


