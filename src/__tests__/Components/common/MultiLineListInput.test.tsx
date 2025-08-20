import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiLineListInput } from '../../../components/common/MultiLineListInput';

describe('MultiLineListInput', () => {
  const defaultProps = {
    label: 'Test Items',
    value: [],
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<MultiLineListInput {...defaultProps} />);
    
    const label = screen.getByText('Test Items');
    expect(label).toBeInTheDocument();
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    
    const addButton = screen.getByRole('button');
    expect(addButton).toBeInTheDocument();
  });

  it('should render the label with required asterisk when required is true', () => {
    render(<MultiLineListInput {...defaultProps} required={true} />);
    
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-red-400', 'ml-1');
  });

  it('should render placeholder text', () => {
    const placeholder = 'Enter item here';
    render(<MultiLineListInput {...defaultProps} placeholder={placeholder} />);
    
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';
    render(<MultiLineListInput {...defaultProps} className={customClass} />);
    
    const container = document.querySelector(`.${customClass}`);
    expect(container).toBeInTheDocument();
  });

  it('should generate correct input id from label', () => {
    render(<MultiLineListInput {...defaultProps} label="My Test Label" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'my-test-label-input');
  });

  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    render(<MultiLineListInput {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'new item');
    
    expect(input).toHaveValue('new item');
  });

  it('should add item when clicking add button', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<MultiLineListInput {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button');
    
    await user.type(input, 'new item');
    await user.click(addButton);
    
    expect(mockOnChange).toHaveBeenCalledWith(['new item']);
  });

  it('should add item when pressing Enter key', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<MultiLineListInput {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'new item');
    await user.keyboard('{Enter}');
    
    expect(mockOnChange).toHaveBeenCalledWith(['new item']);
  });

  it('should clear input after adding item', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<MultiLineListInput {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'new item');
    await user.keyboard('{Enter}');
    
    expect(input).toHaveValue('');
  });

  it('should not add empty or whitespace-only items', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<MultiLineListInput {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button');
    
    // Try to add empty string
    await user.click(addButton);
    expect(mockOnChange).not.toHaveBeenCalled();
    
    // Try to add whitespace only
    await user.type(input, '   ');
    await user.click(addButton);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should trim whitespace from items before adding', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<MultiLineListInput {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    
    await user.type(input, '  new item  ');
    await user.keyboard('{Enter}');
    
    expect(mockOnChange).toHaveBeenCalledWith(['new item']);
  });

  it('should render existing items in the list', () => {
    const existingItems = ['item 1', 'item 2', 'item 3'];
    render(<MultiLineListInput {...defaultProps} value={existingItems} />);
    
    existingItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should remove item when clicking remove button', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    const existingItems = ['item 1', 'item 2', 'item 3'];
    render(<MultiLineListInput {...defaultProps} value={existingItems} onChange={mockOnChange} />);
    
    const removeButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg') && button.querySelector('svg')?.classList.contains('lucide-x')
    );
    
    await user.click(removeButtons[1]); // Remove second item (index 1)
    
    expect(mockOnChange).toHaveBeenCalledWith(['item 1', 'item 3']);
  });

  it('should disable add button when input is empty', () => {
    render(<MultiLineListInput {...defaultProps} />);
    
    const addButton = screen.getByRole('button');
    expect(addButton).toBeDisabled();
  });

  it('should enable add button when input has content', async () => {
    const user = userEvent.setup();
    render(<MultiLineListInput {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button');
    
    expect(addButton).toBeDisabled();
    
    await user.type(input, 'new item');
    expect(addButton).not.toBeDisabled();
  });

  it('should enforce maxItems limit', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    const maxItems = 3;
    const existingItems = ['item 1', 'item 2'];
    
    const { rerender } = render(
      <MultiLineListInput 
        {...defaultProps} 
        value={existingItems} 
        onChange={mockOnChange} 
        maxItems={maxItems}
      />
    );
    
    const input = screen.getByRole('textbox');
    
    // Add one more item (should work)
    await user.type(input, 'item 3');
    await user.keyboard('{Enter}');
    expect(mockOnChange).toHaveBeenCalledWith(['item 1', 'item 2', 'item 3']);
    
    mockOnChange.mockClear();
    
    // Rerender with maxed out items
    const maxedItems = ['item 1', 'item 2', 'item 3'];
    rerender(
      <MultiLineListInput 
        {...defaultProps} 
        value={maxedItems} 
        onChange={mockOnChange} 
        maxItems={maxItems}
      />
    );
    
    const newInput = screen.getByRole('textbox');
    await user.type(newInput, 'item 4');
    await user.keyboard('{Enter}');
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should disable add button when maxItems is reached', () => {
    const maxItems = 2;
    const existingItems = ['item 1', 'item 2'];
    
    render(
      <MultiLineListInput 
        {...defaultProps} 
        value={existingItems} 
        maxItems={maxItems}
      />
    );
    
    // Get the add button specifically (not the remove buttons)
    const addButton = screen.getAllByRole('button').find(button => 
      button.querySelector('svg')?.classList.contains('lucide-plus')
    );
    expect(addButton).toBeDisabled();
  });

  it('should show maxItems warning message when limit is reached', () => {
    const maxItems = 2;
    const existingItems = ['item 1', 'item 2'];
    
    render(
      <MultiLineListInput 
        {...defaultProps} 
        value={existingItems} 
        maxItems={maxItems}
      />
    );
    
    const warningMessage = screen.getByText('Maximum 2 items allowed');
    expect(warningMessage).toBeInTheDocument();
    expect(warningMessage).toHaveClass('text-sm', 'text-gray-400');
  });

  it('should not show maxItems warning when under limit', () => {
    const maxItems = 3;
    const existingItems = ['item 1'];
    
    render(
      <MultiLineListInput 
        {...defaultProps} 
        value={existingItems} 
        maxItems={maxItems}
      />
    );
    
    const warningMessage = screen.queryByText('Maximum 3 items allowed');
    expect(warningMessage).not.toBeInTheDocument();
  });

  it('should not show items list when value is empty', () => {
    render(<MultiLineListInput {...defaultProps} value={[]} />);
    
    const itemsContainer = document.querySelector('.space-y-2');
    expect(itemsContainer).not.toBeInTheDocument();
  });

  it('should show items list when value has items', () => {
    const existingItems = ['item 1'];
    render(<MultiLineListInput {...defaultProps} value={existingItems} />);
    
    const itemsContainer = document.querySelector('.space-y-2');
    expect(itemsContainer).toBeInTheDocument();
  });

  it('should handle keypress events other than Enter', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<MultiLineListInput {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'test');
    await user.keyboard('{Tab}');
    
    // Should not add item on Tab press
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('test');
  });

  it('should handle Enter key correctly and add item', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<MultiLineListInput {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    
    // Type some text and press Enter
    await user.type(input, 'test item{Enter}');
    
    // Should add the item and clear the input
    expect(mockOnChange).toHaveBeenCalledWith(['test item']);
    expect(input).toHaveValue('');
  });

  it('should have correct CSS classes and styling', () => {
    render(<MultiLineListInput {...defaultProps} />);
    
    const container = document.querySelector('.space-y-3');
    expect(container).toBeInTheDocument();
    
    const label = screen.getByText('Test Items');
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-300');
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'flex-1', 'px-4', 'py-3', 'bg-[#1e293b]', 'border', 'border-[#2a3344]',
      'rounded-lg', 'text-white', 'placeholder-gray-400'
    );
    
    const addButton = screen.getByRole('button');
    expect(addButton).toHaveClass(
      'px-4', 'py-3', 'bg-[#3b82f6]', 'text-white', 'rounded-lg'
    );
  });

  it('should render with default maxItems value', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    // Create 10 items (default maxItems)
    const items = Array.from({ length: 10 }, (_, i) => `item ${i + 1}`);
    
    render(<MultiLineListInput {...defaultProps} value={items} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'item 11');
    await user.keyboard('{Enter}');
    
    // Should not add item since we're at the default maxItems limit (10)
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
