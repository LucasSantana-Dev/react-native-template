/**
 * Loading state component for LazyImage
 */

import React from 'react';

import { View, ViewStyle } from 'react-native';

import { SkeletonLoader } from '@/components/common/loading-fallback';

interface LoadingStateProps {
  loadingComponent?: React.ReactNode;
  showSkeleton: boolean;
  skeletonHeight: number;
  skeletonWidth: number;
  style?: ViewStyle;
}

/**
 * Render loading state
 */
export const renderLoadingState = ({
  loadingComponent,
  showSkeleton,
  skeletonHeight,
  skeletonWidth,
  style,
}: LoadingStateProps) => {
  if (loadingComponent) {
    return <>{loadingComponent}</>;
  }

  if (showSkeleton) {
    return <SkeletonLoader height={skeletonHeight} width={skeletonWidth} />;
  }

  return <View style={style} />;
};
