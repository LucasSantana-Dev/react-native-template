import React from 'react';

import { TouchableOpacity } from 'react-native';

import { prepareButtonContentProps, renderButtonContent } from './button-helpers';
import {
  createButtonPressHandler,
  createButtonStyleConfig,
  getButtonState,
  hasButtonIcon,
  shouldRenderText,
} from './button-utils';
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
export const Button: React.FC<ButtonProps> = props => {
  const {
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
    ...restProps
  } = props;

  // Get button state using helper
  const { isDisabled } = getButtonState(disabled, loading, state);

  // Determine if we have text content using helper
  const hasText = shouldRenderText(rawChildren, children, forceIcon);

  // Determine if we have an icon using helper
  const hasIcon = hasButtonIcon(icon);

  // Get button style configuration
  const { buttonStyles, iconConfig, loadingStyles } = createButtonStyleConfig({
    variant,
    size,
    isDisabled,
    fullWidth,
    iconColor,
    iconPosition,
  });

  // Handle press events
  const handlePress = createButtonPressHandler(isDisabled, loading, onPress);

  // Prepare button content props
  const buttonContentProps = prepareButtonContentProps({
    icon,
    iconSize: _iconSize,
    iconColor,
    iconPosition,
    children,
    loading,
    hasText,
    hasIcon,
    rawChildren,
    buttonStyles,
    iconConfig,
    loadingStyles,
    textStyle,
  });

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
      {...restProps}
    >
      {renderButtonContent(buttonContentProps)}
    </TouchableOpacity>
  );
};

export default Button;
