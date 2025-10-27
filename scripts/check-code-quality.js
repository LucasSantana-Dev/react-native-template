#!/usr/bin/env node

/**
 * Code Quality Checker
 *
 * Checks file size limits (200 lines) and function complexity limits (12)
 * Provides detailed reporting and suggestions for improvement
 */

import { spawn } from 'child_process';
import { readFileSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';

// Configuration
const MAX_FILE_LINES = 200;
const MAX_COMPLEXITY = 12;
const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const EXCLUDE_DIRS = [
  'node_modules',
  '.expo',
  'android',
  'ios',
  'build',
  'dist',
  'coverage',
  '.git',
];

/**
 * Get all source files recursively
 */
function getSourceFiles(dir, files = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(item)) {
        getSourceFiles(fullPath, files);
      }
    } else if (SOURCE_EXTENSIONS.includes(extname(item))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Count lines in a file
 */
function countLines(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    return content.split('\n').length;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return 0;
  }
}

/**
 * Check file size limits
 */
function checkFileSizes(files) {
  console.log('\n📏 Checking file sizes...\n');

  const violations = [];

  for (const file of files) {
    const lineCount = countLines(file);

    if (lineCount > MAX_FILE_LINES) {
      violations.push({
        file,
        lines: lineCount,
        over: lineCount - MAX_FILE_LINES,
      });
    }
  }

  if (violations.length === 0) {
    console.log('✅ All files are within the 200-line limit');
  } else {
    console.log(`❌ ${violations.length} files exceed the 200-line limit:\n`);

    violations.forEach(({ file, lines, over }) => {
      console.log(`  ${file}`);
      console.log(`  Lines: ${lines} (${over} over limit)`);
      console.log(`  Suggestion: Consider splitting this file into smaller modules\n`);
    });
  }

  return violations.length;
}

/**
 * Check complexity using ESLint
 */
function checkComplexity(files) {
  console.log('\n🧠 Checking function complexity...\n');

  return new Promise(resolve => {
    try {
      // Run ESLint with complexity rule using spawn
      const child = spawn(
        'npx',
        [
          'eslint',
          '--format=json',
          `--rule=complexity: [error, { max: ${MAX_COMPLEXITY} }]`,
          ...files,
        ],
        {
          stdio: ['pipe', 'pipe', 'pipe'],
        },
      );

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', data => {
        output += data.toString();
      });

      child.stderr.on('data', data => {
        errorOutput += data.toString();
      });

      child.on('close', code => {
        try {
          if (code === 0) {
            console.log('✅ All functions are within the complexity limit of 12');
            resolve(0);
            return;
          }

          const result = JSON.parse(output);
          const complexityViolations = result.filter(file => file.messages.length > 0);

          if (complexityViolations.length === 0) {
            console.log('✅ All functions are within the complexity limit of 12');
          } else {
            console.log(
              `❌ ${complexityViolations.length} files have functions exceeding complexity limit:\n`,
            );

            complexityViolations.forEach(file => {
              console.log(`  ${file.filePath}`);
              file.messages.forEach(message => {
                if (message.ruleId === 'complexity') {
                  console.log(`    Line ${message.line}: ${message.message}`);
                  console.log(
                    `    Suggestion: Consider breaking this function into smaller, more focused functions\n`,
                  );
                }
              });
            });
          }

          resolve(complexityViolations.length);
        } catch (parseError) {
          console.error('Error parsing ESLint output:', parseError.message);
          console.error('Raw output:', output);
          resolve(0);
        }
      });
    } catch (error) {
      console.error('Error running complexity check:', error.message);
      resolve(0);
    }
  });
}

/**
 * Generate summary report
 */
function generateReport(fileViolations, complexityViolations) {
  console.log('\n📊 Code Quality Summary\n');
  console.log('='.repeat(50));
  console.log(`File Size Violations: ${fileViolations}`);
  console.log(`Complexity Violations: ${complexityViolations}`);
  console.log('='.repeat(50));

  if (fileViolations === 0 && complexityViolations === 0) {
    console.log('\n🎉 All code quality checks passed!');
    console.log('Your codebase maintains excellent quality standards.');
  } else {
    console.log('\n⚠️  Code quality issues detected.');
    console.log('Please review the suggestions above and refactor as needed.');
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Running Code Quality Checks\n');
  console.log(`File size limit: ${MAX_FILE_LINES} lines`);
  console.log(`Complexity limit: ${MAX_COMPLEXITY}`);
  console.log('='.repeat(50));

  try {
    // Get all source files
    const sourceFiles = getSourceFiles('.');
    console.log(`\nFound ${sourceFiles.length} source files to check\n`);

    // Check file sizes
    const fileViolations = checkFileSizes(sourceFiles);

    // Check complexity
    const complexityViolations = await checkComplexity(sourceFiles);

    // Generate report
    generateReport(fileViolations, complexityViolations);

    // Exit with error code if violations found
    if (fileViolations > 0 || complexityViolations > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during code quality check:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
