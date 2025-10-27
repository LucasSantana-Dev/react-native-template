import { RefreshControl } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { HomeListItem } from './components/home-list-item';
import { HomeItem, useHomeData } from './hooks/use-home-data';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';

// ========== COMPONENT ==========
export default function HomeScreenFlashList() {
  const {
    listData,
    refreshing,
    isTablet,
    colors,
    handleRefresh,
    handleSignOut,
    handleQuickAction,
  } = useHomeData();

  const renderItem = ({ item }: { item: HomeItem }) => (
    <HomeListItem
      item={item}
      isTablet={isTablet}
      colors={colors}
      onQuickAction={handleQuickAction}
    />
  );

  const keyExtractor = (item: HomeItem, index: number) => {
    switch (item.type) {
      case 'header':
        return 'header';
      case 'quickActions':
        return 'quickActions';
      case 'transactions':
        return 'transactions';
      default:
        return `item-${index}`;
    }
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Olá, Usuário"
        subtitle="Bem-vindo de volta!"
        rightAction={
          <Button variant="ghost" size="sm" onPress={handleSignOut} icon="🚪">
            Sair
          </Button>
        }
        backgroundColor={colors.background}
      />

      <FlashList
        data={listData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </ScreenContainer>
  );
}
