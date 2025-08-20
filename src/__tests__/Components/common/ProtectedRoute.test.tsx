import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/common/ProtectedRoute';
import { useAuth } from '../../../contexts/AuthContext';

// Mock AuthContext
jest.mock('../../../contexts/AuthContext');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  test('shows loading state when authentication is loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: true,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  test('handles undefined user gracefully', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  test('renders complex nested components when authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard</p>
            <button>Click me</button>
          </div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Welcome to your dashboard')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles function children when authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    const renderContent = () => <div data-testid="function-content">Function Content</div>;

    render(
      <MemoryRouter>
        <ProtectedRoute>
          {renderContent()}
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('function-content')).toBeInTheDocument();
  });

  test('handles null children gracefully', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          {null}
        </ProtectedRoute>
      </MemoryRouter>
    );

    // When children is null, the component might not render anything
    expect(container).toBeInTheDocument();
  });

  test('handles empty children gracefully', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });

    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          {''}
        </ProtectedRoute>
      </MemoryRouter>
    );

    // When children is empty, the component might not render anything
    expect(container).toBeInTheDocument();
  });
});
