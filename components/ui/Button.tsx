import { styled } from 'tamagui';
import { Button as TamaguiButton } from 'tamagui';

export const Button = styled(TamaguiButton, {
  backgroundColor: '$primary',
  borderRadius: '$full',
  paddingHorizontal: '$medium',
  paddingVertical: '$small',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$text',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$primary',
        color: '$primary',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
  },
});
