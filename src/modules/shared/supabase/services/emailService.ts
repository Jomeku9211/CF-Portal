import { supabase } from '../../../config/supabase';

export interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  emailId?: string;
}

class SupabaseEmailService {
  /**
   * Send email using Supabase's built-in SMTP (configured with Resend)
   * This will use your SMTP settings: smtp.resend.com:465
   */
  async sendEmail(emailData: EmailData): Promise<EmailResponse> {
    try {
      // Use Supabase's built-in email functionality
      // This will use your configured SMTP settings (Resend)
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.htmlContent,
          text: emailData.textContent || emailData.htmlContent.replace(/<[^>]*>/g, '')
        }
      });

      if (error) {
        console.error('Supabase email error:', error);
        return {
          success: false,
          message: error.message || 'Failed to send email'
        };
      }

      return {
        success: true,
        message: 'Email sent successfully via Resend SMTP',
        emailId: data?.id
      };
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        message: 'Network error occurred while sending email'
      };
    }
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(userData: { name: string; email: string }): Promise<EmailResponse> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">Welcome to Coder Farm! 🚀</h1>
          <p style="color: #666; font-size: 16px;">We're excited to have you on board.</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Hi ${userData.name},</h2>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            Welcome to Coder Farm! We're thrilled to have you join our community of developers, 
            clients, and agencies.
          </p>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            Get ready to connect with amazing developers and build something incredible together.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://coderfarm.in/dashboard" 
             style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; 
                    border-radius: 6px; display: inline-block; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #999; font-size: 14px;">
            Best regards,<br>
            <strong>The Coder Farm Team</strong><br>
            <a href="mailto:dheeraj@coderfarm.in" style="color: #007bff;">dheeraj@coderfarm.in</a>
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: userData.email,
      subject: 'Welcome to Coder Farm - Let\'s Get Started! 🚀',
      htmlContent
    });
  }

  /**
   * Send thank you email
   */
  async sendThankYouEmail(userData: { name: string; email: string }): Promise<EmailResponse> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">Thank You! 🎉</h1>
          <p style="color: #666; font-size: 16px;">We appreciate you joining our community.</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Hi ${userData.name},</h2>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            Thank you for joining Coder Farm! We appreciate you taking the time to complete your profile 
            and become part of our community.
          </p>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            We'll be in touch soon with next steps and exciting opportunities to connect with other 
            developers and clients.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://coderfarm.in/onboarding" 
             style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; 
                    border-radius: 6px; display: inline-block; font-weight: bold;">
            Complete Your Profile
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #999; font-size: 14px;">
            Best regards,<br>
            <strong>The Coder Farm Team</strong><br>
            <a href="mailto:dheeraj@coderfarm.in" style="color: #007bff;">dheeraj@coderfarm.in</a>
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: userData.email,
      subject: 'Welcome to Coder Farm! 🎉',
      htmlContent
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(userData: { name: string; email: string; resetToken: string }): Promise<EmailResponse> {
    const resetUrl = `https://coderfarm.in/reset-password?token=${userData.resetToken}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">Password Reset Request 🔐</h1>
          <p style="color: #666; font-size: 16px;">We received a request to reset your password.</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Hi ${userData.name},</h2>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            We received a request to reset your password for your Coder Farm account. 
            If you didn't make this request, you can safely ignore this email.
          </p>
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            To reset your password, click the button below:
          </p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" 
               style="background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; 
                      border-radius: 6px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #555; line-height: 1.6; margin-top: 20px; font-size: 14px;">
            This link will expire in 1 hour for security reasons.
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #999; font-size: 14px;">
            Best regards,<br>
            <strong>The Coder Farm Team</strong><br>
            <a href="mailto:dheeraj@coderfarm.in" style="color: #007bff;">dheeraj@coderfarm.in</a>
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: userData.email,
      subject: 'Reset Your Coder Farm Password 🔐',
      htmlContent
    });
  }
}

export const supabaseEmailService = new SupabaseEmailService();
