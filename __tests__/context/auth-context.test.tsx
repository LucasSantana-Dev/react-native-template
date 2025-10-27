import { act, renderHook } from '@testing-library/react-native';
import React from 'react';

import { AuthProvider, useAuth } from '@/context/auth-context';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock Sentry
jest.mock('@sentry/react-native', () => ({
  setUser: jest.fn(),
  addBreadcrumb: jest.fn(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide initial state', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    // Wait for initial loading to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.signed).toBe(false);
  });

  it('should sign in successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    const mockUser = {
      id: '1',
      name: 'test', // This matches what auth context returns: email.split('@')[0]
      email: 'test@example.com',
      avatar: undefined,
    };

    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.signed).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('should handle sign in error', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      try {
        await result.current.signIn({
          email: '', // Empty email should trigger error
          password: 'wrongpassword',
        });
      } catch {
        // Expected to throw
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.signed).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('should sign out successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    // First sign in
    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(result.current.signed).toBe(true);

    // Then sign out
    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.signed).toBe(false);
  });

  it('should update user profile', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    // First sign in
    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    const updatedUser = {
      id: '1',
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    await act(async () => {
      await result.current.updateUser(updatedUser);
    });

    expect(result.current.user).toEqual(updatedUser);
  });

  it('should clear auth state', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    // First sign in
    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(result.current.signed).toBe(true);

    // Clear auth
    act(() => {
      result.current.clearAuth();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.signed).toBe(false);
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    // This test is tricky because renderHook catches the error
    // We'll test that the hook throws when called directly
    expect(() => {
      const { result } = renderHook(() => useAuth());
      // Try to access the result to trigger the error
      void result.current;
    }).toThrow();

    console.error = originalError;
  });
});
