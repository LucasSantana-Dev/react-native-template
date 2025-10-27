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
 * Input props for button content preparation
 */
interface ButtonContentPropsInput {
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
  iconConfig: Record<string, unknown> | null;
  loadingStyles: Record<string, unknown>;
  textStyle?: Record<string, unknown>;
}

/**
 * Prepare button content props to reduce complexity
 */
export const prepareButtonContentProps = ({
  icon,
  iconSize,
  iconColor,
  iconPosition,
  children,
  loading,
  hasText,
  hasIcon,
  rawChildren,
  buttonStyles,
  iconConfig,
  loadingStyles,
  textStyle,
}: ButtonContentPropsInput) => ({
  icon,
  iconSize,
  iconColor,
  iconPosition,
  children,
  loading: Boolean(loading),
  hasText,
  hasIcon,
  rawChildren,
  buttonStyles,
  iconConfig: iconConfig || {},
  loadingStyles,
  textStyle: textStyle || {},
});

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
