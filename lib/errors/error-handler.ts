/**
 * Error Handler Utilities
 *
 * Implements error handling patterns from the rules:
 * - Consistent error handling structure
 * - Error mapping at boundaries
 * - User-friendly error messages
 * - Structured logging
 */

import * as Sentry from '@sentry/react-native';
import { AppError, AuthenticationError, NetworkError, ValidationError } from './app-error';

/**
 * Error handler function type
 */
export type ErrorHandler<T> = (error: AppError) => T;

/**
 * Error handler configuration
 */
export interface ErrorHandlerConfig<T> {
  validation?: ErrorHandler<T>;
  network?: ErrorHandler<T>;
  auth?: ErrorHandler<T>;
  server?: ErrorHandler<T>;
  timeout?: ErrorHandler<T>;
  notFound?: ErrorHandler<T>;
  conflict?: ErrorHandler<T>;
  rateLimit?: ErrorHandler<T>;
  storage?: ErrorHandler<T>;
  config?: ErrorHandler<T>;
  default?: ErrorHandler<T>;
}

/**
 * Error context for logging
 */
export interface ErrorContext extends Record<string, unknown> {
  userId?: string;
  sessionId?: string;
  correlationId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Handle error with type-safe error mapping
 *
 * @param error - The error to handle
 * @param handlers - Error handlers for different error types
 * @returns Result of the appropriate handler
 */
export function handleError<T>(error: unknown, handlers: ErrorHandlerConfig<T>): T {
  const appError = normalizeError(error);

  // Log error for monitoring
  logError(appError);

  // Route to appropriate handler
  if (appError instanceof ValidationError && handlers.validation) {
    return handlers.validation(appError);
  }
  if (appError instanceof NetworkError && handlers.network) {
    return handlers.network(appError);
  }
  if (appError instanceof AuthenticationError && handlers.auth) {
    return handlers.auth(appError);
  }
  if (handlers.server && isServerError(appError)) {
    return handlers.server(appError);
  }
  if (handlers.timeout && isTimeoutError(appError)) {
    return handlers.timeout(appError);
  }
  if (handlers.notFound && isNotFoundError(appError)) {
    return handlers.notFound(appError);
  }
  if (handlers.conflict && isConflictError(appError)) {
    return handlers.conflict(appError);
  }
  if (handlers.rateLimit && isRateLimitError(appError)) {
    return handlers.rateLimit(appError);
  }
  if (handlers.storage && isStorageError(appError)) {
    return handlers.storage(appError);
  }
  if (handlers.config && isConfigError(appError)) {
    return handlers.config(appError);
  }
  if (handlers.default) {
    return handlers.default(appError);
  }

  // If no handler provided, re-throw
  throw appError;
}

/**
 * Normalize unknown error to AppError
 */
export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    // Try to determine error type from message or name
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return new NetworkError(error.message, undefined, error);
    }
    if (error.message.includes('timeout')) {
      return new NetworkError(error.message, undefined, error);
    }
    if (error.message.includes('unauthorized') || error.message.includes('401')) {
      return new AuthenticationError(error.message, undefined, error);
    }
    if (error.message.includes('forbidden') || error.message.includes('403')) {
      return new AuthenticationError(error.message, undefined, error);
    }
    if (error.message.includes('not found') || error.message.includes('404')) {
      return new NetworkError(error.message, undefined, error);
    }
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return new ValidationError(error.message, undefined, undefined, undefined, error);
    }

    // Default to server error for unknown errors
    return new NetworkError(error.message, undefined, error);
  }

  // Handle string errors (should be avoided per rules)
  if (typeof error === 'string') {
    console.warn('String error thrown - this should be avoided per coding standards');
    return new NetworkError(error);
  }

  // Handle other types
  return new NetworkError('Unknown error occurred', { originalError: error });
}

/**
 * Log error with structured data
 */
export function logError(error: AppError, context?: ErrorContext): void {
  const logData = {
    ...error.getDeveloperDetails(),
    ...context,
  };

  // Log to console in development
  if (__DEV__) {
    console.error('Error occurred:', logData);
  }

  // Send to Sentry for monitoring
  Sentry.captureException(error, {
    extra: logData,
    tags: {
      errorCode: error.code,
      retryable: error.retryable.toString(),
    },
  });
}

/**
 * Create user-friendly error message
 */
export function getUserErrorMessage(error: AppError): string {
  return error.getUserMessage();
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: AppError): boolean {
  return error.retryable;
}

/**
 * Get retry delay for error
 */
export function getRetryDelay(error: AppError, attempt: number = 1): number {
  if (!isRetryableError(error)) {
    return 0;
  }

  // Exponential backoff: 1s, 2s, 4s, 8s, max 30s
  const baseDelay = 1000;
  const maxDelay = 30000;
  const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);

  return delay;
}

// Type guards for specific error types
export function isServerError(error: AppError): boolean {
  return error.statusCode >= 500;
}

export function isTimeoutError(error: AppError): boolean {
  return error.statusCode === 408 || error.message.includes('timeout');
}

export function isNotFoundError(error: AppError): boolean {
  return error.statusCode === 404;
}

export function isConflictError(error: AppError): boolean {
  return error.statusCode === 409;
}

export function isRateLimitError(error: AppError): boolean {
  return error.statusCode === 429;
}

export function isStorageError(error: AppError): boolean {
  return error.code === 'STORAGE_ERROR';
}

export function isConfigError(error: AppError): boolean {
  return error.code === 'CONFIG_ERROR';
}

/**
 * Create error handler for React Native UI
 */
export function createUIErrorHandler() {
  return {
    validation: (error: ValidationError) => {
      // Show field-specific validation message
      return {
        type: 'validation' as const,
        message: error.getUserMessage(),
        field: error.field,
      };
    },
    network: (error: NetworkError) => {
      // Show network error with retry option
      return {
        type: 'network' as const,
        message: error.getUserMessage(),
        retryable: true,
      };
    },
    auth: (error: AuthenticationError) => {
      // Redirect to login or show auth error
      return {
        type: 'auth' as const,
        message: error.getUserMessage(),
        redirectToLogin: true,
      };
    },
    default: (error: AppError) => {
      // Generic error handling
      return {
        type: 'generic' as const,
        message: error.getUserMessage(),
        retryable: error.retryable,
      };
    },
  };
}
