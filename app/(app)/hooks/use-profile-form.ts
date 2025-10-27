import { useCallback, useState } from 'react';

import { useRouter } from 'expo-router';

import { validateProfileField } from './validation-helpers';

import { useAuth } from '@/context/auth-context';
import { formatCPF, formatPhone } from '@/lib/helpers/validation';

interface ProfileFormData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface UseProfileFormReturn {
  isEditing: boolean;
  isLoading: boolean;
  formData: ProfileFormData;
  errors: Partial<ProfileFormData>;
  formattedCPF: string;
  formattedPhone: string;
  setIsEditing: (editing: boolean) => void;
  handleFieldChange: (field: keyof ProfileFormData, value: string) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleSignOut: () => void;
  validateField: (field: keyof ProfileFormData, value: string) => string | undefined;
}

export const useProfileForm = (): UseProfileFormReturn => {
  const router = useRouter();
  const { user, updateUser, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data from user
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    cpf: user?.cpf || '',
    phone: user?.phone || '',
  });

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  // Format values for display
  const formattedCPF = formatCPF(formData.cpf);
  const formattedPhone = formatPhone(formData.phone);

  // Validation functions
  const validateField = useCallback(
    (field: keyof ProfileFormData, value: string): string | undefined => {
      return validateProfileField(field, value);
    },
    [],
  );

  // Handle field changes
  const handleFieldChange = useCallback(
    (field: keyof ProfileFormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  // Handle save
  const handleSave = useCallback(async () => {
    setIsLoading(true);

    try {
      // Validate all fields
      const newErrors: Partial<ProfileFormData> = {};
      let hasErrors = false;

      (Object.keys(formData) as Array<keyof ProfileFormData>).forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setErrors(newErrors);
        return;
      }

      // Update user
      await updateUser(formData);
      setIsEditing(false);
      setErrors({});
    } catch {
      // Error updating profile
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateField, updateUser]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      cpf: user?.cpf || '',
      phone: user?.phone || '',
    });
    setErrors({});
    setIsEditing(false);
  }, [user]);

  // Handle sign out
  const handleSignOut = useCallback(() => {
    signOut();
    router.push('/(auth)/login');
  }, [signOut, router]);

  return {
    isEditing,
    isLoading,
    formData,
    errors,
    formattedCPF,
    formattedPhone,
    setIsEditing,
    handleFieldChange,
    handleSave,
    handleCancel,
    handleSignOut,
    validateField,
  };
};
