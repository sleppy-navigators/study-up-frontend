import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { defaultConfig } from '@tamagui/config/v4';
import { createInterFont } from '@tamagui/font-inter';

const customConfig = {
  fonts: {
    ...defaultConfig.fonts,
    body: createInterFont(),
    heading: createInterFont({
      face: {
        700: { normal: 'InterBold' },
      },
    }),
  },

  tokens: {
    ...tokens,
    ...defaultConfig.tokens,
  },
  themes: {
    ...themes,
    ...defaultConfig.themes,
  },
  shorthands: {
    ...shorthands,
    ...defaultConfig.shorthands,
  },
  settings: {
    onlyAllowShorthands: false,
    fastSchemeChange: true,
    themeClassNameOnRoot: true,
  },
  defaultTheme: 'light',
};

export const appConfig = createTamagui(customConfig);

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
