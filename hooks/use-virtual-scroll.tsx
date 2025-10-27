import { useCallback, useMemo, useState } from 'react';
import { FlatListProps, ListRenderItem } from 'react-native';

// ========== VIRTUAL SCROLL HOOK ==========

interface UseVirtualScrollOptions<T> {
  /** Data array */
  data: T[];
  /** Render item function */
  renderItem: ListRenderItem<T>;
  /** Key extractor function */
  keyExtractor: (item: T, index: number) => string;
  /** Estimated item height */
  estimatedItemSize?: number;
  /** Number of items to render initially */
  initialNumToRender?: number;
  /** Maximum number of items to render per batch */
  maxToRenderPerBatch?: number;
  /** Window size multiplier */
  windowSize?: number;
  /** Whether to remove clipped subviews */
  removeClippedSubviews?: boolean;
  /** Whether to maintain visible content position */
  maintainVisibleContentPosition?: boolean;
  /** Scroll position persistence key */
  persistenceKey?: string;
}

/**
 * Hook for virtualized scrolling with optimized performance
 *
 * @example
 * ```tsx
 * const { flatListProps, scrollToIndex, scrollToOffset } = useVirtualScroll({
 *   data: items,
 *   renderItem: ({ item }) => <ItemComponent item={item} />,
 *   keyExtractor: (item) => item.id,
 *   estimatedItemSize: 60,
 * });
 *
 * return <FlatList {...flatListProps} />;
 * ```
 */
export const useVirtualScroll = <T extends Record<string, any>>({
  data,
  renderItem,
  keyExtractor,
  estimatedItemSize = 60,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 5,
  removeClippedSubviews = true,
  maintainVisibleContentPosition = true,
  persistenceKey,
}: UseVirtualScrollOptions<T>) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Calculate item layout for better performance
  const getItemLayout = useCallback(
    (data: ArrayLike<T> | null | undefined, index: number) => {
      if (!data || index >= data.length) {
        return { length: estimatedItemSize, offset: 0, index };
      }

      return {
        length: estimatedItemSize,
        offset: estimatedItemSize * index,
        index,
      };
    },
    [estimatedItemSize],
  );

  // Optimized render item with memoization
  const memoizedRenderItem = useCallback(
    (info: { item: T; index: number; separators: any }) => {
      return renderItem(info);
    },
    [renderItem],
  );

  // Scroll to specific index
  const scrollToIndex = useCallback((_index: number, _animated: boolean = true) => {
    // This would be implemented with FlatList ref
    // console.log(`Scroll to index ${index}, animated: ${animated}`);
  }, []);

  // Scroll to specific offset
  const scrollToOffset = useCallback((_offset: number, _animated: boolean = true) => {
    // This would be implemented with FlatList ref
    // console.log(`Scroll to offset ${offset}, animated: ${animated}`);
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(
    (animated: boolean = true) => {
      scrollToOffset(0, animated);
    },
    [scrollToOffset],
  );

  // Scroll to bottom
  const scrollToBottom = useCallback(
    (animated: boolean = true) => {
      const totalHeight = data.length * estimatedItemSize;
      scrollToOffset(totalHeight, animated);
    },
    [data.length, estimatedItemSize, scrollToOffset],
  );

  // Handle scroll events
  const handleScroll = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(offsetY);
  }, []);

  const handleScrollBeginDrag = useCallback(() => {
    setIsScrolling(true);
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    setIsScrolling(false);
  }, []);

  // FlatList props with optimizations
  const flatListProps: Partial<FlatListProps<T>> = useMemo(
    () => ({
      data,
      renderItem: memoizedRenderItem,
      keyExtractor,
      getItemLayout: getItemLayout,
      initialNumToRender,
      maxToRenderPerBatch,
      windowSize,
      removeClippedSubviews,
      maintainVisibleContentPosition: maintainVisibleContentPosition
        ? {
            minIndexForVisible: 0,
          }
        : undefined,
      onScroll: handleScroll,
      onScrollBeginDrag: handleScrollBeginDrag,
      onScrollEndDrag: handleScrollEndDrag,
      scrollEventThrottle: 16,
      // Performance optimizations
      updateCellsBatchingPeriod: 50,
      disableIntervalMomentum: true,
      disableScrollViewPanResponder: true,
      // Persistence
      ...(persistenceKey && {
        persistentScrollbar: true,
        // Note: persistenceKey would be handled by the parent component
      }),
    }),
    [
      data,
      memoizedRenderItem,
      keyExtractor,
      getItemLayout,
      initialNumToRender,
      maxToRenderPerBatch,
      windowSize,
      removeClippedSubviews,
      maintainVisibleContentPosition,
      handleScroll,
      handleScrollBeginDrag,
      handleScrollEndDrag,
      persistenceKey,
    ],
  );

  return {
    flatListProps,
    scrollPosition,
    isScrolling,
    scrollToIndex,
    scrollToOffset,
    scrollToTop,
    scrollToBottom,
    getItemLayout,
  };
};

