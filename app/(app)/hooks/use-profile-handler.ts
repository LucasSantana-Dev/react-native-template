import { useState } from 'react';

import { useRouter } from 'expo-router';

import { ProfileForm } from '../validation/profile-validation';

import { useAuth } from '@/context/auth-context';
import { logger } from '@/lib/utils/logger';

export const useProfileHandler = () => {
  const router = useRouter();
  const { updateUser, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ProfileForm) => {
    try {
      setIsLoading(true);
      logger.info('Profile update attempt', { email: values.email });

      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update user data
      await updateUser({
        name: values.name,
        email: values.email,
        cpf: values.cpf,
        phone: values.phone,
      });

      logger.info('Profile updated successfully', { email: values.email });
    } catch (error) {
      logger.error('Profile update failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      logger.info('Sign out attempt');

      await signOut();
      router.replace('/(auth)/login');

      logger.info('Sign out successful');
    } catch (error) {
      logger.error('Sign out failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
    handleSignOut,
  };
};
