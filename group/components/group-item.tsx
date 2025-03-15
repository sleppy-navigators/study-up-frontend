import { ListItem, type ListItemProps } from '@/base/components/list-item';
import { useRouter } from 'expo-router';

export interface GroupItemProps extends Omit<ListItemProps, 'actionButton'> {
  id: number;
  timestamp: string;
  onPress?: () => void;
}

export function GroupItem({
  id,
  timestamp,
  onPress,
  ...props
}: GroupItemProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // 기본 동작: 그룹 상세 페이지로 이동
      router.push(`/group/${id}`);
    }
  };

  return <ListItem {...props} rightContent={timestamp} onPress={handlePress} />;
}
