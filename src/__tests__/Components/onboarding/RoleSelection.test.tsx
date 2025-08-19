import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { RoleSelection } from '../../../components/onboarding/RoleSelection';

// Simple test without complex setup
describe('RoleSelection Simple Test', () => {
  test('can render RoleSelection component directly', () => {
    // Mock the hooks that the component needs
    jest.mock('react-router-dom', () => ({
      useNavigate: () => jest.fn(),
    }));
    
    jest.mock('../../../contexts/AuthContext', () => ({
      useAuth: () => ({ user: { id: 'test-user-id' } }),
    }));
    
    jest.mock('../../../services/userService', () => ({
      userService: {
        updateUserById: jest.fn(),
        updateCurrentUserRole: jest.fn(),
      },
    }));

    // Try to render the component directly
    expect(() => {
      render(<RoleSelection />);
    }).not.toThrow();
  });
});

// Test if we can import the component
describe('RoleSelection Import Test', () => {
  test('can import RoleSelection component', () => {
    expect(RoleSelection).toBeDefined();
    expect(typeof RoleSelection).toBe('function');
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
    updateCurrentUserRole: jest.fn(),
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

describe('RoleSelection Component', () => {
  let mockUpdateUserById: jest.MockedFunction<any>;
  let mockUpdateCurrentUserRole: jest.MockedFunction<any>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateUserById = require('../../../services/userService').userService.updateUserById as jest.MockedFunction<any>;
    mockUpdateCurrentUserRole = require('../../../services/userService').userService.updateCurrentUserRole as jest.MockedFunction<any>;
    localStorageMock.getItem.mockReturnValue('test-token');
    mockUpdateUserById.mockResolvedValue({ success: true });
    mockUpdateCurrentUserRole.mockResolvedValue({ success: true });
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(component);
  };

  describe('Rendering', () => {
    test('renders role selection form', () => {
      renderWithRouter(<RoleSelection />);
      
      expect(screen.getByText('Choose your role')).toBeInTheDocument();
      expect(screen.getByText('Select the option that best describes you. We\'ll set up your onboarding journey accordingly.')).toBeInTheDocument();
      expect(screen.getByText('Client')).toBeInTheDocument();
      expect(screen.getByText('Freelancer')).toBeInTheDocument();
      expect(screen.getByText('Agency Owner')).toBeInTheDocument();
    });

    test('displays all role options with descriptions', () => {
      renderWithRouter(<RoleSelection />);
      
      // Client role
      expect(screen.getByText('Client')).toBeInTheDocument();
      expect(screen.getByText('I\'m an IT founder or HR looking to hire developers for my company or team.')).toBeInTheDocument();
      
      // Freelancer role
      expect(screen.getByText('Freelancer')).toBeInTheDocument();
      expect(screen.getByText('I\'m a developer who wants to list myself and get hired by startups and companies.')).toBeInTheDocument();
      
      // Agency role
      expect(screen.getByText('Agency Owner')).toBeInTheDocument();
      expect(screen.getByText('I run a team or agency and want to list my employees for outsourced projects.')).toBeInTheDocument();
    });

    test('shows continue button in disabled state initially', () => {
      renderWithRouter(<RoleSelection />);
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeDisabled();
    });
  });

  describe('User Interactions', () => {
    test('enables continue button when role is selected', () => {
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client');
      
      act(() => {
        fireEvent.click(clientRole);
      });
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeEnabled();
    });
  });
});
