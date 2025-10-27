# Prettier Guide

Prettier is an opinionated code formatter that enforces a consistent code style across your project. It automatically formats your code according to predefined rules, eliminating debates about code style and ensuring consistency across the entire codebase. This guide explains the Prettier setup in this template and how to use it effectively.

## ⚙️ Configuration

### Main Configuration File

- **File**: `.prettierrc.json`
- **Format**: JSON configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve"
}
```

### Ignore File

- **File**: `.prettierignore`
- **Purpose**: Exclude files and directories from formatting

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
build/
dist/
.expo/
web-build/

# Native builds
ios/
android/

# Generated files
*.generated.*
*.d.ts

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env.local
.env.production

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

## 🔧 Configuration Options Explained

### Basic Formatting

#### `semi: true`

Always add semicolons at the end of statements.

```typescript
// ❌ Bad
const name = 'John';
const age = 30;

// ✅ Good
const name = 'John';
const age = 30;
```

#### `singleQuote: true`

Use single quotes instead of double quotes for strings.

```typescript
// ❌ Bad
const message = 'Hello, world!';
const template = `User: ${name}`;

// ✅ Good
const message = 'Hello, world!';
const template = `User: ${name}`;
```

#### `printWidth: 80`

Wrap lines that exceed 80 characters.

```typescript
// ❌ Bad - Line too long
const veryLongVariableName = someVeryLongFunctionCall(
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5
);

// ✅ Good - Wrapped at 80 characters
const veryLongVariableName = someVeryLongFunctionCall(
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5
);
```

#### `tabWidth: 2`

Use 2 spaces for indentation.

```typescript
// ❌ Bad - 4 spaces
function myFunction() {
  const value = 1;
  return value;
}

// ✅ Good - 2 spaces
function myFunction() {
  const value = 1;
  return value;
}
```

#### `useTabs: false`

Use spaces instead of tabs for indentation.

```typescript
// ❌ Bad - Tabs
function myFunction() {
→   const value = 1;
→   return value;
}

// ✅ Good - Spaces
function myFunction() {
  const value = 1;
  return value;
}
```

### Object and Array Formatting

#### `trailingComma: "es5"`

Add trailing commas where valid in ES5 (objects, arrays, etc.).

```typescript
// ❌ Bad
const obj = {
  name: 'John',
  age: 30,
};

const arr = ['item1', 'item2'];

// ✅ Good
const obj = {
  name: 'John',
  age: 30,
};

const arr = ['item1', 'item2'];
```

#### `bracketSpacing: true`

Add spaces inside object brackets.

```typescript
// ❌ Bad
const obj = { name: 'John', age: 30 };

// ✅ Good
const obj = { name: 'John', age: 30 };
```

#### `bracketSameLine: false`

Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.

```typescript
// ❌ Bad
<Button
  variant="primary"
  size="large"
  onPress={handlePress}
>
  Click me
</Button>

// ✅ Good
<Button
  variant="primary"
  size="large"
  onPress={handlePress}
>
  Click me
</Button>
```

### Function Formatting

#### `arrowParens: "avoid"`

Omit parentheses when possible for arrow functions.

```typescript
// ❌ Bad
const double = (x) => x * 2;
const add = (a, b) => a + b;

// ✅ Good
const double = (x) => x * 2;
const add = (a, b) => a + b; // Parentheses required for multiple parameters
```

### Line Endings

#### `endOfLine: "lf"`

Use LF (Line Feed) characters for line endings, which is the standard for Unix/Linux/macOS.

```typescript
// ❌ Bad - CRLF (Windows style)
const message = 'Hello, world!\r\n';

// ✅ Good - LF (Unix style)
const message = 'Hello, world!\n';
```

### JSX Formatting

#### `jsxSingleQuote: true`

Use single quotes in JSX attributes.

```typescript
// ❌ Bad
<Button title="Click me" style={{ color: "red" }} />

// ✅ Good
<Button title='Click me' style={{ color: 'red' }} />
```

#### `quoteProps: "as-needed"`

Only add quotes around object properties where needed.

```typescript
// ❌ Bad
const obj = {
  name: 'John',
  age: 30,
  'is-active': true,
};

// ✅ Good
const obj = {
  name: 'John',
  age: 30,
  'is-active': true, // Quotes needed for hyphenated property
};
```

## 🚀 Integration with Development Workflow

### VS Code

1. Install Prettier extension
2. Add to `settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  }
}
```

### WebStorm

1. Enable Prettier in Settings > Languages & Frameworks > JavaScript > Prettier
2. Check "On 'Reformat Code' action" and "On save"

### Pre-commit Hooks (via lint-staged)

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,json,md}": ["prettier --write"],
    "*.{ts,tsx,js,jsx}": ["eslint --fix"]
  }
}
```

