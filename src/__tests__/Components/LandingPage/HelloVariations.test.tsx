
import { render, screen } from '@testing-library/react';
import HelloVariations from '../../../components/LandingPage/HelloVariations';

describe('HelloVariations', () => {
  it('should render the component correctly', () => {
    render(<HelloVariations />);
    
    const component = screen.getByTestId('HelloVariation');
    expect(component).toBeInTheDocument();
  });

  it('should contain the hello section', () => {
    render(<HelloVariations />);
    
    const helloSection = screen.getByTestId('HelloVariation').querySelector('.hello-section');
    expect(helloSection).toBeInTheDocument();
  });

  it('should contain the box container', () => {
    render(<HelloVariations />);
    
    const boxContainer = screen.getByTestId('HelloVariation').querySelector('.box_of_HelloVariations');
    expect(boxContainer).toBeInTheDocument();
  });

  it('should have the correct CSS class structure', () => {
    render(<HelloVariations />);
    
    const component = screen.getByTestId('HelloVariation');
    const boxContainer = component.querySelector('.box_of_HelloVariations');
    const helloSection = component.querySelector('.hello-section');
    
    expect(boxContainer).toHaveClass('box_of_HelloVariations');
    expect(helloSection).toHaveClass('hello-section');
  });

  it('should render without crashing', () => {
    expect(() => render(<HelloVariations />)).not.toThrow();
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<HelloVariations />);
    
    const firstRender = screen.getByTestId('HelloVariation');
    const firstStructure = firstRender.innerHTML;
    
    rerender(<HelloVariations />);
    
    const secondRender = screen.getByTestId('HelloVariation');
    const secondStructure = secondRender.innerHTML;
    
    expect(firstStructure).toBe(secondStructure);
  });
});
