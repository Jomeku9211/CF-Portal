# Environment Setup Guide

## Overview
This project uses environment variables for configuration. All environment files are properly gitignored to prevent sensitive data from being committed.

## Required Environment Variables

### 1. Supabase Configuration (Required)
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Application Configuration (Optional)
```bash
REACT_APP_ENV=development
REACT_APP_API_TIMEOUT=30000
```

### 3. Feature Flags (Optional)
```bash
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG_LOGGING=true
```

## Setup Instructions

### Step 1: Copy Environment Template
```bash
cp env.example .env
```

### Step 2: Update .env with Your Values
1. Get your Supabase project URL and anon key from your Supabase dashboard
2. Update the values in your `.env` file
3. Never commit the `.env` file to version control

### Step 3: Verify Setup
```bash
npm run build
```

## Environment File Structure
- `.env` - Your local environment (gitignored)
- `.env.example` - Template file (committed to git)
- `.env.local` - Local overrides (gitignored)
- `.env.development` - Development environment (gitignored)
- `.env.production` - Production environment (gitignored)

## Troubleshooting

### Common Issues
1. **Build fails with "Cannot find environment variable"**
   - Make sure you have a `.env` file in the project root
   - Verify all required variables are set

2. **Supabase connection fails**
   - Check your Supabase URL and anon key
   - Ensure your Supabase project is active

3. **Environment variables not loading**
   - Restart your development server after creating `.env`
   - Make sure variable names start with `REACT_APP_`

## Security Notes
- Never commit `.env` files containing real credentials
- Use different credentials for development and production
- Rotate your Supabase keys regularly
- Consider using Supabase Row Level Security (RLS) for additional security
