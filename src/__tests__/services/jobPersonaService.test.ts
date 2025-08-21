import { jobPersonaService } from '../../services/jobPersonaService';

const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:4mi5W9uU';

// Mock global fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('JobPersonaService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock localStorage for auth token
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'test-token'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  describe('getJobPostsByTeam', () => {
    test('successfully fetches job posts by team', async () => {
      const mockJobPosts = [
        { id: '1', title: 'Frontend Developer', skills: ['React', 'TypeScript'] },
        { id: '2', title: 'Backend Developer', skills: ['Node.js', 'Python'] }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockJobPosts
      } as Response);

      const result = await jobPersonaService.getJobPostsByTeam('team1');

      expect(result.success).toBe(true);
      expect(result.jobPosts).toEqual(mockJobPosts);
      expect(mockFetch).toHaveBeenCalledWith(`${XANO_BASE_URL}/job_post?team_id=team1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.any(String)
        }
      });
    });

    test('handles API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' })
      } as Response);

      const result = await jobPersonaService.getJobPostsByTeam('team1');

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });

    test('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await jobPersonaService.getJobPostsByTeam('team1');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });
  });

  describe('createJobPersona', () => {
    test('successfully creates a job persona', async () => {
      const newPersona = {
        team_id: 'team1',
        title: 'Full Stack Developer',
        description: 'Full stack development role',
        requirements: 'React, Node.js, MongoDB',
        responsibilities: 'Develop full stack applications',
        skills: ['React', 'Node.js', 'MongoDB'],
        experience_level: 'Senior',
        employment_type: 'Full-time',
        location: 'Remote',
        salary_range: '$80k-$120k',
        benefits: ['Health', 'Dental'],
        hiring_intent: 'Immediate',
        urgency: 'High',
        budget_range: '$80k-$120k',
        timeline: '2 weeks',
        contact_email: 'hr@company.com'
      };

      const mockResponse = { id: '123', ...newPersona };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await jobPersonaService.createJobPost(newPersona);

      expect(result.success).toBe(true);
      expect(result.jobPost).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(`${XANO_BASE_URL}/job_post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.any(String)
        },
        body: JSON.stringify(newPersona)
      });
    });

    test('handles validation errors', async () => {
      const invalidPersona = {
        team_id: 'team1',
        title: '', // Invalid empty title
        description: 'Test description',
        requirements: 'Test requirements',
        responsibilities: 'Test responsibilities',
        skills: ['Test'],
        experience_level: 'Junior',
        employment_type: 'Full-time',
        location: 'Remote',
        salary_range: '$50k-$70k',
        benefits: ['Health'],
        hiring_intent: 'Immediate',
        urgency: 'Medium',
        budget_range: '$50k-$70k',
        timeline: '1 month',
        contact_email: 'test@company.com'
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Validation failed' })
      } as Response);

      const result = await jobPersonaService.createJobPost(invalidPersona);

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });
  });

  describe('getUserJobPosts', () => {
    test('successfully fetches user job posts', async () => {
      const mockJobPosts = [
        { id: '1', title: 'Frontend Developer', team_id: 'team1' },
        { id: '2', title: 'Backend Developer', team_id: 'team2' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockJobPosts
      } as Response);

      const result = await jobPersonaService.getUserJobPosts();

      expect(result.success).toBe(true);
      expect(result.jobPosts).toEqual(mockJobPosts);
      expect(mockFetch).toHaveBeenCalledWith(`${XANO_BASE_URL}/job_post`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.any(String)
        }
      });
    });

    test('handles API errors for user job posts', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({ message: 'Forbidden' })
      } as Response);

      const result = await jobPersonaService.getUserJobPosts();

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });

    test('handles network errors for user job posts', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await jobPersonaService.getUserJobPosts();

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });
  });

  describe('getJobPostById', () => {
    test('successfully fetches job post by ID', async () => {
      const mockJobPost = {
        id: '123',
        title: 'Senior Developer',
        team_id: 'team1',
        description: 'Senior development role',
        requirements: 'React, Node.js',
        responsibilities: 'Lead development',
        skills: ['React', 'Node.js'],
        experience_level: 'Senior',
        employment_type: 'Full-time',
        location: 'Remote',
        salary_range: '$100k-$150k',
        benefits: ['Health', 'Dental', 'Vision'],
        hiring_intent: 'Immediate',
        urgency: 'High',
        budget_range: '$100k-$150k',
        timeline: '1 month',
        contact_email: 'hr@company.com',
        status: 'active'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockJobPost
      } as Response);

      const result = await jobPersonaService.getJobPostById('123');

      expect(result.success).toBe(true);
      expect(result.jobPost).toEqual(mockJobPost);
      expect(mockFetch).toHaveBeenCalledWith(`${XANO_BASE_URL}/job_post/123`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.any(String)
        }
      });
    });

    test('handles not found error for job post', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Job post not found' })
      } as Response);

      const result = await jobPersonaService.getJobPostById('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });

    test('handles network errors for get job post by ID', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await jobPersonaService.getJobPostById('123');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });
  });

  describe('updateJobPost', () => {
    test('successfully updates job post', async () => {
      const updateData = {
        title: 'Updated Senior Developer',
        salary_range: '$120k-$180k'
      };

      const mockUpdatedJobPost = {
        id: '123',
        title: 'Updated Senior Developer',
        salary_range: '$120k-$180k',
        team_id: 'team1',
        description: 'Senior development role',
        requirements: 'React, Node.js',
        responsibilities: 'Lead development',
        skills: ['React', 'Node.js'],
        experience_level: 'Senior',
        employment_type: 'Full-time',
        location: 'Remote',
        benefits: ['Health', 'Dental', 'Vision'],
        hiring_intent: 'Immediate',
        urgency: 'High',
        budget_range: '$100k-$150k',
        timeline: '1 month',
        contact_email: 'hr@company.com',
        status: 'active'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedJobPost
      } as Response);

      const result = await jobPersonaService.updateJobPost('123', updateData);

      expect(result.success).toBe(true);
      expect(result.jobPost).toEqual(mockUpdatedJobPost);
      expect(mockFetch).toHaveBeenCalledWith(`${XANO_BASE_URL}/job_post/123`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.any(String)
        },
        body: JSON.stringify(updateData)
      });
    });

    test('handles validation errors during update', async () => {
      const invalidUpdateData = {
        title: '', // Invalid empty title
        salary_range: 'invalid-salary'
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Invalid data' })
      } as Response);

      const result = await jobPersonaService.updateJobPost('123', invalidUpdateData);

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });

    test('handles network errors during update', async () => {
      const updateData = { title: 'Updated Title' };

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await jobPersonaService.updateJobPost('123', updateData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });
  });

  describe('deleteJobPost', () => {
    test('successfully deletes job post', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Deleted successfully' })
      } as Response);

      const result = await jobPersonaService.deleteJobPost('123');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Job post deleted successfully');
      expect(mockFetch).toHaveBeenCalledWith(`${XANO_BASE_URL}/job_post/123`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.any(String)
        }
      });
    });

    test('handles not found error during deletion', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Job post not found' })
      } as Response);

      const result = await jobPersonaService.deleteJobPost('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });

    test('handles network errors during deletion', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await jobPersonaService.deleteJobPost('123');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });
  });

  describe('getJobPostsByTeam - additional tests', () => {
    test('handles empty team results', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      } as Response);

      const result = await jobPersonaService.getJobPostsByTeam('empty-team');

      expect(result.success).toBe(true);
      expect(result.jobPosts).toEqual([]);
    });

    test('handles unauthorized access', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Unauthorized' })
      } as Response);

      const result = await jobPersonaService.getJobPostsByTeam('team1');

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });
  });

  describe('createJobPost - additional tests', () => {
    test('handles network errors during creation', async () => {
      const newPersona = {
        team_id: 'team1',
        title: 'Test Developer',
        description: 'Test description',
        requirements: 'Test requirements',
        responsibilities: 'Test responsibilities',
        skills: ['Test'],
        experience_level: 'Junior',
        employment_type: 'Full-time',
        location: 'Remote',
        salary_range: '$50k-$70k',
        benefits: ['Health'],
        hiring_intent: 'Immediate',
        urgency: 'Medium',
        budget_range: '$50k-$70k',
        timeline: '1 month',
        contact_email: 'test@company.com'
      };

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await jobPersonaService.createJobPost(newPersona);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });
  });

  describe('authentication headers', () => {
    test('includes auth token when available', async () => {
      // Ensure token is available
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => 'test-token'),
          setItem: jest.fn(),
          removeItem: jest.fn(),
        },
        writable: true,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      } as Response);

      await jobPersonaService.getJobPostsByTeam('team1');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token'
          }
        })
      );
    });

    test('excludes auth token when not available', async () => {
      // Mock no token available
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => null),
          setItem: jest.fn(),
          removeItem: jest.fn(),
        },
        writable: true,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      } as Response);

      await jobPersonaService.getJobPostsByTeam('team1');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json'
            // No Authorization header
          }
        })
      );
    });
  });
});
