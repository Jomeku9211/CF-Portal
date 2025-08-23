// ============================================================================
// 🚫 PERMANENTLY LOCKED FILE - NEVER MODIFY THIS ROUTING LOGIC
// ============================================================================
// 
// THIS FILE CONTAINS THE PERMANENT ROUTING FLOW:
// 1. User has NO role → /role-selection
// 2. User has role → Check onboarding_stage → Route accordingly
//
// ANY ATTEMPTS TO MODIFY THIS FLOW ARE FORBIDDEN
// THE CODE IS WRITTEN IN STONE AND WILL NEVER CHANGE
//
// 🔒 PERMISSION REQUIRED FOR ANY CHANGES:
// This entire flow (signup → login → role selection → role category → 
// experience level → onboarding page → complete onboarding) is LOCKED.
// 
// NO CHANGES CAN BE MADE WITHOUT EXPLICIT PERMISSION FROM THE USER.
// ANY MODIFICATIONS MUST BE APPROVED BEFORE IMPLEMENTATION.
// 
// THE FLOW IS PERMANENT AND WILL NEVER BE ALTERED WITHOUT CONSENT.
// ============================================================================

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
      if (authLoading) {
        console.log('⏳ Waiting for auth to load...');
        return; // Wait for auth to load
      }
      
      console.log('🚀 Starting smart routing logic...');
      
      // Add timeout to prevent getting stuck
      const timeoutId = setTimeout(() => {
        console.log('⏰ Smart routing timeout - forcing completion');
        setIsLoading(false);
      }, 3000); // 3 second timeout
      
      try {
        setIsLoading(true);
        setError(null);
        
        // ============================================================================
        // 🚫 PERMANENTLY LOCKED HOME PAGE REDIRECT LOGIC - NEVER CHANGE
        // ============================================================================
        // 
        // FORCE REDIRECT IF USER IS ON HOME PAGE AND HAS NO ROLE
        // This ensures users never get stuck on the home page
        // 
        // RULES (WRITTEN IN STONE):
        // 1. User on home page + has role → Check onboarding_stage → Route accordingly
        // 2. User on home page + NO role → FORCE redirect to /role-selection
        // 3. This logic is PERMANENT and will NEVER be modified
        // ============================================================================
        if (location.pathname === '/' && user) {
          console.log('🔒 LOCKED FLOW: User on home page, checking role status...');
          
          // Check if user has role in user_roles table
          const userRoleResult = await supabaseRoleService.getUserRole(user.id);
          console.log('📊 User role result:', userRoleResult);
          
          if (userRoleResult.success && userRoleResult.data) {
            // User has role - check role type and onboarding_stage to find route
            console.log('✅ User has role - checking role type and onboarding stage (LOCKED FLOW)');
            const userRole = userRoleResult.data;
            console.log('👤 User role data:', userRole);
            
            const onboardingProgress = await universalOnboardingService.getOnboardingProgress(user.id);
            console.log('📊 Onboarding progress:', onboardingProgress);
            
            // LOCKED LOGIC: Route based on role type
            if (userRole.role_name === 'client' || userRole.role_name === 'agency') {
              console.log('🎯 LOCKED ROUTING: Client/Agency user going to /client-onboarding');
              navigate('/client-onboarding', { replace: true });
              return;
            } else if (userRole.role_name === 'service-provider') {
              console.log('🎯 LOCKED ROUTING: Service Provider user going to /developer-onboarding');
              navigate('/developer-onboarding', { replace: true });
              return;
            } else {
              console.log('⚠️ Unknown role type, defaulting to role selection');
              navigate('/role-selection', { replace: true });
              return;
            }
          } else {
            // User has no role - FORCE REDIRECT to role selection
            console.log('🎯 LOCKED FLOW: User has no role - FORCING redirect to role selection');
            navigate('/role-selection', { replace: true });
            return;
          }
        }

        // 1. Not authenticated - should be on login/signup
        if (!user) {
          const publicRoutes = ['/login', '/signup', '/forgot-password', '/', '/auth', '/email-verification', '/confirm-email', '/email-confirmed'];
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

        // Check if user email is confirmed
        if (!(user as any).email_confirmed_at) {
          console.log('📧 User email not confirmed, should be on email verification page');
          if (location.pathname !== '/email-verification') {
            return {
              shouldRedirect: true,
              targetRoute: '/email-verification',
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

        // ============================================================================
        // 🚫 PERMANENTLY LOCKED FLOW - NEVER CHANGE THIS LOGIC AGAIN
        // ============================================================================
        // 
        // FLOW RULES (WRITTEN IN STONE):
        // 1. User has NO role in user_roles table → Go to /role-selection
        // 2. User HAS role in user_roles table → Check onboarding_stage to find route
        // 3. onboarding_stage = 'organization_onboarding' → Go to /client-onboarding
        // 4. onboarding_stage = anything else → Go to /developer-onboarding
        //
        // THIS CODE IS PERMANENTLY LOCKED AND WILL NEVER BE MODIFIED
        // ANY CHANGES TO THIS FLOW ARE FORBIDDEN
        // ============================================================================
        
        console.log('🔒 LOCKED FLOW: Checking user_roles table for user:', user.id);
        const userRoleResult = await supabaseRoleService.getUserRole(user.id);
        console.log('📊 User role result:', userRoleResult);
        
        if (userRoleResult.success && userRoleResult.data) {
          // ============================================================================
          // 🚫 USER HAS ROLE - CHECK ONBOARDING STAGE (LOCKED LOGIC)
          // ============================================================================
          console.log('✅ User has role - checking onboarding stage (LOCKED FLOW)');
          
          // HARDCODED: Get onboarding progress and route based on onboarding_stage
          const onboardingProgress = await universalOnboardingService.getOnboardingProgress(user.id);
          if (onboardingProgress) {
            // HARDCODED ROUTING LOGIC - NEVER CHANGE:
            // organization_onboarding = client flow = /client-onboarding
            // anything else = developer flow = /developer-onboarding
            const targetRoute = onboardingProgress.onboarding_stage === 'organization_onboarding' 
              ? '/client-onboarding' 
              : '/developer-onboarding';
            
            console.log('🎯 LOCKED ROUTING: User with role going to:', targetRoute, 'based on onboarding_stage:', onboardingProgress.onboarding_stage);
            
            if (location.pathname !== targetRoute) {
              return {
                shouldRedirect: true,
                targetRoute,
                isLoading: false,
                error: null
              };
            }
          }
        } else {
          // ============================================================================
          // 🚫 USER HAS NO ROLE - GO TO ROLE SELECTION (LOCKED LOGIC)
          // ============================================================================
          console.log('🎯 LOCKED FLOW: User has no role - redirecting to role selection (NEVER CHANGE)');
          if (location.pathname !== '/role-selection') {
            console.log('🔄 LOCKED REDIRECT: Going to /role-selection (PERMANENT)');
            return {
              shouldRedirect: true,
              targetRoute: '/role-selection',
              isLoading: false,
              error: null
            };
          }
        }

        // User is on the correct page
        console.log('✅ User is on correct page, no redirect needed');
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
        clearTimeout(timeoutId);
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
    }).catch((error) => {
      console.error('❌ Smart routing error:', error);
      // Fallback: if routing fails, just stop loading
      setIsLoading(false);
    });

  }, [user, authLoading, location.pathname, navigate]);

  return {
    shouldRedirect: false, // This will be handled by the effect
    targetRoute: '',
    isLoading: authLoading || isLoading,
    error
  };
};
