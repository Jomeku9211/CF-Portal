import { userService } from '../../../modules/shared/services/userService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Role Selection API Tests', () => {
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
