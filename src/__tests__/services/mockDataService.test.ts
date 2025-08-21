import { 
  mockDataService, 
  mockOrganizations, 
  mockTeams, 
  mockJobPosts 
} from '../../services/mockDataService';

describe('mockDataService', () => {
  describe('getMockOrganizations', () => {
    it('returns all mock organizations', () => {
      const result = mockDataService.getMockOrganizations();
      expect(result).toEqual(mockOrganizations);
      expect(result).toHaveLength(3);
    });

    it('returns organizations with correct structure', () => {
      const result = mockDataService.getMockOrganizations();
      const firstOrg = result[0];
      
      expect(firstOrg).toHaveProperty('id');
      expect(firstOrg).toHaveProperty('created_at');
      expect(firstOrg).toHaveProperty('name');
      expect(firstOrg).toHaveProperty('industry');
      expect(firstOrg).toHaveProperty('website_url');
      expect(firstOrg).toHaveProperty('organization_size');
      expect(firstOrg).toHaveProperty('current_funding_status');
      expect(firstOrg).toHaveProperty('key_investors_backers');
      expect(firstOrg).toHaveProperty('revenue_status');
      expect(firstOrg).toHaveProperty('profitability_status');
      expect(firstOrg).toHaveProperty('why_statement');
      expect(firstOrg).toHaveProperty('origin_story');
      expect(firstOrg).toHaveProperty('core_beliefs_principles');
      expect(firstOrg).toHaveProperty('how_we_live_purpose');
      expect(firstOrg).toHaveProperty('creator');
    });

    it('returns TechCorp Solutions as first organization', () => {
      const result = mockDataService.getMockOrganizations();
      expect(result[0].name).toBe('TechCorp Solutions');
      expect(result[0].industry).toBe('FinTech');
      expect(result[0].current_funding_status).toBe('Series A');
    });

    it('returns GreenTech Innovations as second organization', () => {
      const result = mockDataService.getMockOrganizations();
      expect(result[1].name).toBe('GreenTech Innovations');
      expect(result[1].industry).toBe('AgriTech');
      expect(result[1].current_funding_status).toBe('Bootstrapped');
    });

    it('returns HealthTech Pro as third organization', () => {
      const result = mockDataService.getMockOrganizations();
      expect(result[2].name).toBe('HealthTech Pro');
      expect(result[2].industry).toBe('HealthTech');
      expect(result[2].current_funding_status).toBe('Series B');
    });
  });

  describe('getMockTeams', () => {
    it('returns all mock teams', () => {
      const result = mockDataService.getMockTeams();
      expect(result).toEqual(mockTeams);
      expect(result).toHaveLength(4);
    });

    it('returns teams with correct structure', () => {
      const result = mockDataService.getMockTeams();
      const firstTeam = result[0];
      
      expect(firstTeam).toHaveProperty('id');
      expect(firstTeam).toHaveProperty('created_at');
      expect(firstTeam).toHaveProperty('organization_id');
      expect(firstTeam).toHaveProperty('name');
      expect(firstTeam).toHaveProperty('structure_preference');
      expect(firstTeam).toHaveProperty('pace_of_work');
      expect(firstTeam).toHaveProperty('autonomy');
      expect(firstTeam).toHaveProperty('initiative_level');
      expect(firstTeam).toHaveProperty('decision_making_style');
      expect(firstTeam).toHaveProperty('attention_to_detail');
      expect(firstTeam).toHaveProperty('team_age_composition');
      expect(firstTeam).toHaveProperty('team_gender_composition');
      expect(firstTeam).toHaveProperty('multitasking_ability');
      expect(firstTeam).toHaveProperty('working_hours_energy_flow');
      expect(firstTeam).toHaveProperty('preferred_communication_style');
      expect(firstTeam).toHaveProperty('cultural_diversity_alignment');
    });

    it('returns Frontend Development Team as first team', () => {
      const result = mockDataService.getMockTeams();
      expect(result[0].name).toBe('Frontend Development Team');
      expect(result[0].structure_preference).toBe('Agile');
      expect(result[0].pace_of_work).toBe('Fast-paced');
    });

    it('returns Backend Engineering Team as second team', () => {
      const result = mockDataService.getMockTeams();
      expect(result[1].name).toBe('Backend Engineering Team');
      expect(result[1].structure_preference).toBe('Scrum');
      expect(result[1].pace_of_work).toBe('Moderate');
    });

    it('returns Research & Development as third team', () => {
      const result = mockDataService.getMockTeams();
      expect(result[2].name).toBe('Research & Development');
      expect(result[2].structure_preference).toBe('Lean');
      expect(result[2].pace_of_work).toBe('Slow and steady');
    });

    it('returns Product Development as fourth team', () => {
      const result = mockDataService.getMockTeams();
      expect(result[3].name).toBe('Product Development');
      expect(result[3].structure_preference).toBe('Kanban');
      expect(result[3].pace_of_work).toBe('Fast-paced');
    });
  });

  describe('getMockJobPosts', () => {
    it('returns all mock job posts', () => {
      const result = mockDataService.getMockJobPosts();
      expect(result).toEqual(mockJobPosts);
      expect(result).toHaveLength(4);
    });

    it('returns job posts with correct structure', () => {
      const result = mockDataService.getMockJobPosts();
      const firstJob = result[0];
      
      expect(firstJob).toHaveProperty('id');
      expect(firstJob).toHaveProperty('created_at');
      expect(firstJob).toHaveProperty('team_id');
      expect(firstJob).toHaveProperty('title');
      expect(firstJob).toHaveProperty('description');
      expect(firstJob).toHaveProperty('requirements');
      expect(firstJob).toHaveProperty('responsibilities');
      expect(firstJob).toHaveProperty('skills');
      expect(firstJob).toHaveProperty('experience_level');
      expect(firstJob).toHaveProperty('employment_type');
      expect(firstJob).toHaveProperty('location');
      expect(firstJob).toHaveProperty('salary_range');
      expect(firstJob).toHaveProperty('benefits');
      expect(firstJob).toHaveProperty('hiring_intent');
      expect(firstJob).toHaveProperty('urgency');
      expect(firstJob).toHaveProperty('budget_range');
      expect(firstJob).toHaveProperty('timeline');
      expect(firstJob).toHaveProperty('contact_email');
      expect(firstJob).toHaveProperty('status');
    });

    it('returns Senior React Developer as first job post', () => {
      const result = mockDataService.getMockJobPosts();
      expect(result[0].title).toBe('Senior React Developer');
      expect(result[0].experience_level).toBe('Senior (5+ years)');
      expect(result[0].status).toBe('active');
    });

    it('returns Backend Python Engineer as second job post', () => {
      const result = mockDataService.getMockJobPosts();
      expect(result[1].title).toBe('Backend Python Engineer');
      expect(result[1].experience_level).toBe('Mid-level (3-5 years)');
      expect(result[1].status).toBe('active');
    });

    it('returns Agricultural Research Scientist as third job post', () => {
      const result = mockDataService.getMockJobPosts();
      expect(result[2].title).toBe('Agricultural Research Scientist');
      expect(result[2].experience_level).toBe('Senior (5+ years)');
      expect(result[2].status).toBe('draft');
    });

    it('returns Product Manager - Healthcare as fourth job post', () => {
      const result = mockDataService.getMockJobPosts();
      expect(result[3].title).toBe('Product Manager - Healthcare');
      expect(result[3].experience_level).toBe('Senior (5+ years)');
      expect(result[3].status).toBe('active');
    });
  });

  describe('getMockTeamsByOrganization', () => {
    it('returns teams for a specific organization', () => {
      const result = mockDataService.getMockTeamsByOrganization('org-1');
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Frontend Development Team');
      expect(result[1].name).toBe('Backend Engineering Team');
    });

    it('returns teams for another organization', () => {
      const result = mockDataService.getMockTeamsByOrganization('org-2');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Research & Development');
    });

    it('returns empty array for non-existent organization', () => {
      const result = mockDataService.getMockTeamsByOrganization('non-existent');
      expect(result).toEqual([]);
    });

    it('returns empty array for undefined organization id', () => {
      const result = mockDataService.getMockTeamsByOrganization(undefined as any);
      expect(result).toEqual([]);
    });
  });

  describe('getMockJobPostsByTeam', () => {
    it('returns job posts for a specific team', () => {
      const result = mockDataService.getMockJobPostsByTeam('team-1');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Senior React Developer');
    });

    it('returns job posts for another team', () => {
      const result = mockDataService.getMockJobPostsByTeam('team-2');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Backend Python Engineer');
    });

    it('returns empty array for non-existent team', () => {
      const result = mockDataService.getMockJobPostsByTeam('non-existent');
      expect(result).toEqual([]);
    });

    it('returns empty array for undefined team id', () => {
      const result = mockDataService.getMockJobPostsByTeam(undefined as any);
      expect(result).toEqual([]);
    });
  });

  describe('getMockOrganizationById', () => {
    it('returns organization by id', () => {
      const result = mockDataService.getMockOrganizationById('org-1');
      expect(result).toBeDefined();
      expect(result?.name).toBe('TechCorp Solutions');
    });

    it('returns another organization by id', () => {
      const result = mockDataService.getMockOrganizationById('org-2');
      expect(result).toBeDefined();
      expect(result?.name).toBe('GreenTech Innovations');
    });

    it('returns undefined for non-existent organization', () => {
      const result = mockDataService.getMockOrganizationById('non-existent');
      expect(result).toBeUndefined();
    });

    it('returns undefined for undefined id', () => {
      const result = mockDataService.getMockOrganizationById(undefined as any);
      expect(result).toBeUndefined();
    });
  });

  describe('getMockTeamById', () => {
    it('returns team by id', () => {
      const result = mockDataService.getMockTeamById('team-1');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Frontend Development Team');
    });

    it('returns another team by id', () => {
      const result = mockDataService.getMockTeamById('team-2');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Backend Engineering Team');
    });

    it('returns undefined for non-existent team', () => {
      const result = mockDataService.getMockTeamById('non-existent');
      expect(result).toBeUndefined();
    });

    it('returns undefined for undefined id', () => {
      const result = mockDataService.getMockTeamById(undefined as any);
      expect(result).toBeUndefined();
    });
  });

  describe('getMockJobPostById', () => {
    it('returns job post by id', () => {
      const result = mockDataService.getMockJobPostById('job-1');
      expect(result).toBeDefined();
      expect(result?.title).toBe('Senior React Developer');
    });

    it('returns another job post by id', () => {
      const result = mockDataService.getMockJobPostById('job-2');
      expect(result).toBeDefined();
      expect(result?.title).toBe('Backend Python Engineer');
    });

    it('returns undefined for non-existent job post', () => {
      const result = mockDataService.getMockJobPostById('non-existent');
      expect(result).toBeUndefined();
    });

    it('returns undefined for undefined id', () => {
      const result = mockDataService.getMockJobPostById(undefined as any);
      expect(result).toBeUndefined();
    });
  });

  describe('mock data consistency', () => {
    it('has consistent organization references in teams', () => {
      const organizations = mockDataService.getMockOrganizations();
      const teams = mockDataService.getMockTeams();
      
      teams.forEach(team => {
        const org = organizations.find(o => o.id === team.organization_id);
        expect(org).toBeDefined();
      });
    });

    it('has consistent team references in job posts', () => {
      const teams = mockDataService.getMockTeams();
      const jobPosts = mockDataService.getMockJobPosts();
      
      jobPosts.forEach(job => {
        const team = teams.find(t => t.id === job.team_id);
        expect(team).toBeDefined();
      });
    });

    it('has unique ids for organizations', () => {
      const organizations = mockDataService.getMockOrganizations();
      const ids = organizations.map(org => org.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('has unique ids for teams', () => {
      const teams = mockDataService.getMockTeams();
      const ids = teams.map(team => team.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('has unique ids for job posts', () => {
      const jobPosts = mockDataService.getMockJobPosts();
      const ids = jobPosts.map(job => job.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });
});
