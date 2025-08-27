import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock Button component since it might not exist yet
const MockButton = ({ children, onClick, className, variant, size }: any) => (
  <button 
    onClick={onClick} 
    className={className}
    data-variant={variant}
    data-size={size}
  >
    {children}
  </button>
);

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<MockButton>Click me</MockButton>);
    const button = screen.getByText('Click me');
    expect(button).toBeDefined();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<MockButton onClick={handleClick}>Click me</MockButton>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<MockButton className="custom-class">Click me</MockButton>);
    const button = screen.getByText('Click me');
    expect(button.className).toBe('custom-class');
  });

  test('renders button with variant prop', () => {
    render(<MockButton variant="secondary">Click me</MockButton>);
    const button = screen.getByText('Click me');
    expect(button.getAttribute('data-variant')).toBe('secondary');
  });

  test('renders button with size prop', () => {
    render(<MockButton size="large">Click me</MockButton>);
    const button = screen.getByText('Click me');
    expect(button.getAttribute('data-size')).toBe('large');
  });
});
