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
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.user) {
        setUser(response.user);
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
      if (response.success && response.user) {
        setUser(response.user);
        
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
    authService.logout();
    setUser(null);
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

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
    sendWelcomeEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
