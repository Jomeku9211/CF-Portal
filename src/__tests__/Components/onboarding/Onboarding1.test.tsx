import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Onboarding1 } from '../../../components/onboarding/Onboarding1';

// Mock the child components
jest.mock('../../../components/onboarding/OrganizationProfile', () => ({
  OrganizationProfile: ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => (
    <div data-testid="organization-profile">
      <h2>Organization Profile</h2>
      <button onClick={onSubmitSuccess}>Complete Organization</button>
    </div>
  ),
}));

jest.mock('../../../components/onboarding/TeamOnboarding', () => ({
  TeamOnboarding: ({ onComplete }: { onComplete: () => void }) => (
    <div data-testid="team-onboarding">
      <h2>Team Onboarding</h2>
      <button onClick={onComplete}>Complete Team</button>
    </div>
  ),
}));

jest.mock('../../../components/onboarding/HiringIntent', () => ({
  HiringIntent: ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
    <div data-testid="hiring-intent">
      <h2>Hiring Intent</h2>
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('../../../components/onboarding/JobPersonaCreation', () => ({
  JobPersonaCreation: ({ onBack }: { onBack: () => void }) => (
    <div data-testid="job-persona-creation">
      <h2>Job Persona Creation</h2>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

jest.mock('../../../components/common/MainProgressBar', () => ({
  MainProgressBar: ({ steps, onStepClick }: any) => (
    <div data-testid="main-progress-bar">
      {steps.map((step: any) => (
        <button
          key={step.id}
          data-testid={`step-${step.id}`}
          onClick={() => onStepClick(step.id)}
          className={step.active ? 'active' : step.completed ? 'completed' : ''}
        >
          {step.name}
        </button>
      ))}
    </div>
  ),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    {children}
  </MemoryRouter>
);

describe('Onboarding1 Component', () => {
  beforeEach(() => {
    render(
      <TestWrapper>
        <Onboarding1 />
      </TestWrapper>
    );
  });

  describe('Initial Render', () => {
    it('renders the main onboarding container', () => {
      expect(screen.getByTestId('organization-profile')).toBeInTheDocument();
    });

    it('displays the breadcrumb navigation', () => {
      expect(screen.getByText('Select Role')).toBeInTheDocument();
      expect(screen.getByText('/')).toBeInTheDocument();
      expect(screen.getByText('Onboarding')).toBeInTheDocument();
    });

    it('renders the main progress bar', () => {
      expect(screen.getByTestId('main-progress-bar')).toBeInTheDocument();
    });

    it('shows all four main steps in the progress bar', () => {
      expect(screen.getByTestId('step-1')).toBeInTheDocument();
      expect(screen.getByTestId('step-2')).toBeInTheDocument();
      expect(screen.getByTestId('step-3')).toBeInTheDocument();
      expect(screen.getByTestId('step-4')).toBeInTheDocument();
    });

    it('displays correct step names', () => {
      expect(screen.getByText('Onboarding Organization')).toBeInTheDocument();
      expect(screen.getByText('Onboarding Team')).toBeInTheDocument();
      expect(screen.getByText('Hiring Intent')).toBeInTheDocument();
      expect(screen.getByText('Job Persona Creation')).toBeInTheDocument();
    });
  });

  describe('Step Navigation', () => {
    it('starts with step 1 (Organization Profile)', () => {
      expect(screen.getByTestId('organization-profile')).toBeInTheDocument();
      expect(screen.queryByTestId('team-onboarding')).not.toBeInTheDocument();
      expect(screen.queryByTestId('hiring-intent')).not.toBeInTheDocument();
      expect(screen.queryByTestId('job-persona-creation')).not.toBeInTheDocument();
    });

    it('advances to step 2 when organization profile is completed', async () => {
      const user = userEvent.setup();
      const completeButton = screen.getByText('Complete Organization');
      
      await user.click(completeButton);
      
      expect(screen.queryByTestId('organization-profile')).not.toBeInTheDocument();
      expect(screen.getByTestId('team-onboarding')).toBeInTheDocument();
    });

    it('advances to step 3 when team onboarding is completed', async () => {
      const user = userEvent.setup();
      
      // First complete organization profile
      const completeOrgButton = screen.getByText('Complete Organization');
      await user.click(completeOrgButton);
      
      // Then complete team onboarding
      const completeTeamButton = screen.getByText('Complete Team');
      await user.click(completeTeamButton);
      
      expect(screen.queryByTestId('team-onboarding')).not.toBeInTheDocument();
      expect(screen.getByTestId('hiring-intent')).toBeInTheDocument();
    });

    it('advances to step 4 when hiring intent is completed', async () => {
      const user = userEvent.setup();
      
      // Complete steps 1 and 2
      await user.click(screen.getByText('Complete Organization'));
      await user.click(screen.getByText('Complete Team'));
      
      // Complete hiring intent
      const nextButton = screen.getByText('Next');
      await user.click(nextButton);
      
      expect(screen.queryByTestId('hiring-intent')).not.toBeInTheDocument();
      expect(screen.getByTestId('job-persona-creation')).toBeInTheDocument();
    });
  });

  describe('Back Navigation', () => {
    it('allows going back from hiring intent to team onboarding', async () => {
      const user = userEvent.setup();
      
      // Navigate to hiring intent
      await user.click(screen.getByText('Complete Organization'));
      await user.click(screen.getByText('Complete Team'));
      
      // Go back from hiring intent
      const backButton = screen.getByText('Back');
      await user.click(backButton);
      
      expect(screen.getByTestId('team-onboarding')).toBeInTheDocument();
      expect(screen.queryByTestId('hiring-intent')).not.toBeInTheDocument();
    });

    it('allows going back from job persona creation to hiring intent', async () => {
      const user = userEvent.setup();
      
      // Navigate to job persona creation
      await user.click(screen.getByText('Complete Organization'));
      await user.click(screen.getByText('Complete Team'));
      await user.click(screen.getByText('Next'));
      
      // Go back from job persona creation
      const backButton = screen.getByText('Back');
      await user.click(backButton);
      
      expect(screen.getByTestId('hiring-intent')).toBeInTheDocument();
      expect(screen.queryByTestId('job-persona-creation')).not.toBeInTheDocument();
    });
  });

  describe('Progress Bar Interaction', () => {
    it('allows clicking on completed steps to navigate back', async () => {
      const user = userEvent.setup();
      
      // Complete step 1
      await user.click(screen.getByText('Complete Organization'));
      
      // Click on step 1 in progress bar to go back
      const step1Button = screen.getByTestId('step-1');
      await user.click(step1Button);
      
      expect(screen.getByTestId('organization-profile')).toBeInTheDocument();
      expect(screen.queryByTestId('team-onboarding')).not.toBeInTheDocument();
    });

    it('prevents clicking on future steps', async () => {
      const user = userEvent.setup();
      
      // Try to click on step 3 (future step)
      const step3Button = screen.getByTestId('step-3');
      await user.click(step3Button);
      
      // Should still be on step 1
      expect(screen.getByTestId('organization-profile')).toBeInTheDocument();
    });
  });

  describe('Component State Management', () => {
    it('maintains current step state correctly', async () => {
      const user = userEvent.setup();
      
      // Verify initial state
      expect(screen.getByTestId('organization-profile')).toBeInTheDocument();
      
      // Complete step 1
      await user.click(screen.getByText('Complete Organization'));
      expect(screen.getByTestId('team-onboarding')).toBeInTheDocument();
      
      // Complete step 2
      await user.click(screen.getByText('Complete Team'));
      expect(screen.getByTestId('hiring-intent')).toBeInTheDocument();
      
      // Complete step 3
      await user.click(screen.getByText('Next'));
      expect(screen.getByTestId('job-persona-creation')).toBeInTheDocument();
    });

    it('handles multiple rapid step completions correctly', async () => {
      const user = userEvent.setup();
      
      // Rapidly complete multiple steps
      await user.click(screen.getByText('Complete Organization'));
      await user.click(screen.getByText('Complete Team'));
      await user.click(screen.getByText('Next'));
      
      // Should end up on the final step
      expect(screen.getByTestId('job-persona-creation')).toBeInTheDocument();
    });
  });

  describe('UI Structure and Styling', () => {
    it('applies correct CSS classes for layout', () => {
      const container = screen.getByTestId('organization-profile').closest('.w-full.min-h-screen');
      expect(container).toBeInTheDocument();
    });

    it('renders with proper background gradient', () => {
      const mainContainer = screen.getByTestId('organization-profile').closest('.bg-gradient-to-r');
      expect(mainContainer).toBeInTheDocument();
    });

    it('displays content in a centered card layout', () => {
      const cardContainer = screen.getByTestId('organization-profile').closest('.bg-\\[\\#1a2234\\]');
      expect(cardContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      
      headings.forEach(heading => {
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBeTruthy();
      });
    });

    it('has clickable navigation elements', () => {
      const clickableElements = screen.getAllByRole('button');
      expect(clickableElements.length).toBeGreaterThan(0);
      
      clickableElements.forEach(button => {
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
      });
    });

    it('provides clear visual feedback for current step', () => {
      const step1Button = screen.getByTestId('step-1');
      expect(step1Button).toHaveClass('active');
    });
  });

  describe('Error Handling', () => {
    it('gracefully handles component rendering without crashing', () => {
      expect(screen.getByTestId('organization-profile')).toBeInTheDocument();
    });

    it('maintains state consistency during navigation', async () => {
      const user = userEvent.setup();
      
      // Navigate forward and back multiple times
      await user.click(screen.getByText('Complete Organization'));
      await user.click(screen.getByText('Complete Team'));
      
      // Go back to step 1
      const step1Button = screen.getByTestId('step-1');
      await user.click(step1Button);
      
      // Should be back on step 1
      expect(screen.getByTestId('organization-profile')).toBeInTheDocument();
    });
  });
});
