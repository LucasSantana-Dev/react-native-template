# ESLint Guide

ESLint is a powerful static analysis tool that helps identify and report problematic patterns found in JavaScript/TypeScript code. It enforces coding standards, catches common errors, and ensures code consistency across your project. This guide explains the ESLint setup in this template, its key rules, and how to use it effectively.

## ⚙️ Configuration

### Main Configuration File

- **File**: `eslint.config.js`
- **Format**: Flat config (ESLint 9+)

```javascript
// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import { fixupConfigRules } from '@eslint/compat';

export default [
  {
    // Global ignores
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/ios/',
      '**/android/',
      '**/.expo/',
      '**/*.mjs',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // General configuration for all files
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-native': pluginReactNative,
      import: pluginImport,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // General JS/TS rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
      'prefer-const': 'error',
      'no-debugger': 'error',

      // Import rules
      'import/order': 'error',
      'import/no-unused-modules': 'error',

      // Code quality
      complexity: ['error', { max: 12 }],
      'max-lines-per-function': ['error', { max: 100 }],
      'max-lines': ['error', { max: 200 }],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed with new React JSX transform
      'react/prop-types': 'off', // Handled by TypeScript
      'react/display-name': 'off', // Allow anonymous functions

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Native rules
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': ['error', { skip: ['TranslatableText'] }],
    },
  },

  // Jest configuration
  {
    files: [
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      'jest.setup.js',
      'jest.setup.after.js',
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        global: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        window: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' in tests for flexibility
      '@typescript-eslint/no-non-null-assertion': 'off', // Allow non-null assertions in tests
    },
  },
  // Prettier integration (must be last)
  ...fixupConfigRules(pluginPrettier.configs.recommended),
];
```

## 🔑 Key Rules Explained

### General Rules

#### `no-console`

Warns against `console.log` statements, encouraging proper logging or removal in production.

```typescript
// ❌ Bad
console.log('Debug info');

// ✅ Good
console.warn('Something went wrong');
console.error('Critical error');
```

#### `prefer-const`

Enforces the use of `const` for variables that are never reassigned.

```typescript
// ❌ Bad
let name = 'John';
name = 'Doe'; // This is fine if reassigned

// ✅ Good
const age = 30;
```

### Import Rules

#### `import/order`

Enforces consistent import order and grouping. The configuration typically groups imports by type (e.g., React, third-party, internal, relative) with empty lines between groups.

```typescript
// ❌ Bad
import { useState } from 'react';
import { Button } from './components/Button';
import { View } from 'react-native';

// ✅ Good
import { useState } from 'react';

import { View } from 'react-native';

import { Button } from './components/Button';
```

#### `import/no-unused-modules`

Detects unused modules and exports. Helps with dead code elimination.

```typescript
// ❌ Bad - MyComponent is not exported or used
const MyComponent = () => <Text>Hello</Text>;

// ✅ Good
export const MyComponent = () => <Text>Hello</Text>; // Used elsewhere
```

### Code Quality Rules

#### `complexity`

Limits cyclomatic complexity to prevent overly complex functions. High complexity often indicates a function is doing too much and should be refactored.

```typescript
// ❌ Bad - Complexity too high
function getUserStatus(user: User, permissions: string[]): string {
  if (!user) {
    return 'unknown';
  }
  if (user.isBanned) {
    return 'banned';
  }
  if (user.isSuspended && !permissions.includes('override')) {
    return 'suspended';
  }
  if (user.isInactive && user.lastLogin < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
    return 'inactive';
  }
  if (user.role === 'admin' && permissions.includes('full_access')) {
    return 'admin';
  }
  if (user.hasTrial && user.trialEnds < new Date()) {
    return 'trial-expired';
  }
  return 'active';
}

// ✅ Good - Refactored into smaller, focused functions
function getUserStatus(user: User, permissions: string[]): string {
  if (!user) return 'unknown';
  if (user.isBanned) return 'banned';
  if (isSuspended(user, permissions)) return 'suspended';
  if (isInactive(user)) return 'inactive';
  if (isAdmin(user, permissions)) return 'admin';
  if (isTrialExpired(user)) return 'trial-expired';
  return 'active';
}

function isSuspended(user: User, permissions: string[]): boolean {
  return user.isSuspended && !permissions.includes('override');
}
// ... other helper functions
```

