# React Native Template 🚀

A modern, well-structured React Native template built with Expo, TypeScript, and best practices for scalable mobile app development.

## ✨ Features

### 🎨 Component Library

- **Button**: Multiple variants (primary, secondary, outline, ghost, danger) and sizes
- **Card**: Elevated, outlined, and flat variants with header/body/footer sections
- **Input**: Form inputs with validation, icons, and different states
- **Layout Components**: ScreenContainer, ScrollContainer, HeaderLayout

### 🎯 Theme System

- **Comprehensive Color Palette**: Primary, secondary, status, and semantic colors
- **Typography Scale**: Consistent font sizes, weights, and line heights
- **Spacing System**: Standardized spacing values (xs, sm, md, lg, xl, etc.)
- **Border Radius**: Consistent corner radius values
- **Shadows**: Elevation shadows for depth
- **Gradients**: Pre-defined gradient combinations
- **Dark/Light Mode**: Automatic theme switching

### 🇧🇷 Brazilian Utilities

- **CPF**: Format, validate, and clean CPF numbers
- **Phone**: Brazilian phone number formatting and validation
- **CEP**: Postal code formatting and validation
- **CNPJ**: Corporate document formatting and validation
- **Currency**: Brazilian Real (BRL) formatting and parsing
- **Date**: Relative date formatting (Hoje, Ontem, etc.)

### 🪝 Custom Hooks

- **useFormData**: Complete form state management with validation
- **useScreenDimensions**: Responsive design utilities
- **useAuth**: Authentication state management
- **useTheme**: Theme-aware styling and colors

### 🧪 Testing

- **Unit Tests**: Jest + React Native Testing Library for component testing
- **Integration Tests**: Testing component interactions and flows
- **E2E Tests**: Detox for end-to-end testing on real devices/simulators
- **Coverage**: Comprehensive test coverage with quality gates

See [Testing Documentation](docs/testing/README.md) for detailed guides.

### 📐 Code Quality

- **ESLint**: Enforced code quality and consistency rules
- **Prettier**: Automatic code formatting on save and commit
- **Knip**: Dead code detection and unused dependency tracking
- **lint-staged**: Pre-commit validation with Husky hooks
- **TypeScript**: Strict type checking for safety

See [Code Quality Documentation](docs/code-quality/README.md) for setup and usage.

### 🔍 Discoverability

- **Deep Linking**: Universal Links (iOS) and App Links (Android) support
- **ASO**: App Store Optimization with proper metadata
- **Accessibility**: WCAG-compliant for inclusive user experience
- **Web SEO**: Optimized for search engines when using Expo web

See [SEO & Discoverability Documentation](docs/seo-discoverability/README.md) for implementation guides.

### 🔐 Authentication

- **AuthContext**: Generic authentication state management
- **Login/Register Screens**: Complete authentication flow
- **Form Validation**: Real-time validation with error handling
- **Storage Integration**: Persistent authentication state

### 📱 Responsive Design

- **Breakpoint System**: xs, sm, md, lg, xl breakpoints
- **Device Detection**: Phone, tablet, desktop detection

### ⚡ Performance Optimization

- **Lazy Loading**: Screen and component-level code splitting with React.lazy()
- **List Virtualization**: FlatList and FlashList for optimal scroll performance
- **Image Optimization**: Progressive loading with blurhash placeholders
- **Bundle Analysis**: Tools for monitoring and optimizing bundle size
- **Memory Management**: Efficient resource cleanup and state management
- **Performance Monitoring**: Real-time metrics tracking and profiling

### 🔧 Development Tools

- **Git Hooks**: Pre-commit linting, commit message validation, pre-push type checking
- **CI/CD Pipeline**: Automated testing, linting, and type checking on GitHub Actions
- **Code Quality**: ESLint, Prettier, TypeScript strict mode, and Knip for dead code detection
- **Testing**: Jest and React Native Testing Library setup
- **Orientation Support**: Portrait/landscape handling
- **Adaptive Layouts**: Components that adapt to screen size

