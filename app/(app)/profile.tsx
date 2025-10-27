import { useState } from 'react';

import { Alert, ScrollView, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { HeaderLayout } from '@/components/layout/header-layout';
import { ScreenContainer } from '@/components/layout/screen-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/context/theme-context';
import { useFormData } from '@/hooks/use-form-data';
import { isValidEmail, validateCPF, validatePhone } from '@/lib/utils/brazilian';


// ========== PROFILE FORM TYPES ==========
interface ProfileForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

// ========== PROFILE SCREEN ==========
export default function ProfileScreen() {
  const router = useRouter();
  const { user, updateUser, signOut } = useAuth();
  const colors = useThemeColors();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
  const validation = {
    name: (value: string) => {
      if (!value) return 'Nome é obrigatório';
      if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
      return undefined;
    },
    email: (value: string) => {
      if (!value) return 'Email é obrigatório';
      if (!isValidEmail(value)) return 'Email inválido';
      return undefined;
    },
    cpf: (value: string) => {
      if (!value) return 'CPF é obrigatório';
      if (!validateCPF(value)) return 'CPF inválido';
      return undefined;
    },
    phone: (value: string) => {
      if (!value) return 'Telefone é obrigatório';
      if (!validatePhone(value)) return 'Telefone inválido';
      return undefined;
    },
  };

  // Form management
  const {
    formState,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
  } = useFormData<ProfileForm>({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      cpf: user?.cpf || '',
      phone: user?.phone || '',
    },
    validation,
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Handle edit toggle
  const handleEditToggle = () => {
    if (isEditing) {
      resetForm();
    }
    setIsEditing(!isEditing);
  };

  // Handle save profile
  const handleSaveProfile = async (values: ProfileForm) => {
    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      updateUser(values);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar perfil. Tente novamente.');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  // Handle change password
  const handleChangePassword = () => {
    Alert.alert('Alterar Senha', 'Funcionalidade em desenvolvimento');
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Esta ação não pode ser desfeita. Tem certeza que deseja excluir sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Conta Excluída', 'Sua conta foi excluída com sucesso.');
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer safeArea>
      <HeaderLayout
        title="Perfil"
        subtitle="Gerencie suas informações"
        rightAction={
          <Button
            variant="ghost"
            size="sm"
            onPress={handleEditToggle}
            icon={isEditing ? '✏️' : '✏️'}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
        }
        backgroundColor={colors.background}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
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

            {isEditing ? (
              <>
                <Input
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                  value={formState.data.name.value}
                  onChangeText={(value) => setFieldValue('name', value)}
                  onBlur={() => setFieldTouched('name')}
                  error={formState.data.name.error}
                  leftIcon="👤"
                />

                <Input
                  label="Email"
                  placeholder="Digite seu email"
                  value={formState.data.email.value}
                  onChangeText={(value) => setFieldValue('email', value)}
                  onBlur={() => setFieldTouched('email')}
                  error={formState.data.email.error}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon="📧"
                />

                <Input
                  label="CPF"
                  placeholder="000.000.000-00"
                  value={formState.data.cpf.value}
                  onChangeText={(value) => setFieldValue('cpf', value)}
                  onBlur={() => setFieldTouched('cpf')}
                  error={formState.data.cpf.error}
                  keyboardType="numeric"
                  leftIcon="🆔"
                />

                <Input
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  value={formState.data.phone.value}
                  onChangeText={(value) => setFieldValue('phone', value)}
                  onBlur={() => setFieldTouched('phone')}
                  error={formState.data.phone.error}
                  keyboardType="phone-pad"
                  leftIcon="📱"
                />

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  disabled={!formState.isValid || isLoading}
                  onPress={handleSubmit(handleSaveProfile)}
                  style={{ marginTop: 16 }}
                >
                  Salvar alterações
                </Button>
              </>
            ) : (
              <View style={{ gap: 16 }}>
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
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.textSecondary,
                    }}
                  >
                    Nome
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.text,
                    }}
                  >
                    {user?.name || 'Não informado'}
                  </Text>
                </View>

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
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.textSecondary,
                    }}
                  >
                    Email
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.text,
                    }}
                  >
                    {user?.email || 'Não informado'}
                  </Text>
                </View>

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
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.textSecondary,
                    }}
                  >
                    CPF
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.text,
                    }}
                  >
                    {user?.cpf || 'Não informado'}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.textSecondary,
                    }}
                  >
                    Telefone
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.text,
                    }}
                  >
                    {user?.phone || 'Não informado'}
                  </Text>
                </View>
              </View>
            )}
          </Card.Body>
        </Card>

        {/* Actions */}
        <Card variant="outlined" size="md" style={{ marginBottom: 24 }}>
          <Card.Body>
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              icon="🔒"
              onPress={handleChangePassword}
              style={{ marginBottom: 12 }}
            >
              Alterar senha
            </Button>

            <Button
              variant="ghost"
              size="lg"
              fullWidth
              icon="🚪"
              onPress={handleSignOut}
              style={{ marginBottom: 12 }}
            >
              Sair da conta
            </Button>

            <Button
              variant="danger"
              size="lg"
              fullWidth
              icon="🗑️"
              onPress={handleDeleteAccount}
            >
              Excluir conta
            </Button>
          </Card.Body>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
