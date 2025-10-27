import React from 'react';

import { View } from 'react-native';

import { FeatureCard } from './feature-card';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface FeaturesGridProps {
  features: Feature[];
  isTablet: boolean;
  onFeaturePress: (featureId: string) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  features,
  isTablet,
  onFeaturePress,
}) => {
  return (
    <View
      style={{
        flexDirection: isTablet ? 'row' : 'column',
        flexWrap: isTablet ? 'wrap' : 'nowrap',
        gap: 12,
      }}
    >
      {features.map(feature => (
        <View
          key={feature.id}
          style={{
            flex: isTablet ? 1 : undefined,
            minWidth: isTablet ? 300 : undefined,
          }}
        >
          <FeatureCard feature={feature} isTablet={isTablet} onPress={onFeaturePress} />
        </View>
      ))}
    </View>
  );
};

export default FeaturesGrid;
