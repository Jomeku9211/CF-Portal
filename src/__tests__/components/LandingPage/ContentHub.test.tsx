import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentHub } from '../../../components/LandingPage/ContentHub';

// Mock fetch globally
global.fetch = jest.fn();

describe('ContentHub', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should render the component correctly', () => {
    render(<ContentHub />);
    
    const container = document.querySelector('.w-full.bg-white.font-sans');
    expect(container).toBeInTheDocument();
  });

  it('should render the hero section', () => {
    render(<ContentHub />);
    
    const heroSection = document.querySelector('.bg-\\[\\#f5f8ff\\].py-16.px-6.md\\:py-24');
    expect(heroSection).toBeInTheDocument();
  });

  it('should render the main headline', () => {
    render(<ContentHub />);
    
    const headline = screen.getByText(/Hiring is Broken: Be Our Guest/);
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveClass('text-3xl', 'md:text-5xl', 'font-bold', 'text-[#1e335f]');
  });

  it('should render the hero description', () => {
    render(<ContentHub />);
    
    const description = screen.getByText(/Are you a founder, HR leader, tech lead/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-lg', 'md:text-xl', 'text-gray-600');
  });

  it('should render the apply button', () => {
    render(<ContentHub />);
    
    const applyButtons = screen.getAllByText(/Apply to Be a Guest/);
    expect(applyButtons.length).toBeGreaterThan(0);
  });

  it('should render the about podcast section', () => {
    render(<ContentHub />);
    
    const aboutSection = screen.getByText(/About the Podcast/);
    expect(aboutSection).toBeInTheDocument();
    expect(aboutSection).toHaveClass('text-2xl', 'md:text-4xl', 'font-bold', 'text-[#1e335f]');
  });

  it('should render the podcast description', () => {
    render(<ContentHub />);
    const aboutHeading = screen.getByText(/About the Podcast/);
    const aboutSection = aboutHeading.closest('section') as HTMLElement;
    const matches = within(aboutSection).getAllByText((_, node) => {
      const text = node?.textContent || '';
      return node?.tagName.toLowerCase() === 'p' && text.includes('is hosted by Coderfarm');
    });
    expect(matches[0]).toBeInTheDocument();
  });

  it('should render the what to expect section', () => {
    render(<ContentHub />);
    
    const expectSection = screen.getByText(/What to Expect as a Guest/);
    expect(expectSection).toBeInTheDocument();
  });

  it('should render all 6 expectation cards', () => {
    render(<ContentHub />);
    
    const expectedTitles = [
      'Introduction',
      'Beyond the Resume',
      'The Core: Hiring, Teams & Leadership',
      'Rapid Fire',
      'Role Play',
      'React & Debate'
    ];

    expectedTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('should render the who should apply section', () => {
    render(<ContentHub />);
    
    const whoSection = screen.getByText(/Who Should Apply?/);
    expect(whoSection).toBeInTheDocument();
  });

  it('should render all 4 role cards', () => {
    render(<ContentHub />);
    
    const expectedRoles = [
      '🚀 Startup Founders',
      '👩‍💼 HR Leaders',
      '🧑‍💻 Tech Leads/CTOs',
      '👨‍🎤 Developers'
    ];

    expectedRoles.forEach(role => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it('should render the why join section', () => {
    render(<ContentHub />);
    
    const whySection = screen.getByText(/Why Join?/);
    expect(whySection).toBeInTheDocument();
  });

  it('should render all 3 benefit items', () => {
    render(<ContentHub />);
    
    const expectedBenefits = [
      'Share your story and insights',
      'Build your personal brand in the IT/startup space',
      'Be part of the movement to fix hiring'
    ];

    expectedBenefits.forEach(benefit => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });
  });

  it('should render the featured episodes section', () => {
    render(<ContentHub />);
    
    const episodesSection = screen.getByText(/Featured Past Episodes/);
    expect(episodesSection).toBeInTheDocument();
  });

  it('should render all 3 episode cards', () => {
    render(<ContentHub />);
    
    const expectedEpisodes = [
      'Why Traditional Interviews Fail',
      'Building Teams That Last',
      'The Future of Technical Assessment'
    ];

    expectedEpisodes.forEach(episode => {
      expect(screen.getByText(episode)).toBeInTheDocument();
    });
  });

  it('should render the guest form section', () => {
    render(<ContentHub />);
    
    const formSection = screen.getByText(/Ready to Share Your Story?/);
    expect(formSection).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    render(<ContentHub />);
    
    const expectedFields = [
      'First Name *',
      'Last Name *',
      'Email *',
      'Phone No. (optional)',
      'LinkedIn URL (optional)',
      'What can I (Dheeraj / Coderfarm) do for you in return? *'
    ];

    expectedFields.forEach(field => {
      expect(screen.getByText(field)).toBeInTheDocument();
    });
  });

  it('should render the subscribe checkbox', () => {
    render(<ContentHub />);
    
    const subscribeLabel = screen.getByText(/Subscribe to podcast updates & newsletter/);
    expect(subscribeLabel).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    render(<ContentHub />);
    
    const form = document.querySelector('form') as HTMLFormElement;
    const submitButton = within(form).getByRole('button', { name: /Apply to Be a Guest/ });
    expect(submitButton).toBeInTheDocument();
  });

  it('should handle form input changes', async () => {
    const user = userEvent.setup();
    render(<ContentHub />);
    
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle checkbox changes', async () => {
    const user = userEvent.setup();
    render(<ContentHub />);
    
    const subscribeCheckbox = screen.getByLabelText(/Subscribe to podcast updates & newsletter/);
    
    await user.click(subscribeCheckbox);
    expect(subscribeCheckbox).toBeChecked();
    
    await user.click(subscribeCheckbox);
    expect(subscribeCheckbox).not.toBeChecked();
  });

  it('should handle textarea changes', async () => {
    const user = userEvent.setup();
    render(<ContentHub />);
    
    const textarea = screen.getByPlaceholderText('Let me know how I can help you...');
    
    await user.type(textarea, 'Help me find talent');
    expect(textarea).toHaveValue('Help me find talent');
  });

  it('should show validation error for missing required fields', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<ContentHub />);
    
    const form = document.querySelector('form') as HTMLFormElement;
    const submitButton = within(form).getByRole('button', { name: /Apply to Be a Guest/ });
    await user.click(submitButton);
    
    expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields.');
    alertSpy.mockRestore();
  });

  it('should submit form successfully', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({})
    });
    
    render(<ContentHub />);
    
    // Fill required fields
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    const textarea = screen.getByPlaceholderText('Let me know how I can help you...');
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(textarea, 'Help me find talent');
    
    const form = document.querySelector('form') as HTMLFormElement;
    const submitButton = within(form).getByRole('button', { name: /Apply to Be a Guest/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.airtable.com/v0/apphFz0ba6KTb85DE/tblFrz1vPGsvZ0yzt',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer patFClficxpGIUnJF.be5a51a7e3fabe7337cd2cb13dc3f10234fc52d8a1f60e012eb68be7b2fcc982',
            'Content-Type': 'application/json'
          }
        })
      );
    });
  });

  it('should handle form submission error', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    render(<ContentHub />);
    
    // Fill required fields
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    const textarea = screen.getByPlaceholderText('Let me know how I can help you...');
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(textarea, 'Help me find talent');
    
    const form = document.querySelector('form') as HTMLFormElement;
    const submitButton = within(form).getByRole('button', { name: /Apply to Be a Guest/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('There was an error submitting your form. Please try again.');
    });
    
    alertSpy.mockRestore();
  });

  it('should handle API error response', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ error: 'Invalid data' })
    });
    
    render(<ContentHub />);
    
    // Fill required fields
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    const textarea = screen.getByPlaceholderText('Let me know how I can help you...');
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(textarea, 'Help me find talent');
    
    const form = document.querySelector('form') as HTMLFormElement;
    const submitButton = within(form).getByRole('button', { name: /Apply to Be a Guest/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('There was an error submitting your form. Please try again.');
    });
    
    alertSpy.mockRestore();
  });

  it('should show thank you message after successful submission', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({})
    });
    
    render(<ContentHub />);
    
    // Fill required fields
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    const textarea = screen.getByPlaceholderText('Let me know how I can help you...');
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(textarea, 'Help me find talent');
    
    const form = document.querySelector('form') as HTMLFormElement;
    const submitButton = within(form).getByRole('button', { name: /Apply to Be a Guest/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Thank you for reaching out!/)).toBeInTheDocument();
    });
  });

  it('should return to form when return button is clicked', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({})
    });
    
    render(<ContentHub />);
    
    // Submit form first
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    const textarea = screen.getByPlaceholderText('Let me know how I can help you...');
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(textarea, 'Help me find talent');
    
    const form = document.querySelector('form') as HTMLFormElement;
    const submitButton = within(form).getByRole('button', { name: /Apply to Be a Guest/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Thank you for reaching out!/)).toBeInTheDocument();
    });
    
    // Click return button
    const returnButton = screen.getByText(/Return to Home Page/);
    await user.click(returnButton);
    
    expect(screen.getByText(/Ready to Share Your Story?/)).toBeInTheDocument();
  });

  it('should maintain form data state correctly', async () => {
    const user = userEvent.setup();
    render(<ContentHub />);
    
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    const phoneInput = screen.getByLabelText('Phone No. (optional)');
    const linkedinInput = screen.getByLabelText('LinkedIn URL (optional)');
    const textarea = screen.getByPlaceholderText('Let me know how I can help you...');
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '1234567890');
    await user.type(linkedinInput, 'https://linkedin.com/in/johndoe');
    await user.type(textarea, 'Help me find talent');
    
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('1234567890');
    expect(linkedinInput).toHaveValue('https://linkedin.com/in/johndoe');
    expect(textarea).toHaveValue('Help me find talent');
  });

  it('should have correct CSS classes for form elements', () => {
    render(<ContentHub />);
    
    const form = document.querySelector('form');
    expect(form).toHaveClass('bg-white', 'p-8', 'rounded-lg', 'shadow-md');
    
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"]');
    inputs.forEach(input => {
      expect(input).toHaveClass('w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-md');
    });
    
    const textarea = document.querySelector('textarea');
    expect(textarea).toHaveClass('w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-md');
  });

  it('should have correct grid layout for form fields', () => {
    render(<ContentHub />);
    
    const nameFieldsContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-4');
    expect(nameFieldsContainer).toBeInTheDocument();
  });

  it('should render with correct background colors', () => {
    render(<ContentHub />);
    
    const blueBackgrounds = document.querySelectorAll('.bg-\\[\\#f5f8ff\\]');
    expect(blueBackgrounds.length).toBeGreaterThan(0);
    
    const whiteBackgrounds = document.querySelectorAll('.bg-white');
    expect(whiteBackgrounds.length).toBeGreaterThan(0);
  });

  it('should render with correct text colors', () => {
    render(<ContentHub />);
    
    const blueTexts = document.querySelectorAll('.text-\\[\\#1e335f\\]');
    expect(blueTexts.length).toBeGreaterThan(0);
    
    const orangeTexts = document.querySelectorAll('.text-\\[\\#ff7043\\]');
    expect(orangeTexts.length).toBeGreaterThan(0);
  });
});
