import { ListItem, type ListItemProps } from '@/base/components/list-item';
import { useRouter } from 'expo-router';

export interface GroupItemProps extends Omit<ListItemProps, 'actionButton'> {
  id: number;
  onPress?: () => void;
}

export function GroupItem({ id, onPress, ...props }: GroupItemProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/group/detail/${id}`);
    }
  };

  return <ListItem {...props} onPress={handlePress} />;
}
