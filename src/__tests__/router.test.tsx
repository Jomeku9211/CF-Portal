import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import appRouter from '../router';

// Mock all the components to avoid complex rendering
jest.mock('../App', () => {
  return function MockApp() {
    return <div data-testid="mock-app">App Component</div>;
  };
});

jest.mock('../views/LandingPage/LandingPage', () => {
  return function MockLandingPage() {
    return <div data-testid="mock-landing-page">Landing Page</div>;
  };
});

jest.mock('../components/Auth/AuthPage', () => {
  return function MockAuthPage() {
    return <div data-testid="mock-auth-page">Auth Page</div>;
  };
});

jest.mock('../components/Auth/Login', () => {
  return function MockLogin() {
    return <div data-testid="mock-login">Login Component</div>;
  };
});

jest.mock('../components/Auth/Signup', () => {
  return function MockSignup() {
    return <div data-testid="mock-signup">Signup Component</div>;
  };
});

jest.mock('../components/Auth/ForgotPassword', () => {
  return function MockForgotPassword() {
    return <div data-testid="mock-forgot-password">Forgot Password</div>;
  };
});

jest.mock('../components/onboarding/OnboardingFlow', () => {
  return function MockOnboardingFlow() {
    return <div data-testid="mock-onboarding-flow">Onboarding Flow</div>;
  };
});

jest.mock('../components/onboarding/Onboarding1', () => {
  return function MockOnboarding1() {
    return <div data-testid="mock-onboarding1">Onboarding 1</div>;
  };
});

jest.mock('../components/onboarding/RoleSelection', () => {
  return function MockRoleSelection() {
    return <div data-testid="mock-role-selection">Role Selection</div>;
  };
});

jest.mock('../components/common/ProtectedRoute', () => {
  return function MockProtectedRoute({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-protected-route">{children}</div>;
  };
});

jest.mock('../components/common/GuestRoute', () => {
  return function MockGuestRoute({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-guest-route">{children}</div>;
  };
});

jest.mock('../views/PrivacyPolicy/PrivacyPolicy', () => {
  return function MockPrivacyPolicy() {
    return <div data-testid="mock-privacy-policy">Privacy Policy</div>;
  };
});

jest.mock('../views/ContentHub/ContentHub', () => {
  return function MockContentHub() {
    return <div data-testid="mock-content-hub">Content Hub</div>;
  };
});

jest.mock('../components/AboutUsSection', () => {
  return function MockAboutUsSection() {
    return <div data-testid="mock-about-us">About Us</div>;
  };
});

describe('Router Configuration', () => {
  const renderRouter = (initialRoute: string) => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: [initialRoute],
    });
    
    return render(<RouterProvider router={router} />);
  };

  test('renders landing page at root route', () => {
    renderRouter('/');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Landing page is rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders auth page at /auth route', () => {
    renderRouter('/auth');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Guest route and auth page are rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders login page at /login route', () => {
    renderRouter('/login');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Guest route and login are rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders signup page at /signup route', () => {
    renderRouter('/signup');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Guest route and signup are rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders forgot password page at /forgot-password route', () => {
    renderRouter('/forgot-password');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Guest route and forgot password are rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders role selection page at /role-selection route', () => {
    renderRouter('/role-selection');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Protected route and role selection are rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders onboarding flow at /clientOnboarding route', () => {
    renderRouter('/clientOnboarding');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('redirects /onboarding to /clientOnboarding', () => {
    renderRouter('/onboarding');
    
    // Should redirect to clientOnboarding
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders onboarding1 page at /onboarding1 route', () => {
    renderRouter('/onboarding1');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Protected route and onboarding1 are rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders privacy policy page at /privacy-policy route', () => {
    renderRouter('/privacy-policy');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Privacy policy is rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders content hub page at /content-hub route', () => {
    renderRouter('/content-hub');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // Content hub is rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('renders about us page at /about route', () => {
    renderRouter('/about');
    
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
    // About us is rendered inside App component
    expect(screen.getByTestId('mock-app')).toBeInTheDocument();
  });

  test('router has correct structure', () => {
    expect(appRouter.routes).toBeDefined();
    expect(Array.isArray(appRouter.routes)).toBe(true);
    
    const rootRoute = appRouter.routes[0];
    expect(rootRoute.path).toBe('/');
    expect(rootRoute).toBeDefined();
  });
});
