import { ScrollView, Text } from 'react-native';

import { useRouter } from 'expo-router';

import { BalanceCard } from '../(app)/components/balance-card';
import { QuickActionsGrid } from '../(app)/components/quick-actions-grid';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { logger } from '@/lib/utils/logger';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();

  // Mock data
  const mockData = {
    balance: {
      total: 1250.75,
      available: 1000.5,
      pending: 250.25,
    },
    quickActions: [
      { id: '1', title: 'Transferir', icon: '💸', color: colors.primary },
      { id: '2', title: 'Pagar', icon: '💳', color: colors.secondary },
      { id: '3', title: 'Depositar', icon: '💰', color: colors.success },
      { id: '4', title: 'Investir', icon: '📈', color: colors.info },
    ],
  };

  const handleQuickAction = (_actionId: string) => {
    logger.info('Quick action:', { actionId: _actionId });
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
        <BalanceCard
          balance={mockData.balance}
          onInvest={() => handleQuickAction('invest')}
          onTransfer={() => handleQuickAction('transfer')}
        />

        <QuickActionsGrid
          actions={mockData.quickActions}
          isTablet={isTablet}
          onActionPress={handleQuickAction}
        />

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
