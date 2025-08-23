import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkClientProfile() {
  try {
    console.log('🔍 Checking client_profile table...');
    
    // Check if client_profile table exists and has data
    const { data: clientProfiles, error: clientError } = await supabase
      .from('client_profiles')
      .select('*');
    
    if (clientError) {
      console.error('❌ Error checking client_profiles:', clientError);
    } else {
      console.log('📋 Client profiles found:', clientProfiles?.length || 0);
      if (clientProfiles && clientProfiles.length > 0) {
        clientProfiles.forEach((profile, index) => {
          console.log(`   ${index + 1}. User ID: ${profile.user_id}`);
          console.log(`      Role Category: ${profile.role_category}`);
          console.log(`      Organization ID: ${profile.organization_id}`);
          console.log(`      Created: ${profile.created_at}`);
          console.log('');
        });
      }
    }
    
    // Check organization table
    console.log('🏢 Checking organization table...');
    const { data: organizations, error: orgError } = await supabase
      .from('organizations')
      .select('*');
    
    if (orgError) {
      console.error('❌ Error checking organizations:', orgError);
    } else {
      console.log('📋 Organizations found:', organizations?.length || 0);
      if (organizations && organizations.length > 0) {
        organizations.forEach((org, index) => {
          console.log(`   ${index + 1}. ID: ${org.id}`);
          console.log(`      Name: ${org.name}`);
          console.log(`      Website: ${org.website}`);
          console.log(`      Industry: ${org.industry}`);
          console.log('');
        });
      }
    }
    
    // Check team table
    console.log('👥 Checking team table...');
    const { data: teams, error: teamError } = await supabase
      .from('teams')
      .select('*');
    
    if (teamError) {
      console.error('❌ Error checking teams:', teamError);
    } else {
      console.log('📋 Teams found:', teams?.length || 0);
      if (teams && teams.length > 0) {
        teams.forEach((team, index) => {
          console.log(`   ${index + 1}. ID: ${team.id}`);
          console.log(`      Organization ID: ${team.organization_id}`);
          console.log(`      Size: ${team.size}`);
          console.log(`      Communication Style: ${team.communication_style}`);
          console.log('');
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkClientProfile();
