import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProfileFormValues {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface FormState {
  values: ProfileFormValues;
  errors: Partial<Record<keyof ProfileFormValues, string>>;
  touched: Partial<Record<keyof ProfileFormValues, boolean>>;
  isSubmitting: boolean;
}

interface ProfileFormProps {
  formState: FormState;
  setFieldValue: (field: string, value: string) => void;
  setFieldTouched: (field: string) => void;
  isLoading: boolean;
  onSave: (values: ProfileFormValues) => void;
  formattedCPF: string;
  formattedPhone: string;
}

interface ProfileForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  formState,
  setFieldValue,
  setFieldTouched,
  isLoading,
  onSave,
}) => {
  return (
    <>
      <Input
        label="Nome completo"
        placeholder="Digite seu nome completo"
        value={formState.values.name}
        onChangeText={(value) => setFieldValue('name', value)}
        onBlur={() => setFieldTouched('name')}
        error={formState.errors.name}
        leftIcon="👤"
      />

      <Input
        label="Email"
        placeholder="Digite seu email"
        value={formState.values.email}
        onChangeText={(value) => setFieldValue('email', value)}
        onBlur={() => setFieldTouched('email')}
        error={formState.errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon="📧"
      />

      <Input
        label="CPF"
        placeholder="000.000.000-00"
        value={formState.values.cpf}
        onChangeText={(value) => setFieldValue('cpf', value)}
        onBlur={() => setFieldTouched('cpf')}
        error={formState.errors.cpf}
        keyboardType="numeric"
        leftIcon="🆔"
      />

      <Input
        label="Telefone"
        placeholder="(00) 00000-0000"
        value={formState.values.phone}
        onChangeText={(value) => setFieldValue('phone', value)}
        onBlur={() => setFieldTouched('phone')}
        error={formState.errors.phone}
        keyboardType="phone-pad"
        leftIcon="📱"
      />

      <Button
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        onPress={() => onSave(formState.values)}
        style={{ marginTop: 16 }}
      >
        Salvar alterações
      </Button>
    </>
  );
};

export default ProfileForm;
