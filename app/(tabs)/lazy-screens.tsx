import { lazy } from 'react';

// Lazy load heavy tab screens
export const LazyExploreScreen = lazy(() => import('./explore'));
export const LazyIndexScreen = lazy(() => import('./index'));
export const LazyProfileScreen = lazy(() => import('./profile'));
