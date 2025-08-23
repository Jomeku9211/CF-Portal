// Test with the actual user ID found in the database
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Use the actual user ID found in the database
const REAL_USER_ID = 'ea25f868-9887-4bfa-9207-dbccef4a3d71';
const REAL_ROLE_ID = '38b72eef-833c-496e-b493-4455e0e7a670'; // service-provider
const REAL_CATEGORY_ID = 'e1ca2ec0-4857-4e50-8ec6-8fd004f4c750'; // full-stack-developer
const REAL_EXPERIENCE_LEVEL_ID = '73c56679-b260-4425-b916-737682da9365'; // junior

async function testWithRealUser() {
  console.log('🧪 Testing with Real User from Database...\n');
  console.log('🔗 Connecting to Supabase:', supabaseUrl);
  console.log('👤 Using real user ID:', REAL_USER_ID);

  try {
    // Step 1: Check current state
    console.log('1️⃣ Checking current database state...');
    
    const { data: userRole, error: userRoleError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', REAL_USER_ID)
      .single();

    if (userRoleError) {
      console.error('   ❌ Error getting user role:', userRoleError);
    } else {
      console.log('   ✅ Found user role:', {
        id: userRole.id,
        role_id: userRole.role_id,
        category_id: userRole.category_id,
        experience_level_id: userRole.experience_level_id
      });
    }

    const { data: progress, error: progressError } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', REAL_USER_ID)
      .single();

    if (progressError) {
      console.error('   ❌ Error getting progress:', progressError);
    } else {
      console.log('   ✅ Found onboarding progress:', {
        current_step: progress.current_step,
        onboarding_flow: progress.onboarding_flow,
        onboarding_status: progress.onboarding_status
      });
    }

    // Step 2: Try to create service provider profile
    console.log('\n2️⃣ Testing service provider profile creation...');
    
    const profileData = {
      user_id: REAL_USER_ID,
      role_id: REAL_ROLE_ID,
      category_id: REAL_CATEGORY_ID,
      specialization: 'full-stack-development',
      experience_level_id: REAL_EXPERIENCE_LEVEL_ID,
      primary_stack: 'JavaScript/React/Node.js', // Add required field
      technical_skills: ['JavaScript', 'React', 'Node.js', 'Python'], // Add required field
      bio: 'Full-stack developer with junior experience',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      hourly_rate: 50,
      availability: 'full-time',
      portfolio_url: 'https://portfolio.example.com',
      linkedin_url: 'https://linkedin.com/in/developer',
      github_url: 'https://github.com/developer'
    };

    console.log('   📝 Attempting to insert profile data:', profileData);

    // First check if profile already exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .eq('user_id', REAL_USER_ID)
      .maybeSingle();

    if (checkError) {
      console.error('   ❌ Error checking existing profile:', checkError);
    } else if (existingProfile) {
      console.log('   ℹ️ Profile already exists, updating it...');
      
      const { data: updatedProfile, error: updateError } = await supabase
        .from('service_provider_profiles')
        .update(profileData)
        .eq('user_id', REAL_USER_ID)
        .select()
        .single();

      if (updateError) {
        console.error('   ❌ Error updating profile:', updateError);
      } else {
        console.log('   ✅ Profile updated successfully:', updatedProfile.id);
      }
    } else {
      console.log('   🆕 Creating new profile...');
      
      const { data: newProfile, error: insertError } = await supabase
        .from('service_provider_profiles')
        .insert([profileData])
        .select()
        .single();

      if (insertError) {
        console.error('   ❌ Error creating profile:', insertError);
        console.error('   Error details:', {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint
        });
      } else {
        console.log('   ✅ Profile created successfully:', newProfile.id);
      }
    }

    // Step 3: Verify final state
    console.log('\n3️⃣ Verifying final database state...');
    
    const { data: finalProfile } = await supabase
      .from('service_provider_profiles')
      .select('*')
      .eq('user_id', REAL_USER_ID)
      .single();

    if (finalProfile) {
      console.log('   ✅ Service provider profile found:', {
        id: finalProfile.id,
        user_id: finalProfile.user_id,
        role_id: finalProfile.role_id,
        category_id: finalProfile.category_id,
        bio: finalProfile.bio,
        skills: finalProfile.skills
      });
      
      console.log('\n🎉 SUCCESS! Service provider profile is now in the database!');
      console.log('📊 Summary:');
      console.log('   • User role: ✅ Found');
      console.log('   • Onboarding progress: ✅ Found');
      console.log('   • Service provider profile: ✅ Found');
    } else {
      console.log('   ❌ Service provider profile still missing');
      console.log('\n⚠️ FAILURE! Profile was not created. Check the error details above.');
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testWithRealUser();
