// API-related types
export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
  timestamp: string;
}

// HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USER: {
    PROFILE: '/user/profile',
    PREFERENCES: '/user/preferences',
    SETTINGS: '/user/settings',
    AVATAR: '/user/avatar',
  },
  DATA: {
    LIST: '/data',
    CREATE: '/data',
    UPDATE: '/data/:id',
    DELETE: '/data/:id',
    SEARCH: '/data/search',
  },
} as const;

// Request/Response types for specific endpoints
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
}

export interface UserProfileRequest {
  name?: string;
  avatar?: string;
  bio?: string;
}

export interface UserProfileResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    bio?: string;
    updatedAt: string;
  };
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

// File upload types
export interface FileUploadRequest {
  file: {
    uri: string;
    type: string;
    name: string;
  };
  folder?: string;
  public?: boolean;
}

export interface FileUploadResponse {
  url: string;
  key: string;
  size: number;
  type: string;
  uploadedAt: string;
}

// WebSocket types
export interface WebSocketMessage<T = any> {
  type: string;
  payload: T;
  timestamp: number;
  id?: string;
}

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

// Cache types
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  maxSize?: number; // Maximum number of items
  strategy?: 'lru' | 'fifo'; // Eviction strategy
}

export interface CacheItem<T = any> {
  key: string;
  value: T;
  timestamp: number;
  expiresAt: number;
  hits: number;
}
