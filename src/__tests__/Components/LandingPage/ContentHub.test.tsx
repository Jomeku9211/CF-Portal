import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ContentHub } from '../../../components/LandingPage/ContentHub';

// Mock fetch globally but allow us to control responses
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock the TopBanner and Navbar components
jest.mock('../../../components/LandingPage/TopBanner', () => ({
  TopBanner: () => <div data-testid="top-banner">TopBanner</div>
}));

jest.mock('../../../components/LandingPage/Navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>
}));

describe('ContentHub Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  test('renders ContentHub component with form', () => {
    render(<ContentHub />);
    
    // Check if main sections are rendered
    expect(screen.getByText('👉 Hiring is Broken: Be Our Guest. Let\'s Fix It. (No B.S. Allowed.)')).toBeInTheDocument();
    expect(screen.getByText('Ready to Share Your Story?')).toBeInTheDocument();
    
    // Check if form fields are rendered
    expect(screen.getByLabelText('First Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('What can I (Dheeraj / Coderfarm) do for you in return? *')).toBeInTheDocument();
  });

  test('form submission with successful API response', async () => {
    const user = userEvent.setup();
    
    // Mock successful fetch response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    render(<ContentHub />);
    
    // Fill in required fields
    await user.type(screen.getByLabelText('First Name *'), 'John');
    await user.type(screen.getByLabelText('Last Name *'), 'Doe');
    await user.type(screen.getByLabelText('Email *'), 'john.doe@example.com');
    await user.type(screen.getByLabelText('What can I (Dheeraj / Coderfarm) do for you in return? *'), 'I can help with technical interviews');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /➡️ Apply to Be a Guest/i });
    await user.click(submitButton);
    
    // Check if fetch was called with correct data
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.airtable.com/v0/apphFz0ba6KTb85DE/tblFrz1vPGsvZ0yzt',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer patFClficxpGIUnJF.be5a51a7e3fabe7337cd2cb13dc3f10234fc52d8a1f60e012eb68be7b2fcc982',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            records: [{
              fields: {
                'Name': 'John',
                'Last Name': 'Doe',
                'Email': 'john.doe@example.com',
                'Phone': '',
                'Linkedin Url': '',
                'What can I do for you in return?': 'I can help with technical interviews',
                'Subscribe to updates': false
              }
            }]
          })
        }
      );
    });
    
    // Check if thank you message is displayed
    await waitFor(() => {
      expect(screen.getByText('🎉 Thank you for reaching out!')).toBeInTheDocument();
    });
  });

  test('form submission with 403 Forbidden error (Airtable permissions issue)', async () => {
    const user = userEvent.setup();
    
    // Mock 403 Forbidden response (Airtable permissions issue)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      json: async () => ({
        error: {
          type: 'INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND',
          message: 'Invalid permissions, or the requested model was not found'
        }
      })
    });
    
    // Mock console.error and alert
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<ContentHub />);
    
    // Fill in required fields
    await user.type(screen.getByLabelText('First Name *'), 'John');
    await user.type(screen.getByLabelText('Last Name *'), 'Doe');
    await user.type(screen.getByLabelText('Email *'), 'john.doe@example.com');
    await user.type(screen.getByLabelText('What can I (Dheeraj / Coderfarm) do for you in return? *'), 'I can help with technical interviews');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /➡️ Apply to Be a Guest/i });
    await user.click(submitButton);
    
    // Check if error is handled properly
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('There was an error submitting your form. Please try again.');
    });
    
    // Check if console.error was called with the right error message
    expect(consoleSpy).toHaveBeenCalledWith(
      '💥 Error submitting form:',
      expect.objectContaining({
        message: 'Failed to submit form: 403 Forbidden'
      })
    );
    
    // Clean up
    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  test('form submission with 422 validation error (Airtable field mapping issue)', async () => {
    const user = userEvent.setup();
    
    // Mock 422 Unprocessable Content response (field validation issue)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
      statusText: 'Unprocessable Content',
      json: async () => ({
        error: {
          type: 'INVALID_VALUE_FOR_COLUMN',
          message: 'Invalid value for column',
          details: {
            field: 'What can I do for you in return?'
          }
        }
      })
    });
    
    // Mock console.error and alert
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<ContentHub />);
    
    // Fill in required fields
    await user.type(screen.getByLabelText('First Name *'), 'John');
    await user.type(screen.getByLabelText('Last Name *'), 'Doe');
    await user.type(screen.getByLabelText('Email *'), 'john.doe@example.com');
    await user.type(screen.getByLabelText('What can I (Dheeraj / Coderfarm) do for you in return? *'), 'I can help with technical interviews');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /➡️ Apply to Be a Guest/i });
    await user.click(submitButton);
    
    // Check if error is handled properly
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('There was an error submitting your form. Please try again.');
    });
    
    // Check if console.error was called with the right error message
    expect(consoleSpy).toHaveBeenCalledWith(
      '💥 Error submitting form:',
      expect.objectContaining({
        message: 'Failed to submit form: 422 Unprocessable Content'
      })
    );
    
    // Clean up
    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  test('form shows loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock slow fetch response
    mockFetch.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
    );
    
    render(<ContentHub />);
    
    // Fill in required fields
    await user.type(screen.getByLabelText('First Name *'), 'John');
    await user.type(screen.getByLabelText('Last Name *'), 'Doe');
    await user.type(screen.getByLabelText('Email *'), 'john.doe@example.com');
    await user.type(screen.getByLabelText('What can I (Dheeraj / Coderfarm) do for you in return? *'), 'I can help with technical interviews');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /➡️ Apply to Be a Guest/i });
    await user.click(submitButton);
    
    // Check if button shows loading state
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('form validation requires mandatory fields', async () => {
    const user = userEvent.setup();
    render(<ContentHub />);
    
    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /➡️ Apply to Be a Guest/i });
    await user.click(submitButton);
    
    // Form should not submit and fetch should not be called
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('logs detailed information during form submission', async () => {
    const user = userEvent.setup();
    
    // Mock successful fetch response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    // Mock console.log to capture logs
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<ContentHub />);
    
    // Fill in required fields
    await user.type(screen.getByLabelText('First Name *'), 'John');
    await user.type(screen.getByLabelText('Last Name *'), 'Doe');
    await user.type(screen.getByLabelText('Email *'), 'john.doe@example.com');
    await user.type(screen.getByLabelText('What can I (Dheeraj / Coderfarm) do for you in return? *'), 'I can help with technical interviews');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /➡️ Apply to Be a Guest/i });
    await user.click(submitButton);
    
    // Check if detailed logging is working
    expect(consoleSpy).toHaveBeenCalledWith('🚀 Starting form submission...');
    expect(consoleSpy).toHaveBeenCalledWith('📝 Form data:', expect.any(Object));
    expect(consoleSpy).toHaveBeenCalledWith('📤 Sending payload to Airtable:', expect.any(Object));
    expect(consoleSpy).toHaveBeenCalledWith('📡 Response status:', 200);
    expect(consoleSpy).toHaveBeenCalledWith('✅ Form submitted successfully to Airtable!');
    
    // Clean up
    consoleSpy.mockRestore();
  });
});
