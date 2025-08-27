import { authService } from '../../../src/modules/shared/services/authService';
import { emailService } from '../../../src/modules/shared/services/emailService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Authentication API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Login API', () => {
    test('successful login returns user data and token', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          success: true,
          token: 'mock-jwt-token',
          user: {
            id: 'user123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'client'
          }
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123'
          })
        })
      );

      expect(result).toEqual({
        success: true,
        token: 'mock-jwt-token',
        user: {
          id: 'user123',
          name: 'Test User',
          email: 'test@example.com',
          role: 'client'
        }
      });
    });

    test('failed login returns error message', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: jest.fn().mockResolvedValue({
          success: false,
          message: 'Invalid credentials'
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

      expect(result).toEqual({
        success: false,
        message: 'Invalid credentials'
      });
    });

    test('network error returns appropriate error message', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });
    });

    test('handles malformed JSON response gracefully', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue('invalid json'),
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toEqual({
        success: false,
        message: 'invalid json'
      });
    });
  });

  describe('Signup API', () => {
    test('successful signup creates user and returns token', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          success: true,
          token: 'mock-jwt-token',
          user: {
            id: 'user123',
            name: 'New User',
            email: 'newuser@example.com',
            role: 'client'
          }
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.signup({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/signup'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password123'
          })
        })
      );

      expect(result).toEqual({
        success: true,
        token: 'mock-jwt-token',
        user: {
          id: 'user123',
          name: 'New User',
          email: 'newuser@example.com',
          role: 'client'
        }
      });
    });

    test('signup with existing email returns error', async () => {
      const mockResponse = {
        ok: false,
        status: 409,
        json: jest.fn().mockResolvedValue({
          success: false,
          message: 'User with this email already exists'
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.signup({
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123'
      });

      expect(result).toEqual({
        success: false,
        message: 'User with this email already exists'
      });
    });

    test('signup with invalid data returns validation errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValue({
          success: false,
          message: 'Validation failed',
          errors: {
            email: 'Invalid email format',
            password: 'Password too short'
          }
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.signup({
        name: '',
        email: 'invalid-email',
        password: '123'
      });

      expect(result).toEqual({
        success: false,
        message: 'Validation failed'
      });
    });
  });

  describe('Get Current User API', () => {
    test('returns user data for valid token', async () => {
      const mockUser = {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'client'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser)
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Mock localStorage to return a token
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue('mock-token'),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true
      });

      const result = await authService.getCurrentUser();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/me'),
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-token'
          }
        })
      );

      expect(result).toEqual(mockUser);
    });

    test('returns null for invalid token', async () => {
      const mockResponse = {
        ok: false,
        status: 401
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Mock localStorage to return a token
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue('invalid-token'),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true
      });

      const result = await authService.getCurrentUser();

      expect(result).toBeNull();
    });

    test('returns null when no token exists', async () => {
      // Mock localStorage to return no token
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(null),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true
      });

      const result = await authService.getCurrentUser();

      expect(result).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('Session Management', () => {
    test('stores token in localStorage after successful auth', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          success: true,
          token: 'mock-jwt-token',
          user: { id: 'user123', email: 'test@example.com' }
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });

      await authService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'mock-jwt-token');
    });

    test('clears session on logout', () => {
      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });

      authService.logout();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authSessionExpiry');
    });

    test('checks session expiry correctly', () => {
      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });

      // Test expired session
      localStorageMock.getItem.mockReturnValue(String(Date.now() - 1000)); // Expired
      expect(authService.isAuthenticated()).toBe(false);

      // Test valid session
      localStorageMock.getItem.mockReturnValue(String(Date.now() + 24 * 60 * 60 * 1000)); // Valid
      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('Email Service API', () => {
    test('sends thank you email after successful signup', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          success: true,
          message: 'Thank you email sent successfully'
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await emailService.sendThankYouEmail({
        name: 'New User',
        email: 'newuser@example.com'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/email/thank-you'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'New User',
            email: 'newuser@example.com'
          })
        })
      );

      expect(result).toEqual({
        success: true,
        message: 'Thank you email sent successfully'
      });
    });

    test('sends welcome email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          success: true,
          message: 'Welcome email sent successfully'
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await emailService.sendWelcomeEmail({
        name: 'Test User',
        email: 'test@example.com'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/email/welcome'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com'
          })
        })
      );

      expect(result).toEqual({
        success: true,
        message: 'Welcome email sent successfully'
      });
    });

    test('handles email service failures gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({
          success: false,
          message: 'Email service temporarily unavailable'
        })
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await emailService.sendThankYouEmail({
        name: 'Test User',
        email: 'test@example.com'
      });

      expect(result).toEqual({
        success: false,
        message: 'Email service temporarily unavailable'
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('handles empty response body gracefully', async () => {
      const mockResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue(''),
        json: jest.fn().mockRejectedValue(new Error('Empty response'))
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toEqual({
        success: false,
        message: ''
      });
    });

    test('handles various token response formats', async () => {
      const testCases = [
        { response: { token: 'token1' }, expected: 'token1' },
        { response: { authToken: 'token2' }, expected: 'token2' },
        { response: { jwt: 'token3' }, expected: 'token3' },
        { response: { access_token: 'token4' }, expected: 'token4' },
        { response: { id: 'user123', email: 'test@example.com' }, expected: null }
      ];

      for (const testCase of testCases) {
        const mockResponse = {
          ok: true,
          json: jest.fn().mockResolvedValue(testCase.response)
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await authService.login({
          email: 'test@example.com',
          password: 'password123'
        });

        if (testCase.expected) {
          expect(result.token).toBe(testCase.expected);
        } else {
          expect(result.token).toBeUndefined();
        }
      }
    });

    test('handles various user response formats', async () => {
      const testCases = [
        { response: { user: { id: 'user1', name: 'User 1' } }, expected: { id: 'user1', name: 'User 1' } },
        { response: { data: { user: { id: 'user2', name: 'User 2' } } }, expected: { id: 'user2', name: 'User 2' } },
        { response: { id: 'user3', name: 'User 3', email: 'user3@example.com' }, expected: { id: 'user3', name: 'User 3', email: 'user3@example.com' } }
      ];

      for (const testCase of testCases) {
        const mockResponse = {
          ok: true,
          json: jest.fn().mockResolvedValue(testCase.response)
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await authService.login({
          email: 'test@example.com',
          password: 'password123'
        });

        expect(result.user).toEqual(testCase.expected);
      }
    });
  });
});