#### `max-lines-per-function`

Limits function length to improve readability and maintainability. Long functions are harder to understand and test.

```typescript
// ❌ Bad - Function too long
function renderComplexForm() {
  // ... 150 lines of JSX and logic
}

// ✅ Good - Split into smaller components/functions
function renderComplexForm() {
  return (
    <View>
      <HeaderSection />
      <UserDetailsForm />
      <AddressForm />
      <PaymentDetails />
      <FooterActions />
    </View>
  );
}
```

#### `max-lines`

Limits file length to prevent overly large files. Large files often indicate a lack of modularization.

```typescript
// ❌ Bad - File too long (e.g., 300 lines)
// components/UserScreen.tsx
// Contains UserScreen component, UserHeader, UserForm, UserActions, UserValidation, UserStyles

// ✅ Good - Split into multiple files
// components/UserScreen.tsx (main component)
// components/user/UserHeader.tsx
// components/user/UserForm.tsx
// components/user/UserActions.tsx
// lib/validation/userValidation.ts
// styles/userStyles.ts
```

### TypeScript Rules

#### `@typescript-eslint/no-explicit-any`

Discourages use of `any` type. While `any` can be useful for quick prototyping, it bypasses TypeScript's type checking, defeating its purpose.

```typescript
// ❌ Bad - Using any
function processData(data: any) {
  return data.value;
}

// ✅ Good - Proper typing
function processData<T extends { someProperty: unknown }>(data: T): T['someProperty'] {
  return data.someProperty;
}
```

#### `@typescript-eslint/no-unused-vars`

Detects unused variables and parameters. Helps keep the codebase clean and reduces potential bugs.

```typescript
// ❌ Bad
const unusedVar = 1;
function myFunction(param1: string, unusedParam: number) {
  console.log(param1);
}

// ✅ Good
const usedVar = 1;
function myFunction(param1: string, _unusedParam: number) {
  console.log(param1);
}
```

### React Native Rules

#### `react-native/no-inline-styles`

Warns against using inline styles, encouraging the use of `StyleSheet.create` for better performance and maintainability.

```typescript
// ❌ Bad
<Text style={{ color: 'red', fontSize: 16 }}>Hello</Text>

// ✅ Good
const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 16,
  },
});
<Text style={styles.text}>Hello</Text>
```

## 📊 Rule Severity Levels

- **`error`**: Violations cause build failure (e.g., in CI/CD or pre-commit hooks)
- **`warn`**: Violations show warnings but don't fail build. Useful for non-critical issues or during development
- **`off`**: Rule is disabled. Use sparingly and with justification

### Rule Configuration

Rules can be configured with different severity levels and options:

```javascript
rules: {
  // Simple rule
  'no-console': 'error',

  // Rule with options
  complexity: ['error', { max: 12 }],

  // Rule with multiple options
  'max-lines': ['error', {
    max: 200,
    skipBlankLines: true,
    skipComments: true
  }],
}
```

### File-Specific Rules

You can override rules for specific files or patterns:

```javascript
export default [
  // ... general config

  // Override for specific files
  {
    files: ['src/legacy/**/*.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Test-specific rules
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' in tests
    },
  },
];
```

## 🚀 Integration with Development Workflow

### VS Code

1. Install ESLint extension
2. Add to `settings.json`:

```json
{
  "eslint.enable": true,
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### WebStorm

1. Enable ESLint in Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
2. Enable "Autofix ESLint problems on save"

### Pre-commit Hooks (via lint-staged)

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## 💡 Best Practices for ESLint

### 1. Consistent Import Order

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 3. Internal absolute imports
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

// 4. Relative imports
import { someHelper } from './utils';
```

