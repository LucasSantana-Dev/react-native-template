// Jest setup file for React Native with Expo
// This file defines global variables needed for testing

// Force define globals immediately - these must be defined before any modules load
global.$RefreshReg$ = global.$RefreshReg$ || (() => {});
global.$RefreshSig$ = global.$RefreshSig$ || (() => () => {});
global.__DEV__ = global.__DEV__ || true;

// Disable React Native Testing Library host component detection
process.env.RTL_SKIP_AUTO_CLEANUP = 'true';
process.env.RTL_SKIP_HOST_COMPONENT_DETECTION = 'true';
process.env.RTL_SKIP_AUTO_DETECT_HOST_COMPONENTS = 'true';
process.env.RTL_SKIP_HOST_COMPONENT_DETECTION = 'true';
process.env.RTL_SKIP_HOST_COMPONENT_DETECTION = 'true';
process.env.RTL_SKIP_HOST_COMPONENT_DETECTION = 'true';

// Also define on window if it exists
if (typeof window !== 'undefined') {
  if (typeof window.$RefreshReg$ === 'undefined') {
    window.$RefreshReg$ = () => {};
  }
  if (typeof window.$RefreshSig$ === 'undefined') {
    window.$RefreshSig$ = () => () => {};
  }
}

// React Native globals are defined above

// Mock React Native bridge
global.__fbBatchedBridgeConfig = {
  remoteModuleConfig: [],
  localModuleConfig: [],
};

// Mock Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
}));

// Mock Dimensions API
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({
    width: 375,
    height: 667,
    scale: 2,
    fontScale: 1,
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock native modules
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  get: jest.fn(() => ({
    getConstants: jest.fn(() => ({})),
  })),
  getEnforcing: jest.fn(() => ({
    getConstants: jest.fn(() => ({})),
  })),
}));

// Mock Platform specifically
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
}));

// Mock PixelRatio to prevent errors in StyleSheet
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  get: jest.fn(() => 2),
  getFontScale: jest.fn(() => 1),
  getPixelSizeForLayoutSize: jest.fn((size) => size * 2),
  roundToNearestPixel: jest.fn((size) => Math.round(size)),
}));

// Mock Platform at the top level
global.Platform = {
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
};

// Mock Detox device for E2E tests
global.device = {
  launchApp: jest.fn(),
  reloadReactNative: jest.fn(),
  reloadApp: jest.fn(),
  terminateApp: jest.fn(),
  sendUserNotification: jest.fn(),
  openURL: jest.fn(),
  getPlatform: jest.fn(() => 'ios'),
  isIOS: jest.fn(() => true),
  isAndroid: jest.fn(() => false),
};

// Mock Detox element and by
global.element = jest.fn(() => ({
  tap: jest.fn(),
  typeText: jest.fn(),
  clearText: jest.fn(),
  scroll: jest.fn(),
  scrollTo: jest.fn(),
  swipe: jest.fn(),
  longPress: jest.fn(),
  multiTap: jest.fn(),
  replaceText: jest.fn(),
  setColumnToValue: jest.fn(),
  setDatePickerDate: jest.fn(),
  setSliderPosition: jest.fn(),
  setSwitchToValue: jest.fn(),
  setPickerWheelValue: jest.fn(),
  adjustSliderToPosition: jest.fn(),
  getAttributes: jest.fn(),
  getText: jest.fn(),
  isVisible: jest.fn(),
  atIndex: jest.fn(),
  withAncestor: jest.fn(),
  withDescendant: jest.fn(),
  and: jest.fn(),
  then: jest.fn(),
  catch: jest.fn(),
}));

global.by = {
  text: jest.fn(),
  id: jest.fn(),
  type: jest.fn(),
  label: jest.fn(),
  accessibilityLabel: jest.fn(),
  accessibilityId: jest.fn(),
  testID: jest.fn(),
  value: jest.fn(),
  key: jest.fn(),
  traits: jest.fn(),
  ancestor: jest.fn(),
  descendant: jest.fn(),
  and: jest.fn(),
  not: jest.fn(),
};

// Detox matchers will be added in jest.setup.after.js

// Mock global variables that might be missing in test environment
global.requestAnimationFrame =
  global.requestAnimationFrame ||
  ((callback) => {
    return setTimeout(callback, 0);
  });

global.cancelAnimationFrame =
  global.cancelAnimationFrame ||
  ((id) => {
    clearTimeout(id);
  });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};
