import { teamService, CreateTeamData } from '../../services/teamService';

// Mock localStorage
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
  },
});

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

describe('TeamService', () => {
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    jest.clearAllMocks();
    mockGetItem.mockReturnValue('test-token');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAuthHeaders', () => {
    it('should include authorization header when token exists', async () => {
      mockGetItem.mockReturnValue('test-token');
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '1', name: 'Test Team' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const mockData: CreateTeamData = {
        organization_id: 'org-123',
        name: 'Development Team',
        structure_preference: 'highly_structured',
        pace_of_work: 'fast',
        autonomy: 'independent',
        initiative_level: 'proactive',
        decision_making_style: 'analytical',
        attention_to_detail: 'detail_oriented',
        team_age_composition: 'millennials',
        team_gender_composition: 'mixed',
        multitasking_ability: 'multi_threaded',
        working_hours_energy_flow: 'morning',
        preferred_communication_style: 'written',
        cultural_diversity_alignment: 'thrives_in_diversity'
      };

      await teamService.createTeam(mockData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      );
    });

    it('should not include authorization header when token does not exist', async () => {
      mockGetItem.mockReturnValue(null);
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '1', name: 'Test Team' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const mockData: CreateTeamData = {
        organization_id: 'org-123',
        name: 'Development Team',
        structure_preference: 'highly_structured',
        pace_of_work: 'fast',
        autonomy: 'independent',
        initiative_level: 'proactive',
        decision_making_style: 'analytical',
        attention_to_detail: 'detail_oriented',
        team_age_composition: 'millennials',
        team_gender_composition: 'mixed',
        multitasking_ability: 'multi_threaded',
        working_hours_energy_flow: 'morning',
        preferred_communication_style: 'written',
        cultural_diversity_alignment: 'thrives_in_diversity'
      };

      await teamService.createTeam(mockData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.anything(),
          }),
        })
      );
    });
  });

  describe('createTeam', () => {
    const mockTeamData: CreateTeamData = {
      organization_id: 'org-123',
      name: 'Development Team',
      structure_preference: 'highly_structured',
      pace_of_work: 'fast',
      autonomy: 'independent',
      initiative_level: 'proactive',
      decision_making_style: 'analytical',
      attention_to_detail: 'detail_oriented',
      team_age_composition: 'millennials',
      team_gender_composition: 'mixed',
      multitasking_ability: 'multi_threaded',
      working_hours_energy_flow: 'morning',
      preferred_communication_style: 'written',
      cultural_diversity_alignment: 'thrives_in_diversity'
    };

    it('should create team successfully', async () => {
      const mockTeam = {
        id: 'team-123',
        created_at: 1234567890,
        organization_id: 'org-123',
        name: 'Development Team',
        structure_preference: 'Highly structured',
        pace_of_work: 'Fast',
        autonomy: 'Independent',
        initiative_level: 'Proactive',
        decision_making_style: 'Analytical',
        attention_to_detail: 'Detail_oriented',
        team_age_composition: 'Mostly Millennials (1981–1996)',
        team_gender_composition: 'Mixed gender',
        multitasking_ability: 'Multi-threaded',
        working_hours_energy_flow: 'Morning-focused',
        preferred_communication_style: 'Written',
        cultural_diversity_alignment: 'thrives_in_diversity'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockTeam)
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.createTeam(mockTeamData);

      expect(result).toEqual({
        success: true,
        team: mockTeam
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: expect.stringContaining('"name":"Development Team"'),
        }
      );

      // Verify that mapping was applied
      const requestBody = JSON.parse(mockFetch.mock.calls[0][1]!.body as string);
      expect(requestBody.structure_preference).toBe('Highly structured');
      expect(requestBody.pace_of_work).toBe('Fast');
      expect(requestBody.autonomy).toBe('Independent');
    });

    it('should map enum values correctly', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 'team-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await teamService.createTeam(mockTeamData);

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1]!.body as string);

      // Verify all enum mappings
      expect(requestBody.structure_preference).toBe('Highly structured');
      expect(requestBody.pace_of_work).toBe('Fast');
      expect(requestBody.autonomy).toBe('Independent');
      expect(requestBody.initiative_level).toBe('Proactive');
      expect(requestBody.decision_making_style).toBe('Analytical');
      expect(requestBody.attention_to_detail).toBe('Detail_oriented');
      expect(requestBody.team_age_composition).toBe('Mostly Millennials (1981–1996)');
      expect(requestBody.team_gender_composition).toBe('Mixed gender');
      expect(requestBody.multitasking_ability).toBe('Multi-threaded');
      expect(requestBody.working_hours_energy_flow).toBe('Morning-focused');
      expect(requestBody.preferred_communication_style).toBe('Written');
      expect(requestBody.cultural_diversity_alignment).toBe('thrives_in_diversity');
    });

    it('should handle API error response with message', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ 
          message: 'Validation failed',
          errors: ['Name is required']
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.createTeam(mockTeamData);

      expect(result).toEqual({
        success: false,
        message: 'Validation failed'
      });

      expect(console.error).toHaveBeenCalledWith('4. Team creation failed:', { 
        message: 'Validation failed',
        errors: ['Name is required']
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.createTeam(mockTeamData);

      expect(result).toEqual({
        success: false,
        message: 'Failed to create team'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await teamService.createTeam(mockTeamData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });

      expect(console.error).toHaveBeenCalledWith('Create team error:', expect.any(Error));
    });

    it('should handle error with validation details', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ 
          message: 'Validation failed',
          errors: ['Name is required', 'Organization ID is required'],
          details: { field: 'name', code: 'REQUIRED' }
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.createTeam(mockTeamData);

      expect(result).toEqual({
        success: false,
        message: 'Validation failed'
      });

      expect(console.error).toHaveBeenCalledWith('8. Validation errors:', ['Name is required', 'Organization ID is required']);
      expect(console.error).toHaveBeenCalledWith('9. Error details:', { field: 'name', code: 'REQUIRED' });
    });

    it('should log mapping warnings for unknown values', async () => {
      const dataWithUnknownValues = {
        ...mockTeamData,
        structure_preference: 'unknown_preference',
        pace_of_work: 'unknown_pace'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 'team-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await teamService.createTeam(dataWithUnknownValues);

      expect(console.warn).toHaveBeenCalledWith('No mapping found for structure_preference: "unknown_preference"');
      expect(console.warn).toHaveBeenCalledWith('No mapping found for pace_of_work: "unknown_pace"');
    });
  });

  describe('getTeamsByOrganization', () => {
    const organizationId = 'org-123';

    it('should fetch teams by organization successfully', async () => {
      const mockTeams = [
        { id: 'team-1', name: 'Team Alpha', organization_id: 'org-123' },
        { id: 'team-2', name: 'Team Beta', organization_id: 'org-123' }
      ];

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockTeams)
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.getTeamsByOrganization(organizationId);

      expect(result).toEqual({
        success: true,
        teams: mockTeams
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team?organization_id=org-123',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Organization not found'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.getTeamsByOrganization(organizationId);

      expect(result).toEqual({
        success: false,
        message: 'Organization not found'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.getTeamsByOrganization(organizationId);

      expect(result).toEqual({
        success: false,
        message: 'Failed to fetch teams'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await teamService.getTeamsByOrganization(organizationId);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });

      expect(console.error).toHaveBeenCalledWith('Get teams error:', expect.any(Error));
    });
  });

  describe('getUserTeams', () => {
    it('should fetch user teams successfully', async () => {
      const mockTeams = [
        { id: 'team-1', name: 'User Team 1' },
        { id: 'team-2', name: 'User Team 2' }
      ];

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockTeams)
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.getUserTeams();

      expect(result).toEqual({
        success: true,
        teams: mockTeams
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Unauthorized'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.getUserTeams();

      expect(result).toEqual({
        success: false,
        message: 'Unauthorized'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await teamService.getUserTeams();

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });

      expect(console.error).toHaveBeenCalledWith('Get user teams error:', expect.any(Error));
    });
  });

  describe('getTeamById', () => {
    const teamId = 'team-123';

    it('should fetch team by ID successfully', async () => {
      const mockTeam = {
        id: 'team-123',
        name: 'Specific Team',
        organization_id: 'org-123'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockTeam)
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.getTeamById(teamId);

      expect(result).toEqual({
        success: true,
        team: mockTeam
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team/team-123',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Team not found'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.getTeamById(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Team not found'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await teamService.getTeamById(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });

      expect(console.error).toHaveBeenCalledWith('Get team error:', expect.any(Error));
    });
  });

  describe('updateTeam', () => {
    const teamId = 'team-123';
    const updateData = {
      name: 'Updated Team Name',
      structure_preference: 'flexible'
    };

    it('should update team successfully', async () => {
      const mockUpdatedTeam = {
        id: 'team-123',
        name: 'Updated Team Name',
        structure_preference: 'flexible'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUpdatedTeam)
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.updateTeam(teamId, updateData);

      expect(result).toEqual({
        success: true,
        team: mockUpdatedTeam
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team/team-123',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify(updateData),
        }
      );
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Team not found'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.updateTeam(teamId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Team not found'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await teamService.updateTeam(teamId, updateData);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });

      expect(console.error).toHaveBeenCalledWith('Update team error:', expect.any(Error));
    });

    it('should handle empty update data', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 'team-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.updateTeam(teamId, {});

      expect(result).toEqual({
        success: true,
        team: { id: 'team-123' }
      });
    });
  });

  describe('deleteTeam', () => {
    const teamId = 'team-123';

    it('should delete team successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.deleteTeam(teamId);

      expect(result).toEqual({
        success: true,
        message: 'Team deleted successfully'
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/team/team-123',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });

    it('should handle API error response', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ 
          message: 'Team not found'
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.deleteTeam(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Team not found'
      });
    });

    it('should handle API error response without message', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({})
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await teamService.deleteTeam(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Failed to delete team'
      });
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await teamService.deleteTeam(teamId);

      expect(result).toEqual({
        success: false,
        message: 'Network error occurred'
      });

      expect(console.error).toHaveBeenCalledWith('Delete team error:', expect.any(Error));
    });
  });

  describe('enum mapping edge cases', () => {
    it('should handle data without enum fields', async () => {
      const dataWithoutEnums = {
        organization_id: 'org-123',
        name: 'Simple Team'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 'team-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await teamService.createTeam(dataWithoutEnums as CreateTeamData);

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1]!.body as string);
      expect(requestBody.organization_id).toBe('org-123');
      expect(requestBody.name).toBe('Simple Team');
    });

    it('should handle partial enum mapping', async () => {
      const partialData = {
        organization_id: 'org-123',
        name: 'Partial Team',
        structure_preference: 'semi_structured',
        pace_of_work: 'balanced',
        autonomy: 'collaborative',
        initiative_level: 'reactive',
        decision_making_style: 'intuitive',
        attention_to_detail: 'big_picture',
        team_age_composition: 'gen_z',
        team_gender_composition: 'mostly_female',
        multitasking_ability: 'single_task',
        working_hours_energy_flow: 'afternoon',
        preferred_communication_style: 'verbal',
        cultural_diversity_alignment: 'respects_diversity'
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 'team-123' })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      await teamService.createTeam(partialData);

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1]!.body as string);
      expect(requestBody.structure_preference).toBe('Semi-structured');
      expect(requestBody.pace_of_work).toBe('Balanced');
      expect(requestBody.autonomy).toBe('Collaborative');
      expect(requestBody.initiative_level).toBe('Reactive');
      expect(requestBody.decision_making_style).toBe('Intuitive');
      expect(requestBody.attention_to_detail).toBe('Big-picture_thinkers');
      expect(requestBody.team_age_composition).toBe('Mostly Gen Z (born 1997–2012)');
      expect(requestBody.team_gender_composition).toBe('Mostly female');
      expect(requestBody.multitasking_ability).toBe('Single-task');
      expect(requestBody.working_hours_energy_flow).toBe('Evening-focused');
      expect(requestBody.preferred_communication_style).toBe('Verbal');
      expect(requestBody.cultural_diversity_alignment).toBe('respects_diversity');
    });
  });
});
