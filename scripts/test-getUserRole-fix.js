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

async function testGetUserRoleFix() {
  console.log('🔍 Testing getUserRole fix...');
  
  const userId = 'd10a4429-884c-400c-89c8-2cacaddcb9c7';
  
  try {
    // Test the exact query that getUserRole now uses
    console.log('1️⃣ Testing the fixed getUserRole query:');
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        id, 
        user_id, 
        role_id, 
        category_id, 
        specialization, 
        experience_level_id, 
        created_at, 
        updated_at,
        roles(name),
        role_categories(name)
      `)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.log('❌ Query error:', error.message);
    } else {
      console.log('✅ Query successful');
      console.log('📊 Raw data structure:');
      console.log('   Data:', JSON.stringify(data, null, 2));
      
      if (data) {
        // Test the transformation logic
        const transformedData = {
          ...data,
          role_name: data.roles?.[0]?.name || null,
          category_name: data.role_categories?.[0]?.name || null
        };
        
        console.log('\n2️⃣ Transformed data:');
        console.log('   Role name:', transformedData.role_name);
        console.log('   Category name:', transformedData.category_name);
        
        // Test the routing logic
        console.log('\n3️⃣ Testing routing logic:');
        const targetRoute = transformedData.role_name === 'client' ? '/client-onboarding' : '/developer-onboarding';
        console.log(`   Role: ${transformedData.role_name}`);
        console.log(`   Should route to: ${targetRoute}`);
        
        if (transformedData.role_name === 'client') {
          console.log('✅ User should now be routed to /client-onboarding');
        } else {
          console.log('❌ User is still being routed to /developer-onboarding');
        }
      }
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Starting getUserRole Fix Test...\n');
  
  await testGetUserRoleFix();
  
  console.log('\n🎉 getUserRole Fix Test Complete!');
}

main().catch(console.error);
