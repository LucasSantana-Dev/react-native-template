import React from 'react';

import { ActivityIndicator, DimensionValue, Text, View } from 'react-native';

import { theme } from '@/config/theme';
import { useThemeColors } from '@/context/theme-context';

// ========== LOADING FALLBACK COMPONENTS ==========

/**
 * Full-screen loading state for lazy-loaded screens
 *
 * @example
 * ```tsx
 * <Suspense fallback={<ScreenLoader />}>
 *   <LazyScreen />
 * </Suspense>
 * ```
 */
export const ScreenLoader: React.FC = () => {
  const colors = useThemeColors();
  const spacing = theme.spacing;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.lg,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text
        style={{
          marginTop: spacing.md,
          fontSize: 16,
          color: colors.textSecondary,
          textAlign: 'center',
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

/**
 * Inline component loading state for lazy-loaded components
 *
 * @example
 * ```tsx
 * <Suspense fallback={<ComponentLoader />}>
 *   <LazyComponent />
 * </Suspense>
 * ```
 */
export const ComponentLoader: React.FC<{ message?: string }> = ({
  message = 'Loading component...',
}) => {
  const colors = useThemeColors();
  const spacing = theme.spacing;

  return (
    <View
      style={{
        padding: spacing.md,
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 8,
        margin: spacing.sm,
      }}
    >
      <ActivityIndicator size="small" color={colors.primary} />
      <Text
        style={{
          marginTop: spacing.sm,
          fontSize: 14,
          color: colors.textSecondary,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </View>
  );
};

/**
 * Error boundary for lazy-loaded components
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <Suspense fallback={<ComponentLoader />}>
 *     <LazyComponent />
 *   </Suspense>
 * </ErrorBoundary>
 * ```
 */
export const ErrorFallback: React.FC<{
  error?: Error;
  resetError?: () => void;
  message?: string;
}> = ({ error, resetError, message = 'Something went wrong loading this component.' }) => {
  const colors = useThemeColors();
  const spacing = theme.spacing;

  return (
    <View
      style={{
        padding: spacing.lg,
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 8,
        margin: spacing.sm,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: colors.error,
          textAlign: 'center',
          marginBottom: spacing.sm,
        }}
      >
        {message}
      </Text>

      {__DEV__ && error && (
        <Text
          style={{
            fontSize: 12,
            color: colors.textTertiary,
            textAlign: 'center',
            marginBottom: spacing.sm,
          }}
        >
          {error.message}
        </Text>
      )}

      {resetError && (
        <Text
          style={{
            fontSize: 14,
            color: colors.primary,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
          onPress={resetError}
        >
          Try again
        </Text>
      )}
    </View>
  );
};

/**
 * Skeleton loader for list items
 *
 * @example
 * ```tsx
 * <SkeletonLoader height={60} />
 * ```
 */
export const SkeletonLoader: React.FC<{
  height?: number;
  width?: DimensionValue;
  borderRadius?: number;
}> = ({ height = 20, width = '100%', borderRadius = 4 }) => {
  const colors = useThemeColors();

  return (
    <View
      style={{
        height,
        width,
        backgroundColor: colors.surface,
        borderRadius,
        opacity: 0.6,
      }}
    />
  );
};

/**
 * List skeleton loader for multiple items
 *
 * @example
 * ```tsx
 * <ListSkeletonLoader count={5} itemHeight={60} />
 * ```
 */
export const ListSkeletonLoader: React.FC<{
  count?: number;
  itemHeight?: number;
  spacing?: number;
}> = ({ count = 3, itemHeight = 60, spacing = 8 }) => {
  return (
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={{ marginBottom: spacing }}>
          <SkeletonLoader height={itemHeight} />
        </View>
      ))}
    </View>
  );
};

export default {
  ScreenLoader,
  ComponentLoader,
  ErrorFallback,
  SkeletonLoader,
  ListSkeletonLoader,
};
