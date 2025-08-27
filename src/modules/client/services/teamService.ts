import { getSupabaseUrl, getSupabaseHeaders, SUPABASE_ENDPOINTS } from '../../shared/services/supabaseConfig';

export interface Team {
  id: string;
  created_at: number;
  organization_id: string;
  name: string;
  structure_preference: string;
  pace_of_work: string;
  autonomy: string;
  initiative_level: string;
  decision_making_style: string;
  attention_to_detail: string;
  team_age_composition: string;
  team_gender_composition: string;
  multitasking_ability: string;
  working_hours_energy_flow: string;
  preferred_communication_style: string;
  cultural_diversity_alignment: string;
}

export interface CreateTeamData {
  organization_id: string;
  name: string;
  structure_preference: string;
  pace_of_work: string;
  autonomy: string;
  initiative_level: string;
  decision_making_style: string;
  attention_to_detail: string;
  team_age_composition: string;
  team_gender_composition: string;
  multitasking_ability: string;
  working_hours_energy_flow: string;
  preferred_communication_style: string;
  cultural_diversity_alignment: string;
}

export interface TeamResponse {
  success: boolean;
  message?: string;
  team?: Team;
  teams?: Team[];
}

class TeamService {
  private getAuthHeaders(): HeadersInit {
    return getSupabaseHeaders(true);
  }

  async createTeam(data: CreateTeamData): Promise<TeamResponse> {
    try {
      const response = await fetch(getSupabaseUrl(SUPABASE_ENDPOINTS.TEAMS), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const team = await response.json();
        return {
          success: true,
          team,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to create team',
        };
      }
    } catch (error) {
      console.error('Create team error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getTeamsByOrganization(organizationId: string): Promise<TeamResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.TEAMS)?organization_id=${organizationId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const teams = await response.json();
        return {
          success: true,
          teams,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to fetch teams',
        };
      }
    } catch (error) {
      console.error('Get teams error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getUserTeams(): Promise<TeamResponse> {
    try {
      const response = await fetch(getSupabaseUrl(SUPABASE_ENDPOINTS.TEAMS), {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const teams = await response.json();
        return {
          success: true,
          teams,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to fetch teams',
        };
      }
    } catch (error) {
      console.error('Get user teams error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getTeamById(id: string): Promise<TeamResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.TEAMS)/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const team = await response.json();
        return {
          success: true,
          team,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to fetch team',
        };
      }
    } catch (error) {
      console.error('Get team error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async updateTeam(id: string, data: Partial<CreateTeamData>): Promise<TeamResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.TEAMS)/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const team = await response.json();
        return {
          success: true,
          team,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to update team',
        };
      }
    } catch (error) {
      console.error('Update team error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async deleteTeam(id: string): Promise<TeamResponse> {
    try {
      const response = await fetch(`getSupabaseUrl(SUPABASE_ENDPOINTS.TEAMS)/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Team deleted successfully',
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to delete team',
        };
      }
    } catch (error) {
      console.error('Delete team error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }
}

export const teamService = new TeamService();
