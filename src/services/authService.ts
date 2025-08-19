const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56';

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

      if (response.ok && (token || user)) {
        if (token) {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          this.setSessionExpiryNow();
        }
        return {
          success: true,
          token: token || undefined,
          user: user || undefined,
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
