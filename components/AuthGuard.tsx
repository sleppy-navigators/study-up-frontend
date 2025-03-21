import React, { ReactNode } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStateQuery } from '@/auth/api';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { data } = useAuthStateQuery();

  if (!data.isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
