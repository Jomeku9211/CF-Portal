import { AppDataSource } from '../../config/database';
import { Role } from '../../entities/Role';
import { RoleCategory } from '../../entities/RoleCategory';

export class RoleSeeder {
  static async seed() {
    try {
      const roleRepository = AppDataSource.getRepository(Role);
      const categoryRepository = AppDataSource.getRepository(RoleCategory);

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
          name: 'Startup',
          description: 'Early-stage company looking to scale',
          roleId: createdRoles[0].id,
          sortOrder: 1,
          metadata: { companySize: '0-50', fundingStage: 'seed' }
        },
        {
          name: 'Scaleup',
          description: 'Growing company with established product-market fit',
          roleId: createdRoles[0].id,
          sortOrder: 2,
          metadata: { companySize: '50-500', fundingStage: 'series-a' }
        },
        {
          name: 'Enterprise',
          description: 'Large established company',
          roleId: createdRoles[0].id,
          sortOrder: 3,
          metadata: { companySize: '500+', fundingStage: 'public' }
        },

        // Service Provider categories
        {
          name: 'Frontend Developer',
          description: 'Specialized in React, Vue, Angular, and modern web technologies',
          roleId: createdRoles[1].id,
          sortOrder: 1,
          metadata: { skills: ['React', 'Vue', 'Angular', 'TypeScript'] }
        },
        {
          name: 'Backend Developer',
          description: 'Expert in Node.js, Python, Java, and database systems',
          roleId: createdRoles[1].id,
          sortOrder: 2,
          metadata: { skills: ['Node.js', 'Python', 'Java', 'PostgreSQL'] }
        },
        {
          name: 'Full Stack Developer',
          description: 'Versatile developer covering both frontend and backend',
          roleId: createdRoles[1].id,
          sortOrder: 3,
          metadata: { skills: ['Full Stack', 'DevOps', 'Cloud'] }
        },
        {
          name: 'Mobile Developer',
          description: 'Specialized in iOS and Android development',
          roleId: createdRoles[1].id,
          sortOrder: 4,
          metadata: { skills: ['React Native', 'Flutter', 'iOS', 'Android'] }
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
        },
        {
          name: 'Digital Marketing Agency',
          description: 'Specialized in SEO, PPC, and digital marketing services',
          roleId: createdRoles[2].id,
          sortOrder: 3,
          metadata: { services: ['SEO', 'PPC', 'Social Media', 'Content'] }
        },
        {
          name: 'UI/UX Design Agency',
          description: 'Focused on user experience and interface design',
          roleId: createdRoles[2].id,
          sortOrder: 4,
          metadata: { services: ['UI Design', 'UX Research', 'Prototyping'] }
        }
      ];

      await categoryRepository.save(categories);
      console.log('Role categories seeded successfully');

    } catch (error) {
      console.error('Error seeding roles and categories:', error);
      throw error;
    }
  }
}
