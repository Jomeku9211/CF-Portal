import { supabase } from '../../../config/supabase';

export interface JobPost {
  id: string;
  created_at: number;
  team_id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  skills: string[];
  experience_level: string;
  employment_type: string;
  location: string;
  salary_range: string;
  benefits: string[];
  hiring_intent: string;
  urgency: string;
  budget_range: string;
  timeline: string;
  contact_email: string;
  status: 'draft' | 'active' | 'closed' | 'archived';
}

export interface CreateJobPostData {
  team_id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  skills: string[];
  experience_level: string;
  employment_type: string;
  location: string;
  salary_range: string;
  benefits: string[];
  hiring_intent: string;
  urgency: string;
  budget_range: string;
  timeline: string;
  contact_email: string;
}

export interface JobPostResponse {
  success: boolean;
  message?: string;
  jobPost?: JobPost;
  jobPosts?: JobPost[];
}

class JobPersonaService {
  async createJobPost(data: CreateJobPostData): Promise<JobPostResponse> {
    try {
      const { data: jobPost, error } = await supabase
        .from('job_posts')
        .insert(data)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        jobPost,
      };
    } catch (error) {
      console.error('Create job post error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getJobPostsByTeam(teamId: string): Promise<JobPostResponse> {
    try {
      const { data: jobPosts, error } = await supabase
        .from('job_posts')
        .select('*')
        .eq('team_id', teamId);

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        jobPosts,
      };
    } catch (error) {
      console.error('Get job posts error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getUserJobPosts(): Promise<JobPostResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.JOB_POSTS)`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const jobPosts = await response.json();
        return {
          success: true,
          jobPosts,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to fetch job posts',
        };
      }
    } catch (error) {
      console.error('Get user job posts error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getJobPostById(id: string): Promise<JobPostResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.JOB_POSTS)/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const jobPost = await response.json();
        return {
          success: true,
          jobPost,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to fetch job post',
        };
      }
    } catch (error) {
      console.error('Get job post error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async updateJobPost(id: string, data: Partial<CreateJobPostData>): Promise<JobPostResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.JOB_POSTS)/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jobPost = await response.json();
        return {
          success: true,
          jobPost,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to update job post',
        };
      }
    } catch (error) {
      console.error('Update job post error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async deleteJobPost(id: string): Promise<JobPostResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.JOB_POSTS)/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Job post deleted successfully',
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to delete job post',
        };
      }
    } catch (error) {
      console.error('Delete job post error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }
}

export const jobPersonaService = new JobPersonaService();
