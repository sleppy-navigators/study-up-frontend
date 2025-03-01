import type React from 'react';
import { ArrowLeft, Plus } from '@tamagui/lucide-icons';
import { Button, H2, XStack, YStack } from 'tamagui';

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  onAdd?: () => void;
  children?: React.ReactNode;
}

export function Header({ title, onBack, onAdd, children }: HeaderProps) {
  return (
    <YStack backgroundColor="$background">
      <XStack
        height="$6"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$4">
        <XStack alignItems="center" gap="$2">
          {onBack && (
            <Button
              chromeless
              onPress={onBack}
              icon={<ArrowLeft size="$1.5" />}
            />
          )}
          <H2>{title}</H2>
        </XStack>

        {onAdd && (
          <Button size="$3" circular backgroundColor="$yellow9" onPress={onAdd}>
            <Plus size="$1.5" color="$color" />
          </Button>
        )}
      </XStack>

      {children && (
        <YStack padding="$4" paddingTop="$0">
          {children}
        </YStack>
      )}
    </YStack>
  );
}
