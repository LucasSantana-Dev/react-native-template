import { useCallback, useEffect, useRef, useState } from 'react';

import { View } from 'react-native';

/**
 * Hook for lazy loading components with delay
 * Useful for loading components after initial render to improve perceived performance
 *
 * @param delay - Delay in milliseconds before loading
 * @returns boolean indicating if component should be loaded
 *
 * @example
 * ```tsx
 * const shouldLoad = useLazyLoad(1000); // Load after 1 second
 *
 * return (
 *   <Suspense fallback={<ComponentLoader />}>
 *     {shouldLoad && <LazyComponent />}
 *   </Suspense>
 * );
 * ```
 */
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

/**
 * Hook for lazy loading components when they come into view
 * Uses Intersection Observer API for better performance
 *
 * @param threshold - Intersection ratio threshold (0-1)
 * @param rootMargin - Root margin for intersection observer
 * @returns ref to attach to element and boolean indicating if component should be loaded
 *
 * @example
 * ```tsx
 * const { ref, shouldLoad } = useLazyLoadOnView();
 *
 * return (
 *   <View ref={ref}>
 *     <Suspense fallback={<ComponentLoader />}>
 *       {shouldLoad && <LazyComponent />}
 *     </Suspense>
 *   </View>
 * );
 * ```
 */
export const useLazyLoadOnView = (
  threshold: number = 0.1,
  rootMargin: string = '50px'
): { ref: React.RefObject<View | null>; shouldLoad: boolean } => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<View | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element as any);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, shouldLoad };
};

/**
 * Hook for preloading components based on user interaction
 * Preloads components when user hovers or focuses on trigger elements
 *
 * @param preloadDelay - Delay before preloading starts
 * @returns object with preload state and trigger handlers
 *
 * @example
 * ```tsx
 * const { isPreloading, onTrigger } = usePreload(500);
 *
 * return (
 *   <TouchableOpacity onPressIn={onTrigger}>
 *     <Suspense fallback={<ComponentLoader />}>
 *       {isPreloading && <LazyComponent />}
 *     </Suspense>
 *   </TouchableOpacity>
 * );
 * ```
 */
export const usePreload = (preloadDelay: number = 300) => {
  const [isPreloading, setIsPreloading] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const onTrigger = useCallback(() => {
    if (hasTriggered) return;

    setHasTriggered(true);

    const timer = setTimeout(() => {
      setIsPreloading(true);
    }, preloadDelay);

    return () => clearTimeout(timer);
  }, [hasTriggered, preloadDelay]);

  return { isPreloading, onTrigger };
};

/**
 * Hook for managing multiple lazy-loaded components
 * Provides centralized state management for complex lazy loading scenarios
 *
 * @param components - Array of component names to manage
 * @returns object with loading states and control functions
 *
 * @example
 * ```tsx
 * const { loadComponent, isLoaded, isLoading } = useLazyLoadManager(['profile', 'settings']);
 *
 * return (
 *   <View>
 *     <Button onPress={() => loadComponent('profile')}>
 *       Load Profile
 *     </Button>
 *     {isLoaded('profile') && <ProfileComponent />}
 *   </View>
 * );
 * ```
 */
export const useLazyLoadManager = (components: string[]) => {
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());
  const [loadingComponents, setLoadingComponents] = useState<Set<string>>(new Set());

  const loadComponent = useCallback(
    (componentName: string) => {
      if (loadedComponents.has(componentName) || loadingComponents.has(componentName)) {
        return;
      }

      setLoadingComponents((prev) => new Set(prev).add(componentName));

      // Simulate loading delay
      setTimeout(() => {
        setLoadedComponents((prev) => new Set(prev).add(componentName));
        setLoadingComponents((prev) => {
          const newSet = new Set(prev);
          newSet.delete(componentName);
          return newSet;
        });
      }, 100);
    },
    [loadedComponents, loadingComponents]
  );

  const isLoaded = useCallback(
    (componentName: string) => {
      return loadedComponents.has(componentName);
    },
    [loadedComponents]
  );

  const isLoading = useCallback(
    (componentName: string) => {
      return loadingComponents.has(componentName);
    },
    [loadingComponents]
  );

  const loadAll = useCallback(() => {
    components.forEach((component) => loadComponent(component));
  }, [components, loadComponent]);

  return {
    loadComponent,
    isLoaded,
    isLoading,
    loadAll,
    loadedCount: loadedComponents.size,
    totalCount: components.length,
  };
};
