/**
 * CNPJ (Cadastro Nacional da Pessoa Jurídica) utilities
 * Brazilian company registration
 */

/**
 * Format CNPJ with mask (xx.xxx.xxx/xxxx-xx)
 */
export function formatCNPJ(cnpj: string): string {
  if (!cnpj) return '';

  const cleaned = cleanCNPJ(cnpj);

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  } else if (cleaned.length <= 8) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  } else if (cleaned.length <= 12) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
  } else {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
  }
}

/**
 * Clean CNPJ by removing all non-numeric characters
 */
export function cleanCNPJ(cnpj: string): string {
  if (!cnpj) return '';
  return cnpj.replace(/\D/g, '');
}

/**
 * Validate CNPJ format and check digits
 */
export function validateCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;

  const cleaned = cleanCNPJ(cnpj);

  // Check if it has 14 digits
  if (cleaned.length !== 14) return false;

  // Check for invalid sequences (all same digits)
  if (/^(\d)\1{13}$/.test(cleaned)) return false;

  // Calculate first check digit
  let sum = 0;
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    const digit = cleaned[i];
    const weight = weights1[i];
    if (digit === undefined || weight === undefined) return false;
    sum += parseInt(digit) * weight;
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Calculate second check digit
  sum = 0;
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    const digit = cleaned[i];
    const weight = weights2[i];
    if (digit === undefined || weight === undefined) return false;
    sum += parseInt(digit) * weight;
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  // Check if calculated digits match the provided ones
  const digit12 = cleaned[12];
  const digit13 = cleaned[13];
  if (digit12 === undefined || digit13 === undefined) return false;

  return parseInt(digit12) === firstDigit && parseInt(digit13) === secondDigit;
}

/**
 * Generate a random valid CNPJ (for testing purposes)
 */
export function generateCNPJ(): string {
  const randomDigits = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

  // Calculate first check digit
  let sum = 0;
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    const digit = randomDigits[i];
    const weight = weights1[i];
    if (digit === undefined || weight === undefined) throw new Error('Invalid random digits array');
    sum += digit * weight;
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Calculate second check digit
  sum = 0;
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    const digit = randomDigits[i];
    const weight = weights2[i];
    if (digit === undefined || weight === undefined) throw new Error('Invalid random digits array');
    sum += digit * weight;
  }
  const lastWeight = weights2[12];
  if (lastWeight === undefined) throw new Error('Invalid weights array');
  sum += firstDigit * lastWeight;
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  const cnpj = [...randomDigits, firstDigit, secondDigit].join('');
  return formatCNPJ(cnpj);
}
