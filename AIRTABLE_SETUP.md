# Airtable Integration Setup for AutoCommenting

## Overview
The AutoCommenting system now fetches real-time counts from your Airtable view to display in the "Today" statistics. The system supports both browser session mode and headless automation mode for 24/7 operation.

## Required Environment Variables

Create a `.env` file in your project root with:

```bash
# Your Airtable API key (get from https://airtable.com/account)
AIRTABLE_API_KEY=patFClficxpGIUnJF.be5a51a7e3fabe7337cd2cb13dc3f10234fc52d8a1f60e012eb68be7b2fcc982

# Your Airtable base ID (found in the URL when viewing your base)
AIRTABLE_BASE_ID=appD9VxZrOhiQY9VB

# Optional: Table name (defaults to tblyhMPmCt87ORo3t)
AIRTABLE_TABLE_NAME=tblyhMPmCt87ORo3t
```

## How to Get Your Airtable Credentials

### 1. API Key
1. Go to [https://airtable.com/account](https://airtable.com/account)
2. Click "Generate API key"
3. Copy the generated key

### 2. Base ID
1. Open your Airtable base
2. Look at the URL: `https://airtable.com/appD9VxZrOhiQY9VB/...`
3. The part after `/app` is your base ID: `D9VxZrOhiQY9VB`

### 3. Table ID
1. In your base, go to the table you want to use
2. The table ID is in the URL or you can find it in the table settings

## API Endpoint

The system uses the `/api/airtable-count` endpoint to fetch counts from your specified view:
- **View ID**: `viwjzxpzCC24wtkfc` (as specified in your requirements)
- **Endpoint**: `/api/airtable-count?viewId=viwjzxpzCC24wtkfc`

## Testing

1. Set up your environment variables
2. Start the development server
3. Go to the AutoCommenting tab in Super Admin
4. The "Today" count should automatically fetch from Airtable
5. Click the refresh button (🔄) to manually refresh the count

## Headless Mode Setup

### For 24/7 Automation (Recommended for Production)

1. **Get LinkedIn Cookies**:
   - Log into LinkedIn in your browser
   - Open Developer Tools (F12) → Application → Cookies
   - Copy all LinkedIn cookies as JSON

2. **Enable Headless Mode**:
   - Paste cookies in the "LinkedIn Cookies" textarea
   - Click "Enable Schedule Mode"
   - System will work even when browser is closed

3. **Benefits**:
   - **24/7 Operation**: No need to keep browser open
   - **Server Deployment**: Can run on cloud infrastructure
   - **Background Processing**: Fully automated operation
   - **Scalability**: Multiple instances possible

### Cookie Management
- **Expiration**: LinkedIn cookies expire every few days
- **Refresh**: Re-login and update stored cookies when needed
- **Security**: Store cookies securely in production environment

## Troubleshooting

- **"Airtable configuration missing"**: Check your `.env` file and environment variables
- **"API error: 401"**: Invalid API key - regenerate your Airtable API key
- **"API error: 404"**: Check your base ID and table ID
- **"API error: 403"**: Your API key doesn't have access to this base/table
