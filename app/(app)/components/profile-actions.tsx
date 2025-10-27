import React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProfileActionsProps {
  onChangePassword: () => void;
  onSignOut: () => void;
  onDeleteAccount: () => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onChangePassword,
  onSignOut,
  onDeleteAccount,
}) => {
  return (
    <Card variant="outlined" size="md" style={{ marginBottom: 24 }}>
      <Card.Body>
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          icon="🔒"
          onPress={onChangePassword}
          style={{ marginBottom: 12 }}
        >
          Alterar senha
        </Button>

        <Button
          variant="ghost"
          size="lg"
          fullWidth
          icon="🚪"
          onPress={onSignOut}
          style={{ marginBottom: 12 }}
        >
          Sair da conta
        </Button>

        <Button variant="danger" size="lg" fullWidth icon="🗑️" onPress={onDeleteAccount}>
          Excluir conta
        </Button>
      </Card.Body>
    </Card>
  );
};
