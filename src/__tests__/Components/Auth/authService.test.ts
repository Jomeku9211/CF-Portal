import { authService } from '../../../services/authService';

// Mock fetch globally
global.fetch = jest.fn();
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('Signup', () => {
    it('successfully signs up a new user', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        token: 'mock-token',
        user: mockUser,
      };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await authService.signup({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
          }),
        }
      );

      expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'mock-token');
      expect(result).toEqual({
        success: true,
        token: 'mock-token',
        user: mockUser,
      });
    });

    it('handles signup failure response', async () => {
      const mockResponse = {
        message: 'Email already exists',
      };

      mockedFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockResponse,
      } as Response);

      const result = await authService.signup({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        message: 'Email already exists',
      });
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('handles signup failure without message', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      const result = await authService.signup({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        message: 'Signup failed',
      });
    });

    it('handles signup response without token', async () => {
      const mockResponse = {
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
      };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await authService.signup({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        message: 'Signup failed',
      });
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('handles network errors during signup', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await authService.signup({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred',
      });
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('Login', () => {
    it('successfully logs in an existing user', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        token: 'mock-token',
        user: mockUser,
      };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await authService.login({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'john@example.com',
            password: 'password123',
          }),
        }
      );

      expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'mock-token');
      expect(result).toEqual({
        success: true,
        token: 'mock-token',
        user: mockUser,
      });
    });

    it('handles login failure response', async () => {
      const mockResponse = {
        message: 'Invalid credentials',
      };

      mockedFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockResponse,
      } as Response);

      const result = await authService.login({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        message: 'Invalid credentials',
      });
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('handles network errors during login', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await authService.login({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred',
      });
    });
  });

  describe('Get Current User', () => {
    it('successfully retrieves current user with valid token', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      localStorageMock.getItem.mockReturnValue('valid-token');

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      const result = await authService.getCurrentUser();

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer valid-token',
          },
        }
      );

      expect(result).toEqual(mockUser);
    });

    it('handles invalid token response', async () => {
      localStorageMock.getItem.mockReturnValue('invalid-token');

      mockedFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      const result = await authService.getCurrentUser();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
      expect(result).toBeNull();
    });

    it('handles network errors when getting current user', async () => {
      localStorageMock.getItem.mockReturnValue('valid-token');

      mockedFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await authService.getCurrentUser();

      expect(result).toBeNull();
    });

    it('returns null when no token exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = await authService.getCurrentUser();

      // The service should still call fetch but with no auth header
      expect(mockedFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toBeNull();
    });
  });

  describe('Authentication State', () => {
    it('correctly identifies authenticated user', () => {
      localStorageMock.getItem.mockReturnValue('valid-token');

      const result = authService.isAuthenticated();

      expect(result).toBe(true);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    it('correctly identifies unauthenticated user', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = authService.isAuthenticated();

      expect(result).toBe(false);
    });

    it('returns stored token', () => {
      localStorageMock.getItem.mockReturnValue('stored-token');

      const result = authService.getToken();

      expect(result).toBe('stored-token');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    it('returns null when no token stored', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = authService.getToken();

      expect(result).toBeNull();
    });
  });

  describe('Logout', () => {
    it('successfully logs out user', () => {
      authService.logout();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('Headers Management', () => {
    it('includes authorization header when token exists', () => {
      localStorageMock.getItem.mockReturnValue('valid-token');

      const headers = (authService as any).getAuthHeaders();

      expect(headers).toEqual({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer valid-token',
      });
    });

    it('excludes authorization header when no token exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const headers = (authService as any).getAuthHeaders();

      expect(headers).toEqual({
        'Content-Type': 'application/json',
      });
    });
  });
});

