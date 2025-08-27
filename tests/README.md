# CF Portal Test Suite

This directory contains the comprehensive test suite for the CF Portal application, organized by test type and user role.

## Directory Structure

```
tests/
│
├── unit/                          # Unit tests for individual components and functions
│   ├── super_admin/              # Super admin specific functionality
│   │   ├── auth.test.ts          # Authentication tests
│   │   ├── dashboard.test.ts     # Dashboard functionality tests
│   │   └── settings.test.ts      # Settings and configuration tests
│   ├── client/                   # Client user functionality
│   │   ├── auth.test.ts          # Client authentication
│   │   ├── job_posting.test.ts   # Job posting functionality
│   │   └── payments.test.ts      # Payment processing tests
│   ├── service_provider/         # Service provider functionality
│   │   ├── auth.test.ts          # Provider authentication
│   │   ├── profile.test.ts       # Profile management tests
│   │   └── proposals.test.ts     # Proposal submission tests
│   └── agency/                   # Agency functionality
│       ├── auth.test.ts          # Agency authentication
│       ├── team_management.test.ts # Team management tests
│       └── reports.test.ts       # Reporting functionality tests
│
├── integration/                   # Integration tests for component interactions
│   ├── client_service_flow.test.ts    # End-to-end client-service provider flow
│   ├── agency_provider_flow.test.ts   # Agency-service provider interactions
│   └── admin_reporting_flow.test.ts   # Admin reporting workflows
│
├── api/                          # API endpoint tests
│   ├── auth_api.test.ts          # Authentication API tests
│   ├── job_api.test.ts           # Job-related API tests
│   ├── payment_api.test.ts       # Payment API tests
│   └── profile_api.test.ts       # Profile management API tests
│
├── auth/                         # Authentication and authorization tests
│   ├── login_logout.test.ts      # Login/logout functionality
│   ├── role_based_access.test.ts # Role-based access control
│   └── permissions.test.ts       # Permission system tests
│
├── db/                           # Database and data layer tests
│   ├── migrations.test.ts        # Database migration tests
│   ├── schema_validations.test.ts # Schema validation tests
│   └── queries.test.ts           # Database query tests
│
├── ui/                           # User interface component tests
│   ├── components/               # Individual component tests
│   │   ├── button.test.ts        # Button component tests
│   │   ├── modal.test.ts         # Modal component tests
│   │   └── navbar.test.ts        # Navigation component tests
│   └── pages/                    # Page-level component tests
│       ├── dashboard.test.ts     # Dashboard page tests
│       ├── profile.test.ts       # Profile page tests
│       └── settings.test.ts      # Settings page tests
│
├── e2e/                          # End-to-end user journey tests
│   ├── super_admin_flow.test.ts  # Complete super admin workflows
│   ├── client_hiring_flow.test.ts # Client hiring process
│   ├── provider_application_flow.test.ts # Service provider application process
│   └── agency_team_flow.test.ts  # Agency team management workflows
│
├── smoke/                        # Basic functionality verification tests
│   ├── basic_routes.test.ts      # Core routing tests
│   ├── health_check.test.ts      # System health checks
│   └── minimal_user_flow.test.ts # Basic user interaction tests
│
├── regression/                   # Regression tests to prevent feature regression
│   ├── client_regression.test.ts # Client feature regression tests
│   ├── provider_regression.test.ts # Service provider regression tests
│   ├── agency_regression.test.ts # Agency feature regression tests
│   └── admin_regression.test.ts  # Admin feature regression tests
│
├── performance/                  # Performance and load testing
│   ├── load_login.test.ts        # Login performance tests
│   ├── concurrent_jobs.test.ts   # Concurrent job processing tests
│   └── heavy_query.test.ts       # Heavy database query tests
│
└── security/                     # Security and vulnerability tests
    ├── sql_injection.test.ts     # SQL injection prevention tests
    ├── xss_attack.test.ts        # XSS attack prevention tests
    ├── csrf.test.ts              # CSRF protection tests
    └── auth_bypass.test.ts       # Authentication bypass prevention tests
```

## Running Tests

### Using npm scripts (Recommended)

