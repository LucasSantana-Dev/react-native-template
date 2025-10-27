import { Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const colors = useThemeColors();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Profile"
        subtitle="Manage your account"
        backgroundColor={colors.background}
      />

      <View style={{ flex: 1, padding: 16 }}>
        <Card variant="elevated" size="lg" style={{ marginBottom: 24 }}>
          <Card.Body>
            <View
              style={{
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: colors.white,
                    fontWeight: 'bold',
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: colors.text,
                }}
              >
                {user?.name || 'Usuário'}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.textSecondary,
                }}
              >
                {user?.email || 'usuario@email.com'}
              </Text>
            </View>

            <Button
              variant="outline"
              size="lg"
              fullWidth
              onPress={() => router.push('/(app)/profile')}
              style={{ marginBottom: 12 }}
            >
              Edit Profile
            </Button>

            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onPress={handleSignOut}
            >
              Sign Out
            </Button>
          </Card.Body>
        </Card>
      </View>
    </ScreenContainer>
  );
}
