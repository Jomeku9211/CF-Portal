import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../../../components/common/Checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    id: 'test-checkbox',
    label: 'Test Checkbox',
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<Checkbox {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    
    const label = screen.getByText('Test Checkbox');
    expect(label).toBeInTheDocument();
  });

  it('should have correct id attribute', () => {
    render(<Checkbox {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });

  it('should have correct label association', () => {
    render(<Checkbox {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Checkbox');
    
    expect(label).toHaveAttribute('for', 'test-checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });

  it('should render with checked state', () => {
    render(<Checkbox {...defaultProps} checked={true} />);
    
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should render with unchecked state', () => {
    render(<Checkbox {...defaultProps} checked={false} />);
    
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('should call onChange when clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<Checkbox {...defaultProps} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('should call onChange when label is clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<Checkbox {...defaultProps} onChange={mockOnChange} />);
    
    const label = screen.getByText('Test Checkbox');
    await user.click(label);
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('should handle required attribute when required is true', () => {
    render(<Checkbox {...defaultProps} required={true} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('should not have required attribute when required is false', () => {
    render(<Checkbox {...defaultProps} required={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeRequired();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-checkbox-class';
    render(<Checkbox {...defaultProps} className={customClass} />);
    
    const container = document.querySelector(`.${customClass}`);
    expect(container).toBeInTheDocument();
  });

  it('should have correct base CSS classes', () => {
    render(<Checkbox {...defaultProps} />);
    
    const container = document.querySelector('.flex.items-start.space-x-3');
    expect(container).toBeInTheDocument();
  });

  it('should have correct checkbox CSS classes', () => {
    render(<Checkbox {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(
      'mt-1', 'h-4', 'w-4', 'text-blue-600', 'focus:ring-blue-500',
      'border-gray-300', 'rounded', 'cursor-pointer'
    );
  });

  it('should have correct label CSS classes', () => {
    render(<Checkbox {...defaultProps} />);
    
    const label = screen.getByText('Test Checkbox');
    expect(label).toHaveClass('text-sm', 'text-gray-700', 'cursor-pointer', 'select-none');
  });

  it('should handle complex label content', () => {
    const complexLabel = (
      <div>
        <span>Label with</span>
        <strong>bold text</strong>
        <em>and italic</em>
      </div>
    );
    
    render(<Checkbox {...defaultProps} label={complexLabel} />);
    
    expect(screen.getByText('Label with')).toBeInTheDocument();
    expect(screen.getByText('bold text')).toBeInTheDocument();
    expect(screen.getByText('and italic')).toBeInTheDocument();
  });

  it('should handle string label content', () => {
    const stringLabel = 'Simple string label';
    render(<Checkbox {...defaultProps} label={stringLabel} />);
    
    expect(screen.getByText(stringLabel)).toBeInTheDocument();
  });

  it('should handle number label content', () => {
    const numberLabel = 42;
    render(<Checkbox {...defaultProps} label={numberLabel} />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should handle empty string label', () => {
    const emptyLabel = '';
    render(<Checkbox {...defaultProps} label={emptyLabel} />);
    
    const label = document.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('');
  });

  it('should handle checkbox state changes correctly', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    const { rerender } = render(<Checkbox {...defaultProps} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    
    // Initially unchecked
    expect(checkbox.checked).toBe(false);
    
    // Click to check
    await user.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(true);
    
    // Rerender with checked state
    rerender(<Checkbox {...defaultProps} checked={true} onChange={mockOnChange} />);
    expect(checkbox.checked).toBe(true);
    
    // Click to uncheck
    await user.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it('should handle multiple rapid clicks', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<Checkbox {...defaultProps} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    
    // Multiple rapid clicks - since this is a controlled component,
    // each click will call onChange with the opposite of the current checked state
    await user.click(checkbox);
    await user.click(checkbox);
    await user.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledTimes(3);
    // All calls will be with 'true' since the component starts unchecked (false)
    // and each click attempts to set it to the opposite (true)
    expect(mockOnChange).toHaveBeenNthCalledWith(1, true);
    expect(mockOnChange).toHaveBeenNthCalledWith(2, true);
    expect(mockOnChange).toHaveBeenNthCalledWith(3, true);
  });

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<Checkbox {...defaultProps} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    
    // Focus the checkbox
    checkbox.focus();
    expect(checkbox).toHaveFocus();
    
    // Press space to toggle
    await user.keyboard(' ');
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('should maintain proper DOM structure', () => {
    render(<Checkbox {...defaultProps} />);
    
    const container = document.querySelector('.flex.items-start.space-x-3');
    expect(container).toBeInTheDocument();
    
    const checkbox = container?.querySelector('input[type="checkbox"]');
    const label = container?.querySelector('label');
    
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should handle custom id with special characters', () => {
    const specialId = 'checkbox-with-special-chars-@#$%^&*()';
    render(<Checkbox {...defaultProps} id={specialId} />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Checkbox');
    
    expect(checkbox).toHaveAttribute('id', specialId);
    expect(label).toHaveAttribute('for', specialId);
  });

  it('should handle very long id', () => {
    const longId = 'a'.repeat(1000);
    render(<Checkbox {...defaultProps} id={longId} />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Checkbox');
    
    expect(checkbox).toHaveAttribute('id', longId);
    expect(label).toHaveAttribute('for', longId);
  });

  it('should combine custom className with base classes', () => {
    const customClass = 'custom-class';
    render(<Checkbox {...defaultProps} className={customClass} />);
    
    const container = document.querySelector('.flex.items-start.space-x-3');
    expect(container).toHaveClass(customClass);
  });

  it('should handle multiple checkboxes with different states', () => {
    const mockOnChange1 = jest.fn();
    const mockOnChange2 = jest.fn();
    
    render(
      <div>
        <Checkbox {...defaultProps} checked={true} onChange={mockOnChange1} />
        <Checkbox {...defaultProps} id="checkbox-2" checked={false} onChange={mockOnChange2} />
      </div>
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    
    const firstCheckbox = checkboxes[0] as HTMLInputElement;
    const secondCheckbox = checkboxes[1] as HTMLInputElement;
    
    expect(firstCheckbox.checked).toBe(true);
    expect(secondCheckbox.checked).toBe(false);
  });

  it('should handle checkbox with no label content', () => {
    const emptyLabel = null;
    render(<Checkbox {...defaultProps} label={emptyLabel} />);
    
    const label = document.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('');
  });

  it('should maintain accessibility features', () => {
    render(<Checkbox {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Checkbox');
    
    // Checkbox should be accessible
    expect(checkbox).toBeInTheDocument();
    
    // Label should be associated with checkbox
    expect(label).toHaveAttribute('for', 'test-checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });
});
