import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/authService';
import { emailService } from '../services/emailService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  sendWelcomeEmail: (name: string, email: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Error checking auth:', error);
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
    
    // Periodic session expiry check (every 5 minutes)
    const intervalId = window.setInterval(() => {
      try {
        if (!authService.isAuthenticated()) {
          setUser(null);
        }
      } catch {}
    }, 5 * 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        if (response.user) {
          setUser(response.user);
          // Check onboarding stage and redirect accordingly
          // await redirectBasedOnOnboardingStage(response.user); // Removed navigation
        } else {
          // If only token present, fetch current user
          try {
            const currentUser = await authService.getCurrentUser();
            if (currentUser) {
              setUser(currentUser);
              // Check onboarding stage and redirect accordingly
              // await redirectBasedOnOnboardingStage(currentUser); // Removed navigation
            }
          } catch (e) {
            // ignore fetch user failure; keep token for subsequent authed routes
          }
        }
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await authService.signup({ name, email, password });
      if (response.success && (response.user || response.token)) {
        if (response.user) {
          setUser(response.user);
        } else {
          // If no user is returned, try fetching current user
          try {
            const currentUser = await authService.getCurrentUser();
            if (currentUser) setUser(currentUser);
          } catch (e) {
            // ignore
          }
        }
        
        // Send thank you email after successful signup
        try {
          await emailService.sendThankYouEmail({ name, email });
          console.log('Thank you email sent successfully');
        } catch (emailError) {
          console.error('Failed to send thank you email:', emailError);
          // Don't fail the signup if email fails
        }
        
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    console.log('=== AUTHCONTEXT LOGOUT DEBUG ===');
    console.log('1. AuthContext logout() called');
    console.log('2. About to call authService.logout()');
    
    try {
      authService.logout();
      console.log('3. authService.logout() called successfully');
    } catch (error) {
      console.error('3. Error calling authService.logout():', error);
    }
    
    try {
      console.log('4. About to setUser(null)');
      setUser(null);
      console.log('5. setUser(null) called successfully');
    } catch (error) {
      console.error('5. Error calling setUser(null):', error);
    }
    
    console.log('6. AuthContext logout() completed');
    console.log('=== AUTHCONTEXT LOGOUT DEBUG END ===');
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
      logout();
    }
  };

  const sendWelcomeEmail = async (name: string, email: string) => {
    try {
      const response = await emailService.sendWelcomeEmail({ name, email });
      if (response.success) {
        return { success: true, message: 'Welcome email sent successfully' };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Welcome email error:', error);
      return { success: false, message: 'Failed to send welcome email' };
    }
  };

  // const redirectBasedOnOnboardingStage = async (user: User) => { // Removed navigation logic
  //   console.log('Redirecting based on onboarding stage:', user);
    
  //   // If user has no role selected, go to role selection
  //   if (!user.roles) {
  //     navigate('/role-selection');
  //     return;
  //   }
    
  //   // If user is not a client, redirect to appropriate place
  //   if (user.roles !== 'client') {
  //     navigate('/dashboard');
  //     return;
  //   }
    
  //   // For client users, check onboarding stage
  //   const onboardingStage = user.onboarding_stage;
  //   console.log('Client user onboarding stage:', onboardingStage);
    
  //   if (!onboardingStage || onboardingStage === 'organisation_creation') {
  //     // Start from organization creation
  //     navigate('/clientOnboarding');
  //   } else if (onboardingStage === 'team_creation' || onboardingStage.startsWith('team_creation')) {
  //     // Go to team creation step
  //     navigate('/clientOnboarding');
  //   } else if (onboardingStage === 'job_creation' || onboardingStage.startsWith('job_creation')) {
  //     // Go to job creation step
  //     navigate('/clientOnboarding');
  //   } else if (onboardingStage === 'completed' || onboardingStage === 'complete') {
  //     // Onboarding completed
  //     navigate('/dashboard');
  //   } else {
  //     // Default fallback
  //     navigate('/clientOnboarding');
  //   }
  // };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
    sendWelcomeEmail,
    // redirectBasedOnOnboardingStage, // Removed navigation function
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
