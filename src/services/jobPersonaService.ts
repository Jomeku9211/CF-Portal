const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:4mi5W9uU';

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
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async createJobPost(data: CreateJobPostData): Promise<JobPostResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/job_post`, {
        method: 'POST',
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
          message: errorData.message || 'Failed to create job post',
        };
      }
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
      const response = await fetch(`${XANO_BASE_URL}/job_post?team_id=${teamId}`, {
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
      console.error('Get job posts error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getUserJobPosts(): Promise<JobPostResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/job_post`, {
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
      const response = await fetch(`${XANO_BASE_URL}/job_post/${id}`, {
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
      const response = await fetch(`${XANO_BASE_URL}/job_post/${id}`, {
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
      const response = await fetch(`${XANO_BASE_URL}/job_post/${id}`, {
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
