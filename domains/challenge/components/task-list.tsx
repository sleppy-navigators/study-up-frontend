import { YStack, Button, Text } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { TaskItem } from './task-item';
import { Task } from '../types';

export interface TaskListProps {
  tasks: Task[];
  onAddTask: () => void;
  onUpdateTask: (index: number, updatedTask: Task) => void;
  onRemoveTask: (index: number) => void;
  maxDeadline?: Date;
  disabled?: boolean;
}

export function TaskList({
  tasks,
  onAddTask,
  onUpdateTask,
  onRemoveTask,
  maxDeadline,
  disabled = false,
}: TaskListProps) {
  return (
    <YStack space="$4">
      <Text fontSize="$6" fontWeight="bold">
        테스크
      </Text>

      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          index={index}
          title={task.title}
          deadline={task.deadline}
          onTitleChange={(index, title) =>
            onUpdateTask(index, { ...task, title })
          }
          onDeadlineChange={(index, deadline) =>
            onUpdateTask(index, { ...task, deadline })
          }
          onRemove={onRemoveTask}
          maxDeadline={maxDeadline}
          disabled={disabled}
        />
      ))}

      <Button
        backgroundColor="$gray2"
        borderRadius="$4"
        onPress={onAddTask}
        disabled={disabled}
        opacity={disabled ? 0.5 : 1}
        icon={<Plus size="$1" />}>
        테스크 추가
      </Button>
    </YStack>
  );
}
