import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/context/theme-context';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface FeatureCardProps {
  feature: Feature;
  _isTablet: boolean;
  onPress: (featureId: string) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  _isTablet: _isTablet,
  onPress,
}) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={() => onPress(feature.id)}
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 24, marginRight: 12 }}>{feature.icon}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.text,
            flex: 1,
          }}
        >
          {feature.title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: colors.textSecondary,
          lineHeight: 20,
        }}
      >
        {feature.description}
      </Text>
    </TouchableOpacity>
  );
};
