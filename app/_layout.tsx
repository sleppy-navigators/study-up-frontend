import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Providers } from '@/lib/react-query';
import { TamaguiProvider } from 'tamagui';
import appConfig from '@/tamagui.config';
import { ErrorBoundaryProvider } from '@/components/ErrorBoundaryProvider';
import { SuspenseProvider } from '@/components/SuspenseProvider';

export default function RootLayout() {
  return (
    <TamaguiProvider config={appConfig}>
      <Providers>
        <ErrorBoundaryProvider>
          <SuspenseProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="login" />
              <Stack.Screen name="chat" />
            </Stack>
            <StatusBar style="light" />
          </SuspenseProvider>
        </ErrorBoundaryProvider>
      </Providers>
    </TamaguiProvider>
  );
}
