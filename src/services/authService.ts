import { XANO_BASE_URL } from './apiConfig';

// Simple client-side session TTL (e.g., 24 hours)
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const AUTH_TOKEN_KEY = 'authToken';
const SESSION_EXPIRY_KEY = 'authSessionExpiry';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
  role?: string;
  roles?: string;
  onboarding_status?: 'org_pending' | 'team_pending' | 'complete' | string;
  is_onboarding?: boolean;
  onboarding_stage?: string;
}

class AuthService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private setSessionExpiryNow(): void {
    const expiryAt = Date.now() + SESSION_TTL_MS;
    try {
      localStorage.setItem(SESSION_EXPIRY_KEY, String(expiryAt));
    } catch {}
  }

  private clearSession(): void {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(SESSION_EXPIRY_KEY);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('lastOrganizationId');
    } catch {}
  }

  private isSessionExpired(): boolean {
    const rawExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
    if (!rawExpiry) {
      // If there's no expiry saved, treat as expired to force re-login
      return true;
    }
    const expiryAt = Number(rawExpiry);
    if (!Number.isFinite(expiryAt)) return true;
    return Date.now() > expiryAt;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Auth login → URL:', `${XANO_BASE_URL}/auth/login`);
      console.log('Auth login → payload:', { email: credentials.email ? '[redacted]' : '', hasPassword: !!credentials.password });
      const response = await fetch(`${XANO_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      let data: any = {};
      let rawBody = '';
      try {
        rawBody = await response.clone().text();
      } catch {}
      try {
        data = await response.json();
      } catch {}

      // Accept multiple token/user shapes
      const token = data.token || data.authToken || data.jwt || data.access_token || null;
      const user = data.user || data.data?.user || (data.id && data.email ? { id: data.id, name: data.name, email: data.email } : null);

      console.log('=== LOGIN API RESPONSE DEBUG ===');
      console.log('1. Raw API response:', data);
      console.log('2. Extracted token:', token ? 'Present' : 'Missing');
      console.log('3. Extracted user:', user);
      console.log('4. User ID from response:', user?.id);
      console.log('5. All response fields:', Object.keys(data));
      console.log('=== LOGIN API RESPONSE DEBUG END ===');

      if (response.ok && (token || user)) {
        if (token) {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          this.setSessionExpiryNow();
        }
        
        // Fetch complete user data including roles and onboarding_stage
        let completeUser = user;
        console.log('=== LOGIN USER DATA DEBUG ===');
        console.log('1. Initial user from login response:', user);
        console.log('2. User ID from login response:', user?.id);
        console.log('3. Token available:', !!token);
        
        if (token) {
          try {
            // Try to get user ID from multiple sources
            let userId = completeUser?.id;
            
            // If no user ID from login response, try /auth/me first
            if (!userId) {
              console.log('4a. No user ID from login, trying /auth/me to get user ID');
              try {
                const meResponse = await fetch(`${XANO_BASE_URL}/auth/me`, {
                  method: 'GET',
                  headers: this.getAuthHeaders(),
                });
                if (meResponse.ok) {
                  const meData = await meResponse.json();
                  console.log('4b. /auth/me response:', meData);
                  userId = meData.id;
                  console.log('4c. User ID from /auth/me:', userId);
                }
              } catch (meError) {
                console.warn('4d. /auth/me failed:', meError);
              }
            }
            
            // Now try to get complete user data if we have a user ID
            if (userId) {
              console.log('5. User ID found, fetching complete data from /user/{id}');
              const userDetailResponse = await fetch(`${XANO_BASE_URL}/user/${userId}`, {
                method: 'GET',
                headers: this.getAuthHeaders(),
              });
              
              if (userDetailResponse.ok) {
                const userDetail = await userDetailResponse.json();
                console.log('6. Complete user data fetched successfully:', userDetail);
                console.log('7. User roles:', userDetail.roles);
                console.log('8. User onboarding_stage:', userDetail.onboarding_stage);
                console.log('9. All user fields:', Object.keys(userDetail));
                console.log('10. Roles field type:', typeof userDetail.roles);
                console.log('11. Roles is array:', Array.isArray(userDetail.roles));
                console.log('12. Roles field exists:', !!userDetail.roles);
                console.log('13. Raw roles value:', userDetail.roles);
                
                // Use the complete user data
                completeUser = userDetail;
              } else {
                console.warn('10. Failed to fetch user detail, status:', userDetailResponse.status);
                console.warn('11. Response text:', await userDetailResponse.text());
              }
            } else {
              console.log('5. No user ID found from any source, cannot fetch complete data');
            }
          } catch (fetchError) {
            console.error('12. Error fetching complete user data:', fetchError);
          }
        } else {
          console.log('4. No token available, cannot fetch complete data');
        }
        
        console.log('12. Final completeUser object:', completeUser);
        console.log('13. Final user roles:', completeUser?.roles);
        console.log('14. Final user onboarding_stage:', completeUser?.onboarding_stage);
        console.log('=== LOGIN USER DATA DEBUG END ===');
        
        // Cache complete user for onboarding decisions
        try { if (completeUser) localStorage.setItem('currentUser', JSON.stringify(completeUser)); } catch {}
        return {
          success: true,
          token: token || undefined,
          user: completeUser || undefined,
        };
      } else {
        // Log details for debugging real API failures
        console.error('Login failed:', {
          status: response.status,
          statusText: response.statusText,
          data,
          rawBody,
        });
        return {
          success: false,
          message: data.message || data.error || (rawBody || 'Login failed'),
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      // Accept a variety of token/user shapes from backend
      const token = data.token || data.authToken || data.jwt || data.access_token || null;
      const user = data.user || data.data?.user || (data.id && data.email ? { id: data.id, name: data.name, email: data.email } : null);

      if (response.ok && (token || user)) {
        if (token) {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          this.setSessionExpiryNow();
        }
        try { if (user) localStorage.setItem('currentUser', JSON.stringify(user)); } catch {}
        return {
          success: true,
          token: token || undefined,
          user: user || undefined,
        };
      } else {
        return {
          success: false,
          message: data.message || data.error || 'Signup failed',
        };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // Expire early if session is stale
      if (this.isSessionExpired()) {
        this.clearSession();
        return null;
      }
      const response = await fetch(`${XANO_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const user = await response.json();
        try { if (user) localStorage.setItem('currentUser', JSON.stringify(user)); } catch {}
        return user;
      } else {
        // Token might be invalid, remove it
        this.clearSession();
        return null;
      }
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  logout(): void {
    this.clearSession();
  }

  isAuthenticated(): boolean {
    const hasToken = !!localStorage.getItem(AUTH_TOKEN_KEY);
    if (!hasToken) return false;
    if (this.isSessionExpired()) {
      this.clearSession();
      return false;
    }
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
}

export const authService = new AuthService();
