import { supabase } from '../config/supabase';

export interface OnboardingProgress {
  id?: string;
  user_id: string;
  role_id: string;
  category_id: string;
  experience_level_id?: string; // Optional for clients
  onboarding_flow: 'developer' | 'client' | 'agency';
  onboarding_stage: string; // New field to track onboarding stage
  current_step: number;
  total_steps: number;
  completed_steps: string[];
  onboarding_status: 'in_progress' | 'completed' | 'abandoned';
  last_activity: string;
  
  // Searchable columns (no more flow_metadata)
  location?: string;
  primary_stack?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  work_style?: string;
  availability_status?: string;
  skills?: string[];
  domain_experience?: string[];
  
  created_at?: string;
  updated_at?: string;
}

export interface OnboardingStepData {
  step_name: string;
  step_data: any;
  completed: boolean;
  step?: number;
  role?: string;
  category?: string;
  experience_level?: string;
}

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

class UniversalOnboardingService {
  // Helper function to extract searchable data from form data
  private extractSearchableData(formData: any): Partial<OnboardingProgress> {
    const searchableData: Partial<OnboardingProgress> = {};
    
    // Extract location
    if (formData.location) {
      searchableData.location = formData.location;
    }
    
    // Extract primary stack
    if (formData.primaryStack) {
      searchableData.primary_stack = formData.primaryStack;
    }
    
    // Extract experience level
    if (formData.experienceLevel) {
      searchableData.experience_level = formData.experienceLevel;
    }
    
    // Extract salary range
    if (formData.salaryExpectations) {
      const salaryMatch = formData.salaryExpectations.match(/(\d+)-(\d+)/);
      if (salaryMatch) {
        searchableData.salary_min = parseInt(salaryMatch[1]);
        searchableData.salary_max = parseInt(salaryMatch[2]);
      }
    }
    
    // Extract work style
    if (formData.workStyle) {
      searchableData.work_style = formData.workStyle;
    }
    
    // Extract skills
    if (formData.secondarySkills && Array.isArray(formData.secondarySkills)) {
      searchableData.skills = formData.secondarySkills;
    }
    
    // Extract domain experience
    if (formData.domainExperience && Array.isArray(formData.domainExperience)) {
      searchableData.domain_experience = formData.domainExperience;
    }
    
    // Set default availability status
    searchableData.availability_status = 'available';
    
    return searchableData;
  }

