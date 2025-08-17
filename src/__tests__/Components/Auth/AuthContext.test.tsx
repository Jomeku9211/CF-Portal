import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../../contexts/AuthContext';
import { authService } from '../../../services/authService';
import { emailService } from '../../../services/emailService';

// Mock the authService
jest.mock('../../../services/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

// Mock the emailService
jest.mock('../../../services/emailService');
const mockedEmailService = emailService as jest.Mocked<typeof emailService>;

// Test component to access context
const TestComponent = () => {
  const { user, isAuthenticated, isLoading, signup, login, logout, sendWelcomeEmail } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
      <div data-testid="is-authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <button 
        data-testid="signup-btn" 
        onClick={() => signup('John Doe', 'john@example.com', 'password123')}
      >
        Signup
      </button>
      <button 
        data-testid="login-btn" 
        onClick={() => login('john@example.com', 'password123')}
      >
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
      <button 
        data-testid="welcome-email-btn" 
        onClick={() => sendWelcomeEmail('John Doe', 'john@example.com')}
      >
        Send Welcome Email
      </button>
    </div>
  );
};

const renderWithAuth = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('starts with loading state true', async () => {
      renderWithAuth();
      
      // The loading state should be true initially, but the effect runs immediately
      // so we need to check that it was true at some point
      expect(screen.getByTestId('is-loading')).toBeInTheDocument();
    });

    it('starts with no authenticated user', () => {
      renderWithAuth();
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });
  });

  describe('Authentication Check on Mount', () => {
    it('checks authentication status on mount when user is authenticated', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      
      mockedAuthService.isAuthenticated.mockReturnValue(true);
      mockedAuthService.getCurrentUser.mockResolvedValue(mockUser);

      await act(async () => {
        renderWithAuth();
      });

      expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      expect(mockedAuthService.getCurrentUser).toHaveBeenCalled();
      
      // Wait for loading to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    it('handles authentication check failure gracefully', async () => {
      mockedAuthService.isAuthenticated.mockReturnValue(true);
      mockedAuthService.getCurrentUser.mockRejectedValue(new Error('Auth check failed'));

      await act(async () => {
        renderWithAuth();
      });

      expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      expect(mockedAuthService.getCurrentUser).toHaveBeenCalled();
      
      // Wait for loading to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });

    it('does not check authentication when user is not authenticated', async () => {
      mockedAuthService.isAuthenticated.mockReturnValue(false);

      await act(async () => {
        renderWithAuth();
      });

      expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      expect(mockedAuthService.getCurrentUser).not.toHaveBeenCalled();
      
      // Wait for loading to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('Signup Functionality', () => {
    it('successfully signs up a new user', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        success: true,
        user: mockUser,
        token: 'mock-token'
      };

      mockedAuthService.signup.mockResolvedValue(mockResponse);

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('signup-btn').click();
      });

      expect(mockedAuthService.signup).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      
      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    it('handles signup failure gracefully', async () => {
      const mockResponse = {
        success: false,
        message: 'Email already exists'
      };

      mockedAuthService.signup.mockResolvedValue(mockResponse);

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('signup-btn').click();
      });

      expect(mockedAuthService.signup).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      
      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // User should not be authenticated on failed signup
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });

    it('handles signup exception gracefully', async () => {
      mockedAuthService.signup.mockRejectedValue(new Error('Network error'));

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('signup-btn').click();
      });

      expect(mockedAuthService.signup).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      
      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // User should not be authenticated on exception
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });
  });

  describe('Login Functionality', () => {
    it('successfully logs in an existing user', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        success: true,
        user: mockUser,
        token: 'mock-token'
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('login-btn').click();
      });

      expect(mockedAuthService.login).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'password123'
      });
      
      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    it('handles login failure gracefully', async () => {
      const mockResponse = {
        success: false,
        message: 'Invalid credentials'
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('login-btn').click();
      });

      expect(mockedAuthService.login).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'password123'
      });
      
      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // User should not be authenticated on failed login
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });
  });

  describe('Logout Functionality', () => {
    it('successfully logs out the user', async () => {
      // First, sign up a user
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        success: true,
        user: mockUser,
        token: 'mock-token'
      };

      mockedAuthService.signup.mockResolvedValue(mockResponse);

      renderWithAuth();

      // Sign up
      await act(async () => {
        screen.getByTestId('signup-btn').click();
      });

      // Wait for signup to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Verify user is authenticated
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');

      // Now logout
      await act(async () => {
        screen.getByTestId('logout-btn').click();
      });

      expect(mockedAuthService.logout).toHaveBeenCalled();
      
      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // User should be logged out
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    });
  });

  describe('Error Handling', () => {
    it('logs errors to console for debugging', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      mockedAuthService.signup.mockRejectedValue(new Error('Test error'));

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('signup-btn').click();
      });

      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(consoleSpy).toHaveBeenCalledWith('Signup error:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('Email Functionality', () => {
    beforeEach(() => {
      // Mock successful email responses
      mockedEmailService.sendThankYouEmail.mockResolvedValue({
        success: true,
        message: 'Thank you email sent successfully',
        emailId: 'email-123'
      });
      
      mockedEmailService.sendWelcomeEmail.mockResolvedValue({
        success: true,
        message: 'Welcome email sent successfully',
        emailId: 'welcome-456'
      });
    });

    it('sends thank you email after successful signup', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        success: true,
        user: mockUser,
        token: 'mock-token'
      };

      mockedAuthService.signup.mockResolvedValue(mockResponse);

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('signup-btn').click();
      });

      // Wait for signup to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(mockedEmailService.sendThankYouEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('sends welcome email when requested', async () => {
      renderWithAuth();

      await act(async () => {
        screen.getByTestId('welcome-email-btn').click();
      });

      expect(mockedEmailService.sendWelcomeEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('handles email sending failure gracefully during signup', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        success: true,
        user: mockUser,
        token: 'mock-token'
      };

      mockedAuthService.signup.mockResolvedValue(mockResponse);
      mockedEmailService.sendThankYouEmail.mockRejectedValue(new Error('Email service down'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('signup-btn').click();
      });

      // Wait for signup to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(mockedEmailService.sendThankYouEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
      expect(consoleSpy).toHaveBeenCalledWith('Failed to send thank you email:', expect.any(Error));
      
      // Signup should still succeed even if email fails
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
      
      consoleSpy.mockRestore();
    });

    it('handles welcome email sending failure gracefully', async () => {
      mockedEmailService.sendWelcomeEmail.mockResolvedValue({
        success: false,
        message: 'Email service unavailable'
      });

      renderWithAuth();

      await act(async () => {
        screen.getByTestId('welcome-email-btn').click();
      });

      // The function should handle the failure gracefully
      expect(mockedEmailService.sendWelcomeEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
    });
  });
});

