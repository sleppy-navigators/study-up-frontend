import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { defaultConfig } from '@tamagui/config/v4';

const customConfig = {
  ...defaultConfig,
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
    ...defaultConfig.tokens,
    ...tokens,
  },
  themes: {
    ...defaultConfig.themes,
    ...themes,
  },
  shorthands: {
    ...defaultConfig.shorthands,
    ...shorthands,
  },
};

export const appConfig = createTamagui(customConfig);

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
