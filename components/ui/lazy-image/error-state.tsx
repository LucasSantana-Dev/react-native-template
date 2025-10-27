/**
 * Error state component for LazyImage
 */

import React from 'react';

import { Text, View, ViewStyle } from 'react-native';

import { theme } from '@/config/theme';

interface ErrorStateProps {
  errorComponent?: React.ReactNode;
  errorMessage: string;
  style?: ViewStyle;
}

/**
 * Error state component
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ errorComponent, errorMessage, style }) => {
  if (errorComponent) {
    return <>{errorComponent}</>;
  }

  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ color: theme.colors.error, textAlign: 'center' }}>{errorMessage}</Text>
    </View>
  );
};

/**
 * Render error state (backward compatibility)
 */
export const renderErrorState = (props: ErrorStateProps) => <ErrorState {...props} />;
