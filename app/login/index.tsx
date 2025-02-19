import React, { useCallback, useRef, useState } from 'react';
import { useGoogleSignInMutation } from '../../hooks/useGoogleSignIn';
import { Button, Spinner, Text, YStack } from 'tamagui';
import { SuspenseProvider } from '@/components/SuspenseProvider';
import { ErrorBoundaryProps } from 'expo-router';
import { ErrorFallback } from '@/components/ErrorFallback';
import { useRecoverFromError } from '@/hooks/useRecoverFromError';
import { ResetOptions } from '@/lib/errors/http';
import { Platform } from 'react-native';
import { Text as BasicText } from 'react-native';

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
  const { mutateAsync, isPending } = useGoogleSignInMutation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const handleSignIn = useCallback(async () => {
    const { data } = await mutateAsync();

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

    if (Platform.OS === 'web' && newAccessToken && newRefreshToken) {
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
    }
  }, [mutateAsync]);

  return (
    <SuspenseProvider>
      <YStack style={{ padding: 16, gap: 16 }}>
        <Button onPress={handleSignIn} themeInverse disabled={isPending}>
          <Text>{isPending ? <Spinner /> : '구글로 로그인하기'}</Text>
        </Button>
        <BasicText>{accessToken}</BasicText>
        <BasicText>{refreshToken}</BasicText>
        {Platform.OS === 'web' && accessToken && refreshToken && (
          <YStack>
            <Text
              style={{
                fontFamily: 'monospace',
                color: 'var(--blue11)',
              }}>
              Access Token: {accessToken}
            </Text>
            <Text
              style={{
                fontFamily: 'monospace',
                color: 'var(--blue11)',
              }}>
              Refresh Token: {refreshToken}
            </Text>
          </YStack>
        )}
      </YStack>
    </SuspenseProvider>
  );
}

export default Index;
