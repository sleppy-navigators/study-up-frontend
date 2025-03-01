import type React from 'react';
import { Avatar, Button, H4, Paragraph, Text, XStack, YStack } from 'tamagui';

export interface ListItemProps {
  imageUrl?: string;
  title: string;
  description: string;
  rightContent?: React.ReactNode;
  actionButton?: {
    label: string;
    onPress: () => void;
    color?: string;
  };
  leftContent?: React.ReactNode;
  renderContent?: (props: ListItemProps) => React.ReactNode; // 커스텀 렌더링을 위한 prop
}

export function ListItem({
  imageUrl,
  title,
  description,
  rightContent,
  actionButton,
  leftContent,
  renderContent,
  ...props
}: ListItemProps) {
  if (renderContent) {
    return renderContent({
      imageUrl,
      title,
      description,
      rightContent,
      actionButton,
      leftContent,
      ...props,
    });
  }

  return (
    <XStack padding="$3" alignItems="center" gap="$3">
      {leftContent}

      {imageUrl && (
        <Avatar circular size="$4">
          <Avatar.Image src={imageUrl} />
          <Avatar.Fallback backgroundColor="$gray5" />
        </Avatar>
      )}

      <YStack flex={1} gap="$1">
        <H4 fontWeight="bold">{title}</H4>
        <Paragraph theme="alt2" size="$2">
          {description}
        </Paragraph>
      </YStack>

      {rightContent && (
        <Text color="$gray9" size="$2">
          {rightContent}
        </Text>
      )}

      {actionButton && (
        <Button
          themeInverse
          backgroundColor={actionButton.color || '$orange9'}
          borderRadius="$4"
          size="$3"
          onPress={actionButton.onPress}>
          {actionButton.label}
        </Button>
      )}
    </XStack>
  );
}
