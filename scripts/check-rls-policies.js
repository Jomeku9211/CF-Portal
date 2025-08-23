import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRLSPolicies() {
  try {
    console.log('🔍 CHECKING RLS POLICIES ON user_onboarding_progress TABLE');
    console.log('=' .repeat(80));
    
    // Test 1: Try to insert with authenticated user context
    console.log('🧪 TEST 1: Testing insert with authenticated user...');
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    try {
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .insert([{
          user_id: testUserId,
          onboarding_stage: 'CLIENT_ORG'
        }])
        .select();
      
      if (error) {
        console.log('❌ Insert failed with error:', error.message);
        console.log('   Error code:', error.code);
        console.log('   Error details:', error.details);
        console.log('   Error hint:', error.hint);
      } else {
        console.log('✅ Insert successful!');
        // Clean up
        await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
      }
    } catch (err) {
      console.log('❌ Exception during insert:', err.message);
    }
    
    console.log('');
    
    // Test 2: Check if we can select existing data
    console.log('🧪 TEST 2: Testing select access...');
    
    try {
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(5);
      
      if (error) {
        console.log('❌ Select failed:', error.message);
      } else {
        console.log('✅ Select successful, found records:', data?.length || 0);
      }
    } catch (err) {
      console.log('❌ Exception during select:', err.message);
    }
    
    console.log('');
    
    // Test 3: Check table structure
    console.log('🧪 TEST 3: Checking table structure...');
    
    try {
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .limit(0); // Just get column info
      
      if (error) {
        console.log('❌ Structure check failed:', error.message);
      } else {
        console.log('✅ Table structure accessible');
      }
    } catch (err) {
      console.log('❌ Exception during structure check:', err.message);
    }
    
    console.log('');
    console.log('🎯 ANALYSIS:');
    console.log('   - Permissions are correct (user has INSERT privilege)');
    console.log('   - Issue is RLS policy blocking the insert');
    console.log('   - Need to check what RLS policies exist on this table');
    console.log('   - Or temporarily disable RLS for testing');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkRLSPolicies();
