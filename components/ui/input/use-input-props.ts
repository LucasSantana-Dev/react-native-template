import { useMemo } from 'react';

import { BlurEvent, FocusEvent, TextStyle, ViewStyle } from 'react-native';

import { InputProps } from './types';

interface UseInputPropsReturn {
  // Core props
  label: string | undefined;
  placeholder: string | undefined;
  value: string | undefined;
  variant: 'default' | 'outline' | 'filled';
  size: 'sm' | 'md' | 'lg';
  state: 'default' | 'focused' | 'error' | 'disabled';
  textStyle: TextStyle | undefined;
  labelStyle: TextStyle | undefined;
  error: string | undefined;
  helperText: string | undefined;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  leftIcon: string | React.ReactNode | undefined;
  rightIcon: string | React.ReactNode | undefined;
  onLeftIconPress: (() => void) | undefined;
  onRightIconPress: (() => void) | undefined;
  containerStyle: ViewStyle | undefined;
  labelContainerStyle: ViewStyle | undefined;
  inputContainerStyle: ViewStyle | undefined;
  errorContainerStyle: ViewStyle | undefined;
  accessibilityLabel: string | undefined;
  accessibilityHint: string | undefined;
  testID: string | undefined;
  onFocus: ((event: FocusEvent) => void) | undefined;
  onBlur: ((event: BlurEvent) => void) | undefined;
  // Excluded props
  control: unknown;
  name: string | undefined;
  // Other props
  otherProps: Record<string, unknown>;
}

export const useInputProps = (props: InputProps): UseInputPropsReturn => {
  const {
    label,
    placeholder,
    value,
    variant = 'default',
    size = 'md',
    state = 'default',
    textStyle,
    labelStyle,
    error,
    helperText,
    required = false,
    disabled = false,
    readonly = false,
    leftIcon,
    rightIcon,
    onLeftIconPress,
    onRightIconPress,
    containerStyle,
    labelContainerStyle,
    inputContainerStyle,
    errorContainerStyle,
    accessibilityLabel,
    accessibilityHint,
    testID,
    onFocus,
    onBlur,
    // Exclude react-hook-form props
    control: _control,
    name: _name,
    ...otherProps
  } = props;

  return useMemo(
    () => ({
      label,
      placeholder,
      value,
      variant,
      size,
      state,
      textStyle,
      labelStyle,
      error,
      helperText,
      required,
      disabled,
      readonly,
      leftIcon,
      rightIcon,
      onLeftIconPress,
      onRightIconPress,
      containerStyle,
      labelContainerStyle,
      inputContainerStyle,
      errorContainerStyle,
      accessibilityLabel,
      accessibilityHint,
      testID,
      onFocus,
      onBlur,
      control: _control,
      name: _name,
      otherProps,
    }),
    [
      label,
      placeholder,
      value,
      variant,
      size,
      state,
      textStyle,
      labelStyle,
      error,
      helperText,
      required,
      disabled,
      readonly,
      leftIcon,
      rightIcon,
      onLeftIconPress,
      onRightIconPress,
      containerStyle,
      labelContainerStyle,
      inputContainerStyle,
      errorContainerStyle,
      accessibilityLabel,
      accessibilityHint,
      testID,
      onFocus,
      onBlur,
      _control,
      _name,
      otherProps,
    ],
  );
};
