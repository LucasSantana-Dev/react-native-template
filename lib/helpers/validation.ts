// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (US format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

// Password validation
export const isValidPassword = (
  password: string,
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i] || '0');

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Form validation helpers
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => string | null>,
): { isValid: boolean; errors: Record<keyof T, string> } => {
  const errors = {} as Record<keyof T, string>;
  let isValid = true;

  Object.keys(rules).forEach(key => {
    const rule = rules[key as keyof T];
    const error = rule(data[key as keyof T]);

    if (error) {
      errors[key as keyof T] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Common validation rules
export const validationRules = {
  required:
    (message = 'This field is required') =>
    (value: any) => {
      if (value === null || value === undefined || value === '') {
        return message;
      }
      return null;
    },

  minLength: (min: number, message?: string) => (value: string) => {
    if (value && value.length < min) {
      return message || `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (max: number, message?: string) => (value: string) => {
    if (value && value.length > max) {
      return message || `Must be no more than ${max} characters long`;
    }
    return null;
  },

  email:
    (message = 'Please enter a valid email address') =>
    (value: string) => {
      if (value && !isValidEmail(value)) {
        return message;
      }
      return null;
    },

  phone:
    (message = 'Please enter a valid phone number') =>
    (value: string) => {
      if (value && !isValidPhone(value)) {
        return message;
      }
      return null;
    },

  url:
    (message = 'Please enter a valid URL') =>
    (value: string) => {
      if (value && !isValidUrl(value)) {
        return message;
      }
      return null;
    },

  numeric:
    (message = 'Must be a number') =>
    (value: any) => {
      if (value && isNaN(Number(value))) {
        return message;
      }
      return null;
    },

  min: (min: number, message?: string) => (value: number) => {
    if (value !== undefined && value < min) {
      return message || `Must be at least ${min}`;
    }
    return null;
  },

  max: (max: number, message?: string) => (value: number) => {
    if (value !== undefined && value > max) {
      return message || `Must be no more than ${max}`;
    }
    return null;
  },
};

// Re-export utility functions for convenience
export { formatCPF, validateCPF } from '../utils/cpf';
export { formatPhone } from '../utils/phone';

// Sanitization helpers
export const sanitize = {
  // Remove HTML tags
  stripHtml: (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  },

  // Escape HTML characters
  escapeHtml: (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return text.replace(/[&<>"']/g, m => map[m] || m);
  },

  // Trim and clean whitespace
  clean: (text: string): string => {
    return text.trim().replace(/\s+/g, ' ');
  },

  // Remove special characters (keep alphanumeric and spaces)
  alphanumeric: (text: string): string => {
    return text.replace(/[^a-zA-Z0-9\s]/g, '');
  },
};
