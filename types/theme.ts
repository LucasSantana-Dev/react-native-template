import { TextStyle, ViewStyle } from 'react-native';

// ========== COLOR SCHEME ==========
export type ColorScheme = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'system';

// ========== THEME COLORS ==========
export interface ThemeColors {
  // Primary Colors
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Secondary Colors
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;

  // Background Colors
  background: string;
  backgroundDark: string;
  backgroundLight: string;
  backgroundPurple: string;
  backgroundPurpleDark: string;
  surface: string;
  surfaceVariant: string;

  // Text Colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;

  // Status Colors
  success: string;
  successDark: string;
  error: string;
  errorDark: string;
  warning: string;
  warningDark: string;
  info: string;
  infoDark: string;

  // Border and Divider Colors
  border: string;
  borderLight: string;
  borderDark: string;
  divider: string;

  // Special Colors
  accent: string;
  accentDark: string;
  favorite: string;
  transparent: string;
  white: string;

  // Overlay Colors
  overlay: string;
  overlayLight: string;
  overlayDark: string;

  // Shadow Colors
  shadow: string;
  shadowLight: string;
  shadowDark: string;
}

// ========== GRADIENTS ==========
export interface Gradient {
  primary: string[];
  primaryLight: string[];
  secondary: string[];
  accent: string[];
  dark: string[];
  light: string[];
  success: string[];
  error: string[];
  info: string[];
}

// ========== OVERLAYS ==========
export interface Overlay {
  modal: string;
  card: string;
  light: string;
  dark: string;
}

// ========== TYPOGRAPHY ==========
export interface Typography {
  fontFamily: {
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
  };
  fontSize: {
    'xs': number;
    'sm': number;
    'md': number;
    'lg': number;
    'xl': number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
    '6xl': number;
  };
  lineHeight: {
    'xs': number;
    'sm': number;
    'md': number;
    'lg': number;
    'xl': number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
    '6xl': number;
  };
  fontWeight: {
    normal: '400';
    medium: '500';
    semiBold: '600';
    bold: '700';
  };
}

// ========== SPACING ==========
export interface Spacing {
  'xs': number;
  'sm': number;
  'md': number;
  'lg': number;
  'xl': number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
  '6xl': number;
}

// ========== BORDER RADIUS ==========
export interface BorderRadius {
  'none': number;
  'xs': number;
  'sm': number;
  'md': number;
  'lg': number;
  'xl': number;
  '2xl': number;
  '3xl': number;
  'full': number;
}

// ========== SHADOWS ==========
export interface Shadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  none: Shadow;
  sm: Shadow;
  md: Shadow;
  lg: Shadow;
  xl: Shadow;
}

// ========== ANIMATION ==========
export interface Animation {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    linear: string;
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

// ========== BREAKPOINTS ==========
export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// ========== Z-INDEX ==========
export interface ZIndex {
  hide: number;
  auto: 'auto';
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;
  toast: number;
  tooltip: number;
}

// ========== COMPLETE THEME ==========
export interface Theme {
  colors: ThemeColors;
  gradients: Gradient;
  overlays: Overlay;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  animation: Animation;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
}

// ========== COMPONENT STYLES ==========
export interface ComponentStyles {
  // Button styles
  button: {
    primary: ViewStyle;
    secondary: ViewStyle;
    outline: ViewStyle;
    ghost: ViewStyle;
    danger: ViewStyle;
  };
  buttonText: {
    primary: TextStyle;
    secondary: TextStyle;
    outline: TextStyle;
    ghost: TextStyle;
    danger: TextStyle;
  };

  // Card styles
  card: {
    elevated: ViewStyle;
    outlined: ViewStyle;
    flat: ViewStyle;
  };

  // Input styles
  input: {
    default: ViewStyle;
    outline: ViewStyle;
    filled: ViewStyle;
    error: ViewStyle;
    focused: ViewStyle;
  };
  inputText: {
    default: TextStyle;
    error: TextStyle;
    disabled: TextStyle;
  };

  // Layout styles
  container: {
    screen: ViewStyle;
    scroll: ViewStyle;
    header: ViewStyle;
  };
}

// ========== THEME HOOK TYPES ==========
export interface ThemeContextType {
  themeMode: 'light' | 'dark' | 'system';
  colorScheme: ColorScheme;
  isDark: boolean;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

// ========== STYLE UTILITIES ==========
export type StyleVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentState = 'default' | 'disabled' | 'loading';
export type SpacingSize = keyof Spacing;
export type FontSize = keyof Typography['fontSize'];
export type FontWeight = keyof Typography['fontWeight'];
export type BorderRadiusSize = keyof BorderRadius;
export type ShadowSize = keyof Shadows;
