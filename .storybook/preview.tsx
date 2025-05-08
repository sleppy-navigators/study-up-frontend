import type { Preview } from '@storybook/react';
import React from 'react';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider } from 'tamagui';
import appConfig from '../tamagui.config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryProvider } from '../lib/react-query';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <TamaguiProvider config={appConfig} defaultTheme={'light'}>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <QueryProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <Story />
              </SafeAreaView>
            </QueryProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </TamaguiProvider>
    ),
  ],
};

export default preview;
