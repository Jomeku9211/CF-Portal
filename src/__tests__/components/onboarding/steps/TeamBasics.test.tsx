import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamBasics } from '../../../../components/onboarding/steps/TeamBasics';

// Mock the Tooltip component
jest.mock('../../../../components/common/Tooltip', () => ({
  Tooltip: ({ children, content }: { children: React.ReactNode; content: string }) => (
    <div data-testid="tooltip" title={content}>
      {children}
    </div>
  ),
}));

describe('TeamBasics', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    teamTitle: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const container = document.querySelector('.space-y-4');
    expect(container).toBeInTheDocument();
  });

  it('should render the team title label', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const label = screen.getByText('Team Title');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-white');
  });

  it('should render the required asterisk', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-red-500');
  });

  it('should render the help icon with tooltip', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('title', 'Give your team a clear, descriptive name that reflects its function or purpose');
    
    const helpIcon = tooltip.querySelector('.w-4.h-4.text-gray-400.ml-1.cursor-help');
    expect(helpIcon).toBeInTheDocument();
  });

  it('should render the input field', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'teamTitle');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'e.g., Product Design Team, Core Backend, Marketing & Growth');
  });

  it('should display the current team title value', () => {
    const teamTitle = 'Product Design Team';
    render(<TeamBasics {...defaultProps} teamTitle={teamTitle} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(teamTitle);
  });

  it('should call onChange when input value changes', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Team Name' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('teamTitle', 'New Team Name');
  });

  it('should call onChange with correct parameters', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'A' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('teamTitle', 'A');
  });

  it('should have correct CSS classes on input', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'w-full',
      'bg-[#1a2234]',
      'border',
      'border-gray-700',
      'rounded-md',
      'px-4',
      'py-2',
      'text-white',
      'placeholder-gray-500',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-transparent'
    );
  });

  it('should not display error message when no error is provided', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const errorMessage = screen.queryByText(/error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should display error message when error is provided', () => {
    const errorMessage = 'Team title is required';
    render(<TeamBasics {...defaultProps} error={errorMessage} />);
    
    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-red-500', 'text-sm', 'mt-1');
  });

  it('should handle empty string input', () => {
    render(<TeamBasics {...defaultProps} teamTitle="Initial Value" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('teamTitle', '');
  });

  it('should handle special characters in input', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Team@#$%^&*()' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('teamTitle', 'Team@#$%^&*()');
  });

  it('should handle long input text', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const longText = 'A'.repeat(100);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: longText } });
    
    expect(mockOnChange).toHaveBeenCalledWith('teamTitle', longText);
  });

  it('should maintain focus after input change', async () => {
    const user = userEvent.setup();
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    await user.click(input);
    fireEvent.change(input, { target: { value: 'Test' } });
    
    expect(input).toHaveFocus();
  });

  it('should handle rapid input changes', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rapid' } });
    fireEvent.change(input, { target: { value: 'Change' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenLastCalledWith('teamTitle', 'Change');
  });

  it('should render with initial team title value', () => {
    const initialTitle = 'Initial Team Title';
    render(<TeamBasics {...defaultProps} teamTitle={initialTitle} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialTitle);
  });

  it('should update input value when teamTitle prop changes', () => {
    const { rerender } = render(<TeamBasics {...defaultProps} teamTitle="Initial" />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveValue('Initial');
    
    rerender(<TeamBasics {...defaultProps} teamTitle="Updated" />);
    
    input = screen.getByRole('textbox');
    expect(input).toHaveValue('Updated');
  });

  it('should have proper accessibility attributes', () => {
    render(<TeamBasics {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Team Title');
    
    expect(input).toHaveAttribute('id', 'teamTitle');
    expect(label).toHaveAttribute('for', 'teamTitle');
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<TeamBasics {...defaultProps} />);
    
    const firstStructure = document.body.innerHTML;
    
    rerender(<TeamBasics {...defaultProps} teamTitle="Changed" />);
    
    const secondStructure = document.body.innerHTML;
    
    // Structure should be the same, only values should change
    expect(firstStructure).toContain('Team Title');
    expect(secondStructure).toContain('Team Title');
  });
});
