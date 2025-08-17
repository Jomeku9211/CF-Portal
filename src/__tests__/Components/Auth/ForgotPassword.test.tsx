import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ForgotPassword } from '../../../components/Auth/ForgotPassword';

// Mock fetch globally
global.fetch = jest.fn();
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

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
      <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>{label}</label>
      <input
        id={label.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}
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
      data-testid="submit-button"
    >
      {children}
    </button>
  ),
}));

const renderForgotPassword = () => {
  return render(
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  );
};

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Step 1: Email Entry', () => {
    it('renders email entry form initially', () => {
      renderForgotPassword();
      
      expect(screen.getByText('Forgot Password')).toBeInTheDocument();
      expect(screen.getByText('Enter your email to receive a verification code')).toBeInTheDocument();
      expect(screen.getByTestId('input-email')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Send verification code');
    });

    it('successfully sends verification code', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Success' }),
      } as Response);

      renderForgotPassword();
      
      // Fill in email
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/forgot-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'test@example.com' }),
          }
        );
      });

      await waitFor(() => {
        expect(screen.getByText('Verification code sent to your email')).toBeInTheDocument();
        expect(screen.getByText('Verify OTP', { selector: 'h1' })).toBeInTheDocument();
      });
    });

    it('handles email submission failure', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Email not found' }),
      } as Response);

      renderForgotPassword();
      
      // Fill in email
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Email not found')).toBeInTheDocument();
      });
    });

    it('handles network errors during email submission', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Network error'));

      renderForgotPassword();
      
      // Fill in email
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Network error occurred')).toBeInTheDocument();
      });
    });

    it('shows loading state during email submission', async () => {
      mockedFetch.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ message: 'Success' }),
        } as Response), 100))
      );

      renderForgotPassword();
      
      // Fill in email
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      // Check loading state
      expect(screen.getByText('Sending...')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeDisabled();
    });
  });

  describe('Step 2: OTP Verification', () => {
    beforeEach(async () => {
      // Setup: Send email first to get to step 2
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Success' }),
      } as Response);

      renderForgotPassword();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Verify OTP', { selector: 'h1' })).toBeInTheDocument();
      });
    });

    it('renders OTP verification form', () => {
      expect(screen.getByText('Enter the OTP sent to your email')).toBeInTheDocument();
      expect(screen.getByTestId('input-otp-code')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Verify OTP');
    });

    it('successfully verifies OTP', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Success' }),
      } as Response);

      // Fill in OTP
      fireEvent.change(screen.getByTestId('input-otp-code'), { target: { value: '123456' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/verify-otp',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'test@example.com', otp: '123456' }),
          }
        );
      });

      await waitFor(() => {
        expect(screen.getByText('OTP verified successfully')).toBeInTheDocument();
        expect(screen.getByText('Reset Password', { selector: 'h1' })).toBeInTheDocument();
      });
    });

    it('handles OTP verification failure', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Invalid OTP' }),
      } as Response);

      // Fill in OTP
      fireEvent.change(screen.getByTestId('input-otp-code'), { target: { value: '123456' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid OTP')).toBeInTheDocument();
      });
    });

    it('allows resending verification code', async () => {
      // Click resend button
      fireEvent.click(screen.getByText('Resend'));
      
      // Should go back to step 1
      expect(screen.getByText('Forgot Password', { selector: 'h1' })).toBeInTheDocument();
      expect(screen.getByText('Enter your email to receive a verification code')).toBeInTheDocument();
    });
  });

  describe('Step 3: Password Reset', () => {
    beforeEach(async () => {
      // Setup: Go through steps 1 and 2 to get to step 3
      mockedFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: 'Success' }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: 'Success' }),
        } as Response);

      renderForgotPassword();
      
      // Step 1: Send email
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Verify OTP', { selector: 'h1' })).toBeInTheDocument();
      });
      
      // Step 2: Verify OTP
      fireEvent.change(screen.getByTestId('input-otp-code'), { target: { value: '123456' } });
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Reset Password', { selector: 'h1' })).toBeInTheDocument();
      });
    });

    it('renders password reset form', () => {
      expect(screen.getByText('Create a new password')).toBeInTheDocument();
      expect(screen.getByTestId('input-new-password')).toBeInTheDocument();
      expect(screen.getByTestId('input-confirm-password')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Reset Password');
    });

    it('successfully resets password', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Success' }),
      } as Response);

      // Fill in passwords
      fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'newpassword123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'newpassword123' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/reset-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: 'test@example.com', 
              otp: '123456', 
              newPassword: 'newpassword123' 
            }),
          }
        );
      });

      await waitFor(() => {
        expect(screen.getByText('Password reset successfully! You can now login with your new password.')).toBeInTheDocument();
        expect(screen.getByText('Forgot Password', { selector: 'h1' })).toBeInTheDocument(); // Back to step 1
      });
    });

    it('shows error when passwords do not match', async () => {
      // Fill in passwords with mismatch
      fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'newpassword123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'differentpassword' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    it('handles password reset failure', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Failed to reset password' }),
      } as Response);

      // Fill in passwords
      fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'newpassword123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'newpassword123' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Failed to reset password')).toBeInTheDocument();
      });
    });

    it('shows loading state during password reset', async () => {
      mockedFetch.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ message: 'Success' }),
        } as Response), 100))
      );

      // Fill in passwords
      fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'newpassword123' } });
      fireEvent.change(screen.getByTestId('input-confirm-password'), { target: { value: 'newpassword123' } });
      
      // Submit form
      fireEvent.click(screen.getByTestId('submit-button'));
      
      // Check loading state
      expect(screen.getByText('Resetting...')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeDisabled();
    });
  });

  describe('Navigation', () => {
    it('renders back to login link', () => {
      renderForgotPassword();
      
      const backLink = screen.getByText('Back to login');
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/login');
    });
  });

  describe('Form Validation', () => {
    it('requires email field', () => {
      renderForgotPassword();
      
      const emailInput = screen.getByTestId('input-email');
      expect(emailInput).toBeRequired();
    });

    it('requires OTP field in step 2', async () => {
      // Setup: Go to step 2
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Success' }),
      } as Response);

      renderForgotPassword();
      
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Verify OTP', { selector: 'h1' })).toBeInTheDocument();
      });
      
      const otpInput = screen.getByTestId('input-otp-code');
      expect(otpInput).toBeRequired();
    });

    it('requires password fields in step 3', async () => {
      // Setup: Go to step 3
      mockedFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: 'Success' }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: 'Success' }),
        } as Response);

      renderForgotPassword();
      
      // Step 1: Send email
      fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Verify OTP', { selector: 'h1' })).toBeInTheDocument();
      });
      
      // Step 2: Verify OTP
      fireEvent.change(screen.getByTestId('input-otp-code'), { target: { value: '123456' } });
      fireEvent.click(screen.getByTestId('submit-button'));
      
      await waitFor(() => {
        expect(screen.getByText('Reset Password', { selector: 'h1' })).toBeInTheDocument();
      });
      
      const newPasswordInput = screen.getByTestId('input-new-password');
      const confirmPasswordInput = screen.getByTestId('input-confirm-password');
      
      expect(newPasswordInput).toBeRequired();
      expect(confirmPasswordInput).toBeRequired();
    });
  });
});
