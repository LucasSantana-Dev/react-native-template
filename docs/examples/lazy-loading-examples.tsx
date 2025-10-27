/**
 * Lazy Loading Examples
 *
 * This file contains comprehensive examples of lazy loading patterns
 * implemented in this React Native Expo project.
 */

import { FlashList } from '@shopify/flash-list';
import React, { Suspense, lazy } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import {
  ComponentLoader,
  ScreenLoader,
  SkeletonLoader,
} from '@/components/common/loading-fallback';
import { LazyImage } from '@/components/ui/lazy-image';
import {
  useLazyLoad,
  useLazyLoadManager,
  useLazyLoadOnView,
  usePreload,
} from '@/hooks/use-lazy-load';
import { useInfiniteScroll, useVirtualScroll } from '@/hooks/use-virtual-scroll';
import { usePerformanceTracking } from '@/lib/utils/performance';

// ========== SCREEN-LEVEL LAZY LOADING ==========

// Lazy load heavy screens
const LazyHomeScreen = lazy(() => import('../../app/(app)/home'));
const LazyProfileScreen = lazy(() => import('../../app/(app)/profile'));
const LazyExploreScreen = lazy(() => import('../../app/(tabs)/explore'));

/**
 * Example: Screen-level lazy loading with error boundary
 */
export const LazyScreenExample: React.FC = () => {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <LazyHomeScreen />
    </Suspense>
  );
};

// ========== COMPONENT-LEVEL LAZY LOADING ==========

// Lazy load feature components
const LazyProfileForm = lazy(() => import('../../app/(app)/components/profile-form'));
const LazyFeaturesGrid = lazy(() => import('../../app/(tabs)/components/features-grid'));
const LazyQuickActions = lazy(() => import('../../app/(app)/components/quick-actions-grid'));

/**
 * Example: Component lazy loading with delay
 */
export const DelayedComponentExample: React.FC = () => {
  const shouldLoad = useLazyLoad(1000); // Load after 1 second

  return (
    <View>
      <Text>Main content loads immediately</Text>

      <Suspense fallback={<ComponentLoader message="Loading heavy component..." />}>
        {shouldLoad && <LazyProfileForm />}
      </Suspense>
    </View>
  );
};

/**
 * Example: Viewport-based lazy loading
 */
export const ViewportLazyExample: React.FC = () => {
  const { ref, shouldLoad } = useLazyLoadOnView();

  return (
    <View ref={ref}>
      <Text>This content is visible immediately</Text>

      <Suspense fallback={<SkeletonLoader height={200} />}>
        {shouldLoad && (
          <LazyFeaturesGrid features={[]} isTablet={false} onFeaturePress={() => {}} />
        )}
      </Suspense>
    </View>
  );
};

/**
 * Example: Preloading based on user interaction
 */
export const PreloadExample: React.FC = () => {
  const { isPreloading, onTrigger } = usePreload(500);

  return (
    <TouchableOpacity onPressIn={onTrigger}>
      <Text>Hover to preload component</Text>

      <Suspense fallback={<ComponentLoader />}>
        {isPreloading && (
          <LazyQuickActions actions={[]} isTablet={false} onActionPress={() => {}} />
        )}
      </Suspense>
    </TouchableOpacity>
  );
};

// ========== IMAGE LAZY LOADING ==========

/**
 * Example: Basic lazy image loading
 */
export const LazyImageExample: React.FC = () => {
  return (
    <LazyImage
      source={{ uri: 'https://example.com/image.jpg' }}
      style={{ width: 200, height: 200 }}
    />
  );
};

/**
 * Example: Avatar with fallback
 */
export const AvatarExample: React.FC = () => {
  return (
    <LazyImage
      source={{ uri: 'https://example.com/avatar.jpg' }}
      style={{ width: 60, height: 60, borderRadius: 30 }}
    />
  );
};

/**
 * Example: Hero image with title
 */
export const HeroImageExample: React.FC = () => {
  return (
    <LazyImage
      source={{ uri: 'https://example.com/hero.jpg' }}
      style={{ width: '100%', height: 200 }}
    />
  );
};

// ========== LIST VIRTUALIZATION ==========

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
}

const mockData: ListItem[] = Array.from({ length: 1000 }, (_, index) => ({
  id: `item-${index}`,
  title: `Item ${index + 1}`,
  subtitle: `Subtitle for item ${index + 1}`,
  image: `https://picsum.photos/200/200?random=${index}`,
}));

/**
 * Example: FlatList with virtualization
 */
