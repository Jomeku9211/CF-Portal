#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Test categories and their corresponding directories
const TEST_CATEGORIES = {
  unit: 'tests/unit',
  integration: 'tests/integration',
  api: 'tests/api',
  auth: 'tests/auth',
  db: 'tests/db',
  ui: 'tests/ui',
  e2e: 'tests/e2e',
  smoke: 'tests/smoke',
  regression: 'tests/regression',
  performance: 'tests/performance',
  security: 'tests/security',
  'super-admin': 'tests/unit/super_admin',
  client: 'tests/unit/client',
  'service-provider': 'tests/unit/service_provider',
  agency: 'tests/unit/agency'
};

// Test scenarios
const TEST_SCENARIOS = {
  quick: ['unit', 'ui'],
  comprehensive: ['unit', 'integration', 'api', 'auth', 'db', 'ui'],
  full: Object.keys(TEST_CATEGORIES),
  ci: ['unit', 'integration', 'api', 'auth', 'db', 'ui', 'smoke'],
  'pre-deploy': ['unit', 'integration', 'api', 'auth', 'db', 'ui', 'smoke', 'regression']
};

function runTests(testPaths, options = {}) {
  const args = [
    '--testPathPattern',
    testPaths.join('|'),
    '--verbose'
  ];

  if (options.coverage) {
    args.push('--coverage');
  }

  if (options.watch) {
    args.push('--watch');
  }

  if (options.maxWorkers) {
    args.push('--maxWorkers', options.maxWorkers.toString());
  }

  console.log(`Running tests for: ${testPaths.join(', ')}`);
  console.log(`Command: npx jest ${args.join(' ')}`);

  const jestProcess = spawn('npx', ['jest', ...args], {
    stdio: 'inherit',
    shell: true
  });

  jestProcess.on('close', (code) => {
    process.exit(code);
  });
}

function showHelp() {
  console.log(`
Test Runner for CF Portal

Usage: node scripts/test-runner.js <category|scenario> [options]

Categories:
${Object.keys(TEST_CATEGORIES).map(cat => `  ${cat}`).join('\n')}

Scenarios:
${Object.keys(TEST_SCENARIOS).map(scenario => `  ${scenario}`).join('\n')}

Options:
  --coverage    Run with coverage reporting
  --watch       Run in watch mode
  --maxWorkers  Set maximum number of workers (default: auto)

Examples:
  node scripts/test-runner.js unit
  node scripts/test-runner.js quick --coverage
  node scripts/test-runner.js comprehensive --watch
  node scripts/test-runner.js ci --maxWorkers 2
`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const category = args[0];
  const options = {
    coverage: args.includes('--coverage'),
    watch: args.includes('--watch'),
    maxWorkers: args.includes('--maxWorkers') ? 
      parseInt(args[args.indexOf('--maxWorkers') + 1]) : undefined
  };

  let testPaths = [];

  if (TEST_CATEGORIES[category]) {
    testPaths = [TEST_CATEGORIES[category]];
  } else if (TEST_SCENARIOS[category]) {
    testPaths = TEST_SCENARIOS[category].map(cat => TEST_CATEGORIES[cat]);
  } else {
    console.error(`Unknown category or scenario: ${category}`);
    console.log('Use --help to see available options');
    process.exit(1);
  }

  runTests(testPaths, options);
}

if (require.main === module) {
  main();
}

module.exports = { runTests, TEST_CATEGORIES, TEST_SCENARIOS };
