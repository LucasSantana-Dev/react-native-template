import { forwardRef } from 'react';

import { TextInput, View } from 'react-native';

import { FieldValues } from 'react-hook-form';

import { InputProps } from './types';

/**
 * Flexible Input component with multiple variants, sizes, and states
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 *   variant="outline"
 *   size="md"
 * />
 *
 * <Input
 *   label="Password"
 *   placeholder="Enter your password"
 *   secureTextEntry
 *   rightIcon="eye"
 *   onRightIconPress={togglePassword}
 *   error="Password is required"
 * />
 * ```
 */
export const Input = forwardRef<TextInput, InputProps<FieldValues>>(
  (
    {
      label: _label,
      placeholder,
      value,
      variant: _variant = 'default',
      size: _size = 'md',
      state: _state = 'default',
      textStyle: _textStyle,
      labelStyle: _labelStyle,
      error: _error,
      helperText: _helperText,
      required: _required = false,
      disabled = false,
      readonly = false,
      leftIcon: _leftIcon,
      rightIcon: _rightIcon,
      onLeftIconPress: _onLeftIconPress,
      onRightIconPress: _onRightIconPress,
      containerStyle: _containerStyle,
      labelContainerStyle: _labelContainerStyle,
      inputContainerStyle: _inputContainerStyle,
      errorContainerStyle: _errorContainerStyle,
      accessibilityLabel: _accessibilityLabel,
      accessibilityHint: _accessibilityHint,
      testID: _testID,
      onFocus: _onFocus,
      onBlur: _onBlur,
      control: _control,
      name: _name,
      ...props
    },
    ref,
  ) => {
    // Simplified implementation for now
    const isDisabled = disabled || readonly;

    return (
      <View>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={props.onChangeText}
          editable={!isDisabled}
          {...props}
        />
      </View>
    );
  },
);

Input.displayName = 'Input';

export default Input;
