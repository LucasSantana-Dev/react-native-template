/**
 * LazyImage component
 *
 * A lazy-loading image component with loading states, error handling,
 * and performance optimizations.
 */

import React, { useState } from 'react';

import {
  ImageErrorEvent,
  ImageErrorEventData,
  ImageLoadEvent,
  ImageLoadEventData,
  ImageProps,
  ImageStyle,
  View,
  ViewStyle,
} from 'react-native';

import { renderErrorState } from './lazy-image/error-state';
import { renderImageComponent } from './lazy-image/image-component';
import { renderLoadingState } from './lazy-image/loading-state';

// ========== TYPES ==========
export interface LazyImageProps extends Omit<ImageProps, 'source' | 'onLoad' | 'onError'> {
  /** Image source */
  source: ImageProps['source'];
  /** Loading component */
  loadingComponent?: React.ReactNode;
  /** Error component */
  errorComponent?: React.ReactNode;
  /** Error message */
  errorMessage?: string;
  /** Show skeleton loader */
  showSkeleton?: boolean;
  /** Skeleton height */
  skeletonHeight?: number;
  /** Skeleton width */
  skeletonWidth?: number;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Image style */
  imageStyle?: ImageStyle;
  /** On load callback */
  onLoad?: (event: ImageLoadEventData) => void;
  /** On error callback */
  onError?: (event: ImageErrorEventData) => void;
  /** On load start callback */
  onLoadStart?: () => void;
  /** On load end callback */
  onLoadEnd?: () => void;
}

// ========== COMPONENT ==========
/**
 * LazyImage component with loading states and error handling
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  source,
  loadingComponent,
  errorComponent,
  errorMessage = 'Failed to load image',
  showSkeleton = true,
  skeletonHeight = 200,
  skeletonWidth = '100%',
  containerStyle,
  imageStyle,
  onLoad,
  onError,
  onLoadStart,
  onLoadEnd,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  };

  const handleLoad = (event: ImageLoadEvent) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(event.nativeEvent);
  };

  const handleError = (event: ImageErrorEvent) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(event.nativeEvent);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    onLoadEnd?.();
  };

  if (hasError) {
    return renderErrorState({
      errorComponent,
      errorMessage,
      style: containerStyle,
    });
  }

  if (isLoading) {
    return renderLoadingState({
      loadingComponent,
      showSkeleton,
      skeletonHeight: skeletonHeight || 200,
      skeletonWidth: typeof skeletonWidth === 'number' ? skeletonWidth : 200,
      style: containerStyle,
    });
  }

  return (
    <View style={[containerStyle, style]}>
      {renderImageComponent({
        source,
        style: imageStyle,
        onLoad: handleLoad,
        onError: handleError,
        onLoadStart: handleLoadStart,
        onLoadEnd: handleLoadEnd,
        ...props,
      })}
    </View>
  );
};
