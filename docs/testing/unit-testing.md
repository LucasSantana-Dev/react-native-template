# Unit Testing with Jest & React Native Testing Library

Unit testing is a fundamental practice for ensuring the reliability and correctness of individual components, hooks, and utility functions in your React Native application. This guide covers the setup, best practices, and common patterns for writing effective unit tests using Jest and React Native Testing Library.

## ⚙️ Setup

This template comes pre-configured with Jest and React Native Testing Library.

- **Jest**: The test runner and assertion library
- **React Native Testing Library (RNTL)**: Provides utilities for testing React Native components in a way that simulates user interactions and focuses on accessibility

### Key Configuration Files

- `jest.config.cjs`: Main Jest configuration
- `jest.setup.js`: Global setup file for mocks and polyfills

## 📝 Writing Unit Tests

### File Organization

```
__tests__/
├── components/
│   ├── ui/
│   │   ├── button.test.tsx
│   │   └── input.test.tsx
├── hooks/
│   └── use-async.test.ts
└── lib/
    └── utils/
        └── cpf.test.ts
```

### Naming Conventions

- Test files: `*.test.{ts,tsx}`
- Test suites: `describe('ComponentName', () => {})`
- Individual tests: `it('should do something', () => {})` or `test('should do something', () => {})`

### Basic Component Test Example

```typescript
// __tests__/components/ui/button.test.tsx
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Button } from '../../components/ui/button/button';

describe('Button', () => {
  it('should render correctly with text content', () => {
    render(<Button>Press Me</Button>);
    expect(screen.getByText('Press Me')).toBeTruthy();
  });

  it('should call the onPress function when pressed', () => {
    const handlePress = jest.fn();
    render(<Button onPress={handlePress}>Click Me</Button>);
    fireEvent.press(screen.getByText('Click Me'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });

  it('should show a loading indicator when loading prop is true', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByTestId('button-loading-indicator')).toBeTruthy();
  });
});
```

### Hook Test Example

```typescript
// __tests__/hooks/use-async.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useAsync } from '../../hooks/use-async';

describe('useAsync', () => {
  it('should handle async function correctly', async () => {
    const mockAsyncFunction = jest
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
    const { result } = renderHook(() => useAsync(mockAsyncFunction));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150)); // Wait for the async function to complete
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeUndefined(); // No data returned in this mock
    expect(result.current.error).toBeUndefined();
  });

  it('should return data on successful resolution', async () => {
    const mockData = { message: 'Success!' };
    const mockAsyncFunction = jest.fn().mockResolvedValue(mockData);
    const { result, waitForNextUpdate } = renderHook(() => useAsync(mockAsyncFunction));

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeUndefined();
  });

  it('should return error on rejection', async () => {
    const mockError = new Error('Failed!');
    const mockAsyncFunction = jest.fn().mockRejectedValue(mockError);
    const { result, waitForNextUpdate } = renderHook(() => useAsync(mockAsyncFunction));

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
  });
});
```

## 💡 Best Practices

- **Test behavior, not implementation**: Focus on what the user sees and interacts with, not internal component state or methods
- **Isolation**: Unit tests should be isolated and not depend on external services or databases. Use mocks for dependencies
- **Fast execution**: Unit tests should run quickly to provide rapid feedback
- **Descriptive names**: Test names should clearly explain what is being tested
- **AAA Pattern**: Arrange (setup), Act (perform action), Assert (verify outcome)

## ⚠️ Troubleshooting Common Issues

### Platform.OS Undefined

**Problem**: `Cannot read properties of undefined (reading 'OS')` when running tests. This often happens when React Native components or libraries try to access `Platform.OS` in a Jest environment.

**Solution**: Ensure Platform is mocked in `jest.setup.js`:

```javascript
// jest.setup.js
global.Platform = {
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
};
```

### Async Operations Not Completing

**Problem**: Tests fail due to async operations (e.g., `useEffect` with `fetch`, `setTimeout`) not completing before assertions are made.

**Solution**: Use `act()` from `@testing-library/react-hooks` (for hooks) or `@testing-library/react-native` (for components) to wrap code that causes state updates, and `waitFor()` for async assertions.

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
// or
import { render, act, waitFor } from '@testing-library/react-native';

// For hooks
await act(async () => {
  // Trigger async operation
  await waitForNextUpdate(); // From renderHook
});

// For components
await act(async () => {
  fireEvent.press(screen.getByText('Load Data'));
  await waitFor(() => expect(screen.getByText('Data Loaded')).toBeTruthy());
});
```

### Mock Not Working

**Problem**: Mocks for external modules or functions are not being applied correctly, leading to real implementations being called or errors.

**Solution**: Ensure mocks are defined before imports in your test file or in `jest.setup.js`. Jest hoists `jest.mock` calls to the top of the file, but it's good practice to place them at the top.

```typescript
// Mock before import
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import after mock

describe('MyComponent', () => {
  it('should use mocked AsyncStorage', async () => {
    await AsyncStorage.setItem('key', 'value');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('key', 'value');
  });
});
```

Remember: Good unit tests are fast, isolated, and test behavior rather than implementation details.
