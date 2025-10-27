import React, { useState } from 'react';

import { Image, ImageProps, Text, View } from 'react-native';

import { SkeletonLoader } from '@/components/common/loading-fallback';
import { useThemeColors } from '@/context/theme-context';

// ========== LAZY IMAGE COMPONENT ==========

interface LazyImageProps extends Omit<ImageProps, 'source'> {
  /** Image source */
  source: { uri: string } | number;
  /** Blurhash for placeholder (optional) */
  blurhash?: string;
  /** Whether to show skeleton while loading */
  showSkeleton?: boolean;
  /** Skeleton height */
  skeletonHeight?: number;
  /** Skeleton width */
  skeletonWidth?: number | string;
  /** Whether to show error state */
  showError?: boolean;
  /** Error fallback component */
  errorComponent?: React.ReactNode;
  /** Loading component */
  loadingComponent?: React.ReactNode;
}

/**
 * Lazy-loaded image component with progressive loading and error handling
 *
 * @example
 * ```tsx
 * <LazyImage
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
 *   style={{ width: 200, height: 200 }}
 *   transition={200}
 * />
 * ```
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  source,
  blurhash: _blurhash,
  showSkeleton = true,
  skeletonHeight = 200,
  skeletonWidth = '100%',
  showError = true,
  errorComponent,
  loadingComponent,
  style,
  onLoad,
  onError,
  ...props
}) => {
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (event: ImageProps['onLoad']) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(event);
  };

  const handleError = (event: ImageProps['onError']) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(event);
  };

  // Show error state
  if (hasError && showError) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    return (
      <View
        style={[
          {
            backgroundColor: colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          },
          style,
        ]}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: colors.surface,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.error, fontSize: 16 }}>⚠️</Text>
        </View>
      </View>
    );
  }

  // Show loading state
  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    if (showSkeleton) {
      return <SkeletonLoader height={skeletonHeight} width={skeletonWidth} />;
    }

    return (
      <View
        style={[
          {
            backgroundColor: colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Text style={{ color: colors.textTertiary }}>Loading...</Text>
      </View>
    );
  }

  // Render actual image
  return (
    <Image source={source} style={style} onLoad={handleLoad} onError={handleError} {...props} />
  );
};

/**
 * Optimized image component for avatars
 *
 * @example
 * ```tsx
 * <AvatarImage
 *   source={{ uri: user.avatar }}
 *   size={60}
 *   fallback="👤"
 * />
 * ```
 */
export const AvatarImage: React.FC<{
  source?: { uri: string } | number;
  size?: number;
  fallback?: string;
  style?: ImageProps['style'];
}> = ({ source, size = 60, fallback = '👤', style }) => {
  const colors = useThemeColors();
  const [hasError, setHasError] = useState(false);

  if (!source || hasError) {
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.primaryLight || colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Text
          style={{
            fontSize: size * 0.4,
            color: colors.primary,
          }}
        >
          {fallback}
        </Text>
      </View>
    );
  }

  return (
    <LazyImage
      source={source}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      showSkeleton={false}
      onError={() => setHasError(true)}
    />
  );
};

/**
 * Hero image component with optimized loading
 *
 * @example
 * ```tsx
 * <HeroImage
 *   source={{ uri: article.heroImage }}
 *   height={200}
 *   title={article.title}
 * />
 * ```
 */
export const HeroImage: React.FC<{
  source: { uri: string } | number;
  height?: number;
  title?: string;
  style?: ImageProps['style'];
}> = ({ source, height = 200, title, style }) => {
  return (
    <View style={[{ position: 'relative' }, style]}>
      <LazyImage
        source={source}
        style={{
          width: '100%',
          height,
        }}
        showSkeleton={true}
        skeletonHeight={height}
      />
      {title && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: 16,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>
        </View>
      )}
    </View>
  );
};

export default {
  LazyImage,
  AvatarImage,
  HeroImage,
};
