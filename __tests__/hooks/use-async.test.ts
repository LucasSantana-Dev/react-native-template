import { act, renderHook } from '@testing-library/react-native';

import { useAsync } from '@/hooks/use-async';

describe('useAsync Hook', () => {
  it('should initialize with idle state', () => {
    const mockAsyncFunction = jest.fn();
    const { result } = renderHook(() => useAsync(mockAsyncFunction));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle successful async operation', async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue('test data');
    const { result } = renderHook(() => useAsync(mockAsyncFunction));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toBe('test data');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle failed async operation', async () => {
    const mockError = new Error('Test error');
    const mockAsyncFunction = jest.fn().mockRejectedValue(mockError);
    const { result } = renderHook(() => useAsync(mockAsyncFunction));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it('should reset state when reset is called', async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue('test data');
    const { result } = renderHook(() => useAsync(mockAsyncFunction));

    // First execute
    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toBe('test data');

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle multiple executions', async () => {
    const mockAsyncFunction1 = jest.fn().mockResolvedValue('data1');
    const mockAsyncFunction2 = jest.fn().mockResolvedValue('data2');
    const { result: result1 } = renderHook(() => useAsync(mockAsyncFunction1));
    const { result: result2 } = renderHook(() => useAsync(mockAsyncFunction2));

    // First execution
    await act(async () => {
      await result1.current.execute();
    });

    expect(result1.current.data).toBe('data1');

    // Second execution
    await act(async () => {
      await result2.current.execute();
    });

    expect(result2.current.data).toBe('data2');
    expect(mockAsyncFunction1).toHaveBeenCalledTimes(1);
    expect(mockAsyncFunction2).toHaveBeenCalledTimes(1);
  });

  it('should handle async function with parameters', async () => {
    const mockAsyncFunction = jest
      .fn()
      .mockImplementation((param1: string, param2: string) =>
        Promise.resolve(`${param1}-${param2}`),
      );
    const { result } = renderHook(() => useAsync(mockAsyncFunction));

    await act(async () => {
      await result.current.execute('hello', 'world');
    });

    expect(result.current.data).toBe('hello-world');
    expect(mockAsyncFunction).toHaveBeenCalledWith('hello', 'world');
  });
});
