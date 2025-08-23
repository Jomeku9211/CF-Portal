import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function forceFixRLS() {
  try {
    console.log('🔧 FORCE FIXING RLS ISSUE - COMPLETE CLIENT FLOW MUST WORK');
    console.log('=' .repeat(80));
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    // STEP 1: Check if we can use a different approach
    console.log('📝 STEP 1: Trying alternative approaches...');
    
    // Try 1: Use upsert instead of insert
    console.log('   🧪 Try 1: Using upsert instead of insert...');
    
    try {
      const onboardingData = {
        user_id: testUserId,
        onboarding_flow: 'client',
        current_step: 1,
        total_steps: 3,
        completed_steps: ['role_selection'],
        onboarding_status: 'in_progress',
        onboarding_stage: 'CLIENT_ORG',
        last_activity: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .upsert([onboardingData], { onConflict: 'user_id' })
        .select();
      
      if (error) {
        console.log('      ❌ Upsert failed:', error.message);
      } else {
        console.log('      ✅ Upsert successful!');
        console.log('      📊 Created record:', data[0]);
        return;
      }
    } catch (err) {
      console.log('      ❌ Upsert exception:', err.message);
    }
    
    // Try 2: Check if table has different column names
    console.log('   🧪 Try 2: Checking actual table structure...');
    
    try {
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(0);
      
      if (error) {
        console.log('      ❌ Cannot access table structure:', error.message);
      } else {
        console.log('      ✅ Table structure accessible');
      }
    } catch (err) {
      console.log('      ❌ Structure check exception:', err.message);
    }
    
    // Try 3: Check if we can insert with minimal data
    console.log('   🧪 Try 3: Minimal insert attempt...');
    
    try {
      const minimalData = {
        user_id: testUserId
      };
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .insert([minimalData])
        .select();
      
      if (error) {
        console.log('      ❌ Minimal insert failed:', error.message);
      } else {
        console.log('      ✅ Minimal insert successful!');
        console.log('      📊 Created record:', data[0]);
        
        // Now try to update with more data
        const updateData = {
          onboarding_flow: 'client',
          current_step: 1,
          total_steps: 3,
          completed_steps: ['role_selection'],
          onboarding_status: 'in_progress',
          onboarding_stage: 'CLIENT_ORG',
          last_activity: new Date().toISOString()
        };
        
        const { data: updatedData, error: updateError } = await supabase
          .from('user_onboarding_progress')
          .update(updateData)
          .eq('user_id', testUserId)
          .select();
        
        if (updateError) {
          console.log('      ❌ Update failed:', updateError.message);
        } else {
          console.log('      ✅ Update successful!');
          console.log('      📊 Updated record:', updatedData[0]);
          return;
        }
      }
    } catch (err) {
      console.log('      ❌ Minimal insert exception:', err.message);
    }
    
    console.log('');
    console.log('🚨 RLS POLICY IS BLOCKING ALL INSERTS');
    console.log('🔧 IMMEDIATE ACTION REQUIRED:');
    console.log('');
    console.log('📋 RUN THIS SQL IN SUPABASE TO FIX RLS:');
    console.log('');
    console.log('-- Option 1: Disable RLS temporarily');
    console.log('ALTER TABLE user_onboarding_progress DISABLE ROW LEVEL SECURITY;');
    console.log('');
    console.log('-- Option 2: Fix RLS policy');
    console.log('DROP POLICY IF EXISTS "Users can insert their own onboarding progress" ON user_onboarding_progress;');
    console.log('CREATE POLICY "Users can insert their own onboarding progress" ON user_onboarding_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);');
    console.log('');
    console.log('-- Option 3: Grant all permissions to authenticated users');
    console.log('GRANT ALL ON user_onboarding_progress TO authenticated;');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

forceFixRLS();
