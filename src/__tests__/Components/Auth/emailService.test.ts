import { emailService } from '../../../services/emailService';

// Mock fetch globally
global.fetch = jest.fn();

describe('EmailService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  describe('sendThankYouEmail', () => {
    it('sends thank you email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ emailId: 'email-123' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = await emailService.sendThankYouEmail(userData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Thank you email sent successfully');
      expect(result.emailId).toBe('email-123');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'john@example.com',
            subject: 'Welcome to Coder Farm! 🎉',
            htmlContent: expect.stringContaining('Welcome aboard, John Doe! 🎉'),
            textContent: expect.stringContaining('Welcome to Coder Farm! 🎉'),
          }),
        }
      );
    });

    it('handles email sending failure', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Email service unavailable' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const result = await emailService.sendThankYouEmail(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email service unavailable');
    });

    it('handles network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const userData = {
        name: 'Bob Smith',
        email: 'bob@example.com',
      };

      const result = await emailService.sendThankYouEmail(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred while sending email');
    });
  });

  describe('sendWelcomeEmail', () => {
    it('sends welcome email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ emailId: 'welcome-email-456' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'Alice Johnson',
        email: 'alice@example.com',
      };

      const result = await emailService.sendWelcomeEmail(userData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Welcome email sent successfully');
      expect(result.emailId).toBe('welcome-email-456');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'alice@example.com',
            subject: 'Welcome to Coder Farm - Let\'s Get Started! 🚀',
            htmlContent: expect.stringContaining('Welcome to Coder Farm, Alice Johnson! 🚀'),
            textContent: expect.stringContaining('Welcome to Coder Farm - Let\'s Get Started! 🚀'),
          }),
        }
      );
    });

    it('handles welcome email sending failure', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Welcome email failed' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
      };

      const result = await emailService.sendWelcomeEmail(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Welcome email failed');
    });
  });

  describe('sendCustomEmail', () => {
    it('sends custom email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ emailId: 'custom-email-789' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const emailData = {
        to: 'custom@example.com',
        subject: 'Custom Subject',
        htmlContent: '<h1>Custom HTML</h1>',
        textContent: 'Custom text content',
      };

      const result = await emailService.sendCustomEmail(emailData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Email sent successfully');
      expect(result.emailId).toBe('custom-email-789');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        }
      );
    });

    it('handles custom email sending failure', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Custom email failed' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const emailData = {
        to: 'custom@example.com',
        subject: 'Custom Subject',
        htmlContent: '<h1>Custom HTML</h1>',
      };

      const result = await emailService.sendCustomEmail(emailData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Custom email failed');
    });
  });

  describe('email content generation', () => {
    it('generates thank you email with correct user data', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ emailId: 'test-email' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      await emailService.sendThankYouEmail(userData);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.htmlContent).toContain('Welcome aboard, Test User! 🎉');
      expect(requestBody.htmlContent).toContain('Coder Farm');
      expect(requestBody.htmlContent).toContain('Get Started Now');
      expect(requestBody.textContent).toContain('Welcome to Coder Farm! 🎉');
      expect(requestBody.textContent).toContain('Hi Test User');
      expect(requestBody.subject).toBe('Welcome to Coder Farm! 🎉');
    });

    it('generates welcome email with correct user data', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ emailId: 'welcome-test' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'Welcome User',
        email: 'welcome@example.com',
      };

      await emailService.sendWelcomeEmail(userData);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.htmlContent).toContain('Welcome to Coder Farm, Welcome User! 🚀');
      expect(requestBody.htmlContent).toContain('Begin Your Journey');
      expect(requestBody.textContent).toContain('Welcome to Coder Farm - Let\'s Get Started! 🚀');
      expect(requestBody.textContent).toContain('Hi Welcome User');
      expect(requestBody.subject).toBe('Welcome to Coder Farm - Let\'s Get Started! 🚀');
    });
  });
});
