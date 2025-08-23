// Mock supabase configuration for tests
export const supabase = {
  auth: {
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(),
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    resetPasswordForEmail: jest.fn(),
    updateUser: jest.fn()
  }
};

export const TABLES = {
  ROLES: 'roles',
  ROLE_CATEGORIES: 'role_categories',
  EXPERIENCE_LEVELS: 'experience_levels',
  USERS: 'users',
  USER_ROLES: 'user_roles',
  ONBOARDING_STAGES: 'onboarding_stages'
};

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
  onboarding_stage?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: AuthUser;
}





