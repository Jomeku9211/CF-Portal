// ============================================================================
// 🚫 PERMANENTLY LOCKED AUTH CONTEXT - NEVER MODIFY THIS FILE
// ============================================================================
// 
// THIS FILE CONTAINS THE CORE AUTHENTICATION LOGIC:
// - Login, signup, logout, and user management
// - The logout function is PERMANENTLY LOCKED and will NEVER be changed
// - Any modifications require explicit permission from the user
// - This ensures logout always works correctly
// ============================================================================
// 
// LAST MODIFIED: [PERMANENTLY LOCKED]
// MODIFICATION REASON: Logout functionality must work 100% of the time
// ============================================================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseAuthService } from '../services/supabaseAuthService';
import { supabase } from '../config/supabase';
import { AuthUser } from '../config/supabase';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  sendWelcomeEmail: (email: string) => Promise<void>;
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

// Function to sync user to users table
const syncUserToDatabase = async (user: AuthUser) => {
  try {
    console.log('🔄 Syncing user to database:', user.id, user.email);
    
    // Check if user already exists in users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single();
    
    if (checkError && checkError.code === 'PGRST116') {
      // User doesn't exist, create them
      console.log('📝 Creating new user record in database...');
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          status: 'active'
        })
        .select()
        .single();
      
      if (createError) {
        console.error('❌ Error creating user in database:', createError);
        return false;
      } else {
        console.log('✅ User synced to database:', newUser);
        return true;
      }
    } else if (checkError) {
      console.error('❌ Error checking user in database:', checkError);
      return false;
    } else {
      console.log('✅ User already exists in database:', existingUser);
      return true;
    }
  } catch (error) {
    console.error('❌ Error syncing user to database:', error);
    return false;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  
  // Debug logging
  console.log('🔍 AuthContext state:', { user: user?.id, isAuthenticated, isLoading });

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication on app load...');
        const response = await supabaseAuthService.getCurrentSession();
        console.log('📊 getCurrentSession response:', response);
        
        if (response.success && response.user) {
          console.log('✅ User authenticated, setting user state');
          setUser(response.user);
          
          // Sync user to database
          await syncUserToDatabase(response.user);
          
          // Only redirect if user is confirmed and not on email verification page
          const signupEmail = localStorage.getItem('signupEmail');
          if (signupEmail && signupEmail === response.user.email && (response.user as any).email_confirmed_at) {
            console.log('🎉 User confirmed email on app load - redirecting to role selection');
            localStorage.removeItem('signupEmail');
            // Only redirect if not on email verification page
            if (window.location.pathname !== '/email-verification') {
              setTimeout(() => {
                window.location.href = '/role-selection';
              }, 100);
            }
          }
        } else {
          console.log('❌ No user found in session');
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      } finally {
        console.log('🏁 Setting isLoading to false in checkAuth');
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Set up Supabase auth state change listener
    const { data: { subscription } } = supabaseAuthService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const authUser = session.user as AuthUser;
          console.log('✅ User signed in, setting user state and stopping loading');
          setUser(authUser);
          setIsLoading(false);
          
          // Sync user to database
          await syncUserToDatabase(authUser);
          
          // Only redirect to role selection if user is confirmed and we're not on email verification page
          const signupEmail = localStorage.getItem('signupEmail');
          if (signupEmail && signupEmail === session.user.email && (session.user as any).email_confirmed_at) {
            console.log('🎉 New confirmed user signed in - redirecting to role selection');
            localStorage.removeItem('signupEmail');
            // Only redirect if not already on email verification page
            if (window.location.pathname !== '/email-verification') {
              window.location.href = '/role-selection';
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          const authUser = session.user as AuthUser;
          setUser(authUser);
          
          // Sync user to database on token refresh
          await syncUserToDatabase(authUser);
          
          // Only redirect if user is confirmed and not on email verification page
          const signupEmail = localStorage.getItem('signupEmail');
          if (signupEmail && signupEmail === session.user.email && (session.user as any).email_confirmed_at) {
            console.log('🎉 New user confirmed email (token refresh) - redirecting to role selection');
            localStorage.removeItem('signupEmail');
            if (window.location.pathname !== '/email-verification') {
              window.location.href = '/role-selection';
            }
          }
        } else if (event === 'USER_UPDATED' && session?.user) {
          const authUser = session.user as AuthUser;
          setUser(authUser);
          
          // Sync user to database on user update
          await syncUserToDatabase(authUser);
        } else if (event === 'USER_CONFIRMED' && session?.user) {
          // Handle email confirmation event
          console.log('🎉 User email confirmed:', session.user.email);
          const authUser = session.user as AuthUser;
          setUser(authUser);
          
          // Sync user to database on confirmation
          await syncUserToDatabase(authUser);
          
          // Check if this is a new user and redirect appropriately
          const signupEmail = localStorage.getItem('signupEmail');
          if (signupEmail && signupEmail === session.user.email) {
            console.log('🎉 New user confirmed email - redirecting to role selection');
            localStorage.removeItem('signupEmail');
            // Small delay to ensure the page has loaded
            setTimeout(() => {
              if (window.location.pathname !== '/email-verification') {
                window.location.href = '/role-selection';
              }
            }, 1000);
          }
        }
      }
    );
    
    // Periodic session expiry check (every 5 minutes)
    const intervalId = window.setInterval(async () => {
      try {
        const response = await supabaseAuthService.getCurrentSession();
        if (!response.success || !response.user) {
          setUser(null);
        } else {
          // Sync user to database on periodic check
          await syncUserToDatabase(response.user);
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
          // Sync user to database on login
          await syncUserToDatabase(response.user);
        } else if (response.session) {
          // If session exists, get user from session
          const authUser = response.session.user as AuthUser;
          setUser(authUser);
          // Sync user to database on login
          await syncUserToDatabase(authUser);
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
        
        // Supabase will automatically send email confirmation
        console.log('Signup successful - email confirmation sent by Supabase');
        
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  // ============================================================================
  // 🚫 PERMANENTLY LOCKED LOGOUT FUNCTION - NEVER MODIFY THIS LOGIC
  // ============================================================================
  // 
  // THIS FUNCTION HANDLES COMPLETE USER LOGOUT:
  // 1. Clear all local storage and session storage
  // 2. Sign out from Supabase completely
  // 3. Clear user state
  // 4. Force redirect to login page
  // 5. This logic is PERMANENT and will NEVER be changed
  // ============================================================================
  const logout = async () => {
    try {
      console.log('=== AUTHCONTEXT LOGOUT DEBUG ===');
      console.log('1. AuthContext logout() called');
      
      // PERMANENT: Clear ALL local storage data
      console.log('2. Clearing ALL local storage...');
      localStorage.clear(); // Clear everything
      sessionStorage.clear(); // Clear everything
      
      console.log('3. All storage cleared');
      
      // PERMANENT: Sign out from Supabase completely
      console.log('4. Calling Supabase signOut()');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase signOut error:', error);
      } else {
        console.log('5. Supabase signOut completed successfully');
      }
      
      // PERMANENT: Clear user state
      console.log('6. Setting user to null');
      setUser(null);
      
      console.log('7. Logout completed successfully');
      console.log('=== AUTHCONTEXT LOGOUT DEBUG END ===');
      
      // PERMANENT: Force redirect to login page
      console.log('8. Force redirecting to /login');
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Error during logout:', error);
      
      // PERMANENT: Even if there's an error, clear everything
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      
      // PERMANENT: Force redirect to login page
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

  const sendWelcomeEmail = async (email: string) => {
    try {
      const response = await supabaseAuthService.sendWelcomeEmail(email);
      if (response.success) {
        console.log('Welcome email sent successfully for:', email);
      } else {
        console.error('Failed to send welcome email for:', email, response.message);
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
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
