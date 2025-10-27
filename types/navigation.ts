import { NavigatorScreenParams } from '@react-navigation/native';

// Root stack navigation types
export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList>;
  Modal: {
    title: string;
    content: string;
  };
  Profile: {
    userId: string;
    title?: string;
  };
  Settings: undefined;
  NotFound: undefined;
};

// Tab navigation types
export type TabParamList = {
  Home: undefined;
  Explore: {
    category?: string;
    search?: string;
  };
  Favorites: undefined;
  Profile: undefined;
};

// Auth stack navigation types
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    token: string;
  };
};

// Modal types
export type ModalParamList = {
  ImageViewer: {
    images: string[];
    initialIndex?: number;
  };
  ActionSheet: {
    options: ActionSheetOption[];
    title?: string;
  };
  Confirmation: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  };
};

// Action sheet option type
export interface ActionSheetOption {
  title: string;
  icon?: string;
  destructive?: boolean;
  onPress: () => void;
}

// Navigation state types
export interface NavigationState {
  index: number;
  routes: NavigationRoute[];
  routeNames: string[];
  history?: any[];
  type: string;
  stale: boolean;
}

export interface NavigationRoute {
  key: string;
  name: string;
  params?: any;
}

// Navigation event types
export interface NavigationEvent {
  type: 'focus' | 'blur' | 'beforeRemove' | 'state';
  target: string;
  canPreventDefault: boolean;
  data: {
    action: any;
    state: NavigationState;
  };
}

// Screen options types
export interface ScreenOptions {
  title?: string;
  headerShown?: boolean;
  headerTitle?: string | ((props: any) => React.ReactNode);
  headerLeft?: (props: any) => React.ReactNode;
  headerRight?: (props: any) => React.ReactNode;
  headerStyle?: any;
  headerTintColor?: string;
  headerTitleStyle?: any;
  tabBarIcon?: (props: any) => React.ReactNode;
  tabBarLabel?: string | ((props: any) => React.ReactNode);
  tabBarStyle?: any;
  tabBarActiveTintColor?: string;
  tabBarInactiveTintColor?: string;
}

// Deep linking types
export interface DeepLinkConfig {
  screens: {
    [key: string]: {
      path: string;
      parse?: {
        [key: string]: (value: string) => any;
      };
    };
  };
}

// Navigation hook types
export interface UseNavigationReturn {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  reset: (state: any) => void;
  setParams: (params: any) => void;
  dispatch: (action: any) => void;
}

export interface UseRouteReturn<T = any> {
  key: string;
  name: string;
  params: T;
  path?: string;
}

// Screen component props
export interface ScreenProps<T = any> {
  navigation: UseNavigationReturn;
  route: UseRouteReturn<T>;
}

// Tab bar types
export interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

// Header types
export interface HeaderProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onBackPress?: () => void;
  style?: any;
}

// Drawer navigation types (if using drawer)
export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Help: undefined;
  About: undefined;
};

// Stack screen props type helper
export type StackScreenProps<T extends keyof RootStackParamList> = {
  navigation: any;
  route: { params: RootStackParamList[T] };
};

// Tab screen props type helper
export type TabScreenProps<T extends keyof TabParamList> = {
  navigation: any;
  route: { params: TabParamList[T] };
};
