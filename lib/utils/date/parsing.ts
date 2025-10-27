/**
 * Date parsing utilities
 */

/**
 * Parse date from various formats
 */
export function parseDate(date: string | Date | number): Date | null {
  if (date instanceof Date) {
    return isNaN(date.getTime()) ? null : date;
  }

  if (typeof date === 'number') {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  if (typeof date === 'string') {
    // Try parsing as ISO string
    const isoDate = new Date(date);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    // Try parsing as Brazilian format (dd/mm/yyyy)
    const brazilianMatch = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (brazilianMatch) {
      const [, day, month, year] = brazilianMatch;
      if (day && month && year) {
        const parsed = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return isNaN(parsed.getTime()) ? null : parsed;
      }
    }

    // Try parsing as US format (mm/dd/yyyy)
    const usMatch = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (usMatch) {
      const [, month, day, year] = usMatch;
      if (month && day && year) {
        const parsed = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return isNaN(parsed.getTime()) ? null : parsed;
      }
    }
  }

  return null;
}

/**
 * Parse date from Brazilian format (dd/mm/yyyy)
 */
export function parseBrazilianDate(date: string): Date | null {
  const match = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  if (!day || !month || !year) return null;

  const parsed = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Parse date from ISO format (yyyy-mm-dd)
 */
export function parseISODate(date: string): Date | null {
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Parse date from timestamp
 */
export function parseTimestamp(timestamp: number): Date | null {
  const parsed = new Date(timestamp);
  return isNaN(parsed.getTime()) ? null : parsed;
}
