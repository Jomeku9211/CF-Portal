import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProgressBar } from '../../../components/common/ProgressBar';

const mockComponent = () => <div>Mock Component</div>;

describe('ProgressBar', () => {
  const defaultSteps = [
    { id: 'step1', title: 'Step 1', component: mockComponent },
    { id: 'step2', title: 'Step 2', component: mockComponent },
    { id: 'step3', title: 'Step 3', component: mockComponent },
    { id: 'step4', title: 'Step 4', component: mockComponent },
  ];

  const defaultProps = {
    steps: defaultSteps,
    currentStep: 1,
    onStepClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<ProgressBar {...defaultProps} />);
    
    const container = document.querySelector('.w-full');
    expect(container).toBeInTheDocument();
    
    const progressContainer = container?.querySelector('.flex.items-center.justify-between');
    expect(progressContainer).toBeInTheDocument();
  });

  it('should render all steps', () => {
    render(<ProgressBar {...defaultProps} />);
    
    defaultSteps.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it('should render step numbers for non-completed steps', () => {
    render(<ProgressBar {...defaultProps} currentStep={2} />);
    
    // Step 3 and 4 should show numbers
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('should render checkmark for completed steps', () => {
    render(<ProgressBar {...defaultProps} currentStep={2} />);
    
    // Step 1 (index 0) should be completed and show checkmark
    const completedSteps = document.querySelectorAll('.bg-\\[\\#22c55e\\]');
    expect(completedSteps.length).toBeGreaterThan(0);
    
    // Check for SVG checkmark
    const checkmarkSvg = document.querySelector('svg path[fill-rule="evenodd"]');
    expect(checkmarkSvg).toBeInTheDocument();
  });

  it('should highlight current step correctly', () => {
    render(<ProgressBar {...defaultProps} currentStep={1} />);
    
    // Current step should have blue background
    const currentStepButton = document.querySelector('.bg-\\[\\#3b82f6\\]');
    expect(currentStepButton).toBeInTheDocument();
    expect(currentStepButton).toHaveTextContent('2'); // currentStep 1 = step 2 (1-indexed)
  });

  it('should apply correct CSS classes for completed steps', () => {
    render(<ProgressBar {...defaultProps} currentStep={2} />);
    
    // Completed step should have green background and be clickable
    const completedButton = document.querySelector('.bg-\\[\\#22c55e\\]');
    expect(completedButton).toBeInTheDocument();
    expect(completedButton).toHaveClass('cursor-pointer');
    expect(completedButton).not.toBeDisabled();
  });

  it('should apply correct CSS classes for current step', () => {
    render(<ProgressBar {...defaultProps} currentStep={1} />);
    
    // Current step should have blue background
    const currentButton = document.querySelector('.bg-\\[\\#3b82f6\\]');
    expect(currentButton).toBeInTheDocument();
    expect(currentButton).toHaveClass('text-white');
  });

  it('should apply correct CSS classes for future steps', () => {
    render(<ProgressBar {...defaultProps} currentStep={1} />);
    
    // Future steps should have gray background and be disabled
    const futureButtons = document.querySelectorAll('.bg-\\[\\#2a3344\\]');
    expect(futureButtons.length).toBeGreaterThan(0);
    
    // Check if they're disabled
    const allButtons = screen.getAllByRole('button');
    const futureStepButtons = allButtons.slice(2); // Steps 3 and 4
    futureStepButtons.forEach(button => {
      expect(button).toBeDisabled();
      expect(button).toHaveClass('cursor-default');
    });
  });

  it('should call onStepClick when clicking on completed steps', async () => {
    const user = userEvent.setup();
    const mockOnStepClick = jest.fn();
    
    render(<ProgressBar {...defaultProps} currentStep={2} onStepClick={mockOnStepClick} />);
    
    // Click on the first completed step (index 0)
    const completedButton = document.querySelector('.bg-\\[\\#22c55e\\]');
    expect(completedButton).toBeInTheDocument();
    
    if (completedButton) {
      await user.click(completedButton);
      expect(mockOnStepClick).toHaveBeenCalledWith(0);
    }
  });

  it('should not call onStepClick when clicking on current step', async () => {
    const user = userEvent.setup();
    const mockOnStepClick = jest.fn();
    
    render(<ProgressBar {...defaultProps} currentStep={1} onStepClick={mockOnStepClick} />);
    
    // Try to click on current step
    const currentButton = document.querySelector('.bg-\\[\\#3b82f6\\]');
    expect(currentButton).toBeInTheDocument();
    
    if (currentButton) {
      await user.click(currentButton);
      expect(mockOnStepClick).not.toHaveBeenCalled();
    }
  });

  it('should not call onStepClick when clicking on future steps', async () => {
    const user = userEvent.setup();
    const mockOnStepClick = jest.fn();
    
    render(<ProgressBar {...defaultProps} currentStep={1} onStepClick={mockOnStepClick} />);
    
    // Try to click on a future step
    const futureButtons = document.querySelectorAll('.bg-\\[\\#2a3344\\]');
    expect(futureButtons.length).toBeGreaterThan(0);
    
    if (futureButtons[0]) {
      await user.click(futureButtons[0]);
      expect(mockOnStepClick).not.toHaveBeenCalled();
    }
  });

  it('should render connector lines between steps', () => {
    render(<ProgressBar {...defaultProps} />);
    
    // Should have connector lines (one less than number of steps)
    const connectorLines = document.querySelectorAll('.h-0\\.5');
    expect(connectorLines).toHaveLength(defaultSteps.length - 1);
  });

  it('should style connector lines correctly for completed vs incomplete', () => {
    render(<ProgressBar {...defaultProps} currentStep={2} />);
    
    // Check for green connector (completed)
    const greenConnector = document.querySelector('.bg-\\[\\#22c55e\\].h-0\\.5');
    expect(greenConnector).toBeInTheDocument();
    
    // Check for gray connector (incomplete)
    const grayConnector = document.querySelector('.bg-\\[\\#2a3344\\].h-0\\.5');
    expect(grayConnector).toBeInTheDocument();
  });

  it('should apply correct text colors for step titles', () => {
    render(<ProgressBar {...defaultProps} currentStep={2} />);
    
    // Completed step title should be green
    const completedTitle = document.querySelector('.text-\\[\\#22c55e\\]');
    expect(completedTitle).toBeInTheDocument();
    
    // Current step title should be blue
    const currentTitle = document.querySelector('.text-\\[\\#3b82f6\\]');
    expect(currentTitle).toBeInTheDocument();
    
    // Future step titles should be gray
    const grayTitles = document.querySelectorAll('.text-gray-400');
    expect(grayTitles.length).toBeGreaterThan(0);
  });

  it('should handle edge case with currentStep 0', () => {
    render(<ProgressBar {...defaultProps} currentStep={0} />);
    
    // First step should be current (blue)
    const currentButton = document.querySelector('.bg-\\[\\#3b82f6\\]');
    expect(currentButton).toBeInTheDocument();
    expect(currentButton).toHaveTextContent('1');
    
    // No steps should be completed
    const completedButtons = document.querySelectorAll('.bg-\\[\\#22c55e\\]');
    expect(completedButtons).toHaveLength(0);
  });

  it('should handle edge case with currentStep at last step', () => {
    render(<ProgressBar {...defaultProps} currentStep={defaultSteps.length - 1} />);
    
    // All previous steps should be completed (only count buttons, not connector lines)
    const completedButtons = document.querySelectorAll('button.bg-\\[\\#22c55e\\]');
    expect(completedButtons).toHaveLength(defaultSteps.length - 1);
    
    // Last step should be current
    const currentButton = document.querySelector('button.bg-\\[\\#3b82f6\\]');
    expect(currentButton).toBeInTheDocument();
    expect(currentButton).toHaveTextContent(defaultSteps.length.toString());
  });

  it('should handle single step', () => {
    const singleStep = [{ id: 'step1', title: 'Only Step', component: mockComponent }];
    render(<ProgressBar {...defaultProps} steps={singleStep} currentStep={0} />);
    
    const stepTitle = screen.getByText('Only Step');
    expect(stepTitle).toBeInTheDocument();
    
    // Should not have any connector lines
    const connectorLines = document.querySelectorAll('.h-0\\.5');
    expect(connectorLines).toHaveLength(0);
  });

  it('should render with correct structure and layout', () => {
    render(<ProgressBar {...defaultProps} />);
    
    // Each step should have the correct structure
    const stepContainers = document.querySelectorAll('.flex.flex-col.items-center.flex-1');
    expect(stepContainers).toHaveLength(defaultSteps.length);
    
    stepContainers.forEach(container => {
      // Should have button and title
      expect(container.querySelector('button')).toBeInTheDocument();
      expect(container.querySelector('.text-xs.font-medium')).toBeInTheDocument();
    });
  });

  it('should render step buttons with correct attributes', () => {
    render(<ProgressBar {...defaultProps} currentStep={2} />);
    
    const allButtons = screen.getAllByRole('button');
    expect(allButtons).toHaveLength(defaultSteps.length);
    
    allButtons.forEach((button, index) => {
      expect(button).toHaveClass('w-10', 'h-10', 'rounded-full', 'flex', 'items-center', 'justify-center');
      
      if (index < 2) { // Completed or current step
        expect(button).not.toBeDisabled();
      } else { // Future step
        expect(button).toBeDisabled();
      }
    });
  });

  it('should have proper hover effects for completed steps', () => {
    render(<ProgressBar {...defaultProps} currentStep={2} />);
    
    const completedButton = document.querySelector('.bg-\\[\\#22c55e\\]');
    expect(completedButton).toBeInTheDocument();
    expect(completedButton).toHaveClass('hover:bg-[#16a34a]');
  });
});
