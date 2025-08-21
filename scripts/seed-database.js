#!/usr/bin/env node

const { DatabaseSeeder } = require('../dist/database/seeds/index.js');

async function main() {
  try {
    console.log('🌱 Starting database seeding...');
    await DatabaseSeeder.run();
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

main();
