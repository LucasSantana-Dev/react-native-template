/**
 * Brazilian-specific utility functions
 * Inspired by EduBank's formatters and validation patterns
 */

// ========== CPF UTILITIES ==========

/**
 * Format CPF with mask (xxx.xxx.xxx-xx)
 */
export function formatCPF(cpf: string): string {
  if (!cpf) return '';

  // Remove all non-numeric characters
  const cleaned = cleanCPF(cpf);

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
 * Validate CPF format and check digits
 */
export function validateCPF(cpf: string): boolean {
  if (!cpf) return false;

  const cleaned = cleanCPF(cpf);

  // Check if CPF has 11 digits
  if (cleaned.length !== 11) return false;

  // Check if all digits are the same (invalid CPF)
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // Validate check digits
  let sum = 0;
  let remainder;

  // First check digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

  // Second check digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

  return true;
}

// ========== PHONE UTILITIES ==========

/**
 * Format Brazilian phone number
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    // Landline: (xx) xxxx-xxxx
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    // Mobile: (xx) 9xxxx-xxxx
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }

  return cleaned;
}

/**
 * Clean phone number by removing all non-numeric characters
 */
export function cleanPhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
}

/**
 * Validate Brazilian phone number
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;

  const cleaned = cleanPhone(phone);

  // Check if phone has 10 or 11 digits
  if (cleaned.length !== 10 && cleaned.length !== 11) return false;

  // Check if it's a valid area code (11-99)
  const areaCode = parseInt(cleaned.slice(0, 2));
  if (areaCode < 11 || areaCode > 99) return false;

  // Check if mobile number starts with 9 (for 11-digit numbers)
  if (cleaned.length === 11 && cleaned[2] !== '9') return false;

  return true;
}

// ========== CEP UTILITIES ==========

/**
 * Format Brazilian postal code (CEP)
 */
export function formatCEP(cep: string): string {
  if (!cep) return '';

  // Remove all non-numeric characters
  const cleaned = cep.replace(/\D/g, '');

  // Apply CEP mask: xxxxx-xxx
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
 * Validate Brazilian postal code (CEP)
 */
export function validateCEP(cep: string): boolean {
  if (!cep) return false;

  const cleaned = cleanCEP(cep);

  // Check if CEP has 8 digits
  if (cleaned.length !== 8) return false;

  // Check if it's not all zeros
  if (cleaned === '00000000') return false;

  return true;
}

// ========== CNPJ UTILITIES ==========

/**
 * Format CNPJ with mask (xx.xxx.xxx/xxxx-xx)
 */
export function formatCNPJ(cnpj: string): string {
  if (!cnpj) return '';

  // Remove all non-numeric characters
  const cleaned = cleanCNPJ(cnpj);

  // Apply CNPJ mask
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

  // Check if CNPJ has 14 digits
  if (cleaned.length !== 14) return false;

  // Check if all digits are the same (invalid CNPJ)
  if (/^(\d)\1{13}$/.test(cleaned)) return false;

  // Validate check digits
  let sum = 0;
  let remainder;

  // First check digit
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned[i]) * weights1[i];
  }
  remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  if (firstDigit !== parseInt(cleaned[12])) return false;

  // Second check digit
  sum = 0;
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleaned[i]) * weights2[i];
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  if (secondDigit !== parseInt(cleaned[13])) return false;

  return true;
}

// ========== RG UTILITIES ==========

/**
 * Format RG with mask (xx.xxx.xxx-x)
 */
export function formatRG(rg: string): string {
  if (!rg) return '';

  // Remove all non-numeric characters
  const cleaned = rg.replace(/\D/g, '');

  // Apply RG mask
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
 */
export function validateRG(rg: string): boolean {
  if (!rg) return false;

  const cleaned = cleanRG(rg);

  // Check if RG has 8 or 9 digits
  if (cleaned.length < 8 || cleaned.length > 9) return false;

  return true;
}

// ========== PIS/PASEP UTILITIES ==========

/**
 * Format PIS/PASEP with mask (xxx.xxxxx.xx-x)
 */
export function formatPIS(pis: string): string {
  if (!pis) return '';

  // Remove all non-numeric characters
  const cleaned = pis.replace(/\D/g, '');

  // Apply PIS mask
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
 * Clean PIS/PASEP by removing all non-numeric characters
 */
export function cleanPIS(pis: string): string {
  if (!pis) return '';
  return pis.replace(/\D/g, '');
}

/**
 * Validate PIS/PASEP format and check digit
 */
export function validatePIS(pis: string): boolean {
  if (!pis) return false;

  const cleaned = cleanPIS(pis);

  // Check if PIS has 11 digits
  if (cleaned.length !== 11) return false;

  // Check if all digits are the same (invalid PIS)
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // Validate check digit
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * weights[i];
  }

  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? 0 : 11 - remainder;

  return checkDigit === parseInt(cleaned[10]);
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Check if a string contains only numeric characters
 */
export function isNumeric(value: string): boolean {
  if (!value) return false;
  return /^\d+$/.test(value);
}

/**
 * Check if a string contains only alphanumeric characters
 */
export function isAlphanumeric(value: string): boolean {
  if (!value) return false;
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Check if a string contains only letters
 */
export function isAlpha(value: string): boolean {
  if (!value) return false;
  return /^[a-zA-Z]+$/.test(value);
}

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a string is a valid Brazilian phone number (mobile or landline)
 */
export function isValidBrazilianPhone(phone: string): boolean {
  return validatePhone(phone);
}

/**
 * Check if a string is a valid Brazilian postal code
 */
export function isValidBrazilianCEP(cep: string): boolean {
  return validateCEP(cep);
}

/**
 * Check if a string is a valid CPF
 */
export function isValidCPF(cpf: string): boolean {
  return validateCPF(cpf);
}

/**
 * Check if a string is a valid CNPJ
 */
export function isValidCNPJ(cnpj: string): boolean {
  return validateCNPJ(cnpj);
}
