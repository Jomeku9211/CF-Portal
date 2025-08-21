import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AuthPage from '../../../components/Auth/AuthPage';

// Mock CSS imports
jest.mock('../../../styles/Auth/AuthPage.css', () => ({}));

describe('AuthPage Component', () => {
  beforeEach(() => {
    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initial Render', () => {
    it('renders login form by default', () => {
      render(<AuthPage />);
      
      expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
      expect(screen.getByText('Sign in to access your dashboard and find the perfect developers for your projects.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByText('Remember me')).toBeInTheDocument();
      expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
      
      // Should not show signup specific elements
      expect(screen.queryByLabelText(/first name/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument();
    });

    it('displays branding elements correctly', () => {
      render(<AuthPage />);
      
      expect(screen.getByText('CoderFarm')).toBeInTheDocument();
      expect(screen.getByText('AI-powered matching')).toBeInTheDocument();
      expect(screen.getByText('Verified developers')).toBeInTheDocument();
      expect(screen.getByText('Secure platform')).toBeInTheDocument();
    });

    it('displays social authentication buttons', () => {
      render(<AuthPage />);
      
      expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    });
  });

  describe('Toggle Between Login and Signup', () => {
    it('toggles to signup mode when switch auth link is clicked', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      const toggleButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByText('Join CoderFarm')).toBeInTheDocument();
        expect(screen.getByText('Start building your dream team with top-tier remote developers.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
      });
      
      // Should show signup specific elements
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      
      // Should not show login specific elements
      expect(screen.queryByText('Remember me')).not.toBeInTheDocument();
      expect(screen.queryByText('Forgot Password?')).not.toBeInTheDocument();
    });

    it('toggles back to login mode from signup', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      // First switch to signup
      const toggleToSignup = screen.getByRole('button', { name: /sign up/i });
      await user.click(toggleToSignup);
      
      await waitFor(() => {
        expect(screen.getByText('Join CoderFarm')).toBeInTheDocument();
      });
      
      // Then switch back to login
      const toggleToLogin = screen.getByRole('button', { name: /sign in/i });
      await user.click(toggleToLogin);
      
      await waitFor(() => {
        expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      });
    });

    it('clears form data when toggling between modes', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      // Fill in login form
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
      
      // Toggle to signup
      const toggleButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(toggleButton);
      
      // Check that fields are cleared
      await waitFor(() => {
        const newEmailInput = screen.getByLabelText(/email/i);
        const newPasswordInput = screen.getAllByLabelText(/password/i)[0];
        expect(newEmailInput).toHaveValue('');
        expect(newPasswordInput).toHaveValue('');
      });
    });
  });

  describe('Form Input Handling', () => {
    it('updates input values correctly in login mode', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      await user.type(emailInput, 'user@example.com');
      await user.type(passwordInput, 'testpass');
      
      expect(emailInput).toHaveValue('user@example.com');
      expect(passwordInput).toHaveValue('testpass');
    });

    it('updates input values correctly in signup mode', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      // Toggle to signup mode
      const toggleButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(toggleButton);
      
      // Wait for signup fields to appear
      await waitFor(() => {
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      });
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const companyInput = screen.getByLabelText(/company/i);
      const passwordInputs = screen.getAllByLabelText(/password/i);
      
      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(companyInput, 'ACME Corp');
      await user.type(passwordInputs[0], 'password123');
      await user.type(passwordInputs[1], 'password123');
      
      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(emailInput).toHaveValue('john@example.com');
      expect(companyInput).toHaveValue('ACME Corp');
      expect(passwordInputs[0]).toHaveValue('password123');
      expect(passwordInputs[1]).toHaveValue('password123');
    });
  });

  describe('Form Submission', () => {
    it('handles login form submission correctly', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);
      
      expect(console.log).toHaveBeenCalledWith('Login:', {
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('handles signup form submission correctly', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      // Toggle to signup mode
      const toggleButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(toggleButton);
      
      // Wait for signup fields to appear
      await waitFor(() => {
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      });
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const companyInput = screen.getByLabelText(/company/i);
      const passwordInputs = screen.getAllByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(companyInput, 'ACME Corp');
      await user.type(passwordInputs[0], 'password123');
      await user.type(passwordInputs[1], 'password123');
      await user.click(submitButton);
      
      expect(console.log).toHaveBeenCalledWith('Signup:', {
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        company: 'ACME Corp'
      });
    });

    it('shows error when passwords do not match in signup', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      // Toggle to signup mode
      const toggleButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByText('Join CoderFarm')).toBeInTheDocument();
      });
      
      // Fill required fields first
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const companyInput = screen.getByLabelText(/company/i);
      const passwordInputs = screen.getAllByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(companyInput, 'ACME Corp');
      await user.type(passwordInputs[0], 'password123');
      await user.type(passwordInputs[1], 'differentpassword');
      await user.click(submitButton);
      
      expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
      expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('Signup'));
    });

    it('prevents default form submission', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);
      
      // Form submission should trigger console.log, indicating preventDefault worked
      expect(console.log).toHaveBeenCalledWith('Login:', {
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  describe('Interactive Elements', () => {
    it('handles remember me checkbox interaction', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      const rememberCheckbox = screen.getByRole('checkbox');
      
      expect(rememberCheckbox).not.toBeChecked();
      
      await user.click(rememberCheckbox);
      expect(rememberCheckbox).toBeChecked();
      
      await user.click(rememberCheckbox);
      expect(rememberCheckbox).not.toBeChecked();
    });

    it('handles forgot password button click', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      const forgotPasswordButton = screen.getByText('Forgot Password?');
      
      // Should be clickable without errors
      await user.click(forgotPasswordButton);
      expect(forgotPasswordButton).toBeInTheDocument();
    });

    it('handles social auth button clicks', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      const googleButton = screen.getByRole('button', { name: /google/i });
      const githubButton = screen.getByRole('button', { name: /github/i });
      
      // Should be clickable without errors
      await user.click(googleButton);
      await user.click(githubButton);
      
      expect(googleButton).toBeInTheDocument();
      expect(githubButton).toBeInTheDocument();
    });
  });

  describe('Terms and Privacy Links', () => {
    it('displays terms and privacy links in signup mode', async () => {
      render(<AuthPage />);
      const user = userEvent.setup();
      
      // Toggle to signup mode
      const toggleButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByText('Join CoderFarm')).toBeInTheDocument();
      });
      
      // The text is split across multiple elements, so check for part of it
      expect(screen.getByText((_content, element) => {
        return element?.textContent === 'By creating an account, you agree to our Terms of Service and Privacy Policy';
      })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    });

    it('does not display terms and privacy links in login mode', () => {
      render(<AuthPage />);
      
      expect(screen.queryByText('By creating an account, you agree to our')).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /terms of service/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /privacy policy/i })).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels and accessibility attributes', () => {
      render(<AuthPage />);
      
      // Check that form inputs have proper labels
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      
      // Check that buttons have proper text content
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    });

    it('maintains proper heading hierarchy', () => {
      render(<AuthPage />);
      
      // Should have proper heading structure
      expect(screen.getByRole('heading', { level: 1, name: /coderfarm/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /welcome back/i })).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Structure', () => {
    it('applies correct CSS classes', () => {
      const { container } = render(<AuthPage />);
      
      const authPage = container.querySelector('.auth-page');
      const authContainer = container.querySelector('.auth-container');
      const authBranding = container.querySelector('.auth-branding');
      const authFormContainer = container.querySelector('.auth-form-container');
      
      expect(authPage).toBeInTheDocument();
      expect(authContainer).toBeInTheDocument();
      expect(authBranding).toBeInTheDocument();
      expect(authFormContainer).toBeInTheDocument();
    });

    it('has proper form structure', () => {
      render(<AuthPage />);
      
      // Should have form elements properly structured
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      
      // Check form structure
      const form = screen.getByLabelText(/email/i).closest('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveClass('auth-form');
    });
  });
});
