import {
  ListSection,
  type ListSectionProps,
} from '@/base/components/list-section';
import { GroupItem, type GroupItemProps } from './group-item';
import { router } from 'expo-router';

export interface GroupSectionProps extends Omit<ListSectionProps, 'items'> {
  items: GroupItemProps[];
}

export function GroupSection({ items, ...props }: GroupSectionProps) {
  return (
    <ListSection
      {...props}
      items={items}
      renderItem={(item) => {
        const groupItem = item as GroupItemProps;
        return <GroupItem key={groupItem.title} {...groupItem} />;
      }}
    />
  );
}
