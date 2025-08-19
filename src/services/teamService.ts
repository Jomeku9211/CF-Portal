import { XANO_BASE_URL } from './apiConfig';

// Team enum value mappings - update these based on backend database enum values
const teamEnumMappings = {
  structure_preference: {
    'highly_structured': 'Highly structured',    // Database: "Highly structured"
    'semi_structured': 'Semi-structured',        // Database: "Semi-structured" 
    'flexible': 'Flexible'                       // Database: "Flexible"
  },
  pace_of_work: {
    'fast': 'Fast',                          // Database: "Fast"
    'balanced': 'Balanced',                  // Database: "Balanced"
    'thoughtful': 'Thoughtful'               // Database: "Thoughtful"
  },
  autonomy: {
    'independent': 'Independent',             // Database: "Independent"
    'semi_collaborative': 'Semi_collaborative', // Database: "Semi_collaborative"
    'collaborative': 'Collaborative'         // Database: "Collaborative"
  },
  initiative_level: {
    'proactive': 'Proactive',                // Database: "Proactive"
    'reactive': 'Reactive',                  // Database: "Reactive"
    'instruction_led': 'Instruction_led'     // Database: "Instruction_led"
  },
  decision_making_style: {
    'analytical': 'Analytical',              // Database: "Analytical"
    'intuitive': 'Intuitive',                // Database: "Intuitive"
    'mix': 'Mix'                             // Database: "Mix"
  },
  attention_to_detail: {
    'detail_oriented': 'Detail_oriented',    // Database: "Detail_oriented"
    'big_picture': 'Big-picture_thinkers',   // Database: "Big-picture_thinkers"
    'balanced': 'Balanced'                   // Database: "Balanced"
  },
  team_age_composition: {
    'gen_z': 'Mostly Gen Z (born 1997–2012)',      // Database: "Mostly Gen Z (born 1997–2012)"
    'millennials': 'Mostly Millennials (1981–1996)', // Database: "Mostly Millennials (1981–1996)"
    'gen_x': 'Mostly Gen X (1965–1980)',            // Database: "Mostly Gen X (1965–1980)"
    'mixed': 'Mixed age group',                     // Database: "Mixed age group"
    'prefer_not_to_say': 'Prefer not to say'        // Database: "Prefer not to say"
  },
  team_gender_composition: {
    'mostly_male': 'Mostly male',            // Database: "Mostly male"
    'mostly_female': 'Mostly female',        // Database: "Mostly female"
    'mixed': 'Mixed gender',                 // Database: "Mixed gender"
    'prefer_not_to_say': 'Prefer not to say' // Database: "Prefer not to say"
  },
  multitasking_ability: {
    'single_task': 'Single-task',            // Database: "Single-task"
    'multi_threaded': 'Multi-threaded'       // Database: "Multi-threaded"
  },
  working_hours_energy_flow: {
    'morning': 'Morning-focused',            // Database: "Morning-focused"
    'afternoon': 'Evening-focused',          // Database: "Evening-focused"
    'evening': 'Flexible'                    // Database: "Flexible"
  },
  preferred_communication_style: {
    'written': 'Written',                      // Database: "Written"
    'verbal': 'Verbal',                        // Database: "Verbal"
    'mixed': 'Mixed'                           // Database: "Mixed"
  },
  cultural_diversity_alignment: {
    'thrives_in_diversity': 'thrives_in_diversity',    // Database: "thrives_in_diversity"
    'respects_diversity': 'respects_diversity',         // Database: "respects_diversity"
    'like_minded': 'like_minded'                        // Database: "like_minded"
  },
  stress_handling_style: {
    'calm_under_pressure': 'calm_under_pressure',           // Database: "calm_under_pressure"
    'needs_stability': 'need_stable_enviroment',             // Database: "need_stable_enviroment"
    'performs_with_support': 'performs_well_with_support'    // Database: "performs_well_with_support"
  }
};

// Function to map frontend values to backend enum values
function mapTeamValuesToBackend(data: any): any {
  const mappedData = { ...data };
  
  Object.keys(teamEnumMappings).forEach(field => {
    if (data[field] && teamEnumMappings[field as keyof typeof teamEnumMappings]) {
      const mapping = teamEnumMappings[field as keyof typeof teamEnumMappings];
      const frontendValue = data[field];
      const backendValue = mapping[frontendValue as keyof typeof mapping];
      
      if (backendValue) {
        mappedData[field] = backendValue;
        console.log(`Mapped ${field}: "${frontendValue}" -> "${backendValue}"`);
      } else {
        console.warn(`No mapping found for ${field}: "${frontendValue}"`);
      }
    }
  });
  
  return mappedData;
}

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
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async createTeam(data: CreateTeamData): Promise<TeamResponse> {
    try {
      console.log('=== CREATE TEAM DEBUG ===');
      console.log('1. Original team data:', data);
      
      // Map frontend values to backend enum values
      const mappedData = mapTeamValuesToBackend(data);
      console.log('2. Mapped team data:', mappedData);
      
      const response = await fetch(`${XANO_BASE_URL}/team`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(mappedData),
      });

      if (response.ok) {
        const team = await response.json();
        console.log('3. Team created successfully:', team);
        return {
          success: true,
          team,
        };
      } else {
        const errorData = await response.json();
        console.error('4. Team creation failed:', errorData);
        console.error('5. Response status:', response.status);
        console.error('6. Response headers:', response.headers);
        console.error('7. Full error response:', errorData);
        
        // Try to extract more error details
        if (errorData.errors) {
          console.error('8. Validation errors:', errorData.errors);
        }
        if (errorData.details) {
          console.error('9. Error details:', errorData.details);
        }
        
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
      const response = await fetch(`${XANO_BASE_URL}/team?organization_id=${organizationId}`, {
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
      const response = await fetch(`${XANO_BASE_URL}/team`, {
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
      const response = await fetch(`${XANO_BASE_URL}/team/${id}`, {
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
      const response = await fetch(`${XANO_BASE_URL}/team/${id}`, {
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
      const response = await fetch(`${XANO_BASE_URL}/team/${id}`, {
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
