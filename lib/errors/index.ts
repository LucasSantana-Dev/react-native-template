/**
 * Error Handling Module
 *
 * Exports all error classes and utilities for consistent error handling
 * across the application.
 */

// Error classes
export {
  AppError,
  AuthenticationError,
  AuthorizationError,
  ConfigurationError,
  ConflictError,
  NetworkError,
  NotFoundError,
  RateLimitError,
  ServerError,
  StorageError,
  TimeoutError,
  ValidationError,
} from './app-error';

// Error handling utilities
export {
  createUIErrorHandler,
  getRetryDelay,
  getUserErrorMessage,
  handleError,
  isConfigError,
  isConflictError,
  isNotFoundError,
  isRateLimitError,
  isRetryableError,
  isServerError,
  isStorageError,
  isTimeoutError,
  logError,
  normalizeError,
  type ErrorContext,
  type ErrorHandler,
  type ErrorHandlerConfig,
} from './error-handler';
