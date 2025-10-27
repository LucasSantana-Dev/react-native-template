/**
 * Input size style functions
 *
 * Contains functions for generating input size styles.
 */

import { InputSizeStyles } from './types';

/**
 * Get input size styles
 */
export const getInputSizeStyles = (): InputSizeStyles => ({
  sm: {
    inputContainer: {
      height: 40,
      paddingHorizontal: 12,
      borderRadius: 6,
    },
    input: {
      fontSize: 14,
      lineHeight: 20,
    },
    label: {
      fontSize: 12,
      lineHeight: 16,
      marginBottom: 4,
    },
    icon: {
      fontSize: 16,
    },
  },
  md: {
    inputContainer: {
      height: 48,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    input: {
      fontSize: 16,
      lineHeight: 24,
    },
    label: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 6,
    },
    icon: {
      fontSize: 18,
    },
  },
  lg: {
    inputContainer: {
      height: 56,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    input: {
      fontSize: 18,
      lineHeight: 28,
    },
    label: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 8,
    },
    icon: {
      fontSize: 20,
    },
  },
});
