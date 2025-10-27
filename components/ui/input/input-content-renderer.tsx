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

interface InputContentRendererProps<T extends FieldValues>
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
export const renderInputContent = ({
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
  children,
  error,
  helperText,
  isFocused,
  state,
  inputProps,
  handleFocus,
  handleBlur,
  ref,
}: InputContentRendererProps<FieldValues>) => {
  return (
    <View style={inputStyles.container}>
      {/* Label */}
      {renderLabel({
        label,
        required,
        labelStyle,
        labelContainerStyle,
        requiredStyles,
      })}

      {/* Input Container */}
      <View style={[inputStyles.inputContainer, inputContainerStyle]}>
        {/* Left Icon */}
        {renderLeftIcon({
          leftIcon,
          onLeftIconPress,
          iconStyles,
          isDisabled,
        })}

        {/* Input Field */}
        {renderInputField({
          inputProps,
          inputStyles,
          isFocused,
          isDisabled,
          state,
          handleFocus,
          handleBlur,
          ref,
        })}

        {/* Right Icon */}
        {renderRightIcon({
          rightIcon,
          onRightIconPress,
          iconStyles,
          isDisabled,
        })}

        {/* Children (for custom content) */}
        {children}
      </View>

      {/* Error Message */}
      {renderErrorMessage({ error, inputStyles })}

      {/* Helper Text */}
      {renderHelperText({ helperText, inputStyles })}
    </View>
  );
};

// Helper function to render input with React Hook Form Controller
export const renderInputWithController = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  inputStyles,
  iconStyles,
  requiredStyles,
  isFocused,
  isDisabled,
  handleFocus,
  handleBlur,
  ref,
  ...inputProps
}: InputContentRendererProps<T> & {
  name: string;
  control: unknown;
  rules?: unknown;
  defaultValue?: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={inputStyles.container}>
          {/* Label */}
          {renderLabel({
            label: inputProps.label,
            required: inputProps.required,
            labelStyle: inputProps.labelStyle,
            labelContainerStyle: inputProps.labelContainerStyle,
            requiredStyles,
          })}

          {/* Input Container */}
          <View style={[inputStyles.inputContainer, inputProps.inputContainerStyle]}>
            {/* Left Icon */}
            {renderLeftIcon({
              leftIcon: inputProps.leftIcon,
              onLeftIconPress: inputProps.onLeftIconPress,
              iconStyles,
              isDisabled,
            })}

            {/* Input Field */}
            {renderInputField({
              inputProps: {
                ...inputProps,
                onChangeText: onChange,
                onBlur,
                value,
              },
              inputStyles,
              isFocused,
              isDisabled,
              state: inputProps.state,
              handleFocus,
              handleBlur,
              ref,
            })}

            {/* Right Icon */}
            {renderRightIcon({
              rightIcon: inputProps.rightIcon,
              onRightIconPress: inputProps.onRightIconPress,
              iconStyles,
              isDisabled,
            })}

            {/* Children (for custom content) */}
            {inputProps.children}
          </View>

          {/* Error Message */}
          {renderErrorMessage({ error: error?.message || inputProps.error, inputStyles })}

          {/* Helper Text */}
          {renderHelperText({ helperText: inputProps.helperText, inputStyles })}
        </View>
      )}
    />
  );
};
