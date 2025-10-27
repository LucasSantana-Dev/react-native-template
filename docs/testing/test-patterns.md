# Test Patterns and Best Practices

Writing effective and maintainable tests requires adherence to certain patterns and best practices. This guide outlines common testing patterns, strategies for different scenarios, and general guidelines to improve your test suite's quality and efficiency.

## 💡 General Best Practices

### 1. Test Behavior, Not Implementation

Focus on what the user sees and interacts with, rather than the internal workings of your components. This makes your tests more resilient to refactoring.

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

Test names should clearly explain what is being tested, including the component/function, the action, and the expected outcome.

```typescript
// ❌ Bad
it('test 1', () => {});
it('should work', () => {});

// ✅ Good
it('should render the Button component with default text', () => {});
it('should call the onSubmit handler when the form is submitted with valid data', () => {});
it('should display an error message when the input is invalid', () => {});
```

### 3. Follow AAA Pattern (Arrange, Act, Assert)

Organize your tests into three distinct phases:

- **Arrange**: Set up the test environment, mock data, and render components
- **Act**: Perform the action being tested (e.g., user interaction, function call)
- **Assert**: Verify the expected outcome using assertions

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

Isolate your tests by mocking external dependencies like API calls, `AsyncStorage`, `Platform.OS`, or complex third-party libraries.

```typescript
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
}));
```

### 5. Test Asynchronous Operations

Use `async/await` with `act()` and `waitFor()` to handle asynchronous code in your tests, ensuring that all updates have been processed before making assertions.

```typescript
import { render, act, waitFor } from '@testing-library/react-native';

it('should load data after an API call', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: () => Promise.resolve({ data: 'Mocked Data' }),
  } as Response);

  const { getByText } = render(<DataFetcherComponent />);

  await act(async () => {
    // Trigger data fetch
    fireEvent.press(getByText('Fetch Data'));
    await waitFor(() => expect(getByText('Mocked Data')).toBeTruthy());
  });

  expect(global.fetch).toHaveBeenCalledTimes(1);
});
```

### 6. Snapshot Testing (Use Sparingly)

Snapshot tests capture the rendered output of a component and compare it to a previously saved snapshot. Use them for simple, static components or to detect unintentional UI changes.

```typescript
import renderer from 'react-test-renderer';
import { Button } from '../../components/ui/button/button';

it('renders correctly', () => {
  const tree = renderer.create(<Button>Snapshot Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

**Note**: Snapshots can be brittle and lead to frequent updates. Prefer testing user-facing behavior over exact rendering.

### 7. Test Error States

Ensure your components and functions handle error conditions gracefully.

```typescript
it('should display an error message when data fetching fails', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

  const { getByText } = render(<DataFetcherComponent />);

  await act(async () => {
    fireEvent.press(getByText('Fetch Data'));
    await waitFor(() => expect(getByText('Error: Network Error')).toBeTruthy());
  });
});
```

### 8. Accessibility Testing

Use React Native Testing Library's accessibility queries (`getByLabelText`, `getByRole`) and tools like `jest-axe` (for web, or manual checks for RN) to ensure your app is accessible.

```typescript
import { render, screen } from '@testing-library/react-native';
import { AccessibleButton } from './AccessibleButton'; // Assuming an accessible button component

it('should have an accessibility label', () => {
  render(<AccessibleButton accessibilityLabel="Submit Form" />);
  expect(screen.getByLabelText('Submit Form')).toBeTruthy();
});
```

Remember: A well-designed test suite provides confidence, speeds up development, and reduces bugs.
