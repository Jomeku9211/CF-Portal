import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from '../../../components/common/RadioGroup';

describe('RadioGroup', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1', description: 'Description 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', description: 'Description 3' }
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders radio group with correct id', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toBeInTheDocument();
  });

  it('renders all radio options correctly', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
    
    expect(radioButtons[0]).toHaveAttribute('value', 'option1');
    expect(radioButtons[1]).toHaveAttribute('value', 'option2');
    expect(radioButtons[2]).toHaveAttribute('value', 'option3');
  });

  it('displays option labels correctly', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('displays option descriptions when provided', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 3')).toBeInTheDocument();
  });

  it('handles options without descriptions', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    // Option 2 doesn't have a description
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('sets correct checked state for selected value', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option2"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).not.toBeChecked();
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[2]).not.toBeChecked();
  });

  it('calls onChange when radio option is clicked', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const option2Radio = screen.getByDisplayValue('option2');
    fireEvent.click(option2Radio);

    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('calls onChange with correct value for different option', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const option3Radio = screen.getByDisplayValue('option3');
    fireEvent.click(option3Radio);

    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });

  it('handles empty options array', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={[]}
        value=""
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.queryAllByRole('radio');
    expect(radioButtons).toHaveLength(0);
  });

  it('handles single option', () => {
    const singleOption = [{ value: 'single', label: 'Single Option' }];
    
    render(
      <RadioGroup
        id="test-radio-group"
        options={singleOption}
        value="single"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(1);
    expect(radioButtons[0]).toHaveAttribute('value', 'single');
    expect(radioButtons[0]).toBeChecked();
  });

  it('handles empty string value', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).not.toBeChecked();
    });
  });

  it('handles undefined value gracefully', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value={undefined as any}
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
  });

  it('handles null value gracefully', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value={null as any}
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
  });

  it('generates unique ids for each radio option', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).toHaveAttribute('id', 'test-radio-group-option1');
    expect(radioButtons[1]).toHaveAttribute('id', 'test-radio-group-option2');
    expect(radioButtons[2]).toHaveAttribute('id', 'test-radio-group-option3');
  });

  it('sets correct name attribute for all radio buttons', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'test-radio-group');
    });
  });

  it('has correct CSS classes for container', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const container = screen.getByRole('radiogroup');
    expect(container).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'gap-3');
  });

  it('has correct CSS classes for radio inputs', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveClass('peer', 'absolute', 'opacity-0', 'appearance-none', 'w-full', 'h-full', 'cursor-pointer');
    });
  });

  it('has correct CSS classes for labels', () => {
    render(
      <RadioGroup
        id="test-radio-group"
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />
    );

    const labels = screen.getAllByText(/Option \d/);
    labels.forEach(label => {
      expect(label).toHaveClass('block', 'p-3', 'border', 'border-gray-700', 'rounded-md', 'text-sm', 'cursor-pointer', 'bg-[#1a1f35]', 'hover:bg-[#262c4a]', 'peer-checked:border-blue-500', 'peer-checked:bg-[#1a2645]', 'text-white');
    });
  });

  it('handles options with special characters in labels', () => {
    const specialOptions = [
      { value: 'special1', label: 'Option & Special < > " \' Characters' },
      { value: 'special2', label: 'Option with numbers 123' }
    ];

    render(
      <RadioGroup
        id="test-radio-group"
        options={specialOptions}
        value="special1"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Option & Special < > " \' Characters')).toBeInTheDocument();
    expect(screen.getByText('Option with numbers 123')).toBeInTheDocument();
  });

  it('handles options with empty labels', () => {
    const emptyLabelOptions = [
      { value: 'empty1', label: '' },
      { value: 'empty2', label: 'Normal Label' }
    ];

    render(
      <RadioGroup
        id="test-radio-group"
        options={emptyLabelOptions}
        value="empty1"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(2);
    expect(radioButtons[0]).toHaveAttribute('value', 'empty1');
    expect(radioButtons[1]).toHaveAttribute('value', 'empty2');
  });

  it('handles options with duplicate values', () => {
    const duplicateValueOptions = [
      { value: 'duplicate', label: 'First Option' },
      { value: 'duplicate', label: 'Second Option' }
    ];

    render(
      <RadioGroup
        id="test-radio-group"
        options={duplicateValueOptions}
        value="duplicate"
        onChange={mockOnChange}
      />
    );

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(2);
    expect(radioButtons[0]).toHaveAttribute('value', 'duplicate');
    expect(radioButtons[1]).toHaveAttribute('value', 'duplicate');
  });
});
