import React from 'react';

import { View } from 'react-native';

import { Control, FieldErrors } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { RegisterFormData } from '@/lib/schemas/auth';

interface RegisterFormFieldsProps {
  control: Control<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  formattedCPF: string;
  formattedPhone: string;
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = React.memo(
  ({ control, errors, formattedCPF, formattedPhone }) => {
    const fieldContainerStyle = {
      marginBottom: 16,
    };

    return (
      <View>
        <View style={fieldContainerStyle}>
          <Input
            control={control}
            name="name"
            label="Nome completo"
            placeholder="Digite seu nome completo"
            error={errors.name?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            control={control}
            name="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            value={formattedCPF}
            keyboardType="numeric"
            maxLength={14}
            error={errors.cpf?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            control={control}
            name="phone"
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={formattedPhone}
            keyboardType="phone-pad"
            maxLength={15}
            error={errors.phone?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            control={control}
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            error={errors.password?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            control={control}
            name="confirmPassword"
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            secureTextEntry
            error={errors.confirmPassword?.message}
            required
          />
        </View>
      </View>
    );
  },
);

RegisterFormFields.displayName = 'RegisterFormFields';
