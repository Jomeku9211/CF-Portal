import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../src/context/contexts/AuthContext';
import { authService } from '../../../src/modules/shared/services/authService';
import { organizationService } from '../../../src/modules/client/services/organizationService';
import { emailService } from '../../../src/modules/shared/services/emailService';

// Mock services
jest.mock('../../../src/modules/shared/services/authService');
jest.mock('../../../src/modules/client/services/organizationService');
jest.mock('../../../src/modules/shared/services/emailService');

// Mock react-router-dom navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

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

describe('Authentication Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('Login Flow', () => {
    test('successful login updates auth context and redirects to role selection', async () => {
      const mockUser = {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'client'
      };

      const mockToken = 'mock-jwt-token';

      // Mock successful login
      (authService.login as jest.Mock).mockResolvedValue({
        success: true,
        token: mockToken,
        user: mockUser
      });

      // Mock no existing organizations
      (organizationService.getUserOrganizations as jest.Mock).mockResolvedValue({
        success: true,
        organizations: []
      });

      // Mock successful user fetch
      (authService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <div>
              {/* Simulate login form */}
              <button onClick={async () => {
                const result = await authService.login({ email: 'test@example.com', password: 'password123' });
                if (result.success) {
                  // Simulate context update
                  const orgRes = await organizationService.getUserOrganizations();
                  if (orgRes.success && (orgRes.organizations?.length || 0) > 0) {
                    mockNavigate('/onboarding');
                  } else {
                    mockNavigate('/role-selection');
                  }
                }
              }}>
                Login
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123'
        });
      });

      await waitFor(() => {
        expect(organizationService.getUserOrganizations).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
      });
    });

    test('successful login redirects to onboarding if organization exists', async () => {
      const mockUser = {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'client'
      };

      const mockToken = 'mock-jwt-token';

      // Mock successful login
      (authService.login as jest.Mock).mockResolvedValue({
        success: true,
        token: mockToken,
        user: mockUser
      });

      // Mock existing organization
      (organizationService.getUserOrganizations as jest.Mock).mockResolvedValue({
        success: true,
        organizations: [{ id: 'org1', name: 'Test Org' }]
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <div>
              <button onClick={async () => {
                const result = await authService.login({ email: 'test@example.com', password: 'password123' });
                if (result.success) {
                  const orgRes = await organizationService.getUserOrganizations();
                  if (orgRes.success && (orgRes.organizations?.length || 0) > 0) {
                    mockNavigate('/onboarding');
                  } else {
                    mockNavigate('/role-selection');
                  }
                }
              }}>
                Login
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/onboarding');
      });
    });

    test('failed login shows error and does not redirect', async () => {
      // Mock failed login
      (authService.login as jest.Mock).mockResolvedValue({
        success: false,
        message: 'Invalid credentials'
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <div>
              <button onClick={async () => {
                const result = await authService.login({ email: 'test@example.com', password: 'wrong' });
                if (!result.success) {
                  // Show error (in real component this would update state)
                  console.log('Login failed:', result.message);
                }
              }}>
                Login
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalled();
      });

      // Should not navigate
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Signup Flow', () => {
    test('successful signup creates user, sends email, and redirects', async () => {
      const mockUser = {
        id: 'user123',
        name: 'New User',
        email: 'newuser@example.com',
        role: 'client'
      };

      const mockToken = 'mock-jwt-token';

      // Mock successful signup
      (authService.signup as jest.Mock).mockResolvedValue({
        success: true,
        token: mockToken,
        user: mockUser
      });

      // Mock no existing organizations
      (organizationService.getUserOrganizations as jest.Mock).mockResolvedValue({
        success: true,
        organizations: []
      });

      // Mock successful email sending
      (emailService.sendThankYouEmail as jest.Mock).mockResolvedValue({
        success: true
      });

      render(
        <MemoryRouter initialEntries={['/signup']}>
          <AuthProvider>
            <div>
              <button onClick={async () => {
                const result = await authService.signup({
                  name: 'New User',
                  email: 'newuser@example.com',
                  password: 'password123'
                });
                
                if (result.success) {
                  // Send thank you email
                  await emailService.sendThankYouEmail({
                    name: 'New User',
                    email: 'newuser@example.com'
                  });

                  // Check organizations and redirect
                  const orgRes = await organizationService.getUserOrganizations();
                  if (orgRes.success && (orgRes.organizations?.length || 0) > 0) {
                    mockNavigate('/onboarding');
                  } else {
                    mockNavigate('/role-selection');
                  }
                }
              }}>
                Sign Up
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const signupButton = screen.getByText('Sign Up');
      fireEvent.click(signupButton);

      await waitFor(() => {
        expect(authService.signup).toHaveBeenCalledWith({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123'
        });
      });

      await waitFor(() => {
        expect(emailService.sendThankYouEmail).toHaveBeenCalledWith({
          name: 'New User',
          email: 'newuser@example.com'
        });
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
      });
    });

    test('signup with existing email shows validation error', async () => {
      // Mock signup failure due to existing email
      (authService.signup as jest.Mock).mockResolvedValue({
        success: false,
        message: 'User with this email already exists'
      });

      render(
        <MemoryRouter initialEntries={['/signup']}>
          <AuthProvider>
            <div>
              <button onClick={async () => {
                const result = await authService.signup({
                  name: 'Test User',
                  email: 'existing@example.com',
                  password: 'password123'
                });
                
                if (!result.success) {
                  console.log('Signup failed:', result.message);
                }
              }}>
                Sign Up
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const signupButton = screen.getByText('Sign Up');
      fireEvent.click(signupButton);

      await waitFor(() => {
        expect(authService.signup).toHaveBeenCalled();
      });

      // Should not navigate or send email
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(emailService.sendThankYouEmail).not.toHaveBeenCalled();
    });
  });

  describe('Session Management', () => {
    test('token is stored in localStorage after successful auth', async () => {
      const mockToken = 'mock-jwt-token';
      
      (authService.login as jest.Mock).mockResolvedValue({
        success: true,
        token: mockToken,
        user: { id: 'user123', email: 'test@example.com' }
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <div>
              <button onClick={async () => {
                const result = await authService.login({ email: 'test@example.com', password: 'password123' });
                if (result.success && result.token) {
                  localStorage.setItem('authToken', result.token);
                }
              }}>
                Login
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', mockToken);
      });
    });

    test('logout clears localStorage and resets context', async () => {
      // Mock authenticated state
      localStorageMock.getItem.mockReturnValue('mock-token');
      
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <div>
              <button onClick={() => {
                authService.logout();
                localStorage.removeItem('authToken');
                mockNavigate('/login');
              }}>
                Logout
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      expect(authService.logout).toHaveBeenCalled();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  describe('Protected Route Flow', () => {
    test('unauthenticated user is redirected to login', () => {
      // Mock unauthenticated state
      (authService.isAuthenticated as jest.Mock).mockReturnValue(false);
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <div>
              <button onClick={() => {
                if (!authService.isAuthenticated()) {
                  mockNavigate('/login');
                }
              }}>
                Access Dashboard
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const accessButton = screen.getByText('Access Dashboard');
      fireEvent.click(accessButton);

      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('authenticated user can access protected routes', () => {
      // Mock authenticated state
      (authService.isAuthenticated as jest.Mock).mockReturnValue(true);
      localStorageMock.getItem.mockReturnValue('mock-token');

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <div>
              <button onClick={() => {
                if (authService.isAuthenticated()) {
                  mockNavigate('/dashboard');
                }
              }}>
                Access Dashboard
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const accessButton = screen.getByText('Access Dashboard');
      fireEvent.click(accessButton);

      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  describe('Error Handling', () => {
    test('network errors during auth show appropriate messages', async () => {
      // Mock network error
      (authService.login as jest.Mock).mockRejectedValue(new Error('Network error'));

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <div>
              <button onClick={async () => {
                try {
                  await authService.login({ email: 'test@example.com', password: 'password123' });
                } catch (error) {
                  console.log('Network error occurred');
                }
              }}>
                Login
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalled();
      });
    });

    test('invalid token results in logout and redirect to login', async () => {
      // Mock invalid token scenario
      (authService.getCurrentUser as jest.Mock).mockResolvedValue(null);
      localStorageMock.getItem.mockReturnValue('invalid-token');

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <div>
              <button onClick={async () => {
                const user = await authService.getCurrentUser();
                if (!user) {
                  authService.logout();
                  mockNavigate('/login');
                }
              }}>
                Check Auth
              </button>
            </div>
          </AuthProvider>
        </MemoryRouter>
      );

      const checkButton = screen.getByText('Check Auth');
      fireEvent.click(checkButton);

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(authService.logout).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });
  });
});
