/**
 * Date validation utilities
 */

/**
 * Check if date is valid
 */
export function isValidDate(date: Date | string | number): boolean {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }

  if (typeof date === 'number') {
    return !isNaN(new Date(date).getTime());
  }

  if (typeof date === 'string') {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }

  return false;
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return false;

  const now = new Date();
  return dateObj < now;
}

/**
 * Check if date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return false;

  const now = new Date();
  return dateObj > now;
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return false;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const inputDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

  return inputDate.getTime() === today.getTime();
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return false;

  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const inputDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

  return inputDate.getTime() === yesterday.getTime();
}

/**
 * Check if date is within date range
 */
export function isDateInRange(
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string
): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const startObj = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const endObj = typeof endDate === 'string' ? new Date(endDate) : endDate;

  if (isNaN(dateObj.getTime()) || isNaN(startObj.getTime()) || isNaN(endObj.getTime())) {
    return false;
  }

  return dateObj >= startObj && dateObj <= endObj;
}
