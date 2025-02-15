import React, { useCallback } from 'react';
import { useGoogleSignInMutation } from '../../hooks/useGoogleSignIn';
import { Button, Spinner, Text, YStack } from 'tamagui';
import { SuspenseProvider } from '@/components/SuspenseProvider';
import { ErrorBoundaryProps } from 'expo-router';
import { ErrorFallback } from '@/components/ErrorFallback';
import { useRecoverFromError } from '@/hooks/useRecoverFromError';
import { ResetOptions } from '@/lib/errors/http';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const { recoverFromError } = useRecoverFromError();

  const handleReset = useCallback(
    async (resetOptions: ResetOptions) => {
      await recoverFromError({
        reason: 'imperative-api',
        args: [resetOptions],
      });
      retry();
    },
    [recoverFromError, retry]
  );

  return <ErrorFallback error={error} onReset={handleReset} />;
}

function Index() {
  const { mutate, isPending } = useGoogleSignInMutation();

  return (
    <SuspenseProvider>
      <YStack>
        <Button onPress={() => mutate()} themeInverse disabled={isPending}>
          <Text>{isPending ? <Spinner /> : '구글로 로그인하기'}</Text>
        </Button>
      </YStack>
    </SuspenseProvider>
  );
}

export default Index;
