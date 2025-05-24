import React, { useCallback } from 'react';
import { ErrorBoundaryProps } from 'expo-router';
import { useRecoverFromError } from '@/hooks/useRecoverFromError';
import { ResetOptions } from '@/lib/errors/http';
import { ErrorFallback } from '@/components/ErrorFallback';

export default function GlobalErrorFallback({
  error,
  retry,
}: ErrorBoundaryProps) {
  const { recoverFromError } = useRecoverFromError();

  const handleReset = useCallback(
    async (resetOptions: ResetOptions) => {
      await recoverFromError(resetOptions);
      retry();
    },
    [recoverFromError, retry]
  );

  return <ErrorFallback error={error} onReset={handleReset} />;
}
