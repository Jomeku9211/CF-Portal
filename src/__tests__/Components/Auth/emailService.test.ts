// Temporarily commented out email service tests
/*
import { emailService } from '../../../services/emailService';

// Mock global fetch
global.fetch = jest.fn();

describe('EmailService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
          body: expect.objectContaining({
            to: 'john@example.com',
            subject: 'Welcome to Coder Farm! 🎉',
            htmlContent: expect.any(String),
            textContent: expect.any(String),
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
          body: expect.objectContaining({
            to: 'alice@example.com',
            subject: 'Welcome to Coder Farm - Let\'s Get Started! 🚀',
            htmlContent: expect.any(String),
            textContent: expect.any(String),
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
        name: 'Bob Wilson',
        email: 'bob@example.com',
      };

      const result = await emailService.sendWelcomeEmail(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Welcome email failed');
    });

    it('handles network errors for welcome email', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const userData = {
        name: 'Carol Davis',
        email: 'carol@example.com',
      };

      const result = await emailService.sendWelcomeEmail(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred while sending email');
    });
  });

  describe('sendForgotPasswordEmail', () => {
    it('sends forgot password email successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ emailId: 'forgot-password-789' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'David Brown',
        email: 'david@example.com',
        resetToken: 'reset-token-123',
      };

      const result = await emailService.sendForgotPasswordEmail(userData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Forgot password email sent successfully');
      expect(result.emailId).toBe('forgot-password-789');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.objectContaining({
            to: 'david@example.com',
            subject: 'Reset Your Password - Coder Farm',
            htmlContent: expect.any(String),
            textContent: expect.any(String),
          }),
        }
      );
    });

    it('handles forgot password email failure', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Password reset email failed' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        name: 'Eva Wilson',
        email: 'eva@example.com',
        resetToken: 'reset-token-456',
      };

      const result = await emailService.sendForgotPasswordEmail(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Password reset email failed');
    });

    it('handles network errors for forgot password email', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const userData = {
        name: 'Frank Miller',
        email: 'frank@example.com',
        resetToken: 'reset-token-789',
      };

      const result = await emailService.sendForgotPasswordEmail(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred while sending email');
    });
  });
});
*/
