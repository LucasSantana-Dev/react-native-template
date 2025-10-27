import React from 'react';

import { Pressable, Text, View } from 'react-native';

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
  onPress: (featureId: string) => void;
  isTablet: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onPress, isTablet }) => {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={() => onPress(feature.id)}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: colors.border,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        isTablet && {
          flex: 1,
          marginHorizontal: 6,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 24, marginRight: 12 }}>{feature.icon}</Text>
        <Text
          style={{
            fontSize: 18,
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
    </Pressable>
  );
};
