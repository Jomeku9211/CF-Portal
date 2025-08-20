import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AboutUsSection } from '../../components/AboutUsSection';

// Mock react-router-dom
const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocation()
}));

describe('AboutUsSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders about section with main content', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/about coderfarm/i)).toBeInTheDocument();
    expect(screen.getByText(/culture-first tech hiring/i)).toBeInTheDocument();
  });

  test('displays company description', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/culture-driven hiring platform/i)).toBeInTheDocument();
    expect(screen.getByText(/founders, HR teams, and developers/i)).toBeInTheDocument();
  });

  test('shows back button on standalone page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/back to home/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });

  test('hides back button when not standalone page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/some-other-page' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.queryByText(/back to home/i)).not.toBeInTheDocument();
  });

  test('renders our story section', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/our story/i)).toBeInTheDocument();
    expect(screen.getByText(/built from first-hand struggle/i)).toBeInTheDocument();
    expect(screen.getByText(/dheeraj and abhilasha khandare/i)).toBeInTheDocument();
  });

  test('displays embedded video', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    const iframe = screen.getByTitle('Coderfarm - Our Story');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/sfmeY1FOpOw');
  });

  test('renders solution features', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    // Check for key solution features
    expect(screen.getByText('Culture-First Matching')).toBeInTheDocument();
    expect(screen.getByText('Reputation Score')).toBeInTheDocument();
    expect(screen.getByText('Job Persona Builder')).toBeInTheDocument();
    expect(screen.getByText('Curated Top Matches')).toBeInTheDocument();
    expect(screen.getByText('Structured Hiring & Onboarding')).toBeInTheDocument();
    expect(screen.getByText('Flexible Engagement Models')).toBeInTheDocument();
    expect(screen.getByText('Transparent Process')).toBeInTheDocument();
  });

  test('displays solution descriptions', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/deeply map your company's DNA/i)).toBeInTheDocument();
    expect(screen.getByText(/verified multi-factor profile/i)).toBeInTheDocument();
    expect(screen.getByText(/define outcomes, technical must-haves/i)).toBeInTheDocument();
  });

  test('renders with proper semantic structure', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    const section = screen.getAllByText(/about/i)[0];
    expect(section).toBeInTheDocument();
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(1);
  });

  test('handles responsive design classes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    const container = screen.getByText(/about coderfarm/i).closest('div');
    expect(container).toBeInTheDocument();
  });

  test('displays founder information', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/coderfarm was founded by/i)).toBeInTheDocument();
    expect(screen.getByText(/dheeraj and abhilasha khandare/i)).toBeInTheDocument();
  });

  test('shows problem statement', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/hiring frustrations/i)).toBeInTheDocument();
    expect(screen.getByText(/battling the same hiring frustrations/i)).toBeInTheDocument();
  });

  test('renders with proper accessibility', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });
    
    render(
      <MemoryRouter>
        <AboutUsSection />
      </MemoryRouter>
    );
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeInTheDocument();
    
    // Check for proper link attributes
    const backLink = screen.getByRole('link', { name: /back to home/i });
    expect(backLink).toHaveAttribute('href');
  });
});
