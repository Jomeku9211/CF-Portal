// Common mock utilities and shared mock data for testing

// Mock user data
export const mockUsers = [
  {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    roles: ['client'],
    onboarding_stage: 'organization_profile',
    is_onboarding: true,
    created_at: Date.now() - 86400000
  },
  {
    id: 'user-2',
    email: 'developer@example.com',
    name: 'Developer User',
    roles: ['freelancer'],
    onboarding_stage: 'personal_info',
    is_onboarding: true,
    created_at: Date.now() - 172800000
  },
  {
    id: 'user-3',
    email: 'admin@example.com',
    name: 'Admin User',
    roles: ['super_admin'],
    onboarding_stage: 'completed',
    is_onboarding: false,
    created_at: Date.now() - 259200000
  }
];

// Mock authentication data
export const mockAuthData = {
  accessToken: 'mock-access-token-123',
  refreshToken: 'mock-refresh-token-456',
  user: mockUsers[0]
};

// Mock API responses
export const mockApiResponses = {
  success: { success: true, message: 'Operation successful' },
  error: { success: false, message: 'Operation failed' },
  notFound: { success: false, message: 'Resource not found' },
  unauthorized: { success: false, message: 'Unauthorized access' }
};

// Mock error responses
export const mockErrors = {
  networkError: new Error('Network error occurred'),
  validationError: new Error('Validation failed'),
  authError: new Error('Authentication failed'),
  serverError: new Error('Internal server error')
};

// Mock timestamps
export const mockTimestamps = {
  now: Date.now(),
  oneDayAgo: Date.now() - 86400000,
  oneWeekAgo: Date.now() - 604800000,
  oneMonthAgo: Date.now() - 2592000000
};

// Mock pagination data
export const mockPagination = {
  page: 1,
  limit: 10,
  total: 100,
  hasNext: true,
  hasPrev: false
};

// Mock search/filter data
export const mockFilters = {
  search: 'test',
  status: 'active',
  dateRange: {
    start: new Date(Date.now() - 604800000).toISOString(),
    end: new Date().toISOString()
  },
  categories: ['technology', 'healthcare']
};

// Utility functions for creating mock data
export const createMockId = (prefix: string = 'mock'): string => 
  `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const createMockTimestamp = (daysAgo: number = 0): number => 
  Date.now() - (daysAgo * 86400000);

export const createMockEmail = (name: string = 'test'): string => 
  `${name}@example.com`;

export const createMockPhone = (): string => 
  `+1-555-${Math.random().toString().substr(2, 3)}-${Math.random().toString().substr(2, 4)}`;

// Mock data factory for common entities
export const mockDataFactory = {
  createUser: (overrides: Partial<typeof mockUsers[0]> = {}) => ({
    id: createMockId('user'),
    email: createMockEmail(),
    name: 'Mock User',
    roles: ['client'],
    onboarding_stage: 'organization_profile',
    is_onboarding: true,
    created_at: createMockTimestamp(),
    ...overrides
  }),
  
  createOrganization: (overrides: any = {}) => ({
    id: createMockId('org'),
    name: 'Mock Organization',
    industry: 'Technology',
    created_at: createMockTimestamp(),
    ...overrides
  }),
  
  createTeam: (overrides: any = {}) => ({
    id: createMockId('team'),
    name: 'Mock Team',
    organization_id: createMockId('org'),
    created_at: createMockTimestamp(),
    ...overrides
  }),
  
  createJobPost: (overrides: any = {}) => ({
    id: createMockId('job'),
    title: 'Mock Job Post',
    team_id: createMockId('team'),
    created_at: createMockTimestamp(),
    ...overrides
  })
};
