import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingFlow } from '../../../components/onboarding/OnboardingFlow';
import { organizationService } from '../../../services/organizationService';

// Mock the organization service
jest.mock('../../../services/organizationService');
const mockOrganizationService = organizationService as jest.Mocked<typeof organizationService>;

// Mock the router
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the auth context
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
    isAuthenticated: true,
  }),
}));

describe('OnboardingFlow - Organization Creation API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful organization creation
    mockOrganizationService.createOrganization.mockResolvedValue({
      success: true,
      organization: {
        id: 'org-123',
        created_at: Date.now(),
        name: 'Test Organization',
        industry: 'technology',
        website_url: 'https://test.com',
        organization_size: '1-10',
        current_funding_status: 'bootstrapped',
        key_investors_backers: '',
        revenue_status: 'pre-revenue',
        profitability_status: 'not-profitable',
        why_statement: 'To solve problems',
        origin_story: 'Started as a side project',
        core_beliefs_principles: 'Innovation; Quality',
        how_we_live_purpose: 'Customer first; Agile',
        creator: 'test-user-id'
      }
    });
  });

  const fillBasicInfo = async (user: any) => {
    // Fill organization name
    const nameInput = screen.getByLabelText(/Organization Name/i);
    await user.type(nameInput, 'Test Organization');

    // Select industry
    const industrySelect = screen.getByLabelText(/Industry/i);
    await user.selectOptions(industrySelect, 'technology');

    // Fill website
    const websiteInput = screen.getByLabelText(/Website/i);
    await user.type(websiteInput, 'https://test.com');

    // Select company size
    const sizeSelect = screen.getByLabelText(/Company Size/i);
    await user.selectOptions(sizeSelect, '1-10');
  };

  const fillFinancials = async (user: any) => {
    // Select funding status
    const fundingSelect = screen.getByLabelText(/Funding Status/i);
    await user.selectOptions(fundingSelect, 'bootstrapped');

    // Fill investors (optional)
    const investorsInput = screen.getByLabelText(/Key Investors/i);
    await user.type(investorsInput, 'Self-funded');

    // Select revenue status
    const revenueSelect = screen.getByLabelText(/Revenue Status/i);
    await user.selectOptions(revenueSelect, 'pre-revenue');

    // Select profitability status
    const profitSelect = screen.getByLabelText(/Profitability Status/i);
    await user.selectOptions(profitSelect, 'not-profitable');
  };

  const fillPurpose = async (user: any) => {
    // Fill why statement
    const whyInput = screen.getByLabelText(/Why Statement/i);
    await user.type(whyInput, 'To solve problems');

    // Fill origin story
    const originInput = screen.getByLabelText(/Origin Story/i);
    await user.type(originInput, 'Started as a side project');

    // Add core beliefs
    const beliefsInput = screen.getByLabelText(/Core Beliefs/i);
    await user.type(beliefsInput, 'Innovation');
    await user.keyboard('{Enter}');
    await user.type(beliefsInput, 'Quality');
    await user.keyboard('{Enter}');

    // Add key practices
    const practicesInput = screen.getByLabelText(/Key Practices/i);
    await user.type(practicesInput, 'Customer first');
    await user.keyboard('{Enter}');
    await user.type(practicesInput, 'Agile');
    await user.keyboard('{Enter}');
  };

  test('successfully creates organization and moves to next step', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Organization Onboarding')).toBeInTheDocument();
    
    // Click next to go to basic info step
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Now we should be on the basic info step
    await waitFor(() => {
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to financials
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the financials step
    await waitFor(() => {
      expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
    });

    await fillFinancials(user);
    
    // Click next to go to purpose
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Click next to complete organization creation
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Wait for the API call and success
    await waitFor(() => {
      expect(mockOrganizationService.createOrganization).toHaveBeenCalledWith({
        name: 'Test Organization',
        industry: 'technology',
        website_url: 'https://test.com',
        organization_size: '1-10',
        current_funding_status: 'bootstrapped',
        key_investors_backers: 'Self-funded',
        revenue_status: 'pre-revenue',
        profitability_status: 'not-profitable',
        why_statement: 'To solve problems',
        origin_story: 'Started as a side project',
        core_beliefs_principles: 'Innovation; Quality',
        how_we_live_purpose: 'Customer first; Agile',
      });
    });

    // Should move to next main step (team onboarding)
    await waitFor(() => {
      expect(screen.getByText('Team Onboarding')).toBeInTheDocument();
    });
  });

  test('shows validation errors for missing required fields', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Organization Onboarding')).toBeInTheDocument();
    
    // Click next to go to basic info step
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Now we should be on the basic info step
    await waitFor(() => {
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });

    // Try to proceed without filling required fields
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Should show validation error for organization name
    await waitFor(() => {
      expect(screen.getByText('Organization name is required')).toBeInTheDocument();
    });
  });

  test('handles API failure gracefully', async () => {
    // Mock API failure
    mockOrganizationService.createOrganization.mockResolvedValue({
      success: false,
      message: 'Organization creation failed'
    });

    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Organization Onboarding')).toBeInTheDocument();
    
    // Click next to go to basic info step
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Now we should be on the basic info step
    await waitFor(() => {
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to financials
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the financials step
    await waitFor(() => {
      expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
    });

    await fillFinancials(user);
    
    // Click next to go to purpose
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Click next to complete organization creation
    await user.click(screen.getByText('Continue'));

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Organization creation failed')).toBeInTheDocument();
    });

    // Should not move to next step
    expect(screen.queryByText('Team Onboarding')).not.toBeInTheDocument();
  });

  test('handles network errors gracefully', async () => {
    // Mock network error
    mockOrganizationService.createOrganization.mockRejectedValue(
      new Error('Network error')
    );

    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Organization Onboarding')).toBeInTheDocument();
    
    // Click next to go to basic info step
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Now we should be on the basic info step
    await waitFor(() => {
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to financials
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the financials step
    await waitFor(() => {
      expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
    });

    await fillFinancials(user);
    
    // Click next to go to purpose
    await user.click(screen.getByText('Continue'));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Click next to complete organization creation
    await user.click(screen.getByText('Continue'));

    // Should show network error message
    await waitFor(() => {
      expect(screen.getByText('Network error occurred')).toBeInTheDocument();
    });
  });

  test('validates all required fields before submission', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Organization Onboarding')).toBeInTheDocument();
    
    // Click next to go to basic info step
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Now we should be on the basic info step
    await waitFor(() => {
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });

    // Fill only some fields
    const nameInput = screen.getByLabelText('Organization Name');
    await user.type(nameInput, 'Test Organization');

    // Try to proceed
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Should show validation error for missing industry
    await waitFor(() => {
      expect(screen.getByText('Industry is required')).toBeInTheDocument();
    });
  });

  test('sends correct payload structure to API', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Organization Onboarding')).toBeInTheDocument();
    
    // Click next to go to basic info step
    const nextButton = screen.getByText('Continue');
    await user.click(nextButton);

    // Now we should be on the basic info step
    await waitFor(() => {
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to financials
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the financials step
    await waitFor(() => {
      expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
    });

    await fillFinancials(user);
    
    // Click next to go to purpose
    await user.click(screen.getByText('Continue'));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Click next to complete organization creation
    await user.click(screen.getByText('Continue'));

    // Verify the exact payload structure
    await waitFor(() => {
      expect(mockOrganizationService.createOrganization).toHaveBeenCalledWith(
        expect.objectContaining({
          name: expect.any(String),
          industry: expect.any(String),
          website_url: expect.any(String),
          organization_size: expect.any(String),
          current_funding_status: expect.any(String),
          key_investors_backers: expect.any(String),
          revenue_status: expect.any(String),
          profitability_status: expect.any(String),
          why_statement: expect.any(String),
          origin_story: expect.any(String),
          core_beliefs_principles: expect.any(String),
          how_we_live_purpose: expect.any(String),
        })
      );
    });
  });
});
