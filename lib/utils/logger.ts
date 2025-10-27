/**
 * Logger utility for development and production environments
 *
 * Provides structured logging with different levels and automatic
 * environment detection. In production, only errors are logged.
 * In development, all levels are logged to console.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

class Logger {
  private isDevelopment: boolean;
  private isEnabled: boolean;

  constructor() {
    // Check if we're in development mode
    this.isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';
    this.isEnabled = true; // Can be disabled for testing
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.isEnabled) return false;

    // In production, only log errors and warnings
    if (!this.isDevelopment) {
      return level === 'error' || level === 'warn';
    }

    // In development, log everything
    return true;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const entry = this.formatMessage(level, message, context);

    // Use appropriate console method based on level
    switch (level) {
      case 'debug':
        console.debug(`[DEBUG] ${entry.timestamp} - ${message}`, context || '');
        break;
      case 'info':
        console.info(`[INFO] ${entry.timestamp} - ${message}`, context || '');
        break;
      case 'warn':
        console.warn(`[WARN] ${entry.timestamp} - ${message}`, context || '');
        break;
      case 'error':
        console.error(`[ERROR] ${entry.timestamp} - ${message}`, context || '');
        break;
    }
  }

  /**
   * Log debug information (development only)
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context);
  }

  /**
   * Log general information
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  /**
   * Log warnings
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  /**
   * Log errors
   */
  error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }

  /**
   * Enable or disable logging (useful for testing)
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Check if logging is enabled
   */
  getEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Check if we're in development mode
   */
  isDev(): boolean {
    return this.isDevelopment;
  }
}

// Create singleton instance
export const logger = new Logger();

// Export the class for testing
export { Logger, type LogEntry, type LogLevel };
