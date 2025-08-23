import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OnboardingStageSelector } from '../../../components/onboarding/OnboardingStageSelector';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('OnboardingStageSelector Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  describe('Rendering', () => {
    test('renders main heading and description', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      expect(screen.getByText('Select your current onboarding stage')).toBeInTheDocument();
      expect(screen.getByText("We'll route you to the right place.")).toBeInTheDocument();
    });

    test('renders all four stage options as radio buttons', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      expect(screen.getByLabelText('Organization creation')).toBeInTheDocument();
      expect(screen.getByLabelText('Team creation')).toBeInTheDocument();
      expect(screen.getByLabelText('Hiring intent')).toBeInTheDocument();
      expect(screen.getByLabelText('Job creation')).toBeInTheDocument();
    });

    test('renders continue button', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    test('defaults to organization_creation stage', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      const orgRadio = screen.getByLabelText('Organization creation') as HTMLInputElement;
      expect(orgRadio.checked).toBe(true);
    });

    test('changes selected stage when radio buttons are clicked', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      const teamRadio = screen.getByLabelText('Team creation') as HTMLInputElement;
      fireEvent.click(teamRadio);
      
      expect(teamRadio.checked).toBe(true);
    });
  });

  describe('Navigation', () => {
    test('navigates to clientOnboarding when continue is clicked', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      const continueButton = screen.getByRole('button', { name: /continue/i });
      fireEvent.click(continueButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/clientOnboarding');
    });

    test('saves selected stage to localStorage', () => {
      localStorageMock.getItem.mockReturnValue('{"id": "123"}');
      
      renderWithRouter(<OnboardingStageSelector />);
      
      const teamRadio = screen.getByLabelText('Team creation');
      fireEvent.click(teamRadio);
      
      const continueButton = screen.getByRole('button', { name: /continue/i });
      fireEvent.click(continueButton);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'currentUser',
        JSON.stringify({ id: '123', onboarding_stage: 'team_creation' })
      );
    });
  });

  describe('Styling', () => {
    test('renders with proper background gradient', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      const container = screen.getByText('Select your current onboarding stage').closest('.w-full');
      expect(container).toHaveClass('bg-gradient-to-r');
      expect(container).toHaveClass('from-[#0f172a]');
      expect(container).toHaveClass('to-[#2d1e3a]');
    });

    test('renders with proper container classes', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      const mainContainer = screen.getByText('Select your current onboarding stage').closest('.max-w-3xl');
      expect(mainContainer).toHaveClass('max-w-3xl');
      expect(mainContainer).toHaveClass('mx-auto');
      expect(mainContainer).toHaveClass('p-6');
    });

    test('renders content card with proper styling', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      const contentCard = screen.getByText('Organization creation').closest('.bg-\\[\\#1a2234\\]');
      expect(contentCard).toHaveClass('bg-[#1a2234]');
      expect(contentCard).toHaveClass('rounded-lg');
      expect(contentCard).toHaveClass('border');
      expect(contentCard).toHaveClass('border-[#2a3344]');
      expect(contentCard).toHaveClass('p-6');
    });
  });

  describe('Accessibility', () => {
    test('has proper heading structure', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Select your current onboarding stage');
    });

    test('has properly labeled radio buttons', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      expect(screen.getByLabelText('Organization creation')).toBeInTheDocument();
      expect(screen.getByLabelText('Team creation')).toBeInTheDocument();
      expect(screen.getByLabelText('Hiring intent')).toBeInTheDocument();
      expect(screen.getByLabelText('Job creation')).toBeInTheDocument();
    });

    test('has accessible continue button', () => {
      renderWithRouter(<OnboardingStageSelector />);
      
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });
  });
});





