import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Video, Code, Heart, BarChart3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedAssessments, setCompletedAssessments] = useState({
    videoIntro: false,
    skillTest: false,
    personalityTest: false
  });
  const [onboardingMessage, setOnboardingMessage] = useState('');

  useEffect(() => {
    // Check if user just completed onboarding
    if (location.state?.message) {
      setOnboardingMessage(location.state.message);
    }
  }, [location.state]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleAssessmentComplete = (assessmentType: string) => {
    setCompletedAssessments(prev => ({
      ...prev,
      [assessmentType]: true
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <h1 className="text-2xl font-bold">Skill Assessments</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Onboarding Success Message */}
        {onboardingMessage && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-900/20 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">Onboarding Complete! 🎉</h3>
              <p className="text-green-200">{onboardingMessage}</p>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Complete Your Profile with Assessments</h2>
          <p className="text-gray-400 text-lg">
            These assessments help you stand out to employers and increase your chances of getting hired
          </p>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Video Introduction */}
          <div className="bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-900/20 rounded-full mb-4">
                <Video className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Video Introduction</h3>
              <p className="text-gray-400 text-center text-sm mb-4">
                Record a 1-2 minute video introducing yourself and your skills
              </p>
              {completedAssessments.videoIntro ? (
                <div className="text-center">
                  <div className="flex items-center justify-center text-green-400 mb-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completed
                  </div>
                  <button
                    onClick={() => handleAssessmentComplete('videoIntro')}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Re-record
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAssessmentComplete('videoIntro')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Recording
                </button>
              )}
            </div>
          </div>

          {/* Skill Test */}
          <div className="bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-900/20 rounded-full mb-4">
                <Code className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Technical Skills Test</h3>
              <p className="text-gray-400 text-center text-sm mb-4">
                20 questions covering your technical expertise and problem-solving
              </p>
              {completedAssessments.skillTest ? (
                <div className="text-center">
                  <div className="flex items-center justify-center text-green-400 mb-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completed
                  </div>
                  <button
                    onClick={() => handleAssessmentComplete('skillTest')}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Retake Test
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAssessmentComplete('skillTest')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Test
                </button>
              )}
            </div>
          </div>

          {/* Personality Test */}
          <div className="bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-900/20 rounded-full mb-4">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Personality Assessment</h3>
              <p className="text-gray-400 text-center text-sm mb-4">
                5-minute assessment to understand your work style and preferences
              </p>
              {completedAssessments.personalityTest ? (
                <div className="text-center">
                  <div className="flex items-center justify-center text-green-400 mb-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completed
                  </div>
                  <button
                    onClick={() => handleAssessmentComplete('personalityTest')}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Retake Assessment
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAssessmentComplete('personalityTest')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Start Assessment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
          <h3 className="text-xl font-semibold mb-4">Your Assessment Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {completedAssessments.videoIntro ? '✅' : '⏳'}
              </div>
              <div className="text-sm text-gray-400">Video Introduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {completedAssessments.skillTest ? '✅' : '⏳'}
              </div>
              <div className="text-sm text-gray-400">Skill Test</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {completedAssessments.personalityTest ? '✅' : '⏳'}
              </div>
              <div className="text-sm text-gray-400">Personality Test</div>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-300">
              <strong>Pro Tip:</strong> Profiles with completed assessments receive 4x more interview requests. 
              Complete all three to maximize your chances of getting hired!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsPage;
