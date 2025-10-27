import { ReactNode } from 'react';

import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

// Base component props
export interface BaseComponentProps {
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  style?: ViewStyle | TextStyle | ImageStyle;
  children?: ReactNode;
}

// Button component types
export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

// Input component types
export interface InputProps extends BaseComponentProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
}

// Card component types
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  actions?: ReactNode;
  image?: string;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

// Modal component types
export interface ModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  animationType?: 'slide' | 'fade' | 'none';
  presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
  transparent?: boolean;
  onDismiss?: () => void;
}

// List component types
export interface ListProps<T = any> extends BaseComponentProps {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListHeaderComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
  ListEmptyComponent?: ReactNode;
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
}

// Loading component types
export interface LoadingProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
}

// Toast component types
export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
  onHide?: () => void;
}

// Badge component types
export interface BadgeProps extends BaseComponentProps {
  count: number;
  maxCount?: number;
  showZero?: boolean;
  color?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

// Avatar component types
export interface AvatarProps extends BaseComponentProps {
  source?: { uri: string } | number;
  size?: number;
  name?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  showBorder?: boolean;
  borderColor?: string;
  borderWidth?: number;
}

// Switch component types
export interface SwitchProps extends BaseComponentProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  trackColor?: {
    false: string;
    true: string;
  };
  thumbColor?: string;
  ios_backgroundColor?: string;
}

// Slider component types
export interface SliderProps extends BaseComponentProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
}

// Picker component types
export interface PickerProps<T = any> extends BaseComponentProps {
  selectedValue: T;
  onValueChange: (value: T) => void;
  items: PickerItem<T>[];
  placeholder?: string;
  disabled?: boolean;
}

export interface PickerItem<T = any> {
  label: string;
  value: T;
  color?: string;
}

// Form component types
export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  validationSchema?: any;
  children: ReactNode;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  children: ReactNode;
}

// Theme-related component types
export interface ThemedComponentProps extends BaseComponentProps {
  light?: ViewStyle | TextStyle | ImageStyle;
  dark?: ViewStyle | TextStyle | ImageStyle;
}

// Animation component types
export interface AnimatedComponentProps extends BaseComponentProps {
  animation?: 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'scale' | 'bounce';
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  children: ReactNode;
}

// Layout component types
export interface ContainerProps extends BaseComponentProps {
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  flex?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  direction?: 'row' | 'column';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}

export interface RowProps extends ContainerProps {
  spacing?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
}

export interface ColumnProps extends ContainerProps {
  spacing?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
}

// Grid component types
export interface GridProps extends BaseComponentProps {
  columns: number;
  spacing?: number;
  children: ReactNode;
}

export interface GridItemProps extends BaseComponentProps {
  span?: number;
  children: ReactNode;
}
