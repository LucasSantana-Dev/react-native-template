import { useEffect, useState } from 'react';

import { Dimensions } from 'react-native';

import { theme } from '@/config/theme';

// ========== SCREEN DIMENSIONS TYPES ==========
export interface ScreenDimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

export interface ResponsiveBreakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

export interface Orientation {
  isPortrait: boolean;
  isLandscape: boolean;
}

export interface ScreenInfo {
  dimensions: ScreenDimensions;
  breakpoints: ResponsiveBreakpoints;
  orientation: Orientation;
  isTablet: boolean;
  isPhone: boolean;
}

// ========== SCREEN DIMENSIONS HOOK ==========
export function useScreenDimensions(): ScreenInfo {
  const [dimensions, setDimensions] = useState<ScreenDimensions>(() => {
    const { width, height, scale, fontScale } = Dimensions.get('window');
    return { width, height, scale, fontScale };
  });

  const [orientation, setOrientation] = useState<Orientation>(() => {
    const { width, height } = Dimensions.get('window');
    return {
      isPortrait: height > width,
      isLandscape: width > height,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const { width, height, scale, fontScale } = window;

      setDimensions({ width, height, scale, fontScale });
      setOrientation({
        isPortrait: height > width,
        isLandscape: width > height,
      });
    });

    return () => subscription?.remove();
  }, []);

  // Calculate responsive breakpoints
  const breakpoints: ResponsiveBreakpoints = {
    xs: dimensions.width < theme.breakpoints.sm,
    sm: dimensions.width >= theme.breakpoints.sm && dimensions.width < theme.breakpoints.md,
    md: dimensions.width >= theme.breakpoints.md && dimensions.width < theme.breakpoints.lg,
    lg: dimensions.width >= theme.breakpoints.lg && dimensions.width < theme.breakpoints.xl,
    xl: dimensions.width >= theme.breakpoints.xl,
  };

  // Determine device type
  const isTablet = dimensions.width >= theme.breakpoints.md;
  const isPhone = dimensions.width < theme.breakpoints.md;

  return {
    dimensions,
    breakpoints,
    orientation,
    isTablet,
    isPhone,
  };
}

// ========== RESPONSIVE HOOK ==========
export function useResponsive() {
  const { breakpoints, isTablet, isPhone } = useScreenDimensions();

  return {
    breakpoints,
    isTablet,
    isPhone,
    isMobile: isPhone,
    isDesktop: breakpoints.xl,
  };
}

// ========== ORIENTATION HOOK ==========
export function useOrientation() {
  const { orientation } = useScreenDimensions();

  return orientation;
}

// ========== BREAKPOINT HOOK ==========
export function useBreakpoint() {
  const { breakpoints } = useScreenDimensions();

  const getCurrentBreakpoint = () => {
    if (breakpoints.xl) return 'xl';
    if (breakpoints.lg) return 'lg';
    if (breakpoints.md) return 'md';
    if (breakpoints.sm) return 'sm';
    return 'xs';
  };

  const isBreakpoint = (breakpoint: keyof ResponsiveBreakpoints) => {
    return breakpoints[breakpoint];
  };

  const isBreakpointUp = (breakpoint: keyof ResponsiveBreakpoints) => {
    const breakpointValues = {
      xs: 0,
      sm: theme.breakpoints.sm,
      md: theme.breakpoints.md,
      lg: theme.breakpoints.lg,
      xl: theme.breakpoints.xl,
    };

    const { dimensions } = useScreenDimensions();
    return dimensions.width >= breakpointValues[breakpoint];
  };

  const isBreakpointDown = (breakpoint: keyof ResponsiveBreakpoints) => {
    const breakpointValues = {
      xs: 0,
      sm: theme.breakpoints.sm,
      md: theme.breakpoints.md,
      lg: theme.breakpoints.lg,
      xl: theme.breakpoints.xl,
    };

    const { dimensions } = useScreenDimensions();
    return dimensions.width < breakpointValues[breakpoint];
  };

  return {
    current: getCurrentBreakpoint(),
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
  };
}

// ========== SCREEN SIZE HOOK ==========
export function useScreenSize() {
  const { dimensions } = useScreenDimensions();

  const getScreenSize = () => {
    const { width, height } = dimensions;

    if (width < 320) return 'small';
    if (width < 375) return 'medium';
    if (width < 414) return 'large';
    if (width < 768) return 'xlarge';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const isSmallScreen = dimensions.width < 320;
  const isMediumScreen = dimensions.width >= 320 && dimensions.width < 375;
  const isLargeScreen = dimensions.width >= 375 && dimensions.width < 414;
  const isXLargeScreen = dimensions.width >= 414 && dimensions.width < 768;
  const isTabletScreen = dimensions.width >= 768 && dimensions.width < 1024;
  const isDesktopScreen = dimensions.width >= 1024;

  return {
    size: getScreenSize(),
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isXLargeScreen,
    isTabletScreen,
    isDesktopScreen,
  };
}

// ========== LAYOUT HOOK ==========
export function useLayout() {
  const { dimensions, orientation, isTablet, isPhone } = useScreenDimensions();

  const getLayoutType = () => {
    if (isTablet) {
      return orientation.isLandscape ? 'tablet-landscape' : 'tablet-portrait';
    }

    if (isPhone) {
      return orientation.isLandscape ? 'phone-landscape' : 'phone-portrait';
    }

    return 'desktop';
  };

  const getContentWidth = () => {
    if (isTablet) {
      return Math.min(dimensions.width * 0.8, 800);
    }

    if (isPhone) {
      return dimensions.width - 32; // 16px padding on each side
    }

    return Math.min(dimensions.width * 0.6, 1200);
  };

  const getContentHeight = () => {
    if (isTablet) {
      return Math.min(dimensions.height * 0.8, 600);
    }

    if (isPhone) {
      return dimensions.height - 100; // Account for status bar and navigation
    }

    return Math.min(dimensions.height * 0.7, 800);
  };

  return {
    type: getLayoutType(),
    contentWidth: getContentWidth(),
    contentHeight: getContentHeight(),
    isTablet,
    isPhone,
    orientation,
  };
}
