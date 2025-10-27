import React, { createContext, useContext, useState } from 'react';

import { useColorScheme } from 'react-native';

import { theme } from '@/config/theme';
import { ColorScheme, ThemeContextType, ThemeMode } from '@/types/theme';

// Remove duplicate interface - using imported one

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

// Theme provider component
export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultTheme);

  // Determine actual color scheme
  const colorScheme: ColorScheme =
    themeMode === 'system' ? systemColorScheme || 'light' : themeMode;

  const isDark = colorScheme === 'dark';

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Context value
  const value: ThemeContextType = {
    themeMode,
    colorScheme,
    isDark,
    setThemeMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

// Hook to get theme-aware colors
export function useThemeColors() {
  const { isDark } = useTheme();

  // Return colors based on theme mode
  return isDark
    ? {
        ...theme.colors,
        // Override specific colors for dark mode if needed
      }
    : {
        ...theme.colors,
        // Override specific colors for light mode if needed
        background: '#FFFFFF',
        surface: '#FFFFFF',
        text: '#000000',
        textSecondary: '#6D6D70',
        textTertiary: '#8E8E93',
        border: '#C6C6C8',
        borderLight: '#E5E5EA',
      };
}

// Hook to get theme-aware styles
export function useThemeStyles() {
  const colors = useThemeColors();

  return {
    // Container styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    containerSecondary: {
      flex: 1,
      backgroundColor: colors.backgroundDark,
    },

    // Card styles
    card: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      ...theme.shadows.md,
    },
    cardElevated: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      ...theme.shadows.lg,
    },
    cardOutlined: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },

    // Text styles
    text: {
      color: colors.text,
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
    },
    textSecondary: {
      color: colors.textSecondary,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
    },
    textTertiary: {
      color: colors.textTertiary,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
    },
    textDisabled: {
      color: colors.textDisabled,
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
    },

    // Button styles
    button: {
      backgroundColor: colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },
    buttonSecondary: {
      backgroundColor: colors.secondary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.semiBold,
    },
    buttonTextOutline: {
      color: colors.primary,
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.semiBold,
    },

    // Input styles
    input: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.typography.fontSize.md,
      color: colors.text,
      minHeight: 44,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    inputError: {
      borderColor: colors.error,
      borderWidth: 2,
    },
    inputDisabled: {
      backgroundColor: colors.backgroundLight,
      borderColor: colors.borderLight,
      color: colors.textDisabled,
    },

    // Divider styles
    divider: {
      height: 1,
      backgroundColor: colors.divider,
      marginVertical: theme.spacing.md,
    },
    dividerVertical: {
      width: 1,
      backgroundColor: colors.divider,
      marginHorizontal: theme.spacing.md,
    },

    // Header styles
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    headerTitle: {
      color: colors.text,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semiBold,
    },

    // Layout styles
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
  };
}
