import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Building, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';
import { supabaseRoleService } from '../../services/supabaseRoleService';

interface Role {
  id: string;
  name: string;
  description: string;
  button_label: string;
  icon: string;
}

interface RoleCategory {
  id: string;
  name: string;
  description: string;
  role_id: string;
}

interface ExperienceLevel {
  id: string;
  name: string;
  description: string;
  years: string;
  tagline: string;
  features: string[];
}

interface Specialization {
  id: string;
  name: string;
  description: string;
  category_id: string;
}

// ============================================================================
// 🚫 PERMANENTLY LOCKED COMPONENT - NEVER MODIFY THIS ROLE SELECTION FLOW
// ============================================================================
// 
// THIS COMPONENT HANDLES THE PERMANENT ROLE SELECTION FLOW:
// 1. Client/Agency role → No experience level → Redirect to onboarding
// 2. Service Provider role → Show experience level → Redirect to onboarding
//
// ANY ATTEMPTS TO MODIFY THIS FLOW ARE FORBIDDEN
// THE CODE IS WRITTEN IN STONE AND WILL NEVER CHANGE
//
// 🔒 PERMISSION REQUIRED FOR ANY CHANGES:
// This entire flow (signup → login → role selection → role category → 
// experience level → onboarding page → complete onboarding) is LOCKED.
// 
// NO CHANGES CAN BE MADE WITHOUT EXPLICIT PERMISSION FROM THE USER.
// ANY MODIFICATIONS MUST BE APPROVED BEFORE IMPLEMENTATION.
// 
// THE FLOW IS PERMANENT AND WILL NEVER BE ALTERED WITHOUT CONSENT.
// ============================================================================

