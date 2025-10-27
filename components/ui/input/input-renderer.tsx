import React from 'react';

import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Controller, FieldValues } from 'react-hook-form';

import {
  renderErrorMessage,
  renderHelperText,
  renderInputField,
  renderLabel,
  renderLeftIcon,
  renderRightIcon,
} from './render-helpers';
import { InputProps } from './types';

interface InputRendererProps<T extends FieldValues>
  extends Omit<InputProps<T>, 'onFocus' | 'onBlur'> {
  inputStyles: Record<string, ViewStyle | TextStyle>;
  iconStyles: { container: ViewStyle; icon: TextStyle };
  requiredStyles: Record<string, TextStyle>;
  isFocused: boolean;
  isDisabled: boolean;
  handleFocus: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  ref: React.Ref<TextInput>;
}

// Helper function to render common input content
const renderInputContent = ({
  label,
  required,
  labelStyle,
  labelContainerStyle,
  requiredStyles,
  inputStyles,
  inputContainerStyle,
  leftIcon,
  onLeftIconPress,
  iconStyles,
  isDisabled,
  rightIcon,
  onRightIconPress,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
  testID,
  ref,
  props,
  error,
  errorContainerStyle,
  helperText,
}: {
  label?: string;
  required: boolean;
  labelStyle?: TextStyle;
  labelContainerStyle?: ViewStyle;
  requiredStyles: Record<string, TextStyle>;
  inputStyles: Record<string, ViewStyle | TextStyle>;
  inputContainerStyle?: ViewStyle;
  leftIcon?: string | React.ReactNode;
  onLeftIconPress?: () => void;
  iconStyles: { container: ViewStyle; icon: TextStyle };
  isDisabled: boolean;
  rightIcon?: string | React.ReactNode;
  onRightIconPress?: () => void;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  onFocus: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  ref: React.Ref<TextInput>;
  props: Record<string, unknown>;
  error?: string;
  errorContainerStyle?: ViewStyle;
  helperText?: string;
}) => (
  <>
    {renderLabel({
      label,
      required,
      labelStyle,
      labelContainerStyle,
      requiredStyles,
      inputStyles,
    })}
    <View style={[inputStyles.inputContainer, inputContainerStyle]}>
      {renderLeftIcon({
        leftIcon,
        onLeftIconPress,
        iconStyles,
        isDisabled,
        inputStyles,
      })}
      {renderInputField({
        placeholder,
        value,
        onChangeText,
        onFocus,
        onBlur,
        textStyle,
        accessibilityLabel,
        accessibilityHint,
        testID,
        isDisabled,
        ref,
        props,
        inputStyles,
      })}
      {renderRightIcon({
        rightIcon,
        onRightIconPress,
        iconStyles,
        isDisabled,
        inputStyles,
      })}
    </View>
    {renderErrorMessage({
      error,
      errorContainerStyle,
      inputStyles,
    })}
    {renderHelperText({
      helperText,
      errorContainerStyle,
      inputStyles,
    })}
  </>
);

export const InputRenderer = <T extends FieldValues>({
  label,
  placeholder,
  value,
  variant: _variant = 'default',
  size: _size = 'md',
  state: _state = 'default',
  textStyle,
  labelStyle,
  error,
  helperText,
  required = false,
  disabled: _disabled = false,
  readonly: _readonly = false,
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
  control,
  name,
  inputStyles,
  iconStyles,
  requiredStyles,
  isFocused: _isFocused,
  isDisabled,
  handleFocus,
  handleBlur,
  ref,
  ...props
}: InputRendererProps<T>) => {
  // If using react-hook-form control
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value: fieldValue } }) => (
          <View style={[inputStyles.container, containerStyle]}>
            {renderInputContent({
              label,
              required,
              labelStyle,
              labelContainerStyle,
              requiredStyles,
              inputStyles,
              inputContainerStyle,
              leftIcon,
              onLeftIconPress,
              iconStyles,
              isDisabled,
              rightIcon,
              onRightIconPress,
              placeholder,
              value: fieldValue || '',
              onChangeText: onChange,
              onFocus: handleFocus,
              onBlur: (event) => {
                onBlur();
                handleBlur(event);
              },
              textStyle,
              accessibilityLabel,
              accessibilityHint,
              testID,
              ref,
              props,
              error,
              errorContainerStyle,
              helperText,
            })}
          </View>
        )}
      />
    );
  }

  // Regular input without react-hook-form
  return (
    <View style={[inputStyles.container, containerStyle]}>
      {renderInputContent({
        label,
        required,
        labelStyle,
        labelContainerStyle,
        requiredStyles,
        inputStyles,
        inputContainerStyle,
        leftIcon,
        onLeftIconPress,
        iconStyles,
        isDisabled,
        rightIcon,
        onRightIconPress,
        placeholder,
        value: value || '',
        onChangeText: props.onChangeText,
        onFocus: handleFocus,
        onBlur: handleBlur,
        textStyle,
        accessibilityLabel,
        accessibilityHint,
        testID,
        ref,
        props,
        error,
        errorContainerStyle,
        helperText,
      })}
    </View>
  );
};
