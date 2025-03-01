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
      // 작은 폰트 (1.6-1.7배)
      1: 20, // ~1.7배
      2: 23, // ~1.65배
      3: 25, // ~1.65배
      4: 27, // ~1.6배
      5: 30, // ~1.65배
      6: 33, // ~1.65배

      // 중간 폰트 (1.4-1.5배)
      7: 36, // 1.5배
      8: 42, // 1.5배
      9: 45, // ~1.4배
      10: 50, // ~1.4배
      11: 56, // 1.4배

      // 큰 폰트 (1.2-1.3배)
      12: 60, // 1.25배
      13: 70, // 1.25배
      14: 80, // 1.25배
      15: 90, // 1.25배
      16: 120, // 1.25배
      17: 160, // 1.25배
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
