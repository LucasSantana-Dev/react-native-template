/**
 * Generic async operation hook for managing loading, error, and data states
 * Replaces repeated useState patterns across the application
 */

import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

export interface UseAsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UseAsyncReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T | undefined>;
  reset: () => void;
}

export interface UseAsyncOptions {
  /**
   * Whether to reset data when executing a new operation
   * @default true
   */
  resetOnExecute?: boolean;
  /**
   * Whether to reset error when executing a new operation
   * @default true
   */
  resetErrorOnExecute?: boolean;
  /**
   * Whether to throw errors instead of setting them in state
   * @default false
   */
  throwOnError?: boolean;
}

/**
 * Generic hook for managing async operation states
 *
 * @param asyncFunction - The async function to execute
 * @param options - Configuration options
 * @returns Object with state and control functions
 *
 * @example
 * ```typescript
 * const { data, isLoading, error, execute } = useAsync(fetchUser);
 *
 * const handleFetch = () => {
 *   execute(userId);
 * };
 * ```
 */
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions = {},
): UseAsyncReturn<T> {
  const { resetOnExecute = true, resetErrorOnExecute = true, throwOnError = false } = options;

  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // Use ref to track if component is mounted
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: any[]): Promise<T | undefined> => {
      // Reset state if configured
      if (resetOnExecute || resetErrorOnExecute) {
        setState(prev => ({
          ...prev,
          ...(resetOnExecute && { data: null }),
          ...(resetErrorOnExecute && { error: null }),
          isLoading: true,
        }));
      } else {
        setState(prev => ({ ...prev, isLoading: true }));
      }

      try {
        const result = await asyncFunction(...args);

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setState({
            data: result,
            isLoading: false,
            error: null,
          });
        }

        return result;
      } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error(String(error));

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setState({
            data: null,
            isLoading: false,
            error: errorInstance,
          });
        }

        if (throwOnError) {
          throw errorInstance;
        }

        return undefined;
      }
    },
    [asyncFunction, resetOnExecute, resetErrorOnExecute, throwOnError],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
    });
  }, []);

  // Memoize return value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      data: state.data,
      isLoading: state.isLoading,
      error: state.error,
      execute,
      reset,
    }),
    [state.data, state.isLoading, state.error, execute, reset],
  );
}

/**
 * Hook for managing async operations with retry logic
 *
 * @param asyncFunction - The async function to execute
 * @param retryOptions - Retry configuration
 * @returns Object with state and control functions
 *
 * @example
 * ```typescript
 * const { data, isLoading, error, execute } = useAsyncWithRetry(
 *   fetchUser,
 *   { maxRetries: 3, retryDelay: 1000 }
 * );
 * ```
 */
export interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  retryCondition?: (error: Error) => boolean;
}

export function useAsyncWithRetry<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  retryOptions: RetryOptions = {},
): UseAsyncReturn<T> {
  const { maxRetries = 3, retryDelay = 1000, retryCondition = () => true } = retryOptions;

  const retryCountRef = useRef(0);

  const executeWithRetry = useCallback(
    async (...args: any[]): Promise<T> => {
      retryCountRef.current = 0;

      while (retryCountRef.current <= maxRetries) {
        try {
          return await asyncFunction(...args);
        } catch (error) {
          const errorInstance = error instanceof Error ? error : new Error(String(error));

          if (retryCountRef.current < maxRetries && retryCondition(errorInstance)) {
            retryCountRef.current++;
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            continue;
          }

          throw errorInstance;
        }
      }

      throw new Error('Max retries exceeded');
    },
    [asyncFunction, maxRetries, retryDelay, retryCondition],
  );

  return useAsync(executeWithRetry);
}

export default useAsync;
