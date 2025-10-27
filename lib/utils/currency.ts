/**
 * Currency utility functions
 * Inspired by EduBank's currency formatting patterns
 */

// ========== CURRENCY FORMATTING ==========

/**
 * Format number to Brazilian Real (BRL)
 */
export function formatBRL(value: number | string): string {
  if (value === null || value === undefined || value === '') return 'R$ 0,00';

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue);
}

/**
 * Format number to Brazilian Real without currency symbol
 */
export function formatBRLValue(value: number | string): string {
  if (value === null || value === undefined || value === '') return '0,00';

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '0,00';

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue);
}

/**
 * Parse Brazilian Real string to number
 */
export function parseBRL(value: string): number {
  if (!value) return 0;

  // Remove currency symbol and spaces
  let cleaned = value.replace(/R\$\s?/g, '');

  // Replace comma with dot for decimal separator
  cleaned = cleaned.replace(',', '.');

  // Remove any non-numeric characters except dots
  cleaned = cleaned.replace(/[^\d.-]/g, '');

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format currency input (for input fields)
 */
export function formatCurrencyInput(value: string): string {
  if (!value) return '';

  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 0) return '';

  // Convert to number (cents)
  const numValue = parseInt(cleaned) / 100;

  // Format as currency
  return formatBRL(numValue);
}

/**
 * Parse currency input to number
 */
export function parseCurrencyInput(value: string): number {
  if (!value) return 0;

  // Remove currency symbol and spaces
  let cleaned = value.replace(/R\$\s?/g, '');

  // Replace comma with dot for decimal separator
  cleaned = cleaned.replace(',', '.');

  // Remove any non-numeric characters except dots
  cleaned = cleaned.replace(/[^\d.-]/g, '');

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// ========== CURRENCY VALIDATION ==========

/**
 * Check if a string is a valid currency value
 */
export function isValidCurrency(value: string): boolean {
  if (!value) return false;

  // Remove currency symbol and spaces
  const cleaned = value.replace(/R\$\s?/g, '');

  // Check if it matches Brazilian currency format
  const currencyRegex = /^\d{1,3}(\.\d{3})*(,\d{2})?$/;
  return currencyRegex.test(cleaned);
}

/**
 * Check if a number is within valid currency range
 */
export function isWithinCurrencyRange(
  value: number,
  min: number = 0,
  max: number = 999999999.99,
): boolean {
  return value >= min && value <= max;
}

// ========== CURRENCY CONVERSION ==========

/**
 * Convert cents to currency value
 */
export function centsToCurrency(cents: number): number {
  return cents / 100;
}

/**
 * Convert currency value to cents
 */
export function currencyToCents(value: number): number {
  return Math.round(value * 100);
}

/**
 * Convert currency value to cents from string
 */
export function currencyStringToCents(value: string): number {
  const parsed = parseBRL(value);
  return currencyToCents(parsed);
}

// ========== CURRENCY DISPLAY ==========

/**
 * Format currency for display with custom precision
 */
export function formatCurrencyDisplay(value: number, precision: number = 2): string {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
}

/**
 * Format large currency values with abbreviations
 */
export function formatCurrencyAbbreviated(value: number): string {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0';

  const absValue = Math.abs(value);

  if (absValue >= 1e9) {
    return `R$ ${(value / 1e9).toFixed(1).replace('.', ',')}B`;
  } else if (absValue >= 1e6) {
    return `R$ ${(value / 1e6).toFixed(1).replace('.', ',')}M`;
  } else if (absValue >= 1e3) {
    return `R$ ${(value / 1e3).toFixed(1).replace('.', ',')}K`;
  } else {
    return formatBRL(value);
  }
}

/**
 * Format currency for input field (without currency symbol)
 */
export function formatCurrencyForInput(value: number): string {
  if (value === null || value === undefined || isNaN(value)) return '0,00';

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// ========== CURRENCY CALCULATIONS ==========

/**
 * Calculate percentage of a currency value
 */
export function calculateCurrencyPercentage(value: number, percentage: number): number {
  return (value * percentage) / 100;
}

/**
 * Calculate currency with tax
 */
export function calculateCurrencyWithTax(value: number, taxRate: number): number {
  return value * (1 + taxRate / 100);
}

/**
 * Calculate currency without tax
 */
export function calculateCurrencyWithoutTax(value: number, taxRate: number): number {
  return value / (1 + taxRate / 100);
}

/**
 * Calculate currency discount
 */
export function calculateCurrencyDiscount(value: number, discountRate: number): number {
  return value * (1 - discountRate / 100);
}

// ========== CURRENCY COMPARISON ==========

/**
 * Compare two currency values
 */
export function compareCurrency(a: number, b: number): number {
  return a - b;
}

/**
 * Check if currency value is greater than another
 */
export function isCurrencyGreaterThan(a: number, b: number): boolean {
  return a > b;
}

/**
 * Check if currency value is less than another
 */
export function isCurrencyLessThan(a: number, b: number): boolean {
  return a < b;
}

/**
 * Check if currency value is equal to another
 */
export function isCurrencyEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 0.01; // Allow for small floating point differences
}

// ========== CURRENCY ROUNDING ==========

/**
 * Round currency value to specified decimal places
 */
export function roundCurrency(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Round currency value up
 */
export function roundCurrencyUp(value: number, decimals: number = 2): number {
  return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Round currency value down
 */
export function roundCurrencyDown(value: number, decimals: number = 2): number {
  return Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
