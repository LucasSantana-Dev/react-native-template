import React from 'react';

import { Text, View } from 'react-native';

import { useThemeColors } from '@/context/theme-context';

interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileInfoDisplayProps {
  user: User;
}

export const ProfileInfoDisplay: React.FC<ProfileInfoDisplayProps> = ({ user }) => {
  const colors = useThemeColors();

  const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: colors.textSecondary,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: colors.text,
        }}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View style={{ gap: 16 }}>
      <InfoRow label="Nome" value={user?.name || 'Não informado'} />
      <InfoRow label="Email" value={user?.email || 'Não informado'} />
      <InfoRow label="CPF" value={user?.cpf || 'Não informado'} />
      <InfoRow label="Telefone" value={user?.phone || 'Não informado'} />
    </View>
  );
};
