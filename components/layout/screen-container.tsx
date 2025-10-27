import React from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  View,
  ViewStyle,
} from 'react-native';

import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/config/theme';
import { useThemeColors } from '@/context/theme-context';

// ========== HELPER FUNCTIONS ==========
/**
 * Get safe area style based on insets and safeArea prop
 */
const getSafeAreaStyle = (insets: EdgeInsets, safeArea: boolean): ViewStyle => ({
  paddingTop: safeArea ? insets.top : 0,
  paddingBottom: safeArea ? insets.bottom : 0,
  paddingLeft: safeArea ? insets.left : 0,
  paddingRight: safeArea ? insets.right : 0,
});

/**
 * Get background style based on backgroundColor and colors
 */
const getBackgroundStyle = (
  backgroundColor: string | undefined,
  colors: { background: string },
): ViewStyle => ({
  backgroundColor: backgroundColor || colors.background,
});

// ========== SCREEN CONTAINER PROPS ==========
export interface ScreenContainerProps {
  /** Screen content */
  children: React.ReactNode;

  /** Custom container style */
  style?: ViewStyle;

  /** Whether to use safe area */
  safeArea?: boolean;

  /** Whether to use keyboard avoiding view */
  keyboardAvoiding?: boolean;

  /** Whether to use scroll view */
  scrollable?: boolean;

  /** Scroll view props */
  scrollViewProps?: ScrollViewProps;

  /** Refresh control */
  refreshControl?: React.ReactElement<RefreshControlProps>;

  /** Background color */
  backgroundColor?: string;

  /** Padding */
  padding?: keyof typeof theme.spacing;

  /** Horizontal padding */
  paddingHorizontal?: keyof typeof theme.spacing;

  /** Vertical padding */
  paddingVertical?: keyof typeof theme.spacing;

  /** Test ID */
  testID?: string;
}

/**
 * Screen container component with safe area, keyboard avoiding, and scroll support
 *
 * @example
 * ```tsx
 * <ScreenContainer safeArea keyboardAvoiding>
 *   <Text>Screen content</Text>
 * </ScreenContainer>
 *
 * <ScreenContainer scrollable refreshControl={refreshControl}>
 *   <Text>Scrollable content</Text>
 * </ScreenContainer>
 * ```
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  safeArea = true,
  keyboardAvoiding = true,
  scrollable = false,
  scrollViewProps,
  refreshControl,
  backgroundColor,
  padding = 'md',
  paddingHorizontal,
  paddingVertical,
  testID,
}) => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  // Get padding values
  const paddingValue = theme.spacing[padding];
  const horizontalPadding = paddingHorizontal ? theme.spacing[paddingHorizontal] : paddingValue;
  const verticalPadding = paddingVertical ? theme.spacing[paddingVertical] : paddingValue;

  // Base container style
  const containerStyle: ViewStyle = {
    flex: 1,
    ...getBackgroundStyle(backgroundColor, colors),
    ...getSafeAreaStyle(insets, safeArea),
    paddingHorizontal: horizontalPadding,
    paddingVertical: verticalPadding,
  };

  // Render content
  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={refreshControl}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      );
    }

    return children;
  };

  // Render with keyboard avoiding view
  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={[containerStyle, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        testID={testID}
      >
        {renderContent()}
      </KeyboardAvoidingView>
    );
  }

  // Render without keyboard avoiding view
  return (
    <View style={[containerStyle, style]} testID={testID}>
      {renderContent()}
    </View>
  );
};

export default ScreenContainer;
