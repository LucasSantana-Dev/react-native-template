/**
 * Button helper functions
 *
 * Contains helper functions for rendering different parts of the Button component.
 * These functions are extracted to reduce complexity and improve maintainability.
 */

import React from 'react';

import { ActivityIndicator, Text, TextStyle, View, ViewStyle } from 'react-native';

/**
 * Props for render functions
 */
interface RenderProps {
  icon?: string | React.ReactNode;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  loading?: boolean;
  hasText: boolean;
  hasIcon: boolean;
  rawChildren?: boolean;
  buttonStyles: Record<string, unknown>;
  iconConfig: Record<string, unknown>;
  loadingStyles: Record<string, unknown>;
  textStyle?: Record<string, unknown>;
}

/**
 * Render the button icon
 */
export const renderButtonIcon = ({
  icon,
  iconConfig,
  iconPosition,
}: Pick<RenderProps, 'icon' | 'iconConfig' | 'iconPosition'>) => {
  if (!icon || !iconConfig) return null;

  // For now, we'll use a simple Text component for icons
  // In a real app, you'd use react-native-vector-icons
  return (
    <Text
      style={{
        fontSize: iconConfig.size as number,
        color: iconConfig.color as string,
        marginRight: iconPosition === 'left' ? (iconConfig.margin as number) : 0,
        marginLeft: iconPosition === 'right' ? (iconConfig.margin as number) : 0,
      }}
    >
      {icon}
    </Text>
  );
};

/**
 * Render the loading indicator
 */
export const renderLoadingIndicator = ({
  loading,
  buttonStyles,
  loadingStyles,
}: Pick<RenderProps, 'loading' | 'buttonStyles' | 'loadingStyles'>) => {
  if (!loading) return null;

  return (
    <ActivityIndicator
      size="small"
      color={(buttonStyles.text as TextStyle).color as string}
      style={loadingStyles.indicator as ViewStyle}
    />
  );
};

/**
 * Render the button text content
 */
export const renderButtonText = ({
  children,
  hasText,
  rawChildren,
  buttonStyles,
  textStyle,
  hasIcon,
  iconPosition,
}: Pick<
  RenderProps,
  'children' | 'hasText' | 'rawChildren' | 'buttonStyles' | 'textStyle' | 'hasIcon' | 'iconPosition'
>) => {
  if (!hasText || rawChildren) return children;

  return (
    <Text
      style={[
        buttonStyles.text as TextStyle,
        textStyle,
        hasIcon && iconPosition === 'left' && { marginLeft: 8 },
        hasIcon && iconPosition === 'right' && { marginRight: 8 },
      ]}
    >
      {children}
    </Text>
  );
};

/**
 * Render the button content based on state
 */
export const renderButtonContent = ({
  loading,
  hasIcon,
  hasText,
  iconPosition,
  children,
  rawChildren,
  buttonStyles,
  textStyle,
  iconConfig,
  loadingStyles,
}: RenderProps) => {
  if (loading) {
    return (
      <View style={loadingStyles.container as ViewStyle}>
        {renderLoadingIndicator({ loading, buttonStyles, loadingStyles })}
        {hasText &&
          renderButtonText({
            children,
            hasText,
            rawChildren,
            buttonStyles,
            textStyle,
            hasIcon,
            iconPosition,
          })}
      </View>
    );
  }

  if (hasIcon && !hasText) {
    return renderButtonIcon({ icon: children as string, iconConfig, iconPosition });
  }

  if (hasIcon && hasText) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconPosition === 'left' &&
          renderButtonIcon({ icon: children as string, iconConfig, iconPosition })}
        {renderButtonText({
          children,
          hasText,
          rawChildren,
          buttonStyles,
          textStyle,
          hasIcon,
          iconPosition,
        })}
        {iconPosition === 'right' &&
          renderButtonIcon({ icon: children as string, iconConfig, iconPosition })}
      </View>
    );
  }

  return renderButtonText({
    children,
    hasText,
    rawChildren,
    buttonStyles,
    textStyle,
    hasIcon,
    iconPosition,
  });
};

/**
 * Get button state helper
 */
export const getButtonState = (
  disabled: boolean,
  loading: boolean,
  state: string
): { isDisabled: boolean } => {
  const isDisabled = disabled || loading || state === 'disabled';
  return { isDisabled };
};

/**
 * Determine if button should render text
 */
export const shouldRenderText = (
  rawChildren: boolean,
  children: React.ReactNode,
  forceIcon: boolean
): boolean => {
  return Boolean(!rawChildren && children && !forceIcon);
};

/**
 * Determine if button has an icon
 */
export const hasButtonIcon = (icon: string | React.ReactNode | undefined): boolean => {
  return Boolean(icon);
};

/**
 * Get button variant styles helper
 */
export const getButtonVariantStyles = (variant: string, isDisabled: boolean) => {
  // This would contain the logic for determining button styles based on variant
  // For now, we'll return a placeholder
  return (
    {
      primary: {
        backgroundColor: isDisabled ? '#ccc' : '#007AFF',
        borderColor: isDisabled ? '#ccc' : '#007AFF',
      },
      secondary: {
        backgroundColor: isDisabled ? '#f0f0f0' : 'transparent',
        borderColor: isDisabled ? '#ccc' : '#007AFF',
      },
      danger: {
        backgroundColor: isDisabled ? '#ccc' : '#FF3B30',
        borderColor: isDisabled ? '#ccc' : '#FF3B30',
      },
    }[variant] || {}
  );
};
