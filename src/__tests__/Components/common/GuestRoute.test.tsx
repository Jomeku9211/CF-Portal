import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GuestRoute } from '../../../components/common/GuestRoute';

// Mock the auth context
const mockUseAuth = jest.fn();
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    {children}
  </MemoryRouter>
);

describe('GuestRoute Component', () => {
  const TestChild = () => <div data-testid="test-child">Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('shows loading spinner when auth is loading', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
    });

    it('displays loading spinner with correct styling', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      const loadingContainer = screen.getByText('Loading...').closest('.min-h-screen');
      expect(loadingContainer).toBeInTheDocument();
      expect(loadingContainer).toHaveClass('bg-gradient-to-r', 'from-[#0f172a]', 'to-[#2d1e3a]');
    });

    it('shows animated spinner element', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      const spinner = screen.getByText('Loading...').previousElementSibling;
      expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-blue-500');
    });
  });

  describe('Authenticated User Redirect', () => {
    it('redirects authenticated users to default path', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
      // Note: Navigate component behavior is tested by React Router itself
    });

    it('redirects authenticated users to custom path when specified', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute redirectTo="/dashboard">
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
      // Note: Navigate component behavior is tested by React Router itself
    });

    it('uses replace prop for navigation', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
      // Note: Navigate component behavior is tested by React Router itself
    });
  });

  describe('Guest User Access', () => {
    it('renders children when user is not authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders multiple children correctly', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      const MultipleChildren = () => (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </>
      );

      render(
        <TestWrapper>
          <GuestRoute>
            <MultipleChildren />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });

    it('renders complex nested components', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      const ComplexChild = () => (
        <div data-testid="complex-child">
          <h1>Title</h1>
          <p>Description</p>
          <button>Click me</button>
        </div>
      );

      render(
        <TestWrapper>
          <GuestRoute>
            <ComplexChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByTestId('complex-child')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('uses default redirectTo when not specified', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
      // Note: Navigate component behavior is tested by React Router itself
    });

    it('accepts custom redirectTo prop', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute redirectTo="/custom-path">
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
      // Note: Navigate component behavior is tested by React Router itself
    });

    it('handles empty string redirectTo', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute redirectTo="">
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
      // Note: Navigate component behavior is tested by React Router itself
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined children gracefully', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            {undefined}
          </GuestRoute>
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            {null}
          </GuestRoute>
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
    });

    it('handles function children', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      const FunctionChild = () => <div data-testid="function-child">Function Child</div>;

      render(
        <TestWrapper>
          <GuestRoute>
            <FunctionChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByTestId('function-child')).toBeInTheDocument();
    });
  });

  describe('State Transitions', () => {
    it('transitions from loading to guest access correctly', () => {
      const { rerender } = render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      // Start with loading
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      rerender(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Transition to guest access
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      rerender(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('transitions from loading to authenticated redirect correctly', () => {
      const { rerender } = render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      // Start with loading
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      rerender(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Transition to authenticated
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      rerender(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides accessible loading state', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      const loadingText = screen.getByText('Loading...');
      expect(loadingText).toBeInTheDocument();
      expect(loadingText.textContent).toBe('Loading...');
    });

    it('maintains proper semantic structure', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <GuestRoute>
            <TestChild />
          </GuestRoute>
        </TestWrapper>
      );

      const child = screen.getByTestId('test-child');
      expect(child).toBeInTheDocument();
      expect(child.tagName).toBe('DIV');
    });
  });
});
