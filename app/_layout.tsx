import { Slot, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { QueryProvider } from '@/lib/react-query';
import { TamaguiProvider } from 'tamagui';
import appConfig from '@/tamagui.config';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Header } from '@/base/components/header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import GlobalLoadingFallback from '@/base/providers/global-loading-fallback';
import AuthGuardProvider from '@/auth/providers/AuthGuardProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  console.log('pathname in RootLayout', pathname);
  return (
    <TamaguiProvider config={appConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <QueryProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              <Stack
                screenOptions={{
                  header: (props) => <Header />,
                }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="login" />
                <Stack.Screen name="chat" />
                <Stack.Screen name="bounty" options={{ headerShown: true }} />
                <Stack.Screen name="group" options={{ headerShown: true }} />
                <GlobalLoadingFallback>
                  <AuthGuardProvider>
                    <Slot />
                  </AuthGuardProvider>
                </GlobalLoadingFallback>
              </Stack>
            </SafeAreaView>
          </QueryProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
