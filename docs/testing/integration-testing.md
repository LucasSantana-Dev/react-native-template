# Integration Testing with Jest & React Native Testing Library

Integration tests verify that different parts of your application work correctly together. Unlike unit tests, which focus on isolated units, integration tests ensure that components, hooks, contexts, and services interact as expected, forming a cohesive user experience.

## ⚙️ Setup

The setup for integration tests is largely the same as for unit tests, utilizing Jest as the test runner and React Native Testing Library for component rendering and interaction.

### Key Configuration Files

- `jest.config.cjs`: Main Jest configuration
- `jest.setup.js`: Global setup file for mocks and polyfills

## 📝 Writing Integration Tests

### Integration Test Organization

```
__tests__/
├── context/
│   └── auth-context.test.tsx # Testing AuthContext with components
├── screens/
│   └── login.test.tsx        # Testing LoginScreen with form and auth context
└── flows/
    └── onboarding.test.tsx   # Testing a multi-screen flow
```

### Basic Integration Test Example (Context + Component)

```typescript
// __tests__/context/auth-context.test.tsx
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../../context/auth-context';
import { Button, Text, View } from 'react-native';

// A simple component to consume the AuthContext
const TestComponent = () => {
  const { user, signIn, signOut, loading, signed } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text testID="status-text">{signed ? `Signed in as ${user?.name}` : 'Signed out'}</Text>
      {!signed && (
        <Button
          title="Sign In"
          onPress={() => signIn({ email: 'test@example.com', password: 'password' })}
        />
      )}
      {signed && <Button title="Sign Out" onPress={signOut} />}
    </View>
  );
};

// A wrapper to provide the AuthProvider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext Integration', () => {
  it('should provide initial signed out state', async () => {
    render(<TestComponent />, { wrapper: TestWrapper });
    await waitFor(() => expect(screen.getByTestId('status-text')).toHaveTextContent('Signed out'));
  });

  it('should sign in a user and update state', async () => {
    render(<TestComponent />, { wrapper: TestWrapper });

    fireEvent.press(screen.getByText('Sign In'));

    await waitFor(() => expect(screen.getByTestId('status-text')).toHaveTextContent('Signed in as test'));
    expect(screen.queryByText('Sign In')).toBeNull();
    expect(screen.getByText('Sign Out')).toBeTruthy();
  });

  it('should sign out a user and update state', async () => {
    render(<TestComponent />, { wrapper: TestWrapper });

    fireEvent.press(screen.getByText('Sign In'));
    await waitFor(() => expect(screen.getByTestId('status-text')).toHaveTextContent('Signed in as test'));

    fireEvent.press(screen.getByText('Sign Out'));
    await waitFor(() => expect(screen.getByTestId('status-text')).toHaveTextContent('Signed out'));
    expect(screen.queryByText('Sign Out')).toBeNull();
    expect(screen.getByText('Sign In')).toBeTruthy();
  });
});
```

### Form Validation Integration Example

```typescript
// __tests__/screens/login.test.tsx
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../app/(auth)/login';
import { AuthProvider } from '../../context/auth-context'; // Assuming AuthProvider is needed

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('LoginScreen Integration', () => {
  it('should display validation errors for empty fields', async () => {
    render(<LoginScreen />, { wrapper: TestWrapper });

    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeTruthy();
      expect(screen.getByText('Password is required')).toBeTruthy();
    });
  });

  it('should call signIn with correct credentials on valid submission', async () => {
    const signInMock = jest.fn().mockResolvedValue({ user: { id: '1', name: 'Test User' } });
    jest.mock('../../context/auth-context', () => ({
      ...jest.requireActual('../../context/auth-context'),
      useAuth: () => ({
        signIn: signInMock,
        user: null,
        loading: false,
        signed: false,
      }),
    }));

    render(<LoginScreen />, { wrapper: TestWrapper });

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

## 💡 Best Practices

- **Realistic data**: Use mock data that closely resembles real application data
- **Simulate user flows**: Test common user journeys through your application
- **Test boundaries**: Focus on interactions between different modules (e.g., component + API, component + context)
- **Avoid over-mocking**: Only mock external services or complex dependencies that are not central to the integration being tested
- **Clear assertions**: Verify the visible output and state changes that result from interactions

## ⚠️ Troubleshooting Common Issues

### Context Not Available

**Problem**: `useAuth must be used within an AuthProvider` or similar errors when testing components that rely on React Context.

**Solution**: Wrap the component being tested with the necessary context provider(s) using a custom `wrapper` in `render()` or by explicitly rendering the provider in your test.

```typescript
// Custom wrapper for render
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

render(<MyComponent />, { wrapper: TestWrapper });
```

### Async Operations Not Completing

**Problem**: Tests fail because asynchronous operations (e.g., API calls, `setTimeout`) initiated by component interactions do not complete before assertions are made.

**Solution**: Use `waitFor()` from React Native Testing Library to wait for elements to appear or disappear, or for state changes to propagate.

```typescript
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

it('should show success message after async action', async () => {
  render(<MyAsyncComponent />);
  fireEvent.press(screen.getByText('Perform Action'));

  await waitFor(() => expect(screen.getByText('Action Successful!')).toBeTruthy());
});
```

### Mock Not Working

**Problem**: Mocks for external services (e.g., API clients, `AsyncStorage`) are not being applied correctly, leading to real network requests or unexpected behavior.

**Solution**: Ensure mocks are defined before imports in your test file. For mocks that need to be reset between tests, use `beforeEach` or `afterEach`.

```typescript
// __mocks__/@react-native-async-storage/async-storage.ts
// Or directly in test file
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';

beforeEach(() => {
  // Clear mocks before each test
  (AsyncStorage.getItem as jest.Mock).mockClear();
  (AsyncStorage.setItem as jest.Mock).mockClear();
});

it('should save data to storage', async () => {
  render(<MyComponentWithStorage />);
  fireEvent.press(screen.getByText('Save Data'));
  await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledWith('key', 'value'));
});
```

Remember: Integration tests should verify that different parts of your application work together correctly, not just that they work in isolation.
