import { useQueryClient } from '@tanstack/react-query';
import { router, usePathname } from 'expo-router';
import { useCallback } from 'react';
import { ResetOptions } from '@/lib/errors/http';
import { useAuthStore } from '@/domains/auth/stores/authStore';

export const useRecoverFromError = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  const recoverFromError = useCallback(
    async (resetOptions: ResetOptions) => {
      const {
        shouldClearCache = true,
        shouldClearAuth = false,
        shouldClearNavigation = true,
        navigationTarget = '/',
      } = resetOptions;

      if (shouldClearCache) queryClient.clear();

      if (shouldClearAuth) {
        logout();
      }

      if (shouldClearNavigation) {
        router.replace(navigationTarget);
      }
    },
    [queryClient, logout]
  );

  return { recoverFromError };
};
