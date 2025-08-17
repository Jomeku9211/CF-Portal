/*
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
      expect(screen.getByTestId('signup-button')).toBeInTheDocument();
      expect(screen.getByTestId('google-auth-button')).toBeInTheDocument();
    });

    it('renders privacy policy checkbox as required', () => {
      renderSignup();
      
      const privacyCheckbox = screen.getByTestId('checkbox-privacy-policy');
      expect(privacyCheckbox).toBeRequired();
    });

    it('renders Google auth button', () => {
      renderSignup();
      
      expect(screen.getByTestId('google-auth-button')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    });

    it('renders auth divider with correct text', () => {
      renderSignup();
      
      expect(screen.getByTestId('auth-divider')).toBeInTheDocument();
      expect(screen.getByText('or')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('shows error for empty required fields on submit', async () => {
      renderSignup();
      
      // Submit form without filling fields
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(screen.getByText('Full name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
        expect(screen.getByText('Please accept the privacy policy')).toBeInTheDocument();
      });
    });

    it('shows error for invalid email format', async () => {
      renderSignup();
      
      // Fill in form fields with invalid email
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'invalid-email' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'password123' } });
      
      // Submit form
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('shows error for password mismatch', async () => {
      renderSignup();
      
      // Fill in form fields with mismatched passwords
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'password456' } });
      
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

    it('shows error for short password', async () => {
      renderSignup();
      
      // Fill in form fields with short password
      fireEvent.change(screen.getByTestId('input-full-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: '123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: '123' } });
      
      // Submit form
      const form = screen.getByTestId('auth-card').querySelector('form');
      if (form) {
        fireEvent.submit(form);
      } else {
        fireEvent.click(screen.getByTestId('signup-button'));
      }
      
      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
      });
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
*/

