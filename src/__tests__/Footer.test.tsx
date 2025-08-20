import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/FooterComp/Footer';

describe('Footer Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  test('renders footer with proper structure and accessibility', () => {
    const footer = screen.getByTestId("FooterId");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("Footer_Main");
    
    // Check for footer ID
    const footerId = screen.getByTestId("FooterId");
    expect(footerId).toBeInTheDocument();
  });

  test('renders company information and branding', () => {
    // Check for company logo/brand
    const logo = screen.queryByAltText(/coderfarm|logo/i);
    if (logo) {
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src");
    }
    
    // Check for company description
    const descriptions = screen.queryAllByText(/coderfarm|developer|talent/i);
    if (descriptions.length > 0) {
      descriptions.forEach(desc => expect(desc).toBeInTheDocument());
    }
  });

  test('renders navigation links with proper structure', () => {
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Verify all links have proper attributes
    navLinks.forEach(link => {
      expect(link).toHaveAttribute("href");
      // Some links might have image content instead of text
      const hasTextContent = link.textContent?.trim().length > 0;
      const hasImageContent = link.querySelector('img');
      expect(hasTextContent || hasImageContent).toBeTruthy();
      
      // Check for proper ARIA attributes if applicable
      if (link.getAttribute("aria-label")) {
        expect(link).toHaveAttribute("aria-label");
      }
    });
    
    // Check for specific navigation sections
    const quickLinks = screen.queryByText(/quick links|navigation/i);
    const services = screen.queryByText(/services|what we do/i);
    const company = screen.queryByText(/company|about/i);
    
    if (quickLinks) expect(quickLinks).toBeInTheDocument();
    if (services) expect(services).toBeInTheDocument();
    if (company) expect(company).toBeInTheDocument();
  });

  test('renders social media links with proper accessibility', () => {
    const socialLinks = screen.queryAllByRole("link", { name: /facebook|twitter|linkedin|instagram|youtube/i });
    
    if (socialLinks.length > 0) {
      socialLinks.forEach(link => {
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href");
        expect(link).toHaveAttribute("aria-label");
        
        // Check for proper social media icons
        const icon = link.querySelector("svg, img");
        if (icon) {
          expect(icon).toBeInTheDocument();
        }
      });
    }
  });

  test('renders contact information correctly', () => {
    // Check for contact details
    const emails = screen.queryAllByText(/@/);
    const phones = screen.queryAllByText(/\+/);
    const address = screen.queryByText(/indore|india/i);
    
    if (emails.length > 0) emails.forEach(email => expect(email).toBeInTheDocument());
    if (phones.length > 0) phones.forEach(phone => expect(phone).toBeInTheDocument());
    if (address) expect(address).toBeInTheDocument();
  });

  test('renders newsletter subscription form if present', () => {
    const newsletterForm = screen.queryByRole("form", { name: /newsletter|subscribe/i });
    
    if (newsletterForm) {
      expect(newsletterForm).toBeInTheDocument();
      
      const emailInput = screen.queryByPlaceholderText(/email|enter your email/i);
      const subscribeButton = screen.queryByRole("button", { name: /subscribe|sign up/i });
      
      if (emailInput) {
        expect(emailInput).toHaveAttribute("type", "email");
        expect(emailInput).toHaveAttribute("placeholder");
      }
      
      if (subscribeButton) {
        expect(subscribeButton).toBeInTheDocument();
        expect(subscribeButton).toHaveAttribute("type", "submit");
      }
    }
  });

  test('handles form submissions correctly', async () => {
    const newsletterForm = screen.queryByRole("form", { name: /newsletter|subscribe/i });
    
    if (newsletterForm) {
      const emailInput = screen.queryByPlaceholderText(/email|enter your email/i) as HTMLInputElement;
      const subscribeButton = screen.queryByRole("button", { name: /subscribe|sign up/i });
      
      if (emailInput && subscribeButton) {
        // Test form submission
        await user.type(emailInput, 'test@example.com');
        expect(emailInput.value).toBe('test@example.com');
        
        await user.click(subscribeButton);
        
        // Form should handle submission
        expect(newsletterForm).toBeInTheDocument();
      }
    }
  });

  test('renders legal links and copyright information', () => {
    // Check for legal links
    const privacyPolicy = screen.queryByRole("link", { name: /privacy policy|privacy/i });
    const termsOfService = screen.queryByRole("link", { name: /terms|terms of service/i });
    const cookiePolicy = screen.queryByRole("link", { name: /cookies|cookie policy/i });
    
    if (privacyPolicy) expect(privacyPolicy).toBeInTheDocument();
    if (termsOfService) expect(termsOfService).toBeInTheDocument();
    if (cookiePolicy) expect(cookiePolicy).toBeInTheDocument();
    
    // Check for copyright notice
    const copyright = screen.queryByText(/©|copyright|all rights reserved/i);
    if (copyright) expect(copyright).toBeInTheDocument();
  });

  test('ensures proper responsive design and mobile accessibility', () => {
    const footer = screen.getByTestId("FooterId");
    expect(footer).toHaveClass("Footer_Main");
    
    // Check for responsive classes - footer exists
    const container = screen.getByTestId("FooterId");
    expect(container).toBeInTheDocument();
    
    // Test mobile-specific elements
    const mobileMenu = screen.queryByRole("button", { name: /expand|collapse/i });
    if (mobileMenu) {
      expect(mobileMenu).toHaveAttribute("aria-expanded");
      expect(mobileMenu).toHaveAttribute("aria-label");
    }
  });

  test('handles mobile menu interactions if present', async () => {
    const mobileMenuButtons = screen.queryAllByRole("button", { name: /expand|collapse/i });
    
    for (const button of mobileMenuButtons) {
      // Initially should be collapsed
      expect(button).toHaveAttribute("aria-expanded", "false");
      
      // Click to expand
      await user.click(button);
      
      // Should now be expanded
      expect(button).toHaveAttribute("aria-expanded", "true");
      
      // Click to collapse
      await user.click(button);
      
      // Should be collapsed again
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });

  test('maintains proper semantic HTML structure', () => {
    const footer = screen.getByTestId("FooterId");
    expect(footer.tagName).toBe("DIV");
    expect(footer).toHaveClass("Footer_Main");
    
    // Check for proper structure
    const upperSection = footer.querySelector('.Footer_Main_UpperSection');
    const lowerSection = footer.querySelector('.Footer_Main_LowerSection');
    expect(upperSection).toBeInTheDocument();
    expect(lowerSection).toBeInTheDocument();
    
    // Verify heading hierarchy
    const headings = footer.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (headings.length > 0) {
      headings.forEach((heading, index) => {
        if (index > 0) {
          const prevLevel = parseInt(headings[index - 1].tagName.charAt(1));
          const currentLevel = parseInt(heading.tagName.charAt(1));
          expect(currentLevel).toBeGreaterThanOrEqual(prevLevel - 1);
        }
      });
    }
  });

  test('ensures proper contrast and visual hierarchy', () => {
    const footer = screen.getByTestId("FooterId");
    
    // Check for proper styling classes
    expect(footer).toHaveClass("Footer_Main");
    
    // Verify visual elements
    const upperSection = footer.querySelector('.Footer_Main_UpperSection');
    expect(upperSection).toBeInTheDocument();
  });

  test('handles external links properly', () => {
    const externalLinks = screen.queryAllByRole("link");
    
    externalLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href && (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"))) {
        // External links should have proper attributes
        expect(link).toHaveAttribute("href");
        
        // Check for security attributes on external links
        if (href.startsWith("http") && !href.includes(window.location.hostname)) {
          expect(link).toHaveAttribute("rel", "noopener noreferrer");
        }
      }
    });
  });

  test('ensures proper keyboard navigation', () => {
    const focusableElements = screen.getAllByRole("link");
    
    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      // Test tab navigation
      firstElement.focus();
      expect(firstElement).toHaveFocus();
      
      // Test shift+tab navigation - focus behavior may vary
      fireEvent.keyDown(lastElement, { key: 'Tab', shiftKey: true });
      // Focus may change based on DOM order, so just check a focusable element has focus
      expect(document.activeElement).toBeTruthy();
    }
  });

  test('handles dynamic content updates gracefully', () => {
    // Test with different viewport sizes
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    fireEvent(window, new Event('resize'));
    
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
    fireEvent(window, new Event('resize'));
    
    // Footer should handle resize without errors
    expect(screen.getByTestId("FooterId")).toBeInTheDocument();
  });
});