import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
// import { performance } from '@shopify/react-native-performance';

// Mock performance object for development
const performanceMock = {
  mark: (name: string) => {
    console.log(`Performance mark: ${name}`);
  },
  measure: (name: string, startMark: string, endMark: string) => {
    console.log(`Performance measure: ${name} from ${startMark} to ${endMark}`);
  },
  memory: {
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
  },
};

// Use the mock performance object
const perf = performanceMock as any;

// ========== PERFORMANCE MONITORING UTILITIES ==========

/**
 * Performance metrics tracking
 */
export class PerformanceTracker {
  private static instance: PerformanceTracker;
  private metrics: Map<string, number> = new Map();
  private marks: Map<string, number> = new Map();

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  /**
   * Start timing a performance metric
   *
   * @param name - Metric name
   * @example
   * ```tsx
   * PerformanceTracker.getInstance().startTiming('screen-load');
   * ```
   */
  startTiming(name: string): void {
    const startTime = Date.now();
    this.marks.set(`${name}-start`, startTime);

    // Also use Shopify Performance if available
    if (perf?.mark) {
      perf.mark(`${name}-start`);
    }
  }

  /**
   * End timing a performance metric
   *
   * @param name - Metric name
   * @returns Duration in milliseconds
   * @example
   * ```tsx
   * const duration = PerformanceTracker.getInstance().endTiming('screen-load');
   * console.log(`Screen loaded in ${duration}ms`);
   * ```
   */
  endTiming(name: string): number {
    const endTime = Date.now();
    const startTime = this.marks.get(`${name}-start`);

    if (!startTime) {
      console.warn(`No start time found for metric: ${name}`);
      return 0;
    }

    const duration = endTime - startTime;
    this.metrics.set(name, duration);
    this.marks.delete(`${name}-start`);

    // Also use Shopify Performance if available
    if (perf?.mark) {
      perf.mark(`${name}-end`);
      perf.measure(name, `${name}-start`, `${name}-end`);
    }

    return duration;
  }

  /**
   * Get a performance metric
   *
   * @param name - Metric name
   * @returns Duration in milliseconds or undefined
   */
  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  /**
   * Get all performance metrics
   *
   * @returns Object with all metrics
   */
  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
    this.marks.clear();
  }

  /**
   * Get performance summary
   *
   * @returns Performance summary object
   */
  getSummary(): {
    totalMetrics: number;
    averageTime: number;
    slowestMetric: { name: string; duration: number } | null;
    fastestMetric: { name: string; duration: number } | null;
  } {
    const metrics = Array.from(this.metrics.entries());

    if (metrics.length === 0) {
      return {
        totalMetrics: 0,
        averageTime: 0,
        slowestMetric: null,
        fastestMetric: null,
      };
    }

    const durations = metrics.map(([, duration]) => duration);
    const averageTime = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;

    const slowestMetric = metrics.reduce(
      (slowest, [name, duration]) => (duration > slowest.duration ? { name, duration } : slowest),
      { name: '', duration: 0 }
    );

    const fastestMetric = metrics.reduce(
      (fastest, [name, duration]) => (duration < fastest.duration ? { name, duration } : fastest),
      { name: '', duration: Infinity }
    );

    return {
      totalMetrics: metrics.length,
      averageTime: Math.round(averageTime),
      slowestMetric: slowestMetric.duration > 0 ? slowestMetric : null,
      fastestMetric: fastestMetric.duration !== Infinity ? fastestMetric : null,
    };
  }
}

/**
 * Hook for tracking component performance
 *
 * @param componentName - Name of the component
 * @returns Object with timing functions
 *
 * @example
 * ```tsx
 * const { startTiming, endTiming } = usePerformanceTracking('HomeScreen');
 *
 * useEffect(() => {
 *   startTiming('render');
 *   // Component logic
 *   endTiming('render');
 * }, []);
 * ```
 */
export const usePerformanceTracking = (componentName: string) => {
  const tracker = PerformanceTracker.getInstance();

  const startTiming = (metricName: string) => {
    tracker.startTiming(`${componentName}-${metricName}`);
  };

  const endTiming = (metricName: string) => {
    return tracker.endTiming(`${componentName}-${metricName}`);
  };

  const getMetric = (metricName: string) => {
    return tracker.getMetric(`${componentName}-${metricName}`);
  };

  return {
    startTiming,
    endTiming,
    getMetric,
  };
};

/**
 * Hook for tracking screen performance
 *
 * @param screenName - Name of the screen
 * @returns Object with screen timing functions
 *
 * @example
 * ```tsx
 * const { trackScreenLoad, trackScreenInteraction } = useScreenPerformance('HomeScreen');
 *
 * useEffect(() => {
 *   trackScreenLoad();
 * }, []);
 * ```
 */
