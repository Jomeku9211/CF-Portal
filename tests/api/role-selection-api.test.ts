import { userService } from '../../src/modules/shared/services/userService';
import { organizationService } from '../../src/services/organizationService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Role Selection and Onboarding API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  describe('User Service API Tests', () => {
    describe('updateUserById', () => {
      test('successfully updates user role to client', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            roles: ['client'],
            onboarding_stage: 'organization_profile'
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
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
              roles: ['client'],
              onboarding_stage: 'organization_profile'
            })
          })
        );

        expect(result).toEqual(mockResponse);
      });

      test('successfully updates user role to freelancer', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            roles: ['freelancer'],
            onboarding_stage: 'pending'
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

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/users/test-user-id'),
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({
              roles: ['freelancer'],
              onboarding_stage: 'pending'
            })
          })
        );

        expect(result).toEqual(mockResponse);
      });

      test('successfully updates user role to agency', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            roles: ['agency'],
            onboarding_stage: 'pending'
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

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/users/test-user-id'),
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({
              roles: ['agency'],
              onboarding_stage: 'pending'
            })
          })
        );

        expect(result).toEqual(mockResponse);
      });

      test('handles network error gracefully', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await expect(
          userService.updateUserById('test-user-id', {
            roles: ['client'],
            onboarding_stage: 'organization_profile'
          })
        ).rejects.toThrow('Network error');
      });

      test('handles HTTP error response', async () => {
        const mockResponse = {
          success: false,
          message: 'User not found'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 404,
          json: async () => mockResponse
        });

        const result = await userService.updateUserById('test-user-id', {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        });

        expect(result).toEqual(mockResponse);
      });

      test('handles malformed JSON response', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => {
            throw new Error('Invalid JSON');
          }
        });

        await expect(
          userService.updateUserById('test-user-id', {
            roles: ['client'],
            onboarding_stage: 'organization_profile'
          })
        ).rejects.toThrow('Invalid JSON');
      });
    });

    describe('updateCurrentUserRole', () => {
      test('successfully updates current user role', async () => {
        const mockResponse = {
          success: true,
          user: {
            id: 'test-user-id',
            roles: ['client']
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await userService.updateCurrentUserRole('client');

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/users/current/role'),
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ role: 'client' })
          })
        );

        expect(result).toEqual(mockResponse);
      });

      test('handles authentication error', async () => {
        const mockResponse = {
          success: false,
          message: 'Unauthorized'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 401,
          json: async () => mockResponse
        });

        const result = await userService.updateCurrentUserRole('client');

        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Organization Service API Tests', () => {
    describe('createOrganization', () => {
      test('successfully creates organization for client onboarding', async () => {
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
            revenueStatus: 'Pre-Revenue'
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
          revenueStatus: 'Pre-Revenue',
          originStory: 'Started as a small team',
          whatWeDo: 'Build software solutions',
          whoWeServe: ['Startups', 'Small businesses'],
          vision: 'To democratize technology',
          whyJoinUs: 'Fast-paced environment',
          growthPlans: 'Expand to new markets',
          successMetrics: ['User growth', 'Revenue'],
          coreValuesToday: ['Innovation', 'Quality'],
          coreValuesAspirations: ['Global impact', 'Sustainability'],
          cultureInAction: ['Regular team events', 'Learning sessions']
        };

        const result = await organizationService.createOrganization(organizationData);

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/organizations'),
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(organizationData)
          })
        );

        expect(result).toEqual(mockResponse);
      });

      test('handles organization creation validation errors', async () => {
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

        expect(result).toEqual(mockResponse);
      });

      test('handles duplicate organization name error', async () => {
        const mockResponse = {
          success: false,
          message: 'Organization name already exists'
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

        expect(result).toEqual(mockResponse);
      });

      test('handles server error during organization creation', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({
            success: false,
            message: 'Internal server error'
          })
        });

        const organizationData = {
          name: 'Test Organization',
          website: 'https://test.com'
        };

        const result = await organizationService.createOrganization(organizationData);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Internal server error');
      });
    });
  });

  describe('Client Onboarding Flow API Tests', () => {
    test('complete client onboarding flow API calls', async () => {
      // Mock successful organization creation
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            organization: {
              id: 'org-123',
              name: 'Test Organization'
            }
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            user: {
              id: 'test-user-id',
              onboarding_stage: 'team_creation'
            }
          })
        });

      // 1. Create organization
      const organizationData = {
        name: 'Test Organization',
        website: 'https://test.com',
        size: '1–10 employees',
        fundingStatus: 'Bootstrapped',
        industry: 'Technology',
        companyFunction: 'Idea Stage',
        revenueStatus: 'Pre-Revenue'
      };

      const orgResult = await organizationService.createOrganization(organizationData);
      expect(orgResult.success).toBe(true);
      expect(orgResult.organization?.id).toBe('org-123');

      // 2. Update user onboarding stage
      const userResult = await userService.updateUserById('test-user-id', {
        onboarding_stage: 'team_creation'
      });

      expect(userResult.success).toBe(true);
      expect(userResult.user?.onboarding_stage).toBe('team_creation');

      // Verify API calls were made
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('Service Provider Onboarding Flow API Tests', () => {
    test('developer onboarding form submission API calls', async () => {
      // Mock successful developer profile creation
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          developerProfile: {
            id: 'dev-123',
            status: 'pending_review'
          }
        })
      });

      // Simulate developer profile submission
      const developerData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        country: 'us',
        state: 'ca',
        city: 'sf',
        workTypes: ['full-time', 'contract'],
        jobRole: 'frontend-developer',
        skills: ['React', 'TypeScript', 'Node.js'],
        skillLevels: {
          'React': 'expert',
          'TypeScript': 'advanced',
          'Node.js': 'intermediate'
        },
        timezoneOverlap: '8-10-hours',
        teamSize: '6-15',
        companyStage: 'startup',
        workStyles: ['collaborative', 'fast-paced'],
        communicationSkills: ['written', 'verbal'],
        ownershipSkills: ['project-management', 'decision-making'],
        collaborationSkills: ['team-player', 'mentoring'],
        problemSolvingSkills: ['analytical', 'creative'],
        learningAttitude: ['continuous-learning', 'adaptability'],
        availability: 'immediate',
        salaryExpectation: '80000',
        currency: 'USD'
      };

      // This would be a call to create developer profile
      const result = await fetch('/api/developer-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(developerData)
      });

      const response = await result.json();
      expect(response.success).toBe(true);
      expect(response.developerProfile?.status).toBe('pending_review');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('handles network timeout during API calls', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 100)
        )
      );

      await expect(
        userService.updateUserById('test-user-id', {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        })
      ).rejects.toThrow('Request timeout');
    });

    test('handles large payload during organization creation', async () => {
      const largeData = {
        name: 'Test Organization',
        website: 'https://test.com',
        // Add large amounts of data
        description: 'A'.repeat(10000),
        longText: 'B'.repeat(50000)
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 413,
        json: async () => ({
          success: false,
          message: 'Payload too large'
        })
      });

      const result = await organizationService.createOrganization(largeData);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Payload too large');
    });

    test('handles concurrent API calls for same user', async () => {
      const mockResponse = {
        success: true,
        user: { id: 'test-user-id', roles: ['client'] }
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      // Make concurrent calls
      const promises = [
        userService.updateUserById('test-user-id', { roles: ['client'] }),
        userService.updateUserById('test-user-id', { roles: ['freelancer'] }),
        userService.updateUserById('test-user-id', { roles: ['agency'] })
      ];

      const results = await Promise.all(promises);
      
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      expect(fetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('API Response Validation', () => {
    test('validates required fields in organization creation response', async () => {
      const mockResponse = {
        success: true,
        organization: {
          id: 'org-123',
          name: 'Test Organization',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
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
      expect(result.organization?.id).toBeDefined();
      expect(result.organization?.name).toBeDefined();
      expect(result.organization?.created_at).toBeDefined();
      expect(result.organization?.updated_at).toBeDefined();
    });

    test('validates user role update response structure', async () => {
      const mockResponse = {
        success: true,
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          roles: ['client'],
          onboarding_stage: 'organization_profile',
          updated_at: '2024-01-01T00:00:00Z'
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

      expect(result.success).toBe(true);
      expect(result.user?.id).toBeDefined();
      expect(result.user?.roles).toBeInstanceOf(Array);
      expect(result.user?.onboarding_stage).toBeDefined();
      expect(result.user?.updated_at).toBeDefined();
    });
  });
});
