import { ListItem, type ListItemProps } from '@/base/components/list-item';

export interface TaskItemProps extends Omit<ListItemProps, 'actionButton'> {
  onVerify: () => void;
}

export function TaskItem({ onVerify, ...props }: TaskItemProps) {
  return (
    <ListItem
      {...props}
      actionButton={{
        label: '인증하기',
        onPress: onVerify,
        color: '$orange9',
      }}
    />
  );
}
