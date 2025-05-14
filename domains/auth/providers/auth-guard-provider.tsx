import React, { ReactNode } from 'react';
import { Redirect, usePathname } from 'expo-router';
import useAuthQuery from '../hooks/use-auth-query';

interface AuthGuardProviderProps {
  children: ReactNode;
}

export default function AuthGuardProvider({
  children,
}: AuthGuardProviderProps) {
  const { data } = useAuthQuery();
  const pathname = usePathname();

  if (!data.isAuthenticated && pathname !== '/login') {
    return (
      <Redirect href={`/login?redirectTo=${encodeURIComponent(pathname)}`} />
    );
  }

  return <>{children}</>;
}
