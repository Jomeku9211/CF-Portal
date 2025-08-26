// LinkedIn automation service for AutoCommenting system
// Uses Playwright for headless browser automation
// Converted from Chrome extension to web application

export interface LinkedInConfig {
  headless: boolean;
  slowMo: number;
  timeout: number;
  userAgent: string;
}

export interface CommentResult {
  success: boolean;
  error?: string;
  postUrl: string;
  timestamp: string;
}

export class LinkedInService {
  private config: LinkedInConfig;
  private browser: any = null;
  private context: any = null;

  constructor(config: LinkedInConfig) {
    this.config = config;
  }

  private async getPlaywright() {
    if (typeof window !== 'undefined') {
      // Client-side, return null
      return null;
    }
    
    try {
      // Server-side, import Playwright
      const { chromium } = await import('playwright');
      return { chromium };
    } catch (error) {
      console.error('Failed to import Playwright:', error);
      return null;
    }
  }

  async initialize(): Promise<boolean> {
    try {
      const playwright = await this.getPlaywright();
      if (!playwright) {
        throw new Error('Playwright not available');
      }

      this.browser = await playwright.chromium.launch({
        headless: this.config.headless,
        slowMo: this.config.slowMo,
      });

      this.context = await this.browser.newContext({
        userAgent: this.config.userAgent,
        viewport: { width: 1280, height: 720 },
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize LinkedIn service:', error);
      return false;
    }
  }

  async postComment(postUrl: string, commentText: string): Promise<CommentResult> {
    try {
      if (!this.context) {
        throw new Error('LinkedIn service not initialized');
      }

      const page = await this.context.newPage();
      
      try {
        // Navigate to the LinkedIn post
        await page.goto(postUrl, { 
          waitUntil: 'networkidle',
          timeout: this.config.timeout 
        });

        // Wait for the comment box to be available
        const commentBoxSelector = 'div[data-placeholder="Add a comment..."]';
        await page.waitForSelector(commentBoxSelector, { timeout: this.config.timeout });

        // Click on the comment box to focus it
        await page.click(commentBoxSelector);

        // Type the comment
        await page.type(commentBoxSelector, commentText, { delay: 100 });

        // Wait a moment for the comment to be fully typed
        await page.waitForTimeout(1000);

        // Find and click the post button
        const postButtonSelector = 'button[type="submit"]';
        const postButton = await page.$(postButtonSelector);
        
        if (!postButton) {
          throw new Error('Post button not found');
        }

        // Click the post button
        await postButton.click();

        // Wait for the comment to be posted
        await page.waitForTimeout(3000);

        // Verify the comment was posted by checking for success indicators
        const successIndicator = await page.$('div[data-test-id="comment-posted"]');
        if (!successIndicator) {
          // Alternative success check - look for the comment in the page
          const commentExists = await page.$(`text="${commentText}"`);
          if (!commentExists) {
            throw new Error('Comment verification failed');
          }
        }

        return {
          success: true,
          postUrl,
          timestamp: new Date().toISOString(),
        };

      } finally {
        await page.close();
      }

    } catch (error) {
      console.error('Error posting comment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        postUrl,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async checkPostAccessibility(postUrl: string): Promise<boolean> {
    try {
      if (!this.context) {
        throw new Error('LinkedIn service not initialized');
      }

      const page = await this.context.newPage();
      
      try {
        await page.goto(postUrl, { 
          waitUntil: 'networkidle',
          timeout: this.config.timeout 
        });

        // Check if the post is accessible (not deleted, private, etc.)
        const postContent = await page.$('div[data-test-id="post-content"]');
        const commentBox = await page.$('div[data-placeholder="Add a comment..."]');
        
        return !!(postContent && commentBox);

      } finally {
        await page.close();
      }

    } catch (error) {
      console.error('Error checking post accessibility:', error);
      return false;
    }
  }

  async close(): Promise<void> {
    try {
      if (this.context) {
        await this.context.close();
        this.context = null;
      }
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
      }
    } catch (error) {
      console.error('Error closing LinkedIn service:', error);
    }
  }

  isInitialized(): boolean {
    return !!(this.browser && this.context);
  }
}

// Default configuration
export const DEFAULT_LINKEDIN_CONFIG: LinkedInConfig = {
  headless: true,
  slowMo: 1000,
  timeout: 30000,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};
