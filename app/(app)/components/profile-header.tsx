import React from 'react';

import { Text, View } from 'react-native';

import { useThemeColors } from '@/context/theme-context';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const colors = useThemeColors();

  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: 24,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: colors.white,
            fontWeight: 'bold',
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: colors.text,
        }}
      >
        {user?.name || 'Usuário'}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.textSecondary,
        }}
      >
        {user?.email || 'usuario@email.com'}
      </Text>
    </View>
  );
};
