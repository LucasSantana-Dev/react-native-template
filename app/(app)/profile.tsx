import { useState } from 'react';

import { Alert, ScrollView } from 'react-native';

import { ProfileActions } from './components/profile-actions';
import { ProfileForm } from './components/profile-form';
import { ProfileHeader } from './components/profile-header';
import { useProfileHandler } from './hooks/use-profile-handler';
import { profileValidation } from './validation/profile-validation';

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
      ]
    );
  };
};

const getUserWithDefaults = (user: User | null) => {
  return user
    ? {
        ...user,
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: user.updatedAt || new Date().toISOString(),
      }
    : {
        id: '',
        name: 'Usuário',
        email: 'usuario@email.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
};

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { useAuth, User } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useFormData } from '@/hooks/form/use-form-data';

// ========== PROFILE SCREEN ==========
export default function ProfileScreen() {
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
  const handleEditToggle = () => {
    if (isEditing) {
      resetForm();
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async (values: ProfileFormValues) => {
    try {
      await handleSubmit(values);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch {
      Alert.alert('Erro', 'Falha ao atualizar perfil. Tente novamente.');
    }
  };

  const handleChangePassword = createPasswordChangeHandler();
  const handleDeleteAccount = createDeleteAccountHandler();

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Perfil"
        subtitle="Gerencie suas informações"
        rightAction={
          <Button
            variant="ghost"
            size="sm"
            onPress={handleEditToggle}
            icon={isEditing ? '✏️' : '✏️'}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
        }
        backgroundColor={colors.background}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader user={getUserWithDefaults(user)} />

        <ProfileForm
          formState={{
            values: {
              name: data.name.value,
              email: data.email.value,
              cpf: data.cpf.value,
              phone: data.phone.value,
            },
            errors,
            touched: {
              name: data.name.touched,
              email: data.email.touched,
              cpf: data.cpf.touched,
              phone: data.phone.touched,
            },
            isSubmitting: isLoading,
          }}
          setFieldValue={(field: string, value: string) =>
            setFieldValue(field as keyof ProfileFormValues, value)
          }
          setFieldTouched={(field: string) => setFieldTouched(field as keyof ProfileFormValues)}
          isLoading={isLoading}
          onSave={handleSaveProfile}
          formattedCPF={data.cpf.value}
          formattedPhone={data.phone.value}
        />

        <ProfileActions
          onChangePassword={handleChangePassword}
          onSignOut={handleSignOut}
          onDeleteAccount={handleDeleteAccount}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
