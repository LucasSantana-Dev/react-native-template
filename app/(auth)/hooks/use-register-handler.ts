import { useState } from 'react';

import { useRouter } from 'expo-router';

import { RegisterForm } from '../validation/register-validation';

import { logger } from '@/lib/utils/logger';

export const useRegisterHandler = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: RegisterForm) => {
    try {
      setIsLoading(true);
      logger.info('Register attempt', { email: values.email });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      logger.info('Register successful', { email: values.email });
      router.push('/(auth)/login');
    } catch (error) {
      logger.error('Register failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleRegister,
  };
};
