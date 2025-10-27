import * as React from 'react';
import { useMemo } from 'react';

import { Text } from 'react-native';

import { Control, FieldErrors } from 'react-hook-form';

import { RegisterFormFields } from './register-form-fields';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';
import { RegisterFormData } from '@/lib/schemas/auth';

interface RegisterFormProps {
  control: Control<RegisterFormData>;
  formState: {
    errors: FieldErrors<RegisterFormData>;
    isSubmitting: boolean;
  };
  isLoading: boolean;
  onRegister: () => void;
  formattedCPF: string;
  formattedPhone: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = React.memo(
  ({ control, formState, isLoading, onRegister, formattedCPF, formattedPhone }) => {
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
      [colors.text],
    );

    const cardStyle = useMemo(
      () => ({
        marginBottom: 24,
      }),
      [],
    );

    const buttonStyle = useMemo(
      () => ({
        marginTop: 16,
      }),
      [],
    );

    return (
      <Card variant="elevated" size="lg" style={cardStyle}>
        <Card.Body>
          <Text style={titleStyle}>Crie sua conta</Text>

          <RegisterFormFields
            control={control}
            errors={formState.errors}
            formattedCPF={formattedCPF}
            formattedPhone={formattedPhone}
          />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading || formState.isSubmitting}
            disabled={isLoading || formState.isSubmitting}
            onPress={onRegister}
            style={buttonStyle}
          >
            Criar conta
          </Button>
        </Card.Body>
      </Card>
    );
  },
);