```bash
# Run all tests
npm test

# Run specific test categories
npm run test:unit              # Unit tests only
npm run test:integration       # Integration tests only
npm run test:api               # API tests only
npm run test:auth              # Authentication tests only
npm run test:db                # Database tests only
npm run test:ui                # UI component tests only
npm run test:e2e               # End-to-end tests only
npm run test:smoke             # Smoke tests only
npm run test:regression        # Regression tests only
npm run test:performance       # Performance tests only
npm run test:security          # Security tests only

# Run tests for specific user roles
npm run test:super-admin       # Super admin tests only
npm run test:client            # Client tests only
npm run test:service-provider  # Service provider tests only
npm run test:agency            # Agency tests only

# Run tests with specific options
npm run test:coverage          # With coverage reporting
npm run test:watch             # In watch mode
npm run test:ci                # CI-optimized settings
npm run test:debug             # With debug information
```

### Using the test runner script

```bash
# Run specific test categories
node scripts/test-runner.js unit
node scripts/test-runner.js integration
node scripts/test-runner.js api

# Run predefined scenarios
node scripts/test-runner.js quick              # Quick test suite
node scripts/test-runner.js comprehensive      # Comprehensive test suite
node scripts/test-runner.js ci                 # CI test suite
node scripts/test-runner.js pre-deploy        # Pre-deployment test suite

# Run with options
node scripts/test-runner.js unit --coverage
node scripts/test-runner.js comprehensive --watch
node scripts/test-runner.js ci --maxWorkers 2

# Show help
node scripts/test-runner.js --help
```

### Using Jest directly

```bash
# Run all tests
npx jest

# Run tests in specific directories
npx jest --testPathPattern=tests/unit
npx jest --testPathPattern=tests/integration
npx jest --testPathPattern=tests/api

# Run tests with specific patterns
npx jest --testNamePattern="auth"
npx jest --testPathPattern="tests/unit" --testNamePattern="login"

# Run tests with options
npx jest --coverage --watch
npx jest --verbose --maxWorkers=4
```

## Test Configuration

The test suite is configured using `jest.config.cjs` in the root directory. Key configuration options:

- **Test Environment**: jsdom (simulates browser environment)
- **Setup Files**: `tests/setup.ts` (global test setup)
- **Coverage**: 100% coverage requirement for all metrics
- **File Extensions**: Supports TypeScript (.ts, .tsx) and JavaScript (.js, .jsx)
- **Mock Files**: Asset and module mocks in `tests/mocks/`

## Writing Tests

### Test File Naming Convention

- Test files should end with `.test.ts` or `.test.tsx`
- Use descriptive names that indicate what is being tested
- Group related tests in the same file

### Test Structure

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ComponentName } from '../../src/components/ComponentName';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup code that runs before each test
  });

  test('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('should handle user interactions', async () => {
    render(<ComponentName />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Result')).toBeInTheDocument();
    });
  });
});
```

### Best Practices

1. **Test Isolation**: Each test should be independent and not rely on other tests
2. **Descriptive Names**: Use clear, descriptive test names that explain the expected behavior
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification phases
4. **Mock External Dependencies**: Mock API calls, timers, and external services
5. **Test User Behavior**: Focus on testing user interactions rather than implementation details
6. **Accessibility**: Include accessibility tests using `@testing-library/jest-dom` matchers

## Coverage Requirements

The project maintains a strict 100% coverage requirement for:
- **Branches**: All code paths must be tested
- **Functions**: All functions must be called during testing
- **Lines**: All lines of code must be executed
- **Statements**: All statements must be executed

## Continuous Integration

Tests are automatically run in CI/CD pipelines with:
- **Unit Tests**: Run on every commit
- **Integration Tests**: Run on pull requests
- **E2E Tests**: Run on deployment to staging
- **Full Test Suite**: Run before production deployment

## Troubleshooting

### Common Issues

1. **Import Path Errors**: Ensure import paths are correct relative to the test file location
2. **Mock Failures**: Check that mocks are properly configured in `tests/mocks/`
3. **Environment Issues**: Verify that `tests/setup.ts` is properly configured
4. **Coverage Failures**: Ensure all code paths are covered by tests

### Debug Mode

Run tests in debug mode for more detailed output:

```bash
npm run test:debug
# or
npx jest --verbose --detectOpenHandles --forceExit
```

### Test Isolation

If tests are interfering with each other, ensure proper cleanup:

```typescript
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});
```

## Contributing

When adding new tests:

1. Place tests in the appropriate directory based on their type
2. Follow the existing naming conventions
3. Ensure 100% coverage for new code
4. Update this README if adding new test categories
5. Run the full test suite before submitting changes

## Support

For questions about the test suite or help with writing tests, please refer to:
- Jest documentation: https://jestjs.io/
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Testing Library Jest DOM: https://github.com/testing-library/jest-dom
