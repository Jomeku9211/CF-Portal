import { XANO_BASE_URL } from './apiConfig';

export interface UserUpdateResponse {
  success: boolean;
  message?: string;
}

class UserService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async updateCurrentUserRole(role: string): Promise<UserUpdateResponse> {
    try {
      // Prefer PATCH for partial update
      let response = await fetch(`${XANO_BASE_URL}/auth/me`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        // If backend requires full payload on PUT, retry with merged data
        let errorText = '';
        try {
          const data = await response.clone().json();
          errorText = (data?.message || data?.error || data?.detail || '').toLowerCase();
        } catch {}

        if (response.status === 400 && errorText.includes('missing')) {
          const rawUser = localStorage.getItem('currentUser');
          const currentUser = rawUser ? JSON.parse(rawUser) : {};
          const fallbackPayload = {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            role,
          };
          response = await fetch(`${XANO_BASE_URL}/auth/me`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(fallbackPayload),
          });
        }
      }

      if (response.ok) return { success: true };

      let errorMsg = '';
      try {
        const data = await response.json();
        errorMsg = data?.message || data?.error || '';
      } catch {}
      return { success: false, message: errorMsg || `Failed to update role (${response.status})` };
    } catch {
      return { success: false, message: 'Network error occurred' };
    }
  }

  async updateUserById(userId: string, data: Record<string, any>): Promise<UserUpdateResponse> {
    try {
      // Try PATCH first for partial updates
      let response = await fetch(`${XANO_BASE_URL}/user/${userId}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorText = '';
        try {
          const body = await response.clone().json();
          errorText = (body?.message || body?.error || body?.detail || '').toLowerCase();
        } catch {}

        if (response.status === 400 && errorText.includes('missing')) {
          // Build a fallback full payload for PUT
          const rawUser = localStorage.getItem('currentUser');
          const currentUser = rawUser ? JSON.parse(rawUser) : {};
          const fallbackPayload = {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            ...currentUser,
            ...data,
          };
          response = await fetch(`${XANO_BASE_URL}/user/${userId}`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(fallbackPayload),
          });
        }
      }

      if (response.ok) return { success: true };

      let errorMsg = '';
      try {
        const body = await response.json();
        errorMsg = body?.message || body?.error || body?.detail || '';
      } catch {}
      return { success: false, message: errorMsg || `Failed to update user (${response.status})` };
    } catch {
      return { success: false, message: 'Network error occurred' };
    }
  }
}

export const userService = new UserService();


