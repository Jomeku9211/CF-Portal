import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Code, Palette, Bug, Briefcase } from 'lucide-react';

interface Specialization {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export function SpecializationSelection() {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState<string>('');
  const [roleSelection, setRoleSelection] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('SpecializationSelection component mounted');
    
    // Get the role selection from localStorage
    const stored = localStorage.getItem('roleSelection');
    console.log('Stored role selection:', stored);
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setRoleSelection(data);
        console.log('Role selection loaded:', data);
      } catch (error) {
        console.error('Error parsing role selection:', error);
        navigate('/role-selection');
      }
    } else {
      console.log('No stored role selection found, redirecting to role-selection');
      navigate('/role-selection');
    }
  }, [navigate]); // Removed location.state dependency to prevent re-mounting

  // Get specializations based on selected category
  const getSpecializations = (): Specialization[] => {
    if (!roleSelection?.category?.id) return [];
    
    console.log('Getting specializations for category:', roleSelection.category.id);
    
    switch (roleSelection.category.id) {
      case 'software-development':
        return [
          {
            id: 'developer',
            name: 'Developer/Engineer',
            description: 'Software development, coding, and technical implementation',
            icon: <Code className="w-8 h-8 text-blue-400" />,
            features: [
              'Frontend & Backend Development',
              'Mobile & Web Applications',
              'Database & API Design',
              'DevOps & Cloud Infrastructure'
            ]
          }
        ];
      
      case 'creative-design':
        return [
          {
            id: 'designer',
            name: 'Designer',
            description: 'UI/UX design, visual design, and user experience',
            icon: <Palette className="w-8 h-8 text-purple-400" />,
            features: [
              'User Interface Design',
              'User Experience Design',
              'Visual & Graphic Design',
              'Prototyping & Wireframing'
            ]
          }
        ];
      
      case 'quality-assurance':
        return [
          {
            id: 'qa-tester',
            name: 'QA / Tester',
            description: 'Quality assurance, testing, and bug detection',
            icon: <Bug className="w-8 h-8 text-green-400" />,
            features: [
              'Manual & Automated Testing',
              'Quality Assurance',
              'Bug Tracking & Reporting',
              'Test Planning & Execution'
            ]
          }
        ];
      
      case 'product-management':
        return [
          {
            id: 'product-pm',
            name: 'Product / PM',
            description: 'Product management, strategy, and project coordination',
            icon: <Briefcase className="w-8 h-8 text-orange-400" />,
            features: [
              'Product Strategy & Planning',
              'Project Management',
              'Stakeholder Communication',
              'Market Research & Analysis'
            ]
          }
        ];
      
      default:
        return [
          {
            id: 'developer',
            name: 'Developer/Engineer',
            description: 'Software development, coding, and technical implementation',
            icon: <Code className="w-8 h-8 text-blue-400" />,
            features: [
              'Frontend & Backend Development',
              'Mobile & Web Applications',
              'Database & API Design',
              'DevOps & Cloud Infrastructure'
            ]
          },
          {
            id: 'designer',
            name: 'Designer',
            description: 'UI/UX design, visual design, and user experience',
            icon: <Palette className="w-8 h-8 text-purple-400" />,
            features: [
              'User Interface Design',
              'User Experience Design',
              'Visual & Graphic Design',
              'Prototyping & Wireframing'
            ]
          },
          {
            id: 'qa-tester',
            name: 'QA / Tester',
            description: 'Quality assurance, testing, and bug detection',
            icon: <Bug className="w-8 h-8 text-green-400" />,
            features: [
              'Manual & Automated Testing',
              'Quality Assurance',
              'Bug Tracking & Reporting',
              'Test Planning & Execution'
            ]
          },
          {
            id: 'product-pm',
            name: 'Product / PM',
            description: 'Product management, strategy, and project coordination',
            icon: <Briefcase className="w-8 h-8 text-orange-400" />,
            features: [
              'Product Strategy & Planning',
              'Project Management',
              'Stakeholder Communication',
              'Market Research & Analysis'
            ]
          }
        ];
    }
  };

  const specializations = getSpecializations();

  const experienceLevels = [
    {
      id: 'junior',
      name: 'Junior',
      description: 'Early career professionals building foundational skills',
      years: '0–2 years',
      tagline: 'Potential builders',
      icon: '🟢',
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
      icon: '🔵',
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
      icon: '🟡',
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
      icon: '🟣',
      features: [
        'Technical strategy & vision',
        'System architecture design',
        'Team leadership & mentoring',
        'Business impact focus'
      ]
    }
  ];

  const handleSpecializationSelect = (specializationId: string) => {
    console.log('Specialization selected:', specializationId);
    setSelectedSpecialization(specializationId);
    setSelectedExperienceLevel(''); // Reset experience level when specialization changes
    console.log('State updated - selectedSpecialization:', specializationId);
  };

  const handleExperienceLevelSelect = (levelId: string) => {
    console.log('Experience level selected:', levelId);
    setSelectedExperienceLevel(levelId);
  };

  const handleContinue = async () => {
    if (!selectedSpecialization || !selectedExperienceLevel || !roleSelection) {
      console.log('Cannot continue:', { selectedSpecialization, selectedExperienceLevel, roleSelection });
      return;
    }

    try {
      // Store the complete selection
      const completeSelection = {
        ...roleSelection,
        specialization: selectedSpecialization,
        experienceLevel: selectedExperienceLevel
      };
      localStorage.setItem('completeRoleSelection', JSON.stringify(completeSelection));

      // Navigate based on specialization
      if (selectedSpecialization === 'developer') {
        // Navigate to developer onboarding
        navigate('/developer-onboarding', { 
          state: { 
            role: roleSelection.role.id,
            category: roleSelection.category.id,
            specialization: selectedSpecialization,
            experienceLevel: selectedExperienceLevel
          }
        });
      } else if (selectedSpecialization === 'designer') {
        // Navigate to designer onboarding
        navigate('/designer-onboarding', { 
          state: { 
            role: roleSelection.role.id,
            category: roleSelection.category.id,
            specialization: selectedSpecialization,
            experienceLevel: selectedExperienceLevel
          }
        });
      } else if (selectedSpecialization === 'qa-tester') {
        // Navigate to QA onboarding
        navigate('/qa-onboarding', { 
          state: { 
            role: roleSelection.role.id,
            category: roleSelection.category.id,
            specialization: selectedSpecialization,
            experienceLevel: selectedExperienceLevel
          }
        });
      } else if (selectedSpecialization === 'product-pm') {
        // Navigate to product management onboarding
        navigate('/product-onboarding', { 
          state: { 
            role: roleSelection.role.id,
            category: roleSelection.category.id,
            specialization: selectedSpecialization,
            experienceLevel: selectedExperienceLevel
          }
        });
      } else {
        // Navigate to generic specialization onboarding
        navigate('/specialization-onboarding', { 
          state: { 
            role: roleSelection.role.id,
            category: roleSelection.category.id,
            specialization: selectedSpecialization,
            experienceLevel: selectedExperienceLevel
          }
        });
      }

    } catch (error) {
      console.error('Error continuing to next step:', error);
      alert('Failed to continue. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/role-selection');
  };

  // Debug logging
  console.log('Component state:', {
    selectedSpecialization,
    selectedExperienceLevel,
    roleSelection,
    specializations: specializations.length,
    experienceLevels: experienceLevels.length
  });

  if (!roleSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading role selection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Back to Role Selection
          </button>
        </div>
        
        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 transition-all duration-300 ease-out border border-[#2a3344]">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3 text-white">Choose Your Specialization</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Select the specialization that best matches your skills and interests.
                {roleSelection?.category?.name && (
                  <span className="block mt-2 text-blue-400">
                    Category: {roleSelection.category.name}
                  </span>
                )}
              </p>
            </div>

            {/* Specialization Selection */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Available Specializations</h2>
                <p className="text-gray-400">Click on a specialization to select it</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {specializations.map((specialization) => (
                  <div
                    key={specialization.id}
                    className={`relative bg-[#171c33] border-2 rounded-xl p-6 cursor-pointer transition-all hover:border-gray-500 ${
                      selectedSpecialization === specialization.id
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-gray-700'
                    }`}
                    onClick={() => handleSpecializationSelect(specialization.id)}
                  >
                    {/* Selection Check */}
                    {selectedSpecialization === specialization.id && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      </div>
                    )}

                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {specialization.icon}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-white">{specialization.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{specialization.description}</p>
                      
                      <div className="space-y-2">
                        {specialization.features.map((feature, index) => (
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
            </div>

            {/* Experience Level Selection - Only show after specialization is selected */}
            {console.log('Rendering experience level section, selectedSpecialization:', selectedSpecialization)}
            {selectedSpecialization && (
              <div className="mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Select Your Experience Level</h2>
                  <p className="text-gray-400">Choose the level that best represents your professional experience</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experienceLevels.map((level) => (
                    <div
                      key={level.id}
                      className={`relative bg-[#171c33] border-2 rounded-xl p-6 cursor-pointer transition-all hover:border-gray-500 ${
                        selectedExperienceLevel === level.id
                          ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'border-gray-700'
                      }`}
                      onClick={() => handleExperienceLevelSelect(level.id)}
                    >
                      {/* Selection Check */}
                      {selectedExperienceLevel === level.id && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 text-2xl">
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
              </div>
            )}

            {/* Continue Button */}
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                disabled={!selectedSpecialization || !selectedExperienceLevel}
                className={`px-8 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                  selectedSpecialization && selectedExperienceLevel
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedSpecialization && selectedExperienceLevel ? (
                  <>
                    Continue to Onboarding
                    <ArrowRight size={20} />
                  </>
                ) : (
                  <>
                    {!selectedSpecialization ? 'Select Specialization' : 'Select Experience Level'}
                  </>
                )}
              </button>
            </div>

            {/* Debug Info */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg text-xs text-gray-400">
              <p><strong>Debug Info:</strong></p>
              <p>Specialization: {selectedSpecialization || 'None'}</p>
              <p>Experience Level: {selectedExperienceLevel || 'None'}</p>
              <p>Category: {roleSelection?.category?.name || 'None'}</p>
              <p>Specializations Available: {specializations.length}</p>
              <p>Experience Levels Available: {experienceLevels.length}</p>
              <p>Should Show Experience Levels: {selectedSpecialization ? 'YES' : 'NO'}</p>
              
              {/* Test buttons */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setSelectedSpecialization('developer')}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                >
                  Test: Set Specialization to Developer
                </button>
                <button
                  onClick={() => setSelectedSpecialization(null)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                >
                  Test: Clear Specialization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
