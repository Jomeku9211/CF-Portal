import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Signup } from '../../../components/Auth/Signup';
import { AuthProvider } from '../../../contexts/AuthContext';
import { authService } from '../../../services/authService';
import { BrowserRouter } from 'react-router-dom';

// Mock the auth service
jest.mock('../../../services/authService');

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
  AuthInput: ({ label, error, icon, ...props }: any) => (
    <div>
      <label htmlFor={props.id || label.toLowerCase()}>
        {label}
      </label>
      <input
        data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}
        id={props.id || label.toLowerCase()}
        {...props}
      />
      {icon}
      {error && <p className="error">{error}</p>}
    </div>
  ),
}));

jest.mock('../../../components/common/AuthButton', () => ({
  AuthButton: ({ children, ...props }: any) => (
    <button data-testid="signup-button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('../../../components/common/AuthDivider', () => ({
  AuthDivider: ({ text }: any) => (
    <div data-testid="auth-divider">{text}</div>
  ),
}));

jest.mock('../../../components/common/GoogleAuthButton', () => ({
  GoogleAuthButton: () => (
    <button data-testid="google-auth-button">Sign in with Google</button>
  ),
}));

jest.mock('../../../components/common/Checkbox', () => ({
  Checkbox: ({ id, label, checked, onChange, required }: any) => (
    <div>
      <input
        data-testid={`checkbox-${id}`}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  ),
}));

const mockedAuthService = authService as jest.Mocked<typeof authService>;

const renderSignup = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders signup form with all required fields', () => {
      renderSignup();
      
      expect(screen.getByText('Create an account')).toBeInTheDocument();
      expect(screen.getByText('Sign up to get started')).toBeInTheDocument();
      expect(screen.getByTestId('input-full-name')).toBeInTheDocument();
      expect(screen.getByTestId('input-email')).toBeInTheDocument();
      expect(screen.getByTestId('input-password')).toBeInTheDocument();
      expect(screen.getByTestId('input-confirm-password')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-privacy-policy')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-marketing-emails')).toBeInTheDocument();
      expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    });

    it('renders privacy policy checkbox as required', () => {
      renderSignup();
      
      const privacyCheckbox = screen.getByTestId('checkbox-privacy-policy');
      expect(privacyCheckbox).toHaveAttribute('required');
    });

    it('renders marketing emails checkbox as optional', () => {
      renderSignup();
      
      const marketingCheckbox = screen.getByTestId('checkbox-marketing-emails');
      expect(marketingCheckbox).not.toHaveAttribute('required');
    });
  });

  describe('Form Validation', () => {
    it('shows error when trying to submit without accepting privacy policy', async () => {
      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'password123' } });
      
      // Ensure privacy policy is unchecked by clicking it if it's checked
      const privacyCheckbox = screen.getByTestId('checkbox-privacy-policy') as HTMLInputElement;
      if (privacyCheckbox.checked) {
        fireEvent.click(privacyCheckbox);
      }
      
      // Verify the checkbox is unchecked
      expect(privacyCheckbox.checked).toBe(false);
      
      // Submit form without accepting privacy policy
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(screen.getByText('You must accept the Privacy Policy and Terms & Conditions to continue')).toBeInTheDocument();
      });
    });

    it('shows error when passwords do not match', async () => {
      renderSignup();
      
      // Fill in form fields with mismatched passwords
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'differentpassword' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('updates form fields when user types', () => {
      renderSignup();
      
      const nameInput = screen.getByTestId('input-full-name');
      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');
      const confirmPasswordInput = screen.getByTestId('input-confirm-password');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      
      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
      expect(passwordInput).toHaveValue('password123');
      expect(confirmPasswordInput).toHaveValue('password123');
    });

    it('toggles privacy policy checkbox', () => {
      renderSignup();
      
      const privacyCheckbox = screen.getByTestId('checkbox-privacy-policy') as HTMLInputElement;
      expect(privacyCheckbox.checked).toBe(false);
      
      fireEvent.click(privacyCheckbox);
      expect(privacyCheckbox.checked).toBe(true);
      
      fireEvent.click(privacyCheckbox);
      expect(privacyCheckbox.checked).toBe(false);
    });

    it('toggles marketing emails checkbox', () => {
      renderSignup();
      
      const marketingCheckbox = screen.getByTestId('checkbox-marketing-emails') as HTMLInputElement;
      expect(marketingCheckbox.checked).toBe(false);
      
      fireEvent.click(marketingCheckbox);
      expect(marketingCheckbox.checked).toBe(true);
      
      fireEvent.click(marketingCheckbox);
      expect(marketingCheckbox.checked).toBe(false);
    });
  });

  describe('Form Submission', () => {
    it('submits form successfully with valid data', async () => {
      mockedAuthService.signup.mockResolvedValue({
        success: true,
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token'
      });

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(mockedAuthService.signup).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        });
      });
    });

    it('shows loading state during submission', async () => {
      mockedAuthService.signup.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ success: true, user: { id: '1', name: 'John Doe', email: 'john@example.com' }, token: 'mock-token' }), 100)))
      );

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      expect(screen.getByText('Creating account...')).toBeInTheDocument();
    });

    it('handles signup failure', async () => {
      mockedAuthService.signup.mockResolvedValue({
        success: false,
        message: 'Email already exists'
      });

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('shows generic error for unexpected errors', async () => {
      mockedAuthService.signup.mockRejectedValue(new Error('Network error'));

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
      });
    });
  });
});