export const FlatListExample: React.FC = () => {
  const { flatListProps } = useVirtualScroll({
    data: mockData,
    renderItem: ({ item }) => (
      <View style={{ padding: 16, borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{item.subtitle}</Text>
        {item.image && (
          <LazyImage source={{ uri: item.image }} style={{ width: 50, height: 50, marginTop: 8 }} />
        )}
      </View>
    ),
    keyExtractor: item => item.id,
  });

  return <FlatList data={[]} renderItem={() => null} keyExtractor={() => ''} {...flatListProps} />;
};

/**
 * Example: FlashList for better performance
 */
export const FlashListExample: React.FC = () => {
  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={{ padding: 16, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ fontSize: 14, color: '#666' }}>{item.subtitle}</Text>
      {item.image && (
        <LazyImage source={{ uri: item.image }} style={{ width: 50, height: 50, marginTop: 8 }} />
      )}
    </View>
  );

  return <FlashList data={mockData} renderItem={renderItem} keyExtractor={item => item.id} />;
};

/**
 * Example: Infinite scroll with pagination
 */
export const InfiniteScrollExample: React.FC = () => {
  const fetchData = async (page: number, pageSize: number) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return mockData.slice(startIndex, endIndex);
  };

  const { flatListProps, isLoadingMore } = useInfiniteScroll({
    fetchData,
    pageSize: 20,
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>{item.subtitle}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        {...flatListProps}
        ListFooterComponent={() =>
          isLoadingMore ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text>Loading more...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

// ========== PERFORMANCE TRACKING ==========

/**
 * Example: Performance tracking for components
 */
export const PerformanceTrackingExample: React.FC = () => {
  const { startTiming, endTiming } = usePerformanceTracking('ExampleComponent');

  React.useEffect(() => {
    startTiming('render');

    // Simulate component work
    const timer = setTimeout(() => {
      endTiming('render');
    }, 100);

    return () => clearTimeout(timer);
  }, [startTiming, endTiming]);

  return (
    <View>
      <Text>This component tracks its render performance</Text>
    </View>
  );
};

// ========== LAZY LOADING MANAGER ==========

/**
 * Example: Managing multiple lazy-loaded components
 */
export const LazyLoadManagerExample: React.FC = () => {
  const { loadComponent, isLoaded, isLoading, loadAll, loadedCount, totalCount } =
    useLazyLoadManager(['profile', 'settings', 'notifications']);

  return (
    <View>
      <Text>
        Loaded: {loadedCount}/{totalCount}
      </Text>

      <TouchableOpacity onPress={() => loadComponent('profile')}>
        <Text>Load Profile {isLoading('profile') ? '(Loading...)' : ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => loadComponent('settings')}>
        <Text>Load Settings {isLoading('settings') ? '(Loading...)' : ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => loadComponent('notifications')}>
        <Text>Load Notifications {isLoading('notifications') ? '(Loading...)' : ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={loadAll}>
        <Text>Load All Components</Text>
      </TouchableOpacity>

      {isLoaded('profile') && (
        <Suspense fallback={<ComponentLoader />}>
          <LazyProfileForm />
        </Suspense>
      )}
    </View>
  );
};

// ========== ERROR BOUNDARIES ==========

/**
 * Example: Error boundary with retry functionality
 */
export const ErrorBoundaryExample: React.FC = () => {
  return (
    <View>
      <Text>Error boundary example</Text>
      <Suspense fallback={<ComponentLoader />}>
        <LazyProfileForm />
      </Suspense>
    </View>
  );
};

// ========== SKELETON LOADERS ==========

/**
 * Example: Skeleton loaders for different content types
 */
export const SkeletonLoaderExample: React.FC = () => {
  return (
    <View>
      <Text>Card Skeleton:</Text>
      <SkeletonLoader height={100} borderRadius={8} />

      <Text>List Skeleton:</Text>
      <SkeletonLoader height={60} />
      <SkeletonLoader height={60} />
      <SkeletonLoader height={60} />

      <Text>Avatar Skeleton:</Text>
      <SkeletonLoader height={50} width={50} borderRadius={25} />
    </View>
  );
};

// ========== ROUTE-BASED CODE SPLITTING ==========

/**
 * Example: Route-based code splitting
 */
export const RouteBasedSplittingExample: React.FC = () => {
  const [currentRoute, setCurrentRoute] = React.useState('home');

  const renderRoute = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <Suspense fallback={<ScreenLoader />}>
            <LazyHomeScreen />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<ScreenLoader />}>
            <LazyProfileScreen />
          </Suspense>
        );
      case 'explore':
        return (
          <Suspense fallback={<ScreenLoader />}>
            <LazyExploreScreen />
          </Suspense>
        );
      default:
        return <Text>Unknown route</Text>;
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setCurrentRoute('home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentRoute('profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentRoute('explore')}>
          <Text>Explore</Text>
        </TouchableOpacity>
      </View>

      {renderRoute()}
    </View>
  );
};

// ========== EXPORTS ==========

export default {
  LazyScreenExample,
  DelayedComponentExample,
  ViewportLazyExample,
  PreloadExample,
  LazyImageExample,
  AvatarExample,
  HeroImageExample,
  FlatListExample,
  FlashListExample,
  InfiniteScrollExample,
  PerformanceTrackingExample,
  LazyLoadManagerExample,
  ErrorBoundaryExample,
  SkeletonLoaderExample,
  RouteBasedSplittingExample,
};
