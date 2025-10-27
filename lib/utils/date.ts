/**
 * Enhanced date utility functions
 * Inspired by EduBank's date formatting patterns
 */

// ========== DATE FORMATTING ==========

/**
 * Format date to relative format (Hoje, Ontem, or date)
 */
export function formatRelative(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const inputDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

  if (inputDate.getTime() === today.getTime()) {
    return 'Hoje';
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return 'Ontem';
  } else {
    return formatShort(dateObj);
  }
}

/**
 * Format date to short format (dd/mm/yyyy)
 */
export function formatShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Format date to long format (full date string)
 */
export function formatLong(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Format time (HH:mm)
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

/**
 * Format date and time (dd/mm/yyyy HH:mm)
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  return `${formatShort(dateObj)} ${formatTime(dateObj)}`;
}

/**
 * Format date to ISO string
 */
export function formatISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  return dateObj.toISOString();
}

// ========== DATE VALIDATION ==========

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return false;

  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return false;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return dateObj.toDateString() === yesterday.toDateString();
}

/**
 * Check if date is tomorrow
 */
export function isTomorrow(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return false;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return dateObj.toDateString() === tomorrow.toDateString();
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return false;

  const now = new Date();
  return dateObj.getTime() < now.getTime();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return false;

  const now = new Date();
  return dateObj.getTime() > now.getTime();
}

/**
 * Check if date is valid
 */
export function isValidDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime());
}

// ========== DATE CALCULATIONS ==========

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
 * Add months to date
 */
export function addMonths(date: Date | string, months: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setMonth(result.getMonth() + months);
  return result;
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
 * Get difference in days between two dates
 */
export function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get difference in hours between two dates
 */
export function getHoursDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60));
}

/**
 * Get difference in minutes between two dates
 */
export function getMinutesDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60));
}

// ========== DATE PARSING ==========

/**
 * Parse date from Brazilian format (dd/mm/yyyy)
 */
export function parseBrazilianDate(dateString: string): Date | null {
  if (!dateString) return null;

  const parts = dateString.split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  // Check if the date is valid
  if (isNaN(date.getTime())) return null;

  return date;
}

/**
 * Parse date from ISO string
 */
export function parseISODate(isoString: string): Date | null {
  if (!isoString) return null;

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return null;

  return date;
}

// ========== DATE RANGES ==========

/**
 * Get start of day
 */
export function getStartOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day
 */
export function getEndOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get start of week (Monday)
 */
export function getStartOfWeek(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  result.setDate(diff);
  return getStartOfDay(result);
}

/**
 * Get end of week (Sunday)
 */
export function getEndOfWeek(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? 0 : 7); // Adjust when day is Sunday
  result.setDate(diff);
  return getEndOfDay(result);
}

/**
 * Get start of month
 */
export function getStartOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setDate(1);
  return getStartOfDay(result);
}

/**
 * Get end of month
 */
export function getEndOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setMonth(result.getMonth() + 1, 0);
  return getEndOfDay(result);
}

// ========== DATE COMPARISON ==========

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return d1.toDateString() === d2.toDateString();
}

/**
 * Check if two dates are the same month
 */
export function isSameMonth(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

/**
 * Check if two dates are the same year
 */
export function isSameYear(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return d1.getFullYear() === d2.getFullYear();
}
