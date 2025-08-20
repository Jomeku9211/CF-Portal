import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectField } from '../../../components/common/SelectField';

describe('SelectField', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', description: 'This is option 2 description' },
    { value: 'option3', label: 'Option 3' },
  ];

  const defaultProps = {
    label: 'Test Select',
    options: defaultOptions,
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<SelectField {...defaultProps} />);
    
    const label = screen.getByText('Test Select');
    expect(label).toBeInTheDocument();
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should render the label with required asterisk when required is true', () => {
    render(<SelectField {...defaultProps} required={true} />);
    
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-red-400', 'ml-1');
  });

  it('should render placeholder as disabled option', () => {
    const customPlaceholder = 'Choose an option';
    render(<SelectField {...defaultProps} placeholder={customPlaceholder} />);
    
    const placeholderOption = screen.getByText(customPlaceholder);
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption.closest('option')).toBeDisabled();
  });

  it('should render default placeholder when none provided', () => {
    render(<SelectField {...defaultProps} />);
    
    const defaultPlaceholder = screen.getByText('Select an option');
    expect(defaultPlaceholder).toBeInTheDocument();
  });

  it('should render all options correctly', () => {
    render(<SelectField {...defaultProps} />);
    
    defaultOptions.forEach(option => {
      const optionElement = screen.getByText(option.label);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement.closest('option')).toHaveValue(option.value);
    });
  });

  it('should apply custom className', () => {
    const customClass = 'custom-select-class';
    render(<SelectField {...defaultProps} className={customClass} />);
    
    const container = document.querySelector(`.${customClass}`);
    expect(container).toBeInTheDocument();
  });

  it('should generate correct select id from label', () => {
    render(<SelectField {...defaultProps} label="My Test Label" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'my-test-label-select');
  });

  it('should call onChange when option is selected', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<SelectField {...defaultProps} onChange={mockOnChange} />);
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option2');
    
    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('should display selected value correctly', () => {
    render(<SelectField {...defaultProps} value="option2" />);
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('option2');
  });

  it('should show description when option with description is selected', () => {
    render(<SelectField {...defaultProps} value="option2" />);
    
    const description = screen.getByText('This is option 2 description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-gray-400', 'mt-1');
  });

  it('should not show description when option without description is selected', () => {
    render(<SelectField {...defaultProps} value="option1" />);
    
    const descriptionContainer = document.querySelector('.text-sm.text-gray-400.mt-1');
    expect(descriptionContainer).not.toBeInTheDocument();
  });

  it('should not show description when no option is selected', () => {
    render(<SelectField {...defaultProps} value="" />);
    
    const descriptionContainer = document.querySelector('.text-sm.text-gray-400.mt-1');
    expect(descriptionContainer).not.toBeInTheDocument();
  });

  it('should render chevron down icon', () => {
    render(<SelectField {...defaultProps} />);
    
    const chevronIcon = document.querySelector('.w-5.h-5.text-gray-400');
    expect(chevronIcon).toBeInTheDocument();
  });

  it('should have correct CSS classes on select element', () => {
    render(<SelectField {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
      'w-full', 'px-4', 'py-3', 'bg-[#1e293b]', 'border', 'border-[#2a3344]',
      'rounded-lg', 'text-white', 'appearance-none'
    );
  });

  it('should have correct CSS classes on label', () => {
    render(<SelectField {...defaultProps} />);
    
    const label = screen.getByText('Test Select');
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-300');
  });

  it('should have correct structure with relative container for icon', () => {
    render(<SelectField {...defaultProps} />);
    
    const relativeContainer = document.querySelector('.relative');
    expect(relativeContainer).toBeInTheDocument();
    
    const iconContainer = relativeContainer?.querySelector('.absolute.inset-y-0.right-0');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass('pointer-events-none');
  });

  it('should set required attribute when required prop is true', () => {
    render(<SelectField {...defaultProps} required={true} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeRequired();
  });

  it('should not set required attribute when required prop is false', () => {
    render(<SelectField {...defaultProps} required={false} />);
    
    const select = screen.getByRole('combobox');
    expect(select).not.toBeRequired();
  });

  it('should handle empty options array', () => {
    render(<SelectField {...defaultProps} options={[]} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    // Should only have the placeholder option
    const options = select.querySelectorAll('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Select an option');
  });

  it('should handle option selection and display correct label', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    const { rerender } = render(<SelectField {...defaultProps} onChange={mockOnChange} />);
    
    const select = screen.getByRole('combobox');
    
    // Select option3
    await user.selectOptions(select, 'option3');
    
    expect(mockOnChange).toHaveBeenCalledWith('option3');
    
    // Rerender with the new value to simulate state update
    rerender(<SelectField {...defaultProps} value="option3" onChange={mockOnChange} />);
    
    expect(screen.getByDisplayValue('Option 3')).toBeInTheDocument();
  });

  it('should handle complex label for id generation', () => {
    render(<SelectField {...defaultProps} label="Complex Label With Spaces" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'complex-label-with-spaces-select');
  });

  it('should maintain correct DOM structure', () => {
    render(<SelectField {...defaultProps} />);
    
    const container = document.querySelector('.space-y-2');
    expect(container).toBeInTheDocument();
    
    const label = container?.querySelector('label');
    const relativeDiv = container?.querySelector('.relative');
    
    expect(label).toBeInTheDocument();
    expect(relativeDiv).toBeInTheDocument();
    
    const select = relativeDiv?.querySelector('select');
    const iconContainer = relativeDiv?.querySelector('.absolute');
    
    expect(select).toBeInTheDocument();
    expect(iconContainer).toBeInTheDocument();
  });

  it('should handle option with special characters in value', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    const specialOptions = [
      { value: 'option-with-dash', label: 'Option with dash' },
      { value: 'option_with_underscore', label: 'Option with underscore' },
      { value: 'option.with.dots', label: 'Option with dots' },
    ];
    
    render(<SelectField {...defaultProps} options={specialOptions} onChange={mockOnChange} />);
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option_with_underscore');
    
    expect(mockOnChange).toHaveBeenCalledWith('option_with_underscore');
  });

  it('should properly handle focus states with CSS classes', () => {
    render(<SelectField {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
      'focus:outline-none', 'focus:ring-2', 'focus:ring-[#3b82f6]', 'focus:border-transparent'
    );
  });

  it('should render description for exact option match', () => {
    const optionsWithSimilarValues = [
      { value: 'test', label: 'Test', description: 'Test description' },
      { value: 'test2', label: 'Test 2', description: 'Test 2 description' },
    ];
    
    render(<SelectField {...defaultProps} options={optionsWithSimilarValues} value="test" />);
    
    // Should show description for exact match only
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.queryByText('Test 2 description')).not.toBeInTheDocument();
  });
});
