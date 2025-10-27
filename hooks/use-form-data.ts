import { useCallback, useMemo, useState } from 'react';

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

// ========== FORM HOOK ==========
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

    Object.keys(initialValues).forEach((key) => {
      data[key as keyof T] = {
        value: initialValues[key as keyof T],
        error: undefined,
        touched: false,
        dirty: false,
      };
    });

    return data;
  });

  // Validate a single field
  const validateField = useCallback(
    (fieldName: keyof T, value: T[keyof T]): string | undefined => {
      const validator = validation[fieldName];
      if (!validator) return undefined;

      return validator(value, getCurrentValues());
    },
    [validation]
  );

  // Get current form values
  const getCurrentValues = useCallback((): T => {
    const values: T = {} as T;

    Object.keys(formData).forEach((key) => {
      values[key as keyof T] = formData[key as keyof T].value;
    });

    return values;
  }, [formData]);

  // Update field value
  const setFieldValue = useCallback(
    (fieldName: keyof T, value: T[keyof T]) => {
      setFormData((prev) => {
        const newData = { ...prev };
        const field = { ...newData[fieldName] };

        field.value = value;
        field.dirty = true;

        // Validate field if validation is enabled
        if (validateOnChange) {
          field.error = validateField(fieldName, value);
        }

        newData[fieldName] = field;
        return newData;
      });
    },
    [validateOnChange, validateField]
  );

  // Update field touched state
  const setFieldTouched = useCallback(
    (fieldName: keyof T, touched: boolean = true) => {
      setFormData((prev) => {
        const newData = { ...prev };
        const field = { ...newData[fieldName] };

        field.touched = touched;

        // Validate field if validation is enabled
        if (touched && validateOnBlur) {
          field.error = validateField(fieldName, field.value);
        }

        newData[fieldName] = field;
        return newData;
      });
    },
    [validateOnBlur, validateField]
  );

  // Set field error
  const setFieldError = useCallback((fieldName: keyof T, error: string | undefined) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const field = { ...newData[fieldName] };

      field.error = error;

      newData[fieldName] = field;
      return newData;
    });
  }, []);

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newData = { ...formData };

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof T;
      const field = newData[fieldName];
      const error = validateField(fieldName, field.value);

      if (error) {
        field.error = error;
        isValid = false;
      } else {
        field.error = undefined;
      }
    });

    setFormData(newData);
    return isValid;
  }, [formData, validateField]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    const data: FormData<T> = {} as FormData<T>;

    Object.keys(initialValues).forEach((key) => {
      data[key as keyof T] = {
        value: initialValues[key as keyof T],
        error: undefined,
        touched: false,
        dirty: false,
      };
    });

    setFormData(data);
  }, [initialValues]);

  // Reset field to initial value
  const resetField = useCallback(
    (fieldName: keyof T) => {
      setFormData((prev) => {
        const newData = { ...prev };
        const field = { ...newData[fieldName] };

        field.value = initialValues[fieldName];
        field.error = undefined;
        field.touched = false;
        field.dirty = false;

        newData[fieldName] = field;
        return newData;
      });
    },
    [initialValues]
  );

  // Set multiple field values
  const setValues = useCallback(
    (values: Partial<T>) => {
      setFormData((prev) => {
        const newData = { ...prev };

        Object.keys(values).forEach((key) => {
          const fieldName = key as keyof T;
          const field = { ...newData[fieldName] };

          field.value = values[fieldName]!;
          field.dirty = true;

          // Validate field if validation is enabled
          if (validateOnChange) {
            field.error = validateField(fieldName, field.value);
          }

          newData[fieldName] = field;
        });

        return newData;
      });
    },
    [validateOnChange, validateField]
  );

  // Set multiple field errors
  const setErrors = useCallback((errors: Partial<Record<keyof T, string>>) => {
    setFormData((prev) => {
      const newData = { ...prev };

      Object.keys(errors).forEach((key) => {
        const fieldName = key as keyof T;
        const field = { ...newData[fieldName] };

        field.error = errors[fieldName];

        newData[fieldName] = field;
      });

      return newData;
    });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setFormData((prev) => {
      const newData = { ...prev };

      Object.keys(newData).forEach((key) => {
        const fieldName = key as keyof T;
        const field = { ...newData[fieldName] };

        field.error = undefined;

        newData[fieldName] = field;
      });

      return newData;
    });
  }, []);

  // Get field value
  const getFieldValue = useCallback(
    (fieldName: keyof T): T[keyof T] => {
      return formData[fieldName]?.value;
    },
    [formData]
  );

  // Get field error
  const getFieldError = useCallback(
    (fieldName: keyof T): string | undefined => {
      return formData[fieldName]?.error;
    },
    [formData]
  );

  // Get field touched state
  const getFieldTouched = useCallback(
    (fieldName: keyof T): boolean => {
      return formData[fieldName]?.touched || false;
    },
    [formData]
  );

  // Get field dirty state
  const getFieldDirty = useCallback(
    (fieldName: keyof T): boolean => {
      return formData[fieldName]?.dirty || false;
    },
    [formData]
  );

  // Computed form state
  const formState = useMemo((): FormState<T> => {
    const values = getCurrentValues();
    const errors: Record<keyof T, string | undefined> = {} as Record<keyof T, string | undefined>;
    let isValid = true;
    let isDirty = false;
    let isTouched = false;

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof T;
      const field = formData[fieldName];

      errors[fieldName] = field.error;

      if (field.error) {
        isValid = false;
      }

      if (field.dirty) {
        isDirty = true;
      }

      if (field.touched) {
        isTouched = true;
      }
    });

    return {
      data: formData,
      isValid,
      isDirty,
      isTouched,
      errors,
    };
  }, [formData, getCurrentValues]);

  // Submit handler
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>) => {
      return async (event?: any) => {
        if (event) {
          event.preventDefault();
        }

        // Validate form if validation is enabled
        if (validateOnSubmit) {
          const isValid = validateForm();
          if (!isValid) return;
        }

        const values = getCurrentValues();
        await onSubmit(values);
      };
    },
    [validateOnSubmit, validateForm, getCurrentValues]
  );

  return {
    // Form data
    formData,
    formState,
    values: getCurrentValues(),

    // Field operations
    setFieldValue,
    setFieldTouched,
    setFieldError,
    getFieldValue,
    getFieldError,
    getFieldTouched,
    getFieldDirty,

    // Form operations
    setValues,
    setErrors,
    clearErrors,
    validateForm,
    resetForm,
    resetField,

    // Submit
    handleSubmit,
  };
}
