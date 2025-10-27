import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

// ========== AUTH TYPES ==========
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  [key: string]: any; // Allow for additional user properties
}

export interface AuthState {
  user: User | null;
  signed: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType extends AuthState {
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearAuth: () => void;
}

// ========== AUTH CONTEXT ==========
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ========== AUTH PROVIDER PROPS ==========
export interface AuthProviderProps {
  children: ReactNode;
  storageKey?: string;
  onSignIn?: (user: User) => void;
  onSignOut?: () => void;
  onAuthError?: (error: Error) => void;
}

// ========== AUTH PROVIDER ==========
export function AuthProvider({
  children,
  storageKey = '@auth:user',
  onSignIn,
  onSignOut,
  onAuthError,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // Load user from AsyncStorage
  const loadUserFromStorage = async () => {
    try {
      setLoading(true);
      const storedUser = await AsyncStorage.getItem(storageKey);

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setSigned(true);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      onAuthError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Save user to AsyncStorage
  const saveUserToStorage = async (userData: User) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to storage:', error);
      onAuthError?.(error as Error);
    }
  };

  // Remove user from AsyncStorage
  const removeUserFromStorage = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Error removing user from storage:', error);
      onAuthError?.(error as Error);
    }
  };

  // Sign in function
  const signIn = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      // This is a mock implementation
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0] || 'User',
        avatar: undefined,
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate credentials (mock validation)
      if (credentials.email && credentials.password) {
        setUser(mockUser);
        setSigned(true);
        await saveUserToStorage(mockUser);
        onSignIn?.(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      onAuthError?.(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));

      setUser(null);
      setSigned(false);
      await removeUserFromStorage();
      onSignOut?.();
    } catch (error) {
      console.error('Sign out error:', error);
      onAuthError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
    }
  };

  // Clear auth function
  const clearAuth = () => {
    setUser(null);
    setSigned(false);
    removeUserFromStorage();
  };

  const value: AuthContextType = {
    user,
    signed,
    loading,
    signIn,
    signOut,
    updateUser,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ========== AUTH HOOK ==========
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// ========== AUTH HOOKS ==========

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const { signed } = useAuth();
  return signed;
}

/**
 * Hook to get current user
 */
export function useCurrentUser(): User | null {
  const { user } = useAuth();
  return user;
}

/**
 * Hook to check if auth is loading
 */
export function useAuthLoading(): boolean {
  const { loading } = useAuth();
  return loading;
}

/**
 * Hook to get auth actions
 */
export function useAuthActions() {
  const { signIn, signOut, updateUser, clearAuth } = useAuth();

  return {
    signIn,
    signOut,
    updateUser,
    clearAuth,
  };
}

// ========== AUTH UTILITIES ==========

/**
 * Higher-order component to protect routes
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType,
) {
  return function AuthenticatedComponent(props: P) {
    const { signed, loading } = useAuth();

    if (loading) {
      // You can replace this with a loading component
      return null;
    }

    if (!signed) {
      if (fallback) {
        return React.createElement(fallback);
      }
      return null;
    }

    return React.createElement(Component, props);
  };
}

/**
 * Hook to require authentication
 */
export function useRequireAuth() {
  const { signed, loading } = useAuth();

  useEffect(() => {
    if (!loading && !signed) {
      // Redirect to login or show login modal
      // This should be handled by your navigation system
      console.warn('User is not authenticated');
    }
  }, [signed, loading]);

  return { signed, loading };
}

export default AuthProvider;
