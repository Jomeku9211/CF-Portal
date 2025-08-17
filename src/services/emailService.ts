const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56';

export interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

export interface ThankYouEmailData {
  name: string;
  email: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  emailId?: string;
}

class EmailService {
  async sendThankYouEmail(userData: ThankYouEmailData): Promise<EmailResponse> {
    try {
      const emailContent = this.generateThankYouEmail(userData);
      
      const response = await fetch(`${XANO_BASE_URL}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userData.email,
          subject: 'Welcome to Coder Farm! 🎉',
          htmlContent: emailContent.html,
          textContent: emailContent.text,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Thank you email sent successfully',
          emailId: data.emailId,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to send thank you email',
        };
      }
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        message: 'Network error occurred while sending email',
      };
    }
  }

  async sendWelcomeEmail(userData: ThankYouEmailData): Promise<EmailResponse> {
    try {
      const emailContent = this.generateWelcomeEmail(userData);
      
      const response = await fetch(`${XANO_BASE_URL}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userData.email,
          subject: 'Welcome to Coder Farm - Let\'s Get Started! 🚀',
          htmlContent: emailContent.html,
          textContent: emailContent.text,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Welcome email sent successfully',
          emailId: data.emailId,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to send welcome email',
        };
      }
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        message: 'Network error occurred while sending email',
      };
    }
  }

  private generateThankYouEmail(userData: ThankYouEmailData) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Coder Farm!</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        .tagline {
            color: #6b7280;
            font-size: 16px;
        }
        .welcome-message {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
            text-align: center;
        }
        .content {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 30px;
        }
        .highlight-box {
            background-color: #eff6ff;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .cta-button:hover {
            background-color: #1d4ed8;
        }
        .features {
            margin: 30px 0;
        }
        .feature-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 10px 0;
        }
        .feature-icon {
            color: #10b981;
            margin-right: 15px;
            font-size: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #2563eb;
            text-decoration: none;
            margin: 0 10px;
        }
        .social-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Coder Farm</div>
            <div class="tagline">Founder-aligned, fit-first hiring for startups</div>
        </div>
        
        <div class="welcome-message">
            Welcome aboard, ${userData.name}! 🎉
        </div>
        
        <div class="content">
            <p>Thank you for joining Coder Farm! We're excited to have you as part of our community of innovative startups and talented developers.</p>
            
            <div class="highlight-box">
                <strong>What's Next?</strong><br>
                You're now ready to explore our platform and find the perfect match for your development needs. Whether you're looking to hire developers or want to be hired, we've got you covered.
            </div>
            
            <div class="features">
                <h3>🚀 What You Can Do Now:</h3>
                <div class="feature-item">
                    <span class="feature-icon">✓</span>
                    <span>Complete your profile and preferences</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">✓</span>
                    <span>Browse through our curated developer profiles</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">✓</span>
                    <span>Connect with developers who match your requirements</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">✓</span>
                    <span>Access our hiring tools and resources</span>
                </div>
            </div>
            
            <p>We're committed to making your hiring journey smooth and successful. Our team is here to support you every step of the way.</p>
        </div>
        
        <div style="text-align: center;">
            <a href="https://coderfarm.com/role-selection" class="cta-button">
                Get Started Now
            </a>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="https://linkedin.com/company/coderfarm">LinkedIn</a>
                <a href="https://twitter.com/coderfarm">Twitter</a>
                <a href="https://github.com/coderfarm">GitHub</a>
            </div>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@coderfarm.com">support@coderfarm.com</a></p>
            <p>© 2024 Coder Farm. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

    const text = `
Welcome to Coder Farm! 🎉

Hi ${userData.name},

Thank you for joining Coder Farm! We're excited to have you as part of our community of innovative startups and talented developers.

What's Next?
You're now ready to explore our platform and find the perfect match for your development needs. Whether you're looking to hire developers or want to be hired, we've got you covered.

What You Can Do Now:
✓ Complete your profile and preferences
✓ Browse through our curated developer profiles
✓ Connect with developers who match your requirements
✓ Access our hiring tools and resources

We're committed to making your hiring journey smooth and successful. Our team is here to support you every step of the way.

Get Started Now: https://coderfarm.com/role-selection

If you have any questions, feel free to reach out to us at support@coderfarm.com

Best regards,
The Coder Farm Team

© 2024 Coder Farm. All rights reserved.`;

    return { html, text };
  }

  private generateWelcomeEmail(userData: ThankYouEmailData) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Coder Farm - Let's Get Started!</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        .tagline {
            color: #6b7280;
            font-size: 16px;
        }
        .welcome-message {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
            text-align: center;
        }
        .content {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 30px;
        }
        .highlight-box {
            background-color: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
        }
        .cta-button {
            display: inline-block;
            background-color: #0ea5e9;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .cta-button:hover {
            background-color: #0284c7;
        }
        .steps {
            margin: 30px 0;
        }
        .step-item {
            display: flex;
            align-items: flex-start;
            margin: 20px 0;
            padding: 15px;
            background-color: #f8fafc;
            border-radius: 8px;
        }
        .step-number {
            background-color: #0ea5e9;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .step-content h4 {
            margin: 0 0 8px 0;
            color: #1e293b;
        }
        .step-content p {
            margin: 0;
            color: #64748b;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Coder Farm</div>
            <div class="tagline">Founder-aligned, fit-first hiring for startups</div>
        </div>
        
        <div class="welcome-message">
            Welcome to Coder Farm, ${userData.name}! 🚀
        </div>
        
        <div class="content">
            <p>We're thrilled to have you on board! Coder Farm is your gateway to connecting with exceptional developers who are perfectly aligned with your startup's vision and culture.</p>
            
            <div class="highlight-box">
                <strong>Why Coder Farm?</strong><br>
                We believe that successful hiring goes beyond just skills - it's about finding developers who share your passion, understand your mission, and fit seamlessly into your team culture.
            </div>
            
            <div class="steps">
                <h3>🎯 Your Journey Starts Here:</h3>
                
                <div class="step-item">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Complete Your Profile</h4>
                        <p>Tell us about your company, culture, and what you're looking for in a developer.</p>
                    </div>
                </div>
                
                <div class="step-item">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Discover Perfect Matches</h4>
                        <p>Browse through our curated developer profiles that match your requirements.</p>
                    </div>
                </div>
                
                <div class="step-item">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Connect & Collaborate</h4>
                        <p>Start conversations with developers and find your perfect team member.</p>
                    </div>
                </div>
            </div>
            
            <p>Ready to find your next amazing developer? Let's get started!</p>
        </div>
        
        <div style="text-align: center;">
            <a href="https://coderfarm.com/role-selection" class="cta-button">
                Begin Your Journey
            </a>
        </div>
        
        <div class="footer">
            <p>Need help getting started? Our team is here to assist you at <a href="mailto:support@coderfarm.com">support@coderfarm.com</a></p>
            <p>© 2024 Coder Farm. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

    const text = `
Welcome to Coder Farm - Let's Get Started! 🚀

Hi ${userData.name},

We're thrilled to have you on board! Coder Farm is your gateway to connecting with exceptional developers who are perfectly aligned with your startup's vision and culture.

Why Coder Farm?
We believe that successful hiring goes beyond just skills - it's about finding developers who share your passion, understand your mission, and fit seamlessly into your team culture.

Your Journey Starts Here:

1. Complete Your Profile
   Tell us about your company, culture, and what you're looking for in a developer.

2. Discover Perfect Matches
   Browse through our curated developer profiles that match your requirements.

3. Connect & Collaborate
   Start conversations with developers and find your perfect team member.

Ready to find your next amazing developer? Let's get started!

Begin Your Journey: https://coderfarm.com/role-selection

Need help getting started? Our team is here to assist you at support@coderfarm.com

Best regards,
The Coder Farm Team

© 2024 Coder Farm. All rights reserved.`;

    return { html, text };
  }

  async sendCustomEmail(emailData: EmailData): Promise<EmailResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Email sent successfully',
          emailId: data.emailId,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to send email',
        };
      }
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        message: 'Network error occurred while sending email',
      };
    }
  }
}

export const emailService = new EmailService();