## 📝 Best Practices

### 1. Consistent Code Style

Prettier automatically enforces consistent code style, eliminating style debates and ensuring all team members write code in the same format.

```typescript
// Before Prettier - Inconsistent style
const user = { name: 'John', age: 30, isActive: true };
const users = ['Alice', 'Bob', 'Charlie'];

// After Prettier - Consistent style
const user = { name: 'John', age: 30, isActive: true };
const users = ['Alice', 'Bob', 'Charlie'];
```

### 2. Automatic Formatting

Set up your editor to format code automatically on save, ensuring consistent formatting without manual intervention.

```typescript
// VS Code settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 3. Integration with ESLint

Use Prettier alongside ESLint for comprehensive code quality. Prettier handles formatting, while ESLint handles code quality and best practices.

```json
// .eslintrc.js
{
  "extends": [
    "eslint:recommended",
    "prettier" // Disables ESLint rules that conflict with Prettier
  ]
}
```

### 4. Pre-commit Hooks

Use pre-commit hooks to ensure all committed code is properly formatted.

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,json,md}": ["prettier --write"],
    "*.{ts,tsx,js,jsx}": ["eslint --fix"]
  }
}
```

## ⚠️ Troubleshooting Common Issues

### Prettier Conflicts with ESLint

**Problem**: Prettier and ESLint have conflicting rules, causing formatting issues.

**Solution**: Use `eslint-config-prettier` to disable ESLint rules that conflict with Prettier.

```bash
npm install --save-dev eslint-config-prettier
```

```javascript
// eslint.config.js
export default [
  // ... other configs
  ...fixupConfigRules(pluginPrettier.configs.recommended), // Must be last
];
```

### Inconsistent Line Endings

**Problem**: Different line endings (LF vs CRLF) causing issues across different operating systems.

**Solution**: Configure Prettier to use consistent line endings and add a `.gitattributes` file.

```json
// .prettierrc.json
{
  "endOfLine": "lf"
}
```

```gitattributes
# .gitattributes
* text=auto eol=lf
```

### Large File Formatting

**Problem**: Prettier takes too long to format large files.

**Solution**: Add large files to `.prettierignore` or split them into smaller files.

```gitignore
# .prettierignore
large-generated-file.js
```

### JSX Formatting Issues

**Problem**: JSX elements not formatting correctly.

**Solution**: Ensure you have the correct Prettier configuration for JSX and that your file has the correct extension (`.tsx` for TypeScript JSX).

```typescript
// Ensure file is named .tsx for TypeScript JSX
// components/MyComponent.tsx
export const MyComponent = () => {
  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
};
```

## 🔧 Advanced Configuration

### Custom Prettier Plugins

You can extend Prettier with plugins for additional language support.

```bash
npm install --save-dev @prettier/plugin-xml
```

```json
// .prettierrc.json
{
  "plugins": ["@prettier/plugin-xml"],
  "overrides": [
    {
      "files": "*.xml",
      "options": {
        "parser": "xml"
      }
    }
  ]
}
```

### File-Specific Configuration

Override Prettier settings for specific file types.

```json
// .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

### Integration with Other Tools

Prettier can be integrated with various build tools and CI/CD pipelines.

```yaml
# GitHub Actions
name: Format Check
on: [push, pull_request]
jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Check formatting
        run: npm run format:check
```

## 📊 Performance Considerations

### Large Codebases

For large codebases, consider:

1. **Incremental formatting**: Only format changed files
2. **Parallel processing**: Use tools like `prettier --write .` with parallel processing
3. **Selective formatting**: Use `.prettierignore` to exclude generated files

```bash
# Format only staged files
npx lint-staged

# Format specific files
npx prettier --write "src/**/*.{ts,tsx}"

# Check formatting without writing
npx prettier --check "src/**/*.{ts,tsx}"
```

### CI/CD Integration

Include Prettier checks in your CI/CD pipeline to ensure all code is properly formatted.

```yaml
# .github/workflows/format.yml
name: Format Check
on: [push, pull_request]
jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Check formatting
        run: npm run format:check
      - name: Format code
        run: npm run format:write
```

Remember: Prettier is a tool to help you maintain consistent code style. Use it as part of your development workflow to ensure all code is properly formatted and readable.
