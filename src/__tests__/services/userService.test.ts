import { userService } from '../../services/userService';

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

describe('UserService', () => {
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
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await userService.updateCurrentUserRole('developer');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/auth/me',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      );
    });

    it('should not include authorization header when token does not exist', async () => {
      mockGetItem.mockReturnValue(null);
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await userService.updateCurrentUserRole('developer');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/auth/me',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.anything(),
          }),
        })
      );
    });
  });

  describe('updateCurrentUserRole', () => {
    const role = 'developer';

    it('should update user role successfully with PATCH', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: true
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/auth/me',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify({ role }),
        }
      );
    });

    it('should retry with PUT when PATCH fails with missing fields error', async () => {
      // Mock user data in localStorage
      const mockUser = {
        name: 'John Doe',
        email: 'john@example.com',
        id: 'user-123'
      };
      mockGetItem.mockImplementation((key) => {
        if (key === 'authToken') return 'test-token';
        if (key === 'currentUser') return JSON.stringify(mockUser);
        return null;
      });

      // First call (PATCH) fails
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({ message: 'Missing required fields' })
        }),
        json: jest.fn().mockResolvedValue({ message: 'Missing required fields' })
      };

      // Second call (PUT) succeeds
      const successResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };

      mockFetch
        .mockResolvedValueOnce(failedResponse as any)
        .mockResolvedValueOnce(successResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: true
      });

      expect(mockFetch).toHaveBeenCalledTimes(2);

      // First call should be PATCH
      expect(mockFetch).toHaveBeenNthCalledWith(1,
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/auth/me',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify({ role }),
        }
      );

      // Second call should be PUT with full payload
      expect(mockFetch).toHaveBeenNthCalledWith(2,
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/auth/me',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            role
          }),
        }
      );
    });

    it('should handle PATCH failure with fallback to default values when no user in localStorage', async () => {
      mockGetItem.mockImplementation((key) => {
        if (key === 'authToken') return 'test-token';
        if (key === 'currentUser') return null;
        return null;
      });

      // First call (PATCH) fails
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({ message: 'Missing required fields' })
        }),
        json: jest.fn().mockResolvedValue({ message: 'Missing required fields' })
      };

      // Second call (PUT) succeeds
      const successResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };

      mockFetch
        .mockResolvedValueOnce(failedResponse as any)
        .mockResolvedValueOnce(successResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: true
      });

      // Second call should be PUT with default values
      expect(mockFetch).toHaveBeenNthCalledWith(2,
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/auth/me',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify({
            name: '',
            email: '',
            role
          }),
        }
      );
    });

    it('should handle PATCH failure that is not a 400 error', async () => {
      const failedResponse = {
        ok: false,
        status: 403,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({ message: 'Forbidden' })
        }),
        json: jest.fn().mockResolvedValue({ message: 'Forbidden' })
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Forbidden'
      });

      // Should only make one call (no retry)
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle PATCH failure with 400 but no missing fields keyword', async () => {
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({ message: 'Invalid role value' })
        }),
        json: jest.fn().mockResolvedValue({ message: 'Invalid role value' })
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Invalid role value'
      });

      // Should only make one call (no retry)
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle error response without message', async () => {
      const failedResponse = {
        ok: false,
        status: 500,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({})
        }),
        json: jest.fn().mockResolvedValue({})
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Failed to update role (500)'
      });
    });

    it('should handle error response with alternative error fields', async () => {
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({ error: 'Role update failed' })
        }),
        json: jest.fn().mockResolvedValue({ error: 'Role update failed' })
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Role update failed'
      });
    });

    it('should handle JSON parsing error in clone response', async () => {
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
        }),
        json: jest.fn().mockResolvedValue({ message: 'Server error' })
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Server error'
      });
    });

    it('should handle JSON parsing error in final response', async () => {
      const failedResponse = {
        ok: false,
        status: 500,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({})
        }),
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Failed to update role (500)'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    it('should handle invalid JSON in localStorage', async () => {
      mockGetItem.mockImplementation((key) => {
        if (key === 'authToken') return 'test-token';
        if (key === 'currentUser') return 'invalid-json';
        return null;
      });

      // The invalid JSON will cause JSON.parse to throw, which gets caught by the outer catch block
      const result = await userService.updateCurrentUserRole(role);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });

      // Should only make one call since JSON.parse throws before retry logic
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUserById', () => {
    const userId = 'user-123';
    const updateData = { name: 'Updated Name', role: 'admin' };

    it('should update user by ID successfully with PATCH', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await userService.updateUserById(userId, updateData);

      expect(result).toEqual({
        success: true
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/user/user-123',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify(updateData),
        }
      );
    });

    it('should retry with PUT when PATCH fails with missing fields error', async () => {
      // Mock user data in localStorage
      const mockUser = {
        name: 'John Doe',
        email: 'john@example.com',
        id: 'user-123',
        role: 'user'
      };
      mockGetItem.mockImplementation((key) => {
        if (key === 'authToken') return 'test-token';
        if (key === 'currentUser') return JSON.stringify(mockUser);
        return null;
      });

      // First call (PATCH) fails
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({ message: 'Missing required fields' })
        }),
        json: jest.fn().mockResolvedValue({ message: 'Missing required fields' })
      };

      // Second call (PUT) succeeds
      const successResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };

      mockFetch
        .mockResolvedValueOnce(failedResponse as any)
        .mockResolvedValueOnce(successResponse as any);

      const result = await userService.updateUserById(userId, updateData);

      expect(result).toEqual({
        success: true
      });

      expect(mockFetch).toHaveBeenCalledTimes(2);

      // Second call should be PUT with merged payload
      expect(mockFetch).toHaveBeenNthCalledWith(2,
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/user/user-123',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify({
            name: 'Updated Name', // From updateData
            email: 'john@example.com',
            id: 'user-123',
            role: 'admin' // From updateData overriding original
          }),
        }
      );
    });

    it('should handle error response with different error field names', async () => {
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({})
        }),
        json: jest.fn().mockResolvedValue({ detail: 'Validation error' })
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateUserById(userId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Validation error'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await userService.updateUserById(userId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    it('should handle empty update data', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await userService.updateUserById(userId, {});

      expect(result).toEqual({
        success: true
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/user/user-123',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify({}),
        }
      );
    });

    it('should handle JSON parsing error in clone response', async () => {
      const failedResponse = {
        ok: false,
        status: 400,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
        }),
        json: jest.fn().mockResolvedValue({ message: 'Server error' })
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateUserById(userId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Server error'
      });
    });

    it('should handle non-400 error without retry', async () => {
      const failedResponse = {
        ok: false,
        status: 404,
        clone: jest.fn().mockReturnValue({
          json: jest.fn().mockResolvedValue({ message: 'User not found' })
        }),
        json: jest.fn().mockResolvedValue({ message: 'User not found' })
      };

      mockFetch.mockResolvedValueOnce(failedResponse as any);

      const result = await userService.updateUserById(userId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'User not found'
      });

      // Should only make one call (no retry)
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle different exception types', async () => {
      mockFetch.mockRejectedValue('String error');

      const result = await userService.updateCurrentUserRole('developer');

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    it('should handle null exception', async () => {
      mockFetch.mockRejectedValue(null);

      const result = await userService.updateUserById('user-123', {});

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });
  });
});
