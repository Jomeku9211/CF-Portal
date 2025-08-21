import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database table names
export const TABLES = {
  ROLES: 'roles',
  ROLE_CATEGORIES: 'role_categories',
  EXPERIENCE_LEVELS: 'experience_levels',
  USERS: 'users',
  USER_ROLES: 'user_roles',
  ONBOARDING_STAGES: 'onboarding_stages'
} as const

// Database types
export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string
          name: string
          description: string
          button_label: string
          icon: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          button_label: string
          icon: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          button_label?: string
          icon?: string
          created_at?: string
          updated_at?: string
        }
      }
      role_categories: {
        Row: {
          id: string
          name: string
          description: string
          role_id: string
          metadata: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          role_id: string
          metadata?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          role_id?: string
          metadata?: any
          created_at?: string
          updated_at?: string
        }
      }
      experience_levels: {
        Row: {
          id: string
          name: string
          description: string
          years: string
          tagline: string
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          years: string
          tagline: string
          features: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          years?: string
          tagline?: string
          features?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role_id: string
          category_id: string
          specialization: string
          experience_level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role_id: string
          category_id: string
          specialization: string
          experience_level: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role_id?: string
          category_id?: string
          specialization?: string
          experience_level?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Auth types
export interface AuthUser {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
  created_at: string
  updated_at: string
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: AuthUser
}
