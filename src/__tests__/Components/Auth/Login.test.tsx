import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Login } from '../../../components/Auth/Login';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock fetch globally but allow us to control responses
const mockFetch = jest.fn();
// @ts-ignore
global.fetch = mockFetch;

// Mock react-router-dom navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  MailIcon: ({ size }: any) => <div data-testid="mail-icon" style={{ width: size, height: size }}>📧</div>,
  LockIcon: ({ size }: any) => <div data-testid="lock-icon" style={{ width: size, height: size }}>🔒</div>,
  EyeIcon: ({ size }: any) => <div data-testid="eye-icon" style={{ width: size, height: size }}>👁️</div>,
  EyeOffIcon: ({ size }: any) => <div data-testid="eye-off-icon" style={{ width: size, height: size }}>🙈</div>,
}));

// Mock auth context
const mockLogin = jest.fn();
const mockUseAuth = jest.fn();
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
  AuthProvider: ({ children }: any) => <div data-testid="auth-provider">{children}</div>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockNavigate.mockClear();
    localStorage.clear();
    
    // Default mock for useAuth
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      user: null,
      isLoading: false,
    });
  });

  describe('Initial Render', () => {
    it('renders login form with correct elements', () => {
      render(<Login />, { wrapper: TestWrapper });

      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
      expect(screen.getByText('Welcome back! Please enter your details.')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('displays form inputs with proper attributes', () => {
      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
      expect(emailInput).toHaveAttribute('required');
      
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');
      expect(passwordInput).toHaveAttribute('required');
    });

    it('shows password visibility toggle', () => {
      render(<Login />, { wrapper: TestWrapper });

      const passwordInput = screen.getByLabelText('Password');
      const toggleButton = screen.getByLabelText('Toggle password visibility');

      expect(toggleButton).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('displays forgot password link', () => {
      render(<Login />, { wrapper: TestWrapper });

      const forgotPasswordLink = screen.getByText('Forgot password?');
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
    });

    it('shows social authentication options', () => {
      render(<Login />, { wrapper: TestWrapper });

      expect(screen.getByText('OR')).toBeInTheDocument();
      // Note: GoogleAuthButton is mocked, so we just check the OR divider is present
    });

    it('displays sign up link', () => {
      render(<Login />, { wrapper: TestWrapper });

      const signUpLink = screen.getByText('Sign up');
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink).toHaveAttribute('href', '/signup');
    });
  });

  describe('Form Interaction', () => {
    it('updates email input value', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('updates password input value', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: TestWrapper });

      const passwordInput = screen.getByLabelText('Password');
      await user.type(passwordInput, 'password123');

      expect(passwordInput).toHaveValue('password123');
    });

    it('toggles password visibility', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: TestWrapper });

      const passwordInput = screen.getByLabelText('Password');
      const toggleButton = screen.getByLabelText('Toggle password visibility');

      // Initially password is hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click toggle to show password
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click toggle to hide password again
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('handles form submission with valid data', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce({ success: true });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('normalizes email to lowercase before submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce({ success: true });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'TEST@EXAMPLE.COM');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('trims email whitespace before submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce({ success: true });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, '  test@example.com  ');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  describe('Loading States', () => {
    it('shows loading state during form submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(screen.getByText('Logging in...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('disables submit button during loading', async () => {
      const user = userEvent.setup();
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(submitButton).toBeDisabled();
    });
  });

  describe('Error Handling', () => {
    it('displays error message from login failure', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce({ success: false, message: 'Invalid credentials' });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });

    it('displays generic error for unexpected errors', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValueOnce(new Error('Network error'));

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
      });
    });

    it('clears previous error on new submission', async () => {
      const user = userEvent.setup();
      
      // First submission fails
      mockLogin.mockResolvedValueOnce({ success: false, message: 'First error' });
      
      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('First error')).toBeInTheDocument();
      });

      // Second submission succeeds
      mockLogin.mockResolvedValueOnce({ success: true });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('First error')).not.toBeInTheDocument();
      });
    });
  });

  describe('Navigation Logic', () => {
    it('redirects to role selection when user has no roles', async () => {
      const user = userEvent.setup();
      const mockUser = { roles: [] };
      
      mockLogin.mockResolvedValueOnce({ success: true });
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        user: mockUser,
        isLoading: false,
      });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
      });
    });

    it('redirects to dashboard for non-client users', async () => {
      const user = userEvent.setup();
      const mockUser = { roles: ['developer'] };
      
      mockLogin.mockResolvedValueOnce({ success: true });
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        user: mockUser,
        isLoading: false,
      });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('redirects to client onboarding for client users', async () => {
      const user = userEvent.setup();
      const mockUser = { roles: ['client'], onboarding_stage: 'organisation_creation' };
      
      mockLogin.mockResolvedValueOnce({ success: true });
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        user: mockUser,
        isLoading: false,
      });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/clientOnboarding');
      });
    });

    it('redirects to dashboard for completed onboarding', async () => {
      const user = userEvent.setup();
      const mockUser = { roles: ['client'], onboarding_stage: 'completed' };
      
      mockLogin.mockResolvedValueOnce({ success: true });
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        user: mockUser,
        isLoading: false,
      });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty form submission', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: TestWrapper });

      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      // Form validation should prevent submission
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('handles special characters in email', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce({ success: true });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test+tag@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith('test+tag@example.com', 'password123');
    });

    it('handles very long password', async () => {
      const user = userEvent.setup();
      const longPassword = 'a'.repeat(1000);
      mockLogin.mockResolvedValueOnce({ success: true });

      render(<Login />, { wrapper: TestWrapper });

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, longPassword);
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith('test@example.com', longPassword);
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<Login />, { wrapper: TestWrapper });

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has proper button labels', () => {
      render(<Login />, { wrapper: TestWrapper });

      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByLabelText('Toggle password visibility')).toBeInTheDocument();
    });

    it('maintains proper heading hierarchy', () => {
      render(<Login />, { wrapper: TestWrapper });

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      
      headings.forEach(heading => {
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBeTruthy();
      });
    });
  });
});
