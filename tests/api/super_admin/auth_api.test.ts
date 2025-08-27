import { authService } from '../../src/services/authService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Authentication API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login API call succeeds with valid credentials', async () => {
    const mockResponse = {
      success: true,
      user: { id: '1', email: 'test@example.com', role: 'client' },
      token: 'mock-jwt-token'
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await authService.login({ email: 'test@example.com', password: 'password' });
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ email: 'test@example.com', password: 'password' })
      })
    );
    
    expect(result).toEqual(mockResponse);
  });

  test('login API call fails with invalid credentials', async () => {
    const mockResponse = {
      success: false,
      error: 'Invalid credentials'
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => mockResponse
    });

    await expect(
      authService.login({ email: 'test@example.com', password: 'wrong' })
    ).rejects.toThrow();
  });

  test('signup API call succeeds with valid data', async () => {
    const mockResponse = {
      success: true,
      user: { id: '1', email: 'new@example.com', role: 'client' }
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await authService.signup({
      email: 'new@example.com',
      password: 'password123',
      role: 'client'
    });
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/signup'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: 'new@example.com',
          password: 'password123',
          role: 'client'
        })
      })
    );
    
    expect(result).toEqual(mockResponse);
  });
});
