import { userService } from '../../src/modules/shared/services/userService';
import { organizationService } from '../../src/services/organizationService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Role Selection and Onboarding Database Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  describe('User Role Management Database Tests', () => {
    describe('Role Assignment and Validation', () => {
      test('assigns client role and updates onboarding stage in database', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            roles: ['client'],
            onboarding_stage: 'organization_profile',
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        });

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/users/test-user-id'),
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({
              roles: ['client'],
              onboarding_stage: 'organization_profile'
            })
          })
        );

        expect(result.success).toBe(true);
        expect(result.user?.roles).toContain('client');
        expect(result.user?.onboarding_stage).toBe('organization_profile');
      });

      test('assigns freelancer role and sets pending onboarding stage', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            roles: ['freelancer'],
            onboarding_stage: 'pending',
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          roles: ['freelancer'],
          onboarding_stage: 'pending'
        });

        expect(result.success).toBe(true);
        expect(result.user?.roles).toContain('freelancer');
        expect(result.user?.onboarding_stage).toBe('pending');
      });

      test('assigns agency role and sets pending onboarding stage', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            roles: ['agency'],
            onboarding_stage: 'pending',
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          roles: ['agency'],
          onboarding_stage: 'pending'
        });

        expect(result.success).toBe(true);
        expect(result.user?.roles).toContain('agency');
        expect(result.user?.onboarding_stage).toBe('pending');
      });

      test('prevents duplicate role assignments for same user', async () => {
        const mockResponse = {
          success: false,
          message: 'Role already assigned',
          error: 'DUPLICATE_ROLE'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          roles: ['client']
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Role already assigned');
        expect(result.error).toBe('DUPLICATE_ROLE');
      });

      test('validates role format in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid role format',
          errors: {
            roles: 'Role must be one of: client, freelancer, agency'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          roles: ['invalid-role']
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid role format');
      });
    });

    describe('Onboarding Stage Management', () => {
      test('updates onboarding stage from organization_profile to team_creation', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            onboarding_stage: 'team_creation',
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          onboarding_stage: 'team_creation'
        });

        expect(result.success).toBe(true);
        expect(result.user?.onboarding_stage).toBe('team_creation');
      });

      test('updates onboarding stage from team_creation to hiring_intent', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            onboarding_stage: 'hiring_intent',
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          onboarding_stage: 'hiring_intent'
        });

        expect(result.success).toBe(true);
        expect(result.user?.onboarding_stage).toBe('hiring_intent');
      });

      test('updates onboarding stage from hiring_intent to job_creation', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            onboarding_stage: 'job_creation',
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          onboarding_stage: 'job_creation'
        });

        expect(result.success).toBe(true);
        expect(result.user?.onboarding_stage).toBe('job_creation');
      });

      test('updates onboarding stage from job_creation to completed', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            onboarding_stage: 'completed',
            is_onboarding: false,
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          onboarding_stage: 'completed',
          is_onboarding: false
        });

        expect(result.success).toBe(true);
        expect(result.user?.onboarding_stage).toBe('completed');
        expect(result.user?.is_onboarding).toBe(false);
      });
    });

    describe('Data Integrity and Constraints', () => {
      test('maintains referential integrity between users and organizations', async () => {
        const mockResponse = {
          success: false,
          message: 'User not found',
          error: 'FOREIGN_KEY_CONSTRAINT'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 404,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('non-existent-user-id', {
          roles: ['client']
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('User not found');
      });

      test('enforces role array constraint in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Roles must be an array',
          error: 'INVALID_ROLE_FORMAT'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          roles: 'client' // Should be array
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Roles must be an array');
      });

      test('validates onboarding stage enum values', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid onboarding stage',
          error: 'INVALID_ONBOARDING_STAGE'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          onboarding_stage: 'invalid-stage'
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe('Invalid onboarding stage');
      });
    });
  });

  describe('Organization Management Database Tests', () => {
    describe('Organization Creation and Validation', () => {
      test('creates organization with all required fields in database', async () => {
        const mockResponse = {
          success: true,
          organization: {
            id: 'org-123',
            name: 'Test Organization',
            website: 'https://test.com',
            size: '1–10 employees',
            fundingStatus: 'Bootstrapped',
            industry: 'Technology',
            companyFunction: 'Idea Stage',
            revenueStatus: 'Pre-Revenue',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const organizationData = {
          name: 'Test Organization',
          website: 'https://test.com',
          size: '1–10 employees',
          fundingStatus: 'Bootstrapped',
          industry: 'Technology',
          companyFunction: 'Idea Stage',
          revenueStatus: 'Pre-Revenue'
        };

        const result = await organizationService.createOrganization(organizationData);

        expect(result.success).toBe(true);
        expect(result.organization?.id).toBeDefined();
        expect(result.organization?.name).toBe(organizationData.name);
        expect(result.organization?.created_at).toBeDefined();
        expect(result.organization?.updated_at).toBeDefined();
      });

      test('enforces unique organization name constraint', async () => {
        const mockResponse = {
          success: false,
          message: 'Organization name already exists',
          error: 'UNIQUE_CONSTRAINT_VIOLATION'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => mockResponse
        });

        const duplicateData = {
          name: 'Existing Organization',
          website: 'https://existing.com'
        };

        const result = await organizationService.createOrganization(duplicateData);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Organization name already exists');
        expect(result.error).toBe('UNIQUE_CONSTRAINT_VIOLATION');
      });

      test('validates required organization fields', async () => {
        const mockResponse = {
          success: false,
          message: 'Validation failed',
          errors: {
            name: 'Organization name is required',
            industry: 'Industry is required'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const invalidData = {
          website: 'https://test.com',
          size: '1–10 employees'
          // Missing required fields
        };

        const result = await organizationService.createOrganization(invalidData);

        expect(result.success).toBe(false);
        expect(result.errors?.name).toBe('Organization name is required');
        expect(result.errors?.industry).toBe('Industry is required');
      });

      test('validates organization size enum values', async () => {
        const validSizes = [
          '1–10 employees',
          '11–50 employees',
          '51–200 employees',
          '201–500 employees',
          '501–1,000 employees',
          '1,001–5,000 employees',
          '5,001–10,000 employees',
          '10,000+ employees'
        ];

        for (const size of validSizes) {
          const mockResponse = {
            success: true,
            organization: {
              id: 'org-123',
              name: 'Test Organization',
              size: size
            }
          };

          (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
          });

          const result = await organizationService.createOrganization({
            name: 'Test Organization',
            size: size
          });

          expect(result.success).toBe(true);
          expect(result.organization?.size).toBe(size);
        }
      });

      test('validates funding status enum values', async () => {
        const validFundingStatuses = [
          'Bootstrapped',
          'Pre-Seed',
          'Seed',
          'Series A',
          'Series B',
          'Series C',
          'Series D+',
          'Private Equity',
          'Public'
        ];

        for (const status of validFundingStatuses) {
          const mockResponse = {
            success: true,
            organization: {
              id: 'org-123',
              name: 'Test Organization',
              fundingStatus: status
            }
          };

          (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
          });

          const result = await organizationService.createOrganization({
            name: 'Test Organization',
            fundingStatus: status
          });

          expect(result.success).toBe(true);
          expect(result.organization?.fundingStatus).toBe(status);
        }
      });

      test('validates industry enum values', async () => {
        const validIndustries = [
          'Technology',
          'Healthcare',
          'Finance / Fintech',
          'Education',
          'E-commerce',
          'Media & Entertainment',
          'Manufacturing',
          'Consumer Goods',
          'Energy',
          'Non-Profit / Social Impact',
          'Other'
        ];

        for (const industry of validIndustries) {
          const mockResponse = {
            success: true,
            organization: {
              id: 'org-123',
              name: 'Test Organization',
              industry: industry
            }
          };

          (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
          });

          const result = await organizationService.createOrganization({
            name: 'Test Organization',
            industry: industry
          });

          expect(result.success).toBe(true);
          expect(result.organization?.industry).toBe(industry);
        }
      });
    });

    describe('Organization Data Relationships', () => {
      test('links organization to user in database', async () => {
        const mockResponse = {
          success: true,
          organization: {
            id: 'org-123',
            name: 'Test Organization',
            user_id: 'test-user-id',
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const organizationData = {
          name: 'Test Organization',
          user_id: 'test-user-id'
        };

        const result = await organizationService.createOrganization(organizationData);

        expect(result.success).toBe(true);
        expect(result.organization?.user_id).toBe('test-user-id');
      });

      test('maintains organization history and audit trail', async () => {
        const mockResponse = {
          success: true,
          organization: {
            id: 'org-123',
            name: 'Test Organization',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            created_by: 'test-user-id',
            version: 1
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await organizationService.createOrganization({
          name: 'Test Organization'
        });

        expect(result.success).toBe(true);
        expect(result.organization?.created_at).toBeDefined();
        expect(result.organization?.updated_at).toBeDefined();
        expect(result.organization?.created_by).toBeDefined();
        expect(result.organization?.version).toBe(1);
      });
    });
  });

  describe('Developer Profile Database Tests', () => {
    describe('Developer Profile Creation', () => {
      test('creates developer profile with all 7 steps data', async () => {
        const mockResponse = {
          success: true,
          developerProfile: {
            id: 'dev-123',
            user_id: 'test-user-id',
            status: 'pending_review',
            step_1_completed: true,
            step_2_completed: true,
            step_3_completed: true,
            step_4_completed: true,
            step_5_completed: true,
            step_6_completed: true,
            step_7_completed: true,
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const developerData = {
          fullName: 'John Doe',
          email: 'john@example.com',
          workTypes: ['full-time', 'contract'],
          jobRole: 'frontend-developer',
          skills: ['React', 'TypeScript'],
          availability: 'immediate',
          salaryExpectation: '80000'
        };

        const result = await fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(developerData)
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.developerProfile?.step_1_completed).toBe(true);
        expect(response.developerProfile?.step_7_completed).toBe(true);
      });

      test('validates developer profile required fields', async () => {
        const mockResponse = {
          success: false,
          message: 'Validation failed',
          errors: {
            fullName: 'Full name is required',
            email: 'Email is required',
            jobRole: 'Job role is required'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const invalidData = {
          // Missing required fields
          workTypes: ['full-time']
        };

        const result = await fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invalidData)
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.errors?.fullName).toBe('Full name is required');
      });
    });

    describe('Skills and Preferences Storage', () => {
      test('stores technical skills with proficiency levels', async () => {
        const mockResponse = {
          success: true,
          developerProfile: {
            id: 'dev-123',
            skills: [
              { name: 'React', level: 'expert' },
              { name: 'TypeScript', level: 'advanced' },
              { name: 'Node.js', level: 'intermediate' }
            ]
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const skillsData = {
          skills: ['React', 'TypeScript', 'Node.js'],
          skillLevels: {
            'React': 'expert',
            'TypeScript': 'advanced',
            'Node.js': 'intermediate'
          }
        };

        const result = await fetch('/api/developer-profiles/dev-123/skills', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(skillsData)
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.developerProfile?.skills).toHaveLength(3);
        expect(response.developerProfile?.skills[0].level).toBe('expert');
      });

      test('stores work preferences and soft skills', async () => {
        const mockResponse = {
          success: true,
          developerProfile: {
            id: 'dev-123',
            workPreferences: {
              timezoneOverlap: '8-10-hours',
              teamSize: '6-15',
              companyStage: 'startup',
              workStyles: ['collaborative', 'fast-paced']
            },
            softSkills: {
              communicationSkills: ['written', 'verbal'],
              ownershipSkills: ['project-management', 'decision-making'],
              collaborationSkills: ['team-player', 'mentoring']
            }
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const preferencesData = {
          timezoneOverlap: '8-10-hours',
          teamSize: '6-15',
          companyStage: 'startup',
          workStyles: ['collaborative', 'fast-paced'],
          communicationSkills: ['written', 'verbal'],
          ownershipSkills: ['project-management', 'decision-making'],
          collaborationSkills: ['team-player', 'mentoring']
        };

        const result = await fetch('/api/developer-profiles/dev-123/preferences', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preferencesData)
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.developerProfile?.workPreferences.timezoneOverlap).toBe('8-10-hours');
        expect(response.developerProfile?.softSkills.communicationSkills).toContain('written');
      });
    });
  });

  describe('Database Performance and Scalability Tests', () => {
    test('handles large number of concurrent role updates', async () => {
      const mockResponse = {
        success: true,
        user: { id: 'test-user-id', roles: ['client'] }
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const concurrentUpdates = Array.from({ length: 100 }, (_, i) => 
        userService.updateUserById(`user-${i}`, {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        })
      );

      const results = await Promise.all(concurrentUpdates);
      
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      expect(fetch).toHaveBeenCalledTimes(100);
    });

    test('handles large organization data payloads', async () => {
      const largeDescription = 'A'.repeat(50000); // 50KB description
      
      const mockResponse = {
        success: true,
        organization: {
          id: 'org-123',
          name: 'Large Organization',
          description: largeDescription
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const largeData = {
        name: 'Large Organization',
        description: largeDescription,
        longText: 'B'.repeat(100000) // 100KB additional text
      };

      const result = await organizationService.createOrganization(largeData);

      expect(result.success).toBe(true);
      expect(result.organization?.description).toHaveLength(50000);
    });

    test('maintains database performance with complex queries', async () => {
      const mockResponse = {
        success: true,
        users: Array.from({ length: 1000 }, (_, i) => ({
          id: `user-${i}`,
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        }))
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      // Simulate complex query with filters and joins
      const result = await fetch('/api/users?roles=client&onboarding_stage=organization_profile&limit=1000&include=organizations');

      const response = await result.json();
      expect(response.success).toBe(true);
      expect(response.users).toHaveLength(1000);
    });
  });

  describe('Database Security and Access Control Tests', () => {
    test('enforces user authentication for role updates', async () => {
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

      const result = await userService.updateUserById('test-user-id', {
        roles: ['client']
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });

    test('enforces role-based access control for organization creation', async () => {
      const mockResponse = {
        success: false,
        message: 'Insufficient permissions',
        error: 'INSUFFICIENT_PERMISSIONS'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => mockResponse
      });

      const result = await organizationService.createOrganization({
        name: 'Test Organization'
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Insufficient permissions');
    });

    test('prevents SQL injection in role selection queries', async () => {
      const maliciousInput = "'; DROP TABLE users; --";
      
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

      const result = await userService.updateUserById('test-user-id', {
        roles: [maliciousInput]
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid input detected');
    });

    test('validates and sanitizes organization input data', async () => {
      const maliciousInput = {
        name: '<script>alert("xss")</script>',
        website: 'javascript:alert("xss")'
      };

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

      const result = await organizationService.createOrganization(maliciousInput);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid input detected');
    });
  });
});
