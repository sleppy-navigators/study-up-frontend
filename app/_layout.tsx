import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { Providers } from '@/lib/react-query';
import { ActivityIndicator, View } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import appConfig from '@/tamagui.config';
import { ErrorBoundaryProvider } from '@/components/ErrorBoundaryProvider';
import * as encoding from 'text-encoding';

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

export default function RootLayout() {
  return (
    <TamaguiProvider config={appConfig}>
      <Providers>
        <ErrorBoundaryProvider>
          <Suspense fallback={<LoadingScreen />}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="login" />
              <Stack.Screen name="chat" />
            </Stack>
            <StatusBar style="light" />
          </Suspense>
        </ErrorBoundaryProvider>
      </Providers>
    </TamaguiProvider>
  );
}
