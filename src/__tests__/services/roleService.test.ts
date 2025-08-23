import { roleService, RoleOption } from '../../services/roleService';

// Mock fetch globally
global.fetch = jest.fn();

describe('RoleService', () => {
  const mockRoleOptions: RoleOption[] = [
    {
      id: 'client',
      name: 'Client',
      description: 'I\'m an IT founder or HR looking to hire developers for my company or team.',
      buttonLabel: 'Hire Talent',
      icon: 'users'
    },
    {
      id: 'freelancer',
      name: 'Service Provider',
      description: 'I\'m a developer who wants to list myself and get hired by startups and companies.',
      buttonLabel: 'List Myself',
      icon: 'user'
    },
    {
      id: 'agency',
      name: 'Agency Owner',
      description: 'I run a team or agency and want to list my employees for outsourced projects.',
      buttonLabel: 'List My Team',
      icon: 'building'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  describe('getRoleOptions', () => {
    test('successfully fetches role options', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => mockRoleOptions,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockRoleOptions);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/roles',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });

    test('handles API error response', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        json: async () => ({ message: 'Bad Request' }),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Bad Request');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('handles API error response without message', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: async () => ({}),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to fetch roles (500)');
    });

    test('handles network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred');
    });

    test('handles JSON parsing error in error response', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: async () => { throw new Error('Invalid JSON'); },
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to fetch roles (500)');
    });

    test('includes auth token in headers when available', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => mockRoleOptions,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('valid-token');
      
      await roleService.getRoleOptions();
      
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/roles',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer valid-token',
          },
        }
      );
    });

    test('omits auth header when token is not available', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => mockRoleOptions,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      
      await roleService.getRoleOptions();
      
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/roles',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });

    test('handles empty response data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => [],
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    test('handles null response data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => null,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
    });

    test('logs API call details for debugging', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => mockRoleOptions,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      await roleService.getRoleOptions();
      
      expect(consoleSpy).toHaveBeenCalledWith('Making API call to:', 'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/roles');
      expect(consoleSpy).toHaveBeenCalledWith('Response status:', 200);
      expect(consoleSpy).toHaveBeenCalledWith('Raw API response data:', mockRoleOptions);
      
      consoleSpy.mockRestore();
    });

    test('logs error details for debugging', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const mockResponse = {
        ok: false,
        status: 400,
        json: async () => ({ message: 'Validation Error' }),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      await roleService.getRoleOptions();
      
      expect(consoleSpy).toHaveBeenCalledWith('Error response data:', { message: 'Validation Error' });
      
      consoleSpy.mockRestore();
    });
  });

  describe('getAuthHeaders', () => {
    test('returns headers with auth token when available', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      // Access private method through the service instance
      const service = (roleService as any);
      const headers = service.getAuthHeaders();
      
      expect(headers).toEqual({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token',
      });
    });

    test('returns headers without auth token when not available', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      
      // Access private method through the service instance
      const service = (roleService as any);
      const headers = service.getAuthHeaders();
      
      expect(headers).toEqual({
        'Content-Type': 'application/json',
      });
    });

    test('returns headers without auth token when token is empty string', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('');
      
      // Access private method through the service instance
      const service = (roleService as any);
      const headers = service.getAuthHeaders();
      
      expect(headers).toEqual({
        'Content-Type': 'application/json',
      });
    });
  });

  describe('Error Handling Edge Cases', () => {
    test('handles fetch throwing TypeError', async () => {
      (global.fetch as jest.Mock).mockImplementation(() => {
        throw new TypeError('fetch is not a function');
      });
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred');
    });

    test('handles response.json throwing syntax error', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => { throw new SyntaxError('Invalid JSON'); },
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred');
    });

    test('handles localStorage.getItem throwing error', async () => {
      (window.localStorage.getItem as jest.Mock).mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred');
    });
  });

  describe('Response Data Validation', () => {
    test('handles malformed role data gracefully', async () => {
      const malformedData = [
        {
          id: 'client',
          name: 'Client',
          // Missing description and buttonLabel
          icon: 'users'
        }
      ];
      
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => malformedData,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(malformedData);
    });

    test('handles role data with extra fields', async () => {
      const extendedData = [
        {
          id: 'client',
          name: 'Client',
          description: 'Test description',
          buttonLabel: 'Test Button',
          icon: 'users',
          extraField: 'extra value',
          anotherField: 123
        }
      ];
      
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => extendedData,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const result = await roleService.getRoleOptions();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(extendedData);
    });
  });

  describe('Performance and Reliability', () => {
    test('handles slow network responses', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return mockRoleOptions;
        },
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const startTime = Date.now();
      const result = await roleService.getRoleOptions();
      const endTime = Date.now();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockRoleOptions);
      expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    });

    test('handles multiple concurrent calls', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => mockRoleOptions,
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (window.localStorage.getItem as jest.Mock).mockReturnValue('test-token');
      
      const promises = [
        roleService.getRoleOptions(),
        roleService.getRoleOptions(),
        roleService.getRoleOptions(),
      ];
      
      const results = await Promise.all(promises);
      
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockRoleOptions);
      });
      
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
  });
});





