# End-to-End (E2E) Testing with Detox

End-to-End (E2E) testing with Detox allows you to simulate real user
interactions on a device or simulator, ensuring that your entire application
flow works correctly from start to finish. This guide covers Detox setup,
writing E2E tests, and best practices for maintaining stable and reliable E2E
test suites.

## ⚙️ Setup

This template includes a basic Detox setup.

### Key Configuration Files

- `.detoxrc.js`: Main Detox configuration for devices, emulators, and build
  commands
- `e2e/jest.config.js`: Jest configuration specifically for Detox tests
- `e2e/setup.js`: Detox setup file for global hooks and test environment

### Installation

Detox requires specific native dependencies. Refer to the
[Detox documentation](https://wix.github.io/Detox/docs/introduction/getting-started)
for detailed installation instructions for your platform (macOS, Linux,
Windows).

## 📝 Writing E2E Tests

### File Organization

E2E test files are typically placed in the `e2e/` directory.

```
e2e/
├── app.test.js       # Main application flow tests
├── auth.test.js      # Authentication flow tests
├── profile.test.js   # User profile interaction tests
└── setup.js          # Detox setup file
```

### Naming Conventions

- Test files: `*.test.js`
- Test suites: `describe('FeatureName', () => {})`
- Individual tests: `it('should do something', async () => {})`

### Basic E2E Test Example

```javascript
// e2e/app.test.js
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.text('Welcome')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('should show world screen after tap', async () => {
    await element(by.text('Hello!!!')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });
});
```

### Authentication Flow Example

```javascript
// e2e/auth.test.js
describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    // Ensure we are on the login screen
    await element(by.id('loginScreen')).atIndex(0).tap();
  });

  it('should log in successfully with valid credentials', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();

    await expect(element(by.id('homeScreen'))).toBeVisible();
    await expect(element(by.text('Welcome, Test User!'))).toBeVisible();
  });

  it('should show error for invalid credentials', async () => {
    await element(by.id('emailInput')).typeText('invalid@example.com');
    await element(by.id('passwordInput')).typeText('wrongpassword');
    await element(by.id('loginButton')).tap();

    await expect(element(by.text('Invalid credentials'))).toBeVisible();
    await expect(element(by.id('homeScreen'))).toNotBeVisible();
  });
});
```

## 💡 Best Practices

- **Focus on user journeys**: Design tests to cover critical user flows
- **Clear element identification**: Use `testID` props for reliable element
  selection
- **Reset state**: Use `device.reloadReactNative()` or `device.launchApp()` with
  `delete: true` to ensure a clean state for each test
- **Avoid flakiness**: Use `waitFor` and `expect` matchers carefully to handle
  asynchronous UI updates
- **Parallelization**: Configure Detox to run tests in parallel across multiple
  simulators/devices for faster execution

## ⚠️ Troubleshooting Common Issues

### Element Not Found

**Problem**: Detox cannot find a UI element, leading to test failures.

**Solution**:

- **Verify `testID`**: Ensure the `testID` prop is correctly applied to the
  React Native component
- **Visibility**: Check if the element is actually visible on the screen at the
  time of interaction. Use
  `await expect(element(by.id('myElement'))).toBeVisible();`
- **Hierarchy**: Sometimes elements are nested. Use `atIndex(0)` if multiple
  elements have the same `testID`
- **Timing**: Use `waitFor` to wait for elements to appear after an asynchronous
  action

### Test Flakiness

**Problem**: Tests pass inconsistently, sometimes failing without code changes.

**Solution**:

- **Explicit waits**: Replace implicit waits with explicit `waitFor` conditions
- **Reload app state**: Ensure `device.reloadReactNative()` or
  `device.launchApp({ delete: true })` is used to reset the app state before
  each test or suite
- **Network mocks**: Mock API calls in E2E tests if network instability is a
  factor (though generally, E2E aims for real interaction)
- **Increase timeouts**: Adjust `testTimeout` in `e2e/jest.config.js` if tests
  are timing out due to slow animations or transitions

### Build Failures

**Problem**: Detox build commands fail, often due to native project issues.

**Solution**:

- **Clean build**: Run `detox clean-build` and try building again
- **Native project setup**: Ensure your iOS/Android project is correctly
  configured for Detox (e.g., `AppDelegate.m`/`java`, `build.gradle`)
- **Dependencies**: Verify all native dependencies are correctly linked and
  installed

Remember: E2E tests are the final line of defense for your application's
quality. Invest time in making them robust and reliable.