### 2. Function Complexity Management

Keep functions small and focused. If a function's complexity score is high, it's a sign to refactor.

```typescript
// ❌ Bad - Complex function
function processUserAction(user: User, action: Action): void {
  if (!user.isAuthenticated) {
    showLoginPrompt();
    return;
  }
  if (!user.isActive) {
    showInactiveUserMessage();
    return;
  }
  if (!canUserPerformAction(user, action)) {
    showPermissionDeniedMessage();
    return;
  }
  executeUserAction(user, action);
}

// ✅ Good - Simplified with guard clauses and helper functions
function processUserAction(user: User, action: Action): void {
  if (!user.isAuthenticated) return showLoginPrompt();
  if (!user.isActive) return showInactiveUserMessage();
  if (!canUserPerformAction(user, action)) return showPermissionDeniedMessage();

  executeUserAction(user, action);
}
```

### 3. File Size Management

Split large files into smaller, more manageable modules. A good rule of thumb is to keep files under 200 lines.

```typescript
// ❌ Bad - Large file
// components/UserProfileScreen.tsx (300+ lines)
// Contains: UserProfileScreen component, UserProfileHeader, UserProfileForm, UserProfileActions, UserProfileStyles, UserProfileValidation

// ✅ Good - Modularized
// components/screens/UserProfileScreen.tsx (main orchestration)
// components/user/UserProfileHeader.tsx
// components/user/UserProfileForm.tsx
// components/user/UserProfileActions.tsx
// styles/UserProfileStyles.ts
// lib/validation/UserProfileValidation.ts
```

### 4. Type Safety

Leverage TypeScript to its fullest. Avoid `any` and ensure all variables, function parameters, and return types are explicitly typed.

```typescript
// ❌ Bad - Using any
function fetchData(url: string): Promise<any> {
  return fetch(url).then((res) => res.json());
}

// ✅ Good - Type-safe
interface UserData {
  id: string;
  name: string;
  email: string;
}
async function fetchData(url: string): Promise<UserData> {
  const response = await fetch(url);
  return response.json();
}
```

## ⚠️ Troubleshooting Common Issues

### Import Order Violations

**Problem**: `There should be at least one empty line between import groups` or imports are not sorted correctly.

**Solution**: Add empty lines between import groups as per the `import/order` rule configuration. Run `eslint --fix` to automatically sort.

```typescript
import React from 'react';

import { View, Text } from 'react-native';
```

### Unused Variables

**Problem**: `'variable' is assigned a value but never used` or `'parameter' is defined but never used`.

**Solution**: Remove unused variables or parameters. For parameters that must exist but are not used (e.g., in interface implementations), prefix them with an underscore (`_`).

```typescript
// Remove if truly unused
const myUnusedConst = 10;

// Prefix with underscore for unused parameters
function handleEvent(_event: SomeEventType, data: string) {
  console.log(data);
}
```

### Complexity Violations

**Problem**: `Function has a complexity of 15. Maximum allowed is 12`.

**Solution**: Refactor the function into smaller, more focused functions. Use guard clauses to reduce nesting.

```typescript
// Extract complex conditions
const isValidUser = (user: User) => user.isActive && user.hasPermissions;
const isEligibleForDiscount = (user: User, item: Item) => isValidUser(user) && item.price > 100;

function calculatePrice(user: User, item: Item): number {
  if (!isEligibleForDiscount(user, item)) {
    return item.price;
  }
  return item.price * 0.9; // Apply 10% discount
}
```

### File Length Violations

**Problem**: `File has too many lines (250). Maximum allowed is 200`.

**Solution**: Split large files into smaller, focused files. For example, extract styles, helper functions, or sub-components into their own files.

Remember: ESLint is a tool to help you write better code. Use it as a guide, not a strict rule. Sometimes, you may need to disable a rule for a specific case, but always document why you're doing so.
