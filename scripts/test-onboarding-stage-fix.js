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

async function testOnboardingStageFix() {
  try {
    console.log('🧪 Testing onboarding stage fix...\n');

    // 1. Test inserting a record with the new onboarding_stage column
    console.log('1. Testing insert with onboarding_stage column:');
    const testData = {
      user_id: '00000000-0000-0000-0000-000000000000', // dummy UUID
      role_id: '00000000-0000-0000-0000-000000000000', // dummy UUID
      category_id: '00000000-0000-0000-0000-000000000000', // dummy UUID
      onboarding_flow: 'client',
      onboarding_stage: 'role_selection',
      current_step: 1,
      total_steps: 4,
      completed_steps: [],
      onboarding_status: 'in_progress',
      last_activity: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
      .from('user_onboarding_progress')
      .insert(testData)
      .select();

    if (insertError) {
      console.log('   ❌ Insert failed:', insertError.message);
      console.log('   Error code:', insertError.code);
    } else {
      console.log('   ✅ Insert successful!');
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

    // 2. Test updating the onboarding_stage
    console.log('\n2. Testing update of onboarding_stage:');
    const { data: updateData, error: updateError } = await supabase
      .from('user_onboarding_progress')
      .update({ onboarding_stage: 'organization_onboarding' })
      .eq('user_id', '00000000-0000-0000-0000-000000000000')
      .select();

    if (updateError) {
      console.log('   ❌ Update failed:', updateError.message);
      console.log('   Error code:', updateError.code);
    } else {
      console.log('   ✅ Update successful!');
      console.log('   Updated data:', updateData);
    }

    console.log('\n🎉 Onboarding stage fix test completed!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testOnboardingStageFix();
