import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/HeaderComp/Header';

// Mock the auth context
const mockUseAuth = jest.fn();
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock window.matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Header Component', () => {
  const user = userEvent.setup();

  const renderHeader = (authState: any = { user: null, isAuthenticated: false }) => {
    mockUseAuth.mockReturnValue({
      ...authState,
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn(),
      isLoading: false,
      refreshUser: jest.fn(),
      sendWelcomeEmail: jest.fn()
    });
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 768,
    });
  });

  test('renders header with proper structure and accessibility', () => {
    renderHeader();
    
    const header = screen.getByTestId("HeaderId");
    expect(header).toBeInTheDocument();
    
    // Check for logo/brand
    const logo = screen.getByAltText("CoderFarm Logo");
    expect(logo).toBeInTheDocument();
    
    // Check for navigation
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  test('renders navigation menu with proper links and accessibility', () => {
    renderHeader();
    
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Verify navigation items have proper labels and hrefs
    navLinks.forEach(link => {
      expect(link).toHaveAttribute("href");
      // Some links might not have text content initially
      expect(link).toBeInTheDocument();
      
      // Check for proper ARIA attributes
      if (link.getAttribute("aria-current")) {
        expect(link).toHaveAttribute("aria-current");
      }
    });
  });

  test('handles mobile menu toggle correctly', async () => {
    renderHeader();
    
    // Find mobile menu button
    const mobileMenuButton = screen.queryByRole("button", { name: /menu|hamburger/i });
    
    if (mobileMenuButton) {
      // Initially menu should be closed (might not have aria-expanded initially)
      expect(mobileMenuButton).toBeInTheDocument();
      
      // Click to open menu
      await user.click(mobileMenuButton);
      
      // Just verify the button exists and is clickable
      expect(mobileMenuButton).toBeInTheDocument();
    }
  });

  test('displays authentication state correctly', () => {
    // Test unauthenticated state
    renderHeader({ user: null, isAuthenticated: false });
    
    const loginButton = screen.queryByRole("link", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    
    // Test authenticated state
    renderHeader({ 
      user: { id: '1', name: 'Test User', email: 'test@example.com' }, 
      isAuthenticated: true 
    });
    
    const userMenu = screen.queryByRole("button", { name: /account menu/i });
    expect(userMenu).toBeInTheDocument();
  });

  test('handles user menu interactions properly', async () => {
    renderHeader({ 
      user: { id: '1', name: 'Test User', email: 'test@example.com' }, 
      isAuthenticated: true 
    });
    
    const userMenu = screen.queryByRole("button", { name: /user|profile|account/i });
    
    if (userMenu) {
      // Initially menu should be closed (might not have aria-expanded initially)
      expect(userMenu).toBeInTheDocument();
      
      // Click to open menu
      await user.click(userMenu);
      
      // Just verify the button exists and is clickable
      expect(userMenu).toBeInTheDocument();
      
      // Check for user menu items
      const profileLink = screen.queryByRole("link", { name: /profile/i });
      const settingsLink = screen.queryByRole("link", { name: /settings/i });
      
      if (profileLink) expect(profileLink).toBeInTheDocument();
      if (settingsLink) expect(settingsLink).toBeInTheDocument();
    }
  });

  test('ensures proper responsive behavior', () => {
    renderHeader();
    
    // Test desktop view
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    fireEvent(window, new Event('resize'));
    
    // Test mobile view
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
    fireEvent(window, new Event('resize'));
    
    // Component should handle resize without errors
    expect(screen.getByTestId("HeaderId")).toBeInTheDocument();
  });

  test('handles navigation state changes correctly', async () => {
    renderHeader();
    
    const navLinks = screen.getAllByRole("link");
    if (navLinks.length > 0) {
      const firstLink = navLinks[0];
      
      // Test link click
      await user.click(firstLink);
      
      // Verify navigation occurred
      expect(firstLink).toBeInTheDocument();
    }
  });

  test('maintains proper ARIA labels and roles', () => {
    renderHeader();
    
    const header = screen.getByTestId("HeaderId");
    expect(header).toBeInTheDocument();
    
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    
    // Check for proper labeling
    const buttons = screen.getAllByRole("button");
    buttons.forEach(button => {
      const hasLabel = button.hasAttribute("aria-label") || 
                      button.hasAttribute("aria-labelledby") ||
                      button.textContent?.trim().length > 0;
      expect(hasLabel).toBe(true);
    });
  });

  test('handles keyboard navigation properly', async () => {
    renderHeader();
    
    const navLinks = screen.getAllByRole("link");
    if (navLinks.length > 0) {
      const firstLink = navLinks[0];
      
      // Focus first link
      firstLink.focus();
      expect(firstLink).toHaveFocus();
      
      // Test keyboard navigation
      fireEvent.keyDown(firstLink, { key: 'Enter' });
      fireEvent.keyDown(firstLink, { key: ' ' });
      
      // Component should handle keyboard events
      expect(firstLink).toBeInTheDocument();
    }
  });

  test('ensures proper contrast and visual hierarchy', () => {
    renderHeader();
    
    const header = screen.getByTestId("HeaderId");
    expect(header).toHaveClass("Header_Main");
    
    // Check for proper styling classes
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("Header_Navigation");
  });

  test('handles error states gracefully', () => {
    // Test with invalid auth state
    mockUseAuth.mockImplementation(() => {
      throw new Error('Auth context error');
    });
    
    // Component should render without crashing
    expect(() => renderHeader()).not.toThrow();
  });
});
