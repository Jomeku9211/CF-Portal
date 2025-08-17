import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../../../components/Auth/Login';
import { AuthProvider } from '../../../contexts/AuthContext';
import { authService } from '../../../services/authService';

// Mock the authService
jest.mock('../../../services/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the common components
jest.mock('../../../components/common/AuthCard', () => ({
  AuthCard: ({ children, title, subtitle }: any) => (
    <div data-testid="auth-card">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/common/AuthInput', () => ({
  AuthInput: ({ label, type, placeholder, value, onChange, icon, required }: any) => (
    <div>
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        id={label.toLowerCase()}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={`input-${label.toLowerCase()}`}
      />
      {icon}
    </div>
  ),
}));

jest.mock('../../../components/common/AuthButton', () => ({
  AuthButton: ({ children, type, disabled }: any) => (
    <button
      type={type}
      disabled={disabled}
      data-testid="login-button"
    >
      {children}
    </button>
  ),
}));

jest.mock('../../../components/common/GoogleAuthButton', () => ({
  GoogleAuthButton: () => <button data-testid="google-auth-button">Sign in with Google</button>,
}));

jest.mock('../../../components/common/AuthDivider', () => ({
  AuthDivider: ({ text }: any) => <div data-testid="auth-divider">{text}</div>,
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  describe('Rendering', () => {
    it('renders login form with all required fields', () => {
      renderLogin();
      
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Welcome back! Please enter your details.')).toBeInTheDocument();
      expect(screen.getByTestId('input-email')).toBeInTheDocument();
      expect(screen.getByTestId('input-password')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });

    it('renders email field as required', () => {
      renderLogin();
      
      const emailInput = screen.getByTestId('input-email');
      expect(emailInput).toBeRequired();
    });

    it('renders password field as required', () => {
      renderLogin();
      
      const passwordInput = screen.getByTestId('input-password');
      expect(passwordInput).toBeRequired();
    });

    it('renders forgot password link', () => {
      renderLogin();
      
      const forgotPasswordLink = screen.getByText('Forgot password?');
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '/forgot-password');
    });

    it('renders sign up link', () => {
      renderLogin();
      
      const signUpLink = screen.getByText('Sign up');
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink.closest('a')).toHaveAttribute('href', '/signup');
    });
  });

  describe('Form Validation', () => {
    it('requires email and password fields', () => {
      renderLogin();
      
      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');
      
      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });
  });

  describe('Form Submission', () => {
    it('successfully logs in with valid credentials', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const mockResponse = {
        success: true,
        user: mockUser,
        token: 'mock-token'
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderLogin();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(mockedAuthService.login).toHaveBeenCalledWith('john@example.com', 'password123');
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
      });
    });

    it('handles login failure gracefully', async () => {
      const mockResponse = {
        success: false,
        message: 'Invalid credentials'
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderLogin();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'wrongpassword' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(mockedAuthService.login).toHaveBeenCalledWith('john@example.com', 'wrongpassword');
      });

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Should not navigate on failure
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('handles login failure without message', async () => {
      const mockResponse = {
        success: false
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderLogin();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Login failed')).toBeInTheDocument();
      });
    });

    it('handles login exception gracefully', async () => {
      mockedAuthService.login.mockRejectedValue(new Error('Network error'));

      renderLogin();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
      });

      // Should not navigate on exception
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('shows loading state during form submission', async () => {
      mockedAuthService.login.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          success: true,
          user: { id: '1', name: 'John Doe', email: 'john@example.com' },
          token: 'mock-token'
        }), 100))
      );

      renderLogin();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('login-button'));
      
      // Check loading state
      expect(screen.getByText('Logging in...')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeDisabled();
    });
  });

  describe('User Interactions', () => {
    it('updates form fields when user types', () => {
      renderLogin();
      
      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');
      
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      expect(emailInput).toHaveValue('john@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    it('clears error message when form is resubmitted', async () => {
      // First, trigger an error
      mockedAuthService.login.mockResolvedValueOnce({
        success: false,
        message: 'Invalid credentials'
      });

      renderLogin();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Now try with correct credentials
      mockedAuthService.login.mockResolvedValueOnce({
        success: true,
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token'
      });

      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    it('navigates to role-selection on successful login', async () => {
      const mockResponse = {
        success: true,
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token'
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderLogin();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
      });
    });

    it('does not navigate on failed login', async () => {
      const mockResponse = {
        success: false,
        message: 'Invalid credentials'
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderLogin();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('displays error message when login fails', async () => {
      const mockResponse = {
        success: false,
        message: 'Account not found'
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      renderLogin();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'nonexistent@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Account not found')).toBeInTheDocument();
      });
    });

    it('displays generic error message when login throws exception', async () => {
      mockedAuthService.login.mockRejectedValue(new Error('Database connection failed'));

      renderLogin();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
      });
    });
  });

  describe('Form State Management', () => {
    it('clears error message on new form submission', async () => {
      // First submission fails
      mockedAuthService.login.mockResolvedValueOnce({
        success: false,
        message: 'Invalid credentials'
      });

      renderLogin();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Second submission succeeds
      mockedAuthService.login.mockResolvedValueOnce({
        success: true,
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token'
      });

      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
      });
    });

    it('maintains form values during submission attempts', async () => {
      // First submission fails
      mockedAuthService.login.mockResolvedValueOnce({
        success: false,
        message: 'Invalid credentials'
      });

      renderLogin();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByTestId('login-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Form values should still be there
      expect(screen.getByTestId('input-email')).toHaveValue('john@example.com');
      expect(screen.getByTestId('input-password')).toHaveValue('wrongpassword');
    });
  });
});
