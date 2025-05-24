import type { Preview } from '@storybook/react';
import React from 'react';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider } from 'tamagui';
import appConfig from '../tamagui.config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from '../lib/react-query';
import StyledSafeAreaView from '../domains/base/providers/safe-area-view';
import MockingProvider from '../mocks/mocking-provider';
import ReactotronProvider from '../domains/base/providers/reactotron-provider';

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
      <ReactotronProvider>
        <MockingProvider>
          <TamaguiProvider config={appConfig} defaultTheme={'light'}>
            <ThemeProvider value={DefaultTheme}>
              <SafeAreaProvider>
                <QueryProvider>
                  <StyledSafeAreaView style={{ flex: 1 }}>
                    <Story />
                  </StyledSafeAreaView>
                </QueryProvider>
              </SafeAreaProvider>
            </ThemeProvider>
          </TamaguiProvider>
        </MockingProvider>
      </ReactotronProvider>
    ),
  ],
};

export default preview;
