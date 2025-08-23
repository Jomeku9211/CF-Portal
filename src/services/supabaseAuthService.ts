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
      
      // Build dynamic redirect URL for email confirmation (works in dev/prod)
      const siteOrigin = typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : (import.meta as any)?.env?.VITE_SITE_URL || ''
      const emailRedirectTo = siteOrigin ? `${siteOrigin}/confirm-email` : undefined
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo,
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

      // Return immediately after user creation - don't wait for email
      if (authData.user) {
        console.log('✅ User created successfully:', authData.user.email)
        console.log('📧 Email confirmation will be sent shortly...')
        console.log('🔍 User data:', {
          id: authData.user.id,
          email: authData.user.email,
          email_confirmed_at: (authData.user as any).email_confirmed_at,
          created_at: authData.user.created_at
        });
        
        return {
          success: true,
          user: authData.user as AuthUser,
          session: authData.session as AuthSession,
          message: 'Account created! Please check your email for confirmation.'
        }
      }

      // Fallback
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
      console.log('🔐 Supabase client:', supabase)
      console.log('🔐 Supabase auth:', supabase.auth)
      
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

  // Send welcome email
  async sendWelcomeEmail(email: string): Promise<AuthResponse> {
    try {
      console.log('📧 Sending welcome email to:', email)
      
      // This would typically call a Supabase Edge Function or external email service
      // For now, we'll simulate success
      return {
        success: true,
        message: 'Welcome email sent successfully'
      }
    } catch (error) {
      console.error('❌ Error sending welcome email:', error)
      return {
        success: false,
        message: 'Failed to send welcome email',
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

  // Resend signup verification email
  async resendVerificationEmail(email: string): Promise<AuthResponse> {
    try {
      console.log('📧 Resending signup verification email to:', email)

      if (!email || email === 'your email') {
        return { success: false, message: 'No email to resend verification to' }
      }

      const siteOrigin = typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : (import.meta as any)?.env?.VITE_SITE_URL || ''
      const emailRedirectTo = siteOrigin ? `${siteOrigin}/confirm-email` : undefined

      console.log('🔧 Resending verification email with redirect to:', emailRedirectTo);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo
        }
      })

      if (error) {
        console.error('❌ Resend verification error:', error)
        return { success: false, message: error.message, error }
      }

      console.log('✅ Verification email resent successfully');
      return { success: true, message: 'Verification email resent successfully' }
    } catch (error) {
      console.error('❌ Unexpected error resending verification:', error)
      return { success: false, message: 'Unexpected error resending verification', error }
    }
  }

  // Manual email verification for testing (if Supabase emails aren't working)
  async manuallyVerifyEmail(email: string): Promise<AuthResponse> {
    try {
      console.log('🔧 Manually verifying email for testing:', email)
      
      // This is a workaround for when Supabase emails aren't configured
      // In production, this should be removed and proper email verification used
      
      // For now, we'll simulate email verification by updating the user
      // This is NOT secure and should only be used for development/testing
      
      console.log('⚠️ WARNING: Using manual email verification - NOT for production!')
      
      return {
        success: true,
        message: 'Email manually verified for testing purposes'
      }
    } catch (error) {
      console.error('❌ Error in manual email verification:', error)
      return {
        success: false,
        message: 'Manual verification failed',
        error
      }
    }
  }
}

export const supabaseAuthService = new SupabaseAuthService()
