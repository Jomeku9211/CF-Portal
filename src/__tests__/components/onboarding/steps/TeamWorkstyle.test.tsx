import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamWorkstyle } from '../../../../components/onboarding/steps/TeamWorkstyle';

// Mock the RadioGroup component
jest.mock('../../../../components/common/RadioGroup', () => ({
  RadioGroup: ({ id, options, value, onChange }: { id: string; options: any[]; value: string; onChange: (value: string) => void }) => (
    <div data-testid={`radio-group-${id}`}>
      {options.map(option => (
        <label key={option.value}>
          <input
            type="radio"
            name={id}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            data-testid={`radio-${id}-${option.value}`}
          />
          {option.label}
        </label>
      ))}
    </div>
  ),
}));

// Mock the Tooltip component
jest.mock('../../../../components/common/Tooltip', () => ({
  Tooltip: ({ children, content }: { children: React.ReactNode; content: string }) => (
    <div data-testid="tooltip" title={content}>
      {children}
    </div>
  ),
}));

describe('TeamWorkstyle', () => {
  const mockOnChange = jest.fn();
  const defaultFormData = {
    structurePreference: '',
    paceOfWork: '',
    autonomy: '',
    initiativeLevel: '',
    decisionMakingStyle: '',
    attentionToDetail: '',
    multitaskingAbility: '',
    workingHours: '',
    stressHandlingStyle: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const container = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-x-8.gap-y-6');
    expect(container).toBeInTheDocument();
  });

  it('should render structure preference section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Structure Preference');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-white');
    
    const radioGroup = screen.getByTestId('radio-group-structurePreference');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render structure preference options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-structurePreference-highly_structured')).toBeInTheDocument();
    expect(screen.getByTestId('radio-structurePreference-semi_structured')).toBeInTheDocument();
    expect(screen.getByTestId('radio-structurePreference-flexible')).toBeInTheDocument();
  });

  it('should render pace of work section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Pace of Work');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-paceOfWork');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render pace of work options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-paceOfWork-fast')).toBeInTheDocument();
    expect(screen.getByTestId('radio-paceOfWork-balanced')).toBeInTheDocument();
    expect(screen.getByTestId('radio-paceOfWork-thoughtful')).toBeInTheDocument();
  });

  it('should render autonomy section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Autonomy');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-autonomy');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render autonomy options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-autonomy-independent')).toBeInTheDocument();
    expect(screen.getByTestId('radio-autonomy-semi_collaborative')).toBeInTheDocument();
    expect(screen.getByTestId('radio-autonomy-collaborative')).toBeInTheDocument();
  });

  it('should render initiative level section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Initiative Level');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-initiativeLevel');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render initiative level options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-initiativeLevel-proactive')).toBeInTheDocument();
    expect(screen.getByTestId('radio-initiativeLevel-reactive')).toBeInTheDocument();
    expect(screen.getByTestId('radio-initiativeLevel-instruction_led')).toBeInTheDocument();
  });

  it('should render decision making style section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Decision-Making Style');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-decisionMakingStyle');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render decision making style options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-decisionMakingStyle-analytical')).toBeInTheDocument();
    expect(screen.getByTestId('radio-decisionMakingStyle-intuitive')).toBeInTheDocument();
    expect(screen.getByTestId('radio-decisionMakingStyle-mix')).toBeInTheDocument();
  });

  it('should render attention to detail section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Attention to Detail');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-attentionToDetail');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render attention to detail options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-attentionToDetail-detail_oriented')).toBeInTheDocument();
    expect(screen.getByTestId('radio-attentionToDetail-big_picture')).toBeInTheDocument();
    expect(screen.getByTestId('radio-attentionToDetail-balanced')).toBeInTheDocument();
  });

  it('should render multitasking ability section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Multitasking Ability');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-multitaskingAbility');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render multitasking ability options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-multitaskingAbility-single_task')).toBeInTheDocument();
    expect(screen.getByTestId('radio-multitaskingAbility-multi_threaded')).toBeInTheDocument();
  });

  it('should render working hours section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Working Hours & Energy Flow');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-workingHours');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render working hours options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-workingHours-morning')).toBeInTheDocument();
    expect(screen.getByTestId('radio-workingHours-evening')).toBeInTheDocument();
    expect(screen.getByTestId('radio-workingHours-flexible')).toBeInTheDocument();
  });

  it('should render stress handling style section', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const label = screen.getByText('Stress Handling Style');
    expect(label).toBeInTheDocument();
    
    const radioGroup = screen.getByTestId('radio-group-stressHandlingStyle');
    expect(radioGroup).toBeInTheDocument();
  });

  it('should render stress handling style options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-stressHandlingStyle-calm_under_pressure')).toBeInTheDocument();
    expect(screen.getByTestId('radio-stressHandlingStyle-needs_stability')).toBeInTheDocument();
    expect(screen.getByTestId('radio-stressHandlingStyle-performs_with_support')).toBeInTheDocument();
  });

  it('should render tooltips for all sections', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const tooltips = screen.getAllByTestId('tooltip');
    expect(tooltips).toHaveLength(9);
    
    expect(tooltips[0]).toHaveAttribute('title', 'How much structure and process does your team need to work effectively?');
    expect(tooltips[1]).toHaveAttribute('title', 'What speed does your team typically operate at?');
    expect(tooltips[2]).toHaveAttribute('title', 'How independent should team members be in their work?');
    expect(tooltips[3]).toHaveAttribute('title', 'How proactive should team members be?');
    expect(tooltips[4]).toHaveAttribute('title', 'What approach to decision-making works best for your team?');
    expect(tooltips[5]).toHaveAttribute('title', 'What level of detail focus is preferred?');
    expect(tooltips[6]).toHaveAttribute('title', 'How should team members handle multiple tasks?');
    expect(tooltips[7]).toHaveAttribute('title', 'When is your team most productive?');
    expect(tooltips[8]).toHaveAttribute('title', 'How does your team typically respond to pressure?');
  });

  it('should render help icons for all sections', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const helpIcons = document.querySelectorAll('.w-4.h-4.text-gray-400.ml-1.cursor-help');
    expect(helpIcons).toHaveLength(9);
  });

  it('should render first column options correctly', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const firstColumn = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-x-8.gap-y-6 > div:first-child');
    expect(firstColumn).toBeInTheDocument();
    
    // First column should contain first 5 options (rounded up from 9/2)
    expect(firstColumn).toHaveTextContent('Structure Preference');
    expect(firstColumn).toHaveTextContent('Pace of Work');
    expect(firstColumn).toHaveTextContent('Autonomy');
    expect(firstColumn).toHaveTextContent('Initiative Level');
    expect(firstColumn).toHaveTextContent('Decision-Making Style');
  });

  it('should render second column options correctly', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const secondColumn = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-x-8.gap-y-6 > div:last-child');
    expect(secondColumn).toBeInTheDocument();
    
    // Second column should contain remaining 4 options
    expect(secondColumn).toHaveTextContent('Attention to Detail');
    expect(secondColumn).toHaveTextContent('Multitasking Ability');
    expect(secondColumn).toHaveTextContent('Working Hours & Energy Flow');
    expect(secondColumn).toHaveTextContent('Stress Handling Style');
  });

  it('should call onChange when structure preference changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-structurePreference-highly_structured');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('structurePreference', 'highly_structured');
  });

  it('should call onChange when pace of work changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-paceOfWork-fast');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('paceOfWork', 'fast');
  });

  it('should call onChange when autonomy changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-autonomy-independent');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('autonomy', 'independent');
  });

  it('should call onChange when initiative level changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-initiativeLevel-proactive');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('initiativeLevel', 'proactive');
  });

  it('should call onChange when decision making style changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-decisionMakingStyle-analytical');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('decisionMakingStyle', 'analytical');
  });

  it('should call onChange when attention to detail changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-attentionToDetail-detail_oriented');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('attentionToDetail', 'detail_oriented');
  });

  it('should call onChange when multitasking ability changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-multitaskingAbility-multi_threaded');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('multitaskingAbility', 'multi_threaded');
  });

  it('should call onChange when working hours changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-workingHours-morning');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('workingHours', 'morning');
  });

  it('should call onChange when stress handling style changes', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-stressHandlingStyle-calm_under_pressure');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('stressHandlingStyle', 'calm_under_pressure');
  });

  it('should display current values correctly', () => {
    const formDataWithValues = {
      structurePreference: 'highly_structured',
      paceOfWork: 'fast',
      autonomy: 'independent',
      initiativeLevel: 'proactive',
      decisionMakingStyle: 'analytical',
      attentionToDetail: 'detail_oriented',
      multitaskingAbility: 'multi_threaded',
      workingHours: 'morning',
      stressHandlingStyle: 'calm_under_pressure',
    };
    
    render(<TeamWorkstyle formData={formDataWithValues} onChange={mockOnChange} />);
    
    const structureRadio = screen.getByTestId('radio-structurePreference-highly_structured') as HTMLInputElement;
    const paceRadio = screen.getByTestId('radio-paceOfWork-fast') as HTMLInputElement;
    const autonomyRadio = screen.getByTestId('radio-autonomy-independent') as HTMLInputElement;
    
    expect(structureRadio.checked).toBe(true);
    expect(paceRadio.checked).toBe(true);
    expect(autonomyRadio.checked).toBe(true);
  });

  it('should handle empty values correctly', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const structureRadio = screen.getByTestId('radio-structurePreference-highly_structured') as HTMLInputElement;
    const paceRadio = screen.getByTestId('radio-paceOfWork-fast') as HTMLInputElement;
    const autonomyRadio = screen.getByTestId('radio-autonomy-independent') as HTMLInputElement;
    
    expect(structureRadio.checked).toBe(false);
    expect(paceRadio.checked).toBe(false);
    expect(autonomyRadio.checked).toBe(false);
  });

  it('should have correct CSS classes on labels', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const labels = document.querySelectorAll('.block.text-sm.font-medium.text-white');
    expect(labels).toHaveLength(9);
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const firstStructure = document.body.innerHTML;
    
    rerender(<TeamWorkstyle formData={{ ...defaultFormData, structurePreference: 'highly_structured' }} onChange={mockOnChange} />);
    
    const secondStructure = document.body.innerHTML;
    
    // Structure should be the same, only values should change
    expect(firstStructure).toContain('Structure Preference');
    expect(secondStructure).toContain('Structure Preference');
  });

  it('should handle all radio button interactions', async () => {
    const user = userEvent.setup();
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    // Test a few key options
    await user.click(screen.getByTestId('radio-structurePreference-highly_structured'));
    expect(mockOnChange).toHaveBeenCalledWith('structurePreference', 'highly_structured');
    
    await user.click(screen.getByTestId('radio-paceOfWork-balanced'));
    expect(mockOnChange).toHaveBeenCalledWith('paceOfWork', 'balanced');
    
    await user.click(screen.getByTestId('radio-autonomy-collaborative'));
    expect(mockOnChange).toHaveBeenCalledWith('autonomy', 'collaborative');
  });

  it('should update form data when props change', () => {
    const { rerender } = render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    // Initial render with empty values
    let structureRadio = screen.getByTestId('radio-structurePreference-highly_structured') as HTMLInputElement;
    expect(structureRadio.checked).toBe(false);
    
    // Update with new values
    const updatedFormData = { ...defaultFormData, structurePreference: 'highly_structured' };
    rerender(<TeamWorkstyle formData={updatedFormData} onChange={mockOnChange} />);
    
    structureRadio = screen.getByTestId('radio-structurePreference-highly_structured') as HTMLInputElement;
    expect(structureRadio.checked).toBe(true);
  });

  it('should have proper grid layout classes', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const container = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-x-8.gap-y-6');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-x-8', 'gap-y-6');
  });

  it('should render all 9 workstyle options', () => {
    render(<TeamWorkstyle formData={defaultFormData} onChange={mockOnChange} />);
    
    const expectedOptions = [
      'Structure Preference',
      'Pace of Work',
      'Autonomy',
      'Initiative Level',
      'Decision-Making Style',
      'Attention to Detail',
      'Multitasking Ability',
      'Working Hours & Energy Flow',
      'Stress Handling Style'
    ];
    
    expectedOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
