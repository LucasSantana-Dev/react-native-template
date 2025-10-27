import { forwardRef, useState } from 'react';

import {
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { getIconStyles, getInputStyles, getRequiredLabelStyles } from './styles';
import { InputProps } from './types';

import { theme } from '@/config/theme';

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
export const Input = forwardRef<TextInput, InputProps>(({
  label,
  placeholder,
  value,
  variant = 'default',
  size = 'md',
  state = 'default',
  style,
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
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine input state
  const inputState = error ? 'error' : isFocused ? 'focused' : state;
  const isDisabled = disabled || readonly;

  // Get input styles
  const inputStyles = getInputStyles(
    variant,
    size,
    inputState,
    isDisabled,
    readonly,
    Boolean(leftIcon),
    Boolean(rightIcon)
  );

  const iconStyles = getIconStyles('left');
  const requiredStyles = getRequiredLabelStyles();

  // Handle focus events
  const handleFocus = (event: any) => {
    if (isDisabled) return;
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: any) => {
    if (isDisabled) return;
    setIsFocused(false);
    onBlur?.(event);
  };

  // Render label
  const renderLabel = () => {
    if (!label) return null;

    return (
      <View style={[inputStyles.labelContainer, labelContainerStyle]}>
        <Text style={[inputStyles.label, labelStyle]}>
          {label}
          {required && (
            <Text style={requiredStyles.required}> *</Text>
          )}
        </Text>
      </View>
    );
  };

  // Render left icon
  const renderLeftIcon = () => {
    if (!leftIcon) return null;

    const IconComponent = onLeftIconPress ? TouchableOpacity : View;

    return (
      <IconComponent
        style={[iconStyles.container, inputStyles.leftIcon]}
        onPress={onLeftIconPress}
        disabled={isDisabled}
      >
        {typeof leftIcon === 'string' ? (
          <Text style={iconStyles.icon}>{leftIcon}</Text>
        ) : (
          leftIcon
        )}
      </IconComponent>
    );
  };

  // Render right icon
  const renderRightIcon = () => {
    if (!rightIcon) return null;

    const IconComponent = onRightIconPress ? TouchableOpacity : View;

    return (
      <IconComponent
        style={[iconStyles.container, inputStyles.rightIcon]}
        onPress={onRightIconPress}
        disabled={isDisabled}
      >
        {typeof rightIcon === 'string' ? (
          <Text style={iconStyles.icon}>{rightIcon}</Text>
        ) : (
          rightIcon
        )}
      </IconComponent>
    );
  };

  // Render error message
  const renderError = () => {
    if (!error) return null;

    return (
      <View style={[inputStyles.errorContainer, errorContainerStyle]}>
        <Text style={inputStyles.error}>{error}</Text>
      </View>
    );
  };

  // Render helper text
  const renderHelper = () => {
    if (!helperText) return null;

    return (
      <View style={[inputStyles.errorContainer, errorContainerStyle]}>
        <Text style={inputStyles.helper}>{helperText}</Text>
      </View>
    );
  };

  return (
    <View style={[inputStyles.container, containerStyle]}>
      {renderLabel()}

      <View style={[inputStyles.inputContainer, inputContainerStyle]}>
        {renderLeftIcon()}

        <TextInput
          ref={ref}
          style={[inputStyles.input, textStyle]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          value={value}
          editable={!isDisabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={accessibilityHint}
          testID={testID}
          {...props}
        />

        {renderRightIcon()}
      </View>

      {renderError()}
      {renderHelper()}
    </View>
  );
});

Input.displayName = 'Input';

export default Input;