  // Get or create onboarding progress for a user
  async getOrCreateOnboardingProgress(





    
    userId: string, 
    roleId: string, 
    categoryId: string, 
    flow: 'developer' | 'client' | 'agency',
    experienceLevelId?: string // Optional for clients
  ): Promise<ServiceResponse<OnboardingProgress>> {
    try {
      console.log('🚀 Getting or creating onboarding progress for user:', userId, 'flow:', flow);
      
      // For client flow, experience level is not required
      if (flow === 'client' && !experienceLevelId) {
        experienceLevelId = 'not-applicable'; // Set a default value for clients
        console.log('ℹ️ Client flow detected - setting default experience level');
      }
      
      // Check if onboarding progress already exists
      const existingProgress = await this.getOnboardingProgress(userId);
      
      if (existingProgress.success && existingProgress.data) {
        console.log('✅ Found existing onboarding progress:', existingProgress.data);
        
        // Update existing progress with new role/category info
        const updatedProgress = await this.updateOnboardingProgress(userId, {
          role_id: roleId,
          category_id: categoryId,
          experience_level_id: experienceLevelId,
          onboarding_flow: flow,
          last_activity: new Date().toISOString()
        });
        
        return updatedProgress;
      }
      
      // Create new onboarding progress
      console.log('🚀 Creating new onboarding progress...');
      
      const totalSteps = flow === 'client' ? 3 : 5; // Clients have 3 main steps, developers have 5
      
      const newProgress: Omit<OnboardingProgress, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        role_id: roleId,
        category_id: categoryId,
        experience_level_id: experienceLevelId,
        onboarding_flow: flow,
        onboarding_stage: 'role_selection', // Start at role selection
        current_step: 1,
        total_steps: totalSteps,
        completed_steps: [],
        onboarding_status: 'in_progress',
        last_activity: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .insert([newProgress])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Error creating onboarding progress:', error);
        return {
          success: false,
          message: 'Failed to create onboarding progress',
          error
        };
      }
      
      console.log('✅ New onboarding progress created:', data);
      return {
        success: true,
        data: data as OnboardingProgress
      };
      
    } catch (error) {
      console.error('❌ Error in getOrCreateOnboardingProgress:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
        error
      };
    }
  }

  // Update onboarding progress with searchable data extraction
  async updateOnboardingProgress(userId: string, updates: Partial<OnboardingProgress>): Promise<ServiceResponse<OnboardingProgress>> {
    try {
      console.log(`🔄 Updating onboarding progress for user ${userId}:`, updates);
      
      // Extract searchable data from updates
      let searchableUpdates = { ...updates };
      const searchableData = this.extractSearchableData(updates);
      searchableUpdates = { ...searchableUpdates, ...searchableData };
      console.log('🔍 Extracted searchable data:', searchableData);
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .update({
          ...searchableUpdates,
          updated_at: new Date().toISOString(),
          last_activity: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .maybeSingle(); // Use maybeSingle instead of single to avoid PGRST116
      
      if (error) {
        console.error('❌ Error updating onboarding progress:', error);
        return {
          success: false,
          message: `Failed to update onboarding progress: ${error.message}`,
          error
        };
      }
      
      console.log('✅ Onboarding progress updated:', data);
      return {
        success: true,
        data,
        message: 'Onboarding progress updated successfully'
      };
      
    } catch (error) {
      console.error('❌ Error in updateOnboardingProgress:', error);
      return {
        success: false,
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      };
    }
  }

  // Mark a specific step as completed
  async markStepCompleted(userId: string, stepName: string, stepData: OnboardingStepData): Promise<ServiceResponse<OnboardingStepData>> {
    try {
      console.log(`✅ Marking step ${stepName} as completed for user ${userId}`);
      
      // Step completion is now tracked in the main progress table
      // Update the completed_steps array in user_onboarding_progress
      const { data: currentProgress, error: getError } = await supabase
        .from('user_onboarding_progress')
        .select('completed_steps')
        .eq('user_id', userId)
        .single();
      
      if (getError) {
        console.error('❌ Error getting current progress:', getError);
        return {
          success: false,
          message: `Failed to get current progress: ${getError.message}`,
          error: getError
        };
      }
      
      // Add the completed step to the array
      const completedSteps = currentProgress.completed_steps || [];
      if (!completedSteps.includes(stepName)) {
        completedSteps.push(stepName);
      }
      
      // Update the progress table
      const { data: updatedProgress, error: updateError } = await supabase
        .from('user_onboarding_progress')
        .update({
          completed_steps: completedSteps,
          last_activity: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();
      
      if (updateError) {
        console.error('❌ Error updating step completion:', updateError);
        return {
          success: false,
          message: `Failed to update step completion: ${updateError.message}`,
          error: updateError
        };
      }
      
      console.log('✅ Step completion recorded in progress table:', updatedProgress);
      return {
        success: true,
        data: stepData,
        message: `Step ${stepName} marked as completed`
      };
      
    } catch (error) {
      console.error('❌ Error in markStepCompleted:', error);
      return {
        success: false,
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      };
    }
  }

  // Get onboarding progress for a user
  async getOnboardingProgress(userId: string): Promise<ServiceResponse<OnboardingProgress>> {
    try {
      console.log(`🔍 Getting onboarding progress for user ${userId}`);
      
      // First check if there are multiple entries (which would cause PGRST116)
      const { data: allEntries, error: countError } = await supabase
        .from('user_onboarding_progress')
        .select('id, user_id, onboarding_flow, current_step, created_at, updated_at')
        .eq('user_id', userId);
      
      if (countError) {
        console.error('❌ Error checking onboarding progress entries:', countError);
        return {
          success: false,
          message: `Failed to check onboarding progress: ${countError.message}`,
          error: countError
        };
      }
      
      if (allEntries && allEntries.length > 1) {
        console.warn(`⚠️ Multiple onboarding progress entries found for user ${userId} (${allEntries.length} entries)`);
        console.warn('🔄 Cleaning up duplicate entries...');
        
        // Keep the most recent entry and delete others
        const sortedEntries = allEntries.sort((a, b) => 
          new Date(b.updated_at || b.created_at || 0).getTime() - 
          new Date(a.updated_at || a.created_at || 0).getTime()
        );
        
        const entriesToDelete = sortedEntries.slice(1).map(entry => entry.id);
        if (entriesToDelete.length > 0) {
          const { error: deleteError } = await supabase
            .from('user_onboarding_progress') // Changed from user_onboarding_profiles to user_onboarding_progress
            .delete()
            .in('id', entriesToDelete);
          
          if (deleteError) {
            console.error('❌ Error cleaning up duplicate entries:', deleteError);
          } else {
            console.log(`✅ Cleaned up ${entriesToDelete.length} duplicate entries`);
          }
        }
      }
      
      // Now get the single entry
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle(); // Use maybeSingle instead of single to avoid PGRST116
      
      if (error) {
        console.error('❌ Error getting onboarding progress:', error);
        return {
          success: false,
          message: `Failed to get onboarding progress: ${error.message}`,
          error
        };
      }
      
      if (!data) {
        // No rows returned
        console.log('ℹ️ No onboarding progress found for user');
        return {
          success: false,
          message: 'No onboarding progress found',
          data: undefined
        };
      }
      
      console.log('✅ Found onboarding progress:', data);
      return {
        success: true,
        data,
        message: 'Onboarding progress retrieved successfully'
      };
      
    } catch (error) {
      console.error('❌ Error in getOnboardingProgress:', error);
      return {
        success: false,
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      };
    }
  }

  // Search developers by criteria (Amazon-style search)
  async searchDevelopers(criteria: {
    location?: string;
    primaryStack?: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    workStyle?: string;
    skills?: string[];
    domainExperience?: string[];
  }): Promise<ServiceResponse<OnboardingProgress[]>> {
    try {
      console.log('🔍 Searching developers with criteria:', criteria);
      
      let query = supabase
        .from('user_onboarding_progress')
        .select('*')
        .eq('onboarding_flow', 'developer')
        .eq('availability_status', 'available');
      
      // Apply filters
      if (criteria.location) {
        query = query.ilike('location', `%${criteria.location}%`);
      }
      
      if (criteria.primaryStack) {
        query = query.ilike('primary_stack', `%${criteria.primaryStack}%`);
      }
      
      if (criteria.experienceLevel) {
        query = query.eq('experience_level', criteria.experienceLevel);
      }
      
      if (criteria.salaryMin) {
        query = query.gte('salary_min', criteria.salaryMin);
      }
      
      if (criteria.salaryMax) {
        query = query.lte('salary_max', criteria.salaryMax);
      }
      
      if (criteria.workStyle) {
        query = query.eq('work_style', criteria.workStyle);
      }
      
      if (criteria.skills && criteria.skills.length > 0) {
        query = query.overlaps('skills', criteria.skills);
      }
      
      if (criteria.domainExperience && criteria.domainExperience.length > 0) {
        query = query.overlaps('domain_experience', criteria.domainExperience);
      }
      
      const { data, error } = await query.order('updated_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error searching developers:', error);
        return {
          success: false,
          message: `Failed to search developers: ${error.message}`,
          error
        };
      }
      
      console.log(`✅ Found ${data?.length || 0} developers matching criteria`);
      return {
        success: true,
        data: data || [],
        message: `Found ${data?.length || 0} developers`
      };
      
    } catch (error) {
      console.error('❌ Error in searchDevelopers:', error);
      return {
        success: false,
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      };
    }
  }

  // Complete the entire onboarding process
  async completeOnboarding(userId: string): Promise<ServiceResponse<OnboardingProgress>> {
    try {
      console.log('🎉 Completing onboarding for user:', userId);
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .update({
          onboarding_status: 'completed',
          current_step: 4,
          last_activity: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error completing onboarding:', error);
        return {
          success: false,
          error: error.message
        };
      }

      console.log('✅ Onboarding completed successfully:', data);
      return {
        success: true,
        data: data as OnboardingProgress
      };

    } catch (error) {
      console.error('❌ Error in completeOnboarding:', error);
      return {
        success: false,
        error: error
      };
    }
  }

  // Get step completion history for a user
  async getStepCompletionHistory(userId: string): Promise<ServiceResponse<OnboardingStepData[]>> {
    try {
      console.log(`📋 Getting step completion history for user ${userId}`);
      
      // Get step completion history from the main progress table
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .select('completed_steps')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('❌ Error getting step completion history:', error);
        return {
          success: false,
          message: `Failed to get step completion history: ${error.message}`,
          error
        };
      }
      
      // Convert completed_steps array to step data format
      const stepData = (data?.completed_steps || []).map((stepName: string) => ({
        step_name: stepName,
        step_data: {},
        completed: true
      }));
      
      console.log('✅ Step completion history retrieved from progress table:', stepData);
      return {
        success: true,
        data: stepData,
        message: 'Step completion history retrieved successfully'
      };
      
    } catch (error) {
      console.error('❌ Error in getStepCompletionHistory:', error);
      return {
        success: false,
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      };
    }
  }

  // Reset onboarding progress for a user (for testing or restarting)
  async resetOnboardingProgress(userId: string): Promise<ServiceResponse<OnboardingProgress>> {
    try {
      console.log(`🔄 Resetting onboarding progress for user ${userId}`);
      
      const { data, error } = await supabase
        .from('user_onboarding_progress')
        .update({
          current_step: 1,
          completed_steps: [],
          onboarding_status: 'in_progress',

          updated_at: new Date().toISOString(),
          last_activity: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) {
        console.error('❌ Error resetting onboarding progress:', error);
        return {
          success: false,
          message: `Failed to reset onboarding progress: ${error.message}`,
          error
        };
      }
      
      console.log('✅ Onboarding progress reset successfully:', data);
      return {
        success: true,
        data,
        message: 'Onboarding progress reset successfully'
      };
      
    } catch (error) {
      console.error('❌ Error in resetOnboardingProgress:', error);
      return {
        success: false,
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      };
    }
  }

  // Get onboarding statistics
  async getOnboardingStats(userId: string): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const { data: progress, error } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        return { success: false, error };
      }

      if (!progress) {
        return { success: true, data: { completed: 0, total: 0, percentage: 0 } };
      }

      const completed = progress.completed_steps.length;
      const total = progress.total_steps;
      const percentage = Math.round((completed / total) * 100);

      return {
        success: true,
        data: {
          completed,
          total,
          percentage,
          status: progress.onboarding_status,
          currentStep: progress.current_step
        }
      };
    } catch (error) {
      console.error('❌ Error getting onboarding stats:', error);
      return { success: false, error };
    }
  }

  // Get current route based on onboarding progress
  async getCurrentRoute(userId: string): Promise<string> {
    try {
      const progress = await this.getOnboardingProgress(userId);
      
      if (!progress.success || !progress.data) {
        return '/role-selection';
      }

      const { onboarding_flow, current_step, total_steps } = progress.data;

      if (onboarding_flow === 'developer') {
        if (current_step < total_steps) {
          return '/developer-onboarding';
        } else {
          return '/dashboard';
        }
      } else if (onboarding_flow === 'client') {
        if (current_step < total_steps) {
          return '/clientOnboarding';
        } else {
          return '/dashboard';
        }
      }

      return '/dashboard';
    } catch (error) {
      console.error('Error getting current route:', error);
      return '/role-selection';
    }
  }

  // Create organization in Supabase
  async createOrganization(
    organizationData: any, 
    creatorId?: string
  ): Promise<ServiceResponse<any>> {
    try {
      console.log('🏢 Creating organization in Supabase:', organizationData);
      
      if (!creatorId) {
        return {
          success: false,
          error: 'Creator ID is required'
        };
      }

      // First, get the client profile for this user
      const { data: clientProfile, error: clientError } = await supabase
        .from('client_profiles')
        .select('id')
        .eq('user_id', creatorId)
        .single();

      if (clientError || !clientProfile) {
        console.error('❌ Error getting client profile:', clientError);
        return {
          success: false,
          error: 'Client profile not found. Please complete client profile setup first.'
        };
      }

      // Transform the form data to match our new organizations table schema
      const supabasePayload = {
        client_profile_id: clientProfile.id,
        name: organizationData.basicInfo?.name || organizationData.name || 'Default Organization',
        company_size: organizationData.basicInfo?.size || organizationData.company_size,
        industry: organizationData.basicInfo?.industry || organizationData.industry,
        website: organizationData.basicInfo?.website || organizationData.website,
        funding_status: organizationData.financials?.fundingStatus || organizationData.funding_status,
        revenue_status: organizationData.financials?.revenueStatus || organizationData.revenue_status,
        key_investors: organizationData.financials?.investors ? [organizationData.financials.investors] : [],
        company_function: organizationData.company_function || 'Not specified',
        origin_story: organizationData.purpose?.originStory || organizationData.origin_story,
        what_we_do: organizationData.purpose?.whyStatement || organizationData.what_we_do,
        who_we_serve: organizationData.who_we_serve || [],
        vision: organizationData.purpose?.whyStatement || organizationData.vision,
        why_join_us: organizationData.why_join_us,
        growth_plans: organizationData.growth_plans,
        success_metrics: organizationData.success_metrics || [],
        core_values_today: organizationData.purpose?.coreBeliefs || organizationData.core_values_today || [],
        core_values_aspirations: organizationData.core_values_aspirations || [],
        culture_in_action: organizationData.purpose?.practices || organizationData.culture_in_action || [],
        is_primary: true, // First organization is primary
        is_active: true
      };

      console.log('📤 Form data received:', organizationData);
      console.log('📤 Transformed payload for new organizations table:', supabasePayload);

      const { data, error } = await supabase
        .from('organizations')
        .insert([supabasePayload])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating organization:', error);
        return {
          success: false,
          error: error.message
        };
      }

      console.log('✅ Organization created successfully:', data);

      // Store organization info in localStorage for subsequent steps
      if (data.id) {
        localStorage.setItem('lastOrganizationId', String(data.id));
        if (data.name) {
          localStorage.setItem('organizationName', data.name);
        }
      }

      // Update onboarding progress to mark organization step as completed
      if (creatorId) {
        await this.markStepCompleted(creatorId, 'organization_onboarding', {
          step_name: 'organization_onboarding',
          step_data: organizationData,
          completed: true
        });

        // Update current step to 2 (team onboarding)
        await this.updateOnboardingProgress(creatorId, {
          current_step: 2
        });
      }

      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ Error in createOrganization:', error);
      return {
        success: false,
        error: error
      };
    }
  }

  // Create team in Supabase
  async createTeam(
    teamData: any, 
    organizationId: string,
    creatorId?: string
  ): Promise<ServiceResponse<any>> {
    try {
      console.log('👥 Creating team in Supabase:', teamData);
      
      if (!organizationId) {
        return {
          success: false,
          error: 'Organization ID is required'
        };
      }

      // Transform the form data to match our Supabase schema
      const supabasePayload = {
        name: teamData.name,
        description: teamData.description || '',
        organization_id: organizationId,
        team_size: teamData.teamSize || '5-10',
        created_by: creatorId,
        // Store the full form data in separate columns
      };

      console.log('📤 Supabase team payload:', supabasePayload);

      const { data, error } = await supabase
        .from('teams')
        .insert([supabasePayload])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating team:', error);
        return {
          success: false,
          error: error.message
        };
      }

      console.log('✅ Team created successfully:', data);

      // Store team info in localStorage for subsequent steps
      if (data.id) {
        localStorage.setItem('lastTeamId', String(data.id));
        if (data.name) {
          localStorage.setItem('teamName', data.name);
        }
      }

      // Update onboarding progress to mark team step as completed
      if (creatorId) {
        await this.markStepCompleted(creatorId, 'team_onboarding', {
          step_name: 'team_onboarding',
          step_data: teamData,
          completed: true
        });

        // Update current step to 3 (hiring intent)
        await this.updateOnboardingProgress(creatorId, {
          current_step: 3
        });
      }

      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ Error in createTeam:', error);
      return {
        success: false,
        error: error
      };
    }
  }

  // Create job post in Supabase
  async createJobPost(
    jobData: any, 
    organizationId: string,
    teamId?: string,
    creatorId?: string
  ): Promise<ServiceResponse<any>> {
    try {
      console.log('💼 Creating job post in Supabase:', jobData);
      
      if (!organizationId) {
        return {
          success: false,
          error: 'Organization ID is required'
        };
      }

      // Transform the form data to match our Supabase schema
      const supabasePayload = {
        title: jobData.title || 'New Position',
        description: jobData.description || jobData.expectations || '',
        requirements: jobData.criteria || '',
        budget_range: jobData.budgetRange || '5000-10000',
        project_duration: jobData.duration || '3-6 months',
        skills_needed: jobData.skills || [],
        organization_id: organizationId,
        team_id: teamId,
        created_by: creatorId,
        // Store the full form data in separate columns
      };

      console.log('📤 Supabase job post payload:', supabasePayload);

      const { data, error } = await supabase
        .from('job_posts')
        .insert([supabasePayload])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating job post:', error);
        return {
          success: false,
          error: error.message
        };
      }

      console.log('✅ Job post created successfully:', data);

      // Update onboarding progress to mark job creation step as completed
      if (creatorId) {
        await this.markStepCompleted(creatorId, 'job_persona', {
          step_name: 'job_persona',
          step_data: jobData,
          completed: true
        });

        // Update current step to 4 (completion)
        await this.updateOnboardingProgress(creatorId, {
          current_step: 4
        });
      }

      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ Error in createJobPost:', error);
      return {
        success: false,
        error: error
      };
    }
  }
}

export const universalOnboardingService = new UniversalOnboardingService();
