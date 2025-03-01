import { createFont } from 'tamagui';
import { GenericFont } from '@tamagui/web';

export const createPretendardVariableFont = (
  conf: Partial<GenericFont> = {}
): GenericFont => {
  return createFont({
    family: 'Pretendard Variable',
    size: {
      1: 12,
      2: 14,
      3: 15,
      4: 16,
      5: 18,
      6: 20,
      7: 24,
      8: 28,
      9: 32,
      10: 36,
      11: 40,
      12: 48,
      13: 56,
      14: 64,
      15: 72,
      16: 96,
      17: 128,
    },
    lineHeight: {
      1: 17,
      2: 19,
      3: 20,
      4: 21,
      5: 23,
      6: 25,
      7: 29,
      8: 33,
      9: 37,
      10: 41,
      11: 45,
      12: 53,
      13: 61,
      14: 69,
      15: 77,
      16: 101,
      17: 133,
    },
    weight: {
      1: '100', // Thin
      2: '200', // ExtraLight
      3: '300', // Light
      4: '400', // Regular
      5: '500', // Medium
      6: '600', // SemiBold
      7: '700', // Bold
      8: '800', // ExtraBold
      9: '900', // Black
    },
    letterSpacing: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
    },
    face: {
      normal: { normal: 'PretendardVariable' },
    },
    ...conf,
  });
};
