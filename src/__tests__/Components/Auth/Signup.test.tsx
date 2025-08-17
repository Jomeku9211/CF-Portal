import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Signup } from '../../../components/Auth/Signup';
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
  AuthButton: ({ children, type, fullWidth, disabled }: any) => (
    <button
      type={type}
      disabled={disabled}
      data-testid="signup-button"
    >
      {children}
    </button>
  ),
}));

jest.mock('../../../components/common/Checkbox', () => ({
  Checkbox: ({ id, label, checked, onChange, required }: any) => (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        data-testid={`checkbox-${id}`}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  ),
}));

jest.mock('../../../components/common/GoogleAuthButton', () => ({
  GoogleAuthButton: () => <button data-testid="google-auth-button">Sign in with Google</button>,
}));

jest.mock('../../../components/common/AuthDivider', () => ({
  AuthDivider: ({ text }: any) => <div data-testid="auth-divider">{text}</div>,
}));

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
    mockNavigate.mockClear();
  });

  describe('Rendering', () => {
    it('renders signup form with all required fields', () => {
      renderSignup();
      
      expect(screen.getByText('Create an account')).toBeInTheDocument();
      expect(screen.getByText('Sign up to get started')).toBeInTheDocument();
      expect(screen.getByTestId('input-name')).toBeInTheDocument();
      expect(screen.getByTestId('input-email')).toBeInTheDocument();
      expect(screen.getByTestId('input-password')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-privacy-policy')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-marketing-emails')).toBeInTheDocument();
      expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    });

    it('renders privacy policy checkbox as required', () => {
      renderSignup();
      
      const privacyCheckbox = screen.getByTestId('checkbox-privacy-policy');
      expect(privacyCheckbox).toBeRequired();
    });

    it('renders marketing emails checkbox as optional', () => {
      renderSignup();
      
      const marketingCheckbox = screen.getByTestId('checkbox-marketing-emails');
      expect(marketingCheckbox).not.toBeRequired();
    });
  });

  describe('Form Validation', () => {
    it('shows error when trying to submit without accepting privacy policy', async () => {
      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Submit form without accepting privacy policy
      fireEvent.click(screen.getByTestId('signup-button'));
      
      await waitFor(() => {
        expect(screen.getByText('You must accept the Privacy Policy and Terms & Conditions to continue')).toBeInTheDocument();
      });
    });

    it('allows form submission when privacy policy is accepted', async () => {
      mockedAuthService.signup.mockResolvedValue({
        success: true,
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token'
      });

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      fireEvent.click(screen.getByTestId('signup-button'));
      
      await waitFor(() => {
        expect(mockedAuthService.signup).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password123');
      });
    });
  });

  describe('Form Submission', () => {
    it('calls signup service with correct data when form is submitted', async () => {
      mockedAuthService.signup.mockResolvedValue({
        success: true,
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token'
      });

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      fireEvent.click(screen.getByTestId('signup-button'));
      
      await waitFor(() => {
        expect(mockedAuthService.signup).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password123');
      });
    });

    it('shows loading state during form submission', async () => {
      mockedAuthService.signup.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          success: true,
          user: { id: '1', name: 'John Doe', email: 'john@example.com' },
          token: 'mock-token'
        }), 100))
      );

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      fireEvent.click(screen.getByTestId('signup-button'));
      
      // Check loading state
      expect(screen.getByText('Creating account...')).toBeInTheDocument();
      expect(screen.getByTestId('signup-button')).toBeDisabled();
    });

    it('navigates to role-selection on successful signup', async () => {
      mockedAuthService.signup.mockResolvedValue({
        success: true,
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token'
      });

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      fireEvent.click(screen.getByTestId('signup-button'));
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message when signup fails', async () => {
      mockedAuthService.signup.mockResolvedValue({
        success: false,
        message: 'Email already exists'
      });

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      fireEvent.click(screen.getByTestId('signup-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });
    });

    it('displays generic error message when signup throws an exception', async () => {
      mockedAuthService.signup.mockRejectedValue(new Error('Network error'));

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      fireEvent.click(screen.getByTestId('signup-button'));
      
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
      });
    });

    it('displays generic error message when signup fails without message', async () => {
      mockedAuthService.signup.mockResolvedValue({
        success: false
      });

      renderSignup();
      
      // Fill in form fields
      fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'password123' } });
      
      // Accept privacy policy
      fireEvent.click(screen.getByTestId('checkbox-privacy-policy'));
      
      // Submit form
      fireEvent.click(screen.getByTestId('signup-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Signup failed')).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('updates form fields when user types', () => {
      renderSignup();
      
      const nameInput = screen.getByTestId('input-name');
      const emailInput = screen.getByTestId('input-email');
      const passwordInput = screen.getByTestId('input-password');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    it('toggles checkbox states correctly', () => {
      renderSignup();
      
      const privacyCheckbox = screen.getByTestId('checkbox-privacy-policy');
      const marketingCheckbox = screen.getByTestId('checkbox-marketing-emails');
      
      // Initially unchecked
      expect(privacyCheckbox).not.toBeChecked();
      expect(marketingCheckbox).not.toBeChecked();
      
      // Check both
      fireEvent.click(privacyCheckbox);
      fireEvent.click(marketingCheckbox);
      
      expect(privacyCheckbox).toBeChecked();
      expect(marketingCheckbox).toBeChecked();
      
      // Uncheck both
      fireEvent.click(privacyCheckbox);
      fireEvent.click(marketingCheckbox);
      
      expect(privacyCheckbox).not.toBeChecked();
      expect(marketingCheckbox).not.toBeChecked();
    });
  });

  describe('Navigation Links', () => {
    it('renders link to privacy policy', () => {
      renderSignup();
      
      const privacyLink = screen.getByText('Privacy Policy and Terms & Conditions');
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy-policy');
      expect(privacyLink.closest('a')).toHaveAttribute('target', '_blank');
    });

    it('renders link to login page', () => {
      renderSignup();
      
      const loginLink = screen.getByText('Login');
      expect(loginLink).toBeInTheDocument();
      expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
    });
  });
});
