import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { defaultConfig } from '@tamagui/config/v4';
import { createPretendardFont } from '@/base/lib/create-pretendard-font';
import { createAnimations } from '@tamagui/animations-react-native';

const customConfig = {
  fonts: {
    body: createPretendardFont({
      ...defaultConfig.fonts.body,
      weight: {
        1: '400',
        2: '400',
        3: '400',
        4: '400',
        5: '400',
        6: '400',
        7: '400',
        8: '400',
        9: '400',
        10: '400',
        11: '400',
        12: '400',
        13: '400',
        14: '400',
        15: '400',
        16: '400',
        true: '400',
      },
    }),
    heading: createPretendardFont({
      ...defaultConfig.fonts.heading,
      weight: {
        1: '700',
        2: '700',
        3: '700',
        4: '700',
        5: '700',
        6: '700',
        7: '700',
        8: '700',
        9: '700',
        10: '700',
        11: '700',
        12: '700',
        13: '700',
        14: '700',
        15: '700',
        16: '700',
        true: '700',
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
