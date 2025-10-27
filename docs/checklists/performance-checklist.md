# Performance Checklist

## Overview

This checklist ensures that all new screens, components, and features are
implemented with performance best practices in mind. Use this checklist during
development and code review to maintain optimal app performance.

## ✅ New Screen Implementation

### Before Development

- [ ] **Screen Analysis**: Is this screen heavy (>200 lines, complex logic)?
- [ ] **Lazy Loading Decision**: Should this screen be lazy-loaded?
- [ ] **Data Requirements**: What data does this screen need?
- [ ] **User Journey**: How critical is this screen to the user flow?

### During Development

- [ ] **Lazy Loading**: Implement lazy loading if screen is heavy

  ```typescript
  const LazyScreen = lazy(() => import('./screen'));

  <Suspense fallback={<ScreenLoader />}>
    <LazyScreen />
  </Suspense>
  ```

- [ ] **Error Boundaries**: Wrap with error boundary
  ```typescript
  <ErrorBoundary fallback={<ErrorFallback />}>
    <Suspense fallback={<ScreenLoader />}>
      <LazyScreen />
    </Suspense>
  </ErrorBoundary>
  ```
- [ ] **Performance Tracking**: Add performance monitoring
  ```typescript
  const { trackScreenLoad } = useScreenPerformance('ScreenName');
  ```
- [ ] **Memory Management**: Clean up resources on unmount
- [ ] **State Optimization**: Use appropriate state management patterns

### After Development

- [ ] **Bundle Size**: Check impact on bundle size
- [ ] **Load Time**: Measure screen load time
- [ ] **Memory Usage**: Monitor memory consumption
- [ ] **Performance Testing**: Test on low-end devices

## ✅ New Component Creation

### Before Development

- [ ] **Component Analysis**: Is this component heavy or used frequently?
- [ ] **Reusability**: Will this component be used in multiple places?
- [ ] **Dependencies**: What external dependencies does it need?
- [ ] **Performance Impact**: Will it affect render performance?

### During Development

- [ ] **Lazy Loading**: Implement lazy loading for heavy components

  ```typescript
  const LazyComponent = lazy(() => import('./component'));

  <Suspense fallback={<ComponentLoader />}>
    <LazyComponent />
  </Suspense>
  ```

- [ ] **Memoization**: Use React.memo for expensive components
  ```typescript
  export const ExpensiveComponent = React.memo<Props>(({ data }) => {
    // Component implementation
  });
  ```
- [ ] **Callback Optimization**: Use useCallback for event handlers
  ```typescript
  const handlePress = useCallback(
    (id: string) => {
      onItemPress(id);
    },
    [onItemPress],
  );
  ```
- [ ] **Value Optimization**: Use useMemo for expensive calculations
  ```typescript
  const expensiveValue = useMemo(() => {
    return calculateExpensiveValue(data);
  }, [data]);
  ```
- [ ] **Props Optimization**: Minimize prop drilling and unnecessary props

### After Development

- [ ] **Render Performance**: Check for unnecessary re-renders
- [ ] **Bundle Impact**: Verify component doesn't significantly increase bundle
      size
- [ ] **Memory Leaks**: Ensure proper cleanup
- [ ] **Accessibility**: Verify accessibility props are included

## ✅ List Implementation

### Before Development

- [ ] **Data Size**: How many items will be displayed?
- [ ] **Item Complexity**: How complex are the list items?
- [ ] **Scroll Performance**: Will users scroll through many items?
- [ ] **Data Loading**: How will data be loaded (pagination, infinite scroll)?

### During Development

- [ ] **Virtualization**: Use FlatList or FlashList for large lists
  ```typescript
  <FlatList
    data={items}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    initialNumToRender={10}
    maxToRenderPerBatch={10}
    windowSize={5}
    removeClippedSubviews={true}
  />
  ```
- [ ] **Performance Hooks**: Use virtual scroll hooks
  ```typescript
  const { flatListProps } = useVirtualScroll({
    data: items,
    renderItem: renderItem,
    keyExtractor: keyExtractor,
    estimatedItemSize: 60,
  });
  ```
