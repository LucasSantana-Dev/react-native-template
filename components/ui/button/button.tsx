import React from 'react';

import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import {
  getButtonState,
  hasButtonIcon,
  renderButtonContent,
  shouldRenderText,
} from './button-helpers';
import { getButtonStyles, getIconConfig, getLoadingStyles } from './styles';
import { ButtonProps } from './types';

/**
 * Production-ready Button component with multiple variants, sizes, and states
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={handlePress}>
 *   Click me
 * </Button>
 *
 * <Button variant="outline" size="lg" icon="add" iconPosition="left">
 *   Add Item
 * </Button>
 *
 * <Button variant="danger" size="sm" loading disabled>
 *   Delete
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  state = 'default',
  style,
  textStyle,
  icon,
  iconSize: _iconSize,
  iconColor,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  forceIcon = false,
  rawChildren = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
  onPress,
  ...props
}) => {
  // Get button state using helper
  const { isDisabled } = getButtonState(disabled, loading, state);

  // Determine if we have text content using helper
  const hasText = shouldRenderText(rawChildren, children, forceIcon);

  // Determine if we have an icon using helper
  const hasIcon = hasButtonIcon(icon);

  // Get button styles
  const buttonStyles = getButtonStyles(variant, size, isDisabled, fullWidth);

  // Get icon configuration
  const iconConfig = hasIcon ? getIconConfig(size, iconColor, iconPosition) : null;

  // Get loading styles
  const loadingStyles = getLoadingStyles();

  // Handle press events
  const handlePress = (event: GestureResponderEvent) => {
    if (isDisabled || loading) return;
    onPress?.(event);
  };

  // Prepare button content props
  const buttonContentProps = {
    icon,
    iconSize: _iconSize,
    iconColor,
    iconPosition,
    children,
    loading: Boolean(loading),
    hasText,
    hasIcon,
    rawChildren,
    buttonStyles,
    iconConfig: (iconConfig || {}) as Record<string, unknown>,
    loadingStyles,
    textStyle: (textStyle || {}) as Record<string, unknown>,
  };

  return (
    <TouchableOpacity
      style={[buttonStyles.button, style]}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      testID={testID}
      {...props}
    >
      {renderButtonContent(buttonContentProps)}
    </TouchableOpacity>
  );
};

export default Button;
