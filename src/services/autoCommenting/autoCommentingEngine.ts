// Main AutoCommenting engine
// Orchestrates Airtable and LinkedIn services
// Converted from Chrome extension to web application

import { AirtableService, DEFAULT_AIRTABLE_CONFIG } from './airtableService';
import { LinkedInService, DEFAULT_LINKEDIN_CONFIG } from './linkedinService';

export interface AutoCommentingConfig {
  maxCommentsPerHour: number;
  maxCommentsPerDay: number;
  minTimeBetweenComments: number; // in seconds
  autoApprove: boolean;
  humanReviewThreshold: number;
  dailyLimit: number;
}

export interface RunStats {
  processed: number;
  successes: number;
  failures: number;
  lastRun: number | null;
  lastError: string | null;
  lastProcessedUrl: string | null;
  sessionStartTime: number | null;
  todayCount: number;
}

export interface SystemStatus {
  isRunning: boolean;
  isScheduled: boolean;
  nextRunTime: number | null;
  dailyLimit: number;
  dailyCount: number;
  timeUntilNextRun: number | null;
}

export class AutoCommentingEngine {
  private airtableService: AirtableService;
  private linkedinService: LinkedInService;
  private config: AutoCommentingConfig;
  
  private isRunning = false;
  private isScheduled = false;
  private nextRunTime: number | null = null;
  private sessionStartTime: number | null = null;
  private dailyCount = 0;
  private lastCountUpdate = 0;
  
  private runStats: RunStats = {
    processed: 0,
    successes: 0,
    failures: 0,
    lastRun: null,
    lastError: null,
    lastProcessedUrl: null,
    sessionStartTime: null,
    todayCount: 0,
  };

  private processingInterval: NodeJS.Timeout | null = null;
  private statusCallbacks: ((status: SystemStatus) => void)[] = [];

  constructor(
    airtableConfig = DEFAULT_AIRTABLE_CONFIG,
    linkedinConfig = DEFAULT_LINKEDIN_CONFIG,
    engineConfig: Partial<AutoCommentingConfig> = {}
  ) {
    this.airtableService = new AirtableService(airtableConfig);
    this.linkedinService = new LinkedInService(linkedinConfig);
    
    this.config = {
      maxCommentsPerHour: 20,
      maxCommentsPerDay: 100,
      minTimeBetweenComments: 180,
      autoApprove: false,
      humanReviewThreshold: 10,
      dailyLimit: 100,
      ...engineConfig,
    };
  }

  // Start the auto-commenting system
  async start(): Promise<boolean> {
    try {
      if (this.isRunning) {
        return false;
      }

      // Initialize LinkedIn service
      const linkedinInitialized = await this.linkedinService.initialize();
      if (!linkedinInitialized) {
        throw new Error('Failed to initialize LinkedIn service');
      }

      // Reset session stats
      this.runStats = {
        processed: 0,
        successes: 0,
        failures: 0,
        lastRun: null,
        lastError: null,
        lastProcessedUrl: null,
        sessionStartTime: Date.now(),
        todayCount: 0,
      };

      this.sessionStartTime = Date.now();
      this.isRunning = true;
      this.isScheduled = false;

      // Start processing immediately
      await this.processNextComment();

      // Set up processing interval
      this.processingInterval = setInterval(() => {
        this.processNextComment();
      }, this.config.minTimeBetweenComments * 1000);

      this.notifyStatusChange();
      return true;

    } catch (error) {
      console.error('Failed to start AutoCommenting engine:', error);
      this.runStats.lastError = error instanceof Error ? error.message : 'Unknown error';
      return false;
    }
  }

  // Stop the auto-commenting system
  async stop(): Promise<void> {
    try {
      this.isRunning = false;
      this.isScheduled = false;
      this.nextRunTime = null;

      if (this.processingInterval) {
        clearInterval(this.processingInterval);
        this.processingInterval = null;
      }

      await this.linkedinService.close();

      this.notifyStatusChange();
    } catch (error) {
      console.error('Error stopping AutoCommenting engine:', error);
    }
  }

  // Start scheduled mode with daily limit
  async startScheduled(dailyLimit: number): Promise<boolean> {
    try {
      if (this.isRunning) {
        await this.stop();
      }

      this.config.dailyLimit = dailyLimit;
      this.isScheduled = true;
      this.dailyCount = 0;

      // Start the system
      const started = await this.start();
      if (!started) {
        return false;
      }

      // Schedule the first run
      this.scheduleNextRun();
      return true;

    } catch (error) {
      console.error('Failed to start scheduled mode:', error);
      return false;
    }
  }

