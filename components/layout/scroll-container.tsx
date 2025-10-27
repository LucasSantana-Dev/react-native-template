import React from 'react';

import {
    RefreshControl,
    RefreshControlProps,
    ScrollView,
    ScrollViewProps,
    ViewStyle,
} from 'react-native';

import { useThemeColors } from '@/context/theme-context';

// ========== SCROLL CONTAINER PROPS ==========
export interface ScrollContainerProps extends ScrollViewProps {
  /** Scroll content */
  children: React.ReactNode;

  /** Custom container style */
  style?: ViewStyle;

  /** Content container style */
  contentContainerStyle?: ViewStyle;

  /** Refresh control */
  refreshControl?: React.ReactElement<RefreshControlProps>;

  /** Whether to show vertical scroll indicator */
  showsVerticalScrollIndicator?: boolean;

  /** Whether to show horizontal scroll indicator */
  showsHorizontalScrollIndicator?: boolean;

  /** Whether to persist taps on keyboard */
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';

  /** Background color */
  backgroundColor?: string;

  /** Padding */
  padding?: number;

  /** Horizontal padding */
  paddingHorizontal?: number;

  /** Vertical padding */
  paddingVertical?: number;

  /** Test ID */
  testID?: string;
}

/**
 * Scroll container component with proper keyboard handling and refresh support
 *
 * @example
 * ```tsx
 * <ScrollContainer
 *   refreshControl={refreshControl}
 *   keyboardShouldPersistTaps="handled"
 * >
 *   <Text>Scrollable content</Text>
 * </ScrollContainer>
 * ```
 */
export const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  style,
  contentContainerStyle,
  refreshControl,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  backgroundColor,
  padding,
  paddingHorizontal,
  paddingVertical,
  testID,
  ...props
}) => {
  const colors = useThemeColors();

  // Base scroll view style
  const scrollStyle: ViewStyle = {
    flex: 1,
    backgroundColor: backgroundColor || colors.background,
    ...style,
  };

  // Content container style
  const contentStyle: ViewStyle = {
    flexGrow: 1,
    padding,
    paddingHorizontal,
    paddingVertical,
    ...contentContainerStyle,
  };

  return (
    <ScrollView
      style={scrollStyle}
      contentContainerStyle={contentStyle}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      testID={testID}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;
