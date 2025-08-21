import { AppDataSource } from '../../config/database';
import { Role } from '../../entities/Role';
import { RoleCategory } from '../../entities/RoleCategory';
import { RoleLevel } from '../../entities/RoleLevel';
import { OnboardingStage } from '../../entities/OnboardingStage';

export class EnhancedRoleSeeder {
  static async seed() {
    try {
      const roleRepository = AppDataSource.getRepository(Role);
      const categoryRepository = AppDataSource.getRepository(RoleCategory);
      const levelRepository = AppDataSource.getRepository(RoleLevel);
      const stageRepository = AppDataSource.getRepository(OnboardingStage);

      // Check if roles already exist
      const existingRoles = await roleRepository.count();
      if (existingRoles > 0) {
        console.log('Roles already seeded, skipping...');
        return;
      }

      // Create roles
      const roles = [
        {
          name: 'Client',
          description: 'I\'m an IT founder or HR looking to hire developers for my company or team.',
          buttonLabel: 'Hire Talent',
          icon: 'users',
          sortOrder: 1
        },
        {
          name: 'Service Provider',
          description: 'I\'m a developer who wants to list myself and get hired by startups and companies.',
          buttonLabel: 'List Myself',
          icon: 'user',
          sortOrder: 2
        },
        {
          name: 'Agency Owner',
          description: 'I run a team or agency and want to list my employees for outsourced projects.',
          buttonLabel: 'List My Team',
          icon: 'building',
          sortOrder: 3
        }
      ];

      const createdRoles = await roleRepository.save(roles);
      console.log('Roles seeded successfully');

      // Create role categories
      const categories = [
        // Client categories
        {
          name: 'Founder',
          description: 'Company founder or co-founder looking to build a team',
          roleId: createdRoles[0].id,
          sortOrder: 1,
          metadata: { companySize: '0-50', fundingStage: 'seed' }
        },
        {
          name: 'HR / Recruiter',
          description: 'Human resources professional responsible for hiring',
          roleId: createdRoles[0].id,
          sortOrder: 2,
          metadata: { companySize: '50+', fundingStage: 'established' }
        },
        {
          name: 'CTO',
          description: 'Chief Technology Officer managing technical team',
          roleId: createdRoles[0].id,
          sortOrder: 3,
          metadata: { companySize: '100+', fundingStage: 'series-a' }
        },

        // Service Provider categories
        {
          name: 'Developer',
          description: 'Software developer with technical skills',
          roleId: createdRoles[1].id,
          sortOrder: 1,
          metadata: { skills: ['Programming', 'Problem Solving', 'Technical'] }
        },
        {
          name: 'Designer',
          description: 'UI/UX designer focused on user experience',
          roleId: createdRoles[1].id,
          sortOrder: 2,
          metadata: { skills: ['Design', 'Creativity', 'User Research'] }
        },
        {
          name: 'Tester',
          description: 'Quality assurance and testing specialist',
          roleId: createdRoles[1].id,
          sortOrder: 3,
          metadata: { skills: ['Testing', 'Quality', 'Analytical'] }
        },

        // Agency categories
        {
          name: 'Web Development Agency',
          description: 'Specialized in custom web applications and websites',
          roleId: createdRoles[2].id,
          sortOrder: 1,
          metadata: { services: ['Web Development', 'E-commerce', 'CMS'] }
        },
        {
          name: 'Mobile App Agency',
          description: 'Focused on iOS and Android mobile applications',
          roleId: createdRoles[2].id,
          sortOrder: 2,
          metadata: { services: ['Mobile Apps', 'Cross-platform', 'Native'] }
        }
      ];

      const createdCategories = await categoryRepository.save(categories);
      console.log('Role categories seeded successfully');

      // Create role levels for Developer category
      const developerCategory = createdCategories.find(cat => cat.name === 'Developer');
      if (developerCategory) {
        const levels = [
          {
            name: 'Junior',
            description: 'Entry-level developer with 0-2 years of experience',
            roleCategoryId: developerCategory.id,
            sortOrder: 1,
            requirements: {
              experience: '0-2 years',
              skills: ['Basic programming', 'Version control', 'Team collaboration'],
              education: 'Computer Science degree or equivalent'
            }
          },
          {
            name: 'Mid',
            description: 'Developer with 3-7 years of experience',
            roleCategoryId: developerCategory.id,
            sortOrder: 2,
            requirements: {
              experience: '3-7 years',
              skills: ['Advanced programming', 'System design', 'Code review'],
              leadership: 'Mentoring junior developers'
            }
          },
          {
            name: 'Senior',
            description: 'Experienced developer with 8+ years of experience',
            roleCategoryId: developerCategory.id,
            sortOrder: 3,
            requirements: {
              experience: '8+ years',
              skills: ['Architecture design', 'Technical leadership', 'Project management'],
              leadership: 'Leading development teams'
            }
          },
          {
            name: 'Principal',
            description: 'Top-level developer with extensive experience and leadership',
            roleCategoryId: developerCategory.id,
            sortOrder: 4,
            requirements: {
              experience: '10+ years',
              skills: ['Strategic planning', 'Technical vision', 'Team building'],
              leadership: 'Leading multiple teams and projects'
            }
          }
        ];

        const createdLevels = await levelRepository.save(levels);
        console.log('Role levels seeded successfully');

        // Create onboarding stages for Junior Developer
        const juniorLevel = createdLevels.find(level => level.name === 'Junior');
        if (juniorLevel) {
          const stages = [
            {
              name: 'Profile Setup',
              description: 'Create your basic profile and personal information',
              roleLevelId: juniorLevel.id,
              sortOrder: 1,
              stageType: 'required',
              requirements: { completed: false },
              formFields: {
                fields: ['firstName', 'lastName', 'email', 'phone', 'location', 'bio']
              }
            },
            {
              name: 'Skills Assessment',
              description: 'Assess your technical skills and experience level',
              roleLevelId: juniorLevel.id,
              sortOrder: 2,
              stageType: 'required',
              requirements: { profileCompleted: true },
              formFields: {
                fields: ['programmingLanguages', 'frameworks', 'databases', 'tools', 'experience']
              }
            },
            {
              name: 'Portfolio Creation',
              description: 'Showcase your projects and work samples',
              roleLevelId: juniorLevel.id,
              sortOrder: 3,
              stageType: 'required',
              requirements: { skillsAssessed: true },
              formFields: {
                fields: ['projects', 'github', 'portfolio', 'resume']
              }
            },
            {
              name: 'Availability & Preferences',
              description: 'Set your availability and work preferences',
              roleLevelId: juniorLevel.id,
              sortOrder: 4,
              stageType: 'required',
              requirements: { portfolioCreated: true },
              formFields: {
                fields: ['availability', 'workType', 'rate', 'timezone', 'preferences']
              }
            },
            {
              name: 'Verification & Review',
              description: 'Complete identity verification and profile review',
              roleLevelId: juniorLevel.id,
              sortOrder: 5,
              stageType: 'required',
              requirements: { allStagesCompleted: true },
              formFields: {
                fields: ['identityVerification', 'skillVerification', 'backgroundCheck']
              }
            }
          ];

          // Set next/previous stage relationships
          stages.forEach((stage, index) => {
            if (index > 0) {
              stage.previousStage = stages[index - 1].id;
            }
            if (index < stages.length - 1) {
              stage.nextStage = stages[index + 1].id;
            }
          });

          await stageRepository.save(stages);
          console.log('Onboarding stages seeded successfully');
        }
      }

    } catch (error) {
      console.error('Error seeding enhanced roles:', error);
      throw error;
    }
  }
}
