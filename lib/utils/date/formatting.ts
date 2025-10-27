/**
 * Date formatting utilities
 */

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

  return dateObj.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date to time format (hh:mm)
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

/**
 * Format date to datetime format (dd/mm/yyyy hh:mm)
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  return `${formatShort(dateObj)} ${formatTime(dateObj)}`;
}

/**
 * Format date to ISO string (yyyy-mm-dd)
 */
export function formatISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
