import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cwamnibqfldesbqordeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YW1uaWJxZmxkZXNicW9yZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODI2MzYsImV4cCI6MjA3MTM1ODYzNn0.sc_qXCye3pXG5S4RIkvxFSMWHliUd8pNK0kbU73iedA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAvailableCategories() {
  try {
    console.log('🔍 CHECKING AVAILABLE CATEGORIES AND EXPERIENCE LEVELS');
    console.log('=' .repeat(80));
    
    // Check all roles
    console.log('📋 STEP 1: Checking all available roles...');
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('*');
    
    if (rolesError) {
      console.log('❌ Error getting roles:', rolesError.message);
      return;
    }
    
    console.log('✅ Available roles:');
    roles.forEach(role => {
      console.log(`   - ${role.name}: ${role.description}`);
    });
    
    // Check all role categories
    console.log('');
    console.log('📋 STEP 2: Checking all available role categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .select('*');
    
    if (categoriesError) {
      console.log('❌ Error getting categories:', categoriesError.message);
      return;
    }
    
    console.log('✅ Available role categories:');
    categories.forEach(cat => {
      console.log(`   - ${cat.name}: ${cat.description || 'No description'}`);
    });
    
    // Check all experience levels
    console.log('');
    console.log('📋 STEP 3: Checking all available experience levels...');
    const { data: experienceLevels, error: expError } = await supabase
      .from('experience_levels')
      .select('*');
    
    if (expError) {
      console.log('❌ Error getting experience levels:', expError.message);
      return;
    }
    
    console.log('✅ Available experience levels:');
    experienceLevels.forEach(exp => {
      console.log(`   - ${exp.name}: ${exp.description || 'No description'}`);
    });
    
    // Check table structure
    console.log('');
    console.log('📋 STEP 4: Checking table structure...');
    
    // Check if service_provider_profiles table exists and has what columns
    const { data: serviceProviderSample, error: spError } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .limit(1);
    
    if (spError) {
      console.log('❌ Error checking service_provider_profiles table:', spError.message);
    } else {
      console.log('✅ service_provider_profiles table exists');
      if (serviceProviderSample && serviceProviderSample.length > 0) {
        console.log('   Sample record columns:', Object.keys(serviceProviderSample[0]));
      }
    }
    
    console.log('');
    console.log('🎯 RECOMMENDATIONS:');
    console.log('   Based on what we find, we can adjust the smoke test to use');
    console.log('   the actual available categories and experience levels.');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkAvailableCategories();
