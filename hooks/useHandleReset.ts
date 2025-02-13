import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useSetAtom } from 'jotai';
import { authActions } from '@/lib/auth/store';

export const useHandleReset = () => {
  const queryClient = useQueryClient();
  const clearTokens = useSetAtom(authActions.clearTokens);

  const handleReset = async (
    details:
      | {
          reason: 'imperative-api';
          args: any[];
        }
      | {
          reason: 'keys';
          prev: any[] | undefined;
          next: any[] | undefined;
        }
  ) => {
    if (details.reason !== 'imperative-api') return;

    const {
      clearCache = true,
      clearAuth = false,
      clearNavigation = true,
    } = details.args[0] || {};

    if (clearCache) {
      queryClient.clear();
    }

    if (clearAuth) {
      await clearTokens();
    }

    if (clearNavigation) {
      router.replace('/');
    }
  };

  return handleReset;
};
