import { InputSizeStyles } from './types';

import { theme } from '@/config/theme';

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
      fontSize: theme.typography.fontSize.xs,
      lineHeight: theme.typography.lineHeight.xs,
      marginBottom: theme.spacing.xs,
    },
    icon: {
      fontSize: 16,
      marginHorizontal: theme.spacing.xs,
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
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
      marginBottom: theme.spacing.sm,
    },
    icon: {
      fontSize: 18,
      marginHorizontal: theme.spacing.sm,
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
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
      marginBottom: theme.spacing.md,
    },
    icon: {
      fontSize: 20,
      marginHorizontal: theme.spacing.md,
    },
  },
});
