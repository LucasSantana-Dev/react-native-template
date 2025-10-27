import React from 'react';

import { Text, View } from 'react-native';

import { useThemeColors } from '@/context/theme-context';
import { formatBRL } from '@/lib/utils/currency';
import { formatRelative as formatRelativeDate } from '@/lib/utils/date';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
}

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const colors = useThemeColors();

  return (
    <View
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
            marginBottom: 4,
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
        {transaction.type === 'income' ? '+' : '-'}
        {formatBRL(transaction.amount)}
      </Text>
    </View>
  );
};
