import { render, screen } from '@testing-library/react';
import ContentHubPage from '../../../views/ContentHub/ContentHub';

describe('ContentHubPage', () => {
  it('should render the component correctly', () => {
    render(<ContentHubPage />);
    
    const container = screen.getByTestId('ContentHubId');
    expect(container).toBeInTheDocument();
  });

  it('should have correct data-testid attribute', () => {
    render(<ContentHubPage />);
    
    const container = screen.getByTestId('ContentHubId');
    expect(container).toHaveAttribute('data-testid', 'ContentHubId');
  });

  it('should render with correct DOM structure', () => {
    render(<ContentHubPage />);
    
    const container = screen.getByTestId('ContentHubId');
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('DIV');
  });
});
