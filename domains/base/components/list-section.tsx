import type React from 'react';
import { YStack } from 'tamagui';
import { ListItem, type ListItemProps } from './list-item';
import { Heading1, Heading2, Heading3 } from './heading';

export interface ListSectionProps {
  title?: string;
  items: ListItemProps[];
  renderItem?: (item: ListItemProps) => React.ReactNode; // 커스텀 아이템 렌더링
  renderHeader?: (title: string) => React.ReactNode; // 커스텀 헤더 렌더링
}

export function ListSection({
  title,
  items,
  renderItem,
  renderHeader,
}: ListSectionProps) {
  return (
    <YStack gap="$2" padding={title ? '$4' : '$0'}>
      {title &&
        (renderHeader ? (
          renderHeader(title)
        ) : (
          <Heading1 fontWeight="600">{title}</Heading1>
        ))}

      <YStack gap="$2" backgroundColor="$background" borderRadius="$2">
        {items.map((item, index) =>
          renderItem ? renderItem(item) : <ListItem key={index} {...item} />
        )}
      </YStack>
    </YStack>
  );
}
