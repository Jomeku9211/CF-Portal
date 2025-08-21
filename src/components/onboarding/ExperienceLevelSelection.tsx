import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, TrendingUp, Users, Crown, Star } from 'lucide-react';

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
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [roleSelection, setRoleSelection] = useState<any>(null);

  useEffect(() => {
    // Get role selection from location state or localStorage
    const stateRoleSelection = location.state;
    const storedRoleSelection = localStorage.getItem('roleSelection');
    
    if (stateRoleSelection) {
      setRoleSelection(stateRoleSelection);
    } else if (storedRoleSelection) {
      setRoleSelection(JSON.parse(storedRoleSelection));
    } else {
      // Redirect back if no role selection
      navigate('/role-selection');
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
    if (!selectedLevel || !roleSelection) return;

    try {
      // Store the complete selection including experience level
      const completeSelection = {
        ...roleSelection,
        experienceLevel: selectedLevel
      };
      localStorage.setItem('completeRoleSelection', JSON.stringify(completeSelection));

      // Navigate to the appropriate onboarding flow based on role and experience
      if (roleSelection.role.id === 'freelancer') {
        // For service providers, go to developer onboarding
        navigate('/developer-onboarding', {
          state: {
            role: roleSelection.role.id,
            category: roleSelection.category.id,
            specialization: roleSelection.specialization,
            experienceLevel: selectedLevel
          }
        });
      } else {
        // For other roles, go to appropriate onboarding
        navigate('/onboarding-stage', {
          state: {
            role: roleSelection.role.id,
            category: roleSelection.category.id,
            experienceLevel: selectedLevel
          }
        });
      }

    } catch (error) {
      console.error('Error continuing to next step:', error);
      alert('Failed to continue. Please try again.');
    }
  };

  const handleBack = () => {
    // Go back to specialization selection if available, otherwise role selection
    if (roleSelection?.specialization) {
      navigate('/specialization-selection', {
        state: {
          role: roleSelection.role.id,
          category: roleSelection.category.id
        }
      });
    } else {
      navigate('/role-selection');
    }
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
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Header with selection summary */}
        <div className="bg-[#1a2234] rounded-xl p-6 mb-8 border border-[#2a3344]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 text-white">Select Your Experience Level</h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              Choose the level that best represents your professional experience and expertise.
            </p>
            
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 inline-block">
              <div className="text-center">
                <p className="text-blue-400 text-sm mb-1">Your Selection</p>
                <p className="text-white font-semibold">
                  {roleSelection.role.name} → {roleSelection.category.name}
                  {roleSelection.specialization && ` → ${roleSelection.specialization}`}
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
              Continue with {experienceLevels.find(l => l.id === selectedLevel)?.name} Level
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceLevelSelection;
