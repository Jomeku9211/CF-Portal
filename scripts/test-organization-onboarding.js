import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testOrganizationOnboarding() {
  console.log('🧪 Testing organization_onboarding with service provider...');
  
  const testUserId = '4e28f68c-d6b6-4816-8b10-b3ab451de267';
  
  // Get the service provider role and category IDs
  const { data: roles, error: rolesError } = await supabase
    .from('roles')
    .select('*')
    .eq('name', 'service-provider');
  
  if (rolesError || !roles || roles.length === 0) {
    console.log('❌ Cannot get service provider role:', rolesError?.message);
    return;
  }
  
  const serviceProviderRole = roles[0];
  console.log('✅ Service Provider role:', serviceProviderRole.id);
  
  const { data: categories, error: categoriesError } = await supabase
    .from('role_categories')
    .select('*')
    .eq('name', 'full-stack-developer');
  
  if (categoriesError || !categories || categories.length === 0) {
    console.log('❌ Cannot get full-stack developer category:', categoriesError?.message);
    return;
  }
  
  const developerCategory = categories[0];
  console.log('✅ Full-stack developer category:', developerCategory.id);
  
  // Try to create onboarding progress with organization_onboarding
  const testData = {
    user_id: testUserId,
    role_id: serviceProviderRole.id,
    category_id: developerCategory.id,
    onboarding_flow: 'developer',
    current_step: 1,
    total_steps: 5,
    completed_steps: ['role_selection'],
    onboarding_status: 'in_progress',
    onboarding_stage: 'organization_onboarding', // Use the value that works
    last_activity: new Date().toISOString()
  };
  
  console.log('💾 Trying to create onboarding progress with organization_onboarding:', testData);
  
  try {
    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .insert([testData])
      .select();
    
    if (error) {
      console.log('❌ Failed:', error.message);
      console.log('   Error code:', error.code);
      console.log('   Error details:', error.details);
    } else {
      console.log('✅ SUCCESS! organization_onboarding works for service provider');
      console.log('📊 Record created:', data[0]);
      
      // Clean up
      await supabase
        .from('user_onboarding_progress')
        .delete()
        .eq('id', data[0].id);
    }
    
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

testOrganizationOnboarding();