- [ ] **Infinite Scroll**: Implement pagination for large datasets
  ```typescript
  const { data, loadMore, hasNextPage } = useInfiniteScroll({
    fetchData: fetchItems,
    pageSize: 20,
  });
  ```
- [ ] **Item Optimization**: Optimize individual list items
- [ ] **Key Extraction**: Use stable, unique keys

### After Development

- [ ] **Scroll Performance**: Test smooth 60 FPS scrolling
- [ ] **Memory Usage**: Monitor memory with large lists
- [ ] **Load Performance**: Measure time to render first items
- [ ] **End-to-End Testing**: Test with real data

## ✅ Image Usage

### Before Development

- [ ] **Image Analysis**: What type of images will be used?
- [ ] **Loading Strategy**: When should images be loaded?
- [ ] **Placeholder Strategy**: What placeholder should be shown?
- [ ] **Error Handling**: How should image errors be handled?

### During Development

- [ ] **Lazy Loading**: Use LazyImage component
  ```typescript
  <LazyImage
    source={{ uri: imageUrl }}
    blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
    style={{ width: 200, height: 200 }}
    contentFit="cover"
    transition={200}
  />
  ```
- [ ] **Caching**: Configure appropriate cache policy
  ```typescript
  cachePolicy = 'memory-disk';
  priority = 'low';
  ```
- [ ] **Progressive Loading**: Use blurhash placeholders
- [ ] **Error Fallbacks**: Provide error fallback components
- [ ] **Size Optimization**: Use appropriate image sizes

### After Development

- [ ] **Load Performance**: Measure image load times
- [ ] **Memory Usage**: Monitor image memory consumption
- [ ] **Cache Effectiveness**: Verify caching is working
- [ ] **Error Handling**: Test error scenarios

## ✅ Bundle Size Review

### Before Development

- [ ] **Dependency Analysis**: What new dependencies are needed?
- [ ] **Bundle Impact**: How will this affect bundle size?
- [ ] **Tree Shaking**: Can unused code be eliminated?
- [ ] **Alternative Libraries**: Are there lighter alternatives?

### During Development

- [ ] **Import Optimization**: Use specific imports
  ```typescript
  import { format } from 'date-fns/format';
  // Instead of
  import * as dateFns from 'date-fns';
  ```
- [ ] **Dynamic Imports**: Use dynamic imports for heavy dependencies
  ```typescript
  const heavyLibrary = await import('heavy-library');
  ```
- [ ] **Code Splitting**: Split code into smaller chunks
- [ ] **Dead Code Elimination**: Remove unused code

### After Development

- [ ] **Bundle Analysis**: Run bundle analysis
  ```bash
  npm run bundle:analyze
  npm run bundle:stats
  npm run bundle:size
  ```
- [ ] **Size Comparison**: Compare before and after bundle size
- [ ] **Dependency Audit**: Check for unnecessary dependencies
- [ ] **Tree Shaking**: Verify tree shaking is working

## ✅ Memory Leak Prevention

### Before Development

- [ ] **Resource Analysis**: What resources need cleanup?
- [ ] **Subscription Management**: Are there any subscriptions?
- [ ] **Timer Management**: Are there any timers or intervals?
- [ ] **Event Listeners**: Are there any event listeners?

### During Development

- [ ] **Cleanup Functions**: Implement proper cleanup

  ```typescript
  useEffect(() => {
    const subscription = someService.subscribe(handleUpdate);

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  ```

- [ ] **Timer Cleanup**: Clean up timers and intervals

  ```typescript
  useEffect(() => {
    const timer = setInterval(updateData, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  ```

- [ ] **Event Listener Cleanup**: Remove event listeners
- [ ] **State Cleanup**: Reset state on unmount

### After Development

- [ ] **Memory Testing**: Test for memory leaks
- [ ] **Long-Running Tests**: Run app for extended periods
- [ ] **Memory Monitoring**: Use performance monitoring tools
- [ ] **Leak Detection**: Use memory profiling tools

## ✅ Performance Testing

### Before Development

