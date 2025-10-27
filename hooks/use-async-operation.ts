/**
 * Specialized async operation hooks for common patterns
 * Built on top of use-async.ts for better developer experience
 */

import * as React from 'react';
import { useCallback, useMemo, useRef } from 'react';

import { useAsync, UseAsyncReturn } from './use-async';

export interface UseAsyncOperationOptions {
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
  /**
   * Success callback
   */
  onSuccess?: (data: any) => void;
  /**
   * Error callback
   */
  onError?: (error: Error) => void;
}

/**
 * Hook for API calls with standardized error handling
 *
 * @param apiCall - The API function to call
 * @param options - Configuration options
 * @returns Object with state and control functions
 *
 * @example
 * ```typescript
 * const { data, isLoading, error, execute } = useApiCall(
 *   (id) => apiClient.getUser(id),
 *   { onSuccess: (user) => console.log('User loaded:', user) }
 * );
 * ```
 */
export function useApiCall<T, Args extends any[]>(
  apiCall: (...args: Args) => Promise<T>,
  options: UseAsyncOperationOptions = {},
): UseAsyncReturn<T> {
  const { onSuccess, onError, ...asyncOptions } = options;

  const wrappedApiCall = useCallback(
    async (...args: Args): Promise<T> => {
      try {
        const result = await apiCall(...args);
        onSuccess?.(result);
        return result;
      } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error(String(error));
        onError?.(errorInstance);
        throw errorInstance;
      }
    },
    [apiCall, onSuccess, onError],
  );

  return useAsync(wrappedApiCall, asyncOptions);
}

/**
 * Hook for form submissions with loading state
 *
 * @param submitFunction - The submit function
 * @param options - Configuration options
 * @returns Object with state and control functions
 *
 * @example
 * ```typescript
 * const { data, isLoading, error, execute: submit } = useFormSubmission(
 *   (formData) => apiClient.createUser(formData),
 *   { onSuccess: () => router.push('/success') }
 * );
 * ```
 */
export function useFormSubmission<T, Args extends any[]>(
  submitFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOperationOptions = {},
): UseAsyncReturn<T> {
  return useApiCall(submitFunction, {
    resetOnExecute: true,
    resetErrorOnExecute: true,
    ...options,
  });
}

/**
 * Hook for data fetching with automatic execution
 *
 * @param fetchFunction - The fetch function
 * @param dependencies - Dependencies that trigger refetch
 * @param options - Configuration options
 * @returns Object with state and control functions
 *
 * @example
 * ```typescript
 * const { data, isLoading, error, refetch } = useDataFetch(
 *   () => apiClient.getUsers(),
 *   [userId],
 *   { onError: (error) => showToast(error.message) }
 * );
 * ```
 */
export function useDataFetch<T, Deps extends any[]>(
  fetchFunction: (...deps: Deps) => Promise<T>,
  dependencies: Deps,
  options: UseAsyncOperationOptions = {},
): UseAsyncReturn<T> & { refetch: () => Promise<T | undefined> } {
  const asyncResult = useApiCall(fetchFunction, options);

  const refetch = useCallback(async (): Promise<T | undefined> => {
    return asyncResult.execute(...dependencies);
  }, [asyncResult.execute, ...dependencies]);

  // Auto-execute on mount and when dependencies change
  React.useEffect(() => {
    refetch();
  }, dependencies);

  return useMemo(
    () => ({
      ...asyncResult,
      refetch,
    }),
    [asyncResult, refetch],
  );
}

/**
 * Hook for mutations with optimistic updates
 *
 * @param mutationFunction - The mutation function
 * @param options - Configuration options
 * @returns Object with state and control functions
 *
 * @example
 * ```typescript
 * const { data, isLoading, error, execute: mutate } = useMutation(
 *   (userData) => apiClient.updateUser(userData),
 *   { onSuccess: (user) => updateUserInCache(user) }
 * );
 * ```
 */
export function useMutation<T, Args extends any[]>(
  mutationFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOperationOptions = {},
): UseAsyncReturn<T> {
  return useApiCall(mutationFunction, {
    resetOnExecute: false, // Keep previous data for optimistic updates
    resetErrorOnExecute: true,
    ...options,
  });
}

/**
 * Hook for operations that should be debounced
 *
 * @param operationFunction - The operation function
 * @param delay - Debounce delay in milliseconds
 * @param options - Configuration options
 * @returns Object with state and control functions
 *
 * @example
 * ```typescript
 * const { data, isLoading, error, execute: search } = useDebouncedOperation(
 *   (query) => apiClient.searchUsers(query),
 *   300,
 *   { onSuccess: (results) => setSearchResults(results) }
 * );
 * ```
 */
export function useDebouncedOperation<T, Args extends any[]>(
  operationFunction: (...args: Args) => Promise<T>,
  delay: number,
  options: UseAsyncOperationOptions = {},
): UseAsyncReturn<T> {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedOperation = useCallback(
    async (...args: Args): Promise<T> => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Return a promise that resolves after the delay
      return new Promise((resolve, reject) => {
        timeoutRef.current = setTimeout(async () => {
          try {
            const result = await operationFunction(...args);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, delay);
      });
    },
    [operationFunction, delay],
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useAsync(debouncedOperation, options);
}

export default useApiCall;