export const useScreenPerformance = (screenName: string) => {
  const tracker = PerformanceTracker.getInstance();

  const trackScreenLoad = () => {
    tracker.startTiming(`${screenName}-load`);

    // Track when screen is fully loaded
    const checkLoaded = () => {
      if (document.readyState === 'complete') {
        tracker.endTiming(`${screenName}-load`);
      } else {
        setTimeout(checkLoaded, 100);
      }
    };

    checkLoaded();
  };

  const trackScreenInteraction = (interactionName: string) => {
    tracker.startTiming(`${screenName}-${interactionName}`);

    return () => {
      tracker.endTiming(`${screenName}-${interactionName}`);
    };
  };

  const trackScreenRender = () => {
    tracker.startTiming(`${screenName}-render`);

    return () => {
      tracker.endTiming(`${screenName}-render`);
    };
  };

  return {
    trackScreenLoad,
    trackScreenInteraction,
    trackScreenRender,
  };
};

/**
 * Hook for tracking list performance
 *
 * @param listName - Name of the list
 * @returns Object with list timing functions
 *
 * @example
 * ```tsx
 * const { trackListRender, trackListScroll } = useListPerformance('TransactionList');
 *
 * const renderItem = useCallback(({ item }) => {
 *   trackListRender();
 *   return <TransactionItem item={item} />;
 * }, [trackListRender]);
 * ```
 */
export const useListPerformance = (listName: string) => {
  const tracker = PerformanceTracker.getInstance();

  const trackListRender = () => {
    tracker.startTiming(`${listName}-render`);

    return () => {
      tracker.endTiming(`${listName}-render`);
    };
  };

  const trackListScroll = () => {
    tracker.startTiming(`${listName}-scroll`);

    return () => {
      tracker.endTiming(`${listName}-scroll`);
    };
  };

  const trackListDataLoad = () => {
    tracker.startTiming(`${listName}-data-load`);

    return () => {
      tracker.endTiming(`${listName}-data-load`);
    };
  };

  return {
    trackListRender,
    trackListScroll,
    trackListDataLoad,
  };
};

/**
 * Performance monitoring component for development
 *
 * @param props - Component props
 * @returns Performance overlay component
 *
 * @example
 * ```tsx
 * {__DEV__ && <PerformanceOverlay />}
 * ```
 */
export const PerformanceOverlay: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showMetrics?: boolean;
  showMemory?: boolean;
}> = ({ position = 'top-right', showMetrics = true, showMemory = true }) => {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [memory, setMemory] = useState<number>(0);

  useEffect(() => {
    if (!__DEV__) return;

    const tracker = PerformanceTracker.getInstance();

    const updateMetrics = () => {
      setMetrics(tracker.getAllMetrics());
    };

    const updateMemory = () => {
      if (perf.memory) {
        setMemory(perf.memory.usedJSHeapSize / 1024 / 1024); // MB
      }
    };

    const interval = setInterval(() => {
      updateMetrics();
      updateMemory();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!__DEV__) return null;

  const positionStyles = {
    'top-left': { top: 50, left: 10 },
    'top-right': { top: 50, right: 10 },
    'bottom-left': { bottom: 50, left: 10 },
    'bottom-right': { bottom: 50, right: 10 },
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: 10,
          borderRadius: 5,
          zIndex: 9999,
        },
        positionStyles[position],
      ]}
    >
      {showMetrics && (
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Performance Metrics</Text>
          {Object.entries(metrics).map(([name, duration]) => (
            <Text key={name} style={{ color: 'white', fontSize: 12 }}>
              {name}: {duration}ms
            </Text>
          ))}
        </View>
      )}

      {showMemory && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Memory Usage</Text>
          <Text style={{ color: 'white', fontSize: 12 }}>{memory.toFixed(2)} MB</Text>
        </View>
      )}
    </View>
  );
};

/**
 * Performance benchmarking utility
 *
 * @param name - Benchmark name
 * @param fn - Function to benchmark
 * @param iterations - Number of iterations
 * @returns Benchmark results
 *
 * @example
 * ```tsx
 * const results = benchmark('list-render', () => {
 *   renderList(data);
 * }, 100);
 *
 * console.log(`Average: ${results.average}ms`);
 * ```
 */
export const benchmark = async <T>(
  name: string,
  fn: () => T | Promise<T>,
  iterations: number = 1
): Promise<{
  name: string;
  iterations: number;
  totalTime: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
  results: T[];
}> => {
  const times: number[] = [];
  const results: T[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    const result = await fn();
    const end = Date.now();

    times.push(end - start);
    results.push(result);
  }

  const totalTime = times.reduce((sum, time) => sum + time, 0);
  const averageTime = totalTime / iterations;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  return {
    name,
    iterations,
    totalTime,
    averageTime,
    minTime,
    maxTime,
    results,
  };
};

// Export singleton instance
export const performanceTracker = PerformanceTracker.getInstance();
