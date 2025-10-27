import { Platform } from 'react-native';

import {
    ANIMATION,
    BORDER_RADIUS,
    BREAKPOINTS,
    COLORS,
    GRADIENTS,
    OVERLAYS,
    SHADOWS,
    SPACING,
    TYPOGRAPHY,
    Z_INDEX
} from './colors';

// ========== THEME CONFIGURATION ==========
export const theme = {
  colors: COLORS,
  gradients: GRADIENTS,
  overlays: OVERLAYS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  animation: ANIMATION,
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
} as const;

// ========== LEGACY COLORS (for backward compatibility) ==========
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// ========== APP CONFIGURATION ==========
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
    animationDuration: ANIMATION.duration.normal,
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

// Type for the theme
export type Theme = typeof theme;
