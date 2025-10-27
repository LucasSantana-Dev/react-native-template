import React from 'react';

import { View } from 'react-native';

import { FieldErrors } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { RegisterFormData } from '@/lib/schemas/auth';

interface RegisterFormFieldsProps {
  values: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  setFieldValue: (field: string, value: string) => void;
  errors: FieldErrors<RegisterFormData>;
  formattedCPF: string;
  formattedPhone: string;
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = React.memo(
  ({ values, setFieldValue, errors, formattedCPF, formattedPhone }) => {
    const fieldContainerStyle = {
      marginBottom: 16,
    };

    return (
      <View>
        <View style={fieldContainerStyle}>
          <Input
            value={values.name}
            onChangeText={value => setFieldValue('name', value)}
            label="Nome completo"
            placeholder="Digite seu nome completo"
            error={errors.name?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            value={values.email}
            onChangeText={value => setFieldValue('email', value)}
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
            value={formattedCPF}
            onChangeText={value => setFieldValue('cpf', value)}
            label="CPF"
            placeholder="000.000.000-00"
            keyboardType="numeric"
            maxLength={14}
            error={errors.cpf?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            value={formattedPhone}
            onChangeText={value => setFieldValue('phone', value)}
            label="Telefone"
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            maxLength={15}
            error={errors.phone?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            value={values.password}
            onChangeText={value => setFieldValue('password', value)}
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            error={errors.password?.message}
            required
          />
        </View>

        <View style={fieldContainerStyle}>
          <Input
            value={values.confirmPassword}
            onChangeText={value => setFieldValue('confirmPassword', value)}
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
