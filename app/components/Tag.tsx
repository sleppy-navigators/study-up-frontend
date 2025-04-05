import React from 'react';
import { Button, styled, ButtonProps } from 'tamagui';

export type TagProps = ButtonProps & {
  active?: boolean;
  label: string;
};

const StyledButton = styled(Button, {
  borderRadius: '$10',
  paddingHorizontal: '$3',
  height: 40,
  // Base inactive style
  backgroundColor: '$gray3',
  color: '$gray11',
  pressStyle: {
    backgroundColor: '$gray4',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$yellow4',
        color: '$yellow11',
        fontWeight: 'bold',
        pressStyle: {
          backgroundColor: '$yellow5',
        },
      },
    },
  } as const,
});

export function Tag({ label, active = false, ...props }: TagProps) {
  return (
    <StyledButton active={active} {...props}>
      {label}
    </StyledButton>
  );
}