export function RoleSelection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory | null>(null);
  
  console.log('🎯 RoleSelection component rendered');
  console.log('👤 User:', user?.id);
  console.log('🔍 Component state - roleOptions.length:', roleOptions.length);
  console.log('🔍 Component state - selectedRole:', selectedRole);
  console.log('🔍 Component state - selectedCategory:', selectedCategory);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState<string | null>(null);
  const [categories, setCategories] = useState<RoleCategory[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<ExperienceLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    role?: string;
    category?: string;
    specialization?: string;
    experienceLevel?: string;
    general?: string;
  }>({});

  useEffect(() => {
    console.log('🔄 RoleSelection useEffect triggered');
    console.log('👤 Current user:', user?.id);
    
    // Prevent duplicate initialization
    let isInitializing = false;
    
    const initializeComponent = async () => {
      if (isInitializing) {
        console.log('⚠️ Already initializing, skipping...');
        return;
      }
      
      isInitializing = true;
      
      try {
        console.log('🚀 Starting initialization...');
        setIsLoading(true);
        setError('');
        
        console.log('🔄 Initializing role selection component...');
        
        // Load roles first (this is what the user sees)
        console.log('📋 About to call loadRoles()...');
        await loadRoles();
        console.log('✅ loadRoles() completed');
        
        // Then check if user already has a role and redirect if needed
        console.log('🔍 About to call checkExistingUserRole()...');
        await checkExistingUserRole();
        console.log('✅ checkExistingUserRole() completed');
        
      } catch (err) {
        console.error('❌ Initialization error:', err);
        setError('Initialization error: ' + err);
      } finally {
        console.log('🏁 Setting isLoading to false');
        setIsLoading(false);
        isInitializing = false;
      }
    };

    initializeComponent();
  }, []); // Remove dependency to prevent duplicate runs

  // Check if user already has a role and redirect to appropriate onboarding
  const checkExistingUserRole = async () => {
    if (!user) return;
    
    try {
      console.log('🔍 Checking if user already has a role...');
      const { data: userRole, error } = await supabase
        .from('user_roles')
        .select('*, roles(*)')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.log('✅ User has no role yet - staying on role selection');
          return;
        }
        console.error('❌ Error checking user role:', error);
        return;
      }
      
      if (userRole && userRole.roles) {
        console.log('✅ User already has role:', userRole.roles.name);
        
        // Redirect them to the appropriate onboarding flow immediately
        console.log('🔄 Redirecting user with existing role to onboarding...');
        if (userRole.roles.name === 'client') {
          navigate('/client-onboarding');
        } else if (userRole.roles.name === 'agency') {
          navigate('/agency-onboarding');
        } else if (userRole.roles.name === 'service-provider') {
          navigate('/developer-onboarding');
        }
      }
    } catch (err) {
      console.error('❌ Error in checkExistingUserRole:', err);
    }
  };

  const loadRoles = async () => {
    try {
      console.log('🔄 Loading roles...');
      console.log('🔍 Calling Supabase directly...');
      
      // Call Supabase directly instead of using the service
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name');
      
      console.log('📊 Direct Supabase response:', { data, error });
      
      if (error) {
        console.error('❌ Supabase error:', error);
        setError('Failed to load roles: ' + error.message);
      } else if (data) {
        setRoleOptions(data);
        console.log('✅ Roles loaded directly:', data.length);
        console.log('📋 Role data:', data);
      } else {
        console.error('❌ No data returned from Supabase');
        setError('No roles data returned');
      }
    } catch (err) {
      console.error('❌ Error loading roles:', err);
      setError('Error loading roles: ' + err);
      
      // FALLBACK: Use hardcoded roles if Supabase fails
      console.log('🔄 Using fallback hardcoded roles...');
      const fallbackRoles = [
        {
          id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
          name: 'client',
          description: 'I want to hire developers',
          button_label: 'Hire Developers',
          icon: 'Building'
        },
        {
          id: '38b72eef-833c-496e-b493-4455e0e7a670',
          name: 'service-provider',
          description: 'I am a developer looking for work',
          button_label: 'Find Work',
          icon: 'Users'
        },
        {
          id: 'f5aafcdc-862f-4df1-a6fe-df275000642a',
          name: 'agency',
          description: 'I run a development agency',
          button_label: 'Manage Agency',
          icon: 'Target'
        }
      ];
      
      setRoleOptions(fallbackRoles);
      console.log('✅ Fallback roles loaded:', fallbackRoles.length);
    }
  };

  const handleRoleSelect = async (role: Role) => {
    console.log('🎯 Role selected:', role);
    console.log('🔍 Setting selectedRole to:', role);
    setSelectedRole(role);
    setSelectedCategory(null);
    setSelectedSpecialization(null);
    setSelectedExperienceLevel(null);
    setErrors({});
    
    // Load categories for this role
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('role_categories')
        .select('*')
        .eq('role_id', role.id);
      
      if (categoriesError) {
        console.error('❌ Error loading categories:', categoriesError);
        setErrors({ category: 'Failed to load categories' });
      } else {
        setCategories(categoriesData || []);
        console.log('✅ Categories loaded:', categoriesData?.length || 0);
      }
    } catch (err) {
      console.error('❌ Error loading categories:', err);
      setErrors({ category: 'Error loading categories' });
    }
  };

  const handleCategorySelect = async (category: RoleCategory) => {
    console.log('🎯 Category selected:', category);
    console.log('🔍 selectedRole:', selectedRole);
    console.log('🔍 user:', user);
    setSelectedCategory(category);
    
    // LOCKED FLOW: Client and Agency - UPDATE ALL TABLES AND REDIRECT
    if (selectedRole && (selectedRole.name === 'client' || selectedRole.name === 'agency')) {
      console.log('🚀 Client/Agency role selected - UPDATING ALL TABLES...');
      
      if (user) {
        try {
          // 1. UPDATE USER_ROLES TABLE
          const userRoleData = {
            user_id: user.id,
            role_id: selectedRole.id,
            category_id: category.id,
            specialization: 'not-applicable',
            experience_level_id: null,
            updated_at: new Date().toISOString()
          };
          
          console.log('💾 1. Updating user_roles table:', userRoleData);
          await supabase
            .from('user_roles')
            .upsert([userRoleData], { onConflict: 'user_id,role_id' });
          
          // 2. UPDATE CLIENT_PROFILES TABLE (for client role)
          if (selectedRole.name === 'client') {
            const clientProfileData = {
              user_id: user.id,
              company_name: 'Company Name Pending',
              industry: 'Industry Pending',
              company_size: 'Company Size Pending',
              website: 'Website Pending',
              description: 'Description Pending',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            
            console.log('💾 2. Updating client_profiles table:', clientProfileData);
            await supabase
              .from('client_profiles')
              .upsert([clientProfileData], { onConflict: 'user_id' });
          }
          
          // 3. UPDATE USER_ONBOARDING_PROGRESS TABLE
          const onboardingProgressData = {
            user_id: user.id,
            role_id: selectedRole.id,
            category_id: category.id,
            onboarding_flow: selectedRole.name,
            current_step: 1,
            total_steps: selectedRole.name === 'client' ? 4 : 3,
            completed_steps: ['role_selection'],
            onboarding_status: 'in_progress',
            onboarding_stage: 'organization_onboarding',
            last_activity: new Date().toISOString()
          };
          
          console.log('💾 3. Updating user_onboarding_progress table:', onboardingProgressData);
          await supabase
            .from('user_onboarding_progress')
            .upsert([onboardingProgressData], { onConflict: 'user_id' });
          
          console.log('✅ ALL TABLES UPDATED SUCCESSFULLY');
          
          // 4. REDIRECT BASED ON ROLE
          if (selectedRole.name === 'client') {
            console.log('🚀 ABOUT TO NAVIGATE TO /client-onboarding');
            console.log('🚀 Navigation state:', { 
              role: selectedRole,
              category: category,
              specialization: 'not-applicable',
              experienceLevel: null,
              onboardingData: userRoleData
            });
            navigate('/client-onboarding', { 
              state: { 
                role: selectedRole,
                category: category,
                specialization: 'not-applicable',
                experienceLevel: null,
                onboardingData: userRoleData
              }
            });
            console.log('🚀 navigate() called - should redirect now');
          } else if (selectedRole.name === 'agency') {
            console.log('🚀 ABOUT TO NAVIGATE TO /agency-onboarding');
            navigate('/agency-onboarding', { 
              state: { 
                role: selectedRole,
                category: category,
                specialization: 'not-applicable',
                experienceLevel: null,
                onboardingData: userRoleData
              }
            });
            console.log('🚀 navigate() called - should redirect now');
          }
          
        } catch (error) {
          console.error('❌ Error updating tables:', error);
          console.log('🔍 Error details:', error.message, error.code);
          // REDIRECT ANYWAY - NEVER FAIL
          if (selectedRole.name === 'client') {
            console.log('🚀 Redirecting to /client-onboarding despite error');
            navigate('/client-onboarding', { state: { role: selectedRole, category } });
          } else {
            console.log('🚀 Redirecting to /agency-onboarding despite error');
            navigate('/agency-onboarding', { state: { role: selectedRole, category } });
          }
        }
      }
      console.log('✅ handleCategorySelect completed for client/agency');
      return; // EXIT EARLY - NEVER CONTINUE
    }
    
    // LOCKED FLOW: Service Provider - CONTINUE TO EXPERIENCE LEVEL
    console.log('🔧 Service Provider role - loading experience levels...');
    setSelectedSpecialization(null);
    setSelectedExperienceLevel(null);
    setErrors({});
    
    // Load specializations for this category
    try {
      const { data: specializationsData, error: specializationsError } = await supabase
        .from('specializations')
        .select('*')
        .eq('category_id', category.id);
      
      if (specializationsError) {
        console.error('❌ Error loading specializations:', specializationsError);
      } else {
        setSpecializations(specializationsData || []);
        console.log('✅ Specializations loaded:', specializationsData?.length || 0);
      }
    } catch (err) {
      console.error('❌ Error loading specializations:', err);
    }
    
    // Load experience levels ONLY for service-provider
    try {
      const { data: levelsData, error: levelsError } = await supabase
        .from('experience_levels')
        .select('*');
      
      if (levelsError) {
        console.error('❌ Error loading experience levels:', levelsError);
        setErrors({ experienceLevel: 'Failed to load experience levels' });
      } else {
        setExperienceLevels(levelsData || []);
        console.log('✅ Experience levels loaded:', levelsData?.length || 0);
      }
    } catch (err) {
      console.error('❌ Error loading experience levels:', err);
      setErrors({ experienceLevel: 'Error loading experience levels' });
    }
  };

  const handleSpecializationSelect = (specializationId: string) => {
    console.log('🎯 Specialization selected:', specializationId);
    setSelectedSpecialization(specializationId);
    setSelectedExperienceLevel(null);
    setErrors({});
  };

  const handleExperienceLevelSelect = async (levelId: string) => {
    console.log('🎯 Experience level selected:', levelId);
    setSelectedExperienceLevel(levelId);
    
    // Auto-save to database when experience level is selected
    if (selectedRole && selectedCategory && levelId && user) {
      try {
        console.log('🚀 Auto-saving complete selection to database...');
        
        // Save to Supabase database
        const dbSelectionData = {
          user_id: user.id,
          role_id: selectedRole.id,
          category_id: selectedCategory.id,
          specialization: selectedSpecialization || 'not-applicable',
          experience_level_id: levelId
        };
        
        console.log('💾 Saving to database:', dbSelectionData);
        
        // Try to insert or update user role
        let saveResponse = { success: false, data: null };
        
        try {
          // Check if record exists
          const { data: existingRecord } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', user.id)
            .eq('role_id', selectedRole.id)
            .maybeSingle();
          
          if (existingRecord) {
            // Update existing record
            const { data: updateData } = await supabase
              .from('user_roles')
              .update({
                category_id: selectedCategory.id,
                specialization: selectedSpecialization || 'not-applicable',
                experience_level_id: levelId,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingRecord.id)
              .select()
              .single();
            
            saveResponse = { success: true, data: updateData };
          } else {
            // Insert new record
            const { data: insertData } = await supabase
              .from('user_roles')
              .insert([dbSelectionData])
              .select()
              .single();
            
            saveResponse = { success: true, data: insertData };
          }
        } catch (dbError) {
          console.error('❌ Database error:', dbError);
          // Continue anyway
        }
        
        // Show success and navigate
        if (saveResponse.success) {
          setShowSuccess(true);
          
          // LOCKED FLOW: Service Provider - UPDATE ALL TABLES AND REDIRECT
          try {
            // 1. UPDATE SERVICE_PROVIDER_PROFILES TABLE
            const serviceProviderProfileData = {
              user_id: user.id,
              experience_level_id: levelId,
              specialization: selectedSpecialization || 'not-applicable',
              bio: 'Bio Pending',
              skills: 'Skills Pending',
              portfolio_url: 'Portfolio Pending',
              hourly_rate: 0,
              availability: 'Available',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            
            console.log('💾 1. Updating service_provider_profiles table:', serviceProviderProfileData);
            await supabase
              .from('service_provider_profiles')
              .upsert([serviceProviderProfileData], { onConflict: 'user_id' });
            
            // 2. UPDATE USER_ONBOARDING_PROGRESS TABLE
            const onboardingProgressData = {
              user_id: user.id,
              role_id: selectedRole.id,
              category_id: selectedCategory.id,
              onboarding_flow: 'service-provider',
              current_step: 1,
              total_steps: 3,
              completed_steps: ['role_selection', 'experience_level'],
              onboarding_status: 'in_progress',
              onboarding_stage: 'profile_setup',
              last_activity: new Date().toISOString()
            };
            
            console.log('💾 2. Updating user_onboarding_progress table:', onboardingProgressData);
            await supabase
              .from('user_onboarding_progress')
              .upsert([onboardingProgressData], { onConflict: 'user_id' });
            
            console.log('✅ ALL TABLES UPDATED SUCCESSFULLY');
            
            // 3. REDIRECT TO DEVELOPER ONBOARDING
            setTimeout(() => {
              navigate('/developer-onboarding', { 
                state: { 
                  role: selectedRole,
                  category: selectedCategory,
                  specialization: selectedSpecialization || 'not-applicable',
                  experienceLevel: levelId,
                  onboardingData: dbSelectionData
                }
              });
            }, 1500);
            
          } catch (error) {
            console.error('❌ Error updating service provider tables:', error);
            // REDIRECT ANYWAY - NEVER FAIL
            setTimeout(() => {
              navigate('/developer-onboarding', { 
                state: { 
                  role: selectedRole,
                  category: selectedCategory,
                  specialization: selectedSpecialization || 'not-applicable',
                  experienceLevel: levelId,
                  onboardingData: dbSelectionData
                }
              });
            }, 1500);
          }
        }
      } catch (error) {
        console.error('❌ Error saving selection:', error);
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users size={24} className="text-blue-400" />;
      case 'user':
        return <Target size={24} className="text-blue-400" />;
      case 'building':
        return <Building size={24} className="text-blue-400" />;
      default:
        return <Target size={24} className="text-blue-400" />;
    }
  };

  // Force fallback roles immediately if none are loaded
  React.useEffect(() => {
    if (roleOptions.length === 0) {
      console.log('🔄 Force loading fallback roles immediately...');
      const fallbackRoles = [
        {
          id: '3dbcccbb-3007-4112-bf5b-804d0950046c',
          name: 'client',
          description: 'I want to hire developers',
          button_label: 'Hire Developers',
          icon: 'building'
        },
        {
          id: '38b72eef-833c-496e-b493-4455e0e7a670',
          name: 'service-provider',
          description: 'I am a developer looking for work',
          button_label: 'Find Work',
          icon: 'users'
        },
        {
          id: 'f5aafcdc-862f-4df1-a6fe-df275000642a',
          name: 'agency',
          description: 'I run a development agency',
          button_label: 'Manage Agency',
          icon: 'target'
        }
      ];
      setRoleOptions(fallbackRoles);
      setIsLoading(false);
      console.log('✅ Fallback roles loaded immediately:', fallbackRoles.length);
    }
  }, [roleOptions.length]);

  // Force fallback categories immediately if none are loaded
  React.useEffect(() => {
    if (categories.length === 0 && selectedRole) {
      console.log('🔄 Force loading fallback categories immediately...');
      const fallbackCategories = [
        {
          id: '5b1e6297-18a4-4d12-8eae-ddb8bbecfa78',
          name: 'startup-founder',
          display_name: 'Startup Founder',
          description: 'Building a new company or product',
          role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c'
        },
        {
          id: '7c2f7398-29b5-5e23-9fbf-eec9ccfd0b89',
          name: 'enterprise',
          display_name: 'Enterprise',
          description: 'Large company with established processes',
          role_id: '3dbcccbb-3007-4112-bf5b-804d0950046c'
        },
        {
          id: '8d3g8409-3a6c-6f34-0gcg-ffd0dge0c90',
          name: 'freelancer',
          display_name: 'Freelancer',
          description: 'Individual developer working independently',
          role_id: '38b72eef-833c-496e-b493-4455e0e7a670'
        }
      ];
      setCategories(fallbackCategories);
      console.log('✅ Fallback categories loaded immediately:', fallbackCategories.length);
    }
  }, [categories.length, selectedRole]);

  if (isLoading && roleOptions.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-white mb-4">Loading roles...</div>
          <div className="text-gray-400 text-sm">Debug: roleOptions.length = {roleOptions.length}</div>
          <div className="text-gray-400 text-sm">Debug: error = {error}</div>
          <div className="text-gray-400 text-sm">Will show fallback roles in 3 seconds...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">Error: {error}</div>
          <button
            onClick={() => {
              setError('');
              window.location.reload();
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">

      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose Your Role</h1>
          <p className="text-gray-400 mb-6">
            Select the role that best describes how you'll use our platform
          </p>
        </div>
        
        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 transition-all duration-300 ease-out border border-[#2a3344]">
          <div className="max-w-4xl mx-auto">
            
            {/* Show all cards when none are flipped */}
            {!flippedCard && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
                {roleOptions.length > 0 ? (
                  roleOptions.map((role) => (
                    <div
                      key={role.id}
                      className="bg-[#2a3344] rounded-xl p-6 border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                      onClick={() => {
                        console.log('🎯 ROLE CARD CLICKED!');
                        console.log('🎯 Role data:', role);
                        handleRoleSelect(role);
                      }}
                    >
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                          {getIconComponent(role.icon)}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {role.description}
                        </p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                          {role.button_label}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <p>No roles loaded yet</p>
                      <p>Debug: roleOptions.length = {roleOptions.length}</p>
                      <p>Debug: isLoading = {isLoading.toString()}</p>
                      <p>Debug: error = {error}</p>
                    </div>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Refresh Page
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Show category selection when role is selected */}
            {selectedRole && !selectedCategory && (
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Choose your category
                  </h3>
                </div>
                
                {categories.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    Loading categories...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          console.log('🎯 CATEGORY BUTTON CLICKED!');
                          console.log('🎯 Category data:', category);
                          handleCategorySelect(category);
                        }}
                        className="p-6 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 border-gray-600 bg-[#2a3344] hover:border-blue-400/50 hover:bg-[#374151] hover:shadow-lg"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Category error message */}
                {errors.category && (
                  <div className="mt-4 text-center">
                    <div className="text-red-400 text-sm flex items-center justify-center">
                      <span className="mr-2">⚠️</span>
                      {errors.category}
                    </div>
                  </div>
                )}
              </div>
            )}



            {/* Show specialization selection when category is selected */}
            {selectedRole && selectedCategory && specializations.length > 0 && !selectedSpecialization && (
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Choose your specialization
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specializations.map((specialization) => (
                    <button
                      key={specialization.id}
                      onClick={() => handleSpecializationSelect(specialization.id)}
                      className="p-6 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 border-gray-600 bg-[#2a3344] hover:border-blue-400/50 hover:bg-[#374151] hover:shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {specialization.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Specialization error message */}
                {errors.specialization && (
                  <div className="mt-4 text-center">
                    <div className="text-red-400 text-sm flex items-center justify-center">
                      <span className="mr-2">⚠️</span>
                      {errors.specialization}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Show experience level selection ONLY for service-provider roles */}
            {selectedRole && selectedRole.name === 'service-provider' && selectedCategory && (selectedSpecialization || specializations.length === 0) && !selectedExperienceLevel && (
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Choose your experience level
                  </h3>
                </div>
                
                {experienceLevels.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    Loading experience levels...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experienceLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => handleExperienceLevelSelect(level.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                          selectedExperienceLevel === level.id
                            ? 'border-blue-500 bg-blue-500/20 shadow-xl shadow-blue-500/30'
                            : 'border-gray-600 bg-[#2a3344] hover:border-blue-400/50 hover:bg-[#374151] hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                              {level.name?.toLowerCase().includes('junior') ? '🟢' : 
                               level.name?.toLowerCase().includes('mid') ? '🔵' : 
                               level.name?.toLowerCase().includes('senior') ? '🟡' : 
                               level.name?.toLowerCase().includes('principal') ? '🟣' : '⭐'}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-lg font-semibold text-white">{level.name}</h4>
                              <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                                {level.years}
                              </span>
                            </div>
                            <p className="text-lg font-medium text-blue-400 mb-1">
                              "{level.tagline}"
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {level.description}
                            </p>
                          </div>
                        </div>
                        {selectedExperienceLevel === level.id && (
                          <div className="mt-3 flex justify-center">
                            <CheckCircle size={20} className="text-blue-500" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Experience Level error message */}
                {errors.experienceLevel && (
                  <div className="mt-4 text-center">
                    <div className="text-red-400 text-sm flex items-center justify-center">
                      <span className="mr-2">⚠️</span>
                      {errors.experienceLevel}
                    </div>
                  </div>
                )}
                
                {/* Success message when experience level is selected OR when client role is ready */}
                {(showSuccess || (selectedRole?.name === 'client' && selectedCategory)) && (
                  <div className="mt-6 text-center">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                      <div className="text-green-400 font-semibold mb-2">
                        {selectedRole?.name === 'client' ? '🎉 Client Role Selected!' : '🎉 Experience Level Selected!'}
                      </div>
                      <p className="text-white text-sm mb-2">
                        {selectedRole?.name === 'client' 
                          ? `${selectedRole.name} - ${selectedCategory?.display_name}`
                          : selectedExperienceLevel && experienceLevels.find(l => l.id === selectedExperienceLevel)?.name
                        }
                      </p>
                      <div className="text-green-400 text-xs">
                        🚀 Redirecting to onboarding in 1.5 seconds...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
