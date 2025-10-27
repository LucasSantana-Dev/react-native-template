import { InputVariantStyles } from './types';

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
