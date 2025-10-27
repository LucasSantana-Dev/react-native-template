/**
 * Input variant style functions
 *
 * Contains functions for generating input variant styles.
 */

import { InputVariantStyles } from './types';

import { theme } from '@/config/theme';

/**
 * Get input variant styles
 */
export const getInputVariantStyles = (): InputVariantStyles => ({
  default: {
    inputContainer: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    input: {
      color: theme.colors.text,
    },
  },
  outline: {
    inputContainer: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    input: {
      color: theme.colors.text,
    },
  },
  filled: {
    inputContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: 'transparent',
      borderWidth: 0,
    },
    input: {
      color: theme.colors.text,
    },
  },
});
