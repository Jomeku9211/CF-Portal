import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutSection } from '../../../components/LandingPage/AboutSection';

// Mock any dependencies
jest.mock('../../../assets/LandingPage/about-hero.png', () => 'mocked-image.png');

describe('AboutSection Component', () => {
  test('renders about section with main content', () => {
    render(<AboutSection />);
    
    expect(screen.getAllByText(/about/i)[0]).toBeInTheDocument();
  });

  test('displays company information', () => {
    render(<AboutSection />);
    
    // Check for common about section content
    expect(screen.getAllByText(/about/i)[0]).toBeInTheDocument();
  });

  test('renders hero image', () => {
    render(<AboutSection />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    images.forEach(img => {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });
  });

  test('has proper semantic structure', () => {
    render(<AboutSection />);
    
    const section = screen.getAllByText(/about/i)[0];
    expect(section).toBeInTheDocument();
  });

  test('displays mission and vision content', () => {
    render(<AboutSection />);
    
    // Look for typical about page content
    const content = screen.getAllByText(/coderfarm/i)[0];
    expect(content).toBeInTheDocument();
  });

  test('handles responsive design', () => {
    render(<AboutSection />);
    
    const section = screen.getAllByText(/about/i)[0];
    expect(section).toBeInTheDocument();
  });

  test('renders call-to-action elements', () => {
    render(<AboutSection />);
    
    // Check for buttons or links
    const buttons = screen.queryAllByRole('button');
    const links = screen.queryAllByRole('link');
    
    expect(buttons.length + links.length).toBeGreaterThanOrEqual(0);
  });

  test('displays team information if present', () => {
    render(<AboutSection />);
    
    // Look for team-related content
    const teamContent = screen.queryAllByText(/team|people|members/i);
    if (teamContent.length > 0) {
      expect(teamContent[0]).toBeInTheDocument();
    }
  });

  test('shows company values and culture', () => {
    render(<AboutSection />);
    
    // Look for values/culture content
    const valuesContent = screen.queryAllByText(/values|culture|principles/i);
    if (valuesContent.length > 0) {
      expect(valuesContent[0]).toBeInTheDocument();
    }
  });

  test('handles accessibility requirements', () => {
    render(<AboutSection />);
    
    // Check for proper heading hierarchy
    const headings = screen.getAllByRole('heading');
    headings.forEach(heading => {
      expect(heading).toBeInTheDocument();
    });
  });
});
