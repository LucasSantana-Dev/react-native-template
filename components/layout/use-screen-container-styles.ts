import { useMemo } from 'react';

import { ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/config/theme';
import { useThemeColors } from '@/context/theme-context';

interface UseScreenContainerStylesProps {
  backgroundColor?: string;
  safeArea: boolean;
  padding: keyof typeof theme.spacing;
  paddingHorizontal?: keyof typeof theme.spacing;
  paddingVertical?: keyof typeof theme.spacing;
}

export const useScreenContainerStyles = ({
  backgroundColor,
  safeArea,
  padding,
  paddingHorizontal,
  paddingVertical,
}: UseScreenContainerStylesProps) => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    // Get padding values
    const paddingValue = theme.spacing[padding];
    const horizontalPadding = paddingHorizontal ? theme.spacing[paddingHorizontal] : paddingValue;
    const verticalPadding = paddingVertical ? theme.spacing[paddingVertical] : paddingValue;

    // Base container style
    const containerStyle: ViewStyle = {
      flex: 1,
      backgroundColor: backgroundColor || colors.background,
      paddingTop: safeArea ? insets.top : 0,
      paddingBottom: safeArea ? insets.bottom : 0,
      paddingLeft: safeArea ? insets.left : 0,
      paddingRight: safeArea ? insets.right : 0,
      paddingHorizontal: horizontalPadding,
      paddingVertical: verticalPadding,
    };

    return containerStyle;
  }, [
    backgroundColor,
    colors.background,
    safeArea,
    insets.top,
    insets.bottom,
    insets.left,
    insets.right,
    padding,
    paddingHorizontal,
    paddingVertical,
  ]);
};
