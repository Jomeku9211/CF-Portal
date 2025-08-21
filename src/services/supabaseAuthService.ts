import { supabase } from '../config/supabase'
import { AuthUser, AuthSession } from '../config/supabase'

export interface SignUpData {
  email: string
  password: string
  fullName?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  session?: AuthSession
  message?: string
  error?: any
}

class SupabaseAuthService {
  // Sign up with email and password
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting to sign up user:', data.email)
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName || '',
          }
        }
      })

      if (error) {
        console.error('❌ Sign up error:', error)
        return {
          success: false,
          message: error.message,
          error
        }
      }

      if (authData.user && authData.session) {
        console.log('✅ User signed up successfully:', authData.user.email)
        return {
          success: true,
          user: authData.user as AuthUser,
          session: authData.session as AuthSession
        }
      }

      // Email confirmation required
      console.log('📧 Email confirmation required for:', data.email)
      return {
        success: true,
        message: 'Please check your email to confirm your account'
      }

    } catch (error) {
      console.error('❌ Unexpected error during sign up:', error)
      return {
        success: false,
        message: 'An unexpected error occurred during sign up',
        error
      }
    }
  }

  // Sign in with email and password
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting to sign in user:', data.email)
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) {
        console.error('❌ Sign in error:', error)
        return {
          success: false,
          message: error.message,
          error
        }
      }

      if (authData.user && authData.session) {
        console.log('✅ User signed in successfully:', authData.user.email)
        return {
          success: true,
          user: authData.user as AuthUser,
          session: authData.session as AuthSession
        }
      }

      return {
        success: false,
        message: 'Sign in failed - no user or session returned'
      }

    } catch (error) {
      console.error('❌ Unexpected error during sign in:', error)
      return {
        success: false,
        message: 'An unexpected error occurred during sign in',
        error
      }
    }
  }

  // Sign out current user
  async signOut(): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting to sign out user')
      
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('❌ Sign out error:', error)
        return {
          success: false,
          message: error.message,
          error
        }
      }

      console.log('✅ User signed out successfully')
      return {
        success: true,
        message: 'User signed out successfully'
      }

    } catch (error) {
      console.error('❌ Unexpected error during sign out:', error)
      return {
        success: false,
        message: 'An unexpected error occurred during sign out',
        error
      }
    }
  }

  // Get current user session
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        console.error('❌ Get current user error:', error)
        return {
          success: false,
          message: error.message,
          error
        }
      }

      if (user) {
        console.log('✅ Current user retrieved:', user.email)
        return {
          success: true,
          user: user as AuthUser
        }
      }

      return {
        success: false,
        message: 'No authenticated user found'
      }

    } catch (error) {
      console.error('❌ Unexpected error getting current user:', error)
      return {
        success: false,
        message: 'An unexpected error occurred getting current user',
        error
      }
    }
  }

  // Get current session
  async getCurrentSession(): Promise<AuthResponse> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('❌ Get current session error:', error)
        return {
          success: false,
          message: error.message,
          error
        }
      }

      if (session) {
        console.log('✅ Current session retrieved')
        return {
          success: true,
          session: session as AuthSession,
          user: session.user as AuthUser
        }
      }

      return {
        success: false,
        message: 'No active session found'
      }

    } catch (error) {
      console.error('❌ Unexpected error getting current session:', error)
      return {
        success: false,
        message: 'An unexpected error occurred getting current session',
        error
      }
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }

  // Reset password
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting to reset password for:', email)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        console.error('❌ Reset password error:', error)
        return {
          success: false,
          message: error.message,
          error
        }
      }

      console.log('✅ Password reset email sent to:', email)
      return {
        success: true,
        message: 'Password reset email sent successfully'
      }

    } catch (error) {
      console.error('❌ Unexpected error during password reset:', error)
      return {
        success: false,
        message: 'An unexpected error occurred during password reset',
        error
      }
    }
  }

  // Update user profile
  async updateProfile(updates: { full_name?: string; avatar_url?: string }): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting to update user profile:', updates)
      
      const { data: { user }, error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) {
        console.error('❌ Update profile error:', error)
        return {
          success: false,
          message: error.message,
          error
        }
      }

      if (user) {
        console.log('✅ User profile updated successfully')
        return {
          success: true,
          user: user as AuthUser
        }
      }

      return {
        success: false,
        message: 'Profile update failed - no user returned'
      }

    } catch (error) {
      console.error('❌ Unexpected error updating profile:', error)
      return {
        success: false,
        message: 'An unexpected error occurred updating profile',
        error
      }
    }
  }
}

export const supabaseAuthService = new SupabaseAuthService()
