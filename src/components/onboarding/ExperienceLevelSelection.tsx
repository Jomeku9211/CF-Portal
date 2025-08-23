import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, TrendingUp, Users, Crown, Star } from 'lucide-react';
import { universalOnboardingService } from '../../services/universalOnboardingService';
import { useAuth } from '../../contexts/AuthContext';

interface ExperienceLevel {
  id: string;
  name: string;
  description: string;
  years: string;
  tagline: string;
  icon: React.ReactNode;
  features: string[];
}

const ExperienceLevelSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [roleSelection, setRoleSelection] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get role selection from location state or localStorage
    const stateRoleSelection = location.state;
    const storedRoleSelection = localStorage.getItem('roleSelection');
    
    console.log('🔍 ExperienceLevelSelection useEffect triggered');
    console.log('📍 Location state:', stateRoleSelection);
    console.log('💾 Stored role selection:', storedRoleSelection);
    
    if (stateRoleSelection && stateRoleSelection.role) {
      console.log('📥 Received role selection from navigation:', stateRoleSelection);
      setRoleSelection(stateRoleSelection);
      setIsLoading(false);
    } else if (storedRoleSelection) {
      try {
        const parsed = JSON.parse(storedRoleSelection);
        if (parsed.role) {
          console.log('📥 Using stored role selection:', parsed);
          setRoleSelection(parsed);
          setIsLoading(false);
        } else {
          console.log('❌ Stored selection missing role, redirecting');
          setIsLoading(false);
          setTimeout(() => navigate('/role-selection'), 100);
        }
      } catch (error) {
        console.error('❌ Error parsing stored selection:', error);
        setIsLoading(false);
        setTimeout(() => navigate('/role-selection'), 100);
      }
    } else {
      console.log('❌ No role selection found, redirecting to role selection');
      setIsLoading(false);
      setTimeout(() => navigate('/role-selection'), 100);
    }
  }, [location.state, navigate]);

  const experienceLevels: ExperienceLevel[] = [
    {
      id: 'junior',
      name: 'Junior',
      description: 'Early career professionals building foundational skills',
      years: '0–2 years',
      tagline: 'Potential builders',
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      features: [
        'Learning core technologies',
        'Building foundational skills',
        'Working under guidance',
        'Contributing to team projects'
      ]
    },
    {
      id: 'mid-level',
      name: 'Mid-level',
      description: 'Experienced professionals driving development',
      years: '2–6 years',
      tagline: 'Core contributors',
      icon: <Users className="w-8 h-8 text-blue-400" />,
      features: [
        'Independent project delivery',
        'Mentoring junior developers',
        'Technical decision making',
        'Cross-functional collaboration'
      ]
    },
    {
      id: 'senior',
      name: 'Senior',
      description: 'Expert professionals leading teams and projects',
      years: '6–10 years',
      tagline: 'Lead developers / team leads',
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      features: [
        'Leading development teams',
        'Architectural decision making',
        'Project planning & execution',
        'Stakeholder communication'
      ]
    },
    {
      id: 'principal',
      name: 'Principal / Architect',
      description: 'Strategic leaders shaping technical direction',
      years: '10+ years',
      tagline: 'Strategic leaders',
      icon: <Crown className="w-8 h-8 text-purple-400" />,
      features: [
        'Technical strategy & vision',
        'System architecture design',
        'Team leadership & mentoring',
        'Business impact focus'
      ]
    }
  ];

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleContinue = async () => {
    if (!selectedLevel || !roleSelection) {
      console.log('❌ Missing required data:', { selectedLevel, roleSelection });
      return;
    }

    try {
      // Store the complete selection including experience level
      const completeSelection = {
        ...roleSelection,
        experienceLevel: selectedLevel
      };
      localStorage.setItem('completeRoleSelection', JSON.stringify(completeSelection));

      // Initialize onboarding progress in the database
      if (user) {
        try {
          console.log('🚀 Initializing onboarding progress for user:', user.id);
          const progressResult = await universalOnboardingService.getOrCreateOnboardingProgress(
            user.id,
            roleSelection.role.id,
            roleSelection.category.id,
            'developer',
            selectedLevel
          );
          
          if (progressResult.success) {
            console.log('✅ Onboarding progress initialized:', progressResult.data);
          } else {
            console.log('⚠️ Onboarding progress initialization failed:', progressResult.message);
          }
        } catch (error) {
          console.error('❌ Error initializing onboarding progress:', error);
          // Continue with navigation even if progress tracking fails
        }
      }

      console.log('🚀 Navigating to role-specific onboarding with selection:', completeSelection);
      console.log('🔍 Role Selection Debug:', {
        roleName: roleSelection.role?.name,
        roleId: roleSelection.role?.id,
        fullRole: roleSelection.role,
        fullSelection: roleSelection
      });

      // ROUTING LOGIC:
      // - Service Provider → Developer Onboarding (regardless of experience level)
      // - Client/Agency → Client Onboarding (regardless of experience level)
      
      // Navigate to the appropriate onboarding flow based on role
      // Check both the name and id for service provider
      const isServiceProvider = roleSelection.role?.name === 'service-provider' || 
                               roleSelection.role?.id === 'service-provider' ||
                               roleSelection.role?.name?.toLowerCase().includes('service') ||
                               roleSelection.role?.name?.toLowerCase().includes('provider');
      
      console.log('🔍 Service Provider Check:', {
        roleName: roleSelection.role?.name,
        roleId: roleSelection.role?.id,
        isServiceProvider: isServiceProvider,
        nameCheck: roleSelection.role?.name === 'service-provider',
        idCheck: roleSelection.role?.id === 'service-provider'
      });
      
      if (isServiceProvider) {
        console.log('🎯 Routing to Developer Onboarding');
        const targetPath = '/developer-onboarding';
        console.log('📍 Target path:', targetPath);
        console.log('📤 Navigation state:', {
          role: roleSelection.role,
          category: roleSelection.category,
          experienceLevel: selectedLevel
        });
        
        // For service providers, go to developer onboarding
        navigate(targetPath, {
          state: {
            role: roleSelection.role,
            category: roleSelection.category,
            experienceLevel: selectedLevel
          }
        });
      } else {
        console.log('🎯 Routing to Client Onboarding');
        const targetPath = '/clientOnboarding';
        console.log('📍 Target path:', targetPath);
        console.log('📤 Navigation state:', {
          role: roleSelection.role,
          category: roleSelection.category,
          experienceLevel: selectedLevel
        });
        
        // For clients, agencies, or any other role, go to existing client onboarding flow
        navigate(targetPath, {
          state: {
            role: roleSelection.role,
            category: roleSelection.category,
            experienceLevel: selectedLevel
          }
        });
      }

    } catch (error) {
      console.error('Error continuing to next step:', error);
      alert('Failed to continue. Please try again.');
    }
  };

  // Show loading state while checking for role selection
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading experience level selection...</p>
        </div>
      </div>
    );
  }

  // If no role selection, show error (redirect will happen automatically)
  if (!roleSelection || !roleSelection.role) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">No role selection found. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <button
              onClick={() => navigate('/role-selection')}
              className="hover:text-blue-400 transition-colors"
            >
              Role Selection
            </button>
            <span>→</span>
            <span className="text-blue-400">Experience Level</span>
            <span>→</span>
            <span className="text-gray-500">
              {roleSelection.role.name === 'service-provider' ? 'Developer Onboarding' : 'Client Onboarding'}
            </span>
          </nav>
        </div>

        {/* Header with selection summary */}
        <div className="bg-[#1a2234] rounded-xl p-6 mb-8 border border-[#2a3344]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 text-white">Select Your Experience Level</h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              Choose the level that best represents your professional experience and expertise.
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div className="text-green-400 text-sm">Role</div>
                <div className="w-8 h-1 bg-green-500"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div className="text-green-400 text-sm">Category</div>
                <div className="w-8 h-1 bg-green-500"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div className="text-green-400 text-sm">Experience</div>
                <div className="w-8 h-1 bg-blue-500"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <div className="text-blue-400 text-sm">
                  {roleSelection.role.name === 'service-provider' ? 'Developer Profile' : 'Client Onboarding'}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 inline-block">
              <div className="text-center">
                <p className="text-blue-400 text-sm mb-1">Your Selection</p>
                <p className="text-white font-semibold">
                  {roleSelection.role?.name || 'Role'} → {roleSelection.category?.name || 'Category'}
                </p>
              </div>
            </div>
            
            {/* Next Step Information */}
            <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-4 inline-block">
              <div className="text-center">
                <p className="text-green-400 text-sm mb-1">Next Step</p>
                <p className="text-white font-semibold">
                  {roleSelection.role.name === 'service-provider' 
                    ? '→ Developer Onboarding' 
                    : '→ Client Onboarding Flow'
                  }
                </p>
                <p className="text-green-400 text-xs mt-1">
                  {roleSelection.role.name === 'service-provider' 
                    ? 'Complete your developer profile setup' 
                    : 'Complete your organization profile and project requirements'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {experienceLevels.map((level) => (
            <div
              key={level.id}
              className={`relative bg-[#171c33] border-2 rounded-xl p-6 cursor-pointer transition-all hover:border-gray-500 ${
                selectedLevel === level.id
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-gray-700'
              }`}
              onClick={() => handleLevelSelect(level.id)}
            >
              {/* Selection Check */}
              {selectedLevel === level.id && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  {level.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-white">{level.name}</h3>
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

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  Key Characteristics
                </h4>
                <ul className="space-y-1">
                  {level.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedLevel && (
          <div className="mt-auto pt-6">
            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {roleSelection.role.name === 'service-provider' 
                ? `Continue to Developer Onboarding (${experienceLevels.find(l => l.id === selectedLevel)?.name})`
                : `Continue to Client Onboarding (${experienceLevels.find(l => l.id === selectedLevel)?.name})`
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceLevelSelection;
