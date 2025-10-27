import React from 'react';

import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';
import { formatBRL } from '@/lib/utils/currency';

interface BalanceCardProps {
  balance: { total: number; available: number; pending: number };
  onInvest: () => void;
  onTransfer: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, onInvest, onTransfer }) => {
  const colors = useThemeColors();

  return (
    <Card variant="elevated" size="lg" style={{ marginBottom: 24 }}>
      <Card.Body>
        <Text
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            marginBottom: 8,
          }}
        >
          Saldo disponível
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 16,
          }}
        >
          {formatBRL(balance.available)}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontSize: 14, color: colors.textSecondary }}>
            Total: {formatBRL(balance.total)}
          </Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary }}>
            Pendente: {formatBRL(balance.pending)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}
        >
          <Button variant="outline" size="md" icon="📈" onPress={onInvest} style={{ flex: 1 }}>
            Investir
          </Button>
          <Button variant="outline" size="md" icon="💸" onPress={onTransfer} style={{ flex: 1 }}>
            Transferir
          </Button>
        </View>
      </Card.Body>
    </Card>
  );
};

export default BalanceCard;
