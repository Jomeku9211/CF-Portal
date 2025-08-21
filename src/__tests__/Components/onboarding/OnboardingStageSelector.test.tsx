import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingStageSelector } from '../../../components/onboarding/OnboardingStageSelector';

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('OnboardingStageSelector Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders the component title and description', () => {
      render(<OnboardingStageSelector />);
      
      expect(screen.getByText('Choose Your Onboarding Path')).toBeInTheDocument();
      expect(screen.getByText('Select the option that best describes your current situation.')).toBeInTheDocument();
    });

    test('renders both onboarding options', () => {
      render(<OnboardingStageSelector />);
      
      expect(screen.getByText('New Organization')).toBeInTheDocument();
      expect(screen.getByText('Existing Organization')).toBeInTheDocument();
    });

    test('renders option descriptions', () => {
      render(<OnboardingStageSelector />);
      
      expect(screen.getByText('I\'m starting a new company or team and need to set up everything from scratch.')).toBeInTheDocument();
      expect(screen.getByText('I already have an established organization and want to join or update our profile.')).toBeInTheDocument();
    });

    test('renders option button labels', () => {
      render(<OnboardingStageSelector />);
      
      expect(screen.getByText('Start New Setup')).toBeInTheDocument();
      expect(screen.getByText('Join Existing')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    test('navigates to organization onboarding when new organization is selected', () => {
      render(<OnboardingStageSelector />);
      
      const newOrgButton = screen.getByText('Start New Setup');
      fireEvent.click(newOrgButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/onboarding');
    });

    test('navigates to organization profile when existing organization is selected', () => {
      render(<OnboardingStageSelector />);
      
      const existingOrgButton = screen.getByText('Join Existing');
      fireEvent.click(existingOrgButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/organization-profile');
    });
  });

  describe('UI Elements', () => {
    test('renders back to home button', () => {
      render(<OnboardingStageSelector />);
      
      const backButton = screen.getByText('← Back to Home');
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveClass('text-gray-400');
      expect(backButton).toHaveClass('hover:text-blue-400');
    });

    test('back button navigates to home', () => {
      render(<OnboardingStageSelector />);
      
      const backButton = screen.getByText('← Back to Home');
      fireEvent.click(backButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('renders option cards with correct styling', () => {
      render(<OnboardingStageSelector />);
      
      const optionCards = screen.getAllByText(/New Organization|Existing Organization/);
      optionCards.forEach(card => {
        const cardElement = card.closest('div');
        expect(cardElement).toHaveClass('bg-[#171c33]');
        expect(cardElement).toHaveClass('border-gray-700');
        expect(cardElement).toHaveClass('hover:border-gray-500');
      });
    });

    test('renders option icons', () => {
      render(<OnboardingStageSelector />);
      
      const iconContainers = document.querySelectorAll('.w-12.h-12');
      expect(iconContainers).toHaveLength(2);
      
      iconContainers.forEach(container => {
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Layout and Styling', () => {
    test('renders with correct background and container styling', () => {
      render(<OnboardingStageSelector />);
      
      const container = screen.getByText('Choose Your Onboarding Path').closest('div');
      expect(container).toHaveClass('bg-gradient-to-r');
      expect(container).toHaveClass('from-[#0f172a]');
      expect(container).toHaveClass('to-[#2d334a]');
    });

    test('renders with responsive grid layout', () => {
      render(<OnboardingStageSelector />);
      
      const gridContainer = screen.getByText('New Organization').closest('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1');
      expect(gridContainer).toHaveClass('md:grid-cols-2');
      expect(gridContainer).toHaveClass('gap-6');
    });

    test('renders with proper spacing and margins', () => {
      render(<OnboardingStageSelector />);
      
      const title = screen.getByText('Choose Your Onboarding Path');
      const titleContainer = title.closest('div');
      expect(titleContainer).toHaveClass('mb-3');
      
      const description = screen.getByText('Select the option that best describes your current situation.');
      const descriptionContainer = description.closest('div');
      expect(descriptionContainer).toHaveClass('mb-8');
    });
  });

  describe('Accessibility', () => {
    test('has proper heading structure', () => {
      render(<OnboardingStageSelector />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Choose Your Onboarding Path');
    });

    test('has clickable buttons for navigation', () => {
      render(<OnboardingStageSelector />);
      
      const newOrgButton = screen.getByRole('button', { name: /start new setup/i });
      const existingOrgButton = screen.getByRole('button', { name: /join existing/i });
      
      expect(newOrgButton).toBeInTheDocument();
      expect(existingOrgButton).toBeInTheDocument();
    });

    test('has proper button text for screen readers', () => {
      render(<OnboardingStageSelector />);
      
      expect(screen.getByRole('button', { name: /start new setup/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /join existing/i })).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    test('renders single column on mobile', () => {
      render(<OnboardingStageSelector />);
      
      const gridContainer = screen.getByText('New Organization').closest('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1');
    });

    test('renders two columns on medium screens and up', () => {
      render(<OnboardingStageSelector />);
      
      const gridContainer = screen.getByText('New Organization').closest('.grid');
      expect(gridContainer).toHaveClass('md:grid-cols-2');
    });
  });

  describe('Component Structure', () => {
    test('renders main container with proper classes', () => {
      render(<OnboardingStageSelector />);
      
      const mainContainer = screen.getByText('Choose Your Onboarding Path').closest('.max-w-4xl');
      expect(mainContainer).toHaveClass('max-w-4xl');
      expect(mainContainer).toHaveClass('mx-auto');
      expect(mainContainer).toHaveClass('p-4');
      expect(mainContainer).toHaveClass('md:p-8');
    });

    test('renders content card with proper styling', () => {
      render(<OnboardingStageSelector />);
      
      const contentCard = screen.getByText('Choose Your Onboarding Path').closest('.bg-[#1a2234]');
      expect(contentCard).toHaveClass('bg-[#1a2234]');
      expect(contentCard).toHaveClass('rounded-xl');
      expect(contentCard).toHaveClass('shadow-md');
      expect(contentCard).toHaveClass('p-6');
      expect(contentCard).toHaveClass('md:p-8');
    });
  });
});

