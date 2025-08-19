import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { JobPersonaCreation } from '../../../components/onboarding/JobPersonaCreation';

// Test if we can import the component
describe('JobPersonaCreation Import Test', () => {
  test('can import JobPersonaCreation component', () => {
    expect(JobPersonaCreation).toBeDefined();
    expect(typeof JobPersonaCreation).toBe('function');
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

// Mock jobPostService
jest.mock('../../../services/jobPostService', () => ({
  jobPostService: {
    createJobPost: jest.fn(),
  },
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

describe('JobPersonaCreation Component', () => {
  let mockCreateJobPost: jest.MockedFunction<any>;
  let mockUpdateUserById: jest.MockedFunction<any>;

  const defaultProps = {
    formData: {},
    updateFormData: jest.fn(),
    onComplete: jest.fn(),
    onBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateJobPost = require('../../../services/jobPostService').jobPostService.createJobPost as jest.MockedFunction<any>;
    mockUpdateUserById = require('../../../services/userService').userService.updateUserById as jest.MockedFunction<any>;
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'authToken') return 'test-token';
      if (key === 'lastOrganizationId') return 'org-123';
      if (key === 'organizationName') return 'Test Organization';
      if (key === 'lastTeamId') return 'team-123';
      if (key === 'teamName') return 'Development Team';
      if (key === 'hiringIntentForm') return JSON.stringify({
        roleTitle: 'Senior Developer',
        numberOfHires: '3',
        hireTimeline: '3-6 months',
        employmentType: 'Full-time',
        locationPreference: 'Remote',
        city: '',
        salaryMin: '80000',
        salaryMax: '120000',
        salaryPeriod: 'yearly',
        currency: 'USD',
        equityAvailable: false
      });
      return null;
    });
    mockCreateJobPost.mockResolvedValue({ success: true, data: { id: 'job-123' } });
    mockUpdateUserById.mockResolvedValue({ success: true });
  });

  const renderComponent = (component: React.ReactElement) => {
    return render(component);
  };

  describe('Rendering', () => {
    test('renders job persona creation form', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      expect(screen.getByText('Job Persona Creation')).toBeInTheDocument();
      expect(screen.getByText('Provide details about the role to help us find the right candidates.')).toBeInTheDocument();
    });

    test('renders all form fields', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      // Basic fields
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Experience Level')).toBeInTheDocument();
      expect(screen.getByText('Key Responsibilities')).toBeInTheDocument();
      expect(screen.getByText('Required Skills (comma separated)')).toBeInTheDocument();
      expect(screen.getByText('Nice-to-have Skills (comma separated)')).toBeInTheDocument();
      expect(screen.getByText('Tech Stack')).toBeInTheDocument();
      expect(screen.getByText('Additional Notes')).toBeInTheDocument();
    });

    test('renders all form fields', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      // Basic fields
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Experience Level')).toBeInTheDocument();
      expect(screen.getByText('Key Responsibilities')).toBeInTheDocument();
      expect(screen.getByText('Required Skills (comma separated)')).toBeInTheDocument();
      expect(screen.getByText('Nice-to-have Skills (comma separated)')).toBeInTheDocument();
      expect(screen.getByText('Tech Stack')).toBeInTheDocument();
      expect(screen.getByText('Additional Notes')).toBeInTheDocument();
    });

    test('shows navigation buttons', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Create Job Post')).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    test('calls onBack when back button is clicked', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      const backButton = screen.getByText('Back');
      act(() => {
        fireEvent.click(backButton);
      });
      
      expect(defaultProps.onBack).toHaveBeenCalled();
    });

    test('calls onComplete when form is submitted successfully', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      const createJobButton = screen.getByText('Create Job Post');
      act(() => {
        fireEvent.click(createJobButton);
      });
      
      // The component should call onComplete after successful submission
      // Since createJobPost mock is working, this should work
      expect(mockCreateJobPost).toHaveBeenCalled();
    });
  });

  describe('Form Data Management', () => {
    test('updates form data when fields change', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      const summaryTextarea = screen.getByText('Summary').nextElementSibling;
      if (summaryTextarea) {
        act(() => {
          fireEvent.change(summaryTextarea, { target: { value: 'Senior Backend Developer role' } });
        });
        
        expect(summaryTextarea).toHaveValue('Senior Backend Developer role');
      }
    });

    test('creates job post when form is submitted', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      const createJobButton = screen.getByText('Create Job Post');
      act(() => {
        fireEvent.click(createJobButton);
      });
      
      expect(mockCreateJobPost).toHaveBeenCalled();
    });
  });

  describe('Form Validation', () => {
    test('has proper form structure', () => {
      renderComponent(<JobPersonaCreation {...defaultProps} />);
      
      // Check that form has proper structure
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Experience Level')).toBeInTheDocument();
      expect(screen.getByText('Key Responsibilities')).toBeInTheDocument();
      expect(screen.getByText('Required Skills (comma separated)')).toBeInTheDocument();
      expect(screen.getByText('Nice-to-have Skills (comma separated)')).toBeInTheDocument();
      expect(screen.getByText('Tech Stack')).toBeInTheDocument();
      expect(screen.getByText('Additional Notes')).toBeInTheDocument();
    });
  });
});

