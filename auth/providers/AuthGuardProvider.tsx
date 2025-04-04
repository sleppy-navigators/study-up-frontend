import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';
import useAuthQuery from '../hooks/useAuthQuery';

interface AuthGuardProviderProps {
  children: ReactNode;
}

export default function AuthGuardProvider({
  children,
}: AuthGuardProviderProps) {
  const { data } = useAuthQuery();
  const { isAuthenticated } = data;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
