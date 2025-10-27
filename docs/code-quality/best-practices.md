# Code Quality Best Practices

This guide outlines the best practices for maintaining high code quality in your
React Native project. Following these practices will help you write
maintainable, readable, and reliable code that your team can work with
effectively.

## 🏗️ Code Organization

### 1. File Structure

Organize your code in a logical, consistent structure.

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Design system components
│   ├── common/          # Shared components
│   └── features/        # Feature-specific components
├── screens/             # Screen components
├── hooks/               # Custom React hooks
├── context/             # React contexts
├── services/            # API and external services
├── lib/                 # Utilities and helpers
├── types/               # TypeScript type definitions
└── config/              # Configuration files
```

### 2. Naming Conventions

Use consistent naming conventions throughout your codebase.

```typescript
// Components: PascalCase
export const UserProfile = () => {};

// Functions and variables: camelCase
const getUserData = () => {};
const isUserActive = true;

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Files: kebab-case
// user-profile.tsx
// use-user-data.ts
```

### 3. Import Organization

Organize imports in a consistent order.

```typescript
// 1. React and React Native imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

// 3. Internal absolute imports
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

// 4. Relative imports
import { styles } from './styles';
import { UserProfileProps } from './types';
```

## 🔒 Type Safety

### 1. Use TypeScript Strictly

Enable strict mode and avoid `any` types.

```typescript
// ❌ Bad - Using any
function processData(data: any) {
  return data.value;
}

// ✅ Good - Proper typing
interface Data {
  value: string;
  count: number;
}

function processData(data: Data): string {
  return data.value;
}
```

### 2. Define Comprehensive Types

Create detailed type definitions for all data structures.

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  profile: {
    avatar?: string;
    bio?: string;
    preferences: UserPreferences;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}
```

### 3. Use Type Guards

Implement type guards for runtime type checking.

```typescript
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}
```

## 🎨 Component Design

### 1. Single Responsibility

Each component should have a single, well-defined responsibility.

```typescript
// ❌ Bad - Multiple responsibilities
const UserCard = ({ user, onEdit, onDelete, onShare }) => {
  // Handles display, editing, deletion, and sharing
};

// ✅ Good - Single responsibility
const UserCard = ({ user }) => {
  // Only handles display
};

const UserActions = ({ onEdit, onDelete, onShare }) => {
  // Only handles actions
};
```

### 2. Props Interface Design

Design clear, well-documented prop interfaces.

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}
```

### 3. Compound Components

Use compound components for complex UI elements.

```typescript
const Card = ({ children, ...props }) => {
  return <View style={styles.card} {...props}>{children}</View>;
};

Card.Header = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

Card.Body = ({ children }) => (
  <View style={styles.body}>{children}</View>
);

Card.Footer = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);
```

## 🚀 Performance

### 1. Memoization

Use React.memo and useMemo appropriately.

```typescript
const ExpensiveComponent = React.memo(({ data, onPress }) => {
  const processedData = useMemo(() =>
    data.map(item => processItem(item)),
    [data]
  );

  const handlePress = useCallback((id: string) => {
    onPress(id);
  }, [onPress]);

  return (
    <FlatList
      data={processedData}
      renderItem={({ item }) => (
        <ItemComponent item={item} onPress={handlePress} />
      )}
    />
  );
});
```

### 2. Lazy Loading

Implement lazy loading for screens and heavy components.

```typescript
const ProfileScreen = lazy(() => import('./ProfileScreen'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfileScreen />
    </Suspense>
  );
};
```

### 3. List Optimization

Use FlatList for large lists with proper optimization.

```typescript
<FlatList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

## 🧪 Testing

### 1. Test Behavior, Not Implementation

Focus on what the user sees and interacts with.

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

### 2. Comprehensive Test Coverage

Write tests for all critical functionality.

```typescript
describe('UserProfile', () => {
  it('should render user information', () => {
    const user = { name: 'John', email: 'john@example.com' };
    render(<UserProfile user={user} />);
    expect(screen.getByText('John')).toBeTruthy();
    expect(screen.getByText('john@example.com')).toBeTruthy();
  });

  it('should handle edit mode', () => {
    const onEdit = jest.fn();
    render(<UserProfile user={user} onEdit={onEdit} />);
    fireEvent.press(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalled();
  });
});
```

## 🔧 Error Handling

### 1. Proper Error Boundaries

Implement error boundaries for component errors.

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}
```

### 2. Async Error Handling

Handle async operations properly.

```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleAsyncOperation = async () => {
  setIsLoading(true);
  setError(null);

  try {
    const result = await performOperation();
    // Handle success
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    setError(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
```

## 📱 Accessibility

### 1. Proper Accessibility Props

Include accessibility props for all interactive elements.

```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit the form"
  accessibilityRole="button"
  onPress={handleSubmit}
>
  <Text>Submit</Text>
</TouchableOpacity>
```

### 2. Screen Reader Support

Ensure your app is accessible to screen readers.

```typescript
<View accessible={true} accessibilityLabel="User profile">
  <Text accessibilityRole="header">John Doe</Text>
  <Text accessibilityRole="text">Software Developer</Text>
  <Text accessibilityRole="text">john@example.com</Text>
</View>
```

## 📝 Documentation

### 1. JSDoc Comments

Document functions and components with JSDoc.

```typescript
/**
 * Formats a CPF number with proper masking
 * @param cpf - Raw CPF string (11 digits)
 * @returns Formatted CPF (xxx.xxx.xxx-xx)
 * @throws {Error} When CPF is invalid
 */
export const formatCPF = (cpf: string): string => {
  // Implementation
};
```

### 2. README Files

Maintain comprehensive README files for each major module.

````markdown
# User Profile Module

This module handles user profile management including display, editing, and
validation.

## Components

- `UserProfile`: Main profile display component
- `UserProfileForm`: Profile editing form
- `UserProfileActions`: Action buttons for profile operations

## Usage

```typescript
import { UserProfile } from '@/components/user/UserProfile';

<UserProfile user={user} onEdit={handleEdit} />
```
````

```

## 🔄 Continuous Improvement

### 1. Regular Code Reviews
Conduct thorough code reviews focusing on quality, not just functionality.

### 2. Refactoring
Regularly refactor code to improve maintainability and performance.

### 3. Learning and Growth
Stay updated with best practices and new tools in the React Native ecosystem.

Remember: Code quality is not just about following rules—it's about writing maintainable, readable, and reliable code that your team can work with effectively.
```
