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
});
