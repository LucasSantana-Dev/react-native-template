import { validateCPF as validateCPFUtil } from '@/lib/helpers/validation';

// Helper function for email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Individual validation functions to reduce complexity
const validateName = (value: string): string | undefined => {
  if (!value) return 'Nome é obrigatório';
  if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
  return undefined;
};

const validateEmail = (value: string): string | undefined => {
  if (!value) return 'Email é obrigatório';
  if (!isValidEmail(value)) return 'Email inválido';
  return undefined;
};

const validateCPFField = (value: string): string | undefined => {
  if (!value) return 'CPF é obrigatório';
  if (!validateCPFUtil(value)) return 'CPF inválido';
  return undefined;
};

const validatePhone = (value: string): string | undefined => {
  if (!value) return 'Telefone é obrigatório';
  if (value.length < 10) return 'Telefone deve ter pelo menos 10 dígitos';
  return undefined;
};

export const validateProfileField = (
  field: 'name' | 'email' | 'cpf' | 'phone',
  value: string,
): string | undefined => {
  switch (field) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'cpf':
      return validateCPFField(value);
    case 'phone':
      return validatePhone(value);
  }
};
