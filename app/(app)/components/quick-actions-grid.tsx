import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/context/theme-context';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
  isTablet: boolean;
  onActionPress: (actionId: string) => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  actions,
  isTablet,
  onActionPress,
}) => {
  const colors = useThemeColors();

  const ActionItem: React.FC<{ action: QuickAction }> = ({ action }) => (
    <TouchableOpacity
      key={action.id}
      onPress={() => onActionPress(action.id)}
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          marginBottom: 8,
        }}
      >
        {action.icon}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: colors.text,
          textAlign: 'center',
        }}
      >
        {action.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 16,
        }}
      >
        Ações rápidas
      </Text>
      <View
        style={{
          flexDirection: isTablet ? 'row' : 'column',
          gap: 12,
        }}
      >
        {isTablet ? (
          actions.map((action) => (
            <View key={action.id} style={{ flex: 1 }}>
              <ActionItem action={action} />
            </View>
          ))
        ) : (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            {actions.map((action) => (
              <View key={action.id} style={{ width: '48%' }}>
                <ActionItem action={action} />
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default QuickActionsGrid;
