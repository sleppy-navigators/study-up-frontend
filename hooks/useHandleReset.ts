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
      router.replace('/');
    }
  };

  return handleReset;
};
