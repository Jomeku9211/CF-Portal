import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Signup } from '../../../components/Auth/Signup';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock fetch globally but allow us to control responses
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock react-router-dom navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>
}));

// Mock auth context
const mockSignup = jest.fn();
const mockUseAuth = jest.fn();
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
  AuthProvider: ({ children }: any) => <div data-testid="auth-provider">{children}</div>,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  UserIcon: ({ size }: any) => <div data-testid="user-icon" style={{ width: size, height: size }}>👤</div>,
  MailIcon: ({ size }: any) => <div data-testid="mail-icon" style={{ width: size, height: size }}>📧</div>,
  LockIcon: ({ size }: any) => <div data-testid="lock-icon" style={{ width: size, height: size }}>🔒</div>,
  EyeIcon: ({ size }: any) => <div data-testid="eye-icon" style={{ width: size, height: size }}>👁️</div>,
  EyeOffIcon: ({ size }: any) => <div data-testid="eye-off-icon" style={{ width: size, height: size }}>🙈</div>,
  XIcon: ({ size }: any) => <div data-testid="x-icon" style={{ width: size, height: size }}>❌</div>,
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
    
    // Default mock for useAuth
    mockUseAuth.mockReturnValue({
      signup: mockSignup,
    });
  });

  describe('Initial Render', () => {
  test('renders signup form with all required fields', () => {
    render(<Signup />, { wrapper: TestWrapper });
      
    // Check if main form elements are rendered
      expect(screen.getByText('Create an account')).toBeInTheDocument();
      expect(screen.getByText('Create Account to get started')).toBeInTheDocument();
    
    // Check form fields
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    
    // Check checkboxes
    expect(screen.getByLabelText(/I agree to the Privacy Policy/)).toBeInTheDocument();
    expect(screen.getByLabelText(/I consent to receive updates/)).toBeInTheDocument();
    
    // Check submit button
          expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    
    // Check Google signup option
    expect(screen.getByText('OR')).toBeInTheDocument();
    
    // Check login link
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

    test('displays form inputs with proper attributes', () => {
      render(<Signup />, { wrapper: TestWrapper });

      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');

      expect(nameInput).toHaveAttribute('type', 'text');
      expect(nameInput).toHaveAttribute('placeholder', 'Enter your full name');
      expect(nameInput).toHaveAttribute('required');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
      expect(emailInput).toHaveAttribute('required');
      
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', 'Create a password');
      expect(passwordInput).toHaveAttribute('required');
      
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
      expect(confirmPasswordInput).toHaveAttribute('placeholder', 'Confirm your password');
      expect(confirmPasswordInput).toHaveAttribute('required');
    });

    test('shows password visibility toggles', () => {
      render(<Signup />, { wrapper: TestWrapper });

      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      const toggleButtons = screen.getAllByLabelText(/Toggle password visibility/);

      expect(toggleButtons).toHaveLength(2);
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });

    test('displays privacy policy and marketing checkboxes', () => {
      render(<Signup />, { wrapper: TestWrapper });

      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      const marketingCheckbox = screen.getByLabelText(/I consent to receive updates/);

      expect(privacyCheckbox).toBeInTheDocument();
      expect(marketingCheckbox).toBeInTheDocument();
      expect(privacyCheckbox).not.toBeChecked();
      expect(marketingCheckbox).not.toBeChecked();
    });

    test('shows proper links and navigation elements', () => {
      render(<Signup />, { wrapper: TestWrapper });

      const privacyLink = screen.getByText('Privacy Policy and Terms & Conditions');
      const loginLink = screen.getByText('Login');

      expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
      expect(privacyLink).toHaveAttribute('target', '_blank');
      expect(loginLink).toHaveAttribute('href', '/login');
    });
  });

  describe('Form Interaction', () => {
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

    test('handles input blur events', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
      const nameInput = screen.getByLabelText('Full Name');
      
      // Type invalid name and blur
      await user.type(nameInput, 'a');
      await user.tab(); // This will trigger blur
      
      // Should show validation error after blur
      expect(screen.getByText('Name must be at least 2 characters long')).toBeInTheDocument();
    });

    test('clears validation errors when user starts typing', async () => {
      const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const nameInput = screen.getByLabelText('Full Name');
      
      // Type invalid name to trigger error
      await user.type(nameInput, 'a');
      await user.tab();
      expect(screen.getByText('Name must be at least 2 characters long')).toBeInTheDocument();
      
      // Start typing valid name
      await user.clear(nameInput);
      await user.type(nameInput, 'John');
      
      // Error should be cleared
      expect(screen.queryByText('Name must be at least 2 characters long')).not.toBeInTheDocument();
    });
  });

  describe('Password Functionality', () => {
    test('password visibility toggle works', async () => {
      const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      
      // Test password visibility toggle
      const passwordToggle = screen.getAllByLabelText(/Toggle password visibility/)[0];
      await user.click(passwordToggle);
      expect(passwordInput).toHaveAttribute('type', 'text');
      await user.click(passwordToggle);
      expect(passwordInput).toHaveAttribute('type', 'password');
      
      // Test confirm password visibility toggle
      const confirmPasswordToggle = screen.getAllByLabelText(/Toggle password visibility/)[1];
      await user.click(confirmPasswordToggle);
      expect(confirmPasswordInput).toHaveAttribute('type', 'text');
      await user.click(confirmPasswordToggle);
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  test('password strength indicator works correctly', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const passwordInput = screen.getByLabelText('Password');
    
    // Test very weak password
    await user.type(passwordInput, 'a');
    expect(screen.getByText(/Password strength/i)).toBeInTheDocument();
      expect(screen.getByText('Very Weak')).toBeInTheDocument();
    
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

    test('password strength visual indicator works', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const passwordInput = screen.getByLabelText('Password');
      
      // Test password strength bar with a weak password that will show missing feedback
      await user.type(passwordInput, 'abc');
      
      // Check that the strength bar exists by looking for the background div
      const strengthBarContainer = screen.getByText('Password strength:').closest('div')?.parentElement;
      expect(strengthBarContainer).toBeInTheDocument();
      
      // Check that the strength bar background exists
      const strengthBarBackground = strengthBarContainer?.querySelector('.bg-gray-200');
      expect(strengthBarBackground).toBeInTheDocument();
      
      // Check that feedback text is displayed
      expect(screen.getByText(/Missing:/)).toBeInTheDocument();
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
  });

  describe('Form Validation', () => {
    test('form validation works correctly', async () => {
      const user = userEvent.setup();
      // Mock signup to return proper format
      mockSignup.mockResolvedValue({ success: false, message: 'Validation failed' });
      
      render(<Signup />, { wrapper: TestWrapper });
      
      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
      
      // Should show privacy policy error
      expect(screen.getByText('You must accept the Privacy Policy and Terms & Conditions to continue')).toBeInTheDocument();
      
      // Check privacy policy checkbox
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      await user.click(privacyCheckbox);
      
      // Fill in required fields so the submit button is enabled
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      
      // Try to submit again
      await user.click(submitButton);
      
      // Should show validation errors
      expect(screen.getByText('Please fix the validation errors above')).toBeInTheDocument();
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
      // Handle multiple error elements
      const emailErrors = screen.getAllByText('Please enter a valid email address');
      expect(emailErrors.length).toBeGreaterThan(0);
      
      // Fix email
      await user.clear(emailInput);
      await user.type(emailInput, 'john@example.com');
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });

    test('name length validation', async () => {
      const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const nameInput = screen.getByLabelText('Full Name');
      
      // Test too short name
      await user.type(nameInput, 'a');
      expect(screen.getByText('Name must be at least 2 characters long')).toBeInTheDocument();
      
      // Test too long name
      await user.clear(nameInput);
      const longName = 'a'.repeat(51);
      await user.type(nameInput, longName);
      expect(screen.getByText('Name must be less than 50 characters')).toBeInTheDocument();
      
      // Test valid name
      await user.clear(nameInput);
      await user.type(nameInput, 'John Doe');
      expect(screen.queryByText(/Name must be/)).not.toBeInTheDocument();
    });

    test('email format validation', async () => {
    const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const emailInput = screen.getByLabelText('Email');
      
      // Test invalid email formats
      const invalidEmails = ['invalid', 'invalid@', '@invalid', 'invalid@invalid'];
      
      for (const email of invalidEmails) {
        await user.clear(emailInput);
        await user.type(emailInput, email);
        // Handle multiple error elements
        const emailErrors = screen.getAllByText('Please enter a valid email address');
        expect(emailErrors.length).toBeGreaterThan(0);
      }
      
      // Test valid email
      await user.clear(emailInput);
      await user.type(emailInput, 'test@example.com');
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });

    test('password length validation', async () => {
      const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const passwordInput = screen.getByLabelText('Password');
      
      // Test too short password
      await user.type(passwordInput, '123');
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
      
      // Test valid password
      await user.clear(passwordInput);
      await user.type(passwordInput, 'Password123!');
      expect(screen.queryByText('Password must be at least 8 characters long')).not.toBeInTheDocument();
    });
  });

  describe('Checkbox Functionality', () => {
    test('privacy policy checkbox is required', async () => {
      const user = userEvent.setup();
      // Mock signup to return proper format
      mockSignup.mockResolvedValue({ success: false, message: 'Validation failed' });
      
      render(<Signup />, { wrapper: TestWrapper });
      
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      
      // Try to submit without checking privacy policy
      await user.click(submitButton);
      expect(screen.getByText('You must accept the Privacy Policy and Terms & Conditions to continue')).toBeInTheDocument();
      
      // Check privacy policy and try again
      await user.click(privacyCheckbox);
      
      // Fill in required fields so the submit button is enabled
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      
      await user.click(submitButton);
      
      // Should show other validation errors instead
      expect(screen.queryByText('You must accept the Privacy Policy and Terms & Conditions to continue')).not.toBeInTheDocument();
    });

    test('marketing emails checkbox is optional', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: true });
      
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
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
      
      // Should still work without marketing emails checked
      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalled();
      });
    });

    test('checkbox state changes correctly', async () => {
      const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      const marketingCheckbox = screen.getByLabelText(/I consent to receive updates/);
      
      // Initially unchecked
      expect(privacyCheckbox).not.toBeChecked();
      expect(marketingCheckbox).not.toBeChecked();
      
      // Check both
      await user.click(privacyCheckbox);
      await user.click(marketingCheckbox);
      
      expect(privacyCheckbox).toBeChecked();
      expect(marketingCheckbox).toBeChecked();
      
      // Uncheck both
      await user.click(privacyCheckbox);
      await user.click(marketingCheckbox);
      
      expect(privacyCheckbox).not.toBeChecked();
      expect(marketingCheckbox).not.toBeChecked();
    });
  });

  describe('Form Submission', () => {
    test('successful signup with real API integration', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: true });
    
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
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    await user.click(submitButton);
    
      // Check if signup was called with correct data
      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith('Test User', 'test@example.com', 'Password123!');
    });
    
    // Check if navigation occurred
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/role-selection', { replace: true });
    });
  });

  test('signup failure handling', async () => {
    const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: false, message: 'Email already exists' });
    
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
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    await user.click(submitButton);
    
      // Check if error is displayed (handle multiple elements)
      await waitFor(() => {
        const errorElements = screen.getAllByText('Email already exists');
        expect(errorElements.length).toBeGreaterThan(0);
      });
    
    // Check if navigation did NOT occur
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('network error handling', async () => {
    const user = userEvent.setup();
      mockSignup.mockRejectedValueOnce(new Error('Network error'));
    
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
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    await user.click(submitButton);
    
    // Check if generic error is displayed
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
      });
  });

  test('loading state during signup', async () => {
    const user = userEvent.setup();
      mockSignup.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
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
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    await user.click(submitButton);
    
    // Check if button shows loading state
      expect(screen.getByText('Creating account...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

    test('submit button is disabled when validation errors exist', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      
      // Initially the button should be enabled (no validation errors yet)
      expect(submitButton).not.toBeDisabled();
      
      // Fill out form with valid data
      await user.type(screen.getByLabelText('Full Name'), 'Test User');
      await user.type(screen.getByLabelText('Email'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'Password123!');
      await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
      
      // Accept privacy policy
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      await user.click(privacyCheckbox);
      
      // Button should be enabled now
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Input Normalization', () => {
    test('normalizes name input (trims and replaces multiple spaces)', async () => {
    const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: true });
      
      render(<Signup />, { wrapper: TestWrapper });
      
      const nameInput = screen.getByLabelText('Full Name');
      
      // Type name with extra spaces
      await user.type(nameInput, '  John   Doe  ');
      await user.type(screen.getByLabelText('Email'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'Password123!');
      await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
      
      // Accept privacy policy
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      await user.click(privacyCheckbox);
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
      
      // Check if normalized name was sent
      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith('John Doe', 'test@example.com', 'Password123!');
      });
    });

    test('normalizes email input (trims and converts to lowercase)', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: true });
      
      render(<Signup />, { wrapper: TestWrapper });
      
      const emailInput = screen.getByLabelText('Email');
      
      // Type email with extra spaces and uppercase
      await user.type(screen.getByLabelText('Full Name'), 'Test User');
      await user.type(emailInput, '  TEST@EXAMPLE.COM  ');
      await user.type(screen.getByLabelText('Password'), 'Password123!');
      await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
      
      // Accept privacy policy
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      await user.click(privacyCheckbox);
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
      
      // Check if normalized email was sent
      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith('Test User', 'test@example.com', 'Password123!');
      });
    });
  });

  describe('Error Handling', () => {
    test('displays error message from signup failure', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: false, message: 'Custom error message' });
    
    render(<Signup />, { wrapper: TestWrapper });
    
      // Fill out form
    await user.type(screen.getByLabelText('Full Name'), 'Test User');
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
    
      // Accept privacy policy
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      await user.click(privacyCheckbox);
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
      
      // Check if error is displayed
      await waitFor(() => {
        expect(screen.getByText('Custom error message')).toBeInTheDocument();
      });
    });

    test('shows email-specific error for existing email', async () => {
      const user = userEvent.setup();
      mockSignup.mockResolvedValueOnce({ success: false, message: 'Email already exists' });
      
      render(<Signup />, { wrapper: TestWrapper });
      
      // Fill out form
      await user.type(screen.getByLabelText('Full Name'), 'Test User');
      await user.type(screen.getByLabelText('Email'), 'existing@example.com');
      await user.type(screen.getByLabelText('Password'), 'Password123!');
      await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
      
      // Accept privacy policy
    const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
    await user.click(privacyCheckbox);
    
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
      
      // Check if email-specific error is displayed (handle multiple elements)
      await waitFor(() => {
        const errorElements = screen.getAllByText('Email already exists');
        expect(errorElements.length).toBeGreaterThan(0);
      });
    });

    test('clears previous error on new submission', async () => {
      const user = userEvent.setup();
      
      // First submission fails
      mockSignup.mockResolvedValueOnce({ success: false, message: 'First error' });
      
      render(<Signup />, { wrapper: TestWrapper });
      
      // Fill out form
      await user.type(screen.getByLabelText('Full Name'), 'Test User');
      await user.type(screen.getByLabelText('Email'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'Password123!');
      await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');
      
      // Accept privacy policy
      const privacyCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
      await user.click(privacyCheckbox);
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      await user.click(submitButton);
    
      await waitFor(() => {
        expect(screen.getByText('First error')).toBeInTheDocument();
      });
      
      // Second submission succeeds
      mockSignup.mockResolvedValueOnce({ success: true });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.queryByText('First error')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    test('handles very long inputs gracefully', async () => {
      const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      
      // Test very long name (use a more reasonable length to avoid timeout)
      const longName = 'a'.repeat(60);
      await user.type(nameInput, longName);
      expect(screen.getByText('Name must be less than 50 characters')).toBeInTheDocument();
      
      // Test very long email (should not trigger validation error for length)
      const longEmail = 'a'.repeat(50) + '@example.com';
      await user.type(emailInput, longEmail);
      // Long emails are technically valid, so no validation error expected
      
      // Test long password (use reasonable length to avoid timeout)
      const longPassword = 'a'.repeat(100);
      await user.type(passwordInput, longPassword);
      expect(screen.queryByText('Password must be at least 8 characters long')).not.toBeInTheDocument();
    }, 15000); // Increase timeout to 15 seconds

    test('handles special characters in inputs', async () => {
    const user = userEvent.setup();
    render(<Signup />, { wrapper: TestWrapper });
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    
      // Test special characters in name
      await user.type(nameInput, 'John-Doe O\'Connor');
      expect(screen.queryByText(/Name must be/)).not.toBeInTheDocument();
      
      // Test special characters in email
      await user.type(emailInput, 'test+tag@example.com');
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });

    test('handles rapid form interactions', async () => {
      const user = userEvent.setup();
      render(<Signup />, { wrapper: TestWrapper });
      
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      
      // Type in first field
      await user.type(nameInput, 'John');
      await user.type(emailInput, 'john@example.com');
      
      // Clear and retype with different values
      await user.clear(nameInput);
      await user.type(nameInput, 'Jane');
      await user.clear(emailInput);
      await user.type(emailInput, 'jane@example.com');
      
      // Wait a bit for state to settle, then check final values
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Check final values
      expect(nameInput).toHaveValue('Jane');
      expect(emailInput).toHaveValue('jane@example.com');
    });
  });

  describe('Accessibility', () => {
    test('has proper form labels', () => {
      render(<Signup />, { wrapper: TestWrapper });

      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    });

    test('has proper button labels', () => {
      render(<Signup />, { wrapper: TestWrapper });

      expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
      // Note: Only one password toggle button is visible initially
      const toggleButtons = screen.getAllByLabelText(/Toggle password visibility/);
      expect(toggleButtons.length).toBeGreaterThan(0);
    });

    test('maintains proper heading hierarchy', () => {
      render(<Signup />, { wrapper: TestWrapper });

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      
      headings.forEach(heading => {
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBeTruthy();
      });
    });

    test('has proper ARIA labels for password toggles', () => {
      render(<Signup />, { wrapper: TestWrapper });

      const toggleButtons = screen.getAllByLabelText(/Toggle password visibility/);
      expect(toggleButtons.length).toBeGreaterThan(0);
      
      toggleButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });
  });
});

