/**
 * Zod validation schemas for authentication
 * Reusable field validators and form schemas
 */

import { z } from 'zod';

// ========== FIELD VALIDATORS ==========

/**
 * Email validation with custom error message
 */
export const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Email inválido')
  .max(255, 'Email muito longo');

/**
 * Password validation with strength requirements
 */
export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .max(128, 'Senha muito longa')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número',
  );

/**
 * CPF validation using existing utility
 */
export const cpfSchema = z
  .string()
  .min(1, 'CPF é obrigatório')
  .refine(cpf => {
    // Remove non-numeric characters
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.length === 11;
  }, 'CPF deve ter 11 dígitos')
  .refine(cpf => {
    // Import and use existing CPF validation utility
    const cleanCpf = cpf.replace(/\D/g, '');
    // This will be implemented using the existing CPF utility
    return validateCPF(cleanCpf);
  }, 'CPF inválido');

/**
 * Phone validation for Brazilian format
 */
export const phoneSchema = z
  .string()
  .min(1, 'Telefone é obrigatório')
  .refine(phone => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10 || cleanPhone.length === 11;
  }, 'Telefone deve ter 10 ou 11 dígitos');

/**
 * Name validation
 */
export const nameSchema = z
  .string()
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .max(100, 'Nome muito longo')
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços');

// ========== FORM SCHEMAS ==========

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register form schema with password confirmation
 */
export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    cpf: cpfSchema,
    phone: phoneSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Forgot password schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password schema
 */
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    token: z.string().min(1, 'Token é obrigatório'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Change password schema
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'Nova senha deve ser diferente da atual',
    path: ['newPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// ========== UTILITY FUNCTIONS ==========

/**
 * Validate CPF using existing utility
 * This will be implemented using the existing CPF validation
 */
function validateCPF(cpf: string): boolean {
  // Import the existing CPF validation utility
  // This is a placeholder - will be replaced with actual implementation
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false; // All same digits

  // CPF validation algorithm
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(10))) return false;

  return true;
}

/**
 * Get field error message from Zod error
 */
export function getFieldError(error: z.ZodError, fieldName: string): string | undefined {
  const fieldError = error.errors.find(err => err.path.includes(fieldName));
  return fieldError?.message;
}

/**
 * Get all field errors from Zod error
 */
export function getFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.errors.forEach(err => {
    const fieldName = err.path[0] as string;
    if (fieldName) {
      errors[fieldName] = err.message;
    }
  });
  return errors;
}
