/**
 * PIS/PASEP utilities
 * Brazilian social integration program document formatting and validation
 */

/**
 * Format PIS with mask (xxx.xxxxx.xx-x)
 */
export function formatPIS(pis: string): string {
  if (!pis) return '';

  const cleaned = cleanPIS(pis);

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 8) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  } else if (cleaned.length <= 10) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 8)}.${cleaned.slice(8)}`;
  } else {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 8)}.${cleaned.slice(8, 10)}-${cleaned.slice(10, 11)}`;
  }
}

/**
 * Clean PIS by removing all non-numeric characters
 */
export function cleanPIS(pis: string): string {
  if (!pis) return '';
  return pis.replace(/\D/g, '');
}

/**
 * Validate PIS format and check digit
 */
export function validatePIS(pis: string): boolean {
  if (!pis) return false;

  const cleaned = cleanPIS(pis);

  // Check if it has 11 digits
  if (cleaned.length !== 11) return false;

  // Check for invalid sequences (all same digits)
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // Calculate check digit
  let sum = 0;
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 10; i++) {
    const digit = cleaned[i];
    const weight = weights[i];
    if (digit === undefined || weight === undefined) return false;
    sum += parseInt(digit) * weight;
  }
  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? 0 : 11 - remainder;

  // Check if calculated digit matches the provided one
  const lastDigit = cleaned[10];
  if (lastDigit === undefined) return false;
  return parseInt(lastDigit) === checkDigit;
}

/**
 * Generate a random valid PIS (for testing purposes)
 */
export function generatePIS(): string {
  const randomDigits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));

  // Calculate check digit
  let sum = 0;
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 10; i++) {
    const digit = randomDigits[i];
    const weight = weights[i];
    if (digit === undefined || weight === undefined) throw new Error('Invalid random digits array');
    sum += digit * weight;
  }
  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? 0 : 11 - remainder;

  const pis = [...randomDigits, checkDigit].join('');
  return formatPIS(pis);
}
