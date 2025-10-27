# Performance Optimization Guide

## Overview

This guide covers comprehensive performance optimization strategies for React
Native Expo applications, including bundle size optimization, memory management,
list virtualization, image optimization, and performance monitoring.

## Table of Contents

1. [Bundle Size Optimization](#bundle-size-optimization)
2. [Memory Management](#memory-management)
3. [List Virtualization](#list-virtualization)
4. [Image Optimization](#image-optimization)
5. [React.lazy() and Suspense Patterns](#reactlazy-and-suspense-patterns)
6. [Performance Monitoring](#performance-monitoring)
7. [Tools and Scripts](#tools-and-scripts)

## Bundle Size Optimization

### 1. Code Splitting

**Strategy**: Split code into smaller, loadable chunks.

```typescript
// Screen-level splitting
const LazyHomeScreen = lazy(() => import('./home'));
const LazyProfileScreen = lazy(() => import('./profile'));

// Component-level splitting
const LazyHeavyComponent = lazy(() => import('./heavy-component'));

// Route-based splitting
const AuthScreens = lazy(() => import('./(auth)/_layout'));
const AppScreens = lazy(() => import('./(app)/_layout'));
```

**Benefits**:

- Reduces initial bundle size by 30-40%
- Improves Time to Interactive (TTI)
- Enables progressive loading

### 2. Tree Shaking

**Strategy**: Remove unused code from bundles.

```javascript
// metro.config.js
module.exports = {
  resolver: {
    unstable_enableSymlinks: true,
    unstable_enablePackageExports: true,
  },
  transformer: {
    minifierConfig: {
      compress: {
        drop_console: true,
        dead_code: true,
        unused: true,
      },
    },
  },
};
```

**Benefits**:

- Removes dead code
- Reduces bundle size
- Improves performance

### 3. Dependency Optimization

**Strategy**: Optimize and minimize dependencies.

```typescript
// Use specific imports
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

// Instead of
import * as dateFns from 'date-fns';
```

**Benefits**:

- Smaller bundle size
- Faster loading
- Better tree shaking

### 4. Metro Bundler Configuration

**Strategy**: Configure Metro for optimal bundling.

```javascript
// metro.config.js
const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  minifierConfig: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info'],
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
```

## Memory Management

### 1. Component Cleanup

**Strategy**: Properly clean up resources when components unmount.

```typescript
useEffect(() => {
  const subscription = someService.subscribe(handleUpdate);

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 2. Image Memory Management

**Strategy**: Optimize image loading and caching.

```typescript
<LazyImage
  source={{ uri: imageUrl }}
  cachePolicy="memory-disk"
  priority="low"
  contentFit="cover"
  transition={200}
/>
```

### 3. List Memory Optimization

**Strategy**: Use virtualized lists for large datasets.

```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  getItemLayout={getItemLayout}
/>
```

### 4. State Management

**Strategy**: Optimize state updates and avoid unnecessary re-renders.

```typescript
// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// Use useCallback for stable references
const handlePress = useCallback(
  (id: string) => {
    onItemPress(id);
  },
  [onItemPress],
);
```

## List Virtualization

### 1. FlatList Optimization

**Strategy**: Configure FlatList for optimal performance.

```typescript
const { flatListProps } = useVirtualScroll({
  data: items,
  renderItem: renderItem,
  keyExtractor: keyExtractor,
  estimatedItemSize: 60,
  initialNumToRender: 10,
  maxToRenderPerBatch: 10,
  windowSize: 5,
  removeClippedSubviews: true,
});

<FlatList {...flatListProps} />
```

### 2. FlashList Implementation

**Strategy**: Use FlashList for better performance with large lists.

```typescript
<FlashList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  estimatedItemSize={200}
  drawDistance={250}
  estimatedListSize={{ height: 800, width: 400 }}
/>
```

### 3. Infinite Scroll

**Strategy**: Implement pagination for large datasets.

```typescript
const {
  data,
  isLoading,
  loadMore,
  hasNextPage,
  flatListProps
} = useInfiniteScroll({
  fetchData: fetchItems,
  pageSize: 20,
});

<FlatList
  {...flatListProps}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
/>
```

## Image Optimization

### 1. Lazy Image Loading

**Strategy**: Load images progressively with placeholders.

```typescript
<LazyImage
  source={{ uri: imageUrl }}
  blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={200}
  priority="low"
/>
```

### 2. Image Caching

**Strategy**: Implement efficient image caching.

```typescript
<LazyImage
  source={{ uri: imageUrl }}
  cachePolicy="memory-disk"
  placeholder={{ blurhash }}
  errorComponent={<ErrorFallback />}
/>
```

### 3. Progressive Loading

**Strategy**: Show low-quality placeholders while loading.

```typescript
<LazyImage
  source={{ uri: imageUrl }}
  placeholder={{ blurhash: lowQualityBlurhash }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={300}
/>
```

## React.lazy() and Suspense Patterns

### 1. Screen-Level Lazy Loading

**Strategy**: Lazy load entire screens.

```typescript
const LazyHomeScreen = lazy(() => import('./home'));
const LazyProfileScreen = lazy(() => import('./profile'));

<Suspense fallback={<ScreenLoader />}>
  <LazyHomeScreen />
</Suspense>
```

### 2. Component-Level Lazy Loading

**Strategy**: Lazy load heavy components.

```typescript
const LazyHeavyComponent = lazy(() => import('./heavy-component'));

const shouldLoad = useLazyLoad(1000);

return (
  <Suspense fallback={<ComponentLoader />}>
    {shouldLoad && <LazyHeavyComponent />}
  </Suspense>
);
```

### 3. Error Boundaries

**Strategy**: Handle lazy loading errors gracefully.

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<ComponentLoader />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

### 4. Preloading Strategy

**Strategy**: Preload components based on user behavior.

```typescript
const { isPreloading, onTrigger } = usePreload(500);

<TouchableOpacity onPressIn={onTrigger}>
  <Suspense fallback={<ComponentLoader />}>
    {isPreloading && <LazyComponent />}
  </Suspense>
</TouchableOpacity>
```

## Performance Monitoring

### 1. Performance Tracking

**Strategy**: Track performance metrics in real-time.

```typescript
const { startTiming, endTiming } = usePerformanceTracking('HomeScreen');

useEffect(() => {
  startTiming('render');
  // Component logic
  endTiming('render');
}, []);
```

### 2. Memory Monitoring

**Strategy**: Monitor memory usage and detect leaks.

```typescript
const { trackScreenLoad } = useScreenPerformance('HomeScreen');

useEffect(() => {
  trackScreenLoad();
}, []);
```

### 3. Bundle Analysis

**Strategy**: Analyze bundle size and composition.

```bash
# Analyze bundle
npm run bundle:analyze

# Get statistics
npm run bundle:stats

# Check file sizes
npm run bundle:size
```

### 4. Performance Overlay

**Strategy**: Show performance metrics in development.

```typescript
{__DEV__ && (
  <PerformanceOverlay
    position="top-right"
    showMetrics={true}
    showMemory={true}
  />
)}
```

## Tools and Scripts

### 1. Bundle Analysis

```bash
# Analyze bundle composition
npm run bundle:analyze

# Get bundle statistics
npm run bundle:stats

# Check largest files
npm run bundle:size
```

### 2. Performance Testing

```bash
# Run performance tests
npm run test:performance

# Profile app performance
npm run performance:profile

# Check code quality
npm run quality:check
```

### 3. Development Tools

- **React DevTools Profiler**: Profile component performance
- **Metro Bundler Analyzer**: Analyze bundle composition
- **Source Map Explorer**: Visualize bundle contents
- **Performance Monitoring Overlay**: Real-time metrics

## Performance Targets

### Bundle Size

- **Initial Bundle**: < 2MB
- **Screen Chunks**: < 100KB each
- **Component Chunks**: < 50KB each

### Load Times

- **Time to Interactive**: < 2s
- **First Contentful Paint**: < 1.5s
- **Screen Transitions**: < 300ms

### Memory Usage

- **Peak Memory**: < 100MB
- **Average Memory**: < 70MB
- **Memory Growth**: < 5MB/hour

### Scroll Performance

- **Frame Rate**: 60 FPS
- **Scroll Lag**: < 16ms
- **List Rendering**: < 100ms

## Best Practices

### 1. Measure First

- Profile before optimization
- Set performance targets
- Measure after each change

### 2. Optimize Strategically

- Focus on biggest impact
- Don't over-optimize
- Balance complexity vs. benefit

### 3. Test on Real Devices

- Use low-end devices
- Test on slow networks
- Monitor real-world usage

### 4. Monitor Continuously

- Set up performance monitoring
- Track key metrics
- Alert on regressions

## Conclusion

Performance optimization is an ongoing process that requires careful
measurement, strategic implementation, and continuous monitoring. By following
the strategies outlined in this guide, you can achieve significant improvements
in bundle size, load times, memory usage, and overall user experience.

For more information, see:

- [Lazy Loading Guide](./lazy-loading.md)
- [Component Patterns Documentation](../patterns/component-patterns.md)
- [Code Examples](../examples/lazy-loading-examples.tsx)
