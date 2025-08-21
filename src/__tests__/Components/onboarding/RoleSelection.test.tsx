import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RoleSelection } from '../../../components/onboarding/RoleSelection';
import { roleService } from '../../../services/roleService';
import { userService } from '../../../services/userService';

// Mock the services
jest.mock('../../../services/roleService');
jest.mock('../../../services/userService');

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

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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

describe('RoleSelection Component', () => {
  const mockRoleOptions = [
    {
      id: 'client',
      name: 'Client',
      description: 'I\'m an IT founder or HR looking to hire developers for my company or team.',
      buttonLabel: 'Hire Talent',
      icon: 'users'
    },
    {
      id: 'freelancer',
      name: 'Service Provider',
      description: 'I\'m a developer who wants to list myself and get hired by startups and companies.',
      buttonLabel: 'List Myself',
      icon: 'user'
    },
    {
      id: 'agency',
      name: 'Agency Owner',
      description: 'I run a team or agency and want to list my employees for outsourced projects.',
      buttonLabel: 'List My Team',
      icon: 'building'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('test-token');
    
    // Reset mock implementations
    (roleService.getRoleOptions as jest.Mock).mockResolvedValue({ 
      success: true, 
      data: mockRoleOptions 
    });
    (userService.updateUserById as jest.Mock).mockResolvedValue({ success: true });
    (userService.updateCurrentUserRole as jest.Mock).mockResolvedValue({ success: true });
  });

  describe('Initial Rendering and Loading States', () => {
    test('shows loading state initially', () => {
      (roleService.getRoleOptions as jest.Mock).mockImplementation(() => new Promise(() => {}));
      
      render(<RoleSelection />);
      
      expect(screen.getByText('Loading roles...')).toBeInTheDocument();
    });

    test('shows error state when role fetch fails', async () => {
      (roleService.getRoleOptions as jest.Mock).mockResolvedValue({ 
        success: false, 
        message: 'Failed to load roles' 
      });
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Error: Failed to load roles')).toBeInTheDocument();
      });
    });

    test('shows generic error when role fetch throws exception', async () => {
      (roleService.getRoleOptions as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Error: Failed to load roles')).toBeInTheDocument();
      });
    });

    test('renders successfully when roles are fetched', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Choose your role')).toBeInTheDocument();
        expect(screen.getByText('Select the option that best describes you. We\'ll set up your onboarding journey accordingly.')).toBeInTheDocument();
      });
    });
  });

  describe('Role Cards Rendering', () => {
    test('renders all role cards with correct data', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        // Check all role names are displayed
        expect(screen.getByText('Client')).toBeInTheDocument();
        expect(screen.getByText('Service Provider')).toBeInTheDocument();
        expect(screen.getByText('Agency Owner')).toBeInTheDocument();
        
        // Check all descriptions are displayed
        expect(screen.getByText('I\'m an IT founder or HR looking to hire developers for my company or team.')).toBeInTheDocument();
        expect(screen.getByText('I\'m a developer who wants to list myself and get hired by startups and companies.')).toBeInTheDocument();
        expect(screen.getByText('I run a team or agency and want to list my employees for outsourced projects.')).toBeInTheDocument();
        
        // Check all button labels are displayed
        expect(screen.getByText('Hire Talent')).toBeInTheDocument();
        expect(screen.getByText('List Myself')).toBeInTheDocument();
        expect(screen.getByText('List My Team')).toBeInTheDocument();
      });
    });

    test('renders correct number of role cards', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        const roleCards = screen.getAllByText(/Client|Service Provider|Agency Owner/);
        expect(roleCards).toHaveLength(3);
      });
    });

    test('each role card has correct structure', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        // Check that each card has the required elements
        const clientCard = screen.getByText('Client').closest('div');
        expect(clientCard).toHaveClass('bg-[#171c33]');
        expect(clientCard).toHaveClass('cursor-pointer');
        
        // Check icon is present
        expect(clientCard?.querySelector('.w-12.h-12')).toBeInTheDocument();
        
        // Check description is present
        expect(screen.getByText('I\'m an IT founder or HR looking to hire developers for my company or team.')).toBeInTheDocument();
        
        // Check button is present
        expect(screen.getByText('Hire Talent')).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    test('enables continue button when role is selected', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeEnabled();
      expect(continueButton).toHaveClass('bg-green-500');
    });

    test('shows continue button as disabled initially', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeDisabled();
      expect(continueButton).toHaveClass('bg-gray-700');
    });

    test('highlights selected role card with blue border', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      expect(clientCard).toHaveClass('border-blue-500');
      expect(clientCard).toHaveClass('shadow-lg');
    });

    test('shows checkmark icon on selected role', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      // Check that CheckCircle icon is visible
      const checkIcon = clientCard?.querySelector('[data-testid="check-icon"]') || 
                       clientCard?.querySelector('svg[class*="text-blue-500"]');
      expect(checkIcon).toBeInTheDocument();
    });

    test('can select different roles', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      // Select client first
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      expect(clientCard).toHaveClass('border-blue-500');
      
      // Select service provider
      const serviceProviderCard = screen.getByText('Service Provider').closest('div');
      fireEvent.click(serviceProviderCard!);
      
      expect(serviceProviderCard).toHaveClass('border-blue-500');
      expect(clientCard).not.toHaveClass('border-blue-500');
    });
  });

  describe('Navigation and Role Selection', () => {
    test('navigates to onboarding-stage when client role is selected', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/onboarding-stage');
    });

    test('navigates to developerOnboarding when freelancer role is selected', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Service Provider')).toBeInTheDocument();
      });
      
      const serviceProviderCard = screen.getByText('Service Provider').closest('div');
      fireEvent.click(serviceProviderCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/developerOnboarding');
    });

    test('logs message when agency role is selected (not yet implemented)', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Agency Owner')).toBeInTheDocument();
      });
      
      const agencyCard = screen.getByText('Agency Owner').closest('div');
      fireEvent.click(agencyCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(consoleSpy).toHaveBeenCalledWith('Agency onboarding not yet implemented');
      consoleSpy.mockRestore();
    });
  });

  describe('Backend Integration', () => {
    test('calls roleService.getRoleOptions on component mount', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(roleService.getRoleOptions).toHaveBeenCalledTimes(1);
      });
    });

    test('calls userService.updateUserById when user has ID', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(userService.updateUserById).toHaveBeenCalledWith('test-user-id', { roles: ['client'] });
    });

    test('calls userService.updateCurrentUserRole when user has no ID', async () => {
      mockUseAuth.user = null as any;
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(userService.updateCurrentUserRole).toHaveBeenCalledWith('client');
    });

    test('updates localStorage with selected role', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'currentUser',
        expect.stringContaining('"roles":["client"]')
      );
    });

    test('handles role update failure gracefully', async () => {
      (userService.updateUserById as jest.Mock).mockResolvedValue({ 
        success: false, 
        message: 'Update failed' 
      });
      
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(alertSpy).toHaveBeenCalledWith('Failed to update roles: Update failed');
      alertSpy.mockRestore();
    });
  });

  describe('Client Role Special Handling', () => {
    test('updates onboarding_stage for client role', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(userService.updateUserById).toHaveBeenCalledWith('test-user-id', {
        onboarding_stage: 'organization_creation',
        is_onboarding: true,
        onboarding_status: 'org_pending'
      });
    });

    test('updates localStorage with onboarding fields for client', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'currentUser',
        expect.stringContaining('"onboarding_stage":"organization_creation"')
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'currentUser',
        expect.stringContaining('"is_onboarding":true')
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'currentUser',
        expect.stringContaining('"onboarding_status":"org_pending"')
      );
    });
  });

  describe('Navigation Elements', () => {
    test('renders back to home button', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('← Back to Home')).toBeInTheDocument();
      });
      
      const backButton = screen.getByText('← Back to Home');
      expect(backButton).toHaveClass('text-gray-400');
      expect(backButton).toHaveClass('hover:text-blue-400');
    });

    test('back button navigates to home', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('← Back to Home')).toBeInTheDocument();
      });
      
      const backButton = screen.getByText('← Back to Home');
      fireEvent.click(backButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Icon Rendering', () => {
    test('renders correct icons for different role types', async () => {
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      // Check that icons are rendered
      const iconContainers = document.querySelectorAll('.w-12.h-12');
      expect(iconContainers).toHaveLength(3);
      
      // Check that each icon container has an SVG
      iconContainers.forEach(container => {
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });

    test('falls back to UserIcon for unknown icon types', async () => {
      const customRoleOptions = [
        {
          id: 'custom',
          name: 'Custom Role',
          description: 'A custom role',
          buttonLabel: 'Custom Action',
          icon: 'unknown-icon'
        }
      ];
      
      (roleService.getRoleOptions as jest.Mock).mockResolvedValue({ 
        success: true, 
        data: customRoleOptions 
      });
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Custom Role')).toBeInTheDocument();
      });
      
      // Should still render an icon (default UserIcon)
      const iconContainer = document.querySelector('.w-12.h-12');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Error Handling Edge Cases', () => {
    test('handles empty role options array', async () => {
      (roleService.getRoleOptions as jest.Mock).mockResolvedValue({ 
        success: true, 
        data: [] 
      });
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Choose your role')).toBeInTheDocument();
      });
      
      // Should show no role cards
      expect(screen.queryByText('Client')).not.toBeInTheDocument();
      expect(screen.queryByText('Service Provider')).not.toBeInTheDocument();
      expect(screen.queryByText('Agency Owner')).not.toBeInTheDocument();
    });

    test('handles malformed role data gracefully', async () => {
      const malformedRoles = [
        {
          id: 'client',
          name: 'Client',
          // Missing description and buttonLabel
          icon: 'users'
        }
      ];
      
      (roleService.getRoleOptions as jest.Mock).mockResolvedValue({ 
        success: true, 
        data: malformedRoles 
      });
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      // Should render what's available and handle missing fields gracefully
      expect(screen.getByText('Client')).toBeInTheDocument();
      expect(screen.getByText('undefined')).toBeInTheDocument(); // Missing description
    });

    test('handles localStorage errors gracefully', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      render(<RoleSelection />);
      
      await waitFor(() => {
        expect(screen.getByText('Client')).toBeInTheDocument();
      });
      
      const clientCard = screen.getByText('Client').closest('div');
      fireEvent.click(clientCard!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      // Should not crash and should still navigate
      expect(mockNavigate).toHaveBeenCalledWith('/onboarding-stage');
    });
  });
});
