/**
 * Form validation utilities
 */

import type { FormData, FormValidation } from './types';

/**
 * Validate a single field
 */
export function validateField<T extends Record<string, any>>(
  field: keyof T,
  value: T[keyof T],
  formData: T,
  validation: FormValidation<T>
): string | undefined {
  const validator = validation[field];
  if (!validator) return undefined;

  try {
    return validator(value, formData);
  } catch (error) {
    return 'Validation error';
  }
}

/**
 * Validate all fields in the form
 */
export function validateForm<T extends Record<string, any>>(
  formData: FormData<T>,
  validation: FormValidation<T>
): Record<keyof T, string | undefined> {
  const errors: Record<keyof T, string | undefined> = {} as Record<keyof T, string | undefined>;

  Object.keys(formData).forEach(key => {
    const field = key as keyof T;
    const fieldData = formData[field];
    const value = fieldData.value;

    errors[field] = validateField(field, value, formData as T, validation);
  });

  return errors;
}

/**
 * Check if form is valid (no errors)
 */
export function isFormValid<T extends Record<string, any>>(
  errors: Record<keyof T, string | undefined>
): boolean {
  return Object.values(errors).every(error => !error);
}

/**
 * Check if form is dirty (any field has been modified)
 */
export function isFormDirty<T extends Record<string, any>>(
  formData: FormData<T>
): boolean {
  return Object.values(formData).some(field => field.dirty);
}

/**
 * Check if form is touched (any field has been focused)
 */
export function isFormTouched<T extends Record<string, any>>(
  formData: FormData<T>
): boolean {
  return Object.values(formData).some(field => field.touched);
}

/**
 * Get form values as plain object
 */
export function getFormValues<T extends Record<string, any>>(
  formData: FormData<T>
): T {
  const values: T = {} as T;

  Object.keys(formData).forEach(key => {
    const field = key as keyof T;
    values[field] = formData[field].value;
  });

  return values;
}
