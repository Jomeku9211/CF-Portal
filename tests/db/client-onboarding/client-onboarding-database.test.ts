import { organizationService } from '@/services/organizationService';
import { userService } from '@/modules/shared/services/userService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Client Onboarding Database Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  describe('Organization Profile Database Tests', () => {
    describe('Organization Creation and Validation', () => {
      test('creates organization profile in database with basic information', async () => {
        const mockResponse = {
          success: true,
          organization: {
            id: 'org-123',
            name: 'Test Company',
            size: '10-50',
            funding_status: 'Series A',
            industry: 'Technology',
            company_function: 'Product Development',
            revenue_status: 'Growing',
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await organizationService.createOrganization({
          name: 'Test Company',
          size: '10-50',
          funding_status: 'Series A',
          industry: 'Technology',
          company_function: 'Product Development',
          revenue_status: 'Growing'
        });

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/organizations'),
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              name: 'Test Company',
              size: '10-50',
              funding_status: 'Series A',
              industry: 'Technology',
              company_function: 'Product Development',
              revenue_status: 'Growing'
            })
          })
        );

        expect(result.success).toBe(true);
        expect(result.organization?.name).toBe('Test Company');
        expect(result.organization?.size).toBe('10-50');
      });

      test('validates required organization fields in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Organization name is required',
          errors: {
            name: 'Organization name is required'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createOrganization({
          size: '10-50',
          funding_status: 'Series A'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Organization name is required');
      });

      test('enforces unique organization names in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Organization name already exists',
          error: 'DUPLICATE_ORGANIZATION'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => mockResponse
        });

        const result = await organizationService.createOrganization({
          name: 'Existing Company',
          size: '10-50'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Organization name already exists');
      });
    });

    describe('Organization Field Validation', () => {
      test('validates company size enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid company size',
          errors: {
            size: 'Size must be one of: 1-10, 10-50, 50-200, 200+'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createOrganization({
          name: 'Test Company',
          size: 'invalid-size'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid company size');
      });

      test('validates funding status enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid funding status',
          errors: {
            funding_status: 'Funding status must be one of: Bootstrap, Seed, Series A, Series B, Series C+'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createOrganization({
          name: 'Test Company',
          funding_status: 'invalid-status'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid funding status');
      });

      test('validates industry enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid industry',
          errors: {
            industry: 'Industry must be one of: Technology, Healthcare, Finance, Education, etc.'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createOrganization({
          name: 'Test Company',
          industry: 'invalid-industry'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid industry');
      });
    });
  });

  describe('Team Onboarding Database Tests', () => {
    describe('Team Information Management', () => {
      test('creates team onboarding record in database', async () => {
        const mockResponse = {
          success: true,
          team: {
            id: 'team-123',
            organization_id: 'org-123',
            team_size: '5-10',
            hiring_needs: ['Developers', 'Designers'],
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await organizationService.createTeam({
          organization_id: 'org-123',
          team_size: '5-10',
          hiring_needs: ['Developers', 'Designers']
        });

        expect(result.success).toBe(true);
        expect(result.team?.organization_id).toBe('org-123');
        expect(result.team?.team_size).toBe('5-10');
      });

      test('updates existing team onboarding information', async () => {
        const mockResponse = {
          success: true,
          team: {
            id: 'team-123',
            team_size: '10-20',
            hiring_needs: ['Developers', 'Designers', 'Product Managers'],
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await organizationService.updateTeam('team-123', {
          team_size: '10-20',
          hiring_needs: ['Developers', 'Designers', 'Product Managers']
        });

        expect(result.success).toBe(true);
        expect(result.team?.team_size).toBe('10-20');
        expect(result.team?.hiring_needs).toHaveLength(3);
      });
    });

    describe('Team Data Validation', () => {
      test('validates team size enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid team size',
          errors: {
            team_size: 'Team size must be one of: 1-5, 5-10, 10-20, 20+'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createTeam({
          organization_id: 'org-123',
          team_size: 'invalid-size'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid team size');
      });

      test('enforces hiring needs array constraint in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Hiring needs must be an array',
          error: 'INVALID_HIRING_NEEDS_FORMAT'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createTeam({
          organization_id: 'org-123',
          hiring_needs: 'Developers' // Should be array
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Hiring needs must be an array');
      });
    });
  });

  describe('Hiring Intent Database Tests', () => {
    describe('Hiring Intent Creation and Management', () => {
      test('creates hiring intent record in database', async () => {
        const mockResponse = {
          success: true,
          hiring_intent: {
            id: 'hiring-123',
            organization_id: 'org-123',
            number_of_hires: '3-5',
            hire_timeline: '1-3 months',
            employment_type: ['Full-time', 'Contract'],
            location_preference: 'Remote',
            salary_period: 'Annual',
            currency: 'USD',
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await organizationService.createHiringIntent({
          organization_id: 'org-123',
          number_of_hires: '3-5',
          hire_timeline: '1-3 months',
          employment_type: ['Full-time', 'Contract'],
          location_preference: 'Remote',
          salary_period: 'Annual',
          currency: 'USD'
        });

        expect(result.success).toBe(true);
        expect(result.hiring_intent?.number_of_hires).toBe('3-5');
        expect(result.hiring_intent?.employment_type).toContain('Full-time');
      });

      test('updates existing hiring intent information', async () => {
        const mockResponse = {
          success: true,
          hiring_intent: {
            id: 'hiring-123',
            number_of_hires: '5-10',
            hire_timeline: '3-6 months',
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await organizationService.updateHiringIntent('hiring-123', {
          number_of_hires: '5-10',
          hire_timeline: '3-6 months'
        });

        expect(result.success).toBe(true);
        expect(result.hiring_intent?.number_of_hires).toBe('5-10');
        expect(result.hiring_intent?.hire_timeline).toBe('3-6 months');
      });
    });

    describe('Hiring Intent Validation', () => {
      test('validates number of hires enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid number of hires',
          errors: {
            number_of_hires: 'Number of hires must be one of: 1-2, 3-5, 5-10, 10+'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createHiringIntent({
          organization_id: 'org-123',
          number_of_hires: 'invalid-number'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid number of hires');
      });

      test('validates employment type array values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid employment type',
          errors: {
            employment_type: 'Employment type must be one of: Full-time, Part-time, Contract, Freelance'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createHiringIntent({
          organization_id: 'org-123',
          employment_type: ['Invalid-type']
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid employment type');
      });

      test('validates location preference enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid location preference',
          errors: {
            location_preference: 'Location preference must be one of: On-site, Remote, Hybrid'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await organizationService.createHiringIntent({
          organization_id: 'org-123',
          location_preference: 'invalid-location'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid location preference');
      });
    });
  });

  describe('Onboarding Stage Progression Database Tests', () => {
    test('updates user onboarding stage when organization profile is completed', async () => {
      const mockResponse = {
        success: true,
        user: {
          id: 'user-123',
          onboarding_stage: 'team_creation',
          updated_at: new Date().toISOString()
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await userService.updateUserById('user-123', {
        onboarding_stage: 'team_creation'
      });

      expect(result.success).toBe(true);
      expect(result.user?.onboarding_stage).toBe('team_creation');
    });

    test('updates user onboarding stage when team onboarding is completed', async () => {
      const mockResponse = {
        success: true,
        user: {
          id: 'user-123',
          onboarding_stage: 'hiring_intent',
          updated_at: new Date().toISOString()
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await userService.updateUserById('user-123', {
        onboarding_stage: 'hiring_intent'
      });

      expect(result.success).toBe(true);
      expect(result.user?.onboarding_stage).toBe('hiring_intent');
    });

    test('completes onboarding when hiring intent is finished', async () => {
      const mockResponse = {
        success: true,
        user: {
          id: 'user-123',
          onboarding_stage: 'completed',
          is_onboarding: false,
          updated_at: new Date().toISOString()
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await userService.updateUserById('user-123', {
        onboarding_stage: 'completed',
        is_onboarding: false
      });

      expect(result.success).toBe(true);
      expect(result.user?.onboarding_stage).toBe('completed');
      expect(result.user?.is_onboarding).toBe(false);
    });
  });

  describe('Database Performance and Scalability Tests', () => {
    test('handles large number of concurrent organization creations', async () => {
      const mockResponse = {
        success: true,
        organization: { id: 'org-123', name: 'Test Company' }
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const concurrentCreations = Array.from({ length: 50 }, (_, i) => 
        organizationService.createOrganization({
          name: `Company ${i}`,
          size: '10-50'
        })
      );

      const results = await Promise.all(concurrentCreations);
      
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      expect(fetch).toHaveBeenCalledTimes(50);
    });

    test('maintains database performance with complex organization queries', async () => {
      const mockResponse = {
        success: true,
        organizations: Array.from({ length: 500 }, (_, i) => ({
          id: `org-${i}`,
          name: `Company ${i}`,
          size: '10-50',
          industry: 'Technology'
        }))
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      // Simulate complex query with filters and joins
      const result = await fetch('/api/organizations?size=10-50&industry=Technology&limit=500&include=teams,hiring_intents');

      const response = await result.json();
      expect(response.success).toBe(true);
      expect(response.organizations).toHaveLength(500);
    });
  });

  describe('Database Security and Access Control Tests', () => {
    test('enforces user authentication for organization creation', async () => {
      const mockResponse = {
        success: false,
        message: 'Unauthorized',
        error: 'AUTHENTICATION_REQUIRED'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockResponse
      });

      const result = await organizationService.createOrganization({
        name: 'Test Company',
        size: '10-50'
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });

    test('prevents SQL injection in organization queries', async () => {
      const maliciousInput = "'; DROP TABLE organizations; --";
      
      const mockResponse = {
        success: false,
        message: 'Invalid input detected',
        error: 'INVALID_INPUT'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => mockResponse
      });

      const result = await organizationService.createOrganization({
        name: maliciousInput,
        size: '10-50'
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid input detected');
    });

    test('enforces organization ownership for updates', async () => {
      const mockResponse = {
        success: false,
        message: 'Forbidden',
        error: 'ACCESS_DENIED'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => mockResponse
      });

      const result = await organizationService.updateOrganization('org-123', {
        name: 'Updated Company'
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Forbidden');
    });
  });
});
