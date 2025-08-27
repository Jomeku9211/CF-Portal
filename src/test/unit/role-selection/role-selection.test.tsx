import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RoleSelection } from '../../../modules/shared/components/RoleSelection';
import { userService } from '../../../modules/shared/services/userService';

// Mock the userService
jest.mock('../../../modules/shared/services/userService');
const mockUserService = userService as jest.Mocked<typeof userService>;

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

// Mock window.location.href
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

describe('RoleSelection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      id: 'test-user-id',
      email: 'test@example.com',
      roles: []
    }));
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  describe('Rendering', () => {
    test('renders role selection page with correct title', () => {
      renderWithRouter(<RoleSelection />);
      
      expect(screen.getByText('What best describes your role?')).toBeInTheDocument();
      expect(screen.getByText('Select the option that best matches your needs on Coderfarm')).toBeInTheDocument();
    });

    test('renders all three role options', () => {
      renderWithRouter(<RoleSelection />);
      
      expect(screen.getByText('Client')).toBeInTheDocument();
      expect(screen.getByText('Service Provider')).toBeInTheDocument();
      expect(screen.getByText('Agency')).toBeInTheDocument();
    });

    test('renders role descriptions correctly', () => {
      renderWithRouter(<RoleSelection />);
      
      expect(screen.getByText('I want to hire talented developers for my projects')).toBeInTheDocument();
      expect(screen.getByText('I want to offer my skills and services to clients')).toBeInTheDocument();
      expect(screen.getByText('I represent a company that provides development services')).toBeInTheDocument();
    });

    test('renders back button', () => {
      renderWithRouter(<RoleSelection />);
      
      expect(screen.getByText('← Back')).toBeInTheDocument();
    });

    test('renders continue button initially disabled', () => {
      renderWithRouter(<RoleSelection />);
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeInTheDocument();
      expect(continueButton).toBeDisabled();
    });
  });

  describe('Role Selection Interaction', () => {
    test('enables continue button when a role is selected', () => {
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).not.toBeDisabled();
    });

    test('highlights selected role with correct styling', () => {
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      expect(clientRole).toHaveClass('border-blue-500');
      expect(clientRole).toHaveClass('bg-blue-500/10');
    });

    test('allows switching between different roles', () => {
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      const serviceProviderRole = screen.getByText('Service Provider').closest('button');
      
      fireEvent.click(clientRole!);
      expect(clientRole).toHaveClass('border-blue-500');
      
      fireEvent.click(serviceProviderRole!);
      expect(serviceProviderRole).toHaveClass('border-blue-500');
      expect(clientRole).not.toHaveClass('border-blue-500');
    });
  });

  describe('Continue Button Functionality', () => {
    test('shows loading state when continue is clicked', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    test('calls userService.updateUserById with correct data for client role', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        });
      });
    });

    test('calls userService.updateUserById with correct data for freelancer role', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      const serviceProviderRole = screen.getByText('Service Provider').closest('button');
      fireEvent.click(serviceProviderRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['freelancer'],
          onboarding_stage: 'pending'
        });
      });
    });

    test('updates localStorage with new user data', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify({
          id: 'test-user-id',
          email: 'test@example.com',
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        }));
      });
    });
  });

  describe('Navigation After Role Selection', () => {
    test('redirects to clientOnboarding for client role', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(window.location.href).toBe('/clientOnboarding');
      });
    });

    test('redirects to developer-onboarding for freelancer role', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      const serviceProviderRole = screen.getByText('Service Provider').closest('button');
      fireEvent.click(serviceProviderRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(window.location.href).toBe('/developer-onboarding');
      });
    });

    test('logs message for agency role (not implemented)', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      const agencyRole = screen.getByText('Agency').closest('button');
      fireEvent.click(agencyRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Agency onboarding not yet implemented');
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Error Handling', () => {
    test('shows alert when userService.updateUserById fails', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      mockUserService.updateUserById.mockRejectedValue(new Error('Update failed'));
      
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Failed to update role. Please try again.');
      });
      
      alertSpy.mockRestore();
    });

    test('resets loading state after error', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      mockUserService.updateUserById.mockRejectedValue(new Error('Update failed'));
      
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(screen.getByText('Continue')).toBeInTheDocument();
        expect(screen.queryByText('Processing...')).not.toBeInTheDocument();
      });
      
      alertSpy.mockRestore();
    });
  });

  describe('Back Button Functionality', () => {
    test('calls window.history.back when back button is clicked', () => {
      const backSpy = jest.spyOn(window.history, 'back').mockImplementation();
      
      renderWithRouter(<RoleSelection />);
      
      const backButton = screen.getByText('← Back');
      fireEvent.click(backButton);
      
      expect(backSpy).toHaveBeenCalled();
      
      backSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels for role selection', () => {
      renderWithRouter(<RoleSelection />);
      
      const clientRole = screen.getByText('Client').closest('button');
      expect(clientRole).toHaveAttribute('aria-label', expect.stringContaining('Client'));
    });

    test('continue button has proper disabled state', () => {
      renderWithRouter(<RoleSelection />);
      
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toHaveAttribute('disabled');
    });
  });
});
