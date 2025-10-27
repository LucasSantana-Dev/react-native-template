import { useState } from 'react';

import { FlatList, RefreshControl, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useVirtualScroll } from '@/hooks/use-virtual-scroll';
import { formatBRL } from '@/lib/utils/currency';
import { formatRelative as formatRelativeDate } from '@/lib/utils/date';

// ========== HOME SCREEN VIRTUALIZED ==========

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface HomeData {
  balance: number;
  transactions: Transaction[];
  quickActions: QuickAction[];
}

type HomeItem =
  | { type: 'header'; data: { balance: number } }
  | { type: 'quickActions'; data: QuickAction[] }
  | { type: 'transactions'; data: Transaction[] };

export default function HomeScreenVirtualized() {
  const router = useRouter();
  const { signOut } = useAuth();
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const mockData: HomeData = {
    balance: 1250.75,
    transactions: [
      { id: '1', title: 'Salário', amount: 3000, date: new Date(), type: 'income' },
      {
        id: '2',
        title: 'Compras',
        amount: -150.5,
        date: new Date(Date.now() - 86400000),
        type: 'expense',
      },
      {
        id: '3',
        title: 'Transferência',
        amount: 500,
        date: new Date(Date.now() - 172800000),
        type: 'income',
      },
    ],
    quickActions: [
      { id: '1', title: 'Transferir', icon: '💸', color: colors.primary },
      { id: '2', title: 'Pagar', icon: '💳', color: colors.secondary },
      { id: '3', title: 'Depositar', icon: '💰', color: colors.success },
      { id: '4', title: 'Investir', icon: '📈', color: colors.info },
    ],
  };

  // Transform data into flat list items
  const listData: HomeItem[] = [
    { type: 'header', data: { balance: mockData.balance } },
    { type: 'quickActions', data: mockData.quickActions },
    { type: 'transactions', data: mockData.transactions },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  const handleQuickAction = (action: QuickAction) => {
    console.log('Quick action:', action.title);
    // Navigate to appropriate screen
  };

  const handleTransactionPress = (transaction: Transaction) => {
    console.log('Transaction pressed:', transaction.title);
    // Navigate to transaction details
  };

  // Render item function
  const renderItem = ({ item }: { item: HomeItem }) => {
    switch (item.type) {
      case 'header':
        return (
          <Card style={{ margin: 16, padding: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                {formatBRL(item.data.balance)}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.textSecondary,
                }}
              >
                Saldo atual
              </Text>
            </View>
          </Card>
        );

      case 'quickActions':
        return (
          <View style={{ margin: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: 12,
              }}
            >
              Ações rápidas
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {item.data.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  onPress={() => handleQuickAction(action)}
                  style={{
                    width: isTablet ? '22%' : '48%',
                    marginBottom: 8,
                  }}
                  icon={action.icon}
                >
                  {action.title}
                </Button>
              ))}
            </View>
          </View>
        );

      case 'transactions':
        return (
          <View style={{ margin: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: 12,
              }}
            >
              Transações recentes
            </Text>
            {item.data.map((transaction) => (
              <Card
                key={transaction.id}
                pressable
                onPress={() => handleTransactionPress(transaction)}
                style={{
                  marginBottom: 8,
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
                    fontWeight: 'bold',
                    color: transaction.type === 'income' ? colors.success : colors.error,
                  }}
                >
                  {transaction.type === 'income' ? '+' : ''}
                  {formatBRL(transaction.amount)}
                </Text>
              </Card>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const keyExtractor = (item: HomeItem, index: number) => {
    switch (item.type) {
      case 'header':
        return 'header';
      case 'quickActions':
        return 'quickActions';
      case 'transactions':
        return 'transactions';
      default:
        return `item-${index}`;
    }
  };

  const { flatListProps } = useVirtualScroll({
    data: listData,
    renderItem,
    keyExtractor,
    estimatedItemSize: 200,
    initialNumToRender: 3,
    maxToRenderPerBatch: 3,
    windowSize: 5,
  });

  return (
    <ScreenContainer>
      <HeaderLayout
        title="Início"
        subtitle="Bem-vindo de volta!"
        rightAction={
          <Button variant="ghost" size="sm" onPress={handleSignOut} icon="🚪">
            Sair
          </Button>
        }
      />

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...flatListProps}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
