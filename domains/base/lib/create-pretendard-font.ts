import { createFont } from 'tamagui';
import { GenericFont } from '@tamagui/web';

export const createPretendardFont = (
  conf: Partial<GenericFont> = {}
): GenericFont => {
  return createFont({
    size: {
      ...conf.size,
    },
    lineHeight: {
      ...conf.lineHeight,
    },
    letterSpacing: {
      ...conf.letterSpacing,
    },
    weight: {
      ...conf.weight,
    },
    face: {
      100: { normal: 'Pretendard-Thin' },
      200: { normal: 'Pretendard-ExtraLight' },
      300: { normal: 'Pretendard-Light' },
      400: { normal: 'Pretendard-Regular' },
      500: { normal: 'Pretendard-Medium' },
      600: { normal: 'Pretendard-SemiBold' },
      700: { normal: 'Pretendard-Bold' },
      800: { normal: 'Pretendard-ExtraBold' },
      900: { normal: 'Pretendard-Black' },
    },
  });
};
