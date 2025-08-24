import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkDatabaseRelationships() {
  console.log('🔍 CHECKING DATABASE RELATIONSHIPS AND DATA FLOW');
  console.log('================================================================================');
  
  const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
  
  try {
    // STEP 1: Check Client Profile
    console.log('\n📝 STEP 1: Checking Client Profile...');
    
    const { data: clientProfile, error: clientError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('user_id', testUserId);
    
    if (clientError || !clientProfile || clientProfile.length === 0) {
      console.log('❌ No client profile found:', clientError?.message);
      return;
    }
    
    const client = clientProfile[0];
    console.log('✅ Client Profile Found:');
    console.log(`   - ID: ${client.id}`);
    console.log(`   - Name: ${client.first_name} ${client.last_name}`);
    console.log(`   - User ID: ${client.user_id}`);
    console.log(`   - Organization ID: ${client.organization_id || 'NOT SET'}`);
    console.log(`   - Profile Completeness: ${client.profile_completeness}%`);
    
    // STEP 2: Check Organizations linked to this client
    console.log('\n📝 STEP 2: Checking Organizations...');
    
    const { data: organizations, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('client_profile_id', client.id);
    
    if (orgError) {
      console.log('❌ Cannot access organizations:', orgError.message);
      return;
    }
    
    if (organizations && organizations.length > 0) {
      console.log(`✅ Found ${organizations.length} organization(s):`);
      organizations.forEach((org, index) => {
        console.log(`   ${index + 1}. Organization: ${org.name}`);
        console.log(`      - ID: ${org.id}`);
        console.log(`      - Client Profile ID: ${org.client_profile_id}`);
        console.log(`      - Industry: ${org.industry}`);
        console.log(`      - Company Size: ${org.company_size}`);
      });
    } else {
      console.log('❌ No organizations found for this client');
      return;
    }
    
    const organization = organizations[0]; // Get first organization
    
    // STEP 3: Check Teams linked to this organization
    console.log('\n📝 STEP 3: Checking Teams...');
    
    const { data: teams, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .eq('organization_id', organization.id);
    
    if (teamError) {
      console.log('❌ Cannot access teams:', teamError.message);
      return;
    }
    
    if (teams && teams.length > 0) {
      console.log(`✅ Found ${teams.length} team(s):`);
      teams.forEach((team, index) => {
        console.log(`   ${index + 1}. Team: ${team.name}`);
        console.log(`      - ID: ${team.id}`);
        console.log(`      - Organization ID: ${team.organization_id}`);
        console.log(`      - Description: ${team.description}`);
        console.log(`      - Team Size: ${team.team_size}`);
        console.log(`      - Flow Metadata: ${team.flow_metadata}`);
      });
    } else {
      console.log('❌ No teams found for this organization');
      return;
    }
    
    const team = teams[0]; // Get first team
    
    // STEP 4: Check Job Posts linked to this team
    console.log('\n📝 STEP 4: Checking Job Posts...');
    
    const { data: jobPosts, error: jobError } = await supabase
      .from('job_posts')
      .select('*')
      .eq('team_id', team.id);
    
    if (jobError) {
      console.log('❌ Cannot access job posts:', jobError.message);
      return;
    }
    
    if (jobPosts && jobPosts.length > 0) {
      console.log(`✅ Found ${jobPosts.length} job post(s):`);
      jobPosts.forEach((job, index) => {
        console.log(`   ${index + 1}. Job: ${job.title}`);
        console.log(`      - ID: ${job.id}`);
        console.log(`      - Team ID: ${job.team_id}`);
        console.log(`      - Organization ID: ${job.organization_id}`);
        console.log(`      - Budget: ${job.budget_range}`);
        console.log(`      - Duration: ${job.project_duration}`);
        console.log(`      - Flow Metadata: ${job.flow_metadata}`);
      });
    } else {
      console.log('❌ No job posts found for this team');
    }
    
    // STEP 5: Check Onboarding Progress
    console.log('\n📝 STEP 5: Checking Onboarding Progress...');
    
    const { data: onboarding, error: onboardingError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', testUserId);
    
    if (onboardingError) {
      console.log('❌ Cannot access onboarding progress:', onboardingError.message);
    } else if (onboarding && onboarding.length > 0) {
      const progress = onboarding[0];
      console.log('✅ Onboarding Progress:');
      console.log(`   - Current Step: ${progress.current_step}/${progress.total_steps}`);
      console.log(`   - Status: ${progress.onboarding_status}`);
      console.log(`   - Stage: ${progress.onboarding_stage}`);
      console.log(`   - Flow: ${progress.onboarding_flow}`);
      console.log(`   - Completed Steps: ${progress.completed_steps?.length || 0} steps`);
    }
    
    // STEP 6: Relationship Analysis
    console.log('\n🔍 STEP 6: Relationship Analysis...');
    
    console.log('📊 RELATIONSHIP STATUS:');
    
    // Client → Organization
    if (client.organization_id) {
      console.log('   ✅ Client → Organization: LINKED');
    } else {
      console.log('   ❌ Client → Organization: NOT LINKED (missing organization_id)');
    }
    
    // Organization → Teams
    if (teams && teams.length > 0) {
      console.log(`   ✅ Organization → Teams: LINKED (${teams.length} teams)`);
    } else {
      console.log('   ❌ Organization → Teams: NOT LINKED (no teams found)');
    }
    
    // Team → Job Posts
    if (jobPosts && jobPosts.length > 0) {
      console.log(`   ✅ Team → Job Posts: LINKED (${jobPosts.length} jobs)`);
    } else {
      console.log('   ❌ Team → Job Posts: NOT LINKED (no jobs found)');
    }
    
    // STEP 7: Data Flow Verification
    console.log('\n🔍 STEP 7: Data Flow Verification...');
    
    console.log('📋 DATA FLOW PATH:');
    console.log(`   1. User (${testUserId})`);
    console.log(`   2. → Client Profile (${client.id})`);
    console.log(`   3. → Organization (${client.organization_id || 'MISSING'})`);
    
    if (client.organization_id) {
      const linkedOrg = organizations.find(org => org.id === client.organization_id);
      if (linkedOrg) {
        console.log(`   4. → Teams (${teams.length} teams)`);
        if (teams.length > 0) {
          console.log(`   5. → Job Posts (${jobPosts.length} jobs)`);
        }
      }
    }
    
    // STEP 8: Issues Found
    console.log('\n🔍 STEP 8: Issues Found...');
    
    const issues = [];
    
    if (!client.organization_id) {
      issues.push('❌ Client profile missing organization_id');
    }
    
    if (teams.length === 0) {
      issues.push('❌ No teams found for organization');
    }
    
    if (jobPosts.length === 0) {
      issues.push('❌ No job posts found for team');
    }
    
    if (issues.length === 0) {
      console.log('✅ No issues found - all relationships working correctly!');
    } else {
      console.log('❌ Issues found:');
      issues.forEach(issue => console.log(`   ${issue}`));
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkDatabaseRelationships();
