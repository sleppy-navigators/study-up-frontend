import { authStore } from '@/lib/auth/authStore';
import { Provider } from 'jotai';
import { ReactNode } from 'react';

interface AuthStateProviderProps {
  children: ReactNode;
}

export function AuthStateProvider({ children }: AuthStateProviderProps) {
  return <Provider store={authStore}>{children}</Provider>;
}
