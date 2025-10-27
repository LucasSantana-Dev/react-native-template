# lint-staged Guide

lint-staged is a tool that runs linters on staged files in your Git repository. It ensures that only high-quality, properly formatted code is committed to your repository by running linting and formatting tools on the files you're about to commit.

## ⚙️ Configuration

### Main Configuration File

- **File**: `package.json` (in the `lint-staged` section)
- **Format**: JSON configuration

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"],
    "*.{ts,tsx}": ["tsc --noEmit"]
  }
}
```

## 🔧 Configuration Options Explained

### File Patterns

Specify which files to process based on file extensions or patterns.

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      // TypeScript and JavaScript files
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      // JSON and Markdown files
      "prettier --write"
    ],
    "*.{ts,tsx}": [
      // TypeScript files only
      "tsc --noEmit"
    ]
  }
}
```

### Command Execution

Commands are executed in the order they appear in the array.

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix", // 1. Fix ESLint issues
      "prettier --write", // 2. Format with Prettier
      "git add" // 3. Stage the changes
    ]
  }
}
```

## 🚀 Integration with Husky

### Pre-commit Hook

Set up lint-staged to run before each commit.

```bash
# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky init

# Add pre-commit hook
echo "npx lint-staged" > .husky/pre-commit
```

### Pre-push Hook

Set up lint-staged to run before each push.

```bash
# Add pre-push hook
echo "npm run type-check" > .husky/pre-push
```

## 💡 Best Practices

### 1. Command Order

Order commands logically: linting first, then formatting, then type checking.

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix", // Fix linting issues
      "prettier --write", // Format code
      "tsc --noEmit" // Check types
    ]
  }
}
```

### 2. Performance Optimization

Use specific file patterns to avoid processing unnecessary files.

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      // Only process source files
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      // Separate config for other files
      "prettier --write"
    ]
  }
}
```

### 3. Error Handling

Ensure commands fail fast on errors to prevent bad code from being committed.

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix --max-warnings 0", // Fail on warnings
      "prettier --write"
    ]
  }
}
```

## ⚠️ Troubleshooting Common Issues

### Commands Not Running

**Problem**: lint-staged commands are not executing.

**Solution**:

1. Check if Husky is properly installed and initialized
2. Verify the pre-commit hook is executable
3. Ensure lint-staged is installed as a dependency

```bash
# Check Husky installation
ls -la .husky/

# Make pre-commit hook executable
chmod +x .husky/pre-commit
```

### Slow Performance

**Problem**: lint-staged is running slowly.

**Solution**:

1. Use specific file patterns to limit scope
2. Run commands in parallel where possible
3. Exclude large directories from processing

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      // Limit to source files only
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### TypeScript Errors

**Problem**: TypeScript errors are not being caught.

**Solution**: Ensure TypeScript checking is included in the configuration.

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "tsc --noEmit" // Check types without emitting files
    ]
  }
}
```

## 🔧 Advanced Configuration

### Custom Commands

You can run custom scripts or commands as part of lint-staged.

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["npm run lint:fix", "npm run format", "npm run type-check"]
  }
}
```

### Conditional Execution

Use environment variables or conditions to control command execution.

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "if [ \"$NODE_ENV\" = \"production\" ]; then tsc --noEmit; fi"
    ]
  }
}
```

### Parallel Execution

Run multiple commands in parallel for better performance.

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

Remember: lint-staged is a tool to help maintain code quality. Use it as part of your development workflow to ensure all committed code meets your project's standards.
