const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' });

// Test database connection and run mock data setup
async function testDatabaseConnection() {
  console.log('🔧 Testing database connection...');
  
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('📊 Environment variables:');
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'Present' : 'Missing');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing required environment variables');
    return;
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client created successfully');
    
    // Test connection by querying a simple table
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .select('*')
      .limit(1);
    
    if (rolesError) {
      console.error('❌ Error querying roles table:', rolesError);
      return;
    }
    
    console.log('✅ Database connection successful');
    console.log('📊 Current roles count:', roles?.length || 0);
    
    // Check if we need to populate data
    if (roles && roles.length === 0) {
      console.log('📝 Database is empty, running mock data setup...');
      await runMockDataSetup(supabase);
    } else {
      console.log('📊 Database already has data, skipping mock data setup');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

async function runMockDataSetup(supabase) {
  console.log('🚀 Setting up mock data...');
  
  try {
    // Insert roles
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .insert([
        { id: '550e8400-e29b-41d4-a716-446655440001', name: 'client', description: 'Client looking to hire services' },
        { id: '550e8400-e29b-41d4-a716-446655440002', name: 'service-provider', description: 'Individual service provider/freelancer' },
        { id: '550e8400-e29b-41d4-a716-446655440003', name: 'agency', description: 'Agency providing services' }
      ])
      .select();
    
    if (rolesError) {
      console.error('❌ Error inserting roles:', rolesError);
      return;
    }
    
    console.log('✅ Roles inserted:', roles.length);
    
    // Insert role categories
    const { data: categories, error: categoriesError } = await supabase
      .from('role_categories')
      .insert([
        { id: '660e8400-e29b-41d4-a716-446655440001', role_id: '550e8400-e29b-41d4-a716-446655440001', name: 'startup', description: 'Startup company' },
        { id: '660e8400-e29b-41d4-a716-446655440002', role_id: '550e8400-e29b-41d4-a716-446655440001', name: 'enterprise', description: 'Enterprise company' },
        { id: '660e8400-e29b-41d4-a716-446655440003', role_id: '550e8400-e29b-41d4-a716-446655440001', name: 'founder', description: 'Individual founder' },
        { id: '660e8400-e29b-41d4-a716-446655440004', role_id: '550e8400-e29b-41d4-a716-446655440002', name: 'software-developer', description: 'Software developer' },
        { id: '660e8400-e29b-41d4-a716-446655440005', role_id: '550e8400-e29b-41d4-a716-446655440002', name: 'designer', description: 'UI/UX designer' },
        { id: '660e8400-e29b-41d4-a716-446655440006', role_id: '550e8400-e29b-41d4-a716-446655440002', name: 'marketer', description: 'Digital marketer' }
      ])
      .select();
    
    if (categoriesError) {
      console.error('❌ Error inserting categories:', categoriesError);
      return;
    }
    
    console.log('✅ Categories inserted:', categories.length);
    
    // Insert experience levels
    const { data: experienceLevels, error: expError } = await supabase
      .from('experience_levels')
      .insert([
        { id: '770e8400-e29b-41d4-a716-446655440001', name: 'entry', description: 'Entry level (0-2 years)', years_experience: 1 },
        { id: '770e8400-e29b-41d4-a716-446655440002', name: 'junior', description: 'Junior level (2-4 years)', years_experience: 3 },
        { id: '770e8400-e29b-41d4-a716-446655440003', name: 'mid', description: 'Mid level (4-7 years)', years_experience: 5 },
        { id: '770e8400-e29b-41d4-a716-446655440004', name: 'senior', description: 'Senior level (7-10 years)', years_experience: 8 },
        { id: '770e8400-e29b-41d4-a716-446655440005', name: 'expert', description: 'Expert level (10+ years)', years_experience: 12 }
      ])
      .select();
    
    if (expError) {
      console.error('❌ Error inserting experience levels:', expError);
      return;
    }
    
    console.log('✅ Experience levels inserted:', experienceLevels.length);
    
    console.log('🎉 Mock data setup completed successfully!');
    
    // Verify the data
    const { data: verifyRoles } = await supabase.from('roles').select('*');
    const { data: verifyCategories } = await supabase.from('role_categories').select('*');
    const { data: verifyExp } = await supabase.from('experience_levels').select('*');
    
    console.log('📊 Verification:');
    console.log('- Roles:', verifyRoles?.length || 0);
    console.log('- Categories:', verifyCategories?.length || 0);
    console.log('- Experience Levels:', verifyExp?.length || 0);
    
  } catch (error) {
    console.error('❌ Error setting up mock data:', error);
  }
}

// Run the test
testDatabaseConnection().catch(console.error);





