import { ScrollView } from 'react-native';

import { ProfileActions } from './components/profile-actions';
import { ProfileForm } from './components/profile-form';
import { ProfileHeader } from './components/profile-header';
import { useProfileScreen } from './hooks/use-profile-screen';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { User } from '@/context/auth-context';
import { FormData } from '@/hooks/form/types';

interface ProfileFormValues {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

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

const prepareFormState = (
  data: FormData<ProfileFormValues>,
  errors: Record<keyof ProfileFormValues, string | undefined>,
  isLoading: boolean,
) => ({
  values: {
    name: data.name.value,
    email: data.email.value,
    cpf: data.cpf.value,
    phone: data.phone.value,
  },
  errors: Object.fromEntries(
    Object.entries(errors).filter(([_, value]) => value !== undefined),
  ) as Record<string, string>,
  touched: {
    name: data.name.touched,
    email: data.email.touched,
    cpf: data.cpf.touched,
    phone: data.phone.touched,
  },
  isSubmitting: isLoading,
});

// Profile form component to reduce complexity
const ProfileFormSection = ({
  data,
  errors,
  isLoading,
  setFieldValue,
  setFieldTouched,
  handleSaveProfile,
}: {
  data: FormData<ProfileFormValues>;
  errors: Record<keyof ProfileFormValues, string | undefined>;
  isLoading: boolean;
  setFieldValue: (field: keyof ProfileFormValues, value: string) => void;
  setFieldTouched: (field: keyof ProfileFormValues) => void;
  handleSaveProfile: (values: ProfileFormValues) => Promise<void>;
}) => (
  <ProfileForm
    formState={prepareFormState(data, errors, isLoading)}
    setFieldValue={(field: string, value: string) =>
      setFieldValue(field as keyof ProfileFormValues, value)
    }
    setFieldTouched={(field: string) => setFieldTouched(field as keyof ProfileFormValues)}
    isLoading={isLoading}
    onSave={handleSaveProfile}
    formattedCPF={data.cpf.value}
    formattedPhone={data.phone.value}
  />
);

// ========== PROFILE SCREEN ==========
export default function ProfileScreen() {
  const {
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
  } = useProfileScreen();

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

        <ProfileFormSection
          data={data}
          errors={errors}
          isLoading={isLoading}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          handleSaveProfile={handleSaveProfile}
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
