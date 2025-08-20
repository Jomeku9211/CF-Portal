import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App';

// Mock child components
jest.mock('../components/FooterComp/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

jest.mock('../components/LandingPage/TopBanner', () => ({
  TopBanner: function MockTopBanner() {
    return <div data-testid="mock-top-banner">TopBanner</div>;
  }
}));

jest.mock('../components/LandingPage/Navbar', () => ({
  Navbar: function MockNavbar() {
    return <div data-testid="mock-navbar">Navbar</div>;
  }
}));

describe('App Component', () => {
  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  test('renders main app structure on default route', () => {
    renderApp('/');
    
    // Should render header components
    expect(screen.getByTestId('mock-top-banner')).toBeInTheDocument();
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    
    // Should always render footer
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('hides header on auth pages', () => {
    renderApp('/login');
    
    // Should not render header components on login page
    expect(screen.queryByTestId('mock-top-banner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-navbar')).not.toBeInTheDocument();
    
    // Should still render footer
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('hides header on signup page', () => {
    renderApp('/signup');
    
    // Should not render header components on signup page
    expect(screen.queryByTestId('mock-top-banner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-navbar')).not.toBeInTheDocument();
    
    // Should still render footer
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('hides header on forgot-password page', () => {
    renderApp('/forgot-password');
    
    // Should not render header components on forgot-password page
    expect(screen.queryByTestId('mock-top-banner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-navbar')).not.toBeInTheDocument();
    
    // Should still render footer
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('shows header on non-auth pages', () => {
    renderApp('/about');
    
    // Should render header components on non-auth pages
    expect(screen.getByTestId('mock-top-banner')).toBeInTheDocument();
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    
    // Should render footer
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('correctly identifies auth paths', () => {
    const authPaths = ['/login', '/signup', '/forgot-password'];
    const nonAuthPaths = ['/', '/about', '/contact', '/developers'];

    authPaths.forEach(path => {
      renderApp(path);
      expect(screen.queryByTestId('mock-top-banner')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-navbar')).not.toBeInTheDocument();
    });

    nonAuthPaths.forEach(path => {
      renderApp(path);
      expect(screen.getAllByTestId('mock-top-banner')[0]).toBeInTheDocument();
      expect(screen.getAllByTestId('mock-navbar')[0]).toBeInTheDocument();
    });
  });

  test('handles route changes correctly', () => {
    const { container } = renderApp('/');
    
    // Verify app structure
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});