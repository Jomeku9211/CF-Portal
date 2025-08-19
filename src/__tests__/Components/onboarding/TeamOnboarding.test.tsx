import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TeamOnboarding } from '../../../components/onboarding/TeamOnboarding';

// Test if we can import the component
describe('TeamOnboarding Import Test', () => {
  test('can import TeamOnboarding component', () => {
    expect(TeamOnboarding).toBeDefined();
    expect(typeof TeamOnboarding).toBe('function');
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

// Mock teamService
jest.mock('../../../services/teamService', () => ({
  teamService: {
    createTeam: jest.fn(),
  },
}));

// Mock userService
jest.mock('../../../services/userService', () => ({
  userService: {
    updateUserById: jest.fn(),
  },
}));

// Mock organizationService
jest.mock('../../../services/organizationService', () => ({
  organizationService: {
    getUserOrganizations: jest.fn(),
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

describe('TeamOnboarding Component', () => {
  let mockCreateTeam: jest.MockedFunction<any>;
  let mockUpdateUserById: jest.MockedFunction<any>;

  const defaultProps = {
    formData: {},
    updateFormData: jest.fn(),
    onComplete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateTeam = require('../../../services/teamService').teamService.createTeam as jest.MockedFunction<any>;
    mockUpdateUserById = require('../../../services/userService').userService.updateUserById as jest.MockedFunction<any>;
    localStorageMock.getItem.mockReturnValue('test-token');
    mockCreateTeam.mockResolvedValue({ success: true, data: { id: 'team-123' } });
    mockUpdateUserById.mockResolvedValue({ success: true });
  });

  const renderComponent = (component: React.ReactElement) => {
    return render(component);
  };

  describe('Rendering', () => {
    test('renders team onboarding form', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      expect(screen.getByText('Build Your Team')).toBeInTheDocument();
      expect(screen.getByText('Complete the following steps to set up your team')).toBeInTheDocument();
    });

    test('displays organization information', () => {
      localStorageMock.getItem.mockReturnValue('org-123');
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      expect(screen.getByText('Organization')).toBeInTheDocument();
    });

    test('shows step 1 content initially', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      expect(screen.getByText('Team Basics')).toBeInTheDocument();
      expect(screen.getByText('Define the fundamental details of your team')).toBeInTheDocument();
      expect(screen.getByText('Team Title')).toBeInTheDocument();
    });

    test('shows navigation buttons', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    test('shows step indicator', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });
  });

  describe('Form Navigation', () => {
    test('can navigate to next step', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      // Fill required field for step 1
      const teamTitleInput = screen.getByPlaceholderText('e.g., Product Design Team, Core Backend, Marketing & Growth');
      act(() => {
        fireEvent.change(teamTitleInput, { target: { value: 'Test Team' } });
      });
      
      const nextButton = screen.getByText('Next');
      act(() => {
        fireEvent.click(nextButton);
      });
      
      expect(screen.getByText('Workstyle Preferences')).toBeInTheDocument();
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    });

    test('can navigate back to previous step', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      // Go to step 2 first
      const teamTitleInput = screen.getByPlaceholderText('e.g., Product Design Team, Core Backend, Marketing & Growth');
      act(() => {
        fireEvent.change(teamTitleInput, { target: { value: 'Test Team' } });
      });
      
      const nextButton = screen.getByText('Next');
      act(() => {
        fireEvent.click(nextButton);
      });
      
      // Now go back to step 1
      const backButton = screen.getByText('Back');
      act(() => {
        fireEvent.click(backButton);
      });
      
      expect(screen.getByText('Team Basics')).toBeInTheDocument();
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    test('prevents navigation without required fields', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      const nextButton = screen.getByText('Next');
      act(() => {
        fireEvent.click(nextButton);
      });
      
      // Should still be on step 1
      expect(screen.getByText('Team Basics')).toBeInTheDocument();
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });
  });

  describe('Form Data Management', () => {
    test('updates form data when fields change', () => {
      renderComponent(<TeamOnboarding {...defaultProps} />);
      
      const teamTitleInput = screen.getByPlaceholderText('e.g., Product Design Team, Core Backend, Marketing & Growth');
      
      act(() => {
        fireEvent.change(teamTitleInput, { target: { value: 'Test Team' } });
      });
      
      expect(teamTitleInput).toHaveValue('Test Team');
    });
  });
});
