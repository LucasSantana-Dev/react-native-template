import { Platform } from 'react-native';

// App configuration
export const appConfig = {
  // App metadata
  name: 'React Native Template',
  version: '1.0.0',
  buildNumber: '1',

  // Environment
  environment: __DEV__ ? 'development' : 'production',
  isDev: __DEV__,

  // API configuration
  api: {
    baseUrl: __DEV__
      ? Platform.select({
          ios: 'http://localhost:3000/api',
          android: 'http://10.0.2.2:3000/api',
          web: 'http://localhost:3000/api',
        })
      : 'https://api.yourapp.com',
    timeout: 10000,
    retries: 3,
  },

  // Storage configuration
  storage: {
    prefix: '@ReactNativeTemplate:',
    encryption: true,
  },

  // Feature flags
  features: {
    analytics: true,
    crashReporting: true,
    pushNotifications: true,
    biometricAuth: true,
    darkMode: true,
  },

  // UI configuration
  ui: {
    defaultTheme: 'system' as const,
    animationDuration: 300,
    hapticFeedback: true,
  },

  // Navigation configuration
  navigation: {
    headerHeight: 44,
    tabBarHeight: 49,
    animationEnabled: true,
  },

  // Platform-specific settings
  platform: {
    ios: {
      statusBarStyle: 'dark-content' as const,
      keyboardAvoidingView: 'padding' as const,
    },
    android: {
      statusBarStyle: 'dark-content' as const,
      keyboardAvoidingView: 'height' as const,
    },
    web: {
      statusBarStyle: 'default' as const,
      keyboardAvoidingView: 'padding' as const,
    },
  },

  // Debug settings
  debug: {
    showLogs: __DEV__,
    showPerformanceMetrics: __DEV__,
    enableReduxDevTools: __DEV__,
  },
};

// Export individual config sections for easier imports
export const { api, storage, features, ui, navigation, platform, debug } = appConfig;

// Type for the app config
export type AppConfig = typeof appConfig;
