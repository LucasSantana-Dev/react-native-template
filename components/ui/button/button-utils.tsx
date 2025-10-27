/**
 * Button utility functions
 *
 * Contains utility functions for button styling and state management.
 * These functions are separated to reduce file length and improve maintainability.
 */

import React from 'react';

import { prepareButtonContentProps } from './button-helpers';
import { getButtonStyles, getIconConfig, getLoadingStyles } from './styles';
import { ButtonProps } from './types';

/**
 * Get button variant styles helper
 */
export const getButtonVariantStyles = (variant: string, isDisabled: boolean) => {
  // This would contain the logic for determining button styles based on variant
  // For now, we'll return a placeholder
  return (
    {
      primary: {
        backgroundColor: isDisabled ? '#ccc' : '#007AFF',
        borderColor: isDisabled ? '#ccc' : '#007AFF',
      },
      secondary: {
        backgroundColor: isDisabled ? '#f0f0f0' : 'transparent',
        borderColor: isDisabled ? '#ccc' : '#007AFF',
      },
      danger: {
        backgroundColor: isDisabled ? '#ccc' : '#FF3B30',
        borderColor: isDisabled ? '#ccc' : '#FF3B30',
      },
    }[variant] || {}
  );
};

/**
 * Get button state helper
 */
export const getButtonState = (
  disabled: boolean,
  loading: boolean,
  state: string,
): { isDisabled: boolean } => {
  const isDisabled = disabled || loading || state === 'disabled';
  return { isDisabled };
};

/**
 * Determine if button should render text
 */
export const shouldRenderText = (
  rawChildren: boolean,
  children: React.ReactNode,
  forceIcon: boolean,
): boolean => {
  return Boolean(!rawChildren && children && !forceIcon);
};

/**
 * Determine if button has an icon
 */
export const hasButtonIcon = (icon: string | React.ReactNode | undefined): boolean => {
  return Boolean(icon);
};

/**
 * Create button press handler to reduce complexity
 */
export const createButtonPressHandler = (
  isDisabled: boolean,
  loading: boolean,
  onPress?: (event: unknown) => void,
) => {
  return (event: unknown) => {
    if (isDisabled || loading) return;
    onPress?.(event);
  };
};

/**
 * Create button style configuration to reduce complexity
 */
export const createButtonStyleConfig = ({
  variant,
  size,
  isDisabled,
  fullWidth,
  iconColor,
  iconPosition,
}: {
  variant: string;
  size: string;
  isDisabled: boolean;
  fullWidth: boolean;
  iconColor?: string;
  iconPosition?: string;
}) => {
  const buttonStyles = getButtonStyles(variant, size, isDisabled, fullWidth);
  const iconConfig = hasButtonIcon(iconColor)
    ? getIconConfig(size, iconColor, iconPosition as 'left' | 'right')
    : null;
  const loadingStyles = getLoadingStyles();

  return { buttonStyles, iconConfig, loadingStyles };
};

/**
 * Create button component props to reduce complexity
 */
export const createButtonProps = ({
  variant,
  size,
  state,
  textStyle,
  icon,
  iconSize,
  iconColor,
  iconPosition,
  loading,
  disabled,
  fullWidth,
  forceIcon,
  rawChildren,
  onPress,
  ...restProps
}: ButtonProps) => {
  const isDisabled = Boolean(disabled || loading || state === 'disabled');
  const hasText = Boolean(!rawChildren && restProps.children && !forceIcon);
  const hasIcon = Boolean(icon);

  const { buttonStyles, iconConfig, loadingStyles } = createButtonStyleConfig({
    variant: variant || 'primary',
    size: size || 'md',
    isDisabled,
    fullWidth: fullWidth || false,
    iconColor,
    iconPosition,
  });

  const buttonContentProps = prepareButtonContentProps({
    icon,
    iconSize,
    iconColor,
    iconPosition,
    children: restProps.children,
    loading,
    hasText,
    hasIcon,
    rawChildren,
    buttonStyles,
    iconConfig: (iconConfig || {}) as Record<string, unknown>,
    loadingStyles,
    textStyle: (textStyle || {}) as Record<string, unknown>,
  });

  return {
    isDisabled,
    hasText,
    hasIcon,
    buttonStyles,
    iconConfig,
    loadingStyles,
    buttonContentProps,
    handlePress: createButtonPressHandler(
      isDisabled,
      Boolean(loading),
      onPress as (event: unknown) => void,
    ),
  };
};
