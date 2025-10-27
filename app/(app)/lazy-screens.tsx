import { lazy } from 'react';

// Lazy load heavy app screens
export const LazyHomeScreen = lazy(() => import('./home'));
export const LazyProfileScreen = lazy(() => import('./profile'));
