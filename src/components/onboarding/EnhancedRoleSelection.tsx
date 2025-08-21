import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, UsersIcon, UserIcon, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { roleService, RoleOption } from '@/services/roleService';
import { roleCategoryService, RoleCategory } from '@/services/roleCategoryService';
import { roleSelectionService, RoleSelectionData } from '@/services/roleSelectionService';
import { useAuth } from '@/contexts/AuthContext';

interface SelectedRoleData {
  role: RoleOption;
  category: RoleCategory;
}

export function EnhancedRoleSelection() {
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [roleCategories, setRoleCategories] = useState<RoleCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        console.log('Fetching roles from API...');
        const response = await roleService.getRoleOptions();
        console.log('API Response:', response);
        
        if (response.success && response.data) {
          console.log('Role options received:', response.data);
          setRoleOptions(response.data);
        } else {
          console.error('Failed to fetch roles:', response.message);
          setError(response.message || 'Failed to load roles');
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

  const handleCardClick = async (role: RoleOption) => {
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
      const response = await roleCategoryService.getRoleCategories(role.id);
      if (response.success && response.data) {
        setRoleCategories(response.data);
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
    setSelectedCategory(category);
  };

  const handleContinue = async () => {
    if (!selectedRole || !selectedCategory) return;
    
    try {
      // Store the selection in localStorage for the next step
      const selectionData: SelectedRoleData = {
        role: selectedRole,
        category: selectedCategory
      };
      localStorage.setItem('roleSelection', JSON.stringify(selectionData));
      
      // Save to database
      const dbSelectionData: RoleSelectionData = {
        roleId: selectedRole.id,
        categoryId: selectedCategory.id,
        userId: user?.id
      };
      
      const saveResponse = await roleSelectionService.saveRoleSelection(dbSelectionData);
      if (!saveResponse.success) {
        console.error('Failed to save role selection:', saveResponse.message);
        // Continue anyway, but log the error
      } else {
        console.log('Role selection saved to database:', saveResponse.data);
      }
      
      // Navigate based on role and category
      if (selectedRole.id === 'freelancer' && selectedCategory.name === 'Developer') {
        // Navigate to experience selection for developers
        navigate('/developer-experience');
      } else if (selectedRole.id === 'client') {
        // Navigate to client onboarding
        navigate('/onboarding-stage');
      } else {
        // For other combinations, navigate to a generic onboarding
        navigate('/onboarding', { 
          state: { role: selectedRole.id, category: selectedCategory.id }
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
        <div className="text-red-400">Error: {error}</div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
              {roleOptions.map((role) => (
                <div 
                  key={role.id}
                  className={`relative bg-[#171c33] border-2 rounded-xl p-6 pb-8 cursor-pointer transition-all min-h-[320px] h-full flex flex-col ${
                    selectedRole?.id === role.id 
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`} 
                  onClick={() => handleCardClick(role)}
                >
                  {/* Front of card */}
                  <div className={`transition-all duration-500 ${flippedCard === role.id ? 'opacity-0 rotate-y-180' : 'opacity-100'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        {getIconComponent(role.icon)}
                      </div>
                      {selectedRole?.id === role.id && <CheckCircle size={20} className="text-blue-500" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{role.name}</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      {role.description}
                    </p>
                    <button className={`w-full h-11 inline-flex items-center justify-center px-4 rounded-md text-sm font-medium mt-auto ${
                      selectedRole?.id === role.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-[#2a3344] text-gray-300'
                    }`}>
                      {role.buttonLabel}
                    </button>
                  </div>

                  {/* Back of card - Role Categories */}
                  <div className={`absolute inset-0 p-6 transition-all duration-500 ${flippedCard === role.id ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCard(null);
                          setRoleCategories([]);
                          setSelectedCategory(null);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        {getIconComponent(role.icon)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-white">{role.name} Categories</h3>
                    
                    {isLoadingCategories ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="text-gray-400">Loading categories...</div>
                      </div>
                    ) : roleCategories.length > 0 ? (
                      <div className="space-y-3">
                        {roleCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategorySelect(category);
                            }}
                            className={`w-full p-3 text-left rounded-lg transition-colors ${
                              selectedCategory?.id === category.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-[#2a3344] hover:bg-[#374151] text-gray-300'
                            }`}
                          >
                            <h4 className="font-medium mb-1">{category.name}</h4>
                            <p className="text-sm opacity-80">{category.description}</p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center h-32 flex items-center justify-center">
                        No categories available
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button - Only show when both role and category are selected */}
            {selectedRole && selectedCategory && (
              <div className="flex flex-col items-center">
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
                  Continue to Next Step
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
