import { ScrollView } from 'react-native';

import { useRouter } from 'expo-router';

import { RegisterForm as RegisterFormComponent } from './components/register-form';
import { RegisterPrompt } from './components/register-prompt';
import { useRegisterHandler } from './hooks/use-register-handler';
import { registerValidation, type RegisterForm } from './validation/register-validation';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { useThemeColors } from '@/context/theme-context';
import { useFormData } from '@/hooks/form/use-form-data';

export default function RegisterScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isLoading, handleRegister } = useRegisterHandler();

  const { data, errors, handleSubmit } = useFormData<RegisterForm>({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', cpf: '', phone: '' },
    validation: registerValidation,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <ScreenContainer safeArea keyboardAvoiding>
      <HeaderLayout
        title="Criar Conta"
        subtitle="Preencha os dados abaixo"
        leftAction={
          <Button variant="ghost" size="sm" onPress={handleBackToLogin} icon="←">
            Voltar
          </Button>
        }
        backgroundColor={colors.background}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <RegisterFormComponent
          formState={{
            values: {
              name: data.name.value,
              email: data.email.value,
              cpf: data.cpf.value,
              phone: data.phone.value,
              password: data.password.value,
              confirmPassword: data.confirmPassword.value,
            },
            errors: {
              name: errors.name ? { message: errors.name, type: 'validation' } : undefined,
              email: errors.email ? { message: errors.email, type: 'validation' } : undefined,
              cpf: errors.cpf ? { message: errors.cpf, type: 'validation' } : undefined,
              phone: errors.phone ? { message: errors.phone, type: 'validation' } : undefined,
              password: errors.password
                ? { message: errors.password, type: 'validation' }
                : undefined,
              confirmPassword: errors.confirmPassword
                ? { message: errors.confirmPassword, type: 'validation' }
                : undefined,
            },
            isSubmitting: isLoading,
          }}
          setFieldValue={(field: string, value: string) => {
            if (field === 'name') {
              data.name.value = value;
            } else if (field === 'email') {
              data.email.value = value;
            } else if (field === 'cpf') {
              data.cpf.value = value;
            } else if (field === 'phone') {
              data.phone.value = value;
            } else if (field === 'password') {
              data.password.value = value;
            } else if (field === 'confirmPassword') {
              data.confirmPassword.value = value;
            }
          }}
          isLoading={isLoading}
          onRegister={() => handleSubmit(handleRegister)()}
          formattedCPF={data.cpf.value}
          formattedPhone={data.phone.value}
        />
        <RegisterPrompt onRegister={handleBackToLogin} />
      </ScrollView>
    </ScreenContainer>
  );
}
