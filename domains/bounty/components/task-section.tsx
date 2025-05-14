import {
  ListSection,
  type ListSectionProps,
} from '@/domains/base/components/list-section';
import { TaskItem, type TaskItemProps } from './task-item';

export interface TaskSectionProps extends Omit<ListSectionProps, 'items'> {
  items: TaskItemProps[];
}

export function TaskSection({ items, ...props }: TaskSectionProps) {
  return (
    <ListSection
      {...props}
      items={items}
      renderItem={(item) => (
        <TaskItem key={item.title} {...(item as TaskItemProps)} />
      )}
    />
  );
}
