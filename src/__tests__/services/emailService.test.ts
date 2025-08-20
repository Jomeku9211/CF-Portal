import { emailService, ThankYouEmailData, EmailData } from '../../services/emailService';

// Mock fetch globally
global.fetch = jest.fn();

describe('EmailService', () => {
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    jest.clearAllMocks();
  });

  describe('sendThankYouEmail', () => {
    const mockUserData: ThankYouEmailData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    it('should send thank you email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ emailId: 'email-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendThankYouEmail(mockUserData);

      expect(result).toEqual({
        success: true,
        message: 'Thank you email sent successfully',
        emailId: 'email-123'
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"to":"john@example.com"'),
        }
      );
      
      // Check that the body contains the expected content
      const callArgs = mockFetch.mock.calls[0][1];
      expect(callArgs).toBeDefined();
      const body = JSON.parse(callArgs!.body as string);
      expect(body.to).toBe('john@example.com');
      expect(body.subject).toBe('Welcome to Coder Farm! 🎉');
      expect(body.htmlContent).toContain('<!DOCTYPE html>');
      expect(body.textContent).toContain('Welcome to Coder Farm!');
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'API Error' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendThankYouEmail(mockUserData);

      expect(result).toEqual({
        success: false,
        message: 'API Error'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendThankYouEmail(mockUserData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send thank you email'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await emailService.sendThankYouEmail(mockUserData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred while sending email'
      });
    });
  });

  describe('sendWelcomeEmail', () => {
    const mockUserData: ThankYouEmailData = {
      name: 'Jane Smith',
      email: 'jane@example.com'
    };

    it('should send welcome email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ emailId: 'welcome-456' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendWelcomeEmail(mockUserData);

      expect(result).toEqual({
        success: true,
        message: 'Welcome email sent successfully',
        emailId: 'welcome-456'
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"to":"jane@example.com"'),
        }
      );
      
      // Check that the body contains the expected content
      const callArgs = mockFetch.mock.calls[0][1];
      expect(callArgs).toBeDefined();
      const body = JSON.parse(callArgs!.body as string);
      expect(body.to).toBe('jane@example.com');
      expect(body.subject).toBe('Welcome to Coder Farm - Let\'s Get Started! 🚀');
      expect(body.htmlContent).toContain('<!DOCTYPE html>');
      expect(body.textContent).toContain('Welcome to Coder Farm');
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Welcome API Error' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendWelcomeEmail(mockUserData);

      expect(result).toEqual({
        success: false,
        message: 'Welcome API Error'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendWelcomeEmail(mockUserData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send welcome email'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Welcome network error'));

      const result = await emailService.sendWelcomeEmail(mockUserData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred while sending email'
      });
    });
  });









  describe('sendCustomEmail', () => {
    const mockEmailData: EmailData = {
      to: 'custom@example.com',
      subject: 'Custom Subject',
      htmlContent: '<p>Custom HTML content</p>',
      textContent: 'Custom text content'
    };

    it('should send custom email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ emailId: 'custom-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendCustomEmail(mockEmailData);

      expect(result).toEqual({
        success: true,
        message: 'Email sent successfully',
        emailId: 'custom-123'
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockEmailData),
        }
      );
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Custom API Error' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendCustomEmail(mockEmailData);

      expect(result).toEqual({
        success: false,
        message: 'Custom API Error'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await emailService.sendCustomEmail(mockEmailData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send email'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Custom network error'));

      const result = await emailService.sendCustomEmail(mockEmailData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred while sending email'
      });
    });
  });

  describe('Email Content Generation', () => {
    it('should generate thank you email with proper HTML structure', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ emailId: 'test-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await emailService.sendThankYouEmail({ name: 'Test User', email: 'test@example.com' });

      const callArgs = mockFetch.mock.calls[0][1];
      expect(callArgs).toBeDefined();
      const body = JSON.parse(callArgs!.body as string);
      
      expect(body.htmlContent).toContain('<!DOCTYPE html>');
      expect(body.htmlContent).toContain('Test User');
      expect(body.htmlContent).toContain('Welcome to Coder Farm!');
      expect(body.htmlContent).toContain('Thank you for joining Coder Farm!');
    });

    it('should generate welcome email with proper HTML structure', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ emailId: 'test-456' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await emailService.sendWelcomeEmail({ name: 'Welcome User', email: 'welcome@example.com' });

      const callArgs = mockFetch.mock.calls[0][1];
      expect(callArgs).toBeDefined();
      const body = JSON.parse(callArgs!.body as string);
      
      expect(body.htmlContent).toContain('<!DOCTYPE html>');
      expect(body.htmlContent).toContain('Welcome User');
      expect(body.htmlContent).toContain('Welcome to Coder Farm');
      expect(body.htmlContent).toContain('Let\'s Get Started');
    });
  });
});
