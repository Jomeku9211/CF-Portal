import { supabase } from '../../../config/supabase';

export interface UserUpdateResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    roles?: string[];
    onboarding_stage?: string;
    is_onboarding?: boolean;
    updated_at?: string;
  };
  error?: string;
}

class UserService {
  async updateCurrentUserRole(role: string): Promise<UserUpdateResponse> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { role }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: 'Network error occurred' };
    }
  }

  async updateUserById(userId: string, data: Record<string, any>): Promise<UserUpdateResponse> {
    try {
      const { data: result, error } = await supabase
        .from('users')
        .update(data)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, user: result };
    } catch (error) {
      return { success: false, message: 'Network error occurred' };
    }
  }
}

export const userService = new UserService();


