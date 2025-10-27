# Migration Guide: Implementing Lazy Loading

## Overview

This guide provides step-by-step instructions for migrating an existing React
Native Expo project to implement comprehensive lazy loading for better
performance. The migration is designed to be incremental and safe, allowing you
to implement changes gradually.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Setup and Dependencies](#phase-1-setup-and-dependencies)
3. [Phase 2: Loading Components](#phase-2-loading-components)
4. [Phase 3: Screen-Level Lazy Loading](#phase-3-screen-level-lazy-loading)
5. [Phase 4: Component-Level Lazy Loading](#phase-4-component-level-lazy-loading)
6. [Phase 5: Image Optimization](#phase-5-image-optimization)
7. [Phase 6: List Virtualization](#phase-6-list-virtualization)
8. [Phase 7: Bundle Optimization](#phase-7-bundle-optimization)
9. [Phase 8: Performance Monitoring](#phase-8-performance-monitoring)
10. [Testing and Validation](#testing-and-validation)
11. [Rollback Procedures](#rollback-procedures)

## Prerequisites

Before starting the migration, ensure you have:

- React Native Expo project (SDK 49+)
- TypeScript configured
- Existing screens and components
- Git repository for version control
- Performance baseline measurements

## Phase 1: Setup and Dependencies

### 1.1 Install Required Dependencies

```bash
npm install @shopify/flash-list source-map-explorer
```

### 1.2 Create Directory Structure

```bash
mkdir -p components/common
mkdir -p components/ui
mkdir -p hooks
mkdir -p lib/utils
mkdir -p docs/performance
mkdir -p docs/examples
mkdir -p docs/checklists
mkdir -p docs/architecture
mkdir -p docs/guides
```

### 1.3 Update Package.json Scripts

Add performance-related scripts to your `package.json`:

```json
{
  "scripts": {
    "bundle:analyze": "expo export --platform all --dev --output-dir ./dist && npx source-map-explorer 'dist/**/*.js'",
    "bundle:stats": "expo export --stats",
    "bundle:size": "npx expo export --platform all --output-dir ./dist && find ./dist -name '*.js' -exec wc -c {} + | sort -n | tail -10",
    "performance:profile": "expo start --dev-client --no-dev --minify"
  }
}
```

## Phase 2: Loading Components

### 2.1 Create Loading Fallback Components

Create `components/common/loading-fallback.tsx`:

```typescript
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useThemeColors } from '@/context/theme-context';

export const ScreenLoader: React.FC = () => {
  const { colors, spacing } = useThemeColors();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: spacing.lg,
    }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{
        marginTop: spacing.md,
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
      }}>
        Loading...
      </Text>
    </View>
  );
};

export const ComponentLoader: React.FC<{ message?: string }> = ({
  message = 'Loading component...'
}) => {
  const { colors, spacing } = useThemeColors();

  return (
    <View style={{
      padding: spacing.md,
      alignItems: 'center',
      backgroundColor: colors.backgroundLight,
      borderRadius: 8,
      margin: spacing.sm,
    }}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={{
        marginTop: spacing.sm,
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
      }}>
        {message}
      </Text>
    </View>
  );
};

export const ErrorFallback: React.FC<{
  error?: Error;
  resetError?: () => void;
  message?: string;
}> = ({ error, resetError, message = 'Something went wrong loading this component.' }) => {
  const { colors, spacing } = useThemeColors();

  return (
    <View style={{
      padding: spacing.lg,
      alignItems: 'center',
      backgroundColor: colors.errorLight || colors.backgroundLight,
      borderRadius: 8,
      margin: spacing.sm,
    }}>
      <Text style={{
        fontSize: 16,
        color: colors.error,
        textAlign: 'center',
        marginBottom: spacing.sm,
      }}>
        {message}
      </Text>

      {__DEV__ && error && (
        <Text style={{
          fontSize: 12,
          color: colors.textTertiary,
          textAlign: 'center',
          marginBottom: spacing.sm,
        }}>
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
```

### 2.2 Create Lazy Loading Hooks

Create `hooks/use-lazy-load.ts`:

```typescript
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

export const useLazyLoad = (delay: number = 0): boolean => {
  const [shouldLoad, setShouldLoad] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  return shouldLoad;
};

export const useLazyLoadOnView = (
  threshold: number = 0.1,
  rootMargin: string = '50px',
): { ref: React.RefObject<View>; shouldLoad: boolean } => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<View>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, shouldLoad };
};
```

## Phase 3: Screen-Level Lazy Loading

### 3.1 Identify Heavy Screens

First, identify screens that should be lazy-loaded:

```bash
# Find large screen files
find app -name "*.tsx" -exec wc -l {} + | sort -nr | head -10
```

Screens with 200+ lines or complex logic should be lazy-loaded.

### 3.2 Create Lazy Screen Files

For each heavy screen, create a lazy version:

```typescript
// app/(app)/lazy-screens.tsx
import { lazy } from 'react';

export const LazyHomeScreen = lazy(() => import('./home'));
export const LazyProfileScreen = lazy(() => import('./profile'));
```

### 3.3 Update Navigation

Update your navigation to use lazy-loaded screens:

```typescript
// app/_layout.tsx
import { Suspense } from 'react';
import { ScreenLoader } from '@/components/common/loading-fallback';
import { LazyHomeScreen, LazyProfileScreen } from './(app)/lazy-screens';

export default function RootLayout() {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <Stack>
        <Stack.Screen name="home" component={LazyHomeScreen} />
        <Stack.Screen name="profile" component={LazyProfileScreen} />
      </Stack>
    </Suspense>
  );
}
```

### 3.4 Add Error Boundaries

Wrap lazy screens with error boundaries:

```typescript
import { ErrorBoundary } from '@/components/common/loading-fallback';

<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<ScreenLoader />}>
    <LazyHomeScreen />
  </Suspense>
</ErrorBoundary>
```

## Phase 4: Component-Level Lazy Loading

### 4.1 Identify Heavy Components

Find components that should be lazy-loaded:

```bash
# Find large component files
find components -name "*.tsx" -exec wc -l {} + | sort -nr | head -10
```

### 4.2 Create Lazy Component Files

```typescript
// components/lazy-components.tsx
import { lazy } from 'react';

export const LazyHeavyComponent = lazy(() => import('./heavy-component'));
export const LazyFeatureComponent = lazy(() => import('./feature-component'));
```

### 4.3 Implement Lazy Loading in Screens

```typescript
// In your screen component
import { Suspense } from 'react';
import { ComponentLoader } from '@/components/common/loading-fallback';
import { LazyHeavyComponent } from '@/components/lazy-components';
import { useLazyLoad } from '@/hooks/use-lazy-load';

export default function MyScreen() {
  const shouldLoad = useLazyLoad(1000); // Load after 1 second

  return (
    <View>
      <Text>Main content loads immediately</Text>

      <Suspense fallback={<ComponentLoader />}>
        {shouldLoad && <LazyHeavyComponent />}
      </Suspense>
    </View>
  );
}
```

## Phase 5: Image Optimization

### 5.1 Create LazyImage Component

Create `components/ui/lazy-image.tsx`:

```typescript
import React, { useState } from 'react';
import { Image, ImageProps, Text, View } from 'react-native';
import { useThemeColors } from '@/context/theme-context';

export const LazyImage: React.FC<LazyImageProps> = ({
  source,
  blurhash,
  showSkeleton = true,
  skeletonHeight = 200,
  skeletonWidth = '100%',
  showError = true,
  errorComponent,
  loadingComponent,
  cachePolicy = 'memory-disk',
  priority = 'low',
  transition = 200,
  contentFit = 'cover',
  style,
  onLoad,
  onError,
  ...props
}) => {
  const { colors } = useThemeColors();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (event: any) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(event);
  };

  const handleError = (event: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(event);
  };

  if (hasError && showError) {
    return errorComponent || (
      <View style={[styles.errorContainer, style]}>
        <Text style={styles.errorText}>Failed to load image</Text>
      </View>
    );
  }

  if (isLoading) {
    return loadingComponent || (
      <View style={[styles.skeletonContainer, { height: skeletonHeight, width: skeletonWidth }, style]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={style}
      onLoad={handleLoad}
      onError={handleError}
      placeholder={blurhash ? { blurhash } : undefined}
      contentFit={contentFit}
      transition={transition}
      cachePolicy={cachePolicy}
      priority={priority}
      {...props}
    />
  );
};
```

### 5.2 Replace Image Components

Replace existing Image components with LazyImage:

```typescript
// Before
<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
/>

// After
<LazyImage
  source={{ uri: imageUrl }}
  blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={200}
/>
```

## Phase 6: List Virtualization

### 6.1 Create Virtual Scroll Hook

Create `hooks/use-virtual-scroll.ts`:

```typescript
import { useCallback, useMemo, useState } from 'react';
import { FlatListProps, ListRenderItem } from 'react-native';

export const useVirtualScroll = <T>({
  data,
  renderItem,
  keyExtractor,
  estimatedItemSize = 60,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 5,
  removeClippedSubviews = true,
}: UseVirtualScrollOptions<T>) => {
  const getItemLayout = useCallback(
    (data: T[] | null | undefined, index: number) => {
      return {
        length: estimatedItemSize,
        offset: estimatedItemSize * index,
        index,
      };
    },
    [estimatedItemSize],
  );

  const flatListProps: Partial<FlatListProps<T>> = useMemo(
    () => ({
      data,
      renderItem,
      keyExtractor,
      getItemLayout,
      initialNumToRender,
      maxToRenderPerBatch,
      windowSize,
      removeClippedSubviews,
    }),
    [
      data,
      renderItem,
      keyExtractor,
      getItemLayout,
      initialNumToRender,
      maxToRenderPerBatch,
      windowSize,
      removeClippedSubviews,
    ],
  );

  return { flatListProps };
};
```

### 6.2 Replace ScrollView with FlatList

```typescript
// Before
<ScrollView>
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</ScrollView>

// After
const { flatListProps } = useVirtualScroll({
  data: items,
  renderItem: ({ item }) => <ItemComponent item={item} />,
  keyExtractor: (item) => item.id,
  estimatedItemSize: 80,
});

<FlatList {...flatListProps} />
```

### 6.3 Implement FlashList for Large Lists

For lists with 1000+ items, use FlashList:

```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  estimatedItemSize={200}
  drawDistance={250}
/>
```

## Phase 7: Bundle Optimization

### 7.1 Configure Metro Bundler

Create `metro.config.js`:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  minifierConfig: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info'],
      dead_code: true,
      unused: true,
    },
  },
};

config.resolver = {
  ...config.resolver,
  blockList: [
    /node_modules\/.*\/tests?\/.*/,
    /node_modules\/.*\/test\/.*/,
    /node_modules\/.*\/__tests__\/.*/,
  ],
};

module.exports = config;
```

### 7.2 Optimize Imports

Replace barrel imports with specific imports:

```typescript
// Before
import * as dateFns from 'date-fns';

// After
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
```

### 7.3 Run Bundle Analysis

```bash
npm run bundle:analyze
npm run bundle:stats
npm run bundle:size
```

## Phase 8: Performance Monitoring

### 8.1 Create Performance Tracking Utility

Create `lib/utils/performance.ts`:

```typescript
export class PerformanceTracker {
  private static instance: PerformanceTracker;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  startTiming(name: string): void {
    const startTime = Date.now();
    this.marks.set(`${name}-start`, startTime);
  }

  endTiming(name: string): number {
    const endTime = Date.now();
    const startTime = this.marks.get(`${name}-start`);

    if (!startTime) return 0;

    const duration = endTime - startTime;
    this.metrics.set(name, duration);
    return duration;
  }
}
```

### 8.2 Add Performance Tracking to Components

```typescript
import { usePerformanceTracking } from '@/lib/utils/performance';

export default function MyComponent() {
  const { startTiming, endTiming } = usePerformanceTracking('MyComponent');

  useEffect(() => {
    startTiming('render');
    // Component logic
    endTiming('render');
  }, []);
}
```

## Testing and Validation

### 9.1 Performance Testing

```bash
# Test bundle size
npm run bundle:analyze

# Test performance
npm run performance:profile

# Test on device
npm run ios
npm run android
```

### 9.2 Memory Testing

- Test on low-end devices
- Monitor memory usage over time
- Check for memory leaks
- Test with large datasets

### 9.3 User Experience Testing

- Test loading states
- Test error handling
- Test on slow networks
- Test on different devices

## Rollback Procedures

### 10.1 Rollback Lazy Loading

If lazy loading causes issues, you can rollback by:

1. **Remove Suspense wrappers**:

   ```typescript
   // Before
   <Suspense fallback={<ScreenLoader />}>
     <LazyScreen />
   </Suspense>

   // After
   <Screen />
   ```

2. **Restore direct imports**:

   ```typescript
   // Before
   const LazyScreen = lazy(() => import('./screen'));

   // After
   import Screen from './screen';
   ```

### 10.2 Rollback List Virtualization

```typescript
// Before
<FlatList {...flatListProps} />

// After
<ScrollView>
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</ScrollView>
```

### 10.3 Rollback Image Optimization

```typescript
// Before
<LazyImage source={{ uri: imageUrl }} />

// After
<Image source={{ uri: imageUrl }} />
```

## Migration Checklist

### Pre-Migration

- [ ] Measure current performance baseline
- [ ] Identify heavy screens and components
- [ ] Set up version control
- [ ] Create backup of current code

### Phase 1: Setup

- [ ] Install dependencies
- [ ] Create directory structure
- [ ] Update package.json scripts

### Phase 2: Loading Components

- [ ] Create loading fallback components
- [ ] Create lazy loading hooks
- [ ] Test loading components

### Phase 3: Screen Lazy Loading

- [ ] Identify heavy screens
- [ ] Create lazy screen files
- [ ] Update navigation
- [ ] Add error boundaries

### Phase 4: Component Lazy Loading

- [ ] Identify heavy components
- [ ] Create lazy component files
- [ ] Implement lazy loading in screens

### Phase 5: Image Optimization

- [ ] Create LazyImage component
- [ ] Replace Image components
- [ ] Test image loading

### Phase 6: List Virtualization

- [ ] Create virtual scroll hook
- [ ] Replace ScrollView with FlatList
- [ ] Implement FlashList for large lists

### Phase 7: Bundle Optimization

- [ ] Configure Metro bundler
- [ ] Optimize imports
- [ ] Run bundle analysis

### Phase 8: Performance Monitoring

- [ ] Create performance tracking utility
- [ ] Add performance tracking to components
- [ ] Set up monitoring

### Post-Migration

- [ ] Test performance improvements
- [ ] Validate all functionality
- [ ] Update documentation
- [ ] Train team on new patterns

## Expected Results

After completing the migration, you should see:

- **Bundle Size**: 30-40% reduction in initial bundle size
- **Load Time**: 40-50% improvement in Time to Interactive
- **Memory Usage**: 25-35% reduction in memory usage
- **Scroll Performance**: 60 FPS on all lists
- **Screen Transitions**: < 300ms transition times

## Support and Resources

- [Lazy Loading Guide](../performance/lazy-loading.md)
- [Performance Optimization Guide](../performance/optimization-guide.md)
- [Code Examples](../examples/lazy-loading-examples.tsx)
- [Performance Checklist](../checklists/performance-checklist.md)
- [Architecture Decisions](../architecture/performance-decisions.md)

## Conclusion

This migration guide provides a comprehensive approach to implementing lazy
loading in your React Native Expo project. The incremental approach allows you
to implement changes safely while maintaining functionality. Remember to test
thoroughly at each phase and measure performance improvements to ensure the
migration is successful.
