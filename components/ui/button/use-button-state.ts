import { useMemo } from 'react';

import { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';

import { getButtonStyles, getIconConfig, getLoadingStyles } from './styles';
import { ButtonProps } from './types';

interface ButtonStyles {
  container: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
}

interface IconConfig {
  size: number;
  color: string;
  margin: number;
}

interface LoadingStyles {
  container: Record<string, unknown>;
  indicator: Record<string, unknown>;
}

interface UseButtonStateReturn {
  isDisabled: boolean;
  hasText: boolean;
  hasIcon: boolean;
  buttonStyles: ButtonStyles;
  iconConfig: IconConfig | null;
  loadingStyles: LoadingStyles;
  handlePress: (event: GestureResponderEvent) => void;
}

export const useButtonState = (
  props: Pick<
    ButtonProps,
    | 'disabled'
    | 'loading'
    | 'state'
    | 'rawChildren'
    | 'children'
    | 'forceIcon'
    | 'icon'
    | 'variant'
    | 'size'
    | 'fullWidth'
    | 'iconColor'
    | 'iconPosition'
    | 'onPress'
  >,
): UseButtonStateReturn => {
  const {
    disabled,
    loading,
    state,
    rawChildren,
    children,
    forceIcon,
    icon,
    variant,
    size,
    fullWidth,
    iconColor,
    iconPosition,
    onPress,
  } = props;

  // Determine if button should be disabled
  const isDisabled = disabled || loading || state === 'disabled';

  // Determine if we have text content
  const hasText = Boolean(!rawChildren && children && !forceIcon);

  // Determine if we have an icon
  const hasIcon = Boolean(icon);

  // Get button styles
  const buttonStyles = useMemo(() => {
    const styles = getButtonStyles(
      variant || 'primary',
      size || 'md',
      isDisabled,
      fullWidth || false,
    );
    return {
      container: {},
      button: styles.button || {},
      text: styles.text || {},
    };
  }, [variant, size, isDisabled, fullWidth]);

  // Get icon configuration
  const iconConfig = useMemo(
    () =>
      hasIcon ? getIconConfig(size || 'md', iconColor || '#FFFFFF', iconPosition || 'left') : null,
    [hasIcon, size, iconColor, iconPosition],
  );

  // Get loading styles
  const loadingStyles = useMemo(() => getLoadingStyles(), []);

  // Handle press events
  const handlePress = (event: GestureResponderEvent) => {
    if (isDisabled || loading) return;
    onPress?.(event);
  };

  return {
    isDisabled,
    hasText,
    hasIcon,
    buttonStyles,
    iconConfig,
    loadingStyles,
    handlePress,
  };
};
