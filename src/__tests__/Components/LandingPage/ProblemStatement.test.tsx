import { render, screen } from '@testing-library/react';
import ProblemStatement from '../../../components/LandingPage/ProblemStatement';

// Mock the image import
jest.mock('../../../assets/LandingPage/ProblemStatementImage.png', () => 'mocked-problem-statement-image.png');

describe('ProblemStatement', () => {
  it('should render the component correctly', () => {
    render(<ProblemStatement />);
    
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('should have the correct section class', () => {
    render(<ProblemStatement />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass('problem-statement-section');
  });

  it('should render the main heading', () => {
    render(<ProblemStatement />);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Wasted Hours. High Risk. Misfit Hires. ‼');
    expect(heading).toHaveClass('problem-heading');
  });

  it('should render the subheading', () => {
    render(<ProblemStatement />);
    
    const subheading = screen.getByText('Did you know 89% hiring fail due Culture Misfit.');
    expect(subheading).toBeInTheDocument();
    expect(subheading).toHaveClass('problem-subheading');
  });

  it('should render all problem description paragraphs', () => {
    render(<ProblemStatement />);
    
    const descriptions = screen.getAllByText(/You've seen it\.\.|Too many Platform\.\.\.|The wrong hire drains/);
    expect(descriptions).toHaveLength(3);
    
    descriptions.forEach(description => {
      expect(description).toHaveClass('problem-description');
    });
  });

  it('should render the problem image', () => {
    render(<ProblemStatement />);
    
    const image = screen.getByAltText('Problem Statement');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('problem-image');
    expect(image).toHaveAttribute('src', 'mocked-problem-statement-image.png');
  });

  it('should render all floating icon buttons', () => {
    render(<ProblemStatement />);
    
    // Check for specific icon classes
    const icon1 = document.querySelector('.floating-icon-button.icon-1');
    const icon2 = document.querySelector('.floating-icon-button.icon-2');
    const icon3 = document.querySelector('.floating-icon-button.icon-3');
    
    expect(icon1).toBeInTheDocument();
    expect(icon2).toBeInTheDocument();
    expect(icon3).toBeInTheDocument();
  });

  it('should render SVG icons with correct attributes', () => {
    render(<ProblemStatement />);
    
    const svgIcons = document.querySelectorAll('.icon-svg');
    expect(svgIcons).toHaveLength(3);
    
    svgIcons.forEach(svg => {
      expect(svg).toHaveAttribute('width', '42');
      expect(svg).toHaveAttribute('height', '42');
      expect(svg).toHaveAttribute('viewBox', '0 0 42 42');
      expect(svg).toHaveAttribute('fill', 'none');
    });
  });

  it('should have the correct container structure', () => {
    render(<ProblemStatement />);
    
    const container = document.querySelector('.problem-statement-container');
    expect(container).toBeInTheDocument();
    
    const problemContent = container?.querySelector('.problem-content');
    const problemImageSection = container?.querySelector('.problem-image-section');
    
    expect(problemContent).toBeInTheDocument();
    expect(problemImageSection).toBeInTheDocument();
  });

  it('should have the correct content structure', () => {
    render(<ProblemStatement />);
    
    const problemContent = document.querySelector('.problem-content');
    expect(problemContent).toBeInTheDocument();
    
    const headingSection = problemContent?.querySelector('.problem-heading-section');
    const descriptionSection = problemContent?.querySelector('.problem-description-section');
    
    expect(headingSection).toBeInTheDocument();
    expect(descriptionSection).toBeInTheDocument();
  });

  it('should have the correct image section structure', () => {
    render(<ProblemStatement />);
    
    const problemImageSection = document.querySelector('.problem-image-section');
    expect(problemImageSection).toBeInTheDocument();
    
    const imageContainer = problemImageSection?.querySelector('.problem-image-container');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    expect(() => render(<ProblemStatement />)).not.toThrow();
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<ProblemStatement />);
    
    const firstRender = document.querySelector('section');
    const firstStructure = firstRender?.innerHTML;
    
    rerender(<ProblemStatement />);
    
    const secondRender = document.querySelector('section');
    const secondStructure = secondRender?.innerHTML;
    
    expect(firstStructure).toBe(secondStructure);
  });

  it('should have all required CSS classes', () => {
    render(<ProblemStatement />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass('problem-statement-section');
    
    const container = section?.querySelector('.problem-statement-container');
    expect(container).toHaveClass('problem-statement-container');
    
    const problemContent = container?.querySelector('.problem-content');
    expect(problemContent).toHaveClass('problem-content');
    
    const problemImageSection = container?.querySelector('.problem-image-section');
    expect(problemImageSection).toHaveClass('problem-image-section');
  });
});
