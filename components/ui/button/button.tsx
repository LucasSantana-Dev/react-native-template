import React from 'react';

import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { getButtonStyles, getIconConfig, getLoadingStyles } from './styles';
import { ButtonProps } from './types';

import { useThemeColors } from '@/context/theme-context';

/**
 * Production-ready Button component with multiple variants, sizes, and states
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={handlePress}>
 *   Click me
 * </Button>
 *
 * <Button variant="outline" size="lg" icon="add" iconPosition="left">
 *   Add Item
 * </Button>
 *
 * <Button variant="danger" size="sm" loading disabled>
 *   Delete
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  state = 'default',
  style,
  textStyle,
  icon,
  iconSize,
  iconColor,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  forceIcon = false,
  rawChildren = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
  onPress,
  ...props
}) => {
  const colors = useThemeColors();

  // Determine if button should be disabled
  const isDisabled = disabled || loading || state === 'disabled';

  // Determine if we have text content
  const hasText = !rawChildren && children && !forceIcon;

  // Determine if we have an icon
  const hasIcon = Boolean(icon);

  // Get button styles
  const buttonStyles = getButtonStyles(variant, size, isDisabled, fullWidth);

  // Get icon configuration
  const iconConfig = hasIcon ? getIconConfig(size, iconColor, iconPosition) : null;

  // Get loading styles
  const loadingStyles = getLoadingStyles();

  // Handle press events
  const handlePress = (event: any) => {
    if (isDisabled || loading) return;
    onPress?.(event);
  };

  // Render icon component
  const renderIcon = () => {
    if (!hasIcon || !iconConfig) return null;

    // For now, we'll use a simple Text component for icons
    // In a real app, you'd use react-native-vector-icons
    return (
      <Text
        style={{
          fontSize: iconConfig.size,
          color: iconConfig.color,
          marginRight: iconPosition === 'left' ? iconConfig.margin : 0,
          marginLeft: iconPosition === 'right' ? iconConfig.margin : 0,
        }}
      >
        {icon}
      </Text>
    );
  };

  // Render loading indicator
  const renderLoading = () => {
    if (!loading) return null;

    return (
      <ActivityIndicator
        size="small"
        color={buttonStyles.text.color}
        style={loadingStyles.indicator}
      />
    );
  };

  // Render text content
  const renderText = () => {
    if (!hasText || rawChildren) return children;

    return (
      <Text
        style={[
          buttonStyles.text,
          textStyle,
          hasIcon && iconPosition === 'left' && { marginLeft: 8 },
          hasIcon && iconPosition === 'right' && { marginRight: 8 },
        ]}
      >
        {children}
      </Text>
    );
  };

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <View style={loadingStyles.container}>
          {renderLoading()}
          {hasText && renderText()}
        </View>
      );
    }

    if (hasIcon && !hasText) {
      return renderIcon();
    }

    if (hasIcon && hasText) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {iconPosition === 'left' && renderIcon()}
          {renderText()}
          {iconPosition === 'right' && renderIcon()}
        </View>
      );
    }

    return renderText();
  };

  return (
    <TouchableOpacity
      style={[buttonStyles.button, style]}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      testID={testID}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
