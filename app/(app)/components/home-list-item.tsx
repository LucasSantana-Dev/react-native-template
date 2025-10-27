import React from 'react';

import { View } from 'react-native';

import { useRouter } from 'expo-router';

import { HomeItem } from '../hooks/use-home-data';

import { BalanceCard } from './balance-card';
import { QuickActionsGrid } from './quick-actions-grid';
import { RecentTransactions } from './recent-transactions';

interface HomeListItemProps {
  item: HomeItem;
  isTablet: boolean;
  colors: { primary: string; secondary: string };
  onQuickAction: (actionId: string) => void;
}

export const HomeListItem: React.FC<HomeListItemProps> = ({
  item,
  isTablet,
  colors: _colors,
  onQuickAction,
}) => {
  const router = useRouter();

  switch (item.type) {
    case 'header':
      return (
        <View style={{ margin: 16 }}>
          <BalanceCard
            balance={item.data.balance}
            onInvest={() => onQuickAction('invest')}
            onTransfer={() => onQuickAction('transfer')}
          />
        </View>
      );
    case 'quickActions':
      return (
        <View style={{ margin: 16 }}>
          <QuickActionsGrid actions={item.data} isTablet={isTablet} onActionPress={onQuickAction} />
        </View>
      );
    case 'transactions':
      return (
        <View style={{ margin: 16 }}>
          <RecentTransactions
            transactions={item.data}
            onViewAll={() => router.push('/(app)/transactions')}
          />
        </View>
      );
    default:
      return null;
  }
};
