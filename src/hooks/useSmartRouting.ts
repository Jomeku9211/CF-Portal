import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabaseRoleService } from '../services/supabaseRoleService';
import { universalOnboardingService } from '../services/universalOnboardingService';

export interface SmartRoutingResult {
  shouldRedirect: boolean;
  targetRoute: string;
  isLoading: boolean;
  error: string | null;
}

export const useSmartRouting = (): SmartRoutingResult => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const determineUserRoute = async () => {
      if (authLoading) return; // Wait for auth to load
      
      try {
        setIsLoading(true);
        setError(null);

        // 1. Not authenticated - should be on login/signup
        if (!user) {
          const publicRoutes = ['/login', '/signup', '/forgot-password', '/', '/auth'];
          if (!publicRoutes.includes(location.pathname)) {
            return {
              shouldRedirect: true,
              targetRoute: '/login',
              isLoading: false,
              error: null
            };
          }
          return {
            shouldRedirect: false,
            targetRoute: '',
            isLoading: false,
            error: null
          };
        }

        // 2. Authenticated - check their current state
        console.log('🔍 Smart routing: Checking user state for', user.email, 'at path:', location.pathname);

        // Check if user has a role
        const userRoleResult = await supabaseRoleService.getUserRole(user.id);
        
        if (userRoleResult.success && userRoleResult.data) {
          console.log('✅ User has role:', userRoleResult.data);
          
          // User has a role, check onboarding progress
          const onboardingResult = await universalOnboardingService.getOnboardingProgress(user.id);
          
          if (onboardingResult.success && onboardingResult.data) {
            console.log('✅ User has onboarding progress:', onboardingResult.data);
            
            // Check if onboarding is completed
            if (onboardingResult.data.onboarding_status === 'completed') {
              // User completed onboarding - can be on dashboard, assessments, or other post-onboarding pages
              const postOnboardingRoutes = ['/dashboard', '/assessments', '/profile', '/jobs'];
              if (!postOnboardingRoutes.includes(location.pathname)) {
                return {
                  shouldRedirect: true,
                  targetRoute: '/dashboard',
                  isLoading: false,
                  error: null
                };
              }
            } else {
              // User has onboarding in progress - should continue onboarding
              if (location.pathname !== '/clientOnboarding' && location.pathname !== '/developer-onboarding') {
                // Determine which onboarding route based on role
                const targetRoute = userRoleResult.data.role_id === 'client' ? '/clientOnboarding' : '/developer-onboarding';
                return {
                  shouldRedirect: true,
                  targetRoute,
                  isLoading: false,
                  error: null
                };
              }
            }
          } else {
            // User has role but no onboarding progress - should start onboarding
            if (location.pathname !== '/clientOnboarding' && location.pathname !== '/developer-onboarding') {
              const targetRoute = userRoleResult.data.role_id === 'client' ? '/clientOnboarding' : '/developer-onboarding';
              return {
                shouldRedirect: true,
                targetRoute,
                isLoading: false,
                error: null
              };
            }
          }
        } else {
          // User has no role - should be on role selection
          if (location.pathname !== '/role-selection') {
            return {
              shouldRedirect: true,
              targetRoute: '/role-selection',
              isLoading: false,
              error: null
            };
          }
        }

        // User is on the correct page
        return {
          shouldRedirect: false,
          targetRoute: '',
          isLoading: false,
          error: null
        };

      } catch (err) {
        console.error('❌ Error in smart routing:', err);
        setError('Failed to determine user route');
        return {
          shouldRedirect: false,
          targetRoute: '',
          isLoading: false,
          error: 'Failed to determine user route'
        };
      } finally {
        setIsLoading(false);
      }
    };

    determineUserRoute().then((result) => {
      if (result?.shouldRedirect) {
        console.log('🚀 Smart routing: Redirecting to', result.targetRoute, 'from', location.pathname);
        navigate(result.targetRoute, { replace: true });
      } else {
        console.log('✅ Smart routing: No redirect needed, user is on correct page:', location.pathname);
      }
    });

  }, [user, authLoading, location.pathname, navigate]);

  return {
    shouldRedirect: false, // This will be handled by the effect
    targetRoute: '',
    isLoading: authLoading || isLoading,
    error
  };
};