### 🏗️ Architecture

- **Expo Router** - File-based routing for React Native
- **TypeScript** - Full type safety and better developer experience
- **Modern Architecture** - Organized folder structure following React Native best practices
- **API Layer** - Structured API client with error handling
- **Storage Management** - AsyncStorage wrapper with type safety

## 📁 Project Structure

```
/
├── app/                    # Expo Router (file-based routing)
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal screens
├── assets/                # Static assets (images, fonts, etc.)
├── components/            # React components
│   ├── ui/               # Base UI components (buttons, inputs, etc.)
│   ├── common/           # Common shared components
│   └── features/         # Feature-specific components
├── config/                # App configuration
│   ├── theme.ts          # Theme colors and fonts
│   └── app.ts            # App-wide configuration
├── context/               # React Context providers
│   └── theme-context.tsx # Theme context and hooks
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and helpers
│   ├── utils/            # Formatting and utility functions
│   └── helpers/          # Validation and helper functions
├── services/              # API calls and business logic
│   ├── api/              # API client and endpoints
│   └── storage/          # Local storage management
├── types/                 # TypeScript type definitions
│   ├── common.ts         # Common types
│   ├── api.ts            # API-related types
│   ├── navigation.ts     # Navigation types
│   ├── components.ts     # Component prop types
│   └── index.ts          # Central type exports
└── scripts/               # Build and utility scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Run on your preferred platform**

   ```bash
   # iOS Simulator
   npx expo start --ios

   # Android Emulator
   npx expo start --android

   # Web browser
   npx expo start --web
   ```

## ⚡ Performance Features

### Lazy Loading Implementation

This template includes comprehensive lazy loading strategies for optimal performance:

- **Screen-level lazy loading** for heavy screens (Profile, Explore, Home)
- **Component-level lazy loading** for feature-specific components
- **Image lazy loading** with progressive loading and blurhash placeholders
- **List virtualization** with FlatList and FlashList for large datasets

### Performance Monitoring

Built-in performance tracking and monitoring:

```bash
# Analyze bundle size
npm run bundle:analyze

# Get performance statistics
npm run bundle:stats

# Check file sizes
npm run bundle:size

# Run performance tests
npm run test:performance
```

### Performance Targets

- **Bundle Size**: < 2MB initial bundle
- **Load Time**: < 2s Time to Interactive
- **Memory Usage**: < 70MB average
- **Scroll Performance**: 60 FPS on all lists

For detailed performance optimization guides, see:

- [Lazy Loading Guide](docs/performance/lazy-loading.md)
- [Performance Optimization Guide](docs/performance/optimization-guide.md)
- [Code Examples](docs/examples/lazy-loading-examples.tsx)

## 🏗️ Architecture Overview

### Components Organization

- **`components/ui/`** - Reusable base UI components (buttons, inputs, cards)
- **`components/common/`** - Shared components used across features (external links, haptic feedback)
- **`components/features/`** - Feature-specific components (hello wave, parallax scroll)

### Services Layer

- **`services/api/`** - API client configuration and HTTP methods
- **`services/storage/`** - AsyncStorage wrapper with type safety and convenience methods

### Utilities

- **`lib/utils/`** - Formatting functions (dates, numbers, strings, phone numbers)
- **`lib/helpers/`** - Validation helpers and sanitization functions

### Type System

- **`types/`** - Centralized TypeScript definitions
- Comprehensive type coverage for components, API responses, and navigation

## 🎨 Theming

The project includes a comprehensive theming system:

```typescript
import { useTheme, useThemeColors, useThemeStyles } from '@/context/theme-context';

// Use theme context
const { isDark, toggleTheme } = useTheme();

// Get theme-aware colors
const colors = useThemeColors();

// Get theme-aware styles
const styles = useThemeStyles();
```

## 🧩 Component Usage

### Button Component

```typescript
import { Button } from '@/components/ui/button';

