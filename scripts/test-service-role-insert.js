import { createClient } from '@supabase/supabase-js';

// Supabase configuration - Using service role key
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJleHAiOjE3NTU5NjcxOTMsImlhdCI6MTc1NTk2MzU5MywiZW1haWwiOiJkaGVlcmFqQGNvZGVyZmFybS5pbiIsInBob25lIjoiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImRoZWVyYWpAY29kZXJmYXJtLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6ImRoZWVyYWoiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjRlMjhmNjhjLWQ2YjYtNDgxNi04YjEwLWIzYWI0NTFkZTI2NyJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzU1OTYzNTkzfV0sInNlc3Npb25faWQiOiI0MDYyYmUyNi0yY2ZmLTQ1NTMtYTRjOC1lYmQzNDhjMDVkMjAiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.LcxjMWG-1UpBrs54MRunkhF_p6xyDu7xqqhE0BCEmr4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testServiceRoleInsert() {
  try {
    console.log('🧪 TESTING SERVICE ROLE INSERT - BYPASSING RLS');
    console.log('=' .repeat(80));
    
    const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
    
    // Test 1: Insert user_onboarding_progress using service role
    console.log('📝 TEST 1: Inserting user_onboarding_progress with service role...');
    
    try {
      const onboardingData = {
        user_id: testUserId,
        onboarding_flow: 'client',
        current_step: 1,
        total_steps: 3,
        completed_steps: ['role_selection'],
        onboarding_status: 'in_progress',
        onboarding_stage: 'CLIENT_ORG', // EXACTLY as per OFFICIAL document
        last_activity: new Date().toISOString()
      };
      
      console.log('💾 Inserting:', onboardingData);
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .insert([onboardingData])
        .select();
      
      if (error) {
        console.log('❌ Service role insert failed:', error.message);
      } else {
        console.log('✅ Service role insert successful!');
        console.log('📊 Inserted record:', data[0]);
        
        // Clean up
        await supabase.from('user_onboarding_progress').delete().eq('user_id', testUserId);
        console.log('🧹 Cleaned up test data');
      }
    } catch (err) {
      console.log('❌ Exception during service role insert:', err.message);
    }
    
    console.log('');
    
    // Test 2: Insert client_profile using service role
    console.log('📝 TEST 2: Inserting client_profile with service role...');
    
    try {
      const clientProfileData = {
        user_id: testUserId,
        first_name: 'Dheeraj',
        last_name: 'Khandare',
        job_title: 'Startup Founder',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('💾 Inserting:', clientProfileData);
      
      const { data, error } = await supabase
        .from('client_profiles')
        .insert([clientProfileData])
        .select();
      
      if (error) {
        console.log('❌ Service role client_profile insert failed:', error.message);
      } else {
        console.log('✅ Service role client_profile insert successful!');
        console.log('📊 Inserted record:', data[0]);
        
        // Clean up
        await supabase.from('client_profiles').delete().eq('user_id', testUserId);
        console.log('🧹 Cleaned up test data');
      }
    } catch (err) {
      console.log('❌ Exception during client_profile insert:', err.message);
    }
    
    console.log('');
    console.log('🎯 CONCLUSION:');
    console.log('   - If service role works, the issue is RLS policy');
    console.log('   - Need to either:');
    console.log('     1. Fix RLS policy to allow authenticated users to insert');
    console.log('     2. Use service role for onboarding operations');
    console.log('     3. Temporarily disable RLS for testing');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testServiceRoleInsert();
