import React from 'react';

import { Text } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';

interface LoginPromptProps {
  onBackToLogin: () => void;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({ onBackToLogin }) => {
  const colors = useThemeColors();

  return (
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
        <Button variant="outline" size="lg" fullWidth onPress={onBackToLogin}>
          Fazer login
        </Button>
      </Card.Body>
    </Card>
  );
};
