import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RoleSelection } from '@/modules/shared/components/RoleSelection';
import { userService } from '@/modules/shared/services/userService';

// Mock services
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

describe('Role Selection Flow Integration', () => {
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

  describe('Complete Client Onboarding Flow', () => {
    test('user selects client role and completes full onboarding flow', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      // 1. Select Client Role
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      expect(clientRole).toHaveClass('border-blue-500');
      
      // 2. Continue to Client Onboarding
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        });
      });
      
      // 3. Verify localStorage update
      expect(localStorageMock.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify({
        id: 'test-user-id',
        email: 'test@example.com',
        roles: ['client'],
        onboarding_stage: 'organization_profile'
      }));
      
      // 4. Verify navigation to client onboarding
      await waitFor(() => {
        expect(window.location.href).toBe('/clientOnboarding');
      });
    });
  });

  describe('Complete Service Provider Onboarding Flow', () => {
    test('user selects freelancer role and completes developer onboarding flow', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      // 1. Select Service Provider Role
      const serviceProviderRole = screen.getByText('Service Provider').closest('button');
      fireEvent.click(serviceProviderRole!);
      
      expect(serviceProviderRole).toHaveClass('border-blue-500');
      
      // 2. Continue to Developer Onboarding
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['freelancer'],
          onboarding_stage: 'pending'
        });
      });
      
      // 3. Verify localStorage update
      expect(localStorageMock.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify({
        id: 'test-user-id',
        email: 'test@example.com',
        roles: ['freelancer'],
        onboarding_stage: 'pending'
      }));
      
      // 4. Verify navigation to developer onboarding
      await waitFor(() => {
        expect(window.location.href).toBe('/developer-onboarding');
      });
    });
  });

  describe('Agency Role Selection (Not Implemented)', () => {
    test('user selects agency role and sees not implemented message', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      // 1. Select Agency Role
      const agencyRole = screen.getByText('Agency').closest('button');
      fireEvent.click(agencyRole!);
      
      expect(agencyRole).toHaveClass('border-blue-500');
      
      // 2. Continue (should log not implemented message)
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['agency'],
          onboarding_stage: 'pending'
        });
      });
      
      // 3. Verify console log for not implemented
      expect(consoleSpy).toHaveBeenCalledWith('Agency onboarding not yet implemented');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Role Switching and State Management', () => {
    test('user can switch between different roles before continuing', () => {
      renderWithRouter(<RoleSelection />);
      
      // 1. Select Client Role
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      expect(clientRole).toHaveClass('border-blue-500');
      expect(screen.getByText('Continue')).not.toBeDisabled();
      
      // 2. Switch to Service Provider Role
      const serviceProviderRole = screen.getByText('Service Provider').closest('button');
      fireEvent.click(serviceProviderRole!);
      
      expect(serviceProviderRole).toHaveClass('border-blue-500');
      expect(clientRole).not.toHaveClass('border-blue-500');
      expect(screen.getByText('Continue')).not.toBeDisabled();
      
      // 3. Switch to Agency Role
      const agencyRole = screen.getByText('Agency').closest('button');
      fireEvent.click(agencyRole!);
      
      expect(agencyRole).toHaveClass('border-blue-500');
      expect(serviceProviderRole).not.toHaveClass('border-blue-500');
      expect(screen.getByText('Continue')).not.toBeDisabled();
    });
  });

  describe('Error Handling and Recovery', () => {
    test('handles userService.updateUserById failure gracefully', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      mockUserService.updateUserById.mockRejectedValue(new Error('Network error'));
      
      renderWithRouter(<RoleSelection />);
      
      // 1. Select Client Role
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      // 2. Try to continue (should fail)
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Failed to update role. Please try again.');
      });
      
      // 3. Verify button is re-enabled for retry
      expect(screen.getByText('Continue')).not.toBeDisabled();
      
      alertSpy.mockRestore();
    });

    test('handles localStorage errors gracefully', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      // 1. Select Client Role
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      // 2. Continue (should handle localStorage error)
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      // 3. Should still navigate despite localStorage error
      await waitFor(() => {
        expect(window.location.href).toBe('/clientOnboarding');
      });
    });
  });

  describe('User Data Persistence', () => {
    test('maintains user data consistency across role selection', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      // 1. Select Client Role
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      // 2. Continue
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        // Verify userService call
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        });
        
        // Verify localStorage update
        expect(localStorageMock.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify({
          id: 'test-user-id',
          email: 'test@example.com',
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        }));
      });
    });

    test('updates user onboarding stage appropriately for each role', async () => {
      mockUserService.updateUserById.mockResolvedValue({ success: true });
      
      renderWithRouter(<RoleSelection />);
      
      // Test Client Role
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      fireEvent.click(screen.getByText('Continue'));
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['client'],
          onboarding_stage: 'organization_profile'
        });
      });
      
      // Reset mocks for next test
      jest.clearAllMocks();
      
      // Test Service Provider Role
      const serviceProviderRole = screen.getByText('Service Provider').closest('button');
      fireEvent.click(serviceProviderRole!);
      fireEvent.click(screen.getByText('Continue'));
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          roles: ['freelancer'],
          onboarding_stage: 'pending'
        });
      });
    });
  });

  describe('Navigation and Routing', () => {
    test('back button functionality works correctly', () => {
      const backSpy = jest.spyOn(window.history, 'back').mockImplementation();
      
      renderWithRouter(<RoleSelection />);
      
      const backButton = screen.getByText('← Back');
      fireEvent.click(backButton);
      
      expect(backSpy).toHaveBeenCalled();
      
      backSpy.mockRestore();
    });

    test('continue button is properly disabled until role is selected', () => {
      renderWithRouter(<RoleSelection />);
      
      // Initially disabled
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeDisabled();
      
      // Select a role
      const clientRole = screen.getByText('Client').closest('button');
      fireEvent.click(clientRole!);
      
      // Now enabled
      expect(continueButton).not.toBeDisabled();
    });
  });
});