  // Process the next comment
  private async processNextComment(): Promise<void> {
    try {
      if (!this.isRunning) {
        return;
      }

      // Check daily limit for scheduled mode
      if (this.isScheduled && this.dailyCount >= this.config.dailyLimit) {
        console.log('Daily limit reached, stopping scheduled mode');
        await this.stop();
        return;
      }

      // Check hourly limit
      const now = Date.now();
      const hourAgo = now - (60 * 60 * 1000);
      const recentComments = this.runStats.successes + this.runStats.failures;
      
      if (recentComments >= this.config.maxCommentsPerHour) {
        console.log('Hourly limit reached, waiting for next hour');
        this.scheduleNextRun();
        return;
      }

      // Get next pending record from Airtable
      const record = await this.airtableService.getNextPendingRecord();
      if (!record) {
        console.log('No pending records found');
        this.runStats.lastRun = now;
        this.scheduleNextRun();
        return;
      }

      // Check for duplicates
      const isDuplicate = await this.airtableService.checkForDuplicates(record.postUrl);
      if (isDuplicate) {
        console.log('Duplicate post found, marking as done');
        await this.airtableService.markRecordDone(record.id, 'failed', 'Duplicate post');
        this.runStats.processed++;
        this.runStats.failures++;
        this.scheduleNextRun();
        return;
      }

      // Check post accessibility
      const isAccessible = await this.linkedinService.checkPostAccessibility(record.postUrl);
      if (!isAccessible) {
        console.log('Post not accessible, marking as failed');
        await this.airtableService.markRecordDone(record.id, 'failed', 'Post not accessible');
        this.runStats.processed++;
        this.runStats.failures++;
        this.scheduleNextRun();
        return;
      }

      // Post the comment
      console.log(`Posting comment on: ${record.postUrl}`);
      const result = await this.linkedinService.postComment(record.postUrl, record.commentText);

      // Update stats
      this.runStats.processed++;
      this.runStats.lastRun = now;
      this.runStats.lastProcessedUrl = record.postUrl;

      if (result.success) {
        this.runStats.successes++;
        this.dailyCount++;
        await this.airtableService.markRecordDone(record.id, 'success');
        console.log('Comment posted successfully');
      } else {
        this.runStats.failures++;
        this.runStats.lastError = result.error || 'Unknown error';
        await this.airtableService.markRecordDone(record.id, 'failed', result.error);
        console.log('Comment posting failed:', result.error);
      }

      // Schedule next run
      this.scheduleNextRun();
      this.notifyStatusChange();

    } catch (error) {
      console.error('Error processing next comment:', error);
      this.runStats.lastError = error instanceof Error ? error.message : 'Unknown error';
      this.scheduleNextRun();
    }
  }

  // Schedule the next run
  private scheduleNextRun(): void {
    if (!this.isRunning) {
      return;
    }

    // Random delay between 5-7 minutes (as per original spec)
    const randomDelay = (5 + Math.random() * 2) * 60 * 1000;
    this.nextRunTime = Date.now() + randomDelay;

    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = setTimeout(() => {
        this.processNextComment();
      }, randomDelay);
    }
  }

  // Get current system status
  getStatus(): SystemStatus {
    const now = Date.now();
    const timeUntilNextRun = this.nextRunTime ? Math.max(0, this.nextRunTime - now) : null;

    return {
      isRunning: this.isRunning,
      isScheduled: this.isScheduled,
      nextRunTime: this.nextRunTime,
      dailyLimit: this.config.dailyLimit,
      dailyCount: this.dailyCount,
      timeUntilNextRun,
    };
  }

  // Get current run statistics
  getRunStats(): RunStats {
    return { ...this.runStats };
  }

  // Update today's count from Airtable
  async refreshTodayCount(): Promise<void> {
    try {
      const count = await this.airtableService.getTodayCount();
      this.runStats.todayCount = count;
      this.lastCountUpdate = Date.now();
    } catch (error) {
      console.error('Failed to refresh today count:', error);
    }
  }

  // Subscribe to status changes
  onStatusChange(callback: (status: SystemStatus) => void): void {
    this.statusCallbacks.push(callback);
  }

  // Unsubscribe from status changes
  offStatusChange(callback: (status: SystemStatus) => void): void {
    const index = this.statusCallbacks.indexOf(callback);
    if (index > -1) {
      this.statusCallbacks.splice(index, 1);
    }
  }

  // Notify all status change subscribers
  private notifyStatusChange(): void {
    const status = this.getStatus();
    this.statusCallbacks.forEach(callback => callback(status));
  }

  // Get Airtable run stats
  async getAirtableStats(): Promise<any> {
    try {
      return await this.airtableService.getRunStats();
    } catch (error) {
      console.error('Failed to get Airtable stats:', error);
      return null;
    }
  }

  // Cleanup
  async cleanup(): Promise<void> {
    await this.stop();
    await this.linkedinService.close();
  }
}

// Default configuration
export const DEFAULT_ENGINE_CONFIG: AutoCommentingConfig = {
  maxCommentsPerHour: 20,
  maxCommentsPerDay: 100,
  minTimeBetweenComments: 180,
  autoApprove: false,
  humanReviewThreshold: 10,
  dailyLimit: 100,
};
