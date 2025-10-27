import { lazy } from 'react';

// Lazy load feature-specific components for app screens
export const LazyProfileForm = lazy(() => import('./profile-form'));
export const LazyProfileActions = lazy(() => import('./profile-actions'));
export const LazyQuickActionsGrid = lazy(() => import('./quick-actions-grid'));
export const LazyRecentTransactions = lazy(() => import('./recent-transactions'));
export const LazyBalanceCard = lazy(() => import('./balance-card'));
export const LazyTransactionItem = lazy(() => import('./transaction-item'));
