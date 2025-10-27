import { useState } from 'react';

import { Alert } from 'react-native';

import { profileValidation } from '../validation/profile-validation';

import { useProfileHandler } from './use-profile-handler';

import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useFormData } from '@/hooks/form/use-form-data';

interface ProfileFormValues {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

// Helper functions to reduce complexity
const createPasswordChangeHandler = () => {
  return () => Alert.alert('Alterar Senha', 'Funcionalidade em desenvolvimento');
};

const createDeleteAccountHandler = () => {
  return () => {
    Alert.alert(
      'Excluir Conta',
      'Esta ação não pode ser desfeita. Tem certeza que deseja excluir sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => Alert.alert('Conta Excluída', 'Sua conta foi excluída com sucesso.'),
        },
      ],
    );
  };
};

const createEditToggleHandler = (
  isEditing: boolean,
  setIsEditing: (value: boolean) => void,
  resetForm: () => void,
) => {
  return () => {
    if (isEditing) {
      resetForm();
    }
    setIsEditing(!isEditing);
  };
};

const createSaveProfileHandler = (
  handleSubmit: (values: ProfileFormValues) => Promise<void>,
  setIsEditing: (value: boolean) => void,
) => {
  return async (values: ProfileFormValues) => {
    try {
      await handleSubmit(values);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch {
      Alert.alert('Erro', 'Falha ao atualizar perfil. Tente novamente.');
    }
  };
};

// Profile screen hook to reduce complexity
export const useProfileScreen = () => {
  const { user } = useAuth();
  const colors = useThemeColors();
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, handleSubmit, handleSignOut } = useProfileHandler();

  // Form management
  const formData = useFormData<ProfileFormValues>({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      cpf: user?.cpf || '',
      phone: user?.phone || '',
    },
    validation: profileValidation,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { data, errors, setFieldValue, setFieldTouched, resetForm } = formData;

  // Event handlers
  const handleEditToggle = createEditToggleHandler(isEditing, setIsEditing, resetForm);
  const handleSaveProfile = createSaveProfileHandler(handleSubmit, setIsEditing);
  const handleChangePassword = createPasswordChangeHandler();
  const handleDeleteAccount = createDeleteAccountHandler();

  return {
    user,
    colors,
    isEditing,
    isLoading,
    handleSignOut,
    data,
    errors,
    setFieldValue,
    setFieldTouched,
    handleEditToggle,
    handleSaveProfile,
    handleChangePassword,
    handleDeleteAccount,
  };
};
