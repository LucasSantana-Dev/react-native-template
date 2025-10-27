import { useState } from 'react';

import { Alert, ScrollView, Text } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useFormData } from '@/hooks/use-form-data';
import { isValidEmail } from '@/lib/utils/brazilian';

// ========== LOGIN FORM TYPES ==========
interface LoginForm {
  email: string;
  password: string;
}

// ========== LOGIN SCREEN ==========
export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
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

  // Form management
  const { formState, setFieldValue, setFieldTouched, handleSubmit } = useFormData<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validation,
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Handle login
  const handleLogin = async (values: LoginForm) => {
    try {
      setIsLoading(true);
      await signIn(values);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento');
  };

  // Handle register
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
              Bem-vindo de volta!
            </Text>

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
              label="Senha"
              placeholder="Digite sua senha"
              value={formState.data.password.value}
              onChangeText={(value) => setFieldValue('password', value)}
              onBlur={() => setFieldTouched('password')}
              error={formState.data.password.error}
              secureTextEntry
              leftIcon="🔒"
            />

            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={!formState.isValid || isLoading}
              onPress={handleSubmit(handleLogin)}
              style={{ marginTop: 16 }}
            >
              Entrar
            </Button>

            <Button
              variant="ghost"
              size="md"
              fullWidth
              onPress={handleForgotPassword}
              style={{ marginTop: 12 }}
            >
              Esqueci minha senha
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
              Não tem uma conta?
            </Text>

            <Button variant="outline" size="lg" fullWidth onPress={handleRegister}>
              Criar conta
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
