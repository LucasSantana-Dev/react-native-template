import React from 'react';

import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

// ========== HELPER INTERFACES ==========
interface IconStyles {
  fontSize: number;
  marginHorizontal: number;
  marginRight: number;
  marginLeft: number;
  container: ViewStyle;
  icon: TextStyle;
}

interface InputStyles {
  container: ViewStyle;
  labelContainer: ViewStyle;
  label: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  error: TextStyle;
  helper: TextStyle;
  leftIcon: ViewStyle;
  rightIcon: ViewStyle;
  errorContainer: ViewStyle;
}

interface RequiredStyles {
  required: TextStyle;
}

interface RenderLabelConfig {
  label?: string;
  required: boolean;
  inputStyles: InputStyles;
  labelContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  requiredStyles: RequiredStyles;
}

interface RenderIconConfig {
  icon: string | React.ReactNode;
  onIconPress?: () => void;
  iconStyles: IconStyles;
  inputStyles: InputStyles;
  isDisabled: boolean;
}

interface RenderErrorConfig {
  error?: string;
  inputStyles: InputStyles;
  errorContainerStyle?: ViewStyle;
}

interface RenderHelperConfig {
  helperText?: string;
  inputStyles: InputStyles;
  errorContainerStyle?: ViewStyle;
}

// ========== RENDER HELPER FUNCTIONS ==========

/**
 * Renders input label with optional required indicator
 */
export const renderInputLabel = (config: RenderLabelConfig) => {
  const { label, required, inputStyles, labelContainerStyle, labelStyle, requiredStyles } = config;

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
 * Renders left icon with optional press handler
 */
export const renderInputLeftIcon = (config: RenderIconConfig) => {
  const { icon, onIconPress, iconStyles, inputStyles, isDisabled } = config;

  if (!icon) return null;

  const IconComponent = onIconPress ? TouchableOpacity : View;

  return (
    <IconComponent
      style={[iconStyles.container, inputStyles.leftIcon]}
      onPress={onIconPress}
      disabled={isDisabled}
    >
      {typeof icon === 'string' ? <Text style={iconStyles.icon}>{icon}</Text> : icon}
    </IconComponent>
  );
};

/**
 * Renders right icon with optional press handler
 */
export const renderInputRightIcon = (config: RenderIconConfig) => {
  const { icon, onIconPress, iconStyles, inputStyles, isDisabled } = config;

  if (!icon) return null;

  const IconComponent = onIconPress ? TouchableOpacity : View;

  return (
    <IconComponent
      style={[iconStyles.container, inputStyles.rightIcon]}
      onPress={onIconPress}
      disabled={isDisabled}
    >
      {typeof icon === 'string' ? <Text style={iconStyles.icon}>{icon}</Text> : icon}
    </IconComponent>
  );
};

/**
 * Renders error message
 */
export const renderInputError = (config: RenderErrorConfig) => {
  const { error, inputStyles, errorContainerStyle } = config;

  if (!error) return null;

  return (
    <View style={[inputStyles.errorContainer, errorContainerStyle]}>
      <Text style={inputStyles.error}>{error}</Text>
    </View>
  );
};

/**
 * Renders helper text
 */
export const renderInputHelper = (config: RenderHelperConfig) => {
  const { helperText, inputStyles, errorContainerStyle } = config;

  if (!helperText) return null;

  return (
    <View style={[inputStyles.errorContainer, errorContainerStyle]}>
      <Text style={inputStyles.helper}>{helperText}</Text>
    </View>
  );
};