/**
 * Hook for infinite scroll with pagination
 *
 * @example
 * ```tsx
 * const {
 *   data,
 *   isLoading,
 *   loadMore,
 *   hasNextPage,
 *   flatListProps
 * } = useInfiniteScroll({
 *   fetchData: fetchItems,
 *   pageSize: 20,
 * });
 *
 * return <FlatList {...flatListProps} />;
 * ```
 */
export const useInfiniteScroll = <T extends Record<string, any>>({
  fetchData,
  pageSize = 20,
  initialData = [],
}: {
  fetchData: (page: number, pageSize: number) => Promise<T[]>;
  pageSize?: number;
  initialData?: T[];
}) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(
    async (page: number, append: boolean = false) => {
      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        const newData = await fetchData(page, pageSize);

        if (append) {
          setData(prev => [...prev, ...newData]);
        } else {
          setData(newData);
        }

        setCurrentPage(page);
        setHasNextPage(newData.length === pageSize);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [fetchData, pageSize],
  );

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasNextPage) {
      loadData(currentPage + 1, true);
    }
  }, [isLoadingMore, hasNextPage, currentPage, loadData]);

  const refresh = useCallback(() => {
    loadData(0, false);
  }, [loadData]);

  const { flatListProps } = useVirtualScroll({
    data,
    renderItem: ({ item: _item }) => {
      // This is a placeholder - in real usage, this would be a proper component
      return null;
    },
    keyExtractor: (_item, index) => `item-${index}`,
  });

  return {
    data,
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,
    loadMore,
    refresh,
    flatListProps: {
      ...flatListProps,
      onEndReached: loadMore,
      onEndReachedThreshold: 0.5,
      refreshing: isLoading,
      onRefresh: refresh,
    },
  };
};

/**
 * Hook for scroll position persistence
 *
 * @example
 * ```tsx
 * const { scrollPosition, saveScrollPosition, restoreScrollPosition } = useScrollPersistence('home-list');
 *
 * return (
 *   <FlatList
 *     onScroll={saveScrollPosition}
 *     contentOffset={{ x: 0, y: scrollPosition }}
 *   />
 * );
 * ```
 */
export const useScrollPersistence = (key: string) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const saveScrollPosition = useCallback(
    (event: any) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setScrollPosition(offsetY);

      // In a real implementation, you would save to AsyncStorage
      // AsyncStorage.setItem(`scroll-${key}`, offsetY.toString());
    },
    [key],
  );

  const restoreScrollPosition = useCallback(async () => {
    // In a real implementation, you would restore from AsyncStorage
    // const saved = await AsyncStorage.getItem(`scroll-${key}`);
    // if (saved) {
    //   setScrollPosition(parseFloat(saved));
    // }
  }, [key]);

  return {
    scrollPosition,
    saveScrollPosition,
    restoreScrollPosition,
  };
};
