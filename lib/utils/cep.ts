/**
 * CEP (Código de Endereçamento Postal) utilities
 * Brazilian postal code formatting and validation
 */

/**
 * Format CEP with mask (xxxxx-xxx)
 */
export function formatCEP(cep: string): string {
  if (!cep) return '';

  const cleaned = cleanCEP(cep);

  if (cleaned.length <= 5) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
  }
}

/**
 * Clean CEP by removing all non-numeric characters
 */
export function cleanCEP(cep: string): string {
  if (!cep) return '';
  return cep.replace(/\D/g, '');
}

/**
 * Validate CEP format
 */
export function validateCEP(cep: string): boolean {
  if (!cep) return false;

  const cleaned = cleanCEP(cep);

  // Check if it has 8 digits
  if (cleaned.length !== 8) return false;

  // Check for invalid sequences (all same digits)
  if (/^(\d)\1{7}$/.test(cleaned)) return false;

  return true;
}

/**
 * Generate a random valid CEP (for testing purposes)
 */
export function generateCEP(): string {
  const randomDigits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
  const cep = randomDigits.join('');
  return formatCEP(cep);
}
