# Server-Side LinkedIn Automation Deployment

## Overview
This setup enables real LinkedIn automation by running Playwright on the server instead of in the client browser.

## Architecture

### Client-Side (React App)
- **Mock Mode**: Simulates LinkedIn automation for development/testing
- **Server API Mode**: Sends requests to server-side API for real automation
- **Fallback**: Automatically falls back to mock mode if server API fails

### Server-Side (Vercel API)
- **Playwright Automation**: Runs real browser automation on Vercel serverless
- **LinkedIn Integration**: Handles actual comment posting on LinkedIn
- **Cookie Management**: Uses LinkedIn cookies from client for authentication

## Deployment Steps

### 1. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Environment Variables
Set these in your Vercel dashboard:
```bash
PLAYWRIGHT_BROWSERS_PATH=0
NODE_ENV=production
```

### 3. Update Client Configuration
In your React app, update the LinkedIn service config:
```typescript
const linkedinConfig = {
  ...DEFAULT_LINKEDIN_CONFIG,
  useServerAPI: true,
  serverAPIUrl: 'https://your-domain.vercel.app/api/auto-commenting/process'
};
```

## API Endpoint

### POST /api/auto-commenting/process
**Request Body:**
```json
{
  "postUrl": "https://www.linkedin.com/posts/...",
  "commentText": "Your comment text here",
  "linkedinCookies": [
    {
      "name": "cookie_name",
      "value": "cookie_value",
      "domain": ".linkedin.com"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Comment posted successfully on LinkedIn",
  "postUrl": "https://www.linkedin.com/posts/...",
  "commentText": "Your comment text here",
  "timestamp": "2025-01-27T..."
}
```

## Security Considerations

### 1. Cookie Storage
- LinkedIn cookies are sensitive authentication data
- Store securely in production (encrypted, environment variables)
- Rotate cookies regularly as they expire

### 2. Rate Limiting
- Implement rate limiting on the API endpoint
- Respect LinkedIn's terms of service
- Add delays between automated actions

### 3. Error Handling
- Graceful fallback to mock mode
- Detailed logging for debugging
- User-friendly error messages

## Testing

### 1. Local Development
```bash
# Test server API locally
npm run dev
curl -X POST http://localhost:3000/api/auto-commenting/process \
  -H "Content-Type: application/json" \
  -d '{"postUrl":"...","commentText":"...","linkedinCookies":[...]}'
```

### 2. Production Testing
- Deploy to Vercel
- Test with real LinkedIn cookies
- Monitor logs for automation success/failure

## Troubleshooting

### Common Issues

1. **Playwright Installation**
   - Ensure `PLAYWRIGHT_BROWSERS_PATH=0` is set
   - Vercel will install browsers automatically

2. **Timeout Issues**
   - Increase `maxDuration` in vercel.json
   - Optimize selectors and wait times

3. **Cookie Issues**
   - Verify cookie format and expiration
   - Check LinkedIn authentication status

4. **Rate Limiting**
   - Implement delays between requests
   - Monitor LinkedIn for temporary blocks

## Performance Optimization

### 1. Browser Reuse
- Consider keeping browser instance alive between requests
- Implement connection pooling for high-volume usage

### 2. Caching
- Cache LinkedIn page elements
- Store successful selectors for reuse

### 3. Monitoring
- Track automation success rates
- Monitor response times
- Alert on failures

## Cost Considerations

### Vercel Pricing
- **Hobby**: 100GB-hours/month (free)
- **Pro**: 1000GB-hours/month ($20/month)
- **Enterprise**: Custom pricing

### Optimization Tips
- Use headless mode (default)
- Minimize browser launch time
- Implement efficient selectors
- Batch operations when possible
