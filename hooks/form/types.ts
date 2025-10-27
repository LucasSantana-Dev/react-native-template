/**
 * Form data types and interfaces
 */

// ========== FORM FIELD TYPES ==========
export interface FormField<T = any> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export type FormData<T = Record<string, any>> = {
  [K in keyof T]: FormField<T[K]>;
};

export interface FormState<T = Record<string, any>> {
  data: FormData<T>;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  errors: Record<keyof T, string | undefined>;
}

export type FormValidation<T = Record<string, any>> = {
  [K in keyof T]?: (value: T[K], formData: T) => string | undefined;
};

export interface FormOptions<T = Record<string, any>> {
  initialValues: T;
  validation?: FormValidation<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
}

export interface FormActions<T = Record<string, any>> {
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldTouched: <K extends keyof T>(field: K) => void;
  setFieldError: <K extends keyof T>(field: K, error: string | undefined) => void;
  setFieldDirty: <K extends keyof T>(field: K, dirty: boolean) => void;
  setField: <K extends keyof T>(field: K, updates: Partial<FormField<T[K]>>) => void;
  setFields: (updates: Partial<FormData<T>>) => void;
  resetField: <K extends keyof T>(field: K) => void;
  resetForm: (newValues?: Partial<T>) => void;
  validateField: <K extends keyof T>(field: K) => string | undefined;
  validateForm: () => boolean;
  handleSubmit: (onSubmit: (values: T) => void) => (event?: any) => void;
}
