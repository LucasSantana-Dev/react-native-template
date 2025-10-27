/**
 * Date manipulation utilities
 */

/**
 * Add days to date
 */
export function addDays(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtract days from date
 */
export function subtractDays(date: Date | string, days: number): Date {
  return addDays(date, -days);
}

/**
 * Add months to date
 */
export function addMonths(date: Date | string, months: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Subtract months from date
 */
export function subtractMonths(date: Date | string, months: number): Date {
  return addMonths(date, -months);
}

/**
 * Add years to date
 */
export function addYears(date: Date | string, years: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Subtract years from date
 */
export function subtractYears(date: Date | string, years: number): Date {
  return addYears(date, -years);
}

/**
 * Get start of day
 */
export function startOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day
 */
export function endOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get start of month
 */
export function startOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
  return startOfDay(result);
}

/**
 * Get end of month
 */
export function endOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
  return endOfDay(result);
}

/**
 * Get start of year
 */
export function startOfYear(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj.getFullYear(), 0, 1);
  return startOfDay(result);
}

/**
 * Get end of year
 */
export function endOfYear(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj.getFullYear(), 11, 31);
  return endOfDay(result);
}
