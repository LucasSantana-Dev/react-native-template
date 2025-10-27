# Testing Overview

This section provides a comprehensive guide to the testing strategy implemented
in this React Native template. Effective testing is crucial for building robust,
maintainable, and high-quality mobile applications.

## 🧪 Test Types

### 1. Unit Tests

- **Tool**: Jest + React Native Testing Library
- **Coverage**: Components, hooks, utilities, and business logic
- **Purpose**: Verify individual units of code function correctly in isolation

### 2. Integration Tests

- **Tool**: Jest + React Native Testing Library
- **Coverage**: Component interactions, context providers, navigation flows
- **Purpose**: Ensure different modules or services work together as expected

### 3. End-to-End (E2E) Tests

- **Tool**: Detox
- **Coverage**: Complete user flows on real devices/simulators
- **Purpose**: Validate the entire application from a user's perspective

## 🚀 Quick Start Guides

- **[Unit Testing Guide](unit-testing.md)** - Jest & React Native Testing
  Library setup and usage
- **[Integration Testing Guide](integration-testing.md)** - Testing component
  interactions and flows
- **[E2E Testing Guide](e2e-testing.md)** - Detox end-to-end tests
- **[Test Patterns](test-patterns.md)** - Best practices and common patterns

## ⚙️ Test Configuration

- **Jest Config**: `jest.config.cjs` - Main Jest configuration
- **Jest Setup**: `jest.setup.js` - Global test setup and mocks
- **Detox Config**: `e2e/jest.config.js` - Detox-specific Jest configuration

## 📊 Example Test Structure

### 1. Unit Test Example:

```typescript
// __tests__/components/button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../components/ui/button/button';

describe('Button', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Button>Press Me</Button>);
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button onPress={onPressMock}>Press Me</Button>);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Hook Test Example:

```typescript
// __tests__/hooks/use-async.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useAsync } from '../../hooks/use-async';

describe('useAsync', () => {
  it('should handle async function correctly', async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue('data');
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(mockAsyncFunction),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('data');
    expect(result.current.error).toBeUndefined();
  });
});
```

## 📈 Current Coverage

- **Components**: Button, Input, Card, Layout components
- **Hooks**: useAsync, useFormData, useAuth, useTheme
- **Utilities**: CPF, CNPJ, Phone, Date formatting
- **Screens**: Login, Register, Profile, Home

## 🎯 Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 🛠️ Key Testing Tools

### Jest

- **Purpose**: Test runner and assertion library
- **Configuration**: `jest.config.cjs`
- **Setup**: `jest.setup.js` for global mocks

### React Native Testing Library

- **Purpose**: Component testing utilities
- **Features**: render, fireEvent, waitFor, screen queries
- **Best Practice**: Test behavior, not implementation

### Detox

- **Purpose**: End-to-end testing
- **Platforms**: iOS and Android
- **Configuration**: `e2e/jest.config.js`, `e2e/setup.js`, `.detoxrc.js`

## 📝 Best Practices

### File Naming

- Unit tests: `*.test.{ts,tsx}`
- E2E tests: `*.test.js` (in e2e directory)
- Test utilities: `*.test-utils.{ts,tsx}`

### Directory Structure

```
__tests__/
├── components/
│   ├── ui/
│   │   ├── button.test.tsx
│   │   └── input.test.tsx
├── context/
│   └── auth-context.test.tsx
├── hooks/
│   └── use-async.test.ts
└── lib/
    └── utils/
        └── cpf.test.ts
e2e/
├── app.test.js
├── jest.config.js
└── setup.js
```

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Bad - Testing implementation
it('should have a specific internal state', () => {
  const { getByTestId } = render(<MyComponent />);
  expect(getByTestId('internal-state').props.value).toBe('initial');
});

// ✅ Good - Testing behavior
it('should display correct text after user interaction', () => {
  const { getByText, getByTestId } = render(<MyComponent />);
  fireEvent.press(getByTestId('button'));
  expect(getByText('Updated Text')).toBeTruthy();
});
```

### 2. Use Descriptive Test Names

```typescript
// ❌ Bad
it('test 1', () => {});

// ✅ Good
it('should render the component with default props', () => {});
it('should call the onSubmit handler when the form is submitted', () => {});
```

### 3. Follow AAA Pattern

```typescript
it('should call onPress when button is pressed', () => {
  // Arrange
  const onPressMock = jest.fn();
  const { getByText } = render(<Button onPress={onPressMock}>Press Me</Button>);

  // Act
  fireEvent.press(getByText('Press Me'));

  // Assert
  expect(onPressMock).toHaveBeenCalledTimes(1);
});
```

### 4. Mock External Dependencies

```typescript
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(obj => obj.ios || obj.default),
  Version: '14.0',
}));
```

## Troubleshooting Common Issues

### Jest Configuration (`jest.config.cjs`)

```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/e2e/**',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### E2E Configuration (`e2e/jest.config.js`)

```javascript
module.exports = {
  preset: 'detox',
  testRunner: 'jest',
  setupFilesAfterEnv: ['./setup.js'],
  testTimeout: 120000,
  testRegex: '\\.test\\.js$',
  reporters: ['detox/runners/jest/reporter'],
  verbose: true,
};
```

### Platform.OS Undefined

**Problem**: `Cannot read properties of undefined (reading 'OS')`

**Solution**: Ensure Platform is mocked in `jest.setup.js`:

```javascript
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(obj => obj.ios || obj.default),
  Version: '14.0',
}));
```

### Async Operations Not Completing

**Problem**: Tests fail due to async operations not completing

**Solution**: Use `act()` and `waitFor()`:

```typescript
import { act, waitFor } from '@testing-library/react-native';

it('should load data', async () => {
  const { getByText } = render(<MyComponent />);
  await act(async () => {
    await waitFor(() => expect(getByText('Data Loaded')).toBeTruthy());
  });
});
```

### Mock Not Working

**Problem**: Mocks not being applied correctly

**Solution**: Ensure mocks are defined before imports:

```typescript
// Mock before import
jest.mock('my-module', () => ({
  __esModule: true,
  default: jest.fn(() => 'mocked value'),
}));

import { myFunction } from 'my-module'; // Import after mock
```

Remember: Good tests are fast, reliable, and maintainable. Focus on testing user
behavior rather than implementation details.