- [ ] **Performance Targets**: What are the performance targets?
- [ ] **Testing Strategy**: How will performance be tested?
- [ ] **Baseline Metrics**: What are the current performance metrics?
- [ ] **Testing Tools**: What tools will be used for testing?

### During Development

- [ ] **Performance Tracking**: Add performance monitoring
  ```typescript
  const { startTiming, endTiming } = usePerformanceTracking('ComponentName');
  ```
- [ ] **Memory Monitoring**: Monitor memory usage
- [ ] **Render Profiling**: Profile component renders
- [ ] **Bundle Monitoring**: Monitor bundle size changes

### After Development

- [ ] **Performance Testing**: Run comprehensive performance tests
- [ ] **Device Testing**: Test on various devices (low-end, high-end)
- [ ] **Network Testing**: Test on different network conditions
- [ ] **Load Testing**: Test with large datasets
- [ ] **Stress Testing**: Test under stress conditions

## ✅ Code Review Checklist

### Performance Review

- [ ] **Lazy Loading**: Are heavy components lazy-loaded?
- [ ] **Memoization**: Are expensive operations memoized?
- [ ] **State Management**: Is state management optimized?
- [ ] **Event Handlers**: Are event handlers optimized?
- [ ] **Dependencies**: Are dependencies minimized and optimized?

### Bundle Review

- [ ] **Import Strategy**: Are imports optimized?
- [ ] **Code Splitting**: Is code properly split?
- [ ] **Tree Shaking**: Is tree shaking working?
- [ ] **Dead Code**: Is dead code eliminated?

### Memory Review

- [ ] **Cleanup**: Are resources properly cleaned up?
- [ ] **Leaks**: Are there potential memory leaks?
- [ ] **Subscriptions**: Are subscriptions properly managed?
- [ ] **Timers**: Are timers properly cleaned up?

## ✅ Performance Monitoring

### Development

- [ ] **Performance Overlay**: Use performance overlay in development
  ```typescript
  {__DEV__ && <PerformanceOverlay />}
  ```
- [ ] **Bundle Analysis**: Regular bundle analysis
- [ ] **Memory Monitoring**: Monitor memory usage
- [ ] **Render Profiling**: Profile component renders

### Production

- [ ] **Performance Tracking**: Implement production performance tracking
- [ ] **Error Monitoring**: Monitor performance errors
- [ ] **User Analytics**: Track user performance metrics
- [ ] **Alerting**: Set up performance alerts

## ✅ Documentation

### Code Documentation

- [ ] **Performance Comments**: Document performance considerations
- [ ] **Usage Examples**: Provide usage examples
- [ ] **Performance Notes**: Note performance implications
- [ ] **Optimization Tips**: Document optimization tips

### Documentation Updates

- [ ] **Performance Guide**: Update performance documentation
- [ ] **Examples**: Update code examples
- [ ] **Checklist**: Update this checklist if needed
- [ ] **README**: Update README with performance information

## ✅ Final Verification

### Performance Verification

- [ ] **All targets met**: Performance targets are achieved
- [ ] **No regressions**: No performance regressions
- [ ] **Memory stable**: Memory usage is stable
- [ ] **Bundle optimized**: Bundle size is optimized

### Quality Verification

- [ ] **Code quality**: Code follows best practices
- [ ] **Documentation**: Documentation is complete
- [ ] **Testing**: All tests pass
- [ ] **Review**: Code review is complete

## 📚 Resources

- [Lazy Loading Guide](../performance/lazy-loading.md)
- [Performance Optimization Guide](../performance/optimization-guide.md)
- [Code Examples](../examples/lazy-loading-examples.tsx)
- [Component Patterns](../patterns/component-patterns.md)

## 🎯 Performance Targets

- **Bundle Size**: < 2MB initial bundle
- **Load Time**: < 2s Time to Interactive
- **Memory Usage**: < 70MB average
- **Scroll Performance**: 60 FPS on all lists
- **Screen Transitions**: < 300ms
- **Image Load Time**: < 1s for visible images

Remember: Performance is not just about speed—it's about providing a smooth,
responsive user experience that works well on all devices and network
conditions.
