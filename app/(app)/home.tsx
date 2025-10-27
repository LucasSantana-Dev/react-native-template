import { useState } from 'react';

import { RefreshControl, ScrollView } from 'react-native';

import { useRouter } from 'expo-router';

import { BalanceCard } from './components/balance-card';
import { QuickActionsGrid } from './components/quick-actions-grid';
import { RecentTransactions } from './components/recent-transactions';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { logger } from '@/lib/utils/logger';

// ========== HOME SCREEN ==========
export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const mockData = {
    balance: {
      total: 1250.75,
      available: 1000.5,
      pending: 250.25,
    },
    transactions: [
      { id: '1', title: 'Salário', amount: 3000, date: new Date(), type: 'income' as const },
      {
        id: '2',
        title: 'Compras',
        amount: -150.5,
        date: new Date(Date.now() - 86400000),
        type: 'expense' as const,
      },
      {
        id: '3',
        title: 'Transferência',
        amount: 500,
        date: new Date(Date.now() - 172800000),
        type: 'income' as const,
      },
    ],
    quickActions: [
      { id: '1', title: 'Transferir', icon: '💸', color: colors.primary },
      { id: '2', title: 'Pagar', icon: '💳', color: colors.secondary },
      { id: '3', title: 'Depositar', icon: '💰', color: colors.success },
      { id: '4', title: 'Investir', icon: '📈', color: colors.info },
    ],
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  // Handle quick action
  const handleQuickAction = (_actionId: string) => {
    logger.info('Quick action:', { actionId: _actionId });
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Olá, {user?.name || 'Usuário'}"
        subtitle="Bem-vindo de volta!"
        rightAction={
          <Button variant="ghost" size="sm" onPress={handleSignOut} icon="🚪">
            Sair
          </Button>
        }
        backgroundColor={colors.background}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
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

        <RecentTransactions
          transactions={mockData.transactions}
          onViewAll={() => router.push('/(app)/transactions')}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
