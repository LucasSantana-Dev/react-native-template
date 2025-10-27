import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { TransactionItem } from './transaction-item';

import { useThemeColors } from '@/context/theme-context';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onViewAll,
}) => {
  const colors = useThemeColors();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
          }}
        >
          Transações recentes
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text
            style={{
              fontSize: 14,
              color: colors.primary,
              fontWeight: '500',
            }}
          >
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {transactions.length === 0 ? (
          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
              paddingVertical: 20,
            }}
          >
            Nenhuma transação encontrada
          </Text>
        ) : (
          transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </View>
    </View>
  );
};

export default RecentTransactions;
