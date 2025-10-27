import { ScrollView, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { formatBRL } from '@/lib/utils/currency';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();

  // Mock data
  const mockData = {
    balance: 1250.75,
    quickActions: [
      { id: '1', title: 'Transferir', icon: '💸', color: colors.primary },
      { id: '2', title: 'Pagar', icon: '💳', color: colors.secondary },
      { id: '3', title: 'Depositar', icon: '💰', color: colors.success },
      { id: '4', title: 'Investir', icon: '📈', color: colors.info },
    ],
  };

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action:', actionId);
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Olá, {user?.name || 'Usuário'}"
        subtitle="Bem-vindo de volta!"
        backgroundColor={colors.background}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <Card variant="elevated" size="lg" style={{ marginBottom: 24 }}>
          <Card.Body>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                marginBottom: 8,
              }}
            >
              Saldo atual
            </Text>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: 16,
              }}
            >
              {formatBRL(mockData.balance)}
            </Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                variant="primary"
                size="md"
                icon="📈"
                onPress={() => handleQuickAction('invest')}
                style={{ flex: 1 }}
              >
                Investir
              </Button>
              <Button
                variant="outline"
                size="md"
                icon="💸"
                onPress={() => handleQuickAction('transfer')}
                style={{ flex: 1 }}
              >
                Transferir
              </Button>
            </View>
          </Card.Body>
        </Card>

        {/* Quick Actions */}
        <Card variant="outlined" size="md" style={{ marginBottom: 24 }}>
          <Card.Header>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
              }}
            >
              Ações rápidas
            </Text>
          </Card.Header>
          <Card.Body>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              {mockData.quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="ghost"
                  size="md"
                  icon={action.icon}
                  onPress={() => handleQuickAction(action.id)}
                  style={{
                    flex: isTablet ? 0 : 1,
                    minWidth: isTablet ? 120 : undefined,
                  }}
                >
                  {action.title}
                </Button>
              ))}
            </View>
          </Card.Body>
        </Card>

        {/* Welcome Card */}
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
              Bem-vindo ao React Native Template!
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                lineHeight: 24,
                marginBottom: 16,
              }}
            >
              Este é um template completo com componentes, utilitários e padrões de desenvolvimento
              para React Native com Expo.
            </Text>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onPress={() => router.push('/(tabs)/explore')}
            >
              Explorar mais
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
