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
    try { localStorage.setItem('authToken', 'test-token'); } catch {}
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
    // Name and website
    const nameInput = screen.getByPlaceholderText(/Acme Inc/i);
    await user.type(nameInput, 'Test Organization');
    const websiteInput = screen.getByPlaceholderText(/acme\.com/i);
    await user.type(websiteInput, 'https://test.com');

    // Company size pill (click the label text to avoid duplicate radio matches)
    await user.click(screen.getByText(/^1–10$/));

    // Business Details -> Funding then Industry
    const fundingBtn = screen.getByRole('button', { name: /Select funding status/i });
    await user.click(fundingBtn);
    await user.click(screen.getByText(/Bootstrapped/i));
    // Industry
    const industryBtn = screen.getByRole('button', { name: /Select industry/i });
    await user.click(industryBtn);
    await user.click(screen.getByText(/SaaS/i));

    // Revenue Status stepper
    await user.click(screen.getByText(/Pre-Revenue/i));
  };

  // Purpose step: only origin story is required for submission
  const fillPurpose = async (user: any) => {
    const originTextarea = screen.getByPlaceholderText(/sparked your journey/i);
    await user.type(originTextarea, 'Started as a side project');
  };
  

  test('successfully creates organization and moves to next step', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Onboarding Organization')).toBeInTheDocument();
    
    // Quick Setup visible
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Acme Inc/i)).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to purpose
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText(/Purpose & Story/i)).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Proceed to final step and submit
    await user.click(screen.getByRole('button', { name: /next/i })); // to Growth & Success
    await waitFor(() => expect(screen.getByText(/Growth & Success/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /next/i })); // to Culture & Values
    await waitFor(() => expect(screen.getByText(/Culture & Values/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    // Wait for the API call and success (allow objectContaining since mapper adds many fields)
    await waitFor(() => {
      expect(mockOrganizationService.createOrganization).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Organization',
          industry: 'saas',
          website_url: 'https://test.com',
          organization_size: '1-10',
        })
      );
    });

    // Should move to next main step (team onboarding)
    await waitFor(() => {
      expect(screen.getByText('Onboarding Team')).toBeInTheDocument();
    });
  });

  test('shows validation alert for missing required fields', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Onboarding Organization')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Acme Inc/i)).toBeInTheDocument();
    });

    // Navigate through steps without filling and attempt submit
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    await user.click(screen.getByRole('button', { name: /next/i })); // Purpose & Story
    await user.click(screen.getByRole('button', { name: /next/i })); // Growth & Success
    await user.click(screen.getByRole('button', { name: /next/i })); // Culture & Values
    await user.click(screen.getByRole('button', { name: /^submit$/i }));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled();
    });
    alertSpy.mockRestore();
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
    expect(screen.getByText('Onboarding Organization')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/Organisation Profile/i)).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to purpose
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText(/Purpose & Story/i)).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Proceed to submit
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Growth & Success/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Culture & Values/i)).toBeInTheDocument());
    const alertSpy1 = jest.spyOn(window, 'alert').mockImplementation(() => {});
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    // Should show error via alert
    await waitFor(() => expect(alertSpy1).toHaveBeenCalled());
    alertSpy1.mockRestore();

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
    expect(screen.getByText('Onboarding Organization')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/Organisation Profile/i)).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to purpose
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText(/Purpose & Story/i)).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Proceed to submit
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Growth & Success/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Culture & Values/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    // Should show network error via alert
    const alertSpy2 = jest.spyOn(window, 'alert').mockImplementation(() => {});
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(alertSpy2).toHaveBeenCalled());
    alertSpy2.mockRestore();
  });

  test('validates all required fields before submission', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Onboarding Organization')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Acme Inc/i)).toBeInTheDocument();
    });

    // Fill only some fields
    const nameInput = screen.getByPlaceholderText(/Acme Inc/i);
    await user.type(nameInput, 'Test Organization');

    // Attempt submit without completing
    const alertSpy3 = jest.spyOn(window, 'alert').mockImplementation(() => {});
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Purpose & Story/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Growth & Success/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Culture & Values/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(alertSpy3).toHaveBeenCalled());
    alertSpy3.mockRestore();
  });

  test('sends correct payload structure to API', async () => {
    const user = userEvent.setup();
    render(<OnboardingFlow />);

    // First, we should see the welcome step
    expect(screen.getByText('Onboarding Organization')).toBeInTheDocument();
    
    // Quick Setup visible
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Acme Inc/i)).toBeInTheDocument();
    });

    // Fill all required fields
    await fillBasicInfo(user);
    
    // Click next to go to purpose
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now we should be on the purpose step
    await waitFor(() => {
      expect(screen.getByText(/Purpose & Story/i)).toBeInTheDocument();
    });

    await fillPurpose(user);
    
    // Proceed to submit
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Growth & Success/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByText(/Culture & Values/i)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Submit' }));

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
