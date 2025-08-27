# Mock Data Organization

This directory contains organized mock data for testing, following the project's test folder structure.

## Directory Structure

```
tests/mocks/
├── client/                 # Client user type mocks
│   ├── organization-mocks.ts    # Organization data for client onboarding
│   ├── team-mocks.ts            # Team data for client onboarding
│   └── index.ts                 # Client mock exports
├── service-provider/       # Service provider user type mocks
│   ├── job-post-mocks.ts        # Job post data for service provider
│   └── index.ts                 # Service provider mock exports
├── shared/                 # Shared/common mock data
│   ├── common-mocks.ts          # Common utilities and shared data
│   └── index.ts                 # Shared mock exports
├── index.ts                # Main mock data exports
└── README.md               # This file
```

## Usage

### Importing Mock Data

```typescript
// Import specific mock data
import { mockOrganizations, mockTeams } from '@/tests/mocks/client';
import { mockJobPosts } from '@/tests/mocks/service-provider';
import { mockUsers, mockDataFactory } from '@/tests/mocks/shared';

// Import all mocks
import * as mocks from '@/tests/mocks';
```

### Using Mock Data in Tests

```typescript
// Unit tests
import { mockOrganizations } from '@/tests/mocks/client';

test('should create organization', () => {
  const org = mockOrganizations[0];
  expect(org.name).toBe('TechCorp Solutions');
});

// API tests
import { mockApiResponses } from '@/tests/mocks/shared';

test('should handle success response', () => {
  const response = mockApiResponses.success;
  expect(response.success).toBe(true);
});

// Database tests
import { mockDataFactory } from '@/tests/mocks/shared';

test('should create user with custom data', () => {
  const user = mockDataFactory.createUser({
    email: 'custom@example.com',
    roles: ['admin']
  });
  expect(user.email).toBe('custom@example.com');
});
```

## Mock Data Types

### Client Mocks
- **Organizations**: Complete organization data for client onboarding
- **Teams**: Team data linked to organizations

### Service Provider Mocks
- **Job Posts**: Job post data for service provider functionality

### Shared Mocks
- **Users**: Common user data across all user types
- **API Responses**: Standard API response patterns
- **Errors**: Common error scenarios
- **Utilities**: Helper functions for creating mock data

## Best Practices

1. **Use specific imports** rather than importing everything
2. **Extend mock data** using the factory functions when needed
3. **Keep mock data realistic** but simple for testing
4. **Update mocks** when data structures change
5. **Use consistent naming** conventions across all mock files

## Adding New Mock Data

1. **Create new file** in appropriate user type directory
2. **Export mock data** and service functions
3. **Update index.ts** files to export new mocks
4. **Update this README** with new mock data description
5. **Add tests** to verify mock data works correctly

## Migration from Old mockDataService

The old `src/modules/shared/services/mockDataService.ts` has been removed and replaced with this organized structure. Update your imports to use the new location:

```typescript
// Old import
import { mockDataService } from '@/modules/shared/services/mockDataService';

// New import
import { mockOrganizations, mockTeams } from '@/tests/mocks/client';
```
