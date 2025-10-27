// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export type ColorScheme = 'light' | 'dark';

// Platform types
export type Platform = 'ios' | 'android' | 'web';

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Form types
export type FormField<T = any> = {
  value: T;
  error: string | null;
  touched: boolean;
  dirty: boolean;
};

export type FormState<T extends Record<string, any>> = {
  [K in keyof T]: FormField<T[K]>;
} & {
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
};

// Generic response types
export interface BaseResponse {
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface ValidationError extends AppError {
  field: string;
  value: any;
}

// Storage types
export interface StorageItem<T = any> {
  key: string;
  value: T;
  timestamp: number;
  expiresAt?: number;
}

// Event types
export interface BaseEvent {
  type: string;
  timestamp: number;
  payload?: Record<string, any>;
}

// Configuration types
export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  storage: {
    prefix: string;
    encryption: boolean;
  };
  features: {
    analytics: boolean;
    crashReporting: boolean;
    pushNotifications: boolean;
  };
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  preferences: UserPreferences;
  settings: UserSettings;
}

export interface UserPreferences {
  theme: ThemeMode;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface UserSettings {
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    dataSharing: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    biometricEnabled: boolean;
  };
}

// Common component props
export interface BaseComponentProps {
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: any;
}

export interface PressableProps extends BaseComponentProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

// Dimensions types
export interface Dimensions {
  width: number;
  height: number;
}

export interface LayoutDimensions extends Dimensions {
  x: number;
  y: number;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
};
