import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Building, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';
import { supabaseSetupService } from '../../services/supabaseSetupService';
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

export function RoleSelection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory | null>(null);
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
    const setupDatabase = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        console.log('🚀 Setting up database...');
        const setupResult = await supabaseSetupService.setupDatabase();
        
        if (setupResult.success) {
          console.log('✅ Database setup completed');
          await loadRoles();
        } else {
          console.error('❌ Database setup failed:', setupResult.message);
          setError('Database setup failed: ' + setupResult.message);
        }
      } catch (err) {
        console.error('❌ Setup error:', err);
        setError('Setup error: ' + err);
      } finally {
        setIsLoading(false);
      }
    };

    setupDatabase();
  }, []);

  const loadRoles = async () => {
    try {
      console.log('🔄 Loading roles...');
      const response = await supabaseRoleService.getRoles();
      
      if (response.success && response.data) {
        setRoleOptions(response.data);
        console.log('✅ Roles loaded:', response.data.length);
      } else {
        console.error('❌ Failed to load roles:', response.message);
        setError('Failed to load roles: ' + response.message);
      }
    } catch (err) {
      console.error('❌ Error loading roles:', err);
      setError('Error loading roles: ' + err);
    }
  };

  const handleRoleSelect = async (role: Role) => {
    console.log('🎯 Role selected:', role);
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
    setSelectedCategory(category);
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
        // Continue without specializations
      } else {
        setSpecializations(specializationsData || []);
        console.log('✅ Specializations loaded:', specializationsData?.length || 0);
      }
    } catch (err) {
      console.error('❌ Error loading specializations:', err);
      // Continue without specializations
    }
    
    // Load experience levels
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
          
          setTimeout(() => {
            if (selectedRole.name === 'service-provider') {
              navigate('/developer-onboarding', { 
                state: { 
                  role: selectedRole,
                  category: selectedCategory,
                  specialization: selectedSpecialization || 'not-applicable',
                  experienceLevel: levelId,
                  onboardingData: dbSelectionData
                }
              });
            } else if (selectedRole.name === 'client') {
              navigate('/clientOnboarding', { 
                state: { 
                  role: selectedRole,
                  category: selectedCategory,
                  specialization: selectedSpecialization || 'not-applicable',
                  experienceLevel: levelId,
                  onboardingData: dbSelectionData
                }
              });
            } else if (selectedRole.name === 'agency') {
              navigate('/agency-onboarding', { 
                state: { 
                  role: selectedRole,
                  category: selectedCategory,
                  specialization: selectedSpecialization || 'not-applicable',
                  experienceLevel: levelId,
                  onboardingData: dbSelectionData
                }
              });
            }
          }, 1500);
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

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-white">Loading roles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">Error: {error}</div>
          <button
            onClick={async () => {
              setError('');
              setIsLoading(true);
              try {
                const setupResult = await supabaseSetupService.setupDatabase();
                if (setupResult.success) {
                  const retryResponse = await supabaseRoleService.getRoles();
                  if (retryResponse.success && retryResponse.data) {
                    setRoleOptions(retryResponse.data);
                    setError('');
                  } else {
                    setError('Failed to load roles after setup');
                  }
                } else {
                  setError('Setup failed: ' + setupResult.message);
                }
              } catch (err) {
                setError('Setup error: ' + err);
              } finally {
                setIsLoading(false);
              }
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            Try Setup Database
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
                {roleOptions.map((role) => (
                  <div
                    key={role.id}
                    className="bg-[#2a3344] rounded-xl p-6 border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                    onClick={() => handleRoleSelect(role)}
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
                ))}
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
                        onClick={() => handleCategorySelect(category)}
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

            {/* Show experience level selection when specialization is selected (or when no specializations) */}
            {selectedRole && selectedCategory && (selectedSpecialization || specializations.length === 0) && !selectedExperienceLevel && (
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
                
                {/* Success message when experience level is selected */}
                {showSuccess && (
                  <div className="mt-6 text-center">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                      <div className="text-green-400 font-semibold mb-2">
                        🎉 Experience Level Selected!
                      </div>
                      <p className="text-white text-sm mb-2">
                        {selectedExperienceLevel && experienceLevels.find(l => l.id === selectedExperienceLevel)?.name}
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
