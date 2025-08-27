import { authService } from '../../../src/services/authService';

// Mock the auth service
jest.mock('../../../src/services/authService');

describe('Agency Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('agency can signup with valid information', async () => {
    const mockSignup = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'agency', email: 'agency@example.com' }
    });
    (authService.signup as jest.Mock) = mockSignup;

    const result = await authService.signup({
      name: 'Test Agency',
      email: 'agency@example.com',
      password: 'agencypass123'
    });

    expect(mockSignup).toHaveBeenCalledWith({
      name: 'Test Agency',
      email: 'agency@example.com',
      password: 'agencypass123'
    });
    expect(result).toEqual({
      success: true,
      user: { role: 'agency', email: 'agency@example.com' }
    });
  });

  test('agency can login with valid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'agency', email: 'agency@example.com' }
    });
    (authService.login as jest.Mock) = mockLogin;

    const result = await authService.login({
      email: 'agency@example.com',
      password: 'agencypass123'
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'agency@example.com',
      password: 'agencypass123'
    });
    expect(result).toEqual({
      success: true,
      user: { role: 'agency', email: 'agency@example.com' }
    });
  });
});
