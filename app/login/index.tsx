import React, { useCallback } from 'react';
import { Button, Spinner, Text, YStack } from 'tamagui';
import { SuspenseProvider } from '@/components/SuspenseProvider';
import { ErrorBoundaryProps, router } from 'expo-router';
import { ErrorFallback } from '@/components/ErrorFallback';
import { useRecoverFromError } from '@/hooks/useRecoverFromError';
import { ResetOptions } from '@/lib/errors/http';
import { useSignInMutation } from '@/auth/api';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
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

function Index() {
  const { mutate, isPending } = useSignInMutation({
    onSignIn: () => router.replace('/'),
  });

  const handlePress = () => {
    mutate({ provider: 'GOOGLE' });
  };

  return (
    <SuspenseProvider>
      <YStack>
        <Button onPress={handlePress} themeInverse disabled={isPending}>
          <Text>{isPending ? <Spinner /> : '구글로 로그인하기'}</Text>
        </Button>
      </YStack>
    </SuspenseProvider>
  );
}

export default Index;
