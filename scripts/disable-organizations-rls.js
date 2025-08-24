import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function disableOrganizationsRLS() {
  console.log('🔓 Temporarily disabling RLS on organizations table for testing...');
  
  try {
    // Try to disable RLS temporarily
    const { error } = await supabase.rpc('disable_rls', {
      table_name: 'organizations'
    });
    
    if (error) {
      console.log('❌ Cannot disable RLS via RPC:', error.message);
      console.log('🔧 You may need to run this SQL manually in Supabase:');
      console.log('   ALTER TABLE organizations DISABLE ROW LEVEL SECURITY;');
    } else {
      console.log('✅ RLS disabled on organizations table');
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
    console.log('🔧 You may need to run this SQL manually in Supabase:');
    console.log('   ALTER TABLE organizations DISABLE ROW LEVEL SECURITY;');
  }
}

disableOrganizationsRLS();
