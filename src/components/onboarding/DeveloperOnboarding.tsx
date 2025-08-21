import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Star, Clock, Users, Award } from 'lucide-react';

interface OnboardingData {
  role: string;
  category: string;
  specialization: string;
  experienceLevel: string;
  completeSelection: any;
}

interface ExperienceLevel {
  id: string;
  name: string;
  description: string;
  years: string;
  icon: React.ReactNode;
  features: string[];
  recommended: boolean;
}

export function DeveloperOnboarding() {
  const location = useLocation();
  const navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      setOnboardingData(location.state as OnboardingData);
      setIsLoading(false);
    } else {
      // If no state, try to get from localStorage
      const savedSelection = localStorage.getItem('roleSelection');
      if (savedSelection) {
        try {
          const parsed = JSON.parse(savedSelection);
          setOnboardingData({
            role: parsed.role?.id || 'unknown',
            category: parsed.category?.id || 'unknown',
            specialization: parsed.specialization || 'unknown',
            experienceLevel: parsed.experienceLevel || 'unknown',
            completeSelection: parsed
          });
        } catch (error) {
          console.error('Error parsing saved selection:', error);
        }
      }
      setIsLoading(false);
    }
  }, [location.state]);

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
      id: 'mid-level',
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

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!onboardingData) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">No Selection Data Found</h1>
          <p className="mb-6">Please go back and complete your role selection.</p>
          <button
            onClick={() => navigate('/role-selection')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Role Selection
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        {/* No back button - users should stay on onboarding after selection */}

        {/* Header with selection summary */}
        <div className="bg-[#1a2234] rounded-xl p-6 mb-8 border border-[#2a3344]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 text-white">Welcome to Your Developer Onboarding</h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              Your role selection is complete! You're now ready to begin your onboarding journey.
            </p>
            
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 inline-block">
              <div className="text-center">
                <p className="text-green-400 text-sm mb-1">✅ Selection Complete</p>
                <p className="text-white font-semibold">
                  {onboardingData.role} → {onboardingData.category} → {onboardingData.specialization}
                </p>
                <p className="text-white text-sm mt-1">
                  Experience Level: {experienceLevels.find(l => l.id === onboardingData.experienceLevel)?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Level Cards - Show the selected level prominently */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Your Experience Level</h2>
          <div className="max-w-2xl mx-auto">
            {(() => {
              const selectedLevel = experienceLevels.find(l => l.id === onboardingData.experienceLevel);
              if (!selectedLevel) return null;
              
              return (
                <div className="relative bg-[#171c33] border-2 border-green-500 rounded-xl p-8 shadow-lg shadow-green-500/20">
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      {selectedLevel.icon}
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-3 text-white">{selectedLevel.name}</h3>
                    <p className="text-gray-300 text-lg mb-4">{selectedLevel.description}</p>
                    
                    <div className="bg-[#2a3344] rounded-lg p-4 mb-6 inline-block">
                      <div className="flex items-center justify-center gap-2 text-blue-400">
                        <Clock className="w-5 h-5" />
                        <span className="text-lg font-medium">{selectedLevel.years}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Characteristics:</h4>
                      {selectedLevel.features.map((feature, index) => (
                        <div key={index} className="text-gray-300 flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-[#1a2234] rounded-xl p-8 mb-8 border border-[#2a3344]">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">🚀 Your Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#171c33] rounded-lg p-6 border border-[#2a3344]">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Complete Your Profile</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Set up your professional profile with skills, portfolio, and experience details.
                </p>
                <button
                  onClick={() => navigate('/profile-setup')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  Start Profile Setup
                </button>
              </div>
            </div>
            
            <div className="bg-[#171c33] rounded-lg p-6 border border-[#2a3344]">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Skill Assessment</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Take our skill assessment to showcase your technical abilities and get matched with opportunities.
                </p>
                <button
                  onClick={() => navigate('/skill-assessment')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Take Assessment
                </button>
              </div>
            </div>
            
            <div className="bg-[#171c33] rounded-lg p-6 border border-[#2a3344]">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Browse Opportunities</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Start exploring available projects and opportunities that match your skills and experience.
                </p>
                <button
                  onClick={() => navigate('/browse-opportunities')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                >
                  Browse Projects
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Go to Dashboard
            <ArrowRight size={20} className="ml-2 inline" />
          </button>
        </div>
      </div>
    </div>
  );
}


