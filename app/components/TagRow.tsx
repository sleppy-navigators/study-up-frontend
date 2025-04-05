import React from 'react';
import { XStack, XStackProps } from 'tamagui';

export type TagRowProps = XStackProps & {
  children: React.ReactNode;
};

export function TagRow({ children, ...props }: TagRowProps) {
  return (
    <XStack paddingVertical="$2" space="$2" flexWrap="wrap" {...props}>
      {children}
    </XStack>
  );
}
