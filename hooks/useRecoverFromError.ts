import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useSetAtom } from 'jotai';
import { authActions } from '@/lib/auth/store';
import { useCallback } from 'react';
import { ResetOptions } from '@/lib/errors/http';

export const useRecoverFromError = () => {
  const queryClient = useQueryClient();
  const clearTokens = useSetAtom(authActions.clearTokens);

  const recoverFromError = useCallback(
    async (details: {
      reason: 'imperative-api';
      args: [ResetOptions] | [];
    }) => {
      if (details.reason !== 'imperative-api') return;

      const {
        shouldClearCache = true,
        shouldClearAuth = false,
        shouldClearNavigation = true,
      } = details.args[0] || {};

      if (shouldClearCache) {
        queryClient.clear();
      }

      if (shouldClearAuth) {
        await clearTokens();
      }

      if (shouldClearNavigation) {
        router.replace('/login');
      }
    },
    [queryClient, clearTokens]
  );

  return { recoverFromError };
};
