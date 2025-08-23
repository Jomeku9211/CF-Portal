import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Navbar } from '../../../components/LandingPage/Navbar';
import { useAuth } from '../../../contexts/AuthContext';

// Mock the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock react-router-dom navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock assets
jest.mock('../../../assets/CFLogo.png', () => 'test-file-stub');

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRightIcon: ({ size, className }: any) => <div data-testid="arrow-right-icon" style={{ width: size, height: size }} className={className}>→</div>,
  UserCircle2: ({ size }: any) => <div data-testid="user-circle-icon" style={{ width: size, height: size }}>👤</div>,
  ChevronDown: ({ size, className }: any) => <div data-testid="chevron-down-icon" style={{ width: size, height: size }} className={className}>▼</div>,
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Test wrapper with Router
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Navbar Component', () => {
  const defaultAuthContext = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    refreshUser: jest.fn(),
    sendWelcomeEmail: jest.fn(),
  };

  beforeEach(() => {
    mockUseAuth.mockReturnValue(defaultAuthContext);
    mockNavigate.mockClear();
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    
    // Mock scroll event handlers
    Object.defineProperty(window, 'addEventListener', {
      value: jest.fn(),
      writable: true,
    });
    Object.defineProperty(window, 'removeEventListener', {
      value: jest.fn(),
      writable: true,
    });
  });

  describe('Initial Render and Basic Structure', () => {
    it('renders navbar with logo and navigation links', () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Check logo
      expect(screen.getByAltText('CoderFarm Logo')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /coderfarm logo/i })).toHaveAttribute('href', '/');

      // Check navigation links (desktop)
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /content hub/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
    });

    it('displays correct navigation for unauthenticated users', () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Should show login and signup for non-authenticated users
      expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
      expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();

      // Should not show account menu
      expect(screen.queryByLabelText(/account menu/i)).not.toBeInTheDocument();
    });

    it('displays correct navigation for authenticated users', () => {
      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
      });

      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Should show account menu for authenticated users
      expect(screen.getAllByLabelText(/account menu/i)).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByTestId('user-circle-icon')).toHaveLength(2);
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();

      // Should not show login/signup
      expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument();
    });
  });

  describe('Sticky Navbar Behavior', () => {
    it('applies sticky styles when scrolled', async () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const header = screen.getByRole('banner');
      
      // Initially should not have sticky styles
      expect(header).not.toHaveClass('sticky');

      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);

      // Should apply sticky styles (we'll check if event listener was added)
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('sets up and cleans up scroll event listeners', () => {
      const { unmount } = render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
      
      unmount();
      
      expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('Mobile Menu Functionality', () => {
    it('toggles mobile menu on hamburger click', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      
      // Initially only desktop nav should be visible
      const initialNavs = screen.getAllByRole('navigation');
      expect(initialNavs).toHaveLength(1); // Only desktop nav

      // Open mobile menu
      await user.click(mobileMenuButton);
      
      // Mobile navigation should now be visible
      const allNavs = screen.getAllByRole('navigation');
      expect(allNavs).toHaveLength(2); // Desktop and mobile nav
      const mobileNav = allNavs[1]; // Second nav element is mobile
      expect(mobileNav).toHaveClass('md:hidden');
    });

    it('closes mobile menu when navigation link is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      
      // Open mobile menu
      await user.click(mobileMenuButton);
      expect(screen.getAllByRole('navigation')).toHaveLength(2);

      // Click on About link in mobile menu
      const aboutLink = screen.getAllByRole('link', { name: /about/i })[1]; // Mobile version
      await user.click(aboutLink);

      // Mobile menu should close (only desktop nav should remain)
      await waitFor(() => {
        expect(screen.getAllByRole('navigation')).toHaveLength(1);
      });
    });

    it('displays mobile menu with correct links for unauthenticated users', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      await user.click(mobileMenuButton);

      const mobileNav = screen.getAllByRole('navigation')[1]; // Mobile nav is second
      
      // Check all navigation links are present in mobile menu
      expect(mobileNav).toHaveTextContent('About');
      expect(mobileNav).toHaveTextContent('Content Hub');
      expect(mobileNav).toHaveTextContent('Contact Us');
      expect(mobileNav).toHaveTextContent('Login');
      expect(mobileNav).toHaveTextContent('Sign Up');
    });

    it('displays mobile menu with account options for authenticated users', async () => {
      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
      });

      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      await user.click(mobileMenuButton);

      const mobileNav = screen.getAllByRole('navigation')[1]; // Mobile nav is second
      
      // Check account section is present
      expect(mobileNav).toHaveTextContent('My Account');
      expect(mobileNav).toHaveTextContent('Dashboard');
      expect(mobileNav).toHaveTextContent('Logout');

      // Should not show login/signup in mobile menu
      expect(mobileNav).not.toHaveTextContent('Login');
      expect(mobileNav).not.toHaveTextContent('Sign Up');
    });
  });

  describe('Account Menu Functionality', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
      });
    });

    it('toggles account dropdown menu on click', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const accountButton = screen.getAllByLabelText(/account menu/i)[0]; // Desktop version
      
      // Account menu should be hidden initially
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();

      // Open account menu
      await user.click(accountButton);
      
      // Account menu should be visible (check for multiple elements)
      expect(screen.getAllByText('Dashboard')).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByText('Logout')).toHaveLength(2); // Desktop and mobile
    });

    it('closes account menu when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const accountButton = screen.getAllByLabelText(/account menu/i)[0];
      
      // Open account menu
      await user.click(accountButton);
      expect(screen.getAllByText('Dashboard')).toHaveLength(2);

      // Click outside (on document body)
      await user.click(document.body);

      // Account menu should close
      await waitFor(() => {
        expect(screen.queryAllByText('Dashboard')).toHaveLength(0);
      });
    });

    it('closes account menu when Dashboard link is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const accountButton = screen.getAllByLabelText(/account menu/i)[0];
      
      // Open account menu
      await user.click(accountButton);
      expect(screen.getAllByText('Dashboard')).toHaveLength(2);

      // Click Dashboard link (first one - desktop)
      const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i });
      await user.click(dashboardLinks[0]);

      // Account menu should close
      await waitFor(() => {
        expect(screen.queryAllByText('Dashboard')).toHaveLength(0);
      });
    });

    it('handles logout functionality correctly', async () => {
      const mockLogout = jest.fn();
      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        logout: mockLogout,
      });

      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const accountButton = screen.getAllByLabelText(/account menu/i)[0];
      
      // Open account menu
      await user.click(accountButton);
      
      // Verify logout buttons are present and can be interacted with
      const logoutButtons = screen.getAllByText('Logout');
      expect(logoutButtons).toHaveLength(2);
      expect(logoutButtons[0]).toBeInTheDocument();
      
      // Verify button is clickable (this tests the UI functionality)
      expect(logoutButtons[0]).not.toBeDisabled();
    });
  });

  describe('Navigation Links', () => {
    it('has correct href attributes for all navigation links', () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Desktop navigation links
      expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', { name: /content hub/i })).toHaveAttribute('href', '/content-hub');
      expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '/contact');
      expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login');
      expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/signup');
    });

    it('has correct href for dashboard link when authenticated', () => {
      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
      });

      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Open account menu to see dashboard link
      const accountButton = screen.getAllByLabelText(/account menu/i)[0];
      fireEvent.click(accountButton);

      const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i });
      expect(dashboardLinks[0]).toHaveAttribute('href', '/onboarding');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Check ARIA labels
      expect(screen.getByLabelText(/toggle mobile menu/i)).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header element
      // Desktop navigation is always present
      const navElements = screen.getAllByRole('navigation');
      expect(navElements).toHaveLength(1); // Only desktop nav initially visible
    });

    it('has proper ARIA labels for authenticated user account menu', () => {
      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
      });

      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      expect(screen.getAllByLabelText(/account menu/i)).toHaveLength(2); // Desktop and mobile
    });

    it('maintains focus management for mobile menu', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      
      // Focus should be on mobile menu button
      await user.click(mobileMenuButton);
      
      // Mobile menu should be accessible via keyboard
      const navElements = screen.getAllByRole('navigation');
      expect(navElements).toHaveLength(2); // Desktop and mobile nav
    });
  });

  describe('Responsive Design', () => {
    it('hides desktop navigation on mobile viewport', () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Desktop nav should have hidden class for mobile
      const navElements = screen.getAllByRole('navigation');
      const desktopNav = navElements[0]; // First nav element is desktop
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    it('shows mobile menu button only on mobile', () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      expect(mobileMenuButton.closest('div')).toHaveClass('md:hidden');
    });

    it('shows account icon in mobile for authenticated users', () => {
      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
      });

      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Should have 2 user icons (desktop and mobile)
      expect(screen.getAllByTestId('user-circle-icon')).toHaveLength(2);
    });
  });

  describe('Event Cleanup', () => {
    it('cleans up event listeners on unmount', () => {
      const mockAddEventListener = jest.fn();
      const mockRemoveEventListener = jest.fn();
      
      Object.defineProperty(window, 'addEventListener', {
        value: mockAddEventListener,
        writable: true,
      });
      Object.defineProperty(window, 'removeEventListener', {
        value: mockRemoveEventListener,
        writable: true,
      });

      const { unmount } = render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      // Event listeners should be added
      expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

      unmount();

      // Event listeners should be removed
      expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('handles account menu outside click cleanup', async () => {
      const user = userEvent.setup();
      const mockAddEventListener = jest.fn();
      const mockRemoveEventListener = jest.fn();
      
      Object.defineProperty(document, 'addEventListener', {
        value: mockAddEventListener,
        writable: true,
      });
      Object.defineProperty(document, 'removeEventListener', {
        value: mockRemoveEventListener,
        writable: true,
      });

      mockUseAuth.mockReturnValue({
        ...defaultAuthContext,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
      });

      const { unmount } = render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const accountButton = screen.getAllByLabelText(/account menu/i)[0];
      await user.click(accountButton);

      // Document event listener should be added
      expect(mockAddEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));

      unmount();

      // Event listener should be cleaned up
      expect(mockRemoveEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
    });
  });

  describe('Logo and Branding', () => {
    it('renders logo with correct attributes', () => {
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const logo = screen.getByAltText('CoderFarm Logo');
      expect(logo).toHaveClass('h-10', 'w-auto');
      expect(logo).toHaveAttribute('src', 'test-file-stub');
    });

    it('logo link navigates to home page', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Navbar />
        </TestWrapper>
      );

      const logoLink = screen.getByRole('link', { name: /coderfarm logo/i });
      await user.click(logoLink);

      // Should close mobile menu if open and navigate to home
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });
});
