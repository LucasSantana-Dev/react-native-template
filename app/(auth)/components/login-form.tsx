import * as React from 'react';
import { useMemo } from 'react';

import { Text } from 'react-native';

import { FieldErrors } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useThemeColors } from '@/context/theme-context';
import { LoginFormData } from '@/lib/schemas/auth';

interface LoginFormProps {
  formState: {
    values: {
      email: string;
      password: string;
    };
    errors: FieldErrors<LoginFormData>;
    isSubmitting: boolean;
  };
  setFieldValue: (field: string, value: string) => void;
  isLoading: boolean;
  onLogin: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = React.memo(
  ({ formState, setFieldValue, isLoading, onLogin, onForgotPassword }) => {
    const colors = useThemeColors();

    // Memoize styles
    const titleStyle = useMemo(
      () => ({
        fontSize: 18,
        fontWeight: '600' as const,
        color: colors.text,
        marginBottom: 24,
        textAlign: 'center' as const,
      }),
      [colors.text]
    );

    const forgotPasswordStyle = useMemo(
      () => ({
        alignSelf: 'flex-end' as const,
        marginBottom: 24,
      }),
      []
    );

    const cardStyle = useMemo(
      () => ({
        marginBottom: 24,
      }),
      []
    );

    return (
      <Card variant="elevated" size="lg" style={cardStyle}>
        <Card.Body>
          <Text style={titleStyle}>Bem-vindo de volta!</Text>

          <Input
            label="Email"
            placeholder="Digite seu email"
            value={formState.values.email}
            onChangeText={(value) => setFieldValue('email', value)}
            error={formState.errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon="📧"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={formState.values.password}
            onChangeText={(value) => setFieldValue('password', value)}
            error={formState.errors.password?.message}
            secureTextEntry
            leftIcon="🔒"
          />

          <Button variant="ghost" size="sm" onPress={onForgotPassword} style={forgotPasswordStyle}>
            Esqueceu a senha?
          </Button>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading || formState.isSubmitting}
            disabled={isLoading || formState.isSubmitting}
            onPress={onLogin}
          >
            Entrar
          </Button>
        </Card.Body>
      </Card>
    );
  }
);
