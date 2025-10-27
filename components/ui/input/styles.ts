import { InputSizeStyles, InputStateStyles, InputVariantStyles } from './types';

import { theme } from '@/config/theme';

// ========== INPUT VARIANT STYLES ==========
export const getInputVariantStyles = (): InputVariantStyles => ({
  default: {
    inputContainer: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    input: {
      color: theme.colors.text,
    },
  },
  outline: {
    inputContainer: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    input: {
      color: theme.colors.text,
    },
  },
  filled: {
    inputContainer: {
      backgroundColor: theme.colors.backgroundLight,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.border,
    },
    input: {
      color: theme.colors.text,
    },
  },
});

// ========== INPUT SIZE STYLES ==========
export const getInputSizeStyles = (): InputSizeStyles => ({
  sm: {
    inputContainer: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      minHeight: 36,
    },
    input: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
    },
    label: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
    },
    icon: {
      fontSize: 16,
    },
  },
  md: {
    inputContainer: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      minHeight: 44,
    },
    input: {
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
    },
    label: {
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
    },
    icon: {
      fontSize: 18,
    },
  },
  lg: {
    inputContainer: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 52,
    },
    input: {
      fontSize: theme.typography.fontSize.lg,
      lineHeight: theme.typography.lineHeight.lg,
    },
    label: {
      fontSize: theme.typography.fontSize.lg,
      lineHeight: theme.typography.lineHeight.lg,
    },
    icon: {
      fontSize: 20,
    },
  },
});

// ========== INPUT STATE STYLES ==========
export const getInputStateStyles = (): InputStateStyles => ({
  default: {
    inputContainer: {
      borderColor: theme.colors.border,
    },
    input: {
      color: theme.colors.text,
    },
    label: {
      color: theme.colors.text,
    },
  },
  focused: {
    inputContainer: {
      borderColor: theme.colors.primary,
      ...theme.shadows.sm,
    },
    input: {
      color: theme.colors.text,
    },
    label: {
      color: theme.colors.primary,
    },
  },
  error: {
    inputContainer: {
      borderColor: theme.colors.error,
    },
    input: {
      color: theme.colors.text,
    },
    label: {
      color: theme.colors.error,
    },
  },
  disabled: {
    inputContainer: {
      backgroundColor: theme.colors.backgroundLight,
      borderColor: theme.colors.borderLight,
      opacity: 0.6,
    },
    input: {
      color: theme.colors.textDisabled,
    },
    label: {
      color: theme.colors.textDisabled,
    },
  },
});

// ========== MAIN STYLE FUNCTION ==========
export const getInputStyles = (
  variant: string,
  size: string,
  state: string,
  disabled: boolean = false,
  readonly: boolean = false,
  hasLeftIcon: boolean = false,
  hasRightIcon: boolean = false
) => {
  const variantStyles = getInputVariantStyles();
  const sizeStyles = getInputSizeStyles();
  const stateStyles = getInputStateStyles();

  const variantStyle = variantStyles[variant as keyof InputVariantStyles] || variantStyles.default;
  const sizeStyle = sizeStyles[size as keyof InputSizeStyles] || sizeStyles.md;
  const stateStyle = stateStyles[state as keyof InputStateStyles] || stateStyles.default;

  return {
    container: {
      marginBottom: theme.spacing.sm,
    },
    labelContainer: {
      marginBottom: theme.spacing.xs,
    },
    label: {
      ...sizeStyle.label,
      color: theme.colors.text,
      fontWeight: theme.typography.fontWeight.medium,
    },
    inputContainer: {
      ...variantStyle.inputContainer,
      ...sizeStyle.inputContainer,
      ...stateStyle.inputContainer,
      ...(disabled && stateStyles.disabled.inputContainer),
      ...(readonly && { backgroundColor: theme.colors.backgroundLight }),
      borderRadius: theme.borderRadius.md,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      ...(hasLeftIcon && { paddingLeft: theme.spacing.sm }),
      ...(hasRightIcon && { paddingRight: theme.spacing.sm }),
    },
    input: {
      ...variantStyle.input,
      ...sizeStyle.input,
      ...stateStyle.input,
      ...(disabled && stateStyles.disabled.input),
      flex: 1,
    },
    leftIcon: {
      marginRight: theme.spacing.sm,
    },
    rightIcon: {
      marginLeft: theme.spacing.sm,
    },
    errorContainer: {
      marginTop: theme.spacing.xs,
    },
    error: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.error,
      lineHeight: theme.typography.lineHeight.sm,
    },
    helper: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.textSecondary,
      lineHeight: theme.typography.lineHeight.sm,
    },
  };
};

// ========== ICON STYLES ==========
export const getIconStyles = (position: 'left' | 'right') => ({
  container: {
    ...(position === 'left' && { marginRight: theme.spacing.sm }),
    ...(position === 'right' && { marginLeft: theme.spacing.sm }),
  },
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
