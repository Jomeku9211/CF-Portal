#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.testTypes = {
      unit: 'Unit Tests',
      integration: 'Integration Tests', 
      comprehensive: 'Comprehensive Tests',
      accessibility: 'Accessibility Tests',
      performance: 'Performance Tests',
      all: 'All Tests'
    };
    
    this.results = {};
    this.startTime = Date.now();
  }

  /**
   * Main entry point
   */
  async run() {
    console.log('🚀 CF Portal Test Runner');
    console.log('========================\n');

    const args = process.argv.slice(2);
    const testType = args[0] || 'all';
    const options = this.parseOptions(args.slice(1));

    if (!this.testTypes[testType]) {
      console.error(`❌ Unknown test type: ${testType}`);
      console.log(`Available types: ${Object.keys(this.testTypes).join(', ')}`);
      process.exit(1);
    }

    console.log(`🎯 Running: ${this.testTypes[testType]}\n`);

    try {
      await this.executeTests(testType, options);
      this.generateReport();
      this.exitWithCode();
    } catch (error) {
      console.error('❌ Test execution failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Parse command line options
   */
  parseOptions(args) {
    const options = {
      watch: false,
      coverage: true,
      verbose: false,
      bail: false,
      maxWorkers: '50%'
    };

    args.forEach(arg => {
      switch (arg) {
        case '--watch':
          options.watch = true;
          break;
        case '--no-coverage':
          options.coverage = false;
          break;
        case '--verbose':
          options.verbose = true;
          break;
        case '--bail':
          options.bail = true;
          break;
        case '--max-workers':
          const workerIndex = args.indexOf(arg);
          if (workerIndex + 1 < args.length) {
            options.maxWorkers = args[workerIndex + 1];
          }
          break;
      }
    });

    return options;
  }

  /**
   * Execute tests based on type
   */
  async executeTests(testType, options) {
    const commands = this.buildTestCommands(testType, options);
    
    for (const [name, command] of Object.entries(commands)) {
      console.log(`📋 Executing: ${name}`);
      console.log(`Command: ${command.join(' ')}\n`);
      
      const result = await this.runCommand(command, name);
      this.results[name] = result;
      
      if (result.exitCode !== 0 && options.bail) {
        throw new Error(`${name} failed with exit code ${result.exitCode}`);
      }
      
      console.log(`✅ ${name} completed (${result.duration}ms)\n`);
    }
  }

  /**
   * Build test commands based on type
   */
  buildTestCommands(testType, options) {
    const baseCommand = ['npm', 'test'];
    const coverageFlag = options.coverage ? '--coverage' : '';
    const watchFlag = options.watch ? '--watch' : '';
    const verboseFlag = options.verbose ? '--verbose' : '';
    const maxWorkersFlag = `--maxWorkers=${options.maxWorkers}`;

    const commands = {};

    switch (testType) {
      case 'unit':
        commands['Unit Tests'] = [
          ...baseCommand,
          '--testPathPattern=src/__tests__',
          '--testPathIgnorePatterns=comprehensive|integration',
          coverageFlag,
          watchFlag,
          verboseFlag,
          maxWorkersFlag
        ].filter(Boolean);
        break;

      case 'integration':
        commands['Integration Tests'] = [
          ...baseCommand,
          '--testPathPattern=src/__tests__/Components|src/__tests__/services',
          coverageFlag,
          watchFlag,
          verboseFlag,
          maxWorkersFlag
        ].filter(Boolean);
        break;

      case 'comprehensive':
        commands['Comprehensive Tests'] = [
          ...baseCommand,
          '--testPathPattern=src/__tests__/comprehensive',
          coverageFlag,
          watchFlag,
          verboseFlag,
          '--maxWorkers=1'
        ].filter(Boolean);
        break;

      case 'accessibility':
        commands['Accessibility Tests'] = [
          ...baseCommand,
          '--testNamePattern="Accessibility|accessibility"',
          coverageFlag,
          watchFlag,
          verboseFlag,
          maxWorkersFlag
        ].filter(Boolean);
        break;

      case 'performance':
        commands['Performance Tests'] = [
          ...baseCommand,
          '--testNamePattern="Performance|performance"',
          coverageFlag,
          watchFlag,
          verboseFlag,
          maxWorkersFlag
        ].filter(Boolean);
        break;

      case 'all':
        commands['All Tests'] = [
          ...baseCommand,
          coverageFlag,
          watchFlag,
          verboseFlag,
          maxWorkersFlag
        ].filter(Boolean);
        break;
    }

    return commands;
  }

  /**
   * Run a single command
   */
  runCommand(command, name) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const child = spawn(command[0], command.slice(1), {
        stdio: 'pipe',
        shell: true
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
        process.stdout.write(data);
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(data);
      });

      child.on('close', (exitCode) => {
        const duration = Date.now() - startTime;
        
        resolve({
          name,
          command: command.join(' '),
          exitCode,
          duration,
          stdout,
          stderr,
          success: exitCode === 0
        });
      });

      child.on('error', (error) => {
        const duration = Date.now() - startTime;
        
        resolve({
          name,
          command: command.join(' '),
          exitCode: 1,
          duration,
          stdout: '',
          stderr: error.message,
          success: false,
          error: error.message
        });
      });
    });
  }

  /**
   * Generate test execution report
   */
  generateReport() {
    const totalDuration = Date.now() - this.startTime;
    const totalTests = Object.keys(this.results).length;
    const passedTests = Object.values(this.results).filter(r => r.success).length;
    const failedTests = totalTests - passedTests;

    console.log('\n📊 Test Execution Report');
    console.log('========================');

    console.log(`\n🎯 Summary:`);
    console.log(`  • Total Test Suites: ${totalTests}`);
    console.log(`  • Passed: ${passedTests}`);
    console.log(`  • Failed: ${failedTests}`);
    console.log(`  • Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    console.log(`  • Total Duration: ${totalDuration}ms`);

    console.log(`\n📋 Detailed Results:`);
    Object.values(this.results).forEach(result => {
      const status = result.success ? '✅' : '❌';
      const duration = result.duration;
      console.log(`  ${status} ${result.name} (${duration}ms)`);
      
      if (!result.success) {
        console.log(`    Exit Code: ${result.exitCode}`);
        if (result.error) {
          console.log(`    Error: ${result.error}`);
        }
      }
    });

    // Coverage information
    if (this.hasCoverage()) {
      console.log(`\n📈 Coverage:`);
      console.log(`  • HTML Report: ./coverage/html-report/report.html`);
      console.log(`  • LCOV Report: ./coverage/lcov.info`);
    }

    // Recommendations
    console.log(`\n🎯 Recommendations:`);
    if (failedTests === 0) {
      console.log(`  • All tests passed successfully! 🎉`);
    } else {
      console.log(`  • Review failed test suites`);
      console.log(`  • Check test output for specific errors`);
      console.log(`  • Verify test environment setup`);
    }

    if (totalDuration > 60000) {
      console.log(`  • Consider optimizing test performance (took ${Math.round(totalDuration / 1000)}s)`);
    }
  }

  /**
   * Check if coverage reports were generated
   */
  hasCoverage() {
    const coverageDir = path.join(process.cwd(), 'coverage');
    return fs.existsSync(coverageDir);
  }

  /**
   * Exit with appropriate code
   */
  exitWithCode() {
    const hasFailures = Object.values(this.results).some(r => !r.success);
    process.exit(hasFailures ? 1 : 0);
  }
}

// Run the test runner
if (require.main === module) {
  const runner = new TestRunner();
  runner.run().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = TestRunner;
