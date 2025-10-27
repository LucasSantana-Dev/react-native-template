import {
  getBaseInputContainerStyles,
  getErrorStyles,
  getHelperStyles,
  getIconContainerStyles,
  getInputTextStyles,
  getLabelStyles,
  type InputContainerConfig,
} from './style-helpers';

import { theme } from '@/config/theme';

// ========== MAIN STYLE FUNCTION ==========
export const getInputStyles = (config: InputContainerConfig) => {
  return {
    container: {
      marginBottom: theme.spacing.sm,
    },
    labelContainer: {
      marginBottom: theme.spacing.xs,
    },
    label: getLabelStyles(config),
    inputContainer: getBaseInputContainerStyles(config),
    input: getInputTextStyles(config),
    leftIcon: {
      marginRight: theme.spacing.sm,
    },
    rightIcon: {
      marginLeft: theme.spacing.sm,
    },
    errorContainer: {
      marginTop: theme.spacing.xs,
    },
    error: getErrorStyles(config),
    helper: getHelperStyles(config),
  };
};

// ========== ICON STYLES ==========
export const getIconStyles = () => ({
  container: getIconContainerStyles(),
  icon: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
});

// ========== REQUIRED LABEL STYLES ==========
export const getRequiredLabelStyles = () => ({
  required: {
    color: theme.colors.error,
    marginLeft: 2,
  },
});

// Re-export helper functions for backward compatibility
export {
  getInputSizeStyles,
  getInputStateStyles,
  getInputVariantStyles,
  type InputContainerConfig,
} from './style-helpers';
