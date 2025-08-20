import { render, screen } from '@testing-library/react';
import About from '../../../views/AboutSection/About';

describe('About', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<About />);
    
    const aboutSection = document.querySelector('section');
    expect(aboutSection).toBeInTheDocument();
  });

  it('should render the main headline', () => {
    render(<About />);
    
    const headline = screen.getByText(/About Coderfarm: Culture-First Tech Hiring That Truly Works/);
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold', 'text-gray-900');
  });

  it('should render the main description', () => {
    render(<About />);
    
    const description = screen.getByText(/We are the first culture-driven hiring platform/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-lg', 'md:text-xl', 'text-gray-700');
  });

  it('should render the solution section heading', () => {
    render(<About />);
    
    const solutionHeading = screen.getByText(/Our Solution: The Coderfarm Difference/);
    expect(solutionHeading).toBeInTheDocument();
    expect(solutionHeading).toHaveClass('text-2xl', 'md:text-3xl', 'font-bold', 'text-gray-900');
  });

  it('should render the solution section description', () => {
    render(<About />);
    
    const solutionDesc = screen.getByText(/We go beyond resumes with a system built on clarity/);
    expect(solutionDesc).toBeInTheDocument();
    expect(solutionDesc).toHaveClass('text-lg', 'text-gray-700');
  });

  it('should render all solution cards', () => {
    render(<About />);
    
    // Check for all 7 solution cards by their titles
    const expectedTitles = [
      'Culture-First Matching',
      'Reputation Score',
      'Job Persona Builder',
      'Curated Top Matches',
      'Structured Hiring & Onboarding',
      'Flexible Engagement Models',
      'Transparent Process'
    ];

    expectedTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('should render all solution card descriptions', () => {
    render(<About />);
    
    const expectedDescriptions = [
      /We deeply map your company's DNA/,
      /A verified multi-factor profile of behavior/,
      /Define outcomes, technical must-haves/,
      /Receive your top 3–10 candidates/,
      /Scorecards, background checks, feedback loops/,
      /Contract, freelance, full-time/,
      /Live dashboards, clear fees/
    ];

    expectedDescriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('should render correct number of solution cards', () => {
    render(<About />);
    
    // Should render 7 solution cards
    const cardElements = document.querySelectorAll('.bg-blue-50.rounded-xl');
    expect(cardElements).toHaveLength(7);
  });

  it('should have correct CSS classes for solution cards', () => {
    render(<About />);
    
    const cardElements = document.querySelectorAll('.bg-blue-50.rounded-xl');
    cardElements.forEach(card => {
      expect(card).toHaveClass('bg-blue-50', 'rounded-xl', 'p-6', 'shadow-sm', 'hover:shadow-md', 'transition-shadow');
    });
  });

  it('should render icons in solution cards', () => {
    render(<About />);
    
    // Check for SVG icons (each card should have one)
    const svgIcons = document.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThanOrEqual(7);
  });

  it('should have correct structure for each solution card', () => {
    render(<About />);
    
    const cardElements = document.querySelectorAll('.bg-blue-50.rounded-xl');
    
    cardElements.forEach(card => {
      // Each card should have a flex container for icon and title
      const flexContainer = card.querySelector('.flex.items-center');
      expect(flexContainer).toBeInTheDocument();
      
      // Each card should have an icon container
      const iconContainer = flexContainer?.querySelector('.mr-3');
      expect(iconContainer).toBeInTheDocument();
      
      // Each card should have a title
      const title = flexContainer?.querySelector('.text-xl.font-semibold');
      expect(title).toBeInTheDocument();
      
      // Each card should have a description
      const description = card.querySelector('.text-gray-700');
      expect(description).toBeInTheDocument();
    });
  });

  it('should have correct grid layout classes', () => {
    render(<About />);
    
    const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('gap-6');
  });

  it('should have correct container and layout classes', () => {
    render(<About />);
    
    // Main container
    const mainDiv = document.querySelector('.min-h-screen.bg-white');
    expect(mainDiv).toBeInTheDocument();
    
    // Section with correct padding
    const section = document.querySelector('.py-16.md\\:py-24');
    expect(section).toBeInTheDocument();
    
    // Container with proper classes
    const container = document.querySelector('.container.mx-auto.px-4');
    expect(container).toBeInTheDocument();
  });

  it('should have correct text center classes for headlines', () => {
    render(<About />);
    
    const textCenterDivs = document.querySelectorAll('.text-center');
    expect(textCenterDivs.length).toBeGreaterThanOrEqual(2);
  });

  it('should have correct margin bottom classes', () => {
    render(<About />);
    
    // Headline section margin
    const headlineSection = document.querySelector('.text-center.mb-16');
    expect(headlineSection).toBeInTheDocument();
    
    // Solution section margin
    const solutionSection = document.querySelector('.mb-20');
    expect(solutionSection).toBeInTheDocument();
  });

  it('should have correct max-width classes for content', () => {
    render(<About />);
    
    const maxWidthElements = document.querySelectorAll('.max-w-3xl.mx-auto');
    expect(maxWidthElements.length).toBeGreaterThanOrEqual(2);
  });

  it('should render with correct icon colors', () => {
    render(<About />);
    
    // Check for specific icon color classes
    const blueIcon = document.querySelector('.text-blue-700');
    const orangeIcon = document.querySelector('.text-orange-500');
    const darkBlueIcon = document.querySelector('.text-blue-900');
    const greenIcon = document.querySelector('.text-green-600');
    const purpleIcon = document.querySelector('.text-purple-600');
    const redIcon = document.querySelector('.text-red-600');
    const lightBlueIcon = document.querySelector('.text-blue-500');
    
    expect(blueIcon).toBeInTheDocument();
    expect(orangeIcon).toBeInTheDocument();
    expect(darkBlueIcon).toBeInTheDocument();
    expect(greenIcon).toBeInTheDocument();
    expect(purpleIcon).toBeInTheDocument();
    expect(redIcon).toBeInTheDocument();
    expect(lightBlueIcon).toBeInTheDocument();
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<About />);
    
    const firstStructure = document.body.innerHTML;
    
    rerender(<About />);
    
    const secondStructure = document.body.innerHTML;
    
    expect(firstStructure).toBe(secondStructure);
  });

  it('should have correct font weight classes', () => {
    render(<About />);
    
    // Check for various font weights
    const boldElements = document.querySelectorAll('.font-bold');
    const semiboldElements = document.querySelectorAll('.font-semibold');
    
    expect(boldElements.length).toBeGreaterThanOrEqual(2);
    expect(semiboldElements.length).toBeGreaterThanOrEqual(7); // One for each solution card title
  });

  it('should have correct responsive text size classes', () => {
    render(<About />);
    
    // Main headline responsive classes
    const mainHeadline = document.querySelector('.text-3xl.md\\:text-4xl');
    expect(mainHeadline).toBeInTheDocument();
    
    // Main description responsive classes
    const mainDescription = document.querySelector('.text-lg.md\\:text-xl');
    expect(mainDescription).toBeInTheDocument();
    
    // Solution heading responsive classes
    const solutionHeading = document.querySelector('.text-2xl.md\\:text-3xl');
    expect(solutionHeading).toBeInTheDocument();
  });

  it('should render solution data with correct index-based keys', () => {
    render(<About />);
    
    // The component should render without key warnings
    // This test ensures the key prop is correctly set using index
    const cardElements = document.querySelectorAll('.bg-blue-50.rounded-xl');
    expect(cardElements).toHaveLength(7);
    
    // All cards should be rendered (no missing cards due to key issues)
    const expectedTitles = [
      'Culture-First Matching',
      'Reputation Score', 
      'Job Persona Builder',
      'Curated Top Matches',
      'Structured Hiring & Onboarding',
      'Flexible Engagement Models',
      'Transparent Process'
    ];

    expectedTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
