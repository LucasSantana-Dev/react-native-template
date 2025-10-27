import React from 'react';

import { ActivityIndicator, Text, TextStyle } from 'react-native';

// ========== HELPER INTERFACES ==========
interface IconConfig {
  size: number;
  color: string;
  margin: number;
}

interface ButtonStyles {
  text: TextStyle;
}

interface LoadingStyles {
  indicator: TextStyle;
}

interface RenderIconConfig {
  icon: string | React.ReactNode;
  iconConfig: IconConfig;
  iconPosition: 'left' | 'right';
}

interface RenderLoadingConfig {
  loading: boolean;
  buttonStyles: ButtonStyles;
  loadingStyles: LoadingStyles;
}

interface RenderTextConfig {
  children: React.ReactNode;
  hasText: boolean;
  rawChildren: boolean;
  buttonStyles: ButtonStyles;
  textStyle?: TextStyle;
  hasIcon: boolean;
  iconPosition: 'left' | 'right';
}

interface RenderContentConfig {
  loading: boolean;
  hasIcon: boolean;
  hasText: boolean;
  iconPosition: 'left' | 'right';
  icon: string | React.ReactNode;
  iconConfig: IconConfig | null;
  children: React.ReactNode;
  buttonStyles: ButtonStyles;
  textStyle?: TextStyle;
  rawChildren: boolean;
  loadingStyles: LoadingStyles;
}

// ========== HELPER FUNCTIONS ==========

/**
 * Renders button icon with proper positioning
 */
export const renderButtonIcon = (config: RenderIconConfig) => {
  const { icon, iconConfig, iconPosition } = config;

  if (!icon || !iconConfig) return null;

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

/**
 * Renders loading indicator
 */
export const renderButtonLoading = (config: RenderLoadingConfig) => {
  const { loading, buttonStyles, loadingStyles } = config;

  if (!loading) return null;

  return (
    <ActivityIndicator
      size="small"
      color={buttonStyles.text.color}
      style={loadingStyles.indicator}
    />
  );
};

/**
 * Renders button text content
 */
export const renderButtonText = (config: RenderTextConfig) => {
  const { children, hasText, rawChildren, buttonStyles, textStyle, hasIcon, iconPosition } = config;

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

/**
 * Renders button content based on state
 */
export const renderButtonContent = (config: RenderContentConfig) => {
  const {
    loading,
    hasIcon,
    hasText,
    iconPosition,
    icon,
    iconConfig,
    children,
    buttonStyles,
    textStyle,
    rawChildren,
    loadingStyles,
  } = config;

  if (loading) {
    return renderButtonLoading({ loading, buttonStyles, loadingStyles });
  }

  if (hasIcon && hasText) {
    return (
      <>
        {iconPosition === 'left' &&
          iconConfig &&
          renderButtonIcon({ icon, iconConfig, iconPosition })}
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
          iconConfig &&
          renderButtonIcon({ icon, iconConfig, iconPosition })}
      </>
    );
  }

  if (hasIcon && iconConfig) {
    return renderButtonIcon({ icon, iconConfig, iconPosition });
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
