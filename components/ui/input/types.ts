import { ReactNode } from 'react';

import { TextInputProps, TextStyle, ViewStyle } from 'react-native';

// ========== INPUT VARIANTS ==========
export type InputVariant = 'default' | 'outline' | 'filled';

// ========== INPUT SIZES ==========
export type InputSize = 'sm' | 'md' | 'lg';

// ========== INPUT STATES ==========
export type InputState = 'default' | 'focused' | 'error' | 'disabled';

// ========== INPUT PROPS ==========
export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Input label */
  label?: string;

  /** Input placeholder */
  placeholder?: string;

  /** Input value */
  value?: string;

  /** Input variant style */
  variant?: InputVariant;

  /** Input size */
  size?: InputSize;

  /** Input state */
  state?: InputState;

  /** Custom input style */
  style?: ViewStyle;

  /** Custom text style */
  textStyle?: TextStyle;

  /** Custom label style */
  labelStyle?: TextStyle;

  /** Error message */
  error?: string;

  /** Helper text */
  helperText?: string;

  /** Whether input is required */
  required?: boolean;

  /** Whether input is disabled */
  disabled?: boolean;

  /** Whether input is readonly */
  readonly?: boolean;

  /** Left icon */
  leftIcon?: ReactNode;

  /** Right icon */
  rightIcon?: ReactNode;

  /** Left icon press handler */
  onLeftIconPress?: () => void;

  /** Right icon press handler */
  onRightIconPress?: () => void;

  /** Container style */
  containerStyle?: ViewStyle;

  /** Label container style */
  labelContainerStyle?: ViewStyle;

  /** Input container style */
  inputContainerStyle?: ViewStyle;

  /** Error container style */
  errorContainerStyle?: ViewStyle;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Accessibility hint */
  accessibilityHint?: string;

  /** Test ID */
  testID?: string;
}

// ========== INPUT STYLES ==========
export interface InputStyles {
  container: ViewStyle;
  labelContainer: ViewStyle;
  label: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  leftIcon: ViewStyle;
  rightIcon: ViewStyle;
  errorContainer: ViewStyle;
  error: TextStyle;
  helper: TextStyle;
}

// ========== INPUT CONFIG ==========
export interface InputConfig {
  variant: InputVariant;
  size: InputSize;
  state: InputState;
  disabled: boolean;
  readonly: boolean;
  hasError: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}

// ========== INPUT VARIANT STYLES ==========
export interface InputVariantStyles {
  default: {
    inputContainer: ViewStyle;
    input: TextStyle;
  };
  outline: {
    inputContainer: ViewStyle;
    input: TextStyle;
  };
  filled: {
    inputContainer: ViewStyle;
    input: TextStyle;
  };
}

// ========== INPUT SIZE STYLES ==========
export interface InputSizeStyles {
  sm: {
    inputContainer: ViewStyle;
    input: TextStyle;
    label: TextStyle;
  };
  md: {
    inputContainer: ViewStyle;
    input: TextStyle;
    label: TextStyle;
  };
  lg: {
    inputContainer: ViewStyle;
    input: TextStyle;
    label: TextStyle;
  };
}

// ========== INPUT STATE STYLES ==========
export interface InputStateStyles {
  default: {
    inputContainer: ViewStyle;
    input: TextStyle;
  };
  focused: {
    inputContainer: ViewStyle;
    input: TextStyle;
  };
  error: {
    inputContainer: ViewStyle;
    input: TextStyle;
  };
  disabled: {
    inputContainer: ViewStyle;
    input: TextStyle;
  };
}
