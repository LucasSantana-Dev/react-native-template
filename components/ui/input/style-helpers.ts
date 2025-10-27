/**
 * Input style helper functions
 *
 * Contains internal helper functions for generating input styles.
 * These functions are used by the main styles.ts file to reduce
 * complexity and improve maintainability.
 */

import { getInputSizeStyles } from './size-styles';
import { getInputStateStyles } from './state-styles';
import { InputSizeStyles, InputStateStyles, InputVariantStyles } from './types';
import { getInputVariantStyles } from './variant-styles';

import { theme } from '@/config/theme';

/**
 * Configuration interface for input container styles
 */
export interface InputContainerConfig {
  variant: string;
  size: string;
  state: string;
  disabled: boolean;
  readonly: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}

// Re-export the main style functions for backward compatibility
export { getInputSizeStyles, getInputStateStyles, getInputVariantStyles };

/**
 * Get base input container styles
 */
export const getBaseInputContainerStyles = (config: InputContainerConfig) => {
  const variantStyles = getInputVariantStyles();
  const sizeStyles = getInputSizeStyles();
  const stateStyles = getInputStateStyles();

  const variant =
    variantStyles[config.variant as keyof InputVariantStyles] || variantStyles.default;
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;
  const state = stateStyles[config.state as keyof InputStateStyles] || stateStyles.default;

  return {
    ...variant.inputContainer,
    ...size.inputContainer,
    ...state.inputContainer,
  };
};

/**
 * Get input text styles
 */
export const getInputTextStyles = (config: InputContainerConfig) => {
  const variantStyles = getInputVariantStyles();
  const sizeStyles = getInputSizeStyles();
  const stateStyles = getInputStateStyles();

  const variant =
    variantStyles[config.variant as keyof InputVariantStyles] || variantStyles.default;
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;
  const state = stateStyles[config.state as keyof InputStateStyles] || stateStyles.default;

  return {
    ...variant.input,
    ...size.input,
    ...state.input,
  };
};

/**
 * Get placeholder styles
 */
export const getPlaceholderStyles = (config: InputContainerConfig) => {
  const sizeStyles = getInputSizeStyles();
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;

  return {
    ...size.input,
    color: theme.colors.textSecondary,
  };
};

/**
 * Get left icon styles
 */
export const getLeftIconStyles = (config: InputContainerConfig) => {
  const sizeStyles = getInputSizeStyles();
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;

  return {
    ...size.icon,
    color: theme.colors.textSecondary,
  };
};

/**
 * Get right icon styles
 */
export const getRightIconStyles = (config: InputContainerConfig) => {
  const sizeStyles = getInputSizeStyles();
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;

  return {
    ...size.icon,
    color: theme.colors.textSecondary,
  };
};

/**
 * Get label styles
 */
export const getLabelStyles = (config: InputContainerConfig) => {
  const sizeStyles = getInputSizeStyles();
  const stateStyles = getInputStateStyles();
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;
  const state = stateStyles[config.state as keyof InputStateStyles] || stateStyles.default;

  return {
    ...size.label,
    ...state.label,
  };
};

/**
 * Get error styles
 */
export const getErrorStyles = (config: InputContainerConfig) => {
  const sizeStyles = getInputSizeStyles();
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;

  return {
    ...size.label,
    color: theme.colors.error,
  };
};

/**
 * Get helper styles
 */
export const getHelperStyles = (config: InputContainerConfig) => {
  const sizeStyles = getInputSizeStyles();
  const size = sizeStyles[config.size as keyof InputSizeStyles] || sizeStyles.md;

  return {
    ...size.label,
    color: theme.colors.textSecondary,
  };
};

/**
 * Get icon container styles
 */
export const getIconContainerStyles = () => {
  return {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  };
};
