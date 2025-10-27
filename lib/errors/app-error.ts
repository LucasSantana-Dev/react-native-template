/**
 * Application Error Classes
 *
 * Implements the error handling patterns defined in the rules:
 * - Never throw strings, always throw Error or typed subclasses
 * - Include causal error as cause when available
 * - Define clear, stable error codes
 * - Separate user-facing messages from developer logs
 */

export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  readonly timestamp: Date;
  readonly context?: Record<string, unknown>;
  readonly retryable: boolean;
  readonly correlationId?: string;

  constructor(
    message: string,
    context?: Record<string, unknown>,
    cause?: Error,
    retryable: boolean = false,
    correlationId?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.context = context;
    this.retryable = retryable;
    this.correlationId = correlationId;

    // Maintain proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Set cause if provided
    if (cause) {
      (this as any).cause = cause;
    }
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    return this.message;
  }

  /**
   * Get developer-friendly error details
   */
  getDeveloperDetails(): Record<string, unknown> {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
      retryable: this.retryable,
      correlationId: this.correlationId,
      stack: this.stack,
    };
  }
}

/**
 * Authentication Error
 * Used for authentication and authorization failures
 */
export class AuthenticationError extends AppError {
  readonly code = 'AUTH_ERROR';
  readonly statusCode = 401;

  constructor(
    message: string = 'Authentication failed',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, false, correlationId);
  }

  getUserMessage(): string {
    return 'Please sign in to continue';
  }
}

/**
 * Authorization Error
 * Used when user doesn't have permission for an action
 */
export class AuthorizationError extends AppError {
  readonly code = 'AUTHZ_ERROR';
  readonly statusCode = 403;

  constructor(
    message: string = 'Access denied',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, false, correlationId);
  }

  getUserMessage(): string {
    return 'You do not have permission to perform this action';
  }
}

/**
 * Validation Error
 * Used for input validation failures
 */
export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;
  readonly field?: string;
  readonly value?: unknown;

  constructor(
    message: string,
    field?: string,
    value?: unknown,
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, false, correlationId);
    this.field = field;
    this.value = value;
  }

  getUserMessage(): string {
    if (this.field) {
      return `${this.field}: ${this.message}`;
    }
    return this.message;
  }
}

/**
 * Network Error
 * Used for network-related failures
 */
export class NetworkError extends AppError {
  readonly code = 'NETWORK_ERROR';
  readonly statusCode = 0;

  constructor(
    message: string = 'Network request failed',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, true, correlationId);
  }

  getUserMessage(): string {
    return 'Please check your internet connection and try again';
  }
}

/**
 * Timeout Error
 * Used for request timeouts
 */
export class TimeoutError extends AppError {
  readonly code = 'TIMEOUT_ERROR';
  readonly statusCode = 408;

  constructor(
    message: string = 'Request timeout',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, true, correlationId);
  }

  getUserMessage(): string {
    return 'The request took too long. Please try again';
  }
}

/**
 * Server Error
 * Used for server-side errors
 */
export class ServerError extends AppError {
  readonly code = 'SERVER_ERROR';
  readonly statusCode = 500;

  constructor(
    message: string = 'Internal server error',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, true, correlationId);
  }

  getUserMessage(): string {
    return 'Something went wrong. Please try again later';
  }
}

/**
 * Not Found Error
 * Used when a resource is not found
 */
export class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND_ERROR';
  readonly statusCode = 404;

  constructor(
    message: string = 'Resource not found',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, false, correlationId);
  }

  getUserMessage(): string {
    return 'The requested resource was not found';
  }
}

/**
 * Conflict Error
 * Used when there's a conflict with the current state
 */
export class ConflictError extends AppError {
  readonly code = 'CONFLICT_ERROR';
  readonly statusCode = 409;

  constructor(
    message: string = 'Conflict occurred',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, false, correlationId);
  }

  getUserMessage(): string {
    return 'There was a conflict with your request. Please refresh and try again';
  }
}

/**
 * Rate Limit Error
 * Used when rate limits are exceeded
 */
export class RateLimitError extends AppError {
  readonly code = 'RATE_LIMIT_ERROR';
  readonly statusCode = 429;
  readonly retryAfter?: number;

  constructor(
    message: string = 'Rate limit exceeded',
    retryAfter?: number,
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, true, correlationId);
    this.retryAfter = retryAfter;
  }

  getUserMessage(): string {
    if (this.retryAfter) {
      return `Too many requests. Please wait ${this.retryAfter} seconds before trying again`;
    }
    return 'Too many requests. Please wait before trying again';
  }
}

/**
 * Storage Error
 * Used for local storage failures
 */
export class StorageError extends AppError {
  readonly code = 'STORAGE_ERROR';
  readonly statusCode = 0;

  constructor(
    message: string = 'Storage operation failed',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, true, correlationId);
  }

  getUserMessage(): string {
    return 'Failed to save data. Please try again';
  }
}

/**
 * Configuration Error
 * Used for configuration-related errors
 */
export class ConfigurationError extends AppError {
  readonly code = 'CONFIG_ERROR';
  readonly statusCode = 500;

  constructor(
    message: string = 'Configuration error',
    context?: Record<string, unknown>,
    cause?: Error,
    correlationId?: string,
  ) {
    super(message, context, cause, false, correlationId);
  }

  getUserMessage(): string {
    return 'Application configuration error. Please contact support';
  }
}
