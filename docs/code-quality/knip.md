# Knip Guide

Knip is a powerful tool that finds unused files, dependencies, and exports in
your JavaScript/TypeScript project. It helps keep your codebase clean by
identifying dead code and unused dependencies, which can reduce bundle size and
improve maintainability.

## ⚙️ Configuration

### Main Configuration File

- **File**: `knip.json`
- **Format**: JSON configuration

```json
{
  "entry": ["App.tsx", "app/**/*.tsx", "index.js"],
  "project": ["**/*.{ts,tsx,js,jsx}"],
  "ignore": [
    "**/*.d.ts",
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.expo/**",
    "**/ios/**",
    "**/android/**"
  ],
  "ignoreDependencies": ["react-native", "expo", "@expo/vector-icons"],
  "ignoreExportsUsedInFile": true,
  "includeEntryExports": true,
  "workspace": false
}
```

## 🔧 Configuration Options Explained

### `entry`

Specifies the entry points of your application. Knip uses these to determine
what code is actually used.

```json
{
  "entry": [
    "App.tsx", // Main app entry point
    "app/**/*.tsx", // All app screens
    "index.js" // Additional entry points
  ]
}
```

### `project`

Defines which files are part of your project and should be analyzed.

```json
{
  "project": [
    "**/*.{ts,tsx,js,jsx}", // All TypeScript and JavaScript files
    "components/**/*", // Component files
    "lib/**/*" // Library files
  ]
}
```

### `ignore`

Files and directories to exclude from analysis.

```json
{
  "ignore": [
    "**/*.d.ts", // TypeScript declaration files
    "**/node_modules/**", // Dependencies
    "**/dist/**", // Build output
    "**/build/**", // Build output
    "**/.expo/**", // Expo cache
    "**/ios/**", // iOS native code
    "**/android/**" // Android native code
  ]
}
```

### `ignoreDependencies`

Dependencies to exclude from unused dependency checks.

```json
{
  "ignoreDependencies": [
    "react-native", // Core React Native
    "expo", // Expo SDK
    "@expo/vector-icons" // Icon library
  ]
}
```

## 🚀 Usage

### Basic Commands

```bash
# Check for unused files, dependencies, and exports
npm run depcheck

# Check with more detailed output
npx knip --reporter json

# Fix issues automatically (where possible)
npx knip --fix
```

### Integration with CI/CD

```yaml
# .github/workflows/knip.yml
name: Dead Code Check
on: [push, pull_request]
jobs:
  knip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run Knip
        run: npm run depcheck
```

## 💡 Best Practices

### 1. Regular Cleanup

Run Knip regularly to identify and remove unused code.

```bash
# Add to package.json scripts
{
  "scripts": {
    "depcheck": "knip",
    "depcheck:fix": "knip --fix"
  }
}
```

### 2. Ignore False Positives

Some files might be used in ways Knip can't detect (e.g., dynamic imports,
configuration files).

```json
{
  "ignore": [
    "**/config/**", // Configuration files
    "**/migrations/**", // Database migrations
    "**/seeds/**" // Database seeds
  ]
}
```

### 3. Entry Point Configuration

Ensure all entry points are properly configured to avoid false positives.

```json
{
  "entry": [
    "App.tsx",
    "app/**/*.tsx",
    "components/**/*.tsx", // If components are used directly
    "lib/**/*.ts" // If utilities are used directly
  ]
}
```

## ⚠️ Troubleshooting Common Issues

### False Positives

**Problem**: Knip reports files as unused when they are actually used.

**Solution**:

1. Check if the file is properly imported
2. Add to `ignore` if it's used in a way Knip can't detect
3. Verify entry points are correctly configured

### Missing Dependencies

**Problem**: Knip reports dependencies as unused when they are actually used.

**Solution**:

1. Check if the dependency is used in entry points
2. Add to `ignoreDependencies` if it's used in ways Knip can't detect
3. Verify the dependency is properly installed

### Dynamic Imports

**Problem**: Files imported dynamically are reported as unused.

**Solution**: Add dynamic import patterns to the ignore list or use comments to
indicate usage.

```typescript
// This file is used via dynamic import
// @knip-ignore
export const MyComponent = () => <div>Hello</div>;
```

Remember: Knip is a tool to help keep your codebase clean. Use it regularly to
identify and remove unused code, but always verify before deleting files or
dependencies.
