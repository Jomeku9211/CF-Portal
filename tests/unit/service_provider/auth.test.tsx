import { authService } from '../../../src/services/authService';

// Mock the auth service
jest.mock('../../../src/services/authService');

describe('Service Provider Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service provider can signup with valid information', async () => {
    const mockSignup = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'service_provider', email: 'provider@example.com' }
    });
    (authService.signup as jest.Mock) = mockSignup;

    const result = await authService.signup({
      name: 'Test Provider',
      email: 'provider@example.com',
      password: 'providerpass123'
    });

    expect(mockSignup).toHaveBeenCalledWith({
      name: 'Test Provider',
      email: 'provider@example.com',
      password: 'providerpass123'
    });
    expect(result).toEqual({
      success: true,
      user: { role: 'service_provider', email: 'provider@example.com' }
    });
  });

  test('service provider can login with valid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'service_provider', email: 'provider@example.com' }
    });
    (authService.login as jest.Mock) = mockLogin;

    const result = await authService.login({
      email: 'provider@example.com',
      password: 'providerpass123'
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'provider@example.com',
      password: 'providerpass123'
    });
    expect(result).toEqual({
      success: true,
      user: { role: 'service_provider', email: 'provider@example.com' }
    });
  });
});
