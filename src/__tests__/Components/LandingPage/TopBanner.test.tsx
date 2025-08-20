import { render, screen } from '@testing-library/react';
import { TopBanner } from '../../../components/LandingPage/TopBanner';

describe('TopBanner', () => {
  it('should render the component correctly', () => {
    render(<TopBanner />);
    
    const banner = document.querySelector('.w-full.bg-orange-500');
    expect(banner).toBeInTheDocument();
  });

  it('should have the correct background color and text color', () => {
    render(<TopBanner />);
    
    const banner = document.querySelector('.w-full.bg-orange-500.text-white');
    expect(banner).toBeInTheDocument();
  });

  it('should have the correct padding and width classes', () => {
    render(<TopBanner />);
    
    const banner = document.querySelector('.w-full.bg-orange-500.text-white.py-2.px-4');
    expect(banner).toBeInTheDocument();
  });

  it('should render the container with correct classes', () => {
    render(<TopBanner />);
    
    const container = document.querySelector('.container.mx-auto.flex.flex-wrap.justify-center.items-center.text-sm');
    expect(container).toBeInTheDocument();
  });

  it('should render the consultation section', () => {
    render(<TopBanner />);
    
    const consultationText = screen.getByText('Book a free hiring consultation');
    expect(consultationText).toBeInTheDocument();
  });

  it('should render the phone section', () => {
    render(<TopBanner />);
    
    const phoneText = screen.getByText('Call/WhatsApp: +91 7415877680');
    expect(phoneText).toBeInTheDocument();
  });

  it('should render the email section', () => {
    render(<TopBanner />);
    
    const emailText = screen.getByText('Email: dheeraj@coderfarm.in');
    expect(emailText).toBeInTheDocument();
  });

  it('should render the separator', () => {
    render(<TopBanner />);
    
    const separator = screen.getByText('|');
    expect(separator).toBeInTheDocument();
  });

  it('should render all icon components', () => {
    render(<TopBanner />);
    
    // Check for SVG elements (Lucide icons render as SVG)
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('should have the correct consultation section structure', () => {
    render(<TopBanner />);
    
    const consultationSection = document.querySelector('.flex.items-center');
    expect(consultationSection).toBeInTheDocument();
    
    const consultationText = consultationSection?.querySelector('span');
    expect(consultationText).toHaveTextContent('Book a free hiring consultation');
  });

  it('should have the correct phone section structure', () => {
    render(<TopBanner />);
    
    const phoneSection = document.querySelector('.flex.items-center.mx-3');
    expect(phoneSection).toBeInTheDocument();
    
    const phoneText = phoneSection?.querySelector('span');
    expect(phoneText).toHaveTextContent('Call/WhatsApp: +91 7415877680');
  });

  it('should have the correct email section structure', () => {
    render(<TopBanner />);
    
    const emailSection = document.querySelectorAll('.flex.items-center.mx-3')[1];
    expect(emailSection).toBeInTheDocument();
    
    const emailText = emailSection?.querySelector('span');
    expect(emailText).toHaveTextContent('Email: dheeraj@coderfarm.in');
  });

  it('should have the correct separator structure', () => {
    render(<TopBanner />);
    
    // Find the separator section by looking for the one that contains only the | character
    const allFlexSections = document.querySelectorAll('.flex.items-center');
    const separatorSection = Array.from(allFlexSections).find(section => 
      section.textContent?.trim() === '|'
    );
    expect(separatorSection).toBeInTheDocument();
    
    const separator = separatorSection?.querySelector('span');
    expect(separator).toHaveTextContent('|');
  });

  it('should render without crashing', () => {
    expect(() => render(<TopBanner />)).not.toThrow();
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<TopBanner />);
    
    const firstRender = document.querySelector('.w-full.bg-orange-500');
    const firstStructure = firstRender?.innerHTML;
    
    rerender(<TopBanner />);
    
    const secondRender = document.querySelector('.w-full.bg-orange-500');
    const secondStructure = secondRender?.innerHTML;
    
    expect(firstStructure).toBe(secondStructure);
  });

  it('should have all required CSS classes', () => {
    render(<TopBanner />);
    
    const banner = document.querySelector('.w-full.bg-orange-500.text-white.py-2.px-4');
    expect(banner).toBeInTheDocument();
    
    const container = banner?.querySelector('.container.mx-auto.flex.flex-wrap.justify-center.items-center.text-sm');
    expect(container).toBeInTheDocument();
  });

  it('should have the correct flex layout classes', () => {
    render(<TopBanner />);
    
    const container = document.querySelector('.container.mx-auto.flex.flex-wrap.justify-center.items-center.text-sm');
    expect(container).toHaveClass('flex', 'flex-wrap', 'justify-center', 'items-center');
  });

  it('should have the correct text size class', () => {
    render(<TopBanner />);
    
    const container = document.querySelector('.container.mx-auto.flex.flex-wrap.justify-center.items-center.text-sm');
    expect(container).toHaveClass('text-sm');
  });

  it('should have the correct margin classes', () => {
    render(<TopBanner />);
    
    const container = document.querySelector('.container.mx-auto.flex.flex-wrap.justify-center.items-center.text-sm');
    expect(container).toHaveClass('mx-auto');
  });
});