// Basic usage
<Button variant="primary" size="md" onPress={handlePress}>
  Click me
</Button>

// With icon
<Button variant="outline" size="lg" icon="add" iconPosition="left">
  Add Item
</Button>

// Loading state
<Button variant="danger" size="sm" loading disabled>
  Delete
</Button>
```

### Card Component

```typescript
import { Card } from '@/components/ui/card';

// Basic card
<Card variant="elevated" size="md">
  <Text>Card content</Text>
</Card>

// Card with sections
<Card variant="outlined" size="lg">
  <Card.Header>
    <Text>Card Title</Text>
  </Card.Header>
  <Card.Body>
    <Text>Card content goes here</Text>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Input Component

```typescript
import { Input } from '@/components/ui/input';

// Basic input
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>

// Input with icon
<Input
  label="Password"
  placeholder="Enter your password"
  secureTextEntry
  rightIcon="eye"
  onRightIconPress={togglePassword}
/>
```

### Form Management

```typescript
import { useFormData } from '@/hooks/use-form-data';

const validation = {
  email: (value: string) => {
    if (!value) return 'Email is required';
    if (!isValidEmail(value)) return 'Invalid email';
    return undefined;
  },
};

const {
  formState,
  setFieldValue,
  setFieldTouched,
  handleSubmit,
} = useFormData({
  initialValues: { email: '', password: '' },
  validation,
});

// In your component
<Input
  label="Email"
  value={formState.data.email.value}
  onChangeText={(value) => setFieldValue('email', value)}
  onBlur={() => setFieldTouched('email')}
  error={formState.data.email.error}
/>
```

### Brazilian Utilities

```typescript
import { formatCPF, validateCPF } from '@/lib/utils/cpf';
import { formatBRL } from '@/lib/utils/currency';
import { formatCurrency } from '@/lib/utils/currency';

// CPF formatting
const cpf = formatCPF('12345678901'); // 123.456.789-01
const isValid = validateCPF(cpf); // true

// Currency formatting
const price = formatBRL(1250.75); // R$ 1.250,75
const value = formatCurrency(1000); // 1.000,00
```

### Responsive Design

```typescript
import { useScreenDimensions, useResponsive } from '@/hooks/use-screen-dimensions';

const { isTablet, isPhone } = useScreenDimensions();
const { breakpoints } = useResponsive();

// Conditional rendering
{isTablet ? (
  <View style={{ flexDirection: 'row' }}>
    <Text>Tablet layout</Text>
  </View>
) : (
  <View style={{ flexDirection: 'column' }}>
    <Text>Phone layout</Text>
  </View>
)}
```

## 📱 Navigation

Built with Expo Router for file-based routing:

- **Tab Navigation** - Bottom tab bar with haptic feedback
- **Stack Navigation** - Modal and screen transitions
- **Type Safety** - Full TypeScript support for navigation params

## 🔧 Configuration

App configuration is centralized in `config/app.ts`:

```typescript
import { appConfig } from '@/config/app';

// Access configuration
const apiUrl = appConfig.api.baseUrl;
const features = appConfig.features;
```

## 🧪 Testing

The project is set up for comprehensive testing:

- **Jest** - Test runner and assertions
- **React Native Testing Library** - Component testing
- **Detox/Maestro** - E2E testing (optional)

## 📦 Dependencies

### Core Dependencies

**State Management:**

- `zustand@^5.0.2` - Minimal state management (1KB)

**Form Validation:**

- `react-hook-form@^7.54.2` - Performant form library
- `@hookform/resolvers@^3.9.1` - Zod resolver for react-hook-form
- `zod@^3.24.1` - TypeScript-first schema validation

**Icons & SVG:**

- `react-native-svg@^15.9.0` - SVG support for React Native

**Utilities:**

