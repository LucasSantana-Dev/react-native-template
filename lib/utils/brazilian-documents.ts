/**
 * Brazilian document utilities - Main export file
 *
 * This file re-exports all Brazilian document utilities for convenience.
 * Individual document types are available in separate files for better organization.
 */

// CPF utilities
export { cleanCPF, formatCPF, generateCPF, validateCPF } from './cpf';

// CNPJ utilities
export { cleanCNPJ, formatCNPJ, generateCNPJ, validateCNPJ } from './cnpj';

// Phone utilities
export { cleanPhone, formatPhone, isLandlinePhone, isMobilePhone, validatePhone } from './phone';

// CEP utilities
export { cleanCEP, formatCEP, generateCEP, validateCEP } from './cep';

// RG utilities
export { cleanRG, formatRG, generateRG, validateRG } from './rg';

// PIS utilities
export { cleanPIS, formatPIS, generatePIS, validatePIS } from './pis';

// Legacy exports for backward compatibility
export { cleanCEP as cleanCep, formatCEP as formatCep, validateCEP as validateCep } from './cep';
export {
  cleanCNPJ as cleanCnpj,
  formatCNPJ as formatCnpj,
  validateCNPJ as validateCnpj,
} from './cnpj';
export { cleanCPF as cleanCpf, formatCPF as formatCpf, validateCPF as validateCpf } from './cpf';
export {
  cleanPhone as cleanTelefone,
  formatPhone as formatTelefone,
  validatePhone as validateTelefone,
} from './phone';
export { cleanPIS as cleanPis, formatPIS as formatPis, validatePIS as validatePis } from './pis';
export { cleanRG as cleanRg, formatRG as formatRg, validateRG as validateRg } from './rg';
