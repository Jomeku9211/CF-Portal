import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OrganizationProfile } from '../../../modules/client/components/OrganizationProfile';
import { TeamOnboarding } from '../../../modules/client/components/TeamOnboarding';
import { HiringIntent } from '../../../modules/client/components/HiringIntent';
import { organizationService } from '../../../services/organizationService';
import { userService } from '../../../services/userService';

// Mock services
jest.mock('../../../services/organizationService');
jest.mock('../../../services/userService');
const mockOrganizationService = organizationService as jest.Mocked<typeof organizationService>;
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

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

describe('Client Onboarding Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      id: 'test-user-id',
      email: 'test@example.com'
    }));
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  describe('OrganizationProfile Component', () => {
    const mockOnSubmitSuccess = jest.fn();

    beforeEach(() => {
      mockOrganizationService.createOrganization.mockResolvedValue({
        success: true,
        organization: { id: 'org-123', name: 'Test Org' }
      });
      mockUserService.updateUserById.mockResolvedValue({ success: true });
    });

    test('renders organization profile with 4 internal steps', () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      expect(screen.getByText('Organization Profile')).toBeInTheDocument();
      expect(screen.getByText('Quick Setup')).toBeInTheDocument();
      expect(screen.getByText('Purpose & Story')).toBeInTheDocument();
      expect(screen.getByText('Growth & Success')).toBeInTheDocument();
      expect(screen.getByText('Culture & Values')).toBeInTheDocument();
    });

    test('shows progress indicator with current step', () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
      expect(screen.getByText('Organization Profile')).toBeInTheDocument();
    });

    test('renders QuickSetup step by default', () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      expect(screen.getByText('Quick Setup')).toBeInTheDocument();
      expect(screen.getByLabelText('Organization Name *')).toBeInTheDocument();
      expect(screen.getByLabelText('Website')).toBeInTheDocument();
    });

    test('shows all dropdown options for company details', () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      // Company Size dropdown
      const companySizeSelect = screen.getByLabelText('Company Size');
      expect(companySizeSelect).toBeInTheDocument();
      
      // Funding Status dropdown
      const fundingStatusSelect = screen.getByLabelText('Funding Status');
      expect(fundingStatusSelect).toBeInTheDocument();
      
      // Industry dropdown
      const industrySelect = screen.getByLabelText('Industry');
      expect(industrySelect).toBeInTheDocument();
      
      // Company Function dropdown
      const companyFunctionSelect = screen.getByLabelText('Company Function');
      expect(companyFunctionSelect).toBeInTheDocument();
      
      // Revenue Status dropdown
      const revenueStatusSelect = screen.getByLabelText('Revenue Status');
      expect(revenueStatusSelect).toBeInTheDocument();
    });

    test('navigates to next step when Next button is clicked', () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);
      
      expect(screen.getByText('Purpose & Story')).toBeInTheDocument();
      expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
    });

    test('navigates back to previous step when Back button is clicked', () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      // Go to step 2
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);
      
      // Go back to step 1
      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);
      
      expect(screen.getByText('Quick Setup')).toBeInTheDocument();
      expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
    });

    test('shows Submit button on final step', () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      // Navigate to final step
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton); // Step 2
      fireEvent.click(screen.getByText('Next')); // Step 3
      fireEvent.click(screen.getByText('Next')); // Step 4
      
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('calls organizationService.createOrganization on submit', async () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      // Fill required field
      const nameInput = screen.getByLabelText('Organization Name *');
      fireEvent.change(nameInput, { target: { value: 'Test Organization' } });
      
      // Navigate to final step and submit
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton); // Step 2
      fireEvent.click(screen.getByText('Next')); // Step 3
      fireEvent.click(screen.getByText('Next')); // Step 4
      
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockOrganizationService.createOrganization).toHaveBeenCalled();
      });
    });

    test('updates user onboarding stage after successful organization creation', async () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      // Fill required field and submit
      const nameInput = screen.getByLabelText('Organization Name *');
      fireEvent.change(nameInput, { target: { value: 'Test Organization' } });
      
      // Navigate to final step and submit
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton); // Step 2
      fireEvent.click(screen.getByText('Next')); // Step 3
      fireEvent.click(screen.getByText('Next')); // Step 4
      
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockUserService.updateUserById).toHaveBeenCalledWith('test-user-id', {
          onboarding_stage: 'team_creation'
        });
      });
    });

    test('stores organization ID in localStorage after creation', async () => {
      renderWithRouter(<OrganizationProfile onSubmitSuccess={mockOnSubmitSuccess} />);
      
      // Fill required field and submit
      const nameInput = screen.getByLabelText('Organization Name *');
      fireEvent.change(nameInput, { target: { value: 'Test Organization' } });
      
      // Navigate to final step and submit
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton); // Step 2
      fireEvent.click(screen.getByText('Next')); // Step 3
      fireEvent.click(screen.getByText('Next')); // Step 4
      
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('lastOrganizationId', 'org-123');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('organizationName', 'Test Org');
      });
    });
  });

  describe('TeamOnboarding Component', () => {
    test('renders team onboarding form', () => {
      renderWithRouter(<TeamOnboarding />);
      
      expect(screen.getByText('Team Onboarding')).toBeInTheDocument();
    });

    test('shows team size dropdown options', () => {
      renderWithRouter(<TeamOnboarding />);
      
      const teamSizeSelect = screen.getByLabelText(/Team Size/);
      expect(teamSizeSelect).toBeInTheDocument();
    });

    test('shows communication style options', () => {
      renderWithRouter(<TeamOnboarding />);
      
      expect(screen.getByText(/Communication Style/)).toBeInTheDocument();
    });

    test('shows work style options', () => {
      renderWithRouter(<TeamOnboarding />);
      
      expect(screen.getByText(/Work Style/)).toBeInTheDocument();
    });

    test('shows decision making style options', () => {
      renderWithRouter(<TeamOnboarding />);
      
      expect(screen.getByText(/Decision Making Style/)).toBeInTheDocument();
    });

    test('shows primary timezone field', () => {
      renderWithRouter(<TeamOnboarding />);
      
      expect(screen.getByLabelText(/Primary Timezone/)).toBeInTheDocument();
    });
  });

  describe('HiringIntent Component', () => {
    const mockFormData = {
      roleTitle: '',
      numberOfHires: '',
      hireTimeline: '',
      employmentType: [],
      locationPreference: '',
      city: '',
      salaryPeriod: 'Yearly',
      currency: 'USD',
      salaryMin: '',
      salaryMax: '',
      equityAvailable: false
    };

    const mockUpdateFormData = jest.fn();
    const mockOnBack = jest.fn();
    const mockOnFinish = jest.fn();

    test('renders hiring intent form', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      expect(screen.getByText('Hiring Intent')).toBeInTheDocument();
    });

    test('shows role information section', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      expect(screen.getByText('Role Information')).toBeInTheDocument();
      expect(screen.getByLabelText('Role Title')).toBeInTheDocument();
    });

    test('shows hiring details section with all options', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      expect(screen.getByText('Hiring Details')).toBeInTheDocument();
      
      // Number of hires options
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2–5')).toBeInTheDocument();
      expect(screen.getByText('5+')).toBeInTheDocument();
      
      // Hire timeline options
      expect(screen.getByText('Immediately')).toBeInTheDocument();
      expect(screen.getByText('Within 1 month')).toBeInTheDocument();
      expect(screen.getByText('Within 3 months')).toBeInTheDocument();
      expect(screen.getByText('Within 6+ months')).toBeInTheDocument();
      
      // Employment type options
      expect(screen.getByText('Full-time')).toBeInTheDocument();
      expect(screen.getByText('Part-time')).toBeInTheDocument();
      expect(screen.getByText('Contract')).toBeInTheDocument();
      expect(screen.getByText('Internship')).toBeInTheDocument();
    });

    test('shows location and compensation section', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      expect(screen.getByText('Location & Compensation')).toBeInTheDocument();
      
      // Location options
      expect(screen.getByText('Remote')).toBeInTheDocument();
      expect(screen.getByText('Onsite')).toBeInTheDocument();
      expect(screen.getByText('Hybrid')).toBeInTheDocument();
      
      // Salary period options
      expect(screen.getByLabelText('Salary Period')).toBeInTheDocument();
      
      // Currency options
      expect(screen.getByLabelText('Currency')).toBeInTheDocument();
    });

    test('shows city field when onsite or hybrid is selected', () => {
      renderWithRouter(
        <HiringIntent
          formData={{ ...mockFormData, locationPreference: 'Onsite' }}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      expect(screen.getByLabelText('City')).toBeInTheDocument();
    });

    test('hides city field when remote is selected', () => {
      renderWithRouter(
        <HiringIntent
          formData={{ ...mockFormData, locationPreference: 'Remote' }}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      expect(screen.queryByLabelText('City')).not.toBeInTheDocument();
    });

    test('calls onBack when back button is clicked', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);
      
      expect(mockOnBack).toHaveBeenCalled();
    });

    test('calls onFinish when finish button is clicked', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const finishButton = screen.getByText('Finish');
      fireEvent.click(finishButton);
      
      expect(mockOnFinish).toHaveBeenCalled();
    });

    test('updates form data when role title is changed', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const roleTitleInput = screen.getByLabelText('Role Title');
      fireEvent.change(roleTitleInput, { target: { value: 'Frontend Developer' } });
      
      expect(mockUpdateFormData).toHaveBeenCalledWith({ roleTitle: 'Frontend Developer' });
    });

    test('updates form data when number of hires is selected', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const hireOption = screen.getByText('2–5');
      fireEvent.click(hireOption);
      
      expect(mockUpdateFormData).toHaveBeenCalledWith({ numberOfHires: '2–5' });
    });

    test('updates form data when hire timeline is selected', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const timelineOption = screen.getByText('Within 1 month');
      fireEvent.click(timelineOption);
      
      expect(mockUpdateFormData).toHaveBeenCalledWith({ hireTimeline: 'Within 1 month' });
    });

    test('updates form data when location preference is selected', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const locationOption = screen.getByText('Hybrid');
      fireEvent.click(locationOption);
      
      expect(mockUpdateFormData).toHaveBeenCalledWith({ locationPreference: 'Hybrid' });
    });

    test('updates form data when salary range is entered', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const salaryMinInput = screen.getByLabelText('Salary Range (Min)');
      const salaryMaxInput = screen.getByLabelText('Salary Range (Max)');
      
      fireEvent.change(salaryMinInput, { target: { value: '50000' } });
      fireEvent.change(salaryMaxInput, { target: { value: '80000' } });
      
      expect(mockUpdateFormData).toHaveBeenCalledWith({ salaryMin: '50000' });
      expect(mockUpdateFormData).toHaveBeenCalledWith({ salaryMax: '80000' });
    });

    test('updates form data when equity available is toggled', () => {
      renderWithRouter(
        <HiringIntent
          formData={mockFormData}
          updateFormData={mockUpdateFormData}
          onBack={mockOnBack}
          onFinish={mockOnFinish}
        />
      );
      
      const equityCheckbox = screen.getByLabelText('Equity Available');
      fireEvent.click(equityCheckbox);
      
      expect(mockUpdateFormData).toHaveBeenCalledWith({ equityAvailable: true });
    });
  });
});
