import React from 'react';

import { StatusBar, Text, TextStyle, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/config/theme';
import { useThemeColors } from '@/context/theme-context';

// ========== HEADER LAYOUT PROPS ==========
export interface HeaderLayoutProps {
  /** Header title */
  title?: string;

  /** Header subtitle */
  subtitle?: string;

  /** Left action */
  leftAction?: React.ReactNode;

  /** Right action */
  rightAction?: React.ReactNode;

  /** Custom header style */
  style?: ViewStyle;

  /** Custom title style */
  titleStyle?: TextStyle;

  /** Custom subtitle style */
  subtitleStyle?: TextStyle;

  /** Background color */
  backgroundColor?: string;

  /** Whether to show status bar */
  showStatusBar?: boolean;

  /** Status bar style */
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';

  /** Whether to use safe area */
  safeArea?: boolean;

  /** Test ID */
  testID?: string;
}

/**
 * Header layout component with title, actions, and status bar support
 *
 * @example
 * ```tsx
 * <HeaderLayout
 *   title="Settings"
 *   leftAction={<BackButton />}
 *   rightAction={<SettingsButton />}
 * />
 *
 * <HeaderLayout
 *   title="Profile"
 *   subtitle="Manage your account"
 *   backgroundColor="#f0f0f0"
 * />
 * ```
 */
export const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  style,
  titleStyle,
  subtitleStyle,
  backgroundColor,
  showStatusBar = true,
  statusBarStyle = 'dark-content',
  safeArea = true,
  testID,
}) => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  // Header container style
  const headerStyle: ViewStyle = {
    backgroundColor: backgroundColor || colors.surface,
    paddingTop: safeArea ? insets.top : 0,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...style,
  };

  // Title container style
  const titleContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  };

  // Title style
  const defaultTitleStyle: TextStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    ...titleStyle,
  };

  // Subtitle style
  const defaultSubtitleStyle: TextStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    ...subtitleStyle,
  };

  // Action container style
  const actionStyle: ViewStyle = {
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <View style={headerStyle} testID={testID}>
      {showStatusBar && (
        <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor || colors.surface} />
      )}

      <View style={titleContainerStyle}>
        <View style={actionStyle}>{leftAction}</View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          {title && (
            <Text style={defaultTitleStyle} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={defaultSubtitleStyle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        <View style={actionStyle}>{rightAction}</View>
      </View>
    </View>
  );
};

export default HeaderLayout;
