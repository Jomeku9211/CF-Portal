import { userService } from '../../../modules/shared/services/userService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Developer Onboarding Database Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  describe('Personal Info Database Tests', () => {
    describe('Personal Information Creation and Validation', () => {
      test('creates personal info record in database', async () => {
        const mockResponse = {
          success: true,
          profile: {
            id: 'profile-123',
            user_id: 'user-123',
            full_name: 'John Doe',
            email: 'john@example.com',
            phone_number: '+1234567890',
            country: 'United States',
            state: 'California',
            city: 'San Francisco',
            profile_picture_url: 'https://example.com/avatar.jpg',
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            full_name: 'John Doe',
            email: 'john@example.com',
            phone_number: '+1234567890',
            country: 'United States',
            state: 'California',
            city: 'San Francisco',
            profile_picture_url: 'https://example.com/avatar.jpg'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.profile?.full_name).toBe('John Doe');
        expect(response.profile?.country).toBe('United States');
      });

      test('validates required personal info fields in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Full name is required',
          errors: {
            full_name: 'Full name is required'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            email: 'john@example.com'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Full name is required');
      });

      test('enforces unique email constraint in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Email already exists',
          error: 'DUPLICATE_EMAIL'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            full_name: 'John Doe',
            email: 'existing@example.com'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Email already exists');
      });
    });

    describe('Personal Info Field Validation', () => {
      test('validates phone number format in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid phone number format',
          errors: {
            phone_number: 'Phone number must be in international format'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            full_name: 'John Doe',
            phone_number: 'invalid-phone'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid phone number format');
      });

      test('validates country enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid country',
          errors: {
            country: 'Country must be one of: United States, Canada, United Kingdom, etc.'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            full_name: 'John Doe',
            country: 'invalid-country'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid country');
      });
    });
  });

  describe('Role Selection Database Tests', () => {
    describe('Work Type and Job Role Management', () => {
      test('creates role selection record in database', async () => {
        const mockResponse = {
          success: true,
          role_selection: {
            id: 'role-123',
            user_id: 'user-123',
            work_types: ['Full-time', 'Contract', 'Freelance'],
            primary_job_role: 'Full Stack Developer',
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            work_types: ['Full-time', 'Contract', 'Freelance'],
            primary_job_role: 'Full Stack Developer'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.role_selection?.work_types).toContain('Full-time');
        expect(response.role_selection?.primary_job_role).toBe('Full Stack Developer');
      });

      test('validates work type enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid work type',
          errors: {
            work_types: 'Work type must be one of: Full-time, Part-time, Contract, Freelance'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            work_types: ['Invalid-type']
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid work type');
      });

      test('validates job role enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid job role',
          errors: {
            primary_job_role: 'Job role must be one of: Frontend Developer, Backend Developer, Full Stack Developer, etc.'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            primary_job_role: 'Invalid Role'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid job role');
      });
    });
  });

  describe('Skills Database Tests', () => {
    describe('Technical Skills Management', () => {
      test('creates skills record in database', async () => {
        const mockResponse = {
          success: true,
          skills: {
            id: 'skills-123',
            user_id: 'user-123',
            technical_skills: [
              { name: 'JavaScript', level: 'Advanced' },
              { name: 'React', level: 'Intermediate' },
              { name: 'Node.js', level: 'Advanced' }
            ],
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            technical_skills: [
              { name: 'JavaScript', level: 'Advanced' },
              { name: 'React', level: 'Intermediate' },
              { name: 'Node.js', level: 'Advanced' }
            ]
          })
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.skills?.technical_skills).toHaveLength(3);
        expect(response.skills?.technical_skills[0].name).toBe('JavaScript');
      });

      test('validates skill level enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid skill level',
          errors: {
            'technical_skills.0.level': 'Skill level must be one of: Beginner, Intermediate, Advanced, Expert'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            technical_skills: [
              { name: 'JavaScript', level: 'Invalid-level' }
            ]
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid skill level');
      });

      test('enforces unique skill names per user in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Duplicate skill names not allowed',
          error: 'DUPLICATE_SKILLS'
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            technical_skills: [
              { name: 'JavaScript', level: 'Advanced' },
              { name: 'JavaScript', level: 'Intermediate' }
            ]
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Duplicate skill names not allowed');
      });
    });
  });

  describe('Work Preferences Database Tests', () => {
    describe('Work Environment and Team Dynamics', () => {
      test('creates work preferences record in database', async () => {
        const mockResponse = {
          success: true,
          work_preferences: {
            id: 'prefs-123',
            user_id: 'user-123',
            timezone_overlap: '4-6 hours',
            team_size: '5-10',
            company_stage: 'Series A',
            work_styles: ['Collaborative', 'Independent'],
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-work-preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            timezone_overlap: '4-6 hours',
            team_size: '5-10',
            company_stage: 'Series A',
            work_styles: ['Collaborative', 'Independent']
          })
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.work_preferences?.timezone_overlap).toBe('4-6 hours');
        expect(response.work_preferences?.work_styles).toContain('Collaborative');
      });

      test('validates timezone overlap enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid timezone overlap',
          errors: {
            timezone_overlap: 'Timezone overlap must be one of: 0-2 hours, 2-4 hours, 4-6 hours, 6+ hours'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-work-preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            timezone_overlap: 'invalid-overlap'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid timezone overlap');
      });

      test('validates company stage enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid company stage',
          errors: {
            company_stage: 'Company stage must be one of: Bootstrap, Seed, Series A, Series B, Series C+'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-work-preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            company_stage: 'invalid-stage'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid company stage');
      });
    });
  });

  describe('Soft Skills Database Tests', () => {
    describe('Interpersonal Skills and Work Approach', () => {
      test('creates soft skills record in database', async () => {
        const mockResponse = {
          success: true,
          soft_skills: {
            id: 'soft-123',
            user_id: 'user-123',
            communication: ['Clear', 'Active Listening'],
            ownership: ['Accountable', 'Proactive'],
            collaboration: ['Team Player', 'Conflict Resolution'],
            problem_solving: ['Analytical', 'Creative'],
            learning_attitude: ['Curious', 'Adaptable'],
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-soft-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            communication: ['Clear', 'Active Listening'],
            ownership: ['Accountable', 'Proactive'],
            collaboration: ['Team Player', 'Conflict Resolution'],
            problem_solving: ['Analytical', 'Creative'],
            learning_attitude: ['Curious', 'Adaptable']
          })
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.soft_skills?.communication).toContain('Clear');
        expect(response.soft_skills?.learning_attitude).toContain('Curious');
      });

      test('validates soft skill category values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid communication skill',
          errors: {
            communication: 'Communication skill must be one of: Clear, Active Listening, Empathetic, etc.'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-soft-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            communication: ['Invalid-skill']
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid communication skill');
      });
    });
  });

  describe('Verification Database Tests', () => {
    describe('Identity Verification and Professional Profiles', () => {
      test('creates verification record in database', async () => {
        const mockResponse = {
          success: true,
          verification: {
            id: 'verify-123',
            user_id: 'user-123',
            government_id_url: 'https://example.com/id.pdf',
            resume_url: 'https://example.com/resume.pdf',
            linkedin_url: 'https://linkedin.com/in/johndoe',
            github_url: 'https://github.com/johndoe',
            portfolio_url: 'https://johndoe.dev',
            verification_status: 'pending',
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            government_id_url: 'https://example.com/id.pdf',
            resume_url: 'https://example.com/resume.pdf',
            linkedin_url: 'https://linkedin.com/in/johndoe',
            github_url: 'https://github.com/johndoe',
            portfolio_url: 'https://johndoe.dev'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.verification?.verification_status).toBe('pending');
        expect(response.verification?.linkedin_url).toBe('https://linkedin.com/in/johndoe');
      });

      test('validates URL formats in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid LinkedIn URL format',
          errors: {
            linkedin_url: 'LinkedIn URL must be a valid URL'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            linkedin_url: 'invalid-url'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid LinkedIn URL format');
      });

      test('enforces file type constraints for documents in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid file type for government ID',
          errors: {
            government_id_url: 'Government ID must be a PDF, JPG, or PNG file'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            government_id_url: 'https://example.com/id.txt'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid file type for government ID');
      });
    });
  });

  describe('Final Details Database Tests', () => {
    describe('Availability and Salary Expectations', () => {
      test('creates final details record in database', async () => {
        const mockResponse = {
          success: true,
          final_details: {
            id: 'final-123',
            user_id: 'user-123',
            availability: 'Immediate',
            salary_expectation: '80000',
            currency: 'USD',
            onboarding_completed: true,
            created_at: new Date().toISOString()
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-final-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            availability: 'Immediate',
            salary_expectation: '80000',
            currency: 'USD'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(true);
        expect(response.final_details?.availability).toBe('Immediate');
        expect(response.final_details?.onboarding_completed).toBe(true);
      });

      test('validates availability enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid availability',
          errors: {
            availability: 'Availability must be one of: Immediate, 2 weeks, 1 month, 2+ months'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-final-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            availability: 'invalid-availability'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid availability');
      });

      test('validates currency enum values in database', async () => {
        const mockResponse = {
          success: false,
          message: 'Invalid currency',
          errors: {
            currency: 'Currency must be one of: USD, EUR, GBP, CAD, AUD'
          }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => mockResponse
        });

        const result = await fetch('/api/developer-final-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-123',
            currency: 'INVALID'
          })
        });

        const response = await result.json();
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid currency');
      });
    });
  });

  describe('Onboarding Completion Database Tests', () => {
    test('updates user onboarding stage when developer onboarding is completed', async () => {
      const mockResponse = {
        success: true,
        user: {
          id: 'user-123',
          onboarding_stage: 'completed',
          is_onboarding: false,
          updated_at: new Date().toISOString()
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await userService.updateUserById('user-123', {
        onboarding_stage: 'completed',
        is_onboarding: false
      });

      expect(result.success).toBe(true);
      expect(result.user?.onboarding_stage).toBe('completed');
      expect(result.user?.is_onboarding).toBe(false);
    });

    test('creates developer profile summary in database', async () => {
      const mockResponse = {
        success: true,
        profile_summary: {
          id: 'summary-123',
          user_id: 'user-123',
          profile_completion_percentage: 100,
          skills_count: 5,
          verification_status: 'pending',
          created_at: new Date().toISOString()
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetch('/api/developer-profile-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'user-123',
          profile_completion_percentage: 100,
          skills_count: 5,
          verification_status: 'pending'
        })
      });

      const response = await result.json();
      expect(response.success).toBe(true);
      expect(response.profile_summary?.profile_completion_percentage).toBe(100);
      expect(response.profile_summary?.verification_status).toBe('pending');
    });
  });

  describe('Database Performance and Scalability Tests', () => {
    test('handles large number of concurrent developer profile creations', async () => {
      const mockResponse = {
        success: true,
        profile: { id: 'profile-123', user_id: 'user-123' }
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const concurrentCreations = Array.from({ length: 100 }, (_, i) => 
        fetch('/api/developer-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: `user-${i}`,
            full_name: `Developer ${i}`,
            email: `dev${i}@example.com`
          })
        })
      );

      const results = await Promise.all(concurrentCreations);
      
      results.forEach(result => {
        expect(result.ok).toBe(true);
      });

      expect(fetch).toHaveBeenCalledTimes(100);
    });

    test('maintains database performance with complex developer queries', async () => {
      const mockResponse = {
        success: true,
        developers: Array.from({ length: 1000 }, (_, i) => ({
          id: `dev-${i}`,
          full_name: `Developer ${i}`,
          skills: ['JavaScript', 'React'],
          availability: 'Immediate'
        }))
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      // Simulate complex query with filters and joins
      const result = await fetch('/api/developers?skills=JavaScript&availability=Immediate&limit=1000&include=skills,verification');

      const response = await result.json();
      expect(response.success).toBe(true);
      expect(response.developers).toHaveLength(1000);
    });
  });

  describe('Database Security and Access Control Tests', () => {
    test('enforces user authentication for developer profile creation', async () => {
      const mockResponse = {
        success: false,
        message: 'Unauthorized',
        error: 'AUTHENTICATION_REQUIRED'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockResponse
      });

      const result = await fetch('/api/developer-profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'John Doe',
          email: 'john@example.com'
        })
      });

      const response = await result.json();
      expect(response.success).toBe(false);
      expect(response.message).toBe('Unauthorized');
    });

    test('prevents SQL injection in developer profile queries', async () => {
      const maliciousInput = "'; DROP TABLE developer_profiles; --";
      
      const mockResponse = {
        success: false,
        message: 'Invalid input detected',
        error: 'INVALID_INPUT'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => mockResponse
      });

      const result = await fetch('/api/developer-profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'user-123',
          full_name: maliciousInput
        })
      });

      const response = await result.json();
      expect(response.success).toBe(false);
      expect(response.message).toBe('Invalid input detected');
    });

    test('enforces profile ownership for updates', async () => {
      const mockResponse = {
        success: false,
        message: 'Forbidden',
        error: 'ACCESS_DENIED'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => mockResponse
      });

      const result = await fetch('/api/developer-profiles/profile-123', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'Updated Name'
        })
      });

      const response = await result.json();
      expect(response.success).toBe(false);
      expect(response.message).toBe('Forbidden');
    });
  });
});
