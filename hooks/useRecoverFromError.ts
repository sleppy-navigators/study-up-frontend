import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useSetAtom } from 'jotai';
import { authActions } from '@/lib/auth/authStore';
import { useCallback } from 'react';
import { ResetOptions } from '@/lib/errors/http';

export const useRecoverFromError = () => {
  const queryClient = useQueryClient();

  const recoverFromError = useCallback(
    async (resetOptions: ResetOptions) => {
      const {
        shouldClearCache = true,
        shouldClearAuth = false,
        shouldClearNavigation = true,
        navigationTarget = '/',
      } = resetOptions;

      if (shouldClearCache) {
        queryClient.clear();
      }

      if (shouldClearAuth) {
        await authActions.clearTokens();
      }

      if (shouldClearNavigation) {
        router.replace(navigationTarget);
      }
    },
    [queryClient, clearTokens]
  );

  return { recoverFromError };
};
