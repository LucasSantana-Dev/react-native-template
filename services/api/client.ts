import { Platform } from 'react-native';

// Base API configuration
const API_BASE_URL = __DEV__
  ? Platform.select({
      ios: 'http://localhost:3000/api',
      android: 'http://10.0.2.2:3000/api',
      web: 'http://localhost:3000/api',
    })
  : 'https://api.yourapp.com';

// API client configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// HTTP methods
export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

// API response type
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

// API error type
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Generic API client function
export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${apiConfig.baseURL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return {
      data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
      code: 'NETWORK_ERROR',
    } as ApiError;
  }
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string) => apiClient<T>(endpoint, { method: httpMethods.GET }),
  post: <T = any>(endpoint: string, data?: any) =>
    apiClient<T>(endpoint, {
      method: httpMethods.POST,
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: <T = any>(endpoint: string, data?: any) =>
    apiClient<T>(endpoint, {
      method: httpMethods.PUT,
      body: data ? JSON.stringify(data) : undefined,
    }),
  delete: <T = any>(endpoint: string) => apiClient<T>(endpoint, { method: httpMethods.DELETE }),
};
