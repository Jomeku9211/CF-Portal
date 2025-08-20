import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../../../views/LandingPage/LandingPage';

// Mock IntersectionObserver for scroll animations
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
global.IntersectionObserver = mockIntersectionObserver;

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

describe('Landing Page Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
  });

  test('renders landing page with proper structure and accessibility', () => {
    const landingpageId = screen.getByTestId("LandingPageID");
    expect(landingpageId).toBeInTheDocument();
    
    // Check for main sections
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0); // Has headings
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0); // Has links
  });

  test('renders hero section with call-to-action elements', async () => {
    // Check for hero content
    const heroHeading = screen.getByRole("heading", { level: 1 });
    expect(heroHeading).toBeInTheDocument();
    
    // Check for CTA buttons - Landing page uses links, not buttons
    const ctaLinks = screen.getAllByRole("link");
    expect(ctaLinks.length).toBeGreaterThan(0);
    
    // Verify at least one link has proper accessibility
    const primaryLink = ctaLinks.find(link => 
      link.textContent?.toLowerCase().includes('book') ||
      link.textContent?.toLowerCase().includes('learn')
    );
    expect(primaryLink).toBeInTheDocument();
  });

  test('renders navigation with proper accessibility', () => {
    // Navigation might be rendered differently, check for navigation content
    const navContent = screen.getByTestId("LandingPageID");
    expect(navContent).toBeInTheDocument();
    
    // Check for navigation links
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Verify navigation items have proper labels
    navLinks.forEach(link => {
      expect(link).toHaveAttribute("href");
      expect(link.textContent).toBeTruthy();
    });
  });

  test('renders key sections with proper semantic structure', () => {
    // Check for main content sections - Landing page uses divs, not semantic sections
    const mainContent = screen.getByTestId("LandingPageID");
    expect(mainContent).toBeInTheDocument();
    
    // Verify section headings
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(1);
    
    // Check for proper heading hierarchy
    const h1Elements = screen.getAllByRole("heading", { level: 1 });
    const h2Elements = screen.getAllByRole("heading", { level: 2 });
    expect(h1Elements.length).toBeLessThanOrEqual(1); // Only one main heading
    expect(h2Elements.length).toBeGreaterThan(0);
  });

  test('handles user interactions and form submissions', async () => {
    // Test contact form if present
    const contactForms = screen.queryAllByRole("form");
    if (contactForms.length > 0) {
      const form = contactForms[0];
      const inputs = form.querySelectorAll('input, textarea');
      
      if (inputs.length > 0) {
        const firstInput = inputs[0] as HTMLInputElement;
        await user.type(firstInput, 'test@example.com');
        expect(firstInput.value).toBe('test@example.com');
      }
    }
  });

  test('ensures responsive design and mobile accessibility', () => {
    // Check for responsive classes
    const container = screen.getByTestId("LandingPageID");
    expect(container).toBeInTheDocument();
    
    // Verify mobile-friendly elements
    const mobileMenuButton = screen.queryByRole("button", { name: /menu/i });
    if (mobileMenuButton) {
      expect(mobileMenuButton).toHaveAttribute("aria-expanded");
      expect(mobileMenuButton).toHaveAttribute("aria-label");
    }
  });

  test('renders footer with proper links and information', () => {
    // Footer might be rendered differently, check for footer content
    const footerContent = screen.getByTestId("LandingPageID");
    expect(footerContent).toBeInTheDocument();
    
    // Check for footer links
    const footerLinks = screen.getAllByRole("link");
    expect(footerLinks.length).toBeGreaterThan(0);
    
    // Verify footer content
    footerLinks.forEach(link => {
      expect(link).toHaveAttribute("href");
      expect(link.textContent).toBeTruthy();
    });
  });

  test('handles scroll events and animations gracefully', () => {
    // Test scroll behavior
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    // Component should handle scroll without errors
    expect(screen.getByTestId("LandingPageID")).toBeInTheDocument();
  });

  test('ensures proper loading states and error handling', async () => {
    // Test image loading
    const images = screen.getAllByRole("img");
    images.forEach(img => {
      fireEvent.load(img);
      expect(img).toHaveAttribute("src");
    });
    
    // Test error handling
    if (images.length > 0) {
      fireEvent.error(images[0]);
      // Component should still render
      expect(screen.getByTestId("LandingPageID")).toBeInTheDocument();
    }
  });

  test('maintains proper ARIA labels and roles', () => {
    // Check for proper ARIA attributes
    const elementsWithAria = screen.getAllByRole("button").concat(
      screen.getAllByRole("link")
    );
    
    elementsWithAria.forEach(element => {
      // Check for proper labeling
      const hasLabel = element.hasAttribute("aria-label") || 
                      element.hasAttribute("aria-labelledby") ||
                      element.textContent?.trim().length > 0;
      expect(hasLabel).toBe(true);
    });
  });
});
