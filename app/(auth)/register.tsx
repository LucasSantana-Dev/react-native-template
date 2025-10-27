import { useState } from 'react';

import { Alert, ScrollView, Text } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useThemeColors } from '@/context/theme-context';
import { useFormData } from '@/hooks/use-form-data';
import { isValidEmail, validateCPF, validatePhone } from '@/lib/utils/brazilian';


// ========== REGISTER FORM TYPES ==========
interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  phone: string;
}

// ========== REGISTER SCREEN ==========
export default function RegisterScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
  const validation = {
    name: (value: string) => {
      if (!value) return 'Nome é obrigatório';
      if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
      return undefined;
    },
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
    confirmPassword: (value: string, formData: RegisterForm) => {
      if (!value) return 'Confirmação de senha é obrigatória';
      if (value !== formData.password) return 'Senhas não coincidem';
      return undefined;
    },
    cpf: (value: string) => {
      if (!value) return 'CPF é obrigatório';
      if (!validateCPF(value)) return 'CPF inválido';
      return undefined;
    },
    phone: (value: string) => {
      if (!value) return 'Telefone é obrigatório';
      if (!validatePhone(value)) return 'Telefone inválido';
      return undefined;
    },
  };

  // Form management
  const {
    formState,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
  } = useFormData<RegisterForm>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      cpf: '',
      phone: '',
    },
    validation,
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Handle register
  const handleRegister = async (values: RegisterForm) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso! Você pode fazer login agora.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to login
  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <ScreenContainer safeArea keyboardAvoiding>
      <HeaderLayout
        title="Criar Conta"
        subtitle="Preencha os dados abaixo"
        leftAction={
          <Button
            variant="ghost"
            size="sm"
            onPress={handleBackToLogin}
            icon="←"
          >
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
        <Card variant="elevated" size="lg" style={{ marginBottom: 24 }}>
          <Card.Body>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Crie sua conta
            </Text>

            <Input
              label="Nome completo"
              placeholder="Digite seu nome completo"
              value={formState.data.name.value}
              onChangeText={(value) => setFieldValue('name', value)}
              onBlur={() => setFieldTouched('name')}
              error={formState.data.name.error}
              leftIcon="👤"
            />

            <Input
              label="Email"
              placeholder="Digite seu email"
              value={formState.data.email.value}
              onChangeText={(value) => setFieldValue('email', value)}
              onBlur={() => setFieldTouched('email')}
              error={formState.data.email.error}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="📧"
            />

            <Input
              label="CPF"
              placeholder="000.000.000-00"
              value={formState.data.cpf.value}
              onChangeText={(value) => setFieldValue('cpf', value)}
              onBlur={() => setFieldTouched('cpf')}
              error={formState.data.cpf.error}
              keyboardType="numeric"
              leftIcon="🆔"
            />

            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={formState.data.phone.value}
              onChangeText={(value) => setFieldValue('phone', value)}
              onBlur={() => setFieldTouched('phone')}
              error={formState.data.phone.error}
              keyboardType="phone-pad"
              leftIcon="📱"
            />

            <Input
              label="Senha"
              placeholder="Digite sua senha"
              value={formState.data.password.value}
              onChangeText={(value) => setFieldValue('password', value)}
              onBlur={() => setFieldTouched('password')}
              error={formState.data.password.error}
              secureTextEntry
              leftIcon="🔒"
            />

            <Input
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              value={formState.data.confirmPassword.value}
              onChangeText={(value) => setFieldValue('confirmPassword', value)}
              onBlur={() => setFieldTouched('confirmPassword')}
              error={formState.data.confirmPassword.error}
              secureTextEntry
              leftIcon="🔒"
            />

            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={!formState.isValid || isLoading}
              onPress={handleSubmit(handleRegister)}
              style={{ marginTop: 16 }}
            >
              Criar conta
            </Button>
          </Card.Body>
        </Card>

        <Card variant="outlined" size="md">
          <Card.Body>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Já tem uma conta?
            </Text>

            <Button
              variant="outline"
              size="lg"
              fullWidth
              onPress={handleBackToLogin}
            >
              Fazer login
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
