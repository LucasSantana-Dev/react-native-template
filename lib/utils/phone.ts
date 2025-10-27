/**
 * Brazilian phone number utilities
 * Mobile and landline formatting and validation
 */

/**
 * Format phone number with appropriate mask
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';

  const cleaned = cleanPhone(phone);

  // Mobile phone (11 digits)
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  // Landline (10 digits)
  else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  // Partial formatting
  else if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
}

/**
 * Clean phone by removing all non-numeric characters
 */
export function cleanPhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
}

/**
 * Validate phone number format
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;

  const cleaned = cleanPhone(phone);

  // Check if it has 10 or 11 digits
  if (cleaned.length !== 10 && cleaned.length !== 11) return false;

  // Check if it starts with valid area code (11-99)
  const areaCode = parseInt(cleaned.slice(0, 2));
  if (areaCode < 11 || areaCode > 99) return false;

  // For mobile phones (11 digits), check if 9th digit is 9
  if (cleaned.length === 11 && cleaned[2] !== '9') return false;

  return true;
}

/**
 * Check if phone is mobile
 */
export function isMobilePhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = cleanPhone(phone);
  return cleaned.length === 11 && cleaned[2] === '9';
}

/**
 * Check if phone is landline
 */
export function isLandlinePhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = cleanPhone(phone);
  return cleaned.length === 10;
}
