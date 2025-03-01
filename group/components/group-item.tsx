import { ListItem, type ListItemProps } from '@/base/components/list-item';

export interface GroupItemProps extends Omit<ListItemProps, 'actionButton'> {
  timestamp: string;
}

export function GroupItem({ timestamp, ...props }: GroupItemProps) {
  return <ListItem {...props} rightContent={timestamp} />;
}
