import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

const appConfig = createTamagui({
  fonts: {
    body: createInterFont(),
    heading: createInterFont({
      face: {
        700: { normal: 'InterBold' },
      },
    }),
  },
  tokens,
  themes,
  shorthands,
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
