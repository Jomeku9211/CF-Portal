import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HiringIntent } from '../../../components/onboarding/HiringIntent';

// Test if we can import the component
describe('HiringIntent Import Test', () => {
  test('can import HiringIntent component', () => {
    expect(HiringIntent).toBeDefined();
    expect(typeof HiringIntent).toBe('function');
  });
});

// Mock the auth context
const mockUseAuth = {
  user: { id: 'test-user-id', email: 'test@example.com' },
  setUser: jest.fn(),
  isLoading: false,
  login: jest.fn(),
  signup: jest.fn(),
  logout: jest.fn(),
  checkAuth: jest.fn(),
};

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth,
}));

// Mock userService
jest.mock('../../../services/userService', () => ({
  userService: {
    updateUserById: jest.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HiringIntent Component', () => {
  let mockUpdateUserById: jest.MockedFunction<any>;

  const defaultProps = {
    onNext: jest.fn(),
    onBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateUserById = require('../../../services/userService').userService.updateUserById as jest.MockedFunction<any>;
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'authToken') return 'test-token';
      if (key === 'lastOrganizationId') return 'org-123';
      if (key === 'organizationName') return 'Test Organization';
      if (key === 'lastTeamId') return 'team-123';
      if (key === 'teamName') return 'Development Team';
      return null;
    });
    mockUpdateUserById.mockResolvedValue({ success: true });
  });

  const renderComponent = (component: React.ReactElement) => {
    return render(component);
  };

  describe('Rendering', () => {
    test('renders hiring intent form', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      expect(screen.getByText('Hiring Intent')).toBeInTheDocument();
      expect(screen.getByText('Let\'s capture high-level information about your hiring needs.')).toBeInTheDocument();
    });

    test('renders all form fields', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      // Basic fields
      expect(screen.getByText('Role Title')).toBeInTheDocument();
      expect(screen.getByText('Number of Hires Planned')).toBeInTheDocument();
      expect(screen.getByText('When Do You Want to Hire?')).toBeInTheDocument();
      expect(screen.getByText('Employment Type')).toBeInTheDocument();
      expect(screen.getByText('Location Preference')).toBeInTheDocument();
      expect(screen.getByText('Salary Range (Optional)')).toBeInTheDocument();
      expect(screen.getByText('Equity available')).toBeInTheDocument();
    });

    test('shows navigation buttons', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    test('calls onBack when back button is clicked', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      const backButton = screen.getByText('Back');
      act(() => {
        fireEvent.click(backButton);
      });
      
      expect(defaultProps.onBack).toHaveBeenCalled();
    });

    test('calls onNext when continue button is clicked', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      const continueButton = screen.getByText('Continue');
      act(() => {
        fireEvent.click(continueButton);
      });
      
      expect(defaultProps.onNext).toHaveBeenCalled();
    });
  });

  describe('Form Data Management', () => {
    test('updates form data when fields change', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      const roleTitleInput = screen.getByPlaceholderText('e.g. Frontend Developer');
      act(() => {
        fireEvent.change(roleTitleInput, { target: { value: 'Backend Developer' } });
      });
      
      expect(roleTitleInput).toHaveValue('Backend Developer');
    });

    test('calls onNext when continue button is clicked', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      const continueButton = screen.getByText('Continue');
      act(() => {
        fireEvent.click(continueButton);
      });
      
      expect(defaultProps.onNext).toHaveBeenCalled();
    });
  });

  describe('Form Validation', () => {
    test('has proper form structure', () => {
      renderComponent(<HiringIntent {...defaultProps} />);
      
      // Check that form has proper structure
      expect(screen.getByText('Role Title')).toBeInTheDocument();
      expect(screen.getByText('Number of Hires Planned')).toBeInTheDocument();
      expect(screen.getByText('When Do You Want to Hire?')).toBeInTheDocument();
      expect(screen.getByText('Employment Type')).toBeInTheDocument();
      expect(screen.getByText('Location Preference')).toBeInTheDocument();
      expect(screen.getByText('Salary Range (Optional)')).toBeInTheDocument();
    });
  });
});
