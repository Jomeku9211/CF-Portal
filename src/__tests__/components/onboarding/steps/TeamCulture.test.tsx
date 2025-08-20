import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamCulture } from '../../../../components/onboarding/steps/TeamCulture';

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

// Mock the Dropdown component
jest.mock('../../../../components/common/Dropdown', () => ({
  Dropdown: ({ id, options, value, onChange }: { id: string; options: any[]; value: string; onChange: (value: string) => void }) => (
    <select
      data-testid={`dropdown-${id}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
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

describe('TeamCulture', () => {
  const mockOnChange = jest.fn();
  const defaultFormData = {
    communicationStyle: '',
    diversityAlignment: '',
    genderComposition: '',
    ageComposition: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const container = document.querySelector('.space-y-6');
    expect(container).toBeInTheDocument();
  });

  it('should render communication style radio group', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioGroup = screen.getByTestId('radio-group-communicationStyle');
    expect(radioGroup).toBeInTheDocument();
    
    const label = screen.getByText('Preferred Communication Style');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-white');
  });

  it('should render communication style options', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-communicationStyle-written')).toBeInTheDocument();
    expect(screen.getByTestId('radio-communicationStyle-verbal')).toBeInTheDocument();
    expect(screen.getByTestId('radio-communicationStyle-mixed')).toBeInTheDocument();
  });

  it('should render diversity alignment radio group', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioGroup = screen.getByTestId('radio-group-diversityAlignment');
    expect(radioGroup).toBeInTheDocument();
    
    const label = screen.getByText('Cultural & Diversity Alignment');
    expect(label).toBeInTheDocument();
  });

  it('should render diversity alignment options', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('radio-diversityAlignment-thrives_in_diversity')).toBeInTheDocument();
    expect(screen.getByTestId('radio-diversityAlignment-respects_diversity')).toBeInTheDocument();
    expect(screen.getByTestId('radio-diversityAlignment-like_minded')).toBeInTheDocument();
  });

  it('should render gender composition dropdown', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const dropdown = screen.getByTestId('dropdown-genderComposition');
    expect(dropdown).toBeInTheDocument();
    
    const label = screen.getByText('Team Gender Composition');
    expect(label).toBeInTheDocument();
  });

  it('should render gender composition options', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const dropdown = screen.getByTestId('dropdown-genderComposition');
    const options = dropdown.querySelectorAll('option');
    
    expect(options).toHaveLength(5);
    expect(options[0]).toHaveTextContent('Select an option');
    expect(options[1]).toHaveTextContent('Mostly male');
    expect(options[2]).toHaveTextContent('Mostly female');
    expect(options[3]).toHaveTextContent('Mixed gender');
    expect(options[4]).toHaveTextContent('Prefer not to say');
  });

  it('should render age composition dropdown', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const dropdown = screen.getByTestId('dropdown-ageComposition');
    expect(dropdown).toBeInTheDocument();
    
    const label = screen.getByText('Team Age Composition');
    expect(label).toBeInTheDocument();
  });

  it('should render age composition options', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const dropdown = screen.getByTestId('dropdown-ageComposition');
    const options = dropdown.querySelectorAll('option');
    
    expect(options).toHaveLength(6);
    expect(options[0]).toHaveTextContent('Select an option');
    expect(options[1]).toHaveTextContent('Gen Z');
    expect(options[2]).toHaveTextContent('Millennials');
    expect(options[3]).toHaveTextContent('Gen X');
    expect(options[4]).toHaveTextContent('Mixed age group');
    expect(options[5]).toHaveTextContent('Prefer not to say');
  });

  it('should render tooltips for all sections', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const tooltips = screen.getAllByTestId('tooltip');
    expect(tooltips).toHaveLength(4);
    
    expect(tooltips[0]).toHaveAttribute('title', 'What communication methods work best for your team?');
    expect(tooltips[1]).toHaveAttribute('title', 'How does your team approach diversity of thought and background?');
    expect(tooltips[2]).toHaveAttribute('title', 'What is the current gender distribution in your team?');
    expect(tooltips[3]).toHaveAttribute('title', 'What is the age distribution in your team?');
  });

  it('should render help icons for all sections', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const helpIcons = document.querySelectorAll('.w-4.h-4.text-gray-400.ml-1.cursor-help');
    expect(helpIcons).toHaveLength(4);
  });

  it('should call onChange when communication style changes', async () => {
    const user = userEvent.setup();
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-communicationStyle-written');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('communicationStyle', 'written');
  });

  it('should call onChange when diversity alignment changes', async () => {
    const user = userEvent.setup();
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const radioButton = screen.getByTestId('radio-diversityAlignment-thrives_in_diversity');
    await user.click(radioButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('diversityAlignment', 'thrives_in_diversity');
  });

  it('should call onChange when gender composition changes', async () => {
    const user = userEvent.setup();
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const dropdown = screen.getByTestId('dropdown-genderComposition');
    await user.selectOptions(dropdown, 'mixed');
    
    expect(mockOnChange).toHaveBeenCalledWith('genderComposition', 'mixed');
  });

  it('should call onChange when age composition changes', async () => {
    const user = userEvent.setup();
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const dropdown = screen.getByTestId('dropdown-ageComposition');
    await user.selectOptions(dropdown, 'millennials');
    
    expect(mockOnChange).toHaveBeenCalledWith('ageComposition', 'millennials');
  });

  it('should display current values correctly', () => {
    const formDataWithValues = {
      communicationStyle: 'verbal',
      diversityAlignment: 'thrives_in_diversity',
      genderComposition: 'mixed',
      ageComposition: 'gen_z',
    };
    
    render(<TeamCulture formData={formDataWithValues} onChange={mockOnChange} />);
    
    const communicationRadio = screen.getByTestId('radio-communicationStyle-verbal') as HTMLInputElement;
    const diversityRadio = screen.getByTestId('radio-diversityAlignment-thrives_in_diversity') as HTMLInputElement;
    const genderDropdown = screen.getByTestId('dropdown-genderComposition') as HTMLSelectElement;
    const ageDropdown = screen.getByTestId('dropdown-ageComposition') as HTMLSelectElement;
    
    expect(communicationRadio.checked).toBe(true);
    expect(diversityRadio.checked).toBe(true);
    expect(genderDropdown.value).toBe('mixed');
    expect(ageDropdown.value).toBe('gen_z');
  });

  it('should handle empty values correctly', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const communicationRadio = screen.getByTestId('radio-communicationStyle-written') as HTMLInputElement;
    const diversityRadio = screen.getByTestId('radio-diversityAlignment-thrives_in_diversity') as HTMLInputElement;
    const genderDropdown = screen.getByTestId('dropdown-genderComposition') as HTMLSelectElement;
    const ageDropdown = screen.getByTestId('dropdown-ageComposition') as HTMLSelectElement;
    
    expect(communicationRadio.checked).toBe(false);
    expect(diversityRadio.checked).toBe(false);
    expect(genderDropdown.value).toBe('');
    expect(ageDropdown.value).toBe('');
  });

  it('should have correct CSS classes on labels', () => {
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const labels = document.querySelectorAll('.block.text-sm.font-medium.text-white');
    expect(labels).toHaveLength(4);
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    const firstStructure = document.body.innerHTML;
    
    rerender(<TeamCulture formData={{ ...defaultFormData, communicationStyle: 'written' }} onChange={mockOnChange} />);
    
    const secondStructure = document.body.innerHTML;
    
    // Structure should be the same, only values should change
    expect(firstStructure).toContain('Preferred Communication Style');
    expect(secondStructure).toContain('Preferred Communication Style');
  });

  it('should handle all radio button interactions', async () => {
    const user = userEvent.setup();
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    // Test communication style options
    await user.click(screen.getByTestId('radio-communicationStyle-written'));
    expect(mockOnChange).toHaveBeenCalledWith('communicationStyle', 'written');
    
    await user.click(screen.getByTestId('radio-communicationStyle-verbal'));
    expect(mockOnChange).toHaveBeenCalledWith('communicationStyle', 'verbal');
    
    await user.click(screen.getByTestId('radio-communicationStyle-mixed'));
    expect(mockOnChange).toHaveBeenCalledWith('communicationStyle', 'mixed');
    
    // Test diversity alignment options
    await user.click(screen.getByTestId('radio-diversityAlignment-thrives_in_diversity'));
    expect(mockOnChange).toHaveBeenCalledWith('diversityAlignment', 'thrives_in_diversity');
    
    await user.click(screen.getByTestId('radio-diversityAlignment-respects_diversity'));
    expect(mockOnChange).toHaveBeenCalledWith('diversityAlignment', 'respects_diversity');
    
    await user.click(screen.getByTestId('radio-diversityAlignment-like_minded'));
    expect(mockOnChange).toHaveBeenCalledWith('diversityAlignment', 'like_minded');
  });

  it('should handle all dropdown interactions', async () => {
    const user = userEvent.setup();
    render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    // Test gender composition options
    const genderDropdown = screen.getByTestId('dropdown-genderComposition');
    await user.selectOptions(genderDropdown, 'mostly_male');
    expect(mockOnChange).toHaveBeenCalledWith('genderComposition', 'mostly_male');
    
    await user.selectOptions(genderDropdown, 'mostly_female');
    expect(mockOnChange).toHaveBeenCalledWith('genderComposition', 'mostly_female');
    
    await user.selectOptions(genderDropdown, 'mixed');
    expect(mockOnChange).toHaveBeenCalledWith('genderComposition', 'mixed');
    
    await user.selectOptions(genderDropdown, 'prefer_not_to_say');
    expect(mockOnChange).toHaveBeenCalledWith('genderComposition', 'prefer_not_to_say');
    
    // Test age composition options
    const ageDropdown = screen.getByTestId('dropdown-ageComposition');
    await user.selectOptions(ageDropdown, 'gen_z');
    expect(mockOnChange).toHaveBeenCalledWith('ageComposition', 'gen_z');
    
    await user.selectOptions(ageDropdown, 'millennials');
    expect(mockOnChange).toHaveBeenCalledWith('ageComposition', 'millennials');
    
    await user.selectOptions(ageDropdown, 'gen_x');
    expect(mockOnChange).toHaveBeenCalledWith('ageComposition', 'gen_x');
    
    await user.selectOptions(ageDropdown, 'mixed');
    expect(mockOnChange).toHaveBeenCalledWith('ageComposition', 'mixed');
    
    await user.selectOptions(ageDropdown, 'prefer_not_to_say');
    expect(mockOnChange).toHaveBeenCalledWith('ageComposition', 'prefer_not_to_say');
  });

  it('should update form data when props change', () => {
    const { rerender } = render(<TeamCulture formData={defaultFormData} onChange={mockOnChange} />);
    
    // Initial render with empty values
    let communicationRadio = screen.getByTestId('radio-communicationStyle-written') as HTMLInputElement;
    expect(communicationRadio.checked).toBe(false);
    
    // Update with new values
    const updatedFormData = { ...defaultFormData, communicationStyle: 'written' };
    rerender(<TeamCulture formData={updatedFormData} onChange={mockOnChange} />);
    
    communicationRadio = screen.getByTestId('radio-communicationStyle-written') as HTMLInputElement;
    expect(communicationRadio.checked).toBe(true);
  });
});
