import { render, screen } from '@testing-library/react';
import { SuccessStep } from '../../../../components/onboarding/steps/SuccessStep';

describe('SuccessStep', () => {
  it('renders success message correctly', () => {
    render(<SuccessStep />);
    
    expect(screen.getByText('All Set!')).toBeInTheDocument();
  });

  it('displays the main description text', () => {
    render(<SuccessStep />);
    
    expect(screen.getByText('Thank you for completing your profile! We now have a comprehensive understanding of your organization and hiring needs.')).toBeInTheDocument();
  });

  it('shows the "what happens next" section', () => {
    render(<SuccessStep />);
    
    expect(screen.getByText('What happens next:')).toBeInTheDocument();
  });

  it('displays profile review information', () => {
    render(<SuccessStep />);
    
    expect(screen.getByText('Profile Review')).toBeInTheDocument();
    expect(screen.getByText('Our team will review your information and may reach out for clarification')).toBeInTheDocument();
  });

  it('displays talent matching information', () => {
    render(<SuccessStep />);
    
    expect(screen.getByText('Talent Matching')).toBeInTheDocument();
    expect(screen.getByText("We'll start matching you with qualified candidates based on your requirements")).toBeInTheDocument();
  });

  it('shows the dashboard update message', () => {
    render(<SuccessStep />);
    
    expect(screen.getByText('You can always update your profile information from your dashboard.')).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    render(<SuccessStep />);
    
    const container = screen.getByText('All Set!').closest('div');
    expect(container).toHaveClass('text-center', 'max-w-2xl', 'mx-auto');
  });

  it('has proper icon containers', () => {
    render(<SuccessStep />);
    
    // Check for the main check icon container
    const mainIconContainer = screen.getByText('All Set!').closest('div')?.querySelector('.w-16.h-16');
    expect(mainIconContainer).toBeInTheDocument();
    expect(mainIconContainer).toHaveClass('bg-[#22c55e]');
    
    // Check for the feature icon containers
    const featureIconContainers = screen.getAllByText(/Profile Review|Talent Matching/).map(el => 
      el.closest('div')?.querySelector('.w-8.h-8')
    );
    expect(featureIconContainers).toHaveLength(2);
  });

  it('renders all text content without missing elements', () => {
    render(<SuccessStep />);
    
    // Verify all expected text content is present
    const expectedTexts = [
      'All Set!',
      'Thank you for completing your profile! We now have a comprehensive understanding of your organization and hiring needs.',
      'What happens next:',
      'Profile Review',
      'Our team will review your information and may reach out for clarification',
      'Talent Matching',
      "We'll start matching you with qualified candidates based on your requirements",
      'You can always update your profile information from your dashboard.'
    ];
    
    expectedTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('has proper semantic structure', () => {
    render(<SuccessStep />);
    
    // Check for proper heading hierarchy
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('All Set!');
    
    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3).toHaveTextContent('What happens next:');
    
    const h4s = screen.getAllByRole('heading', { level: 4 });
    expect(h4s).toHaveLength(2);
    expect(h4s[0]).toHaveTextContent('Profile Review');
    expect(h4s[1]).toHaveTextContent('Talent Matching');
  });

  it('has correct styling for success state', () => {
    render(<SuccessStep />);
    
    // Check that the main icon has the success green background
    const mainIconContainer = screen.getByText('All Set!').closest('div')?.querySelector('.w-16.h-16');
    expect(mainIconContainer).toHaveClass('bg-[#22c55e]');
    
    // Check that the check icon is white
    const checkIcon = mainIconContainer?.querySelector('svg');
    expect(checkIcon).toHaveClass('text-white');
  });
});

