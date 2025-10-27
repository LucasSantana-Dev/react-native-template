import { ScrollView, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';

export default function ExploreScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();

  const features = [
    {
      id: '1',
      title: 'Componentes UI',
      description: 'Button, Card, Input e outros componentes prontos para uso',
      icon: '🎨',
      color: colors.primary,
    },
    {
      id: '2',
      title: 'Sistema de Tema',
      description: 'Cores, tipografia e espaçamentos consistentes',
      icon: '🎯',
      color: colors.secondary,
    },
    {
      id: '3',
      title: 'Utilitários Brasileiros',
      description: 'Formatação de CPF, telefone, CEP e moeda',
      icon: '🇧🇷',
      color: colors.success,
    },
    {
      id: '4',
      title: 'Hooks Personalizados',
      description: 'useFormData, useScreenDimensions e mais',
      icon: '🪝',
      color: colors.info,
    },
    {
      id: '5',
      title: 'Context de Autenticação',
      description: 'Gerenciamento de estado de usuário',
      icon: '🔐',
      color: colors.warning,
    },
    {
      id: '6',
      title: 'Layout Responsivo',
      description: 'Adaptação automática para diferentes telas',
      icon: '📱',
      color: colors.error,
    },
  ];

  const handleFeaturePress = (featureId: string) => {
    console.log('Feature pressed:', featureId);
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Explorar"
        subtitle="Descubra as funcionalidades"
        backgroundColor={colors.background}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card */}
        <Card variant="elevated" size="lg" style={{ marginBottom: 24 }}>
          <Card.Body>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 12,
              }}
            >
              🚀 React Native Template
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                lineHeight: 24,
                marginBottom: 16,
              }}
            >
              Um template completo com componentes, utilitários e padrões de desenvolvimento
              para React Native com Expo.
            </Text>

            <Button
              variant="primary"
              size="md"
              onPress={() => router.push('/(auth)/login')}
              style={{ marginBottom: 8 }}
            >
              Testar Login
            </Button>

            <Button
              variant="outline"
              size="md"
              onPress={() => router.push('/(app)/home')}
            >
              Ver App Completo
            </Button>
          </Card.Body>
        </Card>

        {/* Features Grid */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {features.map((feature) => (
            <Card
              key={feature.id}
              variant="outlined"
              size="md"
              pressable
              onPress={() => handleFeaturePress(feature.id)}
              style={{
                flex: isTablet ? 0 : 1,
                minWidth: isTablet ? 200 : undefined,
                maxWidth: isTablet ? 300 : undefined,
              }}
            >
              <Card.Body>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 32,
                      marginBottom: 8,
                    }}
                  >
                    {feature.icon}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: colors.text,
                      textAlign: 'center',
                      marginBottom: 8,
                    }}
                  >
                    {feature.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.textSecondary,
                      textAlign: 'center',
                      lineHeight: 20,
                    }}
                  >
                    {feature.description}
                  </Text>
                </View>
              </Card.Body>
            </Card>
          ))}
        </View>

        {/* Documentation Card */}
        <Card variant="outlined" size="md">
          <Card.Body>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 12,
              }}
            >
              📚 Documentação
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                lineHeight: 24,
                marginBottom: 16,
              }}
            >
              Consulte o README.md para instruções detalhadas de uso e configuração.
            </Text>

            <Button
              variant="ghost"
              size="md"
              fullWidth
              onPress={() => console.log('Open documentation')}
            >
              Abrir Documentação
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
