import { lazy } from 'react';

// Lazy load auth screens
export const LazyLoginScreen = lazy(() => import('./login'));
export const LazyRegisterScreen = lazy(() => import('./register'));
