import type React from 'react';
import { Avatar, Button, Paragraph, Text, XStack, YStack } from 'tamagui';
import { Heading6 } from './heading';

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
  onPress?: () => void; // 아이템 클릭 이벤트
}

export function ListItem({
  imageUrl,
  title,
  description,
  rightContent,
  actionButton,
  leftContent,
  renderContent,
  onPress,
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
      onPress,
      ...props,
    });
  }

  return (
    <XStack
      paddingVertical="$2"
      alignItems="center"
      gap="$3"
      onPress={onPress}
      pressStyle={{ opacity: 0.8 }}
      cursor={onPress ? 'pointer' : 'default'}>
      {leftContent}

      {imageUrl ? (
        <Avatar size="$5" radiused borderWidth={0.5} borderColor="$gray5Light">
          <Avatar.Image src={imageUrl} />
          <Avatar.Fallback backgroundColor="$gray5" />
        </Avatar>
      ) : (
        <Avatar size="$5" radiused borderWidth={0.5} borderColor="$gray5Light">
          <Avatar.Fallback backgroundColor="$gray5">
            <Text>{title.charAt(0).toUpperCase()}</Text>
          </Avatar.Fallback>
        </Avatar>
      )}

      <YStack flex={1} alignItems="flex-start" justify="center">
        <Heading6
          userSelect="none"
          fontWeight="600"
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Heading6>
        <Paragraph
          userSelect="none"
          size="$2"
          fontWeight="500"
          color="$gray9Light"
          numberOfLines={1}
          ellipsizeMode="tail">
          {description}
        </Paragraph>
      </YStack>

      {rightContent && <Text color="$gray9">{rightContent}</Text>}

      {actionButton && (
        <Button
          backgroundColor="$orange9Light"
          borderRadius="$3"
          size="$3"
          onPress={actionButton.onPress}
          color="$orange1Light"
          pressStyle={{ backgroundColor: '$orange10Light' }}
          fontWeight="500"
          borderWidth={0}>
          {actionButton.label}
        </Button>
      )}
    </XStack>
  );
}
