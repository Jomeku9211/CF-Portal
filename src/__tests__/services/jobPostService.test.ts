import { jobPostService, CreateJobPostData } from '../../services/jobPostService';

// Mock localStorage
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
  },
});

// Mock fetch globally
global.fetch = jest.fn();

describe('JobPostService', () => {
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    jest.clearAllMocks();
    mockGetItem.mockReturnValue('test-token');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAuthHeaders', () => {
    it('should include authorization header when token exists', async () => {
      mockGetItem.mockReturnValue('test-token');
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '1', title: 'Test Job' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const mockData: CreateJobPostData = {
        team_id: 'team-123',
        title: 'Software Engineer'
      };

      await jobPostService.createJobPost(mockData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/job_post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          body: JSON.stringify(mockData),
        }
      );
    });

    it('should not include authorization header when token does not exist', async () => {
      mockGetItem.mockReturnValue(null);
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '1', title: 'Test Job' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const mockData: CreateJobPostData = {
        team_id: 'team-123',
        title: 'Software Engineer'
      };

      await jobPostService.createJobPost(mockData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/job_post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockData),
        }
      );
    });
  });

  describe('createJobPost', () => {
    const mockJobPostData: CreateJobPostData = {
      team_id: 'team-123',
      title: 'Senior React Developer',
      number_of_hires: '2',
      hire_timeline: '3 months',
      employment_type: 'Full-time',
      location_preference: 'Remote',
      city: 'San Francisco',
      salary_min: '100000',
      salary_max: '150000',
      equity_available: true,
      salary_period: 'Yearly',
      currency: 'USD'
    };

    it('should create job post successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ 
          id: 'job-123', 
          title: 'Senior React Developer',
          team_id: 'team-123'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.createJobPost(mockJobPostData);

      expect(result).toEqual({
        success: true,
        job_post: { 
          id: 'job-123', 
          title: 'Senior React Developer',
          team_id: 'team-123'
        }
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/job_post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          body: JSON.stringify(mockJobPostData),
        }
      );
    });

    it('should handle API error response with message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Validation failed: Title is required'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.createJobPost(mockJobPostData);

      expect(result).toEqual({
        success: false,
        message: 'Validation failed: Title is required'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.createJobPost(mockJobPostData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to create job post'
      });
    });

    it('should handle API error response with invalid JSON', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.createJobPost(mockJobPostData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to create job post'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await jobPostService.createJobPost(mockJobPostData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    it('should handle minimal job post data', async () => {
      const minimalData: CreateJobPostData = {
        team_id: 'team-123',
        title: 'Developer'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ 
          id: 'job-456', 
          title: 'Developer',
          team_id: 'team-123'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.createJobPost(minimalData);

      expect(result).toEqual({
        success: true,
        job_post: { 
          id: 'job-456', 
          title: 'Developer',
          team_id: 'team-123'
        }
      });
    });
  });

  describe('updateJobPost', () => {
    const jobId = 'job-123';
    const updateData = {
      title: 'Updated Job Title',
      salary_max: '160000',
      custom_field: 'custom value'
    };

    it('should update job post successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ 
          id: 'job-123', 
          title: 'Updated Job Title',
          salary_max: '160000'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.updateJobPost(jobId, updateData);

      expect(result).toEqual({
        success: true,
        job_post: { 
          id: 'job-123', 
          title: 'Updated Job Title',
          salary_max: '160000'
        }
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/job_post/job-123',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          body: JSON.stringify(updateData),
        }
      );
    });

    it('should handle API error response with message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Job post not found'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.updateJobPost(jobId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Job post not found'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.updateJobPost(jobId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to update job post'
      });
    });

    it('should handle API error response with invalid JSON', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.updateJobPost(jobId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to update job post'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await jobPostService.updateJobPost(jobId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    it('should handle empty update data', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ 
          id: 'job-123', 
          title: 'Existing Title'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.updateJobPost(jobId, {});

      expect(result).toEqual({
        success: true,
        job_post: { 
          id: 'job-123', 
          title: 'Existing Title'
        }
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/job_post/job-123',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          body: JSON.stringify({}),
        }
      );
    });
  });

  describe('getJobPostsByTeam', () => {
    const teamId = 'team-123';

    it('should fetch job posts by team successfully', async () => {
      const mockJobPosts = [
        { id: 'job-1', title: 'React Developer', team_id: 'team-123' },
        { id: 'job-2', title: 'Node.js Developer', team_id: 'team-123' }
      ];

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockJobPosts)
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.getJobPostsByTeam(teamId);

      expect(result).toEqual({
        success: true,
        job_posts: mockJobPosts
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/job_post?team_id=team-123',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
        }
      );
    });

    it('should handle team ID with special characters', async () => {
      const specialTeamId = 'team-123@#$%^&*()';
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue([])
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await jobPostService.getJobPostsByTeam(specialTeamId);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/job_post?team_id=team-123%40%23%24%25%5E%26*()',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
        }
      );
    });

    it('should handle empty job posts array', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue([])
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.getJobPostsByTeam(teamId);

      expect(result).toEqual({
        success: true,
        job_posts: []
      });
    });

    it('should handle API error response with message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Team not found'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.getJobPostsByTeam(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Team not found'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.getJobPostsByTeam(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Failed to fetch job posts'
      });
    });

    it('should handle API error response with invalid JSON', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await jobPostService.getJobPostsByTeam(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Failed to fetch job posts'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await jobPostService.getJobPostsByTeam(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle different exception types in createJobPost', async () => {
      mockFetch.mockRejectedValue('String error');

      const result = await jobPostService.createJobPost({
        team_id: 'team-123',
        title: 'Test Job'
      });

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    it('should handle different exception types in updateJobPost', async () => {
      mockFetch.mockRejectedValue({ error: 'Object error' });

      const result = await jobPostService.updateJobPost('job-123', {});

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    it('should handle different exception types in getJobPostsByTeam', async () => {
      mockFetch.mockRejectedValue(null);

      const result = await jobPostService.getJobPostsByTeam('team-123');

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });
  });
});
