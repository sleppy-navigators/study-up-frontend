import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { QueryProvider } from '@/lib/react-query';
import { TamaguiProvider } from 'tamagui';
import appConfig from '@/tamagui.config';

export default function RootLayout() {
  return (
    <TamaguiProvider config={appConfig}>
      <QueryProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="login" />
          <Stack.Screen name="chat" />
        </Stack>
        <StatusBar style="light" />
      </QueryProvider>
    </TamaguiProvider>
  );
}
