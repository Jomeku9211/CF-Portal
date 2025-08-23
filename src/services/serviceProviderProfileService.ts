import { supabase } from '@/config/supabase';

export interface ServiceProviderProfile {
  id?: string;
  user_id: string;
  user_role_id: string;
  hourly_rate?: number;
  daily_rate?: number;
  project_rate?: number;
  currency?: string;
  availability?: string;
  remote_preference?: string;
  timezone_preference?: string[];
  skills?: string[];
  technologies?: string[];
  certifications?: string[];
  min_project_size?: number;
  max_project_size?: number;
  preferred_project_types?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

class ServiceProviderProfileService {
  private tableName = 'service_provider_profiles';

  /**
   * Create or update a service provider profile
   */
  async createOrUpdateProfile(profile: Omit<ServiceProviderProfile, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceResponse<ServiceProviderProfile>> {
    try {
      console.log('🚀 Creating/updating service provider profile:', profile);

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('user_id', profile.user_id)
        .eq('user_role_id', profile.user_role_id)
        .single();

      if (existingProfile) {
        // Update existing profile
        console.log('🔄 Updating existing service provider profile');
        const { data, error } = await supabase
          .from(this.tableName)
          .update({
            ...profile,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProfile.id)
          .select()
          .single();

        if (error) {
          console.error('❌ Error updating service provider profile:', error);
          return {
            success: false,
            message: 'Failed to update service provider profile',
            error
          };
        }

        console.log('✅ Service provider profile updated:', data);
        return {
          success: true,
          data: data as ServiceProviderProfile
        };
      } else {
        // Create new profile
        console.log('🆕 Creating new service provider profile');
        const { data, error } = await supabase
          .from(this.tableName)
          .insert([profile])
          .select()
          .single();

        if (error) {
          console.error('❌ Error creating service provider profile:', error);
          return {
            success: false,
            message: 'Failed to create service provider profile',
            error
          };
        }

        console.log('✅ Service provider profile created:', data);
        return {
          success: true,
          data: data as ServiceProviderProfile
        };
      }
    } catch (error) {
      console.error('❌ Error in createOrUpdateProfile:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  /**
   * Get service provider profile by user ID
   */
  async getProfileByUserId(userId: string): Promise<ServiceResponse<ServiceProviderProfile>> {
    try {
      console.log('🔍 Getting service provider profile for user:', userId);

      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found
          console.log('ℹ️ No service provider profile found for user:', userId);
          return {
            success: true,
            data: undefined
          };
        }
        console.error('❌ Error getting service provider profile:', error);
        return {
          success: false,
          message: 'Failed to get service provider profile',
          error
        };
      }

      console.log('✅ Service provider profile found:', data);
      return {
        success: true,
        data: data as ServiceProviderProfile
      };
    } catch (error) {
      console.error('❌ Error in getProfileByUserId:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  /**
   * Update specific fields of a service provider profile
   */
  async updateProfileFields(userId: string, updates: Partial<ServiceProviderProfile>): Promise<ServiceResponse<ServiceProviderProfile>> {
    try {
      console.log('🔄 Updating service provider profile fields for user:', userId, updates);

      const { data, error } = await supabase
        .from(this.tableName)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating service provider profile fields:', error);
        return {
          success: false,
          message: 'Failed to update service provider profile fields',
          error
        };
      }

      console.log('✅ Service provider profile fields updated:', data);
      return {
        success: true,
        data: data as ServiceProviderProfile
      };
    } catch (error) {
      console.error('❌ Error in updateProfileFields:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  /**
   * Delete service provider profile
   */
  async deleteProfile(userId: string): Promise<ServiceResponse<void>> {
    try {
      console.log('🗑️ Deleting service provider profile for user:', userId);

      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Error deleting service provider profile:', error);
        return {
          success: false,
          message: 'Failed to delete service provider profile',
          error
        };
      }

      console.log('✅ Service provider profile deleted for user:', userId);
      return {
        success: true
      };
    } catch (error) {
      console.error('❌ Error in deleteProfile:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }
}

export const serviceProviderProfileService = new ServiceProviderProfileService();
