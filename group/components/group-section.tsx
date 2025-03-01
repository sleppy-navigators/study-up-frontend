import {
  ListSection,
  type ListSectionProps,
} from '@/base/components/list-section';
import { GroupItem, type GroupItemProps } from './group-item';

export interface GroupSectionProps extends Omit<ListSectionProps, 'items'> {
  items: GroupItemProps[];
}

export function GroupSection({ items, ...props }: GroupSectionProps) {
  return (
    <ListSection
      {...props}
      items={items}
      renderItem={(item) => (
        <GroupItem key={item.title} {...(item as GroupItemProps)} />
      )}
    />
  );
}
