import { render, screen } from '@testing-library/react';
import { WelcomeStep } from '../../../../components/onboarding/steps/WelcomeStep';

describe('WelcomeStep', () => {
  it('renders welcome message correctly', () => {
    render(<WelcomeStep />);
    
    expect(screen.getByText('Welcome to Coderfarm')).toBeInTheDocument();
  });

  it('displays the main description text', () => {
    render(<WelcomeStep />);
    
    expect(screen.getByText("Let's get to know you and your organization better. This will help us match you with the perfect talent and create meaningful connections.")).toBeInTheDocument();
  });

  it('shows the "what we will cover" section', () => {
    render(<WelcomeStep />);
    
    expect(screen.getByText("Here's what we'll cover:")).toBeInTheDocument();
  });

  it('displays organization profile information', () => {
    render(<WelcomeStep />);
    
    expect(screen.getByText('Organization Profile')).toBeInTheDocument();
    expect(screen.getByText('Tell us about your company, culture, and values')).toBeInTheDocument();
  });

  it('displays job persona information', () => {
    render(<WelcomeStep />);
    
    expect(screen.getByText('Job Persona')).toBeInTheDocument();
    expect(screen.getByText('Define the ideal candidate for your role')).toBeInTheDocument();
  });

  it('shows the time estimate', () => {
    render(<WelcomeStep />);
    
    expect(screen.getByText('This should only take about 5-10 minutes, and you can always edit your information later.')).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    render(<WelcomeStep />);
    
    const container = screen.getByText('Welcome to Coderfarm').closest('div');
    expect(container).toHaveClass('text-center', 'max-w-2xl', 'mx-auto');
  });

  it('has proper icon containers', () => {
    render(<WelcomeStep />);
    
    // Check for the main user icon container
    const mainIconContainer = screen.getByText('Welcome to Coderfarm').closest('div')?.querySelector('.w-16.h-16');
    expect(mainIconContainer).toBeInTheDocument();
    
    // Check for the feature icon containers
    const featureIconContainers = screen.getAllByText(/Organization Profile|Job Persona/).map(el => 
      el.closest('div')?.querySelector('.w-8.h-8')
    );
    expect(featureIconContainers).toHaveLength(2);
  });

  it('renders all text content without missing elements', () => {
    render(<WelcomeStep />);
    
    // Verify all expected text content is present
    const expectedTexts = [
      'Welcome to Coderfarm',
      "Let's get to know you and your organization better. This will help us match you with the perfect talent and create meaningful connections.",
      "Here's what we'll cover:",
      'Organization Profile',
      'Tell us about your company, culture, and values',
      'Job Persona',
      'Define the ideal candidate for your role',
      'This should only take about 5-10 minutes, and you can always edit your information later.'
    ];
    
    expectedTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('has proper semantic structure', () => {
    render(<WelcomeStep />);
    
    // Check for proper heading hierarchy
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Welcome to Coderfarm');
    
    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3).toHaveTextContent("Here's what we'll cover:");
    
    const h4s = screen.getAllByRole('heading', { level: 4 });
    expect(h4s).toHaveLength(2);
    expect(h4s[0]).toHaveTextContent('Organization Profile');
    expect(h4s[1]).toHaveTextContent('Job Persona');
  });
});












