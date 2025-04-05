import { Button, ScrollView, Text, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { Plus } from '@tamagui/lucide-icons';
import { GroupSection } from '@/group/components/group-section';
import type { GroupItemProps } from '@/group/components/group-item';
import { useUserGroupsQuery } from '@/user/api';

export function GroupListPage() {
  const router = useRouter();
  const { data } = useUserGroupsQuery();
  const { groups } = data;

  const handleCreateGroup = () => {
    router.push('/group/create');
  };

  const groupItems: GroupItemProps[] = groups.map((group) => ({
    id: group.id,
    title: group.name,
    description: group.lastSystemMessage || '새로운 그룹입니다.',
    imageUrl: group.thumbnailUrl === 'string' ? '' : group.thumbnailUrl,
  }));

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView flex={1}>
        {groups.length === 0 ? (
          <YStack padding="$8" alignItems="center" justifyContent="center">
            <Text>참여 중인 그룹이 없습니다.</Text>
            <Button
              marginTop="$4"
              onPress={handleCreateGroup}
              backgroundColor="$yellow9"
              color="$color">
              <Plus size="$1" />
              <Text>그룹 만들기</Text>
            </Button>
          </YStack>
        ) : (
          <GroupSection items={groupItems} />
        )}
      </ScrollView>
    </YStack>
  );
}
