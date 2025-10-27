/**
 * @deprecated This hook is deprecated. Use react-hook-form with zod validation instead.
 *
 * Main form data hook
 *
 * @see https://react-hook-form.com/ for the recommended form library
 * @see https://zod.dev/ for schema validation
 *
 * Migration guide:
 * 1. Replace useFormData with useForm from react-hook-form
 * 2. Use zodResolver with your validation schema
 * 3. Use Controller component for form fields
 * 4. Use formState.errors for error handling
 */

import { useCallback, useMemo, useState } from 'react';
import type { FormActions, FormData, FormField, FormOptions, FormState } from './types';
import {
  getFormValues,
  isFormDirty,
  isFormTouched,
  isFormValid,
  validateField,
  validateForm,
} from './validation';

/**
 * @deprecated Use react-hook-form with zod validation instead
 * Custom hook for managing form data and validation
 */
export function useFormData<T extends Record<string, any>>({
  initialValues,
  validation = {},
  validateOnChange = true,
  validateOnBlur = true,
  validateOnSubmit = true,
}: FormOptions<T>) {
  // Initialize form data
  const [formData, setFormData] = useState<FormData<T>>(() => {
    const data: FormData<T> = {} as FormData<T>;

    Object.keys(initialValues).forEach(key => {
      data[key as keyof T] = {
        value: initialValues[key as keyof T],
        error: undefined,
        touched: false,
        dirty: false,
      };
    });

    return data;
  });

  // Validate form and compute state
  const formState = useMemo<FormState<T>>(() => {
    const errors = validateForm(formData, validation);
    const isValid = isFormValid(errors);
    const isDirty = isFormDirty(formData);
    const isTouched = isFormTouched(formData);

    return {
      data: formData,
      isValid,
      isDirty,
      isTouched,
      errors,
    };
  }, [formData, validation]);

  // Set field value
  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setFormData(prev => {
        const newData = { ...prev };
        const fieldData = { ...newData[field] };

        fieldData.value = value;
        fieldData.dirty = fieldData.value !== initialValues[field];
        fieldData.error = validateOnChange
          ? validateField(field, value, getFormValues(newData) as T, validation)
          : fieldData.error;

        newData[field] = fieldData;
        return newData;
      });
    },
    [initialValues, validation, validateOnChange],
  );

  // Set field touched
  const setFieldTouched = useCallback(
    <K extends keyof T>(field: K) => {
      setFormData(prev => {
        const newData = { ...prev };
        const fieldData = { ...newData[field] };

        fieldData.touched = true;
        fieldData.error = validateOnBlur
          ? validateField(field, fieldData.value, getFormValues(newData) as T, validation)
          : fieldData.error;

        newData[field] = fieldData;
        return newData;
      });
    },
    [validation, validateOnBlur],
  );

  // Set field error
  const setFieldError = useCallback(<K extends keyof T>(field: K, error: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], error },
    }));
  }, []);

  // Set field dirty
  const setFieldDirty = useCallback(<K extends keyof T>(field: K, dirty: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], dirty },
    }));
  }, []);

  // Set field with partial updates
  const setField = useCallback(<K extends keyof T>(field: K, updates: Partial<FormField<T[K]>>) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], ...updates },
    }));
  }, []);

  // Set multiple fields
  const setFields = useCallback((updates: Partial<FormData<T>>) => {
    setFormData(prev => {
      const newData = { ...prev };
      Object.keys(updates).forEach(key => {
        const field = key as keyof T;
        if (updates[field]) {
          newData[field] = { ...newData[field], ...updates[field] };
        }
      });
      return newData;
    });
  }, []);

  // Reset field to initial value
  const resetField = useCallback(
    <K extends keyof T>(field: K) => {
      setFormData(prev => ({
        ...prev,
        [field]: {
          value: initialValues[field],
          error: undefined,
          touched: false,
          dirty: false,
        },
      }));
    },
    [initialValues],
  );

  // Reset entire form
  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      const values = { ...initialValues, ...newValues };
      const data: FormData<T> = {} as FormData<T>;

      Object.keys(values).forEach(key => {
        data[key as keyof T] = {
          value: values[key as keyof T],
          error: undefined,
          touched: false,
          dirty: false,
        };
      });

      setFormData(data);
    },
    [initialValues],
  );

  // Validate single field
  const validateFieldFn = useCallback(
    <K extends keyof T>(field: K) => {
      const fieldData = formData[field];
      return validateField(field, fieldData.value, getFormValues(formData) as T, validation);
    },
    [formData, validation],
  );

  // Validate entire form
  const validateFormFn = useCallback(() => {
    const errors = validateForm(formData, validation);
    const isValid = isFormValid(errors);

    // Update form data with errors
    setFormData(prev => {
      const newData = { ...prev };
      Object.keys(errors).forEach(key => {
        const field = key as keyof T;
        newData[field] = { ...newData[field], error: errors[field] };
      });
      return newData;
    });

    return isValid;
  }, [formData, validation]);

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => {
      return (event?: any) => {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }

        if (validateOnSubmit) {
          const isValid = validateFormFn();
          if (!isValid) return;
        }

        const values = getFormValues(formData);
        onSubmit(values);
      };
    },
    [formData, validateOnSubmit, validateFormFn],
  );

  // Form actions
  const actions: FormActions<T> = {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setFieldDirty,
    setField,
    setFields,
    resetField,
    resetForm,
    validateField: validateFieldFn,
    validateForm: validateFormFn,
    handleSubmit,
  };

  return {
    ...formState,
    ...actions,
  };
}
