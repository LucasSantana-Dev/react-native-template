import { ReactNode } from 'react';

import { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

import { ComponentSize, ComponentState, StyleVariant } from '@/types/theme';

// ========== BUTTON PROPS ==========
export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Button content - text or custom children */
  children?: ReactNode;

  /** Button variant style */
  variant?: StyleVariant;

  /** Button size */
  size?: ComponentSize;

  /** Button state */
  state?: ComponentState;

  /** Custom button style */
  style?: ViewStyle;

  /** Custom text style */
  textStyle?: TextStyle;

  /** Icon name (for vector icons) */
  icon?: string;

  /** Icon size */
  iconSize?: number;

  /** Icon color */
  iconColor?: string;

  /** Icon position relative to text */
  iconPosition?: 'left' | 'right';

  /** Loading state */
  loading?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Full width button */
  fullWidth?: boolean;

  /** Force icon only (no text) */
  forceIcon?: boolean;

  /** Raw children (no text processing) */
  rawChildren?: boolean;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Accessibility hint */
  accessibilityHint?: string;

  /** Test ID */
  testID?: string;
}

// ========== BUTTON STYLES ==========
export interface ButtonStyles {
  button: ViewStyle;
  text: TextStyle;
  icon?: ViewStyle;
}

// ========== BUTTON CONFIG ==========
export interface ButtonConfig {
  variant: StyleVariant;
  size: ComponentSize;
  state: ComponentState;
  disabled: boolean;
  loading: boolean;
  hasIcon: boolean;
  hasText: boolean;
  fullWidth: boolean;
}

// ========== ICON CONFIG ==========
export interface IconConfig {
  size: number;
  color: string;
  position: 'left' | 'right';
  margin: number;
}

// ========== BUTTON VARIANT STYLES ==========
export interface ButtonVariantStyles {
  primary: {
    button: ViewStyle;
    text: TextStyle;
  };
  secondary: {
    button: ViewStyle;
    text: TextStyle;
  };
  outline: {
    button: ViewStyle;
    text: TextStyle;
  };
  ghost: {
    button: ViewStyle;
    text: TextStyle;
  };
  danger: {
    button: ViewStyle;
    text: TextStyle;
  };
}

// ========== BUTTON SIZE STYLES ==========
export interface ButtonSizeStyles {
  sm: {
    button: ViewStyle;
    text: TextStyle;
    icon: number;
  };
  md: {
    button: ViewStyle;
    text: TextStyle;
    icon: number;
  };
  lg: {
    button: ViewStyle;
    text: TextStyle;
    icon: number;
  };
}

// ========== BUTTON STATE STYLES ==========
export interface ButtonStateStyles {
  default: {
    button: ViewStyle;
    text: TextStyle;
  };
  disabled: {
    button: ViewStyle;
    text: TextStyle;
  };
  loading: {
    button: ViewStyle;
    text: TextStyle;
  };
}
