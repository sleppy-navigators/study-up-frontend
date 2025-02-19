import React, { useCallback, useState } from 'react';
import { useGoogleSignInMutation } from '../../hooks/useGoogleSignIn';
import { Button, Spinner, Text, YStack } from 'tamagui';
import { SuspenseProvider } from '@/components/SuspenseProvider';
import { ErrorBoundaryProps } from 'expo-router';
import { ErrorFallback } from '@/components/ErrorFallback';
import { useRecoverFromError } from '@/hooks/useRecoverFromError';
import { ResetOptions } from '@/lib/errors/http';
import { Platform } from 'react-native';

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
  const { mutate, isPending } = useGoogleSignInMutation();
  const [token, setToken] = useState<string | null>(null);

  const handleSignIn = useCallback(async () => {
    const result = await mutate();
    if (Platform.OS === 'web' && result) {
      setToken(result);
    }
  }, [mutate]);

  return (
    <SuspenseProvider>
      <YStack style={{ padding: 16, gap: 16 }}>
        <Button onPress={handleSignIn} themeInverse disabled={isPending}>
          <Text>{isPending ? <Spinner /> : '구글로 로그인하기'}</Text>
        </Button>
        {Platform.OS === 'web' && token && (
          <YStack
            style={{
              backgroundColor: 'var(--blue2)',
              padding: 16,
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: 'monospace',
                color: 'var(--blue11)',
              }}>
              Firebase ID Token: {token}
            </Text>
          </YStack>
        )}
      </YStack>
    </SuspenseProvider>
  );
}

export default Index;
