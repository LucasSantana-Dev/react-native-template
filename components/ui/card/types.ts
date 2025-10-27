import { ReactNode } from 'react';

import { ViewStyle } from 'react-native';

// ========== CARD VARIANTS ==========
export type CardVariant = 'elevated' | 'outlined' | 'flat';

// ========== CARD SIZES ==========
export type CardSize = 'sm' | 'md' | 'lg';

// ========== CARD PROPS ==========
export interface CardProps {
  /** Card content */
  children?: ReactNode;

  /** Card variant style */
  variant?: CardVariant;

  /** Card size */
  size?: CardSize;

  /** Custom card style */
  style?: ViewStyle;

  /** Card header content */
  header?: ReactNode;

  /** Card footer content */
  footer?: ReactNode;

  /** Card body content */
  body?: ReactNode;

  /** Whether card is pressable */
  pressable?: boolean;

  /** Press handler */
  onPress?: () => void;

  /** Whether card is disabled */
  disabled?: boolean;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Accessibility hint */
  accessibilityHint?: string;

  /** Test ID */
  testID?: string;
}

// ========== CARD STYLES ==========
export interface CardStyles {
  card: ViewStyle;
  header: ViewStyle;
  body: ViewStyle;
  footer: ViewStyle;
}

// ========== CARD CONFIG ==========
export interface CardConfig {
  variant: CardVariant;
  size: CardSize;
  pressable: boolean;
  disabled: boolean;
}

// ========== CARD VARIANT STYLES ==========
export interface CardVariantStyles {
  elevated: {
    card: ViewStyle;
  };
  outlined: {
    card: ViewStyle;
  };
  flat: {
    card: ViewStyle;
  };
}

// ========== CARD SIZE STYLES ==========
export interface CardSizeStyles {
  sm: {
    card: ViewStyle;
    header: ViewStyle;
    body: ViewStyle;
    footer: ViewStyle;
  };
  md: {
    card: ViewStyle;
    header: ViewStyle;
    body: ViewStyle;
    footer: ViewStyle;
  };
  lg: {
    card: ViewStyle;
    header: ViewStyle;
    body: ViewStyle;
    footer: ViewStyle;
  };
}
