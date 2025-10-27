import { useState } from 'react';

import { RefreshControl, ScrollView, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { formatBRL } from '@/lib/utils/currency';
import { formatRelative as formatRelativeDate } from '@/lib/utils/date';


// ========== HOME SCREEN ==========
export default function HomeScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const mockData = {
    balance: 1250.75,
    transactions: [
      { id: '1', title: 'Salário', amount: 3000, date: new Date(), type: 'income' },
      { id: '2', title: 'Compras', amount: -150.50, date: new Date(Date.now() - 86400000), type: 'expense' },
      { id: '3', title: 'Transferência', amount: 500, date: new Date(Date.now() - 172800000), type: 'income' },
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  // Handle quick action
  const handleQuickAction = (actionId: string) => {
    // TODO: Navigate to appropriate screen
    console.log('Quick action:', actionId);
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Olá, {user?.name || 'Usuário'}"
        subtitle="Bem-vindo de volta!"
        rightAction={
          <Button
            variant="ghost"
            size="sm"
            onPress={handleSignOut}
            icon="🚪"
          >
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

        {/* Recent Transactions */}
        <Card variant="outlined" size="md">
          <Card.Header>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
              }}
            >
              Transações recentes
            </Text>
          </Card.Header>
          <Card.Body>
            {mockData.transactions.map((transaction) => (
              <View
                key={transaction.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.text,
                    }}
                  >
                    {transaction.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.textSecondary,
                    }}
                  >
                    {formatRelativeDate(transaction.date)}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: transaction.type === 'income' ? colors.success : colors.error,
                  }}
                >
                  {transaction.type === 'income' ? '+' : ''}{formatBRL(transaction.amount)}
                </Text>
              </View>
            ))}

            <Button
              variant="ghost"
              size="md"
              fullWidth
              onPress={() => router.push('/(app)/transactions')}
              style={{ marginTop: 12 }}
            >
              Ver todas as transações
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
