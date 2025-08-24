import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testOrganizationsInsert() {
  console.log('🧪 Testing direct insert into organizations table...');
  
  try {
    // First, let's check if we can get the client profile ID
    const { data: clientProfiles, error: profileError } = await supabase
      .from('client_profiles')
      .select('id, user_id')
      .eq('user_id', '4e28f68c-d6b6-4816-8b10-b3ab451de267');
    
    if (profileError || !clientProfiles || clientProfiles.length === 0) {
      console.log('❌ Cannot get client profile:', profileError?.message);
      return;
    }
    
    const clientProfile = clientProfiles[0];
    console.log('✅ Found client profile:', clientProfile.id);
    
    // Try to insert a minimal organization
    const minimalOrgData = {
      client_profile_id: clientProfile.id,
      name: 'Test Organization',
      company_size: '1-10',
      industry: 'technology',
      is_primary: true,
      is_active: true
    };
    
    console.log('💾 Trying minimal organization insert:', minimalOrgData);
    
    const { data, error } = await supabase
      .from('organizations')
      .insert([minimalOrgData])
      .select();
    
    if (error) {
      console.log('❌ Insert failed:', error.message);
      console.log('   Error code:', error.code);
      console.log('   Error details:', error.details);
      console.log('   Error hint:', error.hint);
      
      if (error.code === '42501') {
        console.log('🔍 This is a permission denied error - likely RLS policy blocking');
        console.log('🔧 You need to run: ALTER TABLE organizations DISABLE ROW LEVEL SECURITY;');
      }
      
    } else {
      console.log('✅ SUCCESS! Organization inserted:', data);
      
      // Clean up
      await supabase
        .from('organizations')
        .delete()
        .eq('id', data[0].id);
      
      console.log('✅ Test organization cleaned up');
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

testOrganizationsInsert();
