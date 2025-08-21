import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, UsersIcon, UserIcon, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabaseRoleService, Role, RoleCategory } from '../../services/supabaseRoleService';
import { supabaseSetupService } from '../../services/supabaseSetupService';
import { useAuth } from '../../contexts/AuthContext';

interface SelectedRoleData {
  role: Role;
  category: RoleCategory;
}

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [roleCategories, setRoleCategories] = useState<RoleCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState<string | null>(null);
  const [renderCount, setRenderCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Debug: Log component re-renders and increment counter
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, []); // Only run once on mount
  
  // Debug logging (only when states change)
  useEffect(() => {
    console.log('🔄 RoleSelection component rendered with states:', {
      renderCount,
      selectedCategory: selectedCategory?.id,
      selectedSpecialization,
      selectedExperienceLevel,
      roleCategoriesCount: roleCategories.length
    });
  }, [renderCount, selectedCategory, selectedSpecialization, selectedExperienceLevel, roleCategories.length]);

  // Debug function to check if user has role data
  const checkUserRoleData = async () => {
    if (!user) {
      console.log('❌ No user found');
      return;
    }
    
    console.log('🔍 Checking role data for user:', user.email);
    try {
      const response = await supabaseRoleService.getUserRole(user.id);
      console.log('📊 User role data response:', response);
      
      if (response.success && response.data) {
        console.log('✅ User has role data:', response.data);
        alert(`User has role data:\nRole: ${response.data.role_id}\nCategory: ${response.data.category_id}\nSpecialization: ${response.data.specialization}\nExperience: ${response.data.experience_level}`);
      } else if (response.success && !response.data) {
        console.log('ℹ️ User has no role data');
        alert('User has no role data in database');
      } else {
        console.log('❌ Error checking user role:', response.message);
        alert('Error checking user role: ' + response.message);
      }
    } catch (error) {
      console.error('❌ Error checking user role:', error);
      alert('Error checking user role');
    }
  };

  // Debug function to check any user by UUID
  const checkSpecificUserRole = async () => {
    const specificUserId = 'f077f485-a1d9-4d52-9caa-8a85fd615f63';
    console.log('🔍 Checking role data for specific user ID:', specificUserId);
    
    try {
      const response = await supabaseRoleService.getUserRole(specificUserId);
      console.log('📊 Specific user role data response:', response);
      
      if (response.success && response.data) {
        console.log('✅ Specific user has role data:', response.data);
        alert(`User ${specificUserId} has role data:\nRole: ${response.data.role_id}\nCategory: ${response.data.category_id}\nSpecialization: ${response.data.specialization}\nExperience: ${response.data.experience_level}`);
      } else if (response.success && !response.data) {
        console.log('ℹ️ Specific user has no role data');
        alert(`User ${specificUserId} has no role data in database`);
      } else {
        console.log('❌ Error checking specific user role:', response.message);
        alert('Error checking specific user role: ' + response.message);
      }
    } catch (error) {
      console.error('❌ Error checking specific user role:', error);
      alert('Error checking specific user role');
    }
  };

  // Function to check current logged-in user's role
  const checkCurrentUserRole = async () => {
    if (!user) {
      console.log('❌ No user logged in');
      alert('No user logged in');
      return;
    }
    
    console.log('🔍 Checking current user role for:', user.email);
    try {
      const response = await supabaseRoleService.getUserRole(user.id);
      console.log('📊 Current user role data response:', response);
      
      if (response.success && response.data) {
        console.log('✅ Current user has role data:', response.data);
        
        // Get role details
        const roleResponse = await supabaseRoleService.getRoles();
        const role = roleResponse.data?.find(r => r.id === response.data?.role_id);
        
        // Get category details
        const categoryResponse = await supabaseRoleService.getRoleCategories(response.data.role_id);
        const category = categoryResponse.data?.find(c => c.id === response.data?.category_id);
        
        alert(`Current User Role:\n\n👤 User: ${user.email}\n🎯 Role: ${role?.name || 'Unknown'}\n📂 Category: ${category?.name || 'Unknown'}\n🔧 Specialization: ${response.data.specialization || 'None'}\n⭐ Experience: ${response.data.experience_level || 'None'}`);
      } else if (response.success && !response.data) {
        console.log('ℹ️ Current user has no role data');
        alert(`Current user (${user.email}) has no role data in database.\n\nPlease complete the role selection process.`);
      } else {
        console.log('❌ Error checking current user role:', response.message);
        alert('Error checking current user role: ' + response.message);
      }
    } catch (error) {
      console.error('❌ Error checking current user role:', error);
      alert('Error checking current user role');
    }
  };

  // Specializations data
  const getSpecializations = (categoryId: string) => {
    console.log('🔍 Getting specializations for category:', categoryId);
    
    switch (categoryId) {
      case 'software-development':
        return [
          {
            id: 'developer-engineer',
            name: 'Developer/Engineer',
            description: 'Software development, coding, and technical implementation',
            icon: '💻'
          }
        ];
      case 'creative-design':
        return [
          {
            id: 'designer',
            name: 'Designer',
            description: 'UI/UX design, visual design, and user experience',
            icon: '🎨'
          }
        ];
      case 'quality-assurance':
        return [
          {
            id: 'qa-tester',
            name: 'QA / Tester',
            description: 'Quality assurance, testing, and bug detection',
            icon: '🐛'
          }
        ];
      case 'product-management':
        return [
          {
            id: 'product-pm',
            name: 'Product / PM',
            description: 'Product management, strategy, and project coordination',
            icon: '📋'
          }
        ];
      default:
        console.log('⚠️ No specializations found for category:', categoryId);
        return [];
    }
  };

  // Experience levels data
  const experienceLevels = [
    {
      id: 'junior',
      name: 'Junior',
      description: 'Early career professionals building foundational skills',
      years: '0–2 years',
      tagline: 'Potential builders'
    },
    {
      id: 'mid-level',
      name: 'Mid-level',
      description: 'Experienced professionals driving development',
      years: '2–6 years',
      tagline: 'Core contributors'
    },
    {
      id: 'senior',
      name: 'Senior',
      description: 'Expert professionals leading teams and projects',
      years: '6–10 years',
      tagline: 'Lead developers / team leads'
    },
    {
      id: 'principal',
      name: 'Principal / Architect',
      description: 'Strategic leaders shaping technical direction',
      years: '10+ years',
      tagline: 'Strategic leaders'
    }
  ];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        console.log('Fetching roles from Supabase...');
        const response = await supabaseRoleService.getRoles();
        console.log('Supabase Response:', response);
        
        if (response.success && response.data && response.data.length > 0) {
          console.log('Role options received:', response.data);
          setRoleOptions(response.data);
        } else {
          console.log('No roles found, setting up database...');
          // Try to set up the database with sample data
          const setupResult = await supabaseSetupService.setupDatabase();
          if (setupResult.success) {
            // Fetch roles again after setup
            const retryResponse = await supabaseRoleService.getRoles();
            if (retryResponse.success && retryResponse.data) {
              console.log('Roles loaded after setup:', retryResponse.data);
              setRoleOptions(retryResponse.data);
            } else {
              setError('Failed to load roles even after database setup');
            }
          } else {
            setError('Failed to set up database: ' + setupResult.message);
          }
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to load roles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleCardClick = async (role: Role) => {
    console.log('🎯 Role card clicked:', role);
    
    if (flippedCard === role.id) {
      // If card is already flipped, flip it back
      setFlippedCard(null);
      setRoleCategories([]);
      setSelectedCategory(null);
      return;
    }

    // Flip the card and fetch categories
    setFlippedCard(role.id);
    setSelectedRole(role);
    setSelectedCategory(null);
    setIsLoadingCategories(true);
    setRoleCategories([]);

    try {
      const response = await supabaseRoleService.getRoleCategories(role.id);
      console.log('📋 Categories response:', response);
      if (response.success && response.data) {
        setRoleCategories(response.data);
        console.log('✅ Categories set:', response.data);
      } else {
        console.error('Failed to fetch categories:', response.message);
        // Still show the card as flipped but with error state
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleCategorySelect = (category: RoleCategory) => {
    console.log('🎯 Category selected:', category);
    console.log('🔍 Category name check:', {
      categoryName: category.name,
      expectedName: 'software-development',
      matches: category.name === 'software-development'
    });
    
    setSelectedCategory(category);
    
    // For Software Development, automatically set specialization to Developer/Engineer
    if (category.name === 'software-development') {
      console.log('🚀 Auto-setting specialization for Software Development');
      setSelectedSpecialization('developer-engineer');
      setSelectedExperienceLevel(null); // Reset experience level
      console.log('✅ Specialization auto-set to developer-engineer');
    } else {
      console.log('⚠️ Not Software Development, resetting specialization');
      setSelectedSpecialization(null); // Reset specialization when category changes
      setSelectedExperienceLevel(null); // Reset experience level when category changes
    }
    
    // Debug: Check what specializations are available
    const specializations = getSpecializations(category.id);
    console.log('🔍 Available specializations:', specializations);
  };

  const handleSpecializationSelect = (specializationId: string) => {
    console.log('🎯 Specialization selected:', specializationId);
    setSelectedSpecialization(specializationId);
    setSelectedExperienceLevel(null); // Reset experience level when specialization changes
  };

  const handleExperienceLevelSelect = async (levelId: string) => {
    console.log('🎯 Experience level selected:', levelId);
    setSelectedExperienceLevel(levelId);
    
    // Auto-save to database when experience level is selected
    if (selectedRole && selectedCategory && selectedSpecialization && levelId && user) {
      try {
        console.log('🚀 Auto-saving complete selection to database...');
        
        // Save to Supabase database
        const dbSelectionData = {
          user_id: user.id,
          role_id: selectedRole.id,
          category_id: selectedCategory.id,
          specialization: selectedSpecialization,
          experience_level: levelId
        };
        
        const saveResponse = await supabaseRoleService.saveUserRole(dbSelectionData);
        if (saveResponse.success) {
          console.log('✅ Complete selection saved to database:', saveResponse.data);
          
          // Store in localStorage for persistence
          localStorage.setItem('roleSelection', JSON.stringify({
            role: selectedRole,
            category: selectedCategory,
            specialization: selectedSpecialization,
            experienceLevel: levelId,
            completeSelection: dbSelectionData
          }));
          
          // Show success message briefly, then auto-navigate
          console.log('🚀 Auto-navigating to onboarding based on role selection...');
          
          if (selectedRole.name === 'freelancer') {
            // For freelancers, go to developer onboarding
            console.log('🎯 Navigating to developer onboarding for freelancer');
            navigate('/developer-onboarding', { 
              state: { 
                role: selectedRole,
                category: selectedCategory,
                specialization: selectedSpecialization,
                experienceLevel: levelId,
                onboardingData: dbSelectionData
              }
            });
          } else if (selectedRole.name === 'client') {
            // For clients, go to client onboarding
            console.log('🎯 Navigating to client onboarding');
            navigate('/onboarding-stage', { 
              state: { 
                role: selectedRole,
                category: selectedCategory,
                onboardingData: dbSelectionData
              }
            });
          } else if (selectedRole.name === 'agency') {
            // For agencies, go to agency onboarding
            console.log('🎯 Navigating to agency onboarding');
            navigate('/agency-onboarding', { 
              state: { 
                role: selectedRole,
                category: selectedCategory,
                onboardingData: dbSelectionData
              }
            });
          }
          
        } else {
          console.error('❌ Failed to save to database:', saveResponse.message);
          alert('Failed to save selection. Please try again.');
        }
      } catch (error) {
        console.error('❌ Error saving selection:', error);
        alert('Error saving selection. Please try again.');
      }
    }
  };

  const handleContinue = async () => {
    if (!selectedRole || !selectedCategory || !user) return;
    
    // For freelancers, require specialization and experience level
    if (selectedRole.name === 'freelancer' && 
        (!selectedSpecialization || !selectedExperienceLevel)) {
      alert('Please select both specialization and experience level before continuing.');
      return;
    }
    
    try {
      // Store the complete selection in localStorage
      const selectionData = {
        role: selectedRole,
        category: selectedCategory,
        specialization: selectedSpecialization,
        experienceLevel: selectedExperienceLevel
      };
      localStorage.setItem('roleSelection', JSON.stringify(selectionData));
      
      // Save to Supabase database
      const dbSelectionData = {
        user_id: user.id,
        role_id: selectedRole.id,
        category_id: selectedCategory.id,
        specialization: selectedSpecialization || '',
        experience_level: selectedExperienceLevel || ''
      };
      
      const saveResponse = await supabaseRoleService.saveUserRole(dbSelectionData);
      if (!saveResponse.success) {
        console.error('Failed to save role selection:', saveResponse.message);
        // Continue anyway, but log the error
      } else {
        console.log('Role selection saved to Supabase database:', saveResponse.data);
      }
      
      // Debug logging
      console.log('Complete selection:', {
        role: selectedRole.name,
        category: selectedCategory.name,
        specialization: selectedSpecialization,
        experienceLevel: selectedExperienceLevel
      });
      
      // Navigate based on role
      if (selectedRole.name === 'freelancer') {
        console.log('Navigating to developer onboarding for freelancer');
        // Navigate directly to developer onboarding (no more specialization page)
        navigate('/developer-onboarding', { 
          state: { 
            role: selectedRole.id, 
            category: selectedCategory.id,
            specialization: selectedSpecialization,
            experienceLevel: selectedExperienceLevel
          }
        });
      } else if (selectedRole.name === 'client') {
        console.log('Navigating to client onboarding');
        navigate('/onboarding-stage');
      } else if (selectedRole.name === 'agency') {
        console.log('Navigating to agency onboarding');
        navigate('/agency-onboarding', { 
          state: { 
            role: selectedRole.id, 
            category: selectedCategory.id 
          }
        });
      }
      
    } catch (error) {
      console.error('Error continuing to next step:', error);
      alert('Failed to continue. Please try again.');
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <UsersIcon size={24} className="text-blue-400" />;
      case 'user':
        return <UserIcon size={24} className="text-blue-400" />;
      case 'building':
        return <BuildingIcon size={24} className="text-blue-400" />;
      default:
        return <UserIcon size={24} className="text-blue-400" />;
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
        <div className="mb-6">
          <button 
            onClick={() => navigate('/')} 
            className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1"
          >
            ← Back to Home
          </button>
        </div>
        
        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 transition-all duration-300 ease-out border border-[#2a3344]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3 text-white">Choose your role</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Select the option that best describes you. We'll set up your
                onboarding journey accordingly.
              </p>
            </div>
            
            {/* Show all cards when none are flipped */}
            {!flippedCard && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
                {roleOptions.map((role) => (
                  <div 
                    key={role.id}
                    className="relative bg-[#171c33] border-2 border-gray-700 hover:border-gray-500 rounded-xl p-6 pb-8 cursor-pointer transition-all min-h-[320px] h-full flex flex-col hover:shadow-lg hover:shadow-blue-500/10"
                    onClick={() => handleCardClick(role)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        {getIconComponent(role.icon)}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{role.name}</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      {role.description}
                    </p>
                    <button className="w-full h-11 inline-flex items-center justify-center px-4 rounded-md text-sm font-medium mt-auto bg-[#2a3344] text-gray-300 hover:bg-[#374151] transition-colors">
                      {role.button_label}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Show expanded flipped card when one is selected */}
            {flippedCard && selectedRole && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-[#171c33] border-2 border-blue-500 rounded-xl p-8 shadow-lg shadow-blue-500/20">
                  {/* Header with back button */}
                  <div className="flex justify-between items-start mb-6">
                    <button 
                      onClick={() => {
                        setFlippedCard(null);
                        setRoleCategories([]);
                        setSelectedCategory(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span>Back to Roles</span>
                    </button>
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                      {getIconComponent(selectedRole.icon)}
                    </div>
                  </div>
                  
                  {/* Role title and description */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-3 text-white">{selectedRole.name}</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                      {selectedRole.description}
                    </p>
                  </div>
                  
                  {/* Categories section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-6 text-white text-center">
                      Choose your category
                    </h3>
                    
                    {/* State debug info */}
                    <div className="text-xs text-gray-400 text-center mb-4 p-2 bg-gray-800 rounded">
                      <p>Current State: selectedCategory = {selectedCategory ? `"${selectedCategory.name}" (${selectedCategory.id})` : 'NULL'}</p>
                      <p>Total Categories: {roleCategories.length}</p>
                      <p>Specialization: {selectedSpecialization || 'NULL'}</p>
                      <p>Experience Level: {selectedExperienceLevel || 'NULL'}</p>
                      <p>Auto-specialization: {selectedCategory?.name === 'software-development' ? 'ENABLED' : 'DISABLED'}</p>
                    </div>
                    
                    {isLoadingCategories ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="text-gray-400">Loading categories...</div>
                      </div>
                    ) : roleCategories.length > 0 ? (
                      <div className="flex flex-row gap-4 justify-center items-stretch">
                        {roleCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              console.log('🖱️ Category button clicked:', category);
                              handleCategorySelect(category);
                            }}
                            className={`flex-1 max-w-xs p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                              selectedCategory?.id === category.id
                                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                : 'border-gray-700 bg-[#2a3344] hover:border-gray-500 hover:bg-[#374151]'
                            }`}
                          >
                            <h4 className="text-lg font-semibold mb-2 text-white">{category.name}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{category.description}</p>
                            {selectedCategory?.id === category.id && (
                              <div className="mt-3 flex justify-center">
                                <CheckCircle size={20} className="text-blue-500" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center h-32 flex items-center justify-center">
                        No categories available
                      </div>
                    )}
                  </div>

                  {/* Specialization Selection - Only show after category is selected but before specialization is auto-selected */}
                  {selectedCategory && !selectedSpecialization && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 text-white text-center">
                        Choose your specialization
                      </h3>
                      
                      {/* Debug info */}
                      <div className="text-xs text-gray-400 text-center mb-4">
                        Category ID: {selectedCategory.id} | 
                        Available specializations: {getSpecializations(selectedCategory.id).length} |
                        selectedCategory state: {JSON.stringify(selectedCategory)} |
                        selectedSpecialization state: {selectedSpecialization}
                      </div>
                      
                      {/* Test button to manually trigger specialization selection */}
                      <div className="text-center mb-4">
                        <button
                          onClick={() => {
                            console.log('🧪 Test button clicked');
                            console.log('Current selectedCategory:', selectedCategory);
                            console.log('getSpecializations result:', getSpecializations(selectedCategory.id));
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded text-sm"
                        >
                          🧪 Test Specialization Function
                        </button>
                      </div>
                      
                      {/* Hardcoded test - always show this to verify rendering */}
                      <div className="text-center mb-4 p-4 bg-yellow-600/20 border border-yellow-600/30 rounded">
                        <p className="text-yellow-400 text-sm">
                          🟡 HARDCODED TEST: This should always show when selectedCategory exists
                        </p>
                        <p className="text-white text-xs">
                          selectedCategory: {selectedCategory ? 'EXISTS' : 'NULL'} | 
                          ID: {selectedCategory?.id} | 
                          Name: {selectedCategory?.name}
                        </p>
                        
                        {/* Manual state test buttons */}
                        <div className="mt-3 space-y-2">
                          <button
                            onClick={() => {
                              console.log('🧪 Setting specialization to developer-engineer');
                              setSelectedSpecialization('developer-engineer');
                            }}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs mr-2"
                          >
                            Set Specialization
                          </button>
                          <button
                            onClick={() => {
                              console.log('🧪 Setting experience to junior');
                              setSelectedExperienceLevel('junior');
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                          >
                            Set Experience
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-row gap-4 justify-center items-stretch">
                        {getSpecializations(selectedCategory.id).map((specialization) => (
                          <button
                            key={specialization.id}
                            onClick={() => handleSpecializationSelect(specialization.id)}
                            className={`flex-1 max-w-xs p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                              selectedSpecialization === specialization.id
                                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                : 'border-gray-700 bg-[#2a3344] hover:border-gray-500 hover:bg-[#374151]'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-3xl mb-3">{specialization.icon}</div>
                              <h4 className="text-lg font-semibold mb-2 text-white">{specialization.name}</h4>
                              <p className="text-sm text-gray-400 leading-relaxed">{specialization.description}</p>
                              {selectedSpecialization === specialization.id && (
                                <div className="mt-3 flex justify-center">
                                  <CheckCircle size={20} className="text-blue-500" />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      {/* Show if no specializations found */}
                      {getSpecializations(selectedCategory.id).length === 0 && (
                        <div className="text-center text-gray-400 py-8">
                          No specializations available for this category
                        </div>
                      )}
                    </div>
                  )}

                  {/* Auto-selected specialization message */}
                  {selectedCategory && selectedSpecialization && (
                    <div className="mb-8">
                      <div className="text-center p-4 bg-green-600/20 border border-green-600/30 rounded">
                        <h3 className="text-green-400 font-semibold mb-2">
                          ✅ Specialization Auto-Selected
                        </h3>
                        <p className="text-white text-sm">
                          Category: <span className="text-green-400">{selectedCategory.name}</span> → 
                          Specialization: <span className="text-green-400">
                            {getSpecializations(selectedCategory.id).find(s => s.id === selectedSpecialization)?.name}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Experience Level Selection - Only show after specialization is selected */}
                  {selectedSpecialization && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 text-white text-center">
                        Choose your experience level
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {experienceLevels.map((level) => (
                          <button
                            key={level.id}
                            onClick={() => handleExperienceLevelSelect(level.id)}
                            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                              selectedExperienceLevel === level.id
                                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                : 'border-gray-700 bg-[#2a3344] hover:border-gray-500 hover:bg-[#374151]'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                                  {level.id === 'junior' ? '🟢' : 
                                   level.id === 'mid-level' ? '🔵' : 
                                   level.id === 'senior' ? '🟡' : '🟣'}
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
                    </div>
                  )}

                  {/* Complete Selection Success - Show after experience level is selected */}
                  {selectedExperienceLevel && (
                    <div className="mb-8">
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-8 text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-green-400 mb-4">
                          Selection Complete!
                        </h3>
                        <p className="text-gray-300 text-lg mb-6">
                          Your role selection has been saved and you're ready to start your onboarding journey!
                        </p>
                        
                        {/* Selection Summary */}
                        <div className="bg-[#1a2234] rounded-lg p-6 mb-6 max-w-2xl mx-auto">
                          <h4 className="text-lg font-semibold text-white mb-4">Your Selection Summary</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Role:</span>
                                <span className="text-white font-medium">{selectedRole?.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Category:</span>
                                <span className="text-white font-medium">{selectedCategory?.name}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Specialization:</span>
                                <span className="text-white font-medium">
                                  {getSpecializations(selectedCategory?.id || '').find(s => s.id === selectedSpecialization)?.name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Experience Level:</span>
                                <span className="text-white font-medium">
                                  {experienceLevels.find(l => l.id === selectedExperienceLevel)?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                          >
                            Go to Dashboard
                          </button>
                          <button
                            onClick={() => navigate('/profile-setup')}
                            className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                          >
                            Start Profile Setup
                          </button>
                          <button
                            onClick={() => navigate('/skill-assessment')}
                            className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors"
                          >
                            Take Skill Assessment
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Continue Button - Show based on role type */}
            {selectedRole && selectedCategory && (
              <div className="flex flex-col items-center">
                {/* For freelancers, show complete selection */}
                {selectedRole.name === 'freelancer' ? (
                  <>
                    {selectedSpecialization && selectedExperienceLevel ? (
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 w-full max-w-md">
                        <div className="text-center">
                          <h3 className="text-green-400 font-semibold mb-2">🎉 Selection Complete!</h3>
                          <p className="text-gray-300 text-sm mb-3">
                            Role: <span className="text-white">{selectedRole.name}</span><br/>
                            Category: <span className="text-white">{selectedCategory.name}</span><br/>
                            Specialization: <span className="text-white">
                              {getSpecializations(selectedCategory.id).find(s => s.id === selectedSpecialization)?.name}
                            </span><br/>
                            Experience Level: <span className="text-white">
                              {experienceLevels.find(l => l.id === selectedExperienceLevel)?.name}
                            </span>
                          </p>
                          <div className="text-green-400 text-sm font-medium">
                            🚀 Redirecting to onboarding...
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6 w-full max-w-md">
                        <div className="text-center">
                          <h3 className="text-blue-400 font-semibold mb-2">Complete Your Selection</h3>
                          <p className="text-gray-300 text-sm">
                            {!selectedSpecialization ? 'Please select a specialization' : 'Please select an experience level'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => {}} // Disabled - auto-navigation on experience selection
                      disabled={true}
                      className="px-8 py-3 rounded-md font-medium transition-colors flex items-center gap-2 bg-gray-600 text-gray-400 cursor-not-allowed"
                    >
                      {selectedSpecialization && selectedExperienceLevel ? (
                        <>
                          Redirecting to Onboarding...
                          <ArrowRight size={20} />
                        </>
                      ) : (
                        <>
                          {!selectedSpecialization ? 'Select Specialization' : 'Select Experience Level'}
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  /* For non-freelancers, show basic selection */
                  <>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 w-full max-w-md">
                      <div className="text-center">
                        <h3 className="text-green-400 font-semibold mb-2">Selection Complete!</h3>
                        <p className="text-gray-300 text-sm">
                          Role: <span className="text-white">{selectedRole.name}</span><br/>
                          Category: <span className="text-white">{selectedCategory.name}</span>
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleContinue}
                      className="px-8 py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                      Continue to Onboarding
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Debug info */}
                <div className="mt-4 text-xs text-gray-400 text-center">
                  <p>Role ID: {selectedRole.id}</p>
                  <p>Category ID: {selectedCategory.id}</p>
                  {selectedSpecialization && <p>Specialization: {selectedSpecialization}</p>}
                  {selectedExperienceLevel && <p>Experience Level: {selectedExperienceLevel}</p>}
                </div>
                
                {/* Debug button to check user role data */}
                <div className="mt-4 text-center space-y-2">
                  <button
                    onClick={checkCurrentUserRole}
                    className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    🔍 Check Current User Role
                  </button>
                  
                  <button
                    onClick={checkUserRoleData}
                    className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 ml-2"
                  >
                    🔍 Check Current User Role Data
                  </button>
                  
                  <button
                    onClick={checkSpecificUserRole}
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 ml-2"
                  >
                    🔍 Check Specific User: f077f485...
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
