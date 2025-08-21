import { AppDataSource } from '../../config/database';
import { EnhancedRoleSeeder } from './EnhancedRoleSeeder';

export class DatabaseSeeder {
  static async run() {
    try {
      console.log('Starting database seeding...');
      
      // Initialize database connection
      await AppDataSource.initialize();
      console.log('Database connection established');

      // Run seeders in order
      await EnhancedRoleSeeder.seed();
      
      console.log('Database seeding completed successfully');
      
      // Close connection
      await AppDataSource.destroy();
      console.log('Database connection closed');
      
    } catch (error) {
      console.error('Error during database seeding:', error);
      throw error;
    }
  }
}

// Run seeder if this file is executed directly
if (require.main === module) {
  DatabaseSeeder.run()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
