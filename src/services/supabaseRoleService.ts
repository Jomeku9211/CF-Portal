import { supabase, TABLES } from '../config/supabase';

export interface Role {
  id: string;
  name: string;
  description: string;
  button_label: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface RoleCategory {
  id: string;
  name: string;
  description: string;
  role_id: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface ExperienceLevel {
  id: string;
  name: string;
  description: string;
  years: string;
  tagline: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  category_id: string;
  specialization: string;
  experience_level: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

class SupabaseRoleService {
  // Get all roles
  async getRoles(): Promise<ServiceResponse<Role[]>> {
    try {
      console.log('🔍 Fetching roles from Supabase...');
      
      const { data, error } = await supabase
        .from(TABLES.ROLES)
        .select('*')
        .order('name');

      if (error) {
        console.error('❌ Error fetching roles:', error);
        return {
          success: false,
          message: error.message,
          error
        };
      }

      console.log('✅ Roles fetched successfully:', data);
      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('❌ Unexpected error fetching roles:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  // Get role categories by role ID
  async getRoleCategories(roleId: string): Promise<ServiceResponse<RoleCategory[]>> {
    try {
      console.log('🔍 Fetching role categories for role:', roleId);
      
      const { data, error } = await supabase
        .from(TABLES.ROLE_CATEGORIES)
        .select('*')
        .eq('role_id', roleId)
        .order('name');

      if (error) {
        console.error('❌ Error fetching role categories:', error);
        return {
          success: false,
          message: error.message,
          error
        };
      }

      console.log('✅ Role categories fetched successfully:', data);
      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('❌ Unexpected error fetching role categories:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  // Get all experience levels
  async getExperienceLevels(): Promise<ServiceResponse<ExperienceLevel[]>> {
    try {
      console.log('🔍 Fetching experience levels from Supabase...');
      
      const { data, error } = await supabase
        .from(TABLES.EXPERIENCE_LEVELS)
        .select('*')
        .order('name');

      if (error) {
        console.error('❌ Error fetching experience levels:', error);
        return {
          success: false,
          message: error.message,
          error
        };
      }

      console.log('✅ Experience levels fetched successfully:', data);
      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('❌ Unexpected error fetching experience levels:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  // Save user role selection
  async saveUserRole(userRole: Omit<UserRole, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceResponse<UserRole>> {
    try {
      console.log('💾 Saving user role selection:', userRole);
      
      const { data, error } = await supabase
        .from(TABLES.USER_ROLES)
        .insert([userRole])
        .select()
        .single();

      if (error) {
        console.error('❌ Error saving user role:', error);
        return {
          success: false,
          message: error.message,
          error
        };
      }

      console.log('✅ User role saved successfully:', data);
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('❌ Unexpected error saving user role:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  // Get user role by user ID
  async getUserRole(userId: string): Promise<ServiceResponse<UserRole | null>> {
    try {
      console.log('🔍 Fetching user role for user:', userId);
      
      const { data, error } = await supabase
        .from(TABLES.USER_ROLES)
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No user role found
          return {
            success: true,
            data: null
          };
        }
        console.error('❌ Error fetching user role:', error);
        return {
          success: false,
          message: error.message,
          error
        };
      }

      console.log('✅ User role fetched successfully:', data);
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('❌ Unexpected error fetching user role:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  // Update user role
  async updateUserRole(userId: string, updates: Partial<UserRole>): Promise<ServiceResponse<UserRole>> {
    try {
      console.log('🔄 Updating user role for user:', userId, 'with updates:', updates);
      
      const { data, error } = await supabase
        .from(TABLES.USER_ROLES)
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating user role:', error);
        return {
          success: false,
          message: error.message,
          error
        };
      }

      console.log('✅ User role updated successfully:', data);
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('❌ Unexpected error updating user role:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  // Delete user role
  async deleteUserRole(userId: string): Promise<ServiceResponse<void>> {
    try {
      console.log('🗑️ Deleting user role for user:', userId);
      
      const { error } = await supabase
        .from(TABLES.USER_ROLES)
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Error deleting user role:', error);
        return {
          success: false,
          message: error.message,
          error
        };
      }

      console.log('✅ User role deleted successfully');
      return {
        success: true
      };
    } catch (error) {
      console.error('❌ Unexpected error deleting user role:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }
}

export const supabaseRoleService = new SupabaseRoleService();
