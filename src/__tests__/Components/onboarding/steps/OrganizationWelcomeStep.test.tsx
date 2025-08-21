import { render, screen } from '@testing-library/react';
import { OrganizationWelcomeStep } from '../../../../components/onboarding/steps/OrganizationWelcomeStep';

describe('OrganizationWelcomeStep', () => {
  it('renders organization onboarding title correctly', () => {
    render(<OrganizationWelcomeStep />);
    
    expect(screen.getByText('Organization Onboarding')).toBeInTheDocument();
  });

  it('displays the main description text', () => {
    render(<OrganizationWelcomeStep />);
    
    expect(screen.getByText("Let's set up your organization profile to help us match you with the perfect talent. This information will help candidates understand your mission, values, and what makes your organization unique.")).toBeInTheDocument();
  });

  it('shows the "what we will cover" section', () => {
    render(<OrganizationWelcomeStep />);
    
    expect(screen.getByText("Here's what we'll cover:")).toBeInTheDocument();
  });

  it('displays basic information section', () => {
    render(<OrganizationWelcomeStep />);
    
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText("Your organization's name, industry, website, and size")).toBeInTheDocument();
  });

  it('displays financial snapshot section', () => {
    render(<OrganizationWelcomeStep />);
    
    expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
    expect(screen.getByText('Current funding status, revenue, and profitability')).toBeInTheDocument();
  });

  it('displays purpose and identity section', () => {
    render(<OrganizationWelcomeStep />);
    
    expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    expect(screen.getByText('Your "why" statement, origin story, and core beliefs')).toBeInTheDocument();
  });

  it('shows the time estimate', () => {
    render(<OrganizationWelcomeStep />);
    
    expect(screen.getByText('This should only take about 10 minutes, and you can always edit your information later.')).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    render(<OrganizationWelcomeStep />);
    
    const container = screen.getByText('Organization Onboarding').closest('div');
    expect(container).toHaveClass('text-center', 'max-w-2xl', 'mx-auto');
  });

  it('has proper icon containers', () => {
    render(<OrganizationWelcomeStep />);
    
    // Check for the main building icon container
    const mainIconContainer = screen.getByText('Organization Onboarding').closest('div')?.querySelector('.w-16.h-16');
    expect(mainIconContainer).toBeInTheDocument();
    
    // Check for the feature icon containers
    const featureIconContainers = screen.getAllByText(/Basic Information|Financial Snapshot|Purpose & Identity/).map(el => 
      el.closest('div')?.querySelector('.w-8.h-8')
    );
    expect(featureIconContainers).toHaveLength(3);
  });

  it('renders all text content without missing elements', () => {
    render(<OrganizationWelcomeStep />);
    
    // Verify all expected text content is present
    const expectedTexts = [
      'Organization Onboarding',
      "Let's set up your organization profile to help us match you with the perfect talent. This information will help candidates understand your mission, values, and what makes your organization unique.",
      "Here's what we'll cover:",
      'Basic Information',
      "Your organization's name, industry, website, and size",
      'Financial Snapshot',
      'Current funding status, revenue, and profitability',
      'Purpose & Identity',
      'Your "why" statement, origin story, and core beliefs',
      'This should only take about 10 minutes, and you can always edit your information later.'
    ];
    
    expectedTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('has proper semantic structure', () => {
    render(<OrganizationWelcomeStep />);
    
    // Check for proper heading hierarchy
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Organization Onboarding');
    
    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3).toHaveTextContent("Here's what we'll cover:");
    
    const h4s = screen.getAllByRole('heading', { level: 4 });
    expect(h4s).toHaveLength(3);
    expect(h4s[0]).toHaveTextContent('Basic Information');
    expect(h4s[1]).toHaveTextContent('Financial Snapshot');
    expect(h4s[2]).toHaveTextContent('Purpose & Identity');
  });

  it('has correct styling for organization theme', () => {
    render(<OrganizationWelcomeStep />);
    
    // Check that the main icon has the organization blue background
    const mainIconContainer = screen.getByText('Organization Onboarding').closest('div')?.querySelector('.w-16.h-16');
    expect(mainIconContainer).toHaveClass('bg-[#1e293b]');
    
    // Check that the building icon is blue
    const buildingIcon = mainIconContainer?.querySelector('svg');
    expect(buildingIcon).toHaveClass('text-[#3b82f6]');
  });

  it('displays three feature sections with icons', () => {
    render(<OrganizationWelcomeStep />);
    
    const featureSections = screen.getAllByText(/Basic Information|Financial Snapshot|Purpose & Identity/);
    expect(featureSections).toHaveLength(3);
    
    // Check that each section has an icon container by looking at the parent structure
    featureSections.forEach(section => {
      const sectionContainer = section.closest('div');
      const iconContainer = sectionContainer?.parentElement?.querySelector('.w-8.h-8');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  it('has correct icon styling for feature sections', () => {
    render(<OrganizationWelcomeStep />);
    
    // Check that the feature icon containers have the correct styling
    const featureIconContainers = screen.getAllByText(/Basic Information|Financial Snapshot|Purpose & Identity/).map(el => {
      const sectionContainer = el.closest('div');
      return sectionContainer?.parentElement?.querySelector('.w-8.h-8');
    });
    
    featureIconContainers.forEach(container => {
      expect(container).toHaveClass('w-8', 'h-8', 'bg-[#151c2c]', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mr-3', 'flex-shrink-0');
    });
  });
});
