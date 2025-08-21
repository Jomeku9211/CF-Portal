import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseAuthService } from '../services/supabaseAuthService';
import { AuthUser } from '../config/supabase';
import { emailService } from '../services/emailService';

interface AuthContextType {
  user: AuthUser | null;
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = async () => {
      try {
        const response = await supabaseAuthService.getCurrentSession();
        if (response.success && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
    
    // Set up Supabase auth state change listener
    const { data: { subscription } } = supabaseAuthService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user as AuthUser);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          setUser(session.user as AuthUser);
        }
      }
    );
    
    // Periodic session expiry check (every 5 minutes)
    const intervalId = window.setInterval(async () => {
      try {
        const response = await supabaseAuthService.getCurrentSession();
        if (!response.success || !response.user) {
          setUser(null);
        }
      } catch {}
    }, 5 * 60 * 1000);

    return () => {
      subscription?.unsubscribe();
      window.clearInterval(intervalId);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await supabaseAuthService.signIn({ email, password });
      if (response.success) {
        if (response.user) {
          setUser(response.user);
        } else if (response.session) {
          // If session exists, get user from session
          setUser(response.session.user);
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
      const response = await supabaseAuthService.signUp({ email, password, fullName: name });
      if (response.success) {
        // Store email for email verification page
        localStorage.setItem('signupEmail', email);
        
        // Send thank you email after successful signup
        try {
          await emailService.sendThankYouEmail({ name, email });
          console.log('Thank you email sent successfully');
        } catch (emailError) {
          console.error('Failed to send thank you email:', emailError);
          // Don't fail the signup if email fails
        }
        
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      console.log('=== AUTHCONTEXT LOGOUT DEBUG ===');
      console.log('1. AuthContext logout() called');
      
      // Clear all local storage data
      console.log('2. Clearing local storage...');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('roleSelection');
      localStorage.removeItem('completeRoleSelection');
      localStorage.removeItem('signupEmail');
      localStorage.removeItem('onboardingData');
      localStorage.removeItem('userPreferences');
      
      // Clear any other app-specific storage
      sessionStorage.clear();
      
      console.log('3. Local storage cleared');
      
      // Sign out from Supabase
      console.log('4. Calling supabaseAuthService.signOut()');
      await supabaseAuthService.signOut();
      console.log('5. Supabase signOut completed');
      
      // Clear user state
      console.log('6. Setting user to null');
      setUser(null);
      
      console.log('7. Logout completed successfully');
      console.log('=== AUTHCONTEXT LOGOUT DEBUG END ===');
      
      // Redirect to login page
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, clear the user state
      setUser(null);
      
      // Clear local storage anyway
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('roleSelection');
      localStorage.removeItem('completeRoleSelection');
      localStorage.removeItem('signupEmail');
      localStorage.removeItem('onboardingData');
      localStorage.removeItem('userPreferences');
      sessionStorage.clear();
      
      // Redirect to login page
      window.location.href = '/login';
    }
  };

  const refreshUser = async () => {
    try {
      const response = await supabaseAuthService.getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
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
