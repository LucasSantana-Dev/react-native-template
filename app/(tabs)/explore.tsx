import { ScrollView, Text } from 'react-native';

import { FeaturesGrid } from './components/features-grid';
import { WelcomeCard } from './components/welcome-card';
import { getFeatures } from './constants/features';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { logger } from '@/lib/utils/logger';

export default function ExploreScreen() {
  const colors = useThemeColors();
  const { isTablet } = useScreenDimensions();

  const features = getFeatures(colors);

  const handleFeaturePress = (_featureId: string) => {
    logger.info('Feature pressed:', { featureId: _featureId });
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Explorar"
        subtitle="Descubra as funcionalidades"
        backgroundColor={colors.background}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeCard />

        <FeaturesGrid features={features} isTablet={isTablet} onFeaturePress={handleFeaturePress} />

        {/* Documentation Card */}
        <Card variant="outlined" size="md">
          <Card.Body>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 12,
              }}
            >
              📚 Documentação
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                lineHeight: 24,
                marginBottom: 16,
              }}
            >
              Consulte o README.md para instruções detalhadas de uso e configuração.
            </Text>

            <Button
              variant="ghost"
              size="md"
              fullWidth
              onPress={() => {
                logger.info('Open documentation', {});
              }}
            >
              Abrir Documentação
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
