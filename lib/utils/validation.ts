/**
 * General validation utilities
 */

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a string contains only numeric characters
 */
export function isNumeric(value: string): boolean {
  if (!value) return false;
  return /^\d+$/.test(value);
}

/**
 * Check if a string contains only alphanumeric characters
 */
export function isAlphanumeric(value: string): boolean {
  if (!value) return false;
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Check if a string contains only letters
 */
export function isAlpha(value: string): boolean {
  if (!value) return false;
  return /^[a-zA-Z]+$/.test(value);
}
