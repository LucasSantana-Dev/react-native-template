/**
 * RG (Registro Geral) utilities
 * Brazilian identity document formatting and validation
 */

/**
 * Format RG with mask (xx.xxx.xxx-x)
 */
export function formatRG(rg: string): string {
  if (!rg) return '';

  const cleaned = cleanRG(rg);

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  } else if (cleaned.length <= 8) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  } else {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}-${cleaned.slice(8, 9)}`;
  }
}

/**
 * Clean RG by removing all non-numeric characters
 */
export function cleanRG(rg: string): string {
  if (!rg) return '';
  return rg.replace(/\D/g, '');
}

/**
 * Validate RG format (basic validation)
 * Note: RG validation varies by state, this is a basic format check
 */
export function validateRG(rg: string): boolean {
  if (!rg) return false;

  const cleaned = cleanRG(rg);

  // Check if it has 8 or 9 digits
  if (cleaned.length < 8 || cleaned.length > 9) return false;

  // Check for invalid sequences (all same digits)
  if (/^(\d)\1{7,8}$/.test(cleaned)) return false;

  return true;
}

/**
 * Generate a random valid RG (for testing purposes)
 */
export function generateRG(): string {
  const randomDigits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
  const rg = randomDigits.join('');
  return formatRG(rg);
}
