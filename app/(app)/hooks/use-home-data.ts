import { useState } from 'react';

import { useRouter } from 'expo-router';

import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { logger } from '@/lib/utils/logger';

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
}

export type HomeItem =
  | { type: 'header'; data: { balance: { total: number; available: number; pending: number } } }
  | { type: 'quickActions'; data: QuickAction[] }
  | { type: 'transactions'; data: Transaction[] };

export const useHomeData = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();
  const [refreshing, setRefreshing] = useState(false);

  const createMockData = (colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
  }) => ({
    balance: {
      total: 12500.75,
      available: 11800.5,
      pending: 700.25,
    },
    quickActions: [
      { id: '1', title: 'Transferir', icon: '↗️', color: colors.primary },
      { id: '2', title: 'Investir', icon: '📈', color: colors.secondary },
      { id: '3', title: 'Pagar', icon: '💳', color: colors.success },
      { id: '4', title: 'Depositar', icon: '💰', color: colors.warning },
    ],
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
      {
        id: '4',
        title: 'Aluguel',
        amount: -800,
        date: new Date(Date.now() - 259200000),
        type: 'expense' as const,
      },
      { id: '5', title: 'Transporte', amount: 80, date: new Date(), type: 'expense' as const },
    ],
  });

  const mockData = createMockData(colors);

  const listData: HomeItem[] = [
    { type: 'header', data: { balance: mockData.balance } },
    { type: 'quickActions', data: mockData.quickActions },
    { type: 'transactions', data: mockData.transactions },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const handleQuickAction = (actionId: string) => {
    logger.info('Quick action:', { actionId });
  };

  return {
    listData,
    refreshing,
    isTablet,
    colors,
    handleRefresh,
    handleSignOut,
    handleQuickAction,
  };
};
