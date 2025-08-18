import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Signup } from '../../../components/Auth/Signup';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock fetch globally but allow us to control responses
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock the email service
jest.mock('../../../services/emailService', () => ({
  emailService: {
    sendThankYouEmail: jest.fn().mockResolvedValue({ success: true })
  }
}));

// Mock react-router-dom navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockNavigate.mockClear();
  });

  test('renders signup form with all required fields', () => {
    render(<Signup />, { wrapper: TestWrapper });
    
    // Check if main form elements are rendered
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Sign up to get started')).toBeInTheDocument();
    
    // Check form fields
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    
    // Check checkboxes
    expect(screen.getByLabelText(/I agree to the Privacy Policy/)).toBeInTheDocument();
    expect(screen.getByLabelText(/I consent to receive updates/)).toBeInTheDocument();
    
    // Check submit button
    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
    
    // Check Google signup option
    expect(screen.getByText('OR')).toBeInTheDocument();
    
    // Check login link
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('form validation works correctly', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /Sign up/i });
    await user.click(submitButton);
    
    // Should show validation errors
    expect(screen.getByText('You must accept the Privacy Policy and Terms & Conditions to continue')).toBeInTheDocument();
    
    // Check privacy policy checkbox
    const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
    await user.click(privacyCheckbox);
    
    // Try to submit again
    await user.click(submitButton);
    
    // Should show field validation errors
    expect(screen.getByText('Name must be at least 2 characters long')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  test('password strength indicator works correctly', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const passwordInput = screen.getByLabelText('Password');
    
    // Test very weak password
    await user.type(passwordInput, 'a');
    expect(screen.getByText('Very Weak')).toBeInTheDocument();
    expect(screen.getByText('Missing: Lowercase letter, Uppercase letter, Number, Special character')).toBeInTheDocument();
    
    // Test weak password
    await user.clear(passwordInput);
    await user.type(passwordInput, 'ab');
    expect(screen.getByText('Weak')).toBeInTheDocument();
    
    // Test fair password
    await user.clear(passwordInput);
    await user.type(passwordInput, 'abc123');
    expect(screen.getByText('Fair')).toBeInTheDocument();
    
    // Test good password
    await user.clear(passwordInput);
    await user.type(passwordInput, 'abc123A');
    expect(screen.getByText('Good')).toBeInTheDocument();
    
    // Test strong password
    await user.clear(passwordInput);
    await user.type(passwordInput, 'abc123A!');
    expect(screen.getByText('Strong')).toBeInTheDocument();
    
    // Test very strong password
    await user.clear(passwordInput);
    await user.type(passwordInput, 'abc123A!@#');
    expect(screen.getByText('Very Strong')).toBeInTheDocument();
  });

  test('password visibility toggle works', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    
    // Test password visibility toggle
    const passwordToggle = screen.getAllByRole('button')[0]; // First toggle button
    await user.click(passwordToggle);
    expect(passwordInput).toHaveAttribute('type', 'text');
    await user.click(passwordToggle);
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Test confirm password visibility toggle
    const confirmPasswordToggle = screen.getAllByRole('button')[1]; // Second toggle button
    await user.click(confirmPasswordToggle);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
    await user.click(confirmPasswordToggle);
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  test('password confirmation validation works', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    
    // Type different passwords
    await user.type(passwordInput, 'Password123!');
    await user.type(confirmPasswordInput, 'DifferentPassword123!');
    
    // Should show password mismatch error
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    
    // Fix the password
    await user.clear(confirmPasswordInput);
    await user.type(confirmPasswordInput, 'Password123!');
    
    // Error should disappear
    expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument();
  });

  test('successful signup with real API integration', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'mock-jwt-token',
        user: {
          id: 'user-123',
          name: 'Test User',
          email: 'test@example.com'
        }
      })
    });
    
    render(<Signup />, { wrapper: TestWrapper });
    
    // Fill out the form
    await user.type(screen.getByLabelText('Full Name'), 'Test User');
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
    
    // Accept privacy policy
    const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
    await user.click(privacyCheckbox);
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /Sign up/i });
    await user.click(submitButton);
    
    // Check if API was called with correct data
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            password: 'Password123!'
          })
        }
      );
    });
    
    // Check if navigation occurred
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
    });
  });

  test('signup failure handling', async () => {
    const user = userEvent.setup();
    
    // Mock failed API response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: 'Email already exists'
      })
    });
    
    render(<Signup />, { wrapper: TestWrapper });
    
    // Fill out the form
    await user.type(screen.getByLabelText('Full Name'), 'Test User');
    await user.type(screen.getByLabelText('Email'), 'existing@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
    
    // Accept privacy policy
    const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
    await user.click(privacyCheckbox);
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /Sign up/i });
    await user.click(submitButton);
    
    // Check if error is displayed
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
    
    // Check if navigation did NOT occur
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('network error handling', async () => {
    const user = userEvent.setup();
    
    // Mock network error
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(<Signup />, { wrapper: TestWrapper });
    
    // Fill out the form
    await user.type(screen.getByLabelText('Full Name'), 'Test User');
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
    
    // Accept privacy policy
    const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
    await user.click(privacyCheckbox);
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /Sign up/i });
    await user.click(submitButton);
    
    // Check if generic error is displayed
    await waitFor(() => {
      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });
  });

  test('loading state during signup', async () => {
    const user = userEvent.setup();
    
    // Mock slow API response
    mockFetch.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => ({ token: 'token', user: {} }) }), 100))
    );
    
    render(<Signup />, { wrapper: TestWrapper });
    
    // Fill out the form
    await user.type(screen.getByLabelText('Full Name'), 'Test User');
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
    
    // Accept privacy policy
    const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
    await user.click(privacyCheckbox);
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /Sign up/i });
    await user.click(submitButton);
    
    // Check if button shows loading state
    expect(screen.getByText('Creating account...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('form field updates correctly', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    
    // Type in fields
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'Password123!');
    await user.type(confirmPasswordInput, 'Password123!');
    
    // Check if values are updated
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('Password123!');
    expect(confirmPasswordInput).toHaveValue('Password123!');
  });

  test('marketing emails checkbox is optional', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'mock-jwt-token',
        user: { id: 'user-123', name: 'Test User', email: 'test@example.com' }
      })
    });
    
    render(<Signup />, { wrapper: TestWrapper });
    
    // Fill out required fields
    await user.type(screen.getByLabelText('Full Name'), 'Test User');
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
    
    // Accept privacy policy (required)
    const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
    await user.click(privacyCheckbox);
    
    // Don't check marketing emails (optional)
    const marketingCheckbox = screen.getByLabelText(/I consent to receive updates/);
    expect(marketingCheckbox).not.toBeChecked();
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /Sign up/i });
    await user.click(submitButton);
    
    // Should still work without marketing emails checked
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  test('real-time validation feedback', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    
    // Type invalid name (too short)
    await user.type(nameInput, 'a');
    expect(screen.getByText('Name must be at least 2 characters long')).toBeInTheDocument();
    
    // Fix name
    await user.clear(nameInput);
    await user.type(nameInput, 'John');
    expect(screen.queryByText('Name must be at least 2 characters long')).not.toBeInTheDocument();
    
    // Type invalid email
    await user.type(emailInput, 'invalid-email');
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    
    // Fix email
    await user.clear(emailInput);
    await user.type(emailInput, 'john@example.com');
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
  });
});

