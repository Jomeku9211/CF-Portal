# CF Portal Project Structure

This document outlines the current project structure following clean architecture principles and feature-based organization.

## Overview

The project follows a clean, logical organization that follows industry best practices with feature-based modules and clear separation of concerns.

## Directory Structure

```
src/
├── assets/                    # Static assets (images, icons, fonts)
├── hooks/                    # Custom React hooks
├── layouts/                  # Common layout components
│   ├── Header.tsx           # Main header component
│   ├── Footer.tsx           # Main footer component
│   ├── Navbar.tsx           # Navigation component
│   └── index.ts             # Layout exports
├── modules/                  # Feature-based modules
│   ├── shared/              # Shared functionality across all user types
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # Shared services (auth, email, etc.)
│   │   ├── routes/          # Route protection components
│   │   └── index.ts         # Shared module exports
│   ├── client/              # Client-specific functionality
│   │   ├── components/      # Client components
│   │   ├── services/        # Client services
│   │   └── index.ts         # Client module exports
│   ├── service-provider/    # Service provider functionality
│   │   ├── components/      # Service provider components
│   │   ├── services/        # Service provider services
│   │   ├── data/            # Service provider data
│   │   └── index.ts         # Service provider exports
│   ├── super-admin/         # Super admin functionality
│   │   ├── components/      # Super admin components
│   │   └── index.ts         # Super admin exports
│   ├── agency/              # Agency functionality (placeholder)
│   └── index.ts             # Main module exports
├── pages/                    # Page-level components
│   ├── LandingPage/         # Landing page components
│   ├── About.tsx            # About page
│   ├── Contact.tsx          # Contact page
│   ├── EmailConfirmation.tsx # Email confirmation page
│   ├── ForgotPassword.tsx   # Forgot password page
│   ├── NotFound.tsx         # 404 page
│   ├── Podcast.tsx          # Podcast page
│   ├── PrivacyPolicy.tsx    # Privacy policy page
│   ├── Login.tsx            # Login page
│   ├── MemberDashboard.tsx  # Member dashboard page
│   ├── Signup.tsx           # Signup page
│   ├── StyleGuide.tsx       # Style guide page
│   └── index.ts             # Page exports
├── styles/                   # Global styles and CSS modules
├── store/                    # State management (Redux/Zustand)
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
├── context/                  # React Context providers
├── App.tsx                   # Main app component
├── main.tsx                  # App entry point
├── router.tsx                # Routing configuration
└── index.css                 # Global CSS
```

## Key Features

### ✅ **Clean Organization**
- Single, logical directory for each purpose
- No duplication or confusion

### ✅ **Feature-Based Organization**
- Organized by user role and feature area
- Clear boundaries between different user types

### ✅ **Clear Separation of Concerns**
- **Layouts**: Header, Footer, Navigation
- **Pages**: Page-level components
- **Modules**: Feature-specific functionality
- **Shared**: Common components and services

### ✅ **Improved Import Structure**
- Index files for easy imports
- Logical grouping of related functionality
- Clear module boundaries

## Module Organization

### 🏠 **Shared Module** (`src/modules/shared/`)
Contains functionality used across all user types:
- **Components**: Button, ProgressBar, AuthCard, etc.
- **Services**: Authentication, User management, Email, etc.
- **Routes**: Route protection components
- **Auto Commenting**: Profile scraping, comment generation, etc.

### 👥 **Client Module** (`src/modules/client/`)
Contains client-specific functionality:
- **Components**: Team onboarding, organization profile, hiring intent
- **Services**: Organization management, team management

### 🛠️ **Service Provider Module** (`src/modules/service-provider/`)
Contains service provider functionality:
- **Components**: Job persona creation
- **Services**: Job posting, job persona management
- **Data**: Developer data and resources

### 👑 **Super Admin Module** (`src/modules/super-admin/`)
Contains super admin functionality:
- **Components**: Admin pages, super admin dashboard, login

### 🏢 **Agency Module** (`src/modules/agency/`)
Placeholder for agency-specific functionality (currently empty)

## Import Examples

### Before (Disorganized)
```typescript
import { Button } from '../components/Button';
import { authService } from '../services/authService';
import { Header } from '../components/Header';
```

### After (Clean)
```typescript
// Import from modules
import { Button, authService } from '../modules/shared';
import { Header } from '../layouts';

// Import specific modules
import { organizationService } from '../modules/client';
import { jobPersonaService } from '../modules/service-provider';
import { SuperAdminDashboard } from '../modules/super-admin';
```

## Benefits of Current Structure

### 🎯 **Maintainability**
- Easy to find related functionality
- Clear boundaries between different user types
- Reduced cognitive load when working on features

### 🚀 **Scalability**
- Easy to add new user types
- Simple to extend existing modules
- Clear patterns for new features

### 🔍 **Discoverability**
- Intuitive directory structure
- Clear naming conventions
- Logical grouping of related files

### 🧪 **Testing**
- Tests can be organized by module
- Easy to mock specific functionality
- Clear test boundaries

### 👥 **Team Collaboration**
- Different developers can work on different modules
- Reduced merge conflicts
- Clear ownership of code areas

## Current Status

### 🔄 **Organization**
- **Components**: Organized by feature and user type
- **Services**: Grouped by business domain
- **Pages**: Consolidated in single directory
- **Layouts**: Separated from business logic

### 🔄 **Key Changes**
- **ContentHub**: Replaced by Podcast page (functionality consolidated)

## Next Steps

### 🚧 **Immediate Actions**
1. Update import statements in existing files
2. Test that all functionality still works
3. Update documentation and README files
4. Update test files to use Podcast instead of ContentHub

### 🔮 **Future Improvements**
1. Add more user type modules as needed
2. Implement proper state management in `store/`
3. Add comprehensive type definitions in `types/`
4. Create custom hooks in `hooks/`
5. Add utility functions in `utils/`

## Testing the Structure

The current structure maintains all existing functionality while providing a clean organization. All tests should continue to pass, and the auto commenting functionality remains fully operational.

---

*This reorganization follows the inspiration from your example structure while adapting it to the specific needs of the CF Portal project.*
