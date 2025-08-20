import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthButton } from '../../../components/common/AuthButton';

describe('AuthButton', () => {
  const defaultProps = {
    children: 'Click me',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    render(<AuthButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('should render with primary variant by default', () => {
    render(<AuthButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-green-500', 'hover:bg-green-600', 'text-white');
  });

  it('should render with secondary variant', () => {
    render(<AuthButton {...defaultProps} variant="secondary" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600', 'hover:bg-blue-700', 'text-white');
  });

  it('should render with outline variant', () => {
    render(<AuthButton {...defaultProps} variant="outline" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent', 'border', 'border-gray-600', 'text-gray-300');
  });

  it('should apply fullWidth class when fullWidth is true', () => {
    render(<AuthButton {...defaultProps} fullWidth={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('should not apply fullWidth class when fullWidth is false', () => {
    render(<AuthButton {...defaultProps} fullWidth={false} />);
    
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('w-full');
  });

  it('should render icon when provided', () => {
    const icon = <span data-testid="test-icon">🚀</span>;
    render(<AuthButton {...defaultProps} icon={icon} />);
    
    const iconElement = screen.getByTestId('test-icon');
    expect(iconElement).toBeInTheDocument();
    
    // The mr-2 class is applied to the span wrapper, not the icon itself
    const iconWrapper = iconElement.closest('.mr-2');
    expect(iconWrapper).toBeInTheDocument();
  });

  it('should not render icon when not provided', () => {
    render(<AuthButton {...defaultProps} />);
    
    const iconContainer = document.querySelector('.mr-2');
    expect(iconContainer).not.toBeInTheDocument();
  });

  it('should render children correctly', () => {
    const customChildren = <span data-testid="custom-content">Custom Button Text</span>;
    render(<AuthButton>{customChildren}</AuthButton>);
    
    const customContent = screen.getByTestId('custom-content');
    expect(customContent).toBeInTheDocument();
    expect(customContent).toHaveTextContent('Custom Button Text');
  });

  it('should have base classes applied', () => {
    render(<AuthButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'flex', 'items-center', 'justify-center', 'rounded-md', 'px-4', 'py-2.5',
      'font-medium', 'transition-colors', 'focus:outline-none', 'focus:ring-2',
      'focus:ring-offset-1', 'focus:ring-offset-[#1a2031]'
    );
  });

  it('should have correct focus ring colors for primary variant', () => {
    render(<AuthButton {...defaultProps} variant="primary" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:ring-green-500');
  });

  it('should have correct focus ring colors for secondary variant', () => {
    render(<AuthButton {...defaultProps} variant="secondary" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:ring-blue-500');
  });

  it('should have correct focus ring colors for outline variant', () => {
    render(<AuthButton {...defaultProps} variant="outline" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:ring-gray-500');
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<AuthButton {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle disabled state', () => {
    render(<AuthButton {...defaultProps} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should handle enabled state', () => {
    render(<AuthButton {...defaultProps} disabled={false} />);
    
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should pass through additional HTML attributes', () => {
    render(
      <AuthButton 
        {...defaultProps} 
        data-testid="custom-button"
        aria-label="Custom button label"
        type="submit"
      />
    );
    
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom button label');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should handle type attribute', () => {
    render(<AuthButton {...defaultProps} type="submit" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should handle custom className', () => {
    const customClass = 'custom-button-class';
    render(<AuthButton {...defaultProps} className={customClass} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });

  it('should handle custom className', () => {
    const customClass = 'custom-button-class';
    render(<AuthButton {...defaultProps} className={customClass} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
    
    // Note: The component doesn't combine custom className with default classes
    // It only applies the custom className as-is
  });

  it('should render with complex children', () => {
    const complexChildren = (
      <div>
        <span>Text 1</span>
        <strong>Text 2</strong>
        <em>Text 3</em>
      </div>
    );
    
    render(<AuthButton>{complexChildren}</AuthButton>);
    
    expect(screen.getByText('Text 1')).toBeInTheDocument();
    expect(screen.getByText('Text 2')).toBeInTheDocument();
    expect(screen.getByText('Text 3')).toBeInTheDocument();
  });

  it('should handle icon with complex structure', () => {
    const complexIcon = (
      <div data-testid="complex-icon">
        <span>🚀</span>
        <span>⚡</span>
      </div>
    );
    
    render(<AuthButton {...defaultProps} icon={complexIcon} />);
    
    const iconElement = screen.getByTestId('complex-icon');
    expect(iconElement).toBeInTheDocument();
    
    // The mr-2 class is applied to the span wrapper, not the icon itself
    const iconWrapper = iconElement.closest('.mr-2');
    expect(iconWrapper).toBeInTheDocument();
    expect(iconElement).toHaveTextContent('🚀⚡');
  });

  it('should maintain proper spacing with icon and children', () => {
    const icon = <span data-testid="icon">🎯</span>;
    render(<AuthButton {...defaultProps} icon={icon}>Button Text</AuthButton>);
    
    const iconElement = screen.getByTestId('icon');
    const button = screen.getByRole('button');
    
    // The mr-2 class is applied to the span wrapper, not the icon itself
    const iconWrapper = iconElement.closest('.mr-2');
    expect(iconWrapper).toBeInTheDocument();
    expect(button).toHaveTextContent('🎯Button Text');
  });

  it('should handle all variant combinations with fullWidth', () => {
    const variants = ['primary', 'secondary', 'outline'] as const;
    
    variants.forEach(variant => {
      const { unmount } = render(
        <AuthButton {...defaultProps} variant={variant} fullWidth={true} />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
      
      // Check variant-specific classes
      if (variant === 'primary') {
        expect(button).toHaveClass('bg-green-500');
      } else if (variant === 'secondary') {
        expect(button).toHaveClass('bg-blue-600');
      } else if (variant === 'outline') {
        expect(button).toHaveClass('bg-transparent', 'border');
      }
      
      unmount();
    });
  });

  it('should handle button with only icon and minimal children', () => {
    const icon = <span data-testid="icon-only">🎯</span>;
    render(<AuthButton icon={icon}> </AuthButton>);
    
    const button = screen.getByRole('button');
    const iconElement = screen.getByTestId('icon-only');
    
    expect(button).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(button).toHaveTextContent('🎯');
  });

  it('should handle button with only children and no icon', () => {
    render(<AuthButton>Text Only</AuthButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Text Only');
    
    const iconContainer = document.querySelector('.mr-2');
    expect(iconContainer).not.toBeInTheDocument();
  });

  it('should have correct hover states for all variants', () => {
    const variants = ['primary', 'secondary', 'outline'] as const;
    
    variants.forEach(variant => {
      const { unmount } = render(
        <AuthButton {...defaultProps} variant={variant} />
      );
      
      const button = screen.getByRole('button');
      
      if (variant === 'primary') {
        expect(button).toHaveClass('hover:bg-green-600');
      } else if (variant === 'secondary') {
        expect(button).toHaveClass('hover:bg-blue-700');
      } else if (variant === 'outline') {
        expect(button).toHaveClass('hover:bg-gray-800');
      }
      
      unmount();
    });
  });

  it('should maintain accessibility attributes', () => {
    render(
      <AuthButton 
        {...defaultProps} 
        aria-label="Accessible button"
        aria-describedby="description"
        role="button"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Accessible button');
    expect(button).toHaveAttribute('aria-describedby', 'description');
    expect(button).toHaveAttribute('role', 'button');
  });
});
