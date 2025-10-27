import { lazy } from 'react';

// Lazy load feature-specific components for tabs
export const LazyFeaturesGrid = lazy(() => import('./features-grid'));
export const LazyDocumentationCard = lazy(() => import('./documentation-card'));
export const LazyWelcomeCard = lazy(() => import('./welcome-card'));
