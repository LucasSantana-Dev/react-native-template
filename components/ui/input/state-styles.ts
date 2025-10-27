/**
 * Input state style functions
 *
 * Contains functions for generating input state styles.
 */

import { InputStateStyles } from './types';

import { theme } from '@/config/theme';

/**
 * Get input state styles
 */
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
      borderWidth: 2,
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
      borderWidth: 2,
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
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.colors.borderLight,
    },
    input: {
      color: theme.colors.textDisabled,
    },
    label: {
      color: theme.colors.textDisabled,
    },
  },
});
