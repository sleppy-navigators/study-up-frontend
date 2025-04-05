import { AuthStateType, useAuthStore } from '../stores/authStore';

export interface AuthQueryData {
  data: Omit<AuthStateType, 'isLoading' | 'isError'>;
  isLoading: boolean;
  isError: boolean;
}

export default function useAuthQuery(): AuthQueryData {
  const { isLoading, isError, ...state } = useAuthStore();

  if (isLoading) {
    throw new Promise<void>((resolve) => {
      const unsubscribe = useAuthStore.subscribe((state) => {
        if (!state.isLoading) {
          unsubscribe();
          resolve();
        }
      });
    });
  }

  return {
    data: { ...state },
    isLoading,
    isError,
  };
}
