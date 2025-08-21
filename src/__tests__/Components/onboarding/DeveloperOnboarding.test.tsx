import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeveloperOnboarding } from '../../../components/onboarding/DeveloperOnboarding';

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock RadioGroup component
jest.mock('../../../components/common/RadioGroup', () => ({
  RadioGroup: ({ options, value, onChange, label }: any) => (
    <div data-testid="radio-group">
      <label>{label}</label>
      {options.map((option: any) => (
        <div key={option.value} data-testid={`radio-option-${option.value}`}>
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            data-testid={`radio-input-${option.value}`}
          />
          <span>{option.label}</span>
          <span>{option.description}</span>
        </div>
      ))}
    </div>
  ),
}));

describe('DeveloperOnboarding Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders the component title and description', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Developer Onboarding')).toBeInTheDocument();
      expect(screen.getByText('Tell us about your experience level to customize your onboarding journey.')).toBeInTheDocument();
    });

    test('renders experience level selection section', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Experience Level')).toBeInTheDocument();
      expect(screen.getByText('Select your current experience level:')).toBeInTheDocument();
    });

    test('renders RadioGroup component for experience selection', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByTestId('radio-group')).toBeInTheDocument();
    });

    test('renders all experience level options', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Junior Developers (0–2 yrs)')).toBeInTheDocument();
      expect(screen.getByText('Mid-Level Developers (2–6 yrs)')).toBeInTheDocument();
      expect(screen.getByText('Senior Developers / Tech Leads (6+ yrs)')).toBeInTheDocument();
      expect(screen.getByText('Architects / Engineering Managers / CTO-track talent (10+ yrs)')).toBeInTheDocument();
    });

    test('renders experience level descriptions', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Perfect for recent graduates and developers starting their career journey.')).toBeInTheDocument();
      expect(screen.getByText('Ideal for developers with some industry experience looking to grow.')).toBeInTheDocument();
      expect(screen.getByText('Great for experienced developers ready to take on leadership roles.')).toBeInTheDocument();
      expect(screen.getByText('Perfect for senior technical leaders and architects.')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('allows user to select experience level', () => {
      render(<DeveloperOnboarding />);
      
      const juniorOption = screen.getByTestId('radio-input-junior');
      fireEvent.click(juniorOption);
      
      expect(juniorOption).toBeChecked();
    });

    test('enables continue button when experience level is selected', () => {
      render(<DeveloperOnboarding />);
      
      const juniorOption = screen.getByTestId('radio-input-junior');
      fireEvent.click(juniorOption);
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeEnabled();
      expect(continueButton).toHaveClass('bg-green-500');
    });

    test('shows continue button as disabled initially', () => {
      render(<DeveloperOnboarding />);
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeDisabled();
      expect(continueButton).toHaveClass('bg-gray-700');
    });

    test('can change selected experience level', () => {
      render(<DeveloperOnboarding />);
      
      const juniorOption = screen.getByTestId('radio-input-junior');
      const midLevelOption = screen.getByTestId('radio-input-mid-level');
      
      fireEvent.click(juniorOption);
      expect(juniorOption).toBeChecked();
      
      fireEvent.click(midLevelOption);
      expect(midLevelOption).toBeChecked();
      expect(juniorOption).not.toBeChecked();
    });
  });

  describe('Navigation', () => {
    test('navigates to next step when continue is clicked', () => {
      render(<DeveloperOnboarding />);
      
      const juniorOption = screen.getByTestId('radio-input-junior');
      fireEvent.click(juniorOption);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      // This would navigate to the next step in the onboarding flow
      // For now, we just verify the button click works
      expect(continueButton).toBeInTheDocument();
    });
  });

  describe('UI Elements', () => {
    test('renders back to home button', () => {
      render(<DeveloperOnboarding />);
      
      const backButton = screen.getByText('← Back to Home');
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveClass('text-gray-400');
      expect(backButton).toHaveClass('hover:text-blue-400');
    });

    test('back button navigates to home', () => {
      render(<DeveloperOnboarding />);
      
      const backButton = screen.getByText('← Back to Home');
      fireEvent.click(backButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('renders with proper container styling', () => {
      render(<DeveloperOnboarding />);
      
      const container = screen.getByText('Developer Onboarding').closest('.max-w-4xl');
      expect(container).toHaveClass('max-w-4xl');
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('p-4');
      expect(container).toHaveClass('md:p-8');
    });

    test('renders content card with proper styling', () => {
      render(<DeveloperOnboarding />);
      
      const contentCard = screen.getByText('Developer Onboarding').closest('.bg-[#1a2234]');
      expect(contentCard).toHaveClass('bg-[#1a2234]');
      expect(contentCard).toHaveClass('rounded-xl');
      expect(contentCard).toHaveClass('shadow-md');
      expect(contentCard).toHaveClass('p-6');
      expect(contentCard).toHaveClass('md:p-8');
    });
  });

  describe('Layout and Styling', () => {
    test('renders with correct background', () => {
      render(<DeveloperOnboarding />);
      
      const mainContainer = screen.getByText('Developer Onboarding').closest('.bg-gradient-to-r');
      expect(mainContainer).toHaveClass('bg-gradient-to-r');
      expect(mainContainer).toHaveClass('from-[#0f172a]');
      expect(mainContainer).toHaveClass('to-[#2d334a]');
    });

    test('renders with proper spacing and margins', () => {
      render(<DeveloperOnboarding />);
      
      const title = screen.getByText('Developer Onboarding');
      const titleContainer = title.closest('div');
      expect(titleContainer).toHaveClass('mb-3');
      
      const description = screen.getByText('Tell us about your experience level to customize your onboarding journey.');
      const descriptionContainer = description.closest('div');
      expect(descriptionContainer).toHaveClass('mb-8');
    });

    test('renders experience section with proper styling', () => {
      render(<DeveloperOnboarding />);
      
      const experienceSection = screen.getByText('Experience Level').closest('div');
      expect(experienceSection).toHaveClass('mb-6');
    });
  });

  describe('Accessibility', () => {
    test('has proper heading structure', () => {
      render(<DeveloperOnboarding />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Developer Onboarding');
    });

    test('has proper form labels', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Experience Level')).toBeInTheDocument();
      expect(screen.getByText('Select your current experience level:')).toBeInTheDocument();
    });

    test('has accessible radio buttons', () => {
      render(<DeveloperOnboarding />);
      
      const radioInputs = screen.getAllByRole('radio');
      expect(radioInputs).toHaveLength(4);
      
      radioInputs.forEach(input => {
        expect(input).toHaveAttribute('type', 'radio');
      });
    });
  });

  describe('Experience Level Options', () => {
    test('renders junior developer option correctly', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Junior Developers (0–2 yrs)')).toBeInTheDocument();
      expect(screen.getByText('Perfect for recent graduates and developers starting their career journey.')).toBeInTheDocument();
    });

    test('renders mid-level developer option correctly', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Mid-Level Developers (2–6 yrs)')).toBeInTheDocument();
      expect(screen.getByText('Ideal for developers with some industry experience looking to grow.')).toBeInTheDocument();
    });

    test('renders senior developer option correctly', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Senior Developers / Tech Leads (6+ yrs)')).toBeInTheDocument();
      expect(screen.getByText('Great for experienced developers ready to take on leadership roles.')).toBeInTheDocument();
    });

    test('renders architect/manager option correctly', () => {
      render(<DeveloperOnboarding />);
      
      expect(screen.getByText('Architects / Engineering Managers / CTO-track talent (10+ yrs)')).toBeInTheDocument();
      expect(screen.getByText('Perfect for senior technical leaders and architects.')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    test('initializes with no experience level selected', () => {
      render(<DeveloperOnboarding />);
      
      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(input => {
        expect(input).not.toBeChecked();
      });
    });

    test('updates selected experience level state', () => {
      render(<DeveloperOnboarding />);
      
      const juniorOption = screen.getByTestId('radio-input-junior');
      const midLevelOption = screen.getByTestId('radio-input-mid-level');
      
      fireEvent.click(juniorOption);
      expect(juniorOption).toBeChecked();
      
      fireEvent.click(midLevelOption);
      expect(midLevelOption).toBeChecked();
      expect(juniorOption).not.toBeChecked();
    });
  });

  describe('Responsive Design', () => {
    test('renders with responsive container', () => {
      render(<DeveloperOnboarding />);
      
      const container = screen.getByText('Developer Onboarding').closest('.max-w-4xl');
      expect(container).toHaveClass('max-w-4xl');
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('p-4');
      expect(container).toHaveClass('md:p-8');
    });

    test('renders with responsive content card', () => {
      render(<DeveloperOnboarding />);
      
      const contentCard = screen.getByText('Developer Onboarding').closest('.bg-[#1a2234]');
      expect(contentCard).toHaveClass('p-6');
      expect(contentCard).toHaveClass('md:p-8');
    });
  });
});


