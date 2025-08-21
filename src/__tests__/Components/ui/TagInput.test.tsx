import { render, screen, fireEvent } from '@testing-library/react';
import { TagInput } from '../../../components/ui/TagInput';

describe('TagInput', () => {
  const defaultProps = {
    value: [],
    onChange: jest.fn(),
    placeholder: 'Add a tag...',
    maxTags: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with empty tags', () => {
    render(<TagInput {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Add a tag...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders existing tags', () => {
    const tags = ['tag1', 'tag2'];
    render(<TagInput {...defaultProps} value={tags} />);
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('adds a new tag', () => {
    render(<TagInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'new tag' } });
    fireEvent.click(addButton);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['new tag']);
  });

  it('does not add duplicate tags', () => {
    const tags = ['existing tag'];
    render(<TagInput {...defaultProps} value={tags} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'existing tag' } });
    fireEvent.click(addButton);
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('removes a tag when clicking remove button', () => {
    const tags = ['tag1', 'tag2', 'tag3'];
    render(<TagInput {...defaultProps} value={tags} />);
    
    const removeButtons = screen.getAllByRole('button').slice(1); // Skip the add button
    fireEvent.click(removeButtons[1]); // Remove tag2
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['tag1', 'tag3']);
  });

  it('clears input after adding a tag', () => {
    render(<TagInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'new tag' } });
    fireEvent.click(addButton);
    
    expect(input).toHaveValue('');
  });

  it('adds tag on Enter key press', () => {
    render(<TagInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    
    fireEvent.change(input, { target: { value: 'new tag' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['new tag']);
  });

  it('does not add empty tags', () => {
    render(<TagInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('respects max tags limit', () => {
    const tags = ['tag1', 'tag2'];
    render(<TagInput {...defaultProps} value={tags} maxTags={2} />);
    
    const input = screen.getByPlaceholderText('Maximum 2 tags');
    const addButton = screen.getByRole('button');
    
    expect(input).toBeDisabled();
    expect(addButton).toBeDisabled();
  });

  it('enables input when under max tags limit', () => {
    const tags = ['tag1'];
    render(<TagInput {...defaultProps} value={tags} maxTags={2} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    expect(input).not.toBeDisabled();
    expect(addButton).not.toBeDisabled();
  });

  it('handles edge case with maxTags being 0', () => {
    render(<TagInput {...defaultProps} maxTags={0} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    expect(input).toBeDisabled();
    expect(addButton).toBeDisabled();
  });

  it('trims whitespace from tags', () => {
    render(<TagInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: '  trimmed tag  ' } });
    fireEvent.click(addButton);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['trimmed tag']);
  });

  it('handles special characters in tags', () => {
    render(<TagInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'tag-with-dashes' } });
    fireEvent.click(addButton);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['tag-with-dashes']);
  });

  it('calls onChange with empty array when all tags are removed', () => {
    const tags = ['tag1'];
    render(<TagInput {...defaultProps} value={tags} />);
    
    const removeButton = screen.getAllByRole('button')[1]; // Second button is remove
    fireEvent.click(removeButton);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
  });

  it('handles rapid tag additions', () => {
    render(<TagInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Add a tag...');
    const addButton = screen.getByRole('button');
    
    // Add first tag
    fireEvent.change(input, { target: { value: 'tag1' } });
    fireEvent.click(addButton);
    
    // Add second tag immediately
    fireEvent.change(input, { target: { value: 'tag2' } });
    fireEvent.click(addButton);
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(2);
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(1, ['tag1']);
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(2, ['tag1', 'tag2']);
  });
});
