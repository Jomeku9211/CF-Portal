import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../../../components/common/Dropdown';

describe('Dropdown', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dropdown with correct id', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAttribute('id', 'test-dropdown');
  });

  it('renders all options correctly', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    const options = dropdown.querySelectorAll('option');
    
    expect(options).toHaveLength(4); // Including placeholder
    expect(options[0]).toHaveValue(''); // Placeholder
    expect(options[0]).toHaveTextContent('Select an option'); // Placeholder
    expect(options[1]).toHaveValue('option1');
    expect(options[1]).toHaveTextContent('Option 1');
    expect(options[2]).toHaveValue('option2');
    expect(options[2]).toHaveTextContent('Option 2');
    expect(options[3]).toHaveValue('option3');
    expect(options[3]).toHaveTextContent('Option 3');
  });

  it('displays selected value correctly', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value="option2"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveValue('option2');
  });

  it('calls onChange when selection changes', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'option3' } });

    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });

  it('calls onChange with correct value for different option', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'option2' } });

    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('handles empty options array', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={[]}
        value=""
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    const options = dropdown.querySelectorAll('option');
    expect(options).toHaveLength(1); // Only placeholder
  });

  it('handles single option', () => {
    const singleOption = [{ value: 'single', label: 'Single Option' }];
    
    render(
      <Dropdown
        id="test-dropdown"
        options={singleOption}
        value="single"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    const options = dropdown.querySelectorAll('option');
    expect(options).toHaveLength(2); // Including placeholder
    expect(options[0]).toHaveValue(''); // Placeholder
    expect(options[0]).toHaveTextContent('Select an option'); // Placeholder
    expect(options[1]).toHaveValue('single');
    expect(options[1]).toHaveTextContent('Single Option');
  });

  it('handles empty string value', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveValue('');
  });

  it('handles undefined value gracefully', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value={undefined as any}
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });

  it('handles null value gracefully', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value={null as any}
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    render(
      <Dropdown
        id="test-dropdown"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveClass('w-full', 'bg-[#1a1f35]', 'border', 'border-gray-700', 'rounded-md', 'px-4', 'py-2', 'text-white', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('handles options with special characters in labels', () => {
    const specialOptions = [
      { value: 'special1', label: 'Option & Special < > " \' Characters' },
      { value: 'special2', label: 'Option with numbers 123' }
    ];

    render(
      <Dropdown
        id="test-dropdown"
        options={specialOptions}
        value="special1"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    const options = dropdown.querySelectorAll('option');
    
    expect(options[1]).toHaveTextContent('Option & Special < > " \' Characters');
    expect(options[2]).toHaveTextContent('Option with numbers 123');
  });

  it('handles options with empty labels', () => {
    const emptyLabelOptions = [
      { value: 'empty1', label: '' },
      { value: 'empty2', label: 'Normal Label' }
    ];

    render(
      <Dropdown
        id="test-dropdown"
        options={emptyLabelOptions}
        value="empty1"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    const options = dropdown.querySelectorAll('option');
    
    expect(options[1]).toHaveTextContent('');
    expect(options[2]).toHaveTextContent('Normal Label');
  });

  it('handles options with duplicate values', () => {
    const duplicateValueOptions = [
      { value: 'duplicate', label: 'First Option' },
      { value: 'duplicate', label: 'Second Option' }
    ];

    render(
      <Dropdown
        id="test-dropdown"
        options={duplicateValueOptions}
        value="duplicate"
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole('combobox');
    const options = dropdown.querySelectorAll('option');
    
    expect(options).toHaveLength(3); // Including placeholder
    expect(options[1]).toHaveValue('duplicate');
    expect(options[2]).toHaveValue('duplicate');
  });
});
