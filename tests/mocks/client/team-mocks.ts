import { Team } from '../../../src/modules/client/services/teamService';

// Mock Teams for Client Onboarding Testing
export const mockTeams: Team[] = [
  {
    id: 'team-1',
    created_at: Date.now() - 86400000,
    organization_id: 'org-1',
    name: 'Frontend Development Team',
    structure_preference: 'Agile',
    pace_of_work: 'Fast-paced',
    autonomy: 'High',
    initiative_level: 'Proactive',
    decision_making_style: 'Collaborative',
    attention_to_detail: 'High',
    team_age_composition: '25-35',
    team_gender_composition: 'Balanced',
    multitasking_ability: 'High',
    working_hours_energy_flow: 'Morning focused',
    preferred_communication_style: 'Async-first',
    cultural_diversity_alignment: 'Strong'
  },
  {
    id: 'team-2',
    created_at: Date.now() - 86400000,
    organization_id: 'org-1',
    name: 'Backend Engineering Team',
    structure_preference: 'Scrum',
    pace_of_work: 'Moderate',
    autonomy: 'Medium',
    initiative_level: 'Responsive',
    decision_making_style: 'Hierarchical',
    attention_to_detail: 'Very High',
    team_age_composition: '30-40',
    team_gender_composition: 'Male dominated',
    multitasking_ability: 'Medium',
    working_hours_energy_flow: 'Evening focused',
    preferred_communication_style: 'Synchronous',
    cultural_diversity_alignment: 'Moderate'
  },
  {
    id: 'team-3',
    created_at: Date.now() - 172800000,
    organization_id: 'org-2',
    name: 'Research & Development',
    structure_preference: 'Flexible',
    pace_of_work: 'Slow-paced',
    autonomy: 'Very High',
    initiative_level: 'Innovative',
    decision_making_style: 'Consensus-based',
    attention_to_detail: 'Extremely High',
    team_age_composition: '35-50',
    team_gender_composition: 'Balanced',
    multitasking_ability: 'Low',
    working_hours_energy_flow: 'Variable',
    preferred_communication_style: 'Documentation-first',
    cultural_diversity_alignment: 'Very Strong'
  },
  {
    id: 'team-4',
    created_at: Date.now() - 259200000,
    organization_id: 'org-3',
    name: 'Clinical Operations',
    structure_preference: 'Traditional',
    pace_of_work: 'Steady',
    autonomy: 'Low',
    initiative_level: 'Reactive',
    decision_making_style: 'Protocol-based',
    attention_to_detail: 'Critical',
    team_age_composition: '40-60',
    team_gender_composition: 'Female dominated',
    multitasking_ability: 'High',
    working_hours_energy_flow: 'Day shift',
    preferred_communication_style: 'Face-to-face',
    cultural_diversity_alignment: 'Moderate'
  }
];

// Mock data service functions for teams
export const mockTeamService = {
  getMockTeams: (): Team[] => mockTeams,
  getMockTeamsByOrganization: (organizationId: string): Team[] => 
    mockTeams.filter(team => team.organization_id === organizationId),
  getMockTeamById: (id: string): Team | undefined => 
    mockTeams.find(team => team.id === id),
  createMockTeam: (data: Partial<Team>): Team => ({
    id: `team-${Date.now()}`,
    created_at: Date.now(),
    organization_id: data.organization_id || 'org-1',
    name: data.name || 'New Team',
    structure_preference: data.structure_preference || 'Agile',
    pace_of_work: data.pace_of_work || 'Moderate',
    autonomy: data.autonomy || 'Medium',
    initiative_level: data.initiative_level || 'Responsive',
    decision_making_style: data.decision_making_style || 'Collaborative',
    attention_to_detail: data.attention_to_detail || 'High',
    team_age_composition: data.team_age_composition || '25-35',
    team_gender_composition: data.team_gender_composition || 'Balanced',
    multitasking_ability: data.multitasking_ability || 'Medium',
    working_hours_energy_flow: data.working_hours_energy_flow || 'Day shift',
    preferred_communication_style: data.preferred_communication_style || 'Async-first',
    cultural_diversity_alignment: data.cultural_diversity_alignment || 'Moderate'
  })
};
