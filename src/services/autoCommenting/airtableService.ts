// Airtable service for AutoCommenting system
// Converted from Chrome extension to web application

export interface AirtableConfig {
  apiKey: string;
  baseId: string;
  tableId: string;
  viewId: string;
  todayViewId: string;
  duplicateViewId: string;
}

export interface AirtableRecord {
  id: string;
  fields: {
    'Post URL'?: string;
    'Generated Comment'?: string;
    'Comment Done'?: boolean;
    'Comment By'?: string;
    'Comment Date'?: string;
    'Comment Status'?: string;
    'Comment Error'?: string;
  };
}

export interface CommentRecord {
  id: string;
  postUrl: string;
  commentText: string;
  commentBy: string;
}

export class AirtableService {
  private config: AirtableConfig;
  private rateLimitDelay = 200; // 5 requests per second = 200ms between requests

  constructor(config: AirtableConfig) {
    this.config = config;
  }

  private async rateLimitDelay() {
    await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
  }

  private async makeRequest(url: string, options: RequestInit = {}) {
    await this.rateLimitDelay();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 429) {
      // Rate limit hit, wait longer and retry
      await new Promise(resolve => setTimeout(resolve, 5000));
      return this.makeRequest(url, options);
    }

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async getNextPendingRecord(): Promise<CommentRecord | null> {
    try {
      const params = new URLSearchParams();
      params.set('view', this.config.viewId);
      params.set('pageSize', '1');
      params.set('filterByFormula', 'NOT({Comment Done})');
      
      const url = `https://api.airtable.com/v0/${this.config.baseId}/${this.config.tableId}?${params.toString()}`;
      const response = await this.makeRequest(url);
      const data = await response.json();

      if (!data.records || data.records.length === 0) {
        return null;
      }

      const record = data.records[0];
      const postUrl = record.fields['Post URL'];
      const commentText = record.fields['Generated Comment'];
      const commentBy = record.fields['Comment By'] || 'AutoCommenting';

      if (!postUrl || !commentText) {
        console.warn(`Record ${record.id} missing required fields`);
        return null;
      }

      return {
        id: record.id,
        postUrl,
        commentText,
        commentBy,
      };
    } catch (error) {
      console.error('Error fetching next pending record:', error);
      throw error;
    }
  }

  async markRecordDone(recordId: string, status: 'success' | 'failed', error?: string): Promise<boolean> {
    try {
      const fields: any = {
        'Comment Done': true,
        'Comment Date': new Date().toISOString(),
        'Comment Status': status,
      };

      if (error) {
        fields['Comment Error'] = error;
      }

      const url = `https://api.airtable.com/v0/${this.config.baseId}/${this.config.tableId}/${recordId}`;
      const response = await this.makeRequest(url, {
        method: 'PATCH',
        body: JSON.stringify({ fields }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error marking record done:', error);
      throw error;
    }
  }

  async getTodayCount(): Promise<number> {
    try {
      let count = 0;
      let offset: string | undefined;

      do {
        const params = new URLSearchParams();
        params.set('view', this.config.todayViewId);
        params.set('pageSize', '100');
        if (offset) params.set('offset', offset);

        const url = `https://api.airtable.com/v0/${this.config.baseId}/${this.config.tableId}?${params.toString()}`;
        const response = await this.makeRequest(url);
        const data = await response.json();

        if (data.records) {
          count += data.records.length;
        }
        offset = data.offset;
      } while (offset);

      return count;
    } catch (error) {
      console.error('Error fetching today count:', error);
      throw error;
    }
  }

  async checkForDuplicates(postUrl: string): Promise<boolean> {
    try {
      const params = new URLSearchParams();
      params.set('view', this.config.duplicateViewId);
      params.set('filterByFormula', `{Post URL} = '${postUrl}'`);
      params.set('pageSize', '1');

      const url = `https://api.airtable.com/v0/${this.config.baseId}/${this.config.tableId}?${params.toString()}`;
      const response = await this.makeRequest(url);
      const data = await response.json();

      return data.records && data.records.length > 0;
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      return false; // Assume not duplicate on error
    }
  }

  async getRunStats(): Promise<{
    total: number;
    pending: number;
    completed: number;
    failed: number;
  }> {
    try {
      const params = new URLSearchParams();
      params.set('view', this.config.viewId);
      params.set('pageSize', '1000'); // Get all records for stats

      const url = `https://api.airtable.com/v0/${this.config.baseId}/${this.config.tableId}?${params.toString()}`;
      const response = await this.makeRequest(url);
      const data = await response.json();

      const records = data.records || [];
      const total = records.length;
      const completed = records.filter((r: any) => r.fields['Comment Done']).length;
      const failed = records.filter((r: any) => r.fields['Comment Status'] === 'failed').length;
      const pending = total - completed;

      return { total, pending, completed, failed };
    } catch (error) {
      console.error('Error fetching run stats:', error);
      throw error;
    }
  }
}

// Default configuration (can be overridden)
export const DEFAULT_AIRTABLE_CONFIG: AirtableConfig = {
  apiKey: 'patFClficxpGIUnJF.be5a51a7e3fabe7337cd2cb13dc3f10234fc52d8a1f60e012eb68be7b2fcc982',
  baseId: 'appD9VxZrOhiQY9VB',
  tableId: 'tblyhMPmCt87ORo3t',
  viewId: 'viwiRzf62qaMKGQoG',
  todayViewId: 'viwjzxpzCC24wtkfc',
  duplicateViewId: 'viwhyoCkHret6DqWe',
};
