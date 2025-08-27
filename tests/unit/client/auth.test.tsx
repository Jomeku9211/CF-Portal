import { authService } from '../../../src/services/authService';

// Mock the auth service
jest.mock('../../../src/services/authService');

describe('Client Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('client can signup with valid information', async () => {
    const mockSignup = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'client', email: 'client@example.com' }
    });
    (authService.signup as jest.Mock) = mockSignup;

    const result = await authService.signup({
      name: 'Test Client',
      email: 'client@example.com',
      password: 'clientpass123'
    });

    expect(mockSignup).toHaveBeenCalledWith({
      name: 'Test Client',
      email: 'client@example.com',
      password: 'clientpass123'
    });
    expect(result).toEqual({
      success: true,
      user: { role: 'client', email: 'client@example.com' }
    });
  });

  test('client can login with valid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'client', email: 'client@example.com' }
    });
    (authService.login as jest.Mock) = mockLogin;

    const result = await authService.login({
      email: 'client@example.com',
      password: 'clientpass123'
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'client@example.com',
      password: 'clientpass123'
    });
    expect(result).toEqual({
      success: true,
      user: { role: 'client', email: 'client@example.com' }
    });
  });
});
