import { ButtonSizeStyles, ButtonStateStyles, ButtonVariantStyles, IconConfig } from './types';

import { theme } from '@/config/theme';

// ========== BUTTON VARIANT STYLES ==========
export const getButtonVariantStyles = (): ButtonVariantStyles => ({
  primary: {
    button: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0,
    },
    text: {
      color: theme.colors.white,
    },
  },
  secondary: {
    button: {
      backgroundColor: theme.colors.secondary,
      borderWidth: 0,
    },
    text: {
      color: theme.colors.white,
    },
  },
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.primary,
    },
  },
  ghost: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    text: {
      color: theme.colors.primary,
    },
  },
  danger: {
    button: {
      backgroundColor: theme.colors.error,
      borderWidth: 0,
    },
    text: {
      color: theme.colors.white,
    },
  },
});

// ========== BUTTON SIZE STYLES ==========
export const getButtonSizeStyles = (): ButtonSizeStyles => ({
  sm: {
    button: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      minHeight: 32,
    },
    text: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
    },
    icon: 16,
  },
  md: {
    button: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      minHeight: 44,
    },
    text: {
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
    },
    icon: 20,
  },
  lg: {
    button: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 52,
    },
    text: {
      fontSize: theme.typography.fontSize.lg,
      lineHeight: theme.typography.lineHeight.lg,
    },
    icon: 24,
  },
});

// ========== BUTTON STATE STYLES ==========
export const getButtonStateStyles = (): ButtonStateStyles => ({
  default: {
    button: {
      opacity: 1,
    },
    text: {
      opacity: 1,
    },
  },
  disabled: {
    button: {
      opacity: 0.5,
    },
    text: {
      opacity: 0.5,
    },
  },
  loading: {
    button: {
      opacity: 0.8,
    },
    text: {
      opacity: 0.8,
    },
  },
});

// ========== MAIN STYLE FUNCTION ==========
export const getButtonStyles = (
  variant: string,
  size: string,
  disabled: boolean,
  fullWidth: boolean = false
) => {
  const variantStyles = getButtonVariantStyles();
  const sizeStyles = getButtonSizeStyles();
  const stateStyles = getButtonStateStyles();

  const variantStyle = variantStyles[variant as keyof ButtonVariantStyles] || variantStyles.primary;
  const sizeStyle = sizeStyles[size as keyof ButtonSizeStyles] || sizeStyles.md;
  const stateStyle = disabled ? stateStyles.disabled : stateStyles.default;

  return {
    button: {
      ...variantStyle.button,
      ...sizeStyle.button,
      ...stateStyle.button,
      ...(fullWidth && { width: '100%' as const }),
      borderRadius: theme.borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    },
    text: {
      ...variantStyle.text,
      ...sizeStyle.text,
      ...stateStyle.text,
      fontWeight: theme.typography.fontWeight.semiBold,
    },
  };
};

// ========== ICON SIZE FUNCTION ==========
export const getIconSize = (size: string): number => {
  const sizeStyles = getButtonSizeStyles();
  const sizeStyle = sizeStyles[size as keyof ButtonSizeStyles] || sizeStyles.md;
  return sizeStyle.icon;
};

// ========== ICON CONFIG FUNCTION ==========
export const getIconConfig = (
  size: string,
  color?: string,
  position: 'left' | 'right' = 'left'
): IconConfig => {
  const iconSize = getIconSize(size);
  const iconColor = color || theme.colors.white;
  const margin = theme.spacing.xs;

  return {
    size: iconSize,
    color: iconColor,
    position,
    margin,
  };
};

// ========== LOADING STYLES ==========
export const getLoadingStyles = () => ({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  indicator: {
    marginRight: theme.spacing.xs,
  },
});

// ========== ICON TEXT STYLES ==========
export const getIconTextStyles = (hasIcon: boolean, iconPosition: 'left' | 'right') => {
  if (!hasIcon) return {};

  return iconPosition === 'left'
    ? { marginLeft: theme.spacing.xs }
    : { marginRight: theme.spacing.xs };
};
