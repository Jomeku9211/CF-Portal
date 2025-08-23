import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  try {
    console.log('🔍 Checking user_onboarding_progress table structure...\n');

    // 1. Try to get table info by attempting a simple select
    console.log('1. Testing basic table access:');
    const { data: basicData, error: basicError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .limit(1);

    if (basicError) {
      console.log('   ❌ Basic access failed:', basicError.message);
      console.log('   Error code:', basicError.code);
    } else {
      console.log('   ✅ Basic access successful');
      console.log('   Data sample:', basicData);
    }

    // 2. Try to get specific columns to see what exists
    console.log('\n2. Testing specific column access:');
    const { data: columnData, error: columnError } = await supabase
      .from('user_onboarding_progress')
      .select('user_id, onboarding_flow, current_step')
      .limit(1);

    if (columnError) {
      console.log('   ❌ Column access failed:', columnError.message);
      console.log('   Error code:', columnError.code);
    } else {
      console.log('   ✅ Column access successful');
      console.log('   Column data:', columnData);
    }

    // 3. Try to insert a test record
    console.log('\n3. Testing insert capability:');
    const testData = {
      user_id: '00000000-0000-0000-0000-000000000000', // dummy UUID
      onboarding_flow: 'test',
      current_step: 1,
      total_steps: 5,
      completed_steps: [],
      onboarding_status: 'in_progress'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('user_onboarding_progress')
      .insert(testData)
      .select();

    if (insertError) {
      console.log('   ❌ Insert failed:', insertError.message);
      console.log('   Error code:', insertError.code);
    } else {
      console.log('   ✅ Insert successful');
      console.log('   Inserted data:', insertData);
      
      // Clean up test data
      const { error: deleteError } = await supabase
        .from('user_onboarding_progress')
        .delete()
        .eq('user_id', '00000000-0000-0000-0000-000000000000');
      
      if (deleteError) {
        console.log('   ⚠️ Could not clean up test data:', deleteError.message);
      } else {
        console.log('   ✅ Test data cleaned up');
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkTableStructure();
