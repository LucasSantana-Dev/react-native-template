/**
 * Zod validation schemas for profile management
 * Reuses validators from auth schema
 */

import { z } from 'zod';

import { cpfSchema, emailSchema, nameSchema, phoneSchema } from './auth';

// ========== PROFILE SCHEMAS ==========

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

/**
 * Profile creation schema (for admin use)
 */
export const profileCreateSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
  role: z.enum(['user', 'admin', 'moderator']).optional().default('user'),
  isActive: z.boolean().optional().default(true),
});

export type ProfileCreateFormData = z.infer<typeof profileCreateSchema>;

/**
 * Avatar upload schema
 */
export const avatarUploadSchema = z.object({
  uri: z.string().url('URI da imagem inválida'),
  type: z.string().regex(/^image\//, 'Arquivo deve ser uma imagem'),
  size: z.number().max(5 * 1024 * 1024, 'Imagem deve ter no máximo 5MB'),
});

export type AvatarUploadFormData = z.infer<typeof avatarUploadSchema>;

/**
 * User preferences schema
 */
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional().default('system'),
  language: z.string().min(2).max(5).optional().default('pt-BR'),
  notifications: z
    .object({
      email: z.boolean().optional().default(true),
      push: z.boolean().optional().default(true),
      sms: z.boolean().optional().default(false),
    })
    .optional(),
  privacy: z
    .object({
      profileVisibility: z.enum(['public', 'private', 'friends']).optional().default('private'),
      showEmail: z.boolean().optional().default(false),
      showPhone: z.boolean().optional().default(false),
    })
    .optional(),
});

export type UserPreferencesFormData = z.infer<typeof userPreferencesSchema>;

/**
 * Address schema
 */
export const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória').max(255, 'Rua muito longa'),
  number: z.string().min(1, 'Número é obrigatório').max(20, 'Número muito longo'),
  complement: z.string().max(100, 'Complemento muito longo').optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório').max(100, 'Bairro muito longo'),
  city: z.string().min(1, 'Cidade é obrigatória').max(100, 'Cidade muito longa'),
  state: z.string().min(2, 'Estado é obrigatório').max(2, 'Estado deve ter 2 caracteres'),
  zipCode: z.string().min(8, 'CEP é obrigatório').max(9, 'CEP inválido'),
});

export type AddressFormData = z.infer<typeof addressSchema>;

/**
 * Complete profile schema (includes address)
 */
export const completeProfileSchema = profileUpdateSchema.extend({
  address: addressSchema.optional(),
  preferences: userPreferencesSchema.optional(),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

// ========== VALIDATION HELPERS ==========

/**
 * Validate profile data with custom error messages
 */
export function validateProfileData(data: unknown): {
  success: boolean;
  data?: ProfileUpdateFormData;
  errors?: Record<string, string>;
} {
  try {
    const validatedData = profileUpdateSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        const fieldName = err.path[0] as string;
        if (fieldName) {
          errors[fieldName] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Erro de validação' } };
  }
}

/**
 * Get field-specific error message
 */
export function getProfileFieldError(error: z.ZodError, fieldName: string): string | undefined {
  const fieldError = error.errors.find(err => err.path.includes(fieldName));
  return fieldError?.message;
}

/**
 * Sanitize profile data (remove empty strings, trim whitespace)
 */
export function sanitizeProfileData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        sanitized[key] = trimmed;
      }
    } else if (value !== null && value !== undefined) {
      sanitized[key] = value;
    }
  });

  return sanitized;
}
