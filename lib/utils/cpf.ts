/**
 * CPF (Cadastro de Pessoa Física) utilities
 * Brazilian individual taxpayer registration
 */

/**
 * Format CPF with mask (xxx.xxx.xxx-xx)
 */
export function formatCPF(cpf: string): string {
  if (!cpf) return '';

  // Remove all non-numeric characters
  const cleaned = cleanCPF(cpf);

  // If no numeric characters, return original string
  if (cleaned.length === 0) return cpf;

  // Apply CPF mask
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  } else if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  } else {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  }
}

/**
 * Clean CPF by removing all non-numeric characters
 */
export function cleanCPF(cpf: string): string {
  if (!cpf) return '';
  return cpf.replace(/\D/g, '');
}

/**
 * Calculate CPF check digit
 */
function calculateCheckDigit(digits: string, multiplier: number): number {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    if (digit === undefined) return -1;
    sum += parseInt(digit) * (multiplier - i);
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Validate CPF format and check digits
 */
export function validateCPF(cpf: string): boolean {
  if (!cpf) return false;

  const cleaned = cleanCPF(cpf);

  // Check if it has 11 digits
  if (cleaned.length !== 11) return false;

  // Check for invalid sequences (all same digits)
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // Calculate check digits
  const firstDigit = calculateCheckDigit(cleaned.slice(0, 9), 10);
  const secondDigit = calculateCheckDigit(cleaned.slice(0, 10), 11);

  if (firstDigit === -1 || secondDigit === -1) return false;

  // Check if calculated digits match the provided ones
  const digit9 = cleaned[9];
  const digit10 = cleaned[10];
  if (digit9 === undefined || digit10 === undefined) return false;

  return parseInt(digit9) === firstDigit && parseInt(digit10) === secondDigit;
}

/**
 * Generate a random valid CPF (for testing purposes)
 */
export function generateCPF(): string {
  const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  // Calculate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = randomDigits[i];
    if (digit === undefined) throw new Error('Invalid random digits array');
    sum += digit * (10 - i);
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Calculate second check digit
  sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = randomDigits[i];
    if (digit === undefined) throw new Error('Invalid random digits array');
    sum += digit * (11 - i);
  }
  sum += firstDigit * 2;
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  const cpf = [...randomDigits, firstDigit, secondDigit].join('');
  return formatCPF(cpf);
}
