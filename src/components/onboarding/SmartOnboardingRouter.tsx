import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { universalOnboardingService } from '../../services/universalOnboardingService';

export const SmartOnboardingRouter: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const routeToCorrectOnboarding = async () => {
      if (!user?.id) {
        console.error('❌ No user found for onboarding routing');
        setError('No user found');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔄 Checking onboarding flow for user:', user.id);
        setIsLoading(true);
        
        // Get onboarding progress from database
        const progressResult = await universalOnboardingService.getOnboardingProgress(user.id);
        
        if (progressResult.success && progressResult.data) {
          const { onboarding_flow, current_step } = progressResult.data;
          console.log('📊 Onboarding flow:', onboarding_flow, 'Current step:', current_step);
          
          // Route based on onboarding_flow
          if (onboarding_flow === 'developer') {
            console.log('👨‍💻 Routing to developer onboarding');
            navigate('/developer-onboarding', { replace: true });
          } else if (onboarding_flow === 'client') {
            console.log('🏢 Routing to client onboarding');
            navigate('/clientOnboarding', { replace: true });
          } else if (onboarding_flow === 'agency') {
            console.log('🏢 Routing to agency onboarding');
            navigate('/agency-onboarding', { replace: true });
          } else {
            console.log('❓ Unknown onboarding flow, defaulting to role selection');
            navigate('/role-selection', { replace: true });
          }
        } else {
          console.log('⚠️ No onboarding progress found, going to role selection');
          navigate('/role-selection', { replace: true });
        }
      } catch (error) {
        console.error('❌ Error checking onboarding flow:', error);
        setError('Failed to load onboarding progress');
        // Default to role selection on error
        navigate('/role-selection', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    routeToCorrectOnboarding();
  }, [user?.id, navigate]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Routing to your onboarding...</p>
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
            onClick={() => navigate('/role-selection')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            Go to Role Selection
          </button>
        </div>
      </div>
    );
  }

  return null; // This component only handles routing, doesn't render anything
};


