import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { QueryProvider } from '@/lib/react-query';
import appConfig from '@/tamagui.config';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Header } from '@/domains/base/components/header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import StorybookProvider from '@/domains/base/providers/storybook-provider';
import StyledSafeAreaView from '@/domains/base/providers/safe-area-view';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <StorybookProvider>
      <TamaguiProvider config={appConfig} defaultTheme={colorScheme!}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <SafeAreaProvider>
            <QueryProvider>
              <StyledSafeAreaView style={{ flex: 1 }}>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                <Stack
                  screenOptions={{
                    header: (props) => <Header />,
                  }}>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="chat" />
                  <Stack.Screen name="bounty" options={{ headerShown: true }} />
                  <Stack.Screen name="group" options={{ headerShown: true }} />
                  <Stack.Screen
                    name="group/create"
                    options={{ headerShown: true }}
                  />
                </Stack>
              </StyledSafeAreaView>
            </QueryProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </StorybookProvider>
  );
}
