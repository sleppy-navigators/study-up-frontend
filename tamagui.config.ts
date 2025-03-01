import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { defaultConfig } from '@tamagui/config/v4';
import { createPretendardVariableFont } from '@/base/lib/create-pretendard-font';

const customConfig = {
  fonts: {
    ...defaultConfig.fonts,
    body: createPretendardVariableFont(),
    heading: createPretendardVariableFont(),
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
