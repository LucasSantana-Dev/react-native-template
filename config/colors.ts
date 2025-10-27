/**
 * Base color palette system
 * Inspired by EduBank's comprehensive color architecture
 */

// ========== BASE COLORS ==========
export const BASE_COLORS = {
  // Primary Colors
  purple: '#4B5EFF',
  purpleDark: '#3A4BCC',
  purpleLight: '#6B7EFF',

  // Neutral Colors
  black: '#000000',
  white: '#FFFFFF',
  darkGray: '#1C1C1E',
  mediumGray: '#2C2C2E',
  lightGray: '#8E8E93',
  veryLightGray: '#F2F2F7',

  // Status Colors
  success: '#34C759',
  successDark: '#2A9D47',
  error: '#FF3B30',
  errorDark: '#D70015',
  warning: '#FF9500',
  warningDark: '#CC7700',
  info: '#007AFF',
  infoDark: '#0056CC',

  // Background Colors
  backgroundPurple: '#1A1A2E',
  backgroundPurpleDark: '#16213E',

  // Transparent Colors
  whiteTransparent10: 'rgba(255, 255, 255, 0.1)',
  whiteTransparent20: 'rgba(255, 255, 255, 0.2)',
  whiteTransparent50: 'rgba(255, 255, 255, 0.5)',
  whiteTransparent70: 'rgba(255, 255, 255, 0.7)',
  blackTransparent70: 'rgba(0, 0, 0, 0.7)',
  blackTransparent50: 'rgba(0, 0, 0, 0.5)',
  blackTransparent30: 'rgba(0, 0, 0, 0.3)',
  blackTransparent10: 'rgba(0, 0, 0, 0.1)',

  // Special Colors
  dividerGray: '#3A3A3C',
  greenEco: '#4CAF50',
} as const;

// ========== THEME COLORS ==========
export const COLORS = {
  // Primary Colors
  primary: BASE_COLORS.purple,
  primaryDark: BASE_COLORS.purpleDark,
  primaryLight: BASE_COLORS.purpleLight,

  // Secondary Colors
  secondary: BASE_COLORS.warning,
  secondaryDark: BASE_COLORS.warningDark,
  secondaryLight: '#FFB84D',

  // Background Colors
  background: BASE_COLORS.black,
  backgroundDark: BASE_COLORS.darkGray,
  backgroundLight: BASE_COLORS.mediumGray,
  backgroundPurple: BASE_COLORS.backgroundPurple,
  backgroundPurpleDark: BASE_COLORS.backgroundPurpleDark,
  surface: BASE_COLORS.darkGray,
  surfaceVariant: BASE_COLORS.mediumGray,

  // Text Colors
  text: BASE_COLORS.white,
  textSecondary: BASE_COLORS.whiteTransparent70,
  textTertiary: BASE_COLORS.lightGray,
  textDisabled: BASE_COLORS.whiteTransparent50,
  textInverse: BASE_COLORS.black,

  // Status Colors
  success: BASE_COLORS.success,
  successDark: BASE_COLORS.successDark,
  error: BASE_COLORS.error,
  errorDark: BASE_COLORS.errorDark,
  warning: BASE_COLORS.warning,
  warningDark: BASE_COLORS.warningDark,
  info: BASE_COLORS.info,
  infoDark: BASE_COLORS.infoDark,

  // Border and Divider Colors
  border: BASE_COLORS.whiteTransparent20,
  borderLight: BASE_COLORS.whiteTransparent10,
  borderDark: BASE_COLORS.dividerGray,
  divider: BASE_COLORS.dividerGray,

  // Special Colors
  accent: BASE_COLORS.warning,
  accentDark: BASE_COLORS.warningDark,
  favorite: BASE_COLORS.warning,
  transparent: 'transparent',
  white: BASE_COLORS.white,

  // Overlay Colors
  overlay: BASE_COLORS.blackTransparent70,
  overlayLight: BASE_COLORS.blackTransparent30,
  overlayDark: BASE_COLORS.blackTransparent50,

  // Shadow Colors
  shadow: BASE_COLORS.blackTransparent30,
  shadowLight: BASE_COLORS.blackTransparent10,
  shadowDark: BASE_COLORS.blackTransparent50,

  // Card Colors
  card: BASE_COLORS.darkGray,
} as const;

// ========== GRADIENTS ==========
export const GRADIENTS = {
  primary: [BASE_COLORS.purple, BASE_COLORS.purpleDark],
  primaryLight: [BASE_COLORS.purpleLight, BASE_COLORS.purple],
  secondary: [BASE_COLORS.warning, BASE_COLORS.warningDark],
  accent: ['#FDB933', BASE_COLORS.warningDark],
  dark: ['#424242', '#212121'],
  light: [BASE_COLORS.white, BASE_COLORS.veryLightGray],
  success: [BASE_COLORS.success, BASE_COLORS.successDark],
  error: [BASE_COLORS.error, BASE_COLORS.errorDark],
  info: [BASE_COLORS.info, BASE_COLORS.infoDark],
} as const;

// ========== OVERLAYS ==========
export const OVERLAYS = {
  modal: BASE_COLORS.blackTransparent70,
  card: BASE_COLORS.whiteTransparent10,
  light: BASE_COLORS.blackTransparent30,
  dark: BASE_COLORS.blackTransparent50,
} as const;

// ========== TYPOGRAPHY ==========
export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 40,
    '4xl': 44,
    '5xl': 48,
    '6xl': 64,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
} as const;

// ========== SPACING ==========
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 96,
} as const;

// ========== BORDER RADIUS ==========
export const BORDER_RADIUS = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// ========== SHADOWS ==========
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: BASE_COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: BASE_COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: BASE_COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: BASE_COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ========== ANIMATION ==========
export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// ========== BREAKPOINTS ==========
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

// ========== Z-INDEX ==========
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;
