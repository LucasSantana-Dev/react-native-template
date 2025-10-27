import { CardSizeStyles, CardVariantStyles } from './types';

import { theme } from '@/config/theme';

// ========== CARD VARIANT STYLES ==========
export const getCardVariantStyles = (): CardVariantStyles => ({
  elevated: {
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.md,
    },
  },
  outlined: {
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  },
  flat: {
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
    },
  },
});

// ========== CARD SIZE STYLES ==========
export const getCardSizeStyles = (): CardSizeStyles => ({
  sm: {
    card: {
      padding: theme.spacing.sm,
    },
    header: {
      paddingBottom: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
    },
    body: {
      paddingVertical: theme.spacing.xs,
    },
    footer: {
      paddingTop: theme.spacing.xs,
      marginTop: theme.spacing.xs,
    },
  },
  md: {
    card: {
      padding: theme.spacing.md,
    },
    header: {
      paddingBottom: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    body: {
      paddingVertical: theme.spacing.sm,
    },
    footer: {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
  },
  lg: {
    card: {
      padding: theme.spacing.lg,
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    body: {
      paddingVertical: theme.spacing.md,
    },
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
    },
  },
});

// ========== MAIN STYLE FUNCTION ==========
export const getCardStyles = (
  variant: string,
  size: string,
  pressable: boolean = false,
  disabled: boolean = false,
) => {
  const variantStyles = getCardVariantStyles();
  const sizeStyles = getCardSizeStyles();

  const variantStyle = variantStyles[variant as keyof CardVariantStyles] || variantStyles.elevated;
  const sizeStyle = sizeStyles[size as keyof CardSizeStyles] || sizeStyles.md;

  return {
    card: {
      ...variantStyle.card,
      ...sizeStyle.card,
      ...(pressable && {
        opacity: disabled ? 0.5 : 1,
      }),
    },
    header: {
      ...sizeStyle.header,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    body: {
      ...sizeStyle.body,
    },
    footer: {
      ...sizeStyle.footer,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
  };
};

// ========== PRESSABLE CARD STYLES ==========
export const getPressableCardStyles = (pressed: boolean) => ({
  card: {
    transform: [{ scale: pressed ? 0.98 : 1 }],
    opacity: pressed ? 0.9 : 1,
  },
});
