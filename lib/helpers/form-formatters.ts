/**
 * Form field formatters for consistent input formatting
 * Integrates with existing utilities in lib/utils/
 */

import { validateCPF } from '../utils/cpf';

// ========== CPF FORMATTERS ==========

/**
 * Format CPF with mask (xxx.xxx.xxx-xx)
 * @param value - Raw CPF string
 * @returns Formatted CPF string
 */
export function formatCPF(value: string): string {
  if (!value) return '';

  // Remove all non-numeric characters
  const cleanValue = value.replace(/\D/g, '');

  // Limit to 11 digits
  const limitedValue = cleanValue.slice(0, 11);

  // Apply mask
  return limitedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Unformat CPF (remove mask)
 * @param value - Formatted CPF string
 * @returns Clean CPF string with only numbers
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validate and format CPF
 * @param value - CPF string (formatted or not)
 * @returns Object with validation result and formatted value
 */
export function validateAndFormatCPF(value: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
  const cleanValue = unformatCPF(value);

  if (!cleanValue) {
    return { isValid: false, formatted: '', error: 'CPF é obrigatório' };
  }

  if (cleanValue.length !== 11) {
    return { isValid: false, formatted: formatCPF(cleanValue), error: 'CPF deve ter 11 dígitos' };
  }

  if (!validateCPF(cleanValue)) {
    return { isValid: false, formatted: formatCPF(cleanValue), error: 'CPF inválido' };
  }

  return { isValid: true, formatted: formatCPF(cleanValue) };
}

// ========== PHONE FORMATTERS ==========

/**
 * Format phone with Brazilian mask ((xx) xxxxx-xxxx)
 * @param value - Raw phone string
 * @returns Formatted phone string
 */
export function formatPhone(value: string): string {
  if (!value) return '';

  // Remove all non-numeric characters
  const cleanValue = value.replace(/\D/g, '');

  // Limit to 11 digits
  const limitedValue = cleanValue.slice(0, 11);

  // Apply mask based on length
  if (limitedValue.length <= 10) {
    // (xx) xxxx-xxxx
    return limitedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    // (xx) xxxxx-xxxx
    return limitedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}

/**
 * Unformat phone (remove mask)
 * @param value - Formatted phone string
 * @returns Clean phone string with only numbers
 */
export function unformatPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validate and format phone
 * @param value - Phone string (formatted or not)
 * @returns Object with validation result and formatted value
 */
export function validateAndFormatPhone(value: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
  const cleanValue = unformatPhone(value);

  if (!cleanValue) {
    return { isValid: false, formatted: '', error: 'Telefone é obrigatório' };
  }

  if (cleanValue.length < 10 || cleanValue.length > 11) {
    return {
      isValid: false,
      formatted: formatPhone(cleanValue),
      error: 'Telefone deve ter 10 ou 11 dígitos',
    };
  }

  return { isValid: true, formatted: formatPhone(cleanValue) };
}

// ========== CURRENCY FORMATTERS ==========

/**
 * Format currency with Brazilian Real (R$)
 * @param value - Numeric value or string
 * @returns Formatted currency string
 */
export function formatCurrency(value: string | number): string {
  if (!value && value !== 0) return '';

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) return '';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);
}

/**
 * Unformat currency (remove currency symbols and formatting)
 * @param value - Formatted currency string
 * @returns Clean numeric string
 */
export function unformatCurrency(value: string): string {
  if (!value) return '';

  // Remove currency symbols and formatting
  return value.replace(/[^\d,.-]/g, '').replace(',', '.');
}

/**
 * Parse currency string to number
 * @param value - Formatted currency string
 * @returns Parsed number
 */
export function parseCurrency(value: string): number {
  const cleanValue = unformatCurrency(value);
  const numericValue = parseFloat(cleanValue);
  return isNaN(numericValue) ? 0 : numericValue;
}

// ========== CEP FORMATTERS ==========

/**
 * Format CEP with mask (xxxxx-xxx)
 * @param value - Raw CEP string
 * @returns Formatted CEP string
 */
export function formatCEP(value: string): string {
  if (!value) return '';

  // Remove all non-numeric characters
  const cleanValue = value.replace(/\D/g, '');

  // Limit to 8 digits
  const limitedValue = cleanValue.slice(0, 8);

  // Apply mask
  return limitedValue.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Unformat CEP (remove mask)
 * @param value - Formatted CEP string
 * @returns Clean CEP string with only numbers
 */
export function unformatCEP(value: string): string {
  return value.replace(/\D/g, '');
}

// ========== GENERIC FORMATTERS ==========

/**
 * Format text to uppercase
 * @param value - Text string
 * @returns Uppercase string
 */
export function formatUppercase(value: string): string {
  return value.toUpperCase();
}

/**
 * Format text to title case
 * @param value - Text string
 * @returns Title case string
 */
export function formatTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format text to sentence case
 * @param value - Text string
 * @returns Sentence case string
 */
export function formatSentenceCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * Remove extra whitespace and normalize text
 * @param value - Text string
 * @returns Normalized string
 */
export function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

// ========== VALIDATION HELPERS ==========

/**
 * Check if a value is empty (null, undefined, empty string, or only whitespace)
 * @param value - Value to check
 * @returns True if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Sanitize input value (remove special characters, normalize)
 * @param value - Input value
 * @param options - Sanitization options
 * @returns Sanitized value
 */
export function sanitizeInput(
  value: string,
  options: {
    removeSpecialChars?: boolean;
    normalizeWhitespace?: boolean;
    trim?: boolean;
  } = {},
): string {
  let sanitized = value;

  if (options.trim !== false) {
    sanitized = sanitized.trim();
  }

  if (options.normalizeWhitespace !== false) {
    sanitized = sanitized.replace(/\s+/g, ' ');
  }

  if (options.removeSpecialChars) {
    sanitized = sanitized.replace(/[^\w\s]/g, '');
  }

  return sanitized;
}

// ========== FORMATTER COMPOSITION ==========

/**
 * Create a formatter function that applies multiple formatters
 * @param formatters - Array of formatter functions
 * @returns Composed formatter function
 */
export function composeFormatters(...formatters: Array<(value: string) => string>) {
  return (value: string): string => {
    return formatters.reduce((acc, formatter) => formatter(acc), value);
  };
}

/**
 * Create a formatter that only applies if condition is met
 * @param condition - Condition function
 * @param formatter - Formatter function
 * @returns Conditional formatter function
 */
export function conditionalFormatter(
  condition: (value: string) => boolean,
  formatter: (value: string) => string,
) {
  return (value: string): string => {
    return condition(value) ? formatter(value) : value;
  };
}
