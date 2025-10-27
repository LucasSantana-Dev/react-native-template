# Performance Best Practices

## Overview

This document outlines the best practices for maintaining optimal performance in
React Native Expo applications. These practices are based on real-world
experience and industry standards for mobile app performance.

## Table of Contents

1. [React Native Performance Fundamentals](#react-native-performance-fundamentals)
2. [Expo-Specific Optimizations](#expo-specific-optimizations)
3. [Navigation Performance](#navigation-performance)
4. [State Management Performance](#state-management-performance)
5. [Animation Performance](#animation-performance)
6. [Network Request Optimization](#network-request-optimization)
7. [Testing Performance Improvements](#testing-performance-improvements)
8. [Performance Monitoring](#performance-monitoring)
9. [Common Performance Anti-patterns](#common-performance-anti-patterns)
10. [Performance Checklist](#performance-checklist)

## React Native Performance Fundamentals

### 1. Component Optimization

#### Use React.memo for Expensive Components

```typescript
// ✅ Good - Memoized component
export const ExpensiveComponent = React.memo<Props>(({ data, onPress }) => {
  const processedData = useMemo(() =>
    data.map(item => processItem(item)), [data]
  );

  return (
    <FlatList
      data={processedData}
      renderItem={({ item }) => (
        <ItemComponent item={item} onPress={onPress} />
      )}
    />
  );
});

// ❌ Bad - Unnecessary re-renders
export const ExpensiveComponent = ({ data, onPress }) => {
  return (
    <FlatList
      data={data.map(item => processItem(item))}
      renderItem={({ item }) => (
        <ItemComponent item={item} onPress={onPress} />
      )}
    />
  );
};
```

#### Optimize Event Handlers with useCallback

```typescript
// ✅ Good - Memoized callback
const handleItemPress = useCallback(
  (id: string) => {
    onItemPress(id);
  },
  [onItemPress],
);

// ❌ Bad - New function on every render
const handleItemPress = (id: string) => {
  onItemPress(id);
};
```

#### Use useMemo for Expensive Calculations

```typescript
// ✅ Good - Memoized calculation
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// ❌ Bad - Calculation on every render
const expensiveValue = calculateExpensiveValue(data);
```

### 2. List Performance

#### Use FlatList for Large Lists

```typescript
// ✅ Good - Virtualized list
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  getItemLayout={getItemLayout}
/>

// ❌ Bad - ScrollView with map
<ScrollView>
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</ScrollView>
```

#### Optimize List Items

```typescript
// ✅ Good - Memoized list item
const ListItem = React.memo<{ item: Item }>(({ item }) => {
  return (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
});

// ❌ Bad - Inline component
<FlatList
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  )}
/>
```

### 3. Image Optimization

#### Use Optimized Image Components

```typescript
// ✅ Good - LazyImage with optimization
<LazyImage
  source={{ uri: imageUrl }}
  blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
  priority="low"
/>

// ❌ Bad - Basic Image component
<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
/>
```

#### Implement Progressive Loading

```typescript
// ✅ Good - Progressive loading with placeholder
<LazyImage
  source={{ uri: imageUrl }}
  placeholder={{ blurhash: lowQualityBlurhash }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={300}
/>
```

## Expo-Specific Optimizations

### 1. Bundle Optimization

#### Configure Metro for Tree Shaking

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

#### Use Specific Imports

```typescript
// ✅ Good - Specific imports
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

// ❌ Bad - Barrel imports
import * as dateFns from 'date-fns';
```

### 2. Asset Optimization

#### Optimize Images

```typescript
// ✅ Good - Optimized image loading
<LazyImage
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  cachePolicy="memory-disk"
  priority="normal"
/>

// ❌ Bad - Unoptimized image
<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  resizeMode="cover"
/>
```

#### Use Appropriate Image Formats

- **JPEG**: For photographs and complex images
- **PNG**: For images with transparency
- **WebP**: For modern browsers (when supported)
- **SVG**: For simple graphics and icons

### 3. Expo Router Optimization

#### Lazy Load Screens

```typescript
// ✅ Good - Lazy loaded screen
const LazyScreen = lazy(() => import('./screen'));

<Suspense fallback={<ScreenLoader />}>
  <LazyScreen />
</Suspense>

// ❌ Bad - Direct import
import Screen from './screen';
```

#### Optimize Navigation

```typescript
// ✅ Good - Optimized navigation
const { flatListProps } = useVirtualScroll({
  data: items,
  renderItem: renderItem,
  keyExtractor: keyExtractor,
  estimatedItemSize: 60,
});

<FlatList {...flatListProps} />

// ❌ Bad - Unoptimized navigation
<ScrollView>
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</ScrollView>
```

## Navigation Performance

### 1. Screen Transitions

#### Optimize Screen Loading

```typescript
// ✅ Good - Lazy loaded screen with error boundary
<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<ScreenLoader />}>
    <LazyScreen />
  </Suspense>
</ErrorBoundary>

// ❌ Bad - Direct screen import
<Screen />
```

#### Preload Critical Screens

```typescript
// ✅ Good - Preload critical screens
const preloadCriticalScreens = useCallback(() => {
  import('./critical-screen');
}, []);

useEffect(() => {
  preloadCriticalScreens();
}, []);
```

### 2. Tab Navigation

#### Lazy Load Tab Content

```typescript
// ✅ Good - Lazy loaded tab content
const LazyTabContent = lazy(() => import('./tab-content'));

<Tab.Screen
  name="tab"
  component={() => (
    <Suspense fallback={<ComponentLoader />}>
      <LazyTabContent />
    </Suspense>
  )}
/>
```

## State Management Performance

### 1. Context Optimization

#### Split Contexts by Domain

```typescript
// ✅ Good - Split contexts
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ❌ Bad - Single large context
const AppContext = createContext<AppContextType | undefined>(undefined);
```

#### Use useMemo for Context Values

```typescript
// ✅ Good - Memoized context value
const contextValue = useMemo(() => ({
  theme: isDark ? darkTheme : lightTheme,
  toggleTheme,
}), [isDark, toggleTheme]);

<ThemeContext.Provider value={contextValue}>
  {children}
</ThemeContext.Provider>
```

### 2. Local State Management

#### Use Appropriate State Hooks

```typescript
// ✅ Good - Appropriate state management
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState<Data[]>([]);

const memoizedData = useMemo(() => data.filter(item => item.isActive), [data]);

// ❌ Bad - Unnecessary state
const [filteredData, setFilteredData] = useState<Data[]>([]);
```

#### Optimize State Updates

```typescript
// ✅ Good - Optimized state update
const updateItem = useCallback((id: string, updates: Partial<Item>) => {
  setItems(prev =>
    prev.map(item => (item.id === id ? { ...item, ...updates } : item)),
  );
}, []);

// ❌ Bad - Inefficient state update
const updateItem = (id: string, updates: Partial<Item>) => {
  const newItems = items.map(item =>
    item.id === id ? { ...item, ...updates } : item,
  );
  setItems(newItems);
};
```

## Animation Performance

### 1. Use Native Driver

```typescript
// ✅ Good - Native driver animation
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // Use native driver
}).start();

// ❌ Bad - JS thread animation
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300,
  useNativeDriver: false, // JS thread
}).start();
```

### 2. Optimize Animation Values

```typescript
// ✅ Good - Memoized animation value
const animatedValue = useMemo(() => new Animated.Value(0), []);

// ❌ Bad - New animation value on every render
const animatedValue = new Animated.Value(0);
```

### 3. Use LayoutAnimation for List Changes

```typescript
// ✅ Good - LayoutAnimation for list changes
const addItem = useCallback((item: Item) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setItems(prev => [...prev, item]);
}, []);

// ❌ Bad - No animation for list changes
const addItem = (item: Item) => {
  setItems(prev => [...prev, item]);
};
```

## Network Request Optimization

### 1. Request Caching

```typescript
// ✅ Good - Cached requests
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});

// ❌ Bad - No caching
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  fetchUsers().then(setData);
}, []);
```

### 2. Request Deduplication

```typescript
// ✅ Good - Deduplicated requests
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});

// ❌ Bad - Duplicate requests
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);
```

### 3. Optimistic Updates

```typescript
// ✅ Good - Optimistic updates
const updateUser = useMutation({
  mutationFn: updateUserApi,
  onMutate: async newUser => {
    await queryClient.cancelQueries(['user', newUser.id]);
    const previousUser = queryClient.getQueryData(['user', newUser.id]);
    queryClient.setQueryData(['user', newUser.id], newUser);
    return { previousUser };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['user', newUser.id], context.previousUser);
  },
});
```

## Testing Performance Improvements

### 1. Performance Testing Tools

#### React DevTools Profiler

```typescript
// Use React DevTools Profiler to identify slow components
// Look for components with high render times
// Identify unnecessary re-renders
```

#### Flipper Performance Plugin

```typescript
// Use Flipper to monitor:
// - Memory usage
// - Network requests
// - Layout performance
// - JavaScript performance
```

### 2. Automated Performance Testing

```typescript
// Performance test example
describe('Performance Tests', () => {
  it('should render list within performance budget', async () => {
    const startTime = performance.now();

    render(<LargeList data={largeDataset} />);

    await waitFor(() => {
      expect(screen.getByTestId('list')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100); // 100ms budget
  });
});
```

### 3. Memory Leak Testing

```typescript
// Memory leak test example
describe('Memory Leak Tests', () => {
  it('should not leak memory on component unmount', () => {
    const { unmount } = render(<ComponentWithSubscriptions />);

    // Trigger component unmount
    unmount();

    // Check that subscriptions are cleaned up
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
```

## Performance Monitoring

### 1. Development Monitoring

```typescript
// Performance overlay for development
{__DEV__ && (
  <PerformanceOverlay
    position="top-right"
    showMetrics={true}
    showMemory={true}
  />
)}
```

### 2. Production Monitoring

```typescript
// Performance tracking in production
const { startTiming, endTiming } = usePerformanceTracking('ScreenName');

useEffect(() => {
  startTiming('load');

  const loadData = async () => {
    await fetchData();
    endTiming('load');
  };

  loadData();
}, []);
```

### 3. Bundle Analysis

```bash
# Regular bundle analysis
npm run bundle:analyze
npm run bundle:stats
npm run bundle:size
```

## Common Performance Anti-patterns

### 1. Unnecessary Re-renders

```typescript
// ❌ Bad - Causes re-render on every parent render
const Component = ({ data }) => {
  const processedData = data.map(item => processItem(item));
  return <List data={processedData} />;
};

// ✅ Good - Memoized processing
const Component = ({ data }) => {
  const processedData = useMemo(() =>
    data.map(item => processItem(item)), [data]
  );
  return <List data={processedData} />;
};
```

### 2. Inline Functions in Render

```typescript
// ❌ Bad - New function on every render
<FlatList
  renderItem={({ item }) => (
    <ItemComponent
      item={item}
      onPress={() => handlePress(item.id)}
    />
  )}
/>

// ✅ Good - Memoized callback
const renderItem = useCallback(({ item }) => (
  <ItemComponent
    item={item}
    onPress={() => handlePress(item.id)}
  />
), [handlePress]);

<FlatList renderItem={renderItem} />
```

### 3. Large Bundle Imports

```typescript
// ❌ Bad - Imports entire library
import * as lodash from 'lodash';

// ✅ Good - Specific imports
import { debounce } from 'lodash/debounce';
```

### 4. Memory Leaks

```typescript
// ❌ Bad - No cleanup
useEffect(() => {
  const subscription = someService.subscribe(handleUpdate);
  // Missing cleanup
}, []);

// ✅ Good - Proper cleanup
useEffect(() => {
  const subscription = someService.subscribe(handleUpdate);

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Performance Checklist

### Before Development

- [ ] Set performance targets
- [ ] Identify performance-critical components
- [ ] Plan lazy loading strategy
- [ ] Set up performance monitoring

### During Development

- [ ] Use React.memo for expensive components
- [ ] Optimize event handlers with useCallback
- [ ] Use useMemo for expensive calculations
- [ ] Implement proper list virtualization
- [ ] Optimize images and assets
- [ ] Use native driver for animations
- [ ] Implement proper cleanup

### After Development

- [ ] Run performance tests
- [ ] Check bundle size
- [ ] Test on low-end devices
- [ ] Monitor memory usage
- [ ] Validate performance targets

### Code Review

- [ ] Check for unnecessary re-renders
- [ ] Verify proper memoization
- [ ] Ensure proper cleanup
- [ ] Check for performance anti-patterns
- [ ] Validate lazy loading implementation

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

## Resources

- [Lazy Loading Guide](../performance/lazy-loading.md)
- [Performance Optimization Guide](../performance/optimization-guide.md)
- [Code Examples](../examples/lazy-loading-examples.tsx)
- [Performance Checklist](../checklists/performance-checklist.md)
- [Architecture Decisions](../architecture/performance-decisions.md)
- [Migration Guide](../guides/migration-to-lazy-loading.md)

## Conclusion

Following these best practices will help you build performant React Native Expo
applications that provide a smooth user experience across all devices and
network conditions. Remember that performance is an ongoing concern that
requires continuous monitoring and optimization.

Key takeaways:

1. **Measure First**: Always measure performance before optimizing
2. **Optimize Strategically**: Focus on the biggest performance impacts
3. **Test Continuously**: Regular performance testing prevents regressions
4. **Monitor in Production**: Real-world performance data is invaluable
5. **Follow Patterns**: Consistent patterns make performance optimization easier
