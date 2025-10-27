/**
 * Input render helper functions
 *
 * Contains helper functions for rendering different parts of the Input component.
 * These functions are extracted to reduce complexity and improve maintainability.
 */

import React from 'react';

import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '@/config/theme';

/**
 * Props for render functions
 */
interface RenderProps {
  label?: string;
  required?: boolean;
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  error?: string;
  helperText?: string;
  isDisabled: boolean;
  isFocused: boolean;
  inputStyles: Record<string, ViewStyle | TextStyle>;
  iconStyles: Record<string, ViewStyle | TextStyle>;
  requiredStyles: Record<string, TextStyle>;
  labelContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  errorContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  ref?: React.Ref<TextInput>;
  props?: Record<string, unknown>;
}

/**
 * Render the input label
 */
export const renderLabel = ({
  label,
  required,
  inputStyles,
  requiredStyles,
  labelContainerStyle,
  labelStyle,
}: Pick<
  RenderProps,
  'label' | 'required' | 'inputStyles' | 'requiredStyles' | 'labelContainerStyle' | 'labelStyle'
>) => {
  if (!label) return null;

  return (
    <View style={[inputStyles.labelContainer, labelContainerStyle]}>
      <Text style={[inputStyles.label, labelStyle]}>
        {label}
        {required && <Text style={requiredStyles.required}> *</Text>}
      </Text>
    </View>
  );
};

/**
 * Render the left icon
 */
export const renderLeftIcon = ({
  leftIcon,
  onLeftIconPress,
  isDisabled,
  inputStyles,
  iconStyles,
}: Pick<
  RenderProps,
  'leftIcon' | 'onLeftIconPress' | 'isDisabled' | 'inputStyles' | 'iconStyles'
>) => {
  if (!leftIcon) return null;

  const IconComponent = onLeftIconPress ? TouchableOpacity : View;

  return (
    <IconComponent
      style={[iconStyles.container, inputStyles.leftIcon]}
      onPress={onLeftIconPress}
      disabled={isDisabled}
    >
      {typeof leftIcon === 'string' ? <Text style={iconStyles.icon}>{leftIcon}</Text> : leftIcon}
    </IconComponent>
  );
};

/**
 * Render the right icon
 */
export const renderRightIcon = ({
  rightIcon,
  onRightIconPress,
  isDisabled,
  inputStyles,
  iconStyles,
}: Pick<
  RenderProps,
  'rightIcon' | 'onRightIconPress' | 'isDisabled' | 'inputStyles' | 'iconStyles'
>) => {
  if (!rightIcon) return null;

  const IconComponent = onRightIconPress ? TouchableOpacity : View;

  return (
    <IconComponent
      style={[iconStyles.container, inputStyles.rightIcon]}
      onPress={onRightIconPress}
      disabled={isDisabled}
    >
      {typeof rightIcon === 'string' ? <Text style={iconStyles.icon}>{rightIcon}</Text> : rightIcon}
    </IconComponent>
  );
};

/**
 * Render the error message
 */
export const renderErrorMessage = ({
  error,
  inputStyles,
  errorContainerStyle,
}: Pick<RenderProps, 'error' | 'inputStyles' | 'errorContainerStyle'>) => {
  if (!error) return null;

  return (
    <View style={[inputStyles.errorContainer, errorContainerStyle]}>
      <Text style={inputStyles.error}>{error}</Text>
    </View>
  );
};

/**
 * Render the helper text
 */
export const renderHelperText = ({
  helperText,
  inputStyles,
  errorContainerStyle,
}: Pick<RenderProps, 'helperText' | 'inputStyles' | 'errorContainerStyle'>) => {
  if (!helperText) return null;

  return (
    <View style={[inputStyles.errorContainer, errorContainerStyle]}>
      <Text style={inputStyles.helper}>{helperText}</Text>
    </View>
  );
};

/**
 * Render the input field
 */
export const renderInputField = ({
  ref,
  inputStyles,
  textStyle,
  placeholder,
  value,
  onChangeText,
  isDisabled,
  isFocused: _isFocused,
  onFocus,
  onBlur,
  accessibilityLabel,
  accessibilityHint,
  testID,
  props,
}: Pick<
  RenderProps,
  | 'ref'
  | 'inputStyles'
  | 'textStyle'
  | 'placeholder'
  | 'value'
  | 'onChangeText'
  | 'isDisabled'
  | 'isFocused'
  | 'onFocus'
  | 'onBlur'
  | 'accessibilityLabel'
  | 'accessibilityHint'
  | 'testID'
  | 'props'
>) => (
  <TextInput
    ref={ref}
    style={[inputStyles.input, textStyle]}
    placeholder={placeholder}
    placeholderTextColor={theme.colors.textTertiary}
    value={value}
    onChangeText={onChangeText}
    editable={!isDisabled}
    onFocus={onFocus}
    onBlur={onBlur}
    accessibilityLabel={accessibilityLabel}
    accessibilityHint={accessibilityHint}
    testID={testID}
    {...props}
  />
);
