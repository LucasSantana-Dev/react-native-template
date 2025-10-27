import { useState } from 'react';

import { Alert, ScrollView } from 'react-native';

import { useRouter } from 'expo-router';

import { LoginForm } from './components/login-form';
import { LoginPrompt } from './components/login-prompt';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useFormData } from '@/hooks/form/use-form-data';
import { logger } from '@/lib/utils/logger';
import { isValidEmail } from '@/lib/utils/validation';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);

  const validation = {
    email: (value: string) => {
      if (!value) return 'Email é obrigatório';
      if (!isValidEmail(value)) return 'Email inválido';
      return undefined;
    },
    password: (value: string) => {
      if (!value) return 'Senha é obrigatória';
      if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
      return undefined;
    },
  };

  const { data, errors, handleSubmit } = useFormData<LoginForm>({
    initialValues: { email: '', password: '' },
    validation,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleLogin = async (values: LoginForm) => {
    try {
      setIsLoading(true);
      await signIn(values);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais.');
      logger.error('Login error:', {
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento');
  };

  const handleRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <ScreenContainer safeArea keyboardAvoiding>
      <HeaderLayout
        title="Login"
        subtitle="Entre com sua conta"
        backgroundColor={colors.background}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <LoginForm
          formState={{
            values: {
              email: data.email.value,
              password: data.password.value,
            },
            errors: {
              email: errors.email ? { message: errors.email, type: 'validation' } : undefined,
              password: errors.password
                ? { message: errors.password, type: 'validation' }
                : undefined,
            },
            isSubmitting: isLoading,
          }}
          setFieldValue={(field: string, value: string) => {
            if (field === 'email') {
              data.email.value = value;
            } else if (field === 'password') {
              data.password.value = value;
            }
          }}
          isLoading={isLoading}
          onLogin={() => handleSubmit(handleLogin)()}
          onForgotPassword={handleForgotPassword}
        />
        <LoginPrompt onBackToLogin={handleRegister} />
      </ScrollView>
    </ScreenContainer>
  );
}
