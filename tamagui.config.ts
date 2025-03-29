import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { defaultConfig } from '@tamagui/config/v4';
import { createPretendardVariableFont } from '@/base/lib/create-pretendard-font';
import { createAnimations } from '@tamagui/animations-react-native';

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
  animations: createAnimations({
    fast: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      damping: 20,
      stiffness: 60,
    },
  }),

  defaultTheme: 'light',
};

export const appConfig = createTamagui(customConfig);

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
