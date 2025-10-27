import { InputStateStyles } from './types';

import { theme } from '@/config/theme';

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
      color: theme.colors.textSecondary,
    },
  },
  focused: {
    inputContainer: {
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
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
      backgroundColor: `${theme.colors.error}10`,
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
