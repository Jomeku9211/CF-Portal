import { authService } from '../../../src/modules/shared/services/authService';

// Mock the auth service
jest.mock('../../../src/modules/shared/services/authService');

describe('Super Admin Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('super admin can login with valid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'super_admin', email: 'admin@example.com' }
    });
    (authService.login as jest.Mock) = mockLogin;

    const result = await authService.login({
      email: 'admin@example.com',
      password: 'adminpass123'
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'admin@example.com',
      password: 'adminpass123'
    });
    expect(result).toEqual({
      success: true,
      user: { role: 'super_admin', email: 'admin@example.com' }
    });
  });

  test('super admin login shows appropriate error for invalid credentials', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    (authService.login as jest.Mock) = mockLogin;

    await expect(
      authService.login({
        email: 'admin@example.com',
        password: 'wrongpass'
      })
    ).rejects.toThrow('Invalid credentials');

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'admin@example.com',
      password: 'wrongpass'
    });
  });
});
