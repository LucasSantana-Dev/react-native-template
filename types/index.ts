// Re-export all types from a central location
export * from './api';
export * from './components';
export * from './navigation';

// Export theme types with specific names to avoid conflicts
export type { ThemeMode, ColorScheme } from './theme';
export type { 
  Theme, 
  ThemeColors, 
  Gradient, 
  Overlay, 
  Typography, 
  Spacing, 
  BorderRadius, 
  Shadow, 
  Shadows, 
  Animation, 
  Breakpoints, 
  ZIndex,
  ComponentStyles,
  ThemeContextType,
  StyleVariant,
  ComponentSize,
  ComponentState,
  SpacingSize,
  FontSize,
  FontWeight,
  BorderRadiusSize,
  ShadowSize
} from './theme';

// Export common types with specific names to avoid conflicts
export type {
  Optional,
  RequiredFields,
  Nullable,
  Maybe,
  Platform,
  LoadingState,
  AsyncState,
  FormField,
  FormState,
  BaseResponse,
  PaginatedResponse,
  AppError,
  ValidationError,
  StorageItem,
  BaseEvent,
  AppConfig as CommonAppConfig,
  User,
  UserProfile,
  UserPreferences,
  UserSettings,
  BaseComponentProps,
  PressableProps,
  AnimationConfig,
  Dimensions,
  LayoutDimensions,
  RootStackParamList,
  TabParamList
} from './common';