- `date-fns@^4.1.0` - Modern date utility library (modular, tree-shakeable)
- `axios@^1.7.9` - HTTP client for API requests
- `react-native-toast-message@^2.2.1` - Toast notifications for React Native

**Optional but Recommended:**

- `react-native-mmkv@^3.3.0` - Fast key-value storage (faster than AsyncStorage)
- `@tanstack/react-query@^5.84.1` - Server state management

### Development Dependencies

- `prettier@^3.4.2` - Code formatter
- `jest@^29.7.0` - Testing framework
- `@testing-library/react-native@^12.9.0` - Testing utilities
- `@types/react-test-renderer@^18.3.0` - Types for testing

## 📦 Available Scripts

```bash
# Development
npm start                 # Start Expo development server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run web              # Run on web

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically
npm run type-check       # Run TypeScript compiler
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run Jest tests

# Utilities
npm run clean            # Clean node_modules and generated files
npm run prebuild         # Prebuild for native development
npm run reset-project    # Reset to clean app directory
```

## 🔧 Git Hooks & CI/CD

### Git Hooks (Husky)

This project uses Husky to manage Git hooks for code quality:

- **Pre-commit**: Runs `lint-staged` to lint and format staged files
- **Commit-msg**: Validates commit messages using Commitlint
- **Pre-push**: Runs type checking and tests before pushing

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

### CI/CD Pipeline (GitHub Actions)

The project includes a comprehensive CI/CD pipeline that runs on every push and pull request:

- **Lint & Type Check**: ESLint, TypeScript, and Prettier validation
- **Testing**: Jest test suite execution
- **Build Validation**: Expo prebuild verification
- **Security Audit**: npm audit for vulnerability scanning
- **Code Quality**: Knip for dead code detection
- **Commit Message Validation**: Commitlint for message format

### Pre-commit Setup

The project is already configured with pre-commit hooks. To ensure they work:

1. **Install dependencies**: `npm install`
2. **Initialize Husky**: `npx husky install` (if needed)
3. **Test hooks**: Make a commit to see them in action

### Bypassing Hooks (Emergency)

If you need to bypass hooks in an emergency:

```bash
# Skip all hooks for a single commit
git commit -m "fix: emergency fix" --no-verify

# Temporarily disable hooks
HUSKY=0 git commit -m "fix: emergency fix"
```

## 🛠️ Development Guidelines

### Component Development

1. **Use TypeScript** - All components should be properly typed
2. **Follow naming conventions** - Use PascalCase for components
3. **Organize by category** - Place components in appropriate subdirectories
4. **Use theme system** - Leverage the theming context for consistent styling

### API Integration

1. **Use the API client** - Import from `@/services/api/client`
2. **Define types** - Add API types in `types/api.ts`
3. **Handle errors** - Use the built-in error handling

### State Management

1. **React Context** - For global state (theme, user preferences)
2. **Local state** - Use useState/useReducer for component state
3. **AsyncStorage** - For persistent data using the storage service

## 🛠️ VS Code Configuration

### Recommended Extensions

Install these extensions for the best development experience:

- `expo.vscode-expo-tools` - Expo development tools
- `dbaeumer.vscode-eslint` - ESLint integration
- `esbenp.prettier-vscode` - Prettier code formatter
- `bradlc.vscode-tailwindcss` - Tailwind CSS IntelliSense
- `msjsdiag.vscode-react-native` - React Native tools
- `christian-kohler.path-intellisense` - Path autocomplete
- `dsznajder.es7-react-js-snippets` - React snippets

### Configuration Features

- **Auto-formatting on save** - Code is automatically formatted with Prettier
- **Organized imports** - Imports are automatically organized and sorted
- **TypeScript support** - Full IntelliSense and type checking
- **Path aliases** - Use `@/` imports for cleaner code
- **Expo integration** - Built-in support for Expo development

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for all new code
3. Add proper type definitions
4. Follow the component organization patterns
5. Update documentation for new features

## 📄 License

This project is licensed under the MIT License.
