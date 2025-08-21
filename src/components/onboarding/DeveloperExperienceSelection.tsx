import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Star, Clock, Users, Award } from 'lucide-react';
import { roleSelectionService, RoleSelectionData } from '@/services/roleSelectionService';

interface ExperienceLevel {
  id: string;
  name: string;
  description: string;
  years: string;
  icon: React.ReactNode;
  features: string[];
  recommended: boolean;
}

export function DeveloperExperienceSelection() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [roleSelection, setRoleSelection] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the role selection from localStorage
    const stored = localStorage.getItem('roleSelection');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setRoleSelection(data);
      } catch (error) {
        console.error('Error parsing role selection:', error);
        navigate('/role-selection');
      }
    } else {
      navigate('/role-selection');
    }
  }, [navigate]);

  const experienceLevels: ExperienceLevel[] = [
    {
      id: 'junior',
      name: 'Junior Developer',
      description: 'Entry-level developer with 0-2 years of experience',
      years: '0-2 years',
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      features: [
        'Basic programming fundamentals',
        'Version control (Git)',
        'Team collaboration',
        'Code review participation',
        'Learning and growth focused'
      ],
      recommended: false
    },
    {
      id: 'mid',
      name: 'Mid-Level Developer',
      description: 'Developer with 3-7 years of experience',
      years: '3-7 years',
      icon: <Users className="w-6 h-6 text-blue-400" />,
      features: [
        'Advanced programming concepts',
        'System design principles',
        'Code review leadership',
        'Mentoring junior developers',
        'Project ownership'
      ],
      recommended: true
    },
    {
      id: 'senior',
      name: 'Senior Developer',
      description: 'Experienced developer with 8+ years of experience',
      years: '8+ years',
      icon: <Award className="w-6 h-6 text-purple-400" />,
      features: [
        'Architecture design',
        'Technical leadership',
        'Project management',
        'Team building',
        'Strategic planning'
      ],
      recommended: false
    },
    {
      id: 'principal',
      name: 'Principal Developer',
      description: 'Top-level developer with extensive experience and leadership',
      years: '10+ years',
      icon: <Award className="w-6 h-6 text-red-400" />,
      features: [
        'Strategic technical vision',
        'Multiple team leadership',
        'Technology strategy',
        'Mentoring and coaching',
        'Industry thought leadership'
      ],
      recommended: false
    }
  ];

  const handleExperienceSelect = (experienceId: string) => {
    setSelectedExperience(experienceId);
  };

  const handleContinue = async () => {
    if (!selectedExperience || !roleSelection) return;

    try {
      // Store the complete selection
      const completeSelection = {
        ...roleSelection,
        experience: selectedExperience
      };
      localStorage.setItem('completeRoleSelection', JSON.stringify(completeSelection));

      // Save to database with experience level
      const dbSelectionData: RoleSelectionData = {
        roleId: roleSelection.role.id,
        categoryId: roleSelection.category.id,
        levelId: selectedExperience, // This maps to the role level ID
        userId: undefined // Will be set when user is authenticated
      };
      
      const saveResponse = await roleSelectionService.saveRoleSelection(dbSelectionData);
      if (!saveResponse.success) {
        console.error('Failed to save experience selection:', saveResponse.message);
        // Continue anyway, but log the error
      } else {
        console.log('Experience selection saved to database:', saveResponse.data);
      }

      // Navigate to the onboarding flow
      navigate('/developer-onboarding', { 
        state: { 
          role: roleSelection.role.id,
          category: roleSelection.category.id,
          experience: selectedExperience
        }
      });

    } catch (error) {
      console.error('Error continuing to onboarding:', error);
      alert('Failed to continue. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/role-selection');
  };

  if (!roleSelection) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1"
          >
            ← Back to Role Selection
          </button>
        </div>

        {/* Header with selection summary */}
        <div className="bg-[#1a2234] rounded-xl p-6 mb-8 border border-[#2a3344]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 text-white">Select Your Experience Level</h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              Help us understand your experience level to provide the best onboarding experience.
            </p>
            
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 inline-block">
              <div className="text-center">
                <p className="text-blue-400 text-sm mb-1">Selected Role</p>
                <p className="text-white font-semibold">
                  {roleSelection.role.name} → {roleSelection.category.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {experienceLevels.map((level) => (
            <div
              key={level.id}
              className={`relative bg-[#171c33] border-2 rounded-xl p-6 cursor-pointer transition-all hover:border-gray-500 ${
                selectedExperience === level.id
                  ? 'border-green-500 shadow-lg shadow-green-500/20'
                  : 'border-gray-700'
              }`}
              onClick={() => handleExperienceSelect(level.id)}
            >
              {/* Recommended Badge */}
              {level.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Recommended
                  </div>
                </div>
              )}

              {/* Selection Check */}
              {selectedExperience === level.id && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              )}

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {level.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white">{level.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{level.description}</p>
                
                <div className="bg-[#2a3344] rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-center gap-2 text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{level.years}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {level.features.map((feature, index) => (
                    <div key={index} className="text-xs text-gray-400 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedExperience && (
          <div className="flex flex-col items-center">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 w-full max-w-md">
              <div className="text-center">
                <h3 className="text-green-400 font-semibold mb-2">Experience Level Selected!</h3>
                <p className="text-gray-300 text-sm">
                  Role: <span className="text-white">{roleSelection.role.name}</span><br/>
                  Category: <span className="text-white">{roleSelection.category.name}</span><br/>
                  Experience: <span className="text-white">
                    {experienceLevels.find(l => l.id === selectedExperience)?.name}
                  </span>
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
          </div>
        )}
      </div>
    </div>
  );
}
