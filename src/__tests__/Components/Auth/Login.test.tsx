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

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('Login Component - mocked credentials', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test('logs in successfully with provided credentials and navigates', async () => {
    const email = 'dheeraj@coderfarm.in';
    const password = 'Qwertyuiop@1';

    // Mock successful API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'mock-jwt-token',
        user: {
          id: 'user-1',
          name: 'Dheeraj',
          email,
        },
      }),
    });

    render(<Login />, { wrapper: TestWrapper });

    await userEvent.type(screen.getByLabelText('Email'), email);
    await userEvent.type(screen.getByLabelText('Password'), password);

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check if API was called with normalized email and correct payload
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ email: email.toLowerCase(), password }),
        })
      );
    });

    // Token stored
    expect(localStorage.getItem('authToken')).toBe('mock-jwt-token');

    // Navigated to role selection
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/role-selection');
    });
  });

  test('shows error on invalid credentials', async () => {
    const email = 'dheeraj@coderfarm.in';
    const password = 'wrongpassword';

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid email or password' }),
    });

    render(<Login />, { wrapper: TestWrapper });

    await userEvent.type(screen.getByLabelText('Email'), email);
    await userEvent.type(screen.getByLabelText('Password'), password);

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
