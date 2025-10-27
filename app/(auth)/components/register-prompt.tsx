import React from 'react';

import { Text } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';

interface RegisterPromptProps {
  onRegister: () => void;
}

export const RegisterPrompt: React.FC<RegisterPromptProps> = ({ onRegister }) => {
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
          Ainda não tem uma conta?
        </Text>
        <Button variant="outline" size="lg" fullWidth onPress={onRegister}>
          Criar conta
        </Button>
      </Card.Body>
    </Card>
  );
};
