/**
 * Date comparison utilities
 */

/**
 * Compare two dates
 * Returns -1 if first date is before second, 0 if equal, 1 if after
 */
export function compareDates(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

/**
 * Check if first date is before second date
 */
export function isBefore(date1: Date | string, date2: Date | string): boolean {
  return compareDates(date1, date2) === -1;
}

/**
 * Check if first date is after second date
 */
export function isAfter(date1: Date | string, date2: Date | string): boolean {
  return compareDates(date1, date2) === 1;
}

/**
 * Check if two dates are equal (same day)
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Check if two dates are in the same month
 */
export function isSameMonth(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

/**
 * Check if two dates are in the same year
 */
export function isSameYear(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return d1.getFullYear() === d2.getFullYear();
}

/**
 * Get difference in days between two dates
 */
export function differenceInDays(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get difference in months between two dates
 */
export function differenceInMonths(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  const yearDiff = d2.getFullYear() - d1.getFullYear();
  const monthDiff = d2.getMonth() - d1.getMonth();

  return yearDiff * 12 + monthDiff;
}

/**
 * Get difference in years between two dates
 */
export function differenceInYears(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  return d2.getFullYear() - d1.getFullYear();
}
