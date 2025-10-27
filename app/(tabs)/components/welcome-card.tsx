import React from 'react';

import { Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';

export const WelcomeCard: React.FC = React.memo(() => {
  const colors = useThemeColors();
  const router = useRouter();

  const titleStyle = {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 12,
  };

  const descriptionStyle = {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  };

  const buttonContainerStyle = {
    flexDirection: 'row' as const,
    gap: 12,
  };

  const handleGetStarted = () => {
    router.push('/(tabs)');
  };

  const handleViewCode = () => {
    // TODO: Implement view code functionality
    // View code clicked
  };

  return (
    <Card variant="elevated" size="lg" style={{ marginBottom: 24 }}>
      <Card.Body>
        <Text style={titleStyle}>🚀 React Native Template</Text>
        <Text style={descriptionStyle}>
          Um template completo com componentes, utilitários e padrões de desenvolvimento para React
          Native com Expo.
        </Text>

        <View style={buttonContainerStyle}>
          <Button variant="primary" size="md" onPress={handleGetStarted} style={{ flex: 1 }}>
            Começar
          </Button>
          <Button variant="outline" size="md" onPress={handleViewCode} style={{ flex: 1 }}>
            Ver Código
          </Button>
        </View>
      </Card.Body>
    </Card>
  );
});

export default WelcomeCard;

WelcomeCard.displayName = 'WelcomeCard';
