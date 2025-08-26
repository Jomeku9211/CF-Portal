# AutoCommenting System

## Overview
The AutoCommenting system automatically posts comments on LinkedIn posts based on configured schedules and rules. Supports both browser session mode and headless automation mode.

## Operating Modes

### 🔹 Browser Session Mode (Current)
- **Requirement**: Browser must be open and logged into LinkedIn
- **Limitation**: Only works when browser is active
- **Use Case**: Manual testing and development

### 🔹 Headless Mode (New - Recommended for Production)
- **Requirement**: LinkedIn session cookies stored in system
- **Advantage**: Works 24/7 even when browser is closed
- **Use Case**: Production automation and scheduled runs

## Acceptance Criteria

### 1. Eligibility Gating
- Start/Schedule buttons are disabled until LinkedIn login is confirmed
- Manual confirmation button: "I'm logged in – Enable"
- System checks login status before allowing automation

### 2. Start/Stop Toggling
- Single button toggles between Start/Stop states
- Status badge shows Active/Inactive with color coding
- Timer countdown displays next run time
- Session details show start time and last run

### 3. Scheduled Mode
- Respects Daily Limit (100 comments per day)
- Configurable time between comments (5 minutes minimum)
- Days to run setting (7 days default)
- Schedule enable/disable toggle

### 4. Rate Limiting & Backoff
- Counters track processed, successes, and failures
- Exponential backoff on rate limit hits
- Airtable rate limit handling with 30s pauses
- Success/failure rate tracking (90% success target)

### 5. Logging & Monitoring
- Live logs isolated to AutoCommenting tab
- Clear logs on page load for clean start
- Download logs functionality
- Real-time statistics updates

### 6. LinkedIn Integration
- **Browser Mode**: Uses existing browser session for authentication
- **Headless Mode**: Uses stored LinkedIn cookies for 24/7 automation
- No LinkedIn API key required
- Session persistence during automation

## Headless Mode Setup

### 1. Get LinkedIn Cookies
1. Log into LinkedIn in your browser
2. Open Developer Tools (F12)
3. Go to Application/Storage tab
4. Find LinkedIn cookies
5. Copy all cookies as JSON

### 2. Store Cookies in System
1. Paste cookies JSON in the "LinkedIn Cookies" textarea
2. Click "Enable Schedule Mode"
3. System will use cookies for headless automation

### 3. Benefits of Headless Mode
- **24/7 Operation**: Works even when browser is closed
- **Server Deployment**: Can run on cloud servers/VMs
- **Background Processing**: No user interaction required
- **Scalability**: Multiple instances can run simultaneously

### 4. Cookie Management
- **Expiration**: LinkedIn cookies expire every few days
- **Refresh Process**: Re-login and update stored cookies
- **Security**: Store cookies securely (database or environment variables)
- **Rotation**: Implement cookie refresh mechanism for production

## Technical Implementation

### Browser Session Mode
- Uses Playwright/Puppeteer with visible browser
- Requires active browser window
- Session tied to desktop browser

### Headless Mode
- Uses Playwright/Puppeteer in headless mode
- Runs on server/cloud infrastructure
- Stored cookies provide authentication
- Background process automation

## Test Acceptance Criteria

Expected assertions to be covered by tests:

- Eligibility gating: Start/Schedule disabled until LinkedIn login is confirmed
- Start/Stop toggling and status badge update
- Scheduled mode respects Daily Limit
- Rate limit counters and backoff bookkeeping
- Logs isolated to AutoCommenting tab only
- No LinkedIn API key usage (browser session only)
- **NEW**: Headless mode with stored cookies functionality
- **NEW**: Cookie validation and expiration handling
