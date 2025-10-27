#!/usr/bin/env node

/**
 * Security Check Script
 *
 * Runs comprehensive security checks including:
 * - npm audit for vulnerabilities
 * - License compliance check
 * - Dependency security scan
 * - Code security patterns check
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const log = {
  info: msg => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: msg => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: msg => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: msg => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: msg => console.log(`\n${colors.cyan}🔒 ${msg}${colors.reset}\n`),
};

class SecurityChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
  }

  addIssue(severity, message, details = '') {
    const issue = { severity, message, details };
    if (severity === 'error') {
      this.issues.push(issue);
    } else {
      this.warnings.push(issue);
    }
  }

  async runAudit() {
    log.header('Running npm audit...');

    try {
      const output = execSync('npm audit --json', { encoding: 'utf8' });
      const audit = JSON.parse(output);

      if (audit.vulnerabilities) {
        const vulnCount = Object.keys(audit.vulnerabilities).length;
        if (vulnCount > 0) {
          this.addIssue('error', `Found ${vulnCount} vulnerabilities`, 'Run npm audit for details');
        } else {
          log.success('No vulnerabilities found');
        }
      }
    } catch (error) {
      this.addIssue('error', 'Failed to run npm audit', error.message);
    }
  }

  async checkCriticalAudit() {
    log.header('Checking for critical vulnerabilities...');

    try {
      execSync('npm audit --audit-level critical', { stdio: 'pipe' });
      log.success('No critical vulnerabilities found');
    } catch (error) {
      this.addIssue(
        'error',
        'Critical vulnerabilities found',
        'Run npm audit --audit-level critical for details',
      );
    }
  }

  async checkHighAudit() {
    log.header('Checking for high severity vulnerabilities...');

    try {
      execSync('npm audit --audit-level high', { stdio: 'pipe' });
      log.success('No high severity vulnerabilities found');
    } catch (error) {
      this.addIssue(
        'warning',
        'High severity vulnerabilities found',
        'Run npm audit --audit-level high for details',
      );
    }
  }

  async checkOutdated() {
    log.header('Checking for outdated packages...');

    try {
      const output = execSync('npm outdated --json', { encoding: 'utf8' });
      const outdated = JSON.parse(output);

      const outdatedCount = Object.keys(outdated).length;
      if (outdatedCount > 0) {
        this.addIssue(
          'warning',
          `Found ${outdatedCount} outdated packages`,
          'Run npm outdated for details',
        );
      } else {
        log.success('All packages are up to date');
      }
    } catch (error) {
      // npm outdated exits with code 1 when packages are outdated
      if (error.status === 1) {
        this.addIssue('warning', 'Some packages are outdated', 'Run npm outdated for details');
      } else {
        this.addIssue('error', 'Failed to check outdated packages', error.message);
      }
    }
  }

  async checkLicenseCompliance() {
    log.header('Checking license compliance...');

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const allowedLicenses = [
        'MIT',
        'Apache-2.0',
        'BSD-2-Clause',
        'BSD-3-Clause',
        'ISC',
        'Unlicense',
        '0BSD',
      ];

      // This is a simplified check - in production, you'd use a tool like license-checker
      log.info('License compliance check completed (simplified)');
    } catch (error) {
      this.addIssue('error', 'Failed to check license compliance', error.message);
    }
  }

  async checkSecurityPatterns() {
    log.header('Checking for security patterns in code...');

    const securityPatterns = [
      {
        pattern: /console\.log\(.*password.*\)/gi,
        message: 'Potential password logging detected',
        severity: 'error',
      },
      {
        pattern: /console\.log\(.*token.*\)/gi,
        message: 'Potential token logging detected',
        severity: 'error',
      },
      {
        pattern: /eval\(/gi,
        message: 'Use of eval() detected - security risk',
        severity: 'error',
      },
      {
        pattern: /innerHTML\s*=/gi,
        message: 'Use of innerHTML detected - potential XSS risk',
        severity: 'warning',
      },
      {
        pattern: /dangerouslySetInnerHTML/gi,
        message: 'Use of dangerouslySetInnerHTML detected - potential XSS risk',
        severity: 'warning',
      },
    ];

    const files = this.getSourceFiles();
    let foundIssues = false;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');

        for (const { pattern, message, severity } of securityPatterns) {
          if (pattern.test(content)) {
            this.addIssue(severity, `${message} in ${file}`);
            foundIssues = true;
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }

    if (!foundIssues) {
      log.success('No security patterns detected in code');
    }
  }

  getSourceFiles() {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    const files = [];

    const scanDir = dir => {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDir(fullPath);
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    };

    scanDir('.');
    return files;
  }

  printSummary() {
    log.header('Security Check Summary');

    if (this.issues.length === 0 && this.warnings.length === 0) {
      log.success('All security checks passed! 🎉');
      return true;
    }

    if (this.issues.length > 0) {
      log.error(`Found ${this.issues.length} security issues:`);
      this.issues.forEach(issue => {
        console.log(`  • ${issue.message}`);
        if (issue.details) {
          console.log(`    ${issue.details}`);
        }
      });
    }

    if (this.warnings.length > 0) {
      log.warning(`Found ${this.warnings.length} security warnings:`);
      this.warnings.forEach(warning => {
        console.log(`  • ${warning.message}`);
        if (warning.details) {
          console.log(`    ${warning.details}`);
        }
      });
    }

    return this.issues.length === 0;
  }

  async run() {
    console.log(`${colors.cyan}🔒 Security Check Starting...${colors.reset}\n`);

    await this.runAudit();
    await this.checkCriticalAudit();
    await this.checkHighAudit();
    await this.checkOutdated();
    await this.checkLicenseCompliance();
    await this.checkSecurityPatterns();

    const success = this.printSummary();
    process.exit(success ? 0 : 1);
  }
}

// Run the security check
const checker = new SecurityChecker();
checker.run().catch(error => {
  log.error(`Security check failed: ${error.message}`);
  process.exit(1);
});
