import { Button, ScrollView, Spinner, Text, YStack } from 'tamagui';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Plus } from '@tamagui/lucide-icons';
import { BottomNavigation } from '@/base/components/bottom-navigation';
import { GroupSection } from '@/group/components/group-section';
import type { GroupItemProps } from '@/group/components/group-item';
import { useUserGroupsQuery } from '@/user/api';
import { Header } from '@/base/components/header';

export function GroupListPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'community' | 'profile'>(
    'community'
  );
  const router = useRouter();
  const { data, isLoading, error, refetch } = useUserGroupsQuery();

  // 그룹 생성 페이지로 이동
  const handleCreateGroup = () => {
    router.push('/group/create');
  };

  // API 응답 데이터를 GroupItemProps 형식으로 변환
  const groupItems: GroupItemProps[] =
    data?.groups.map((group) => ({
      id: group.id,
      imageUrl:
        group.thumbnailUrl ||
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-mDSRTOIWK41ercqi1SkeJmmGyhoATk.png',
      title: group.name,
      description: group.lastSystemMessage || '그룹에 참여해보세요!',
      timestamp: '최근 활동',
    })) || [];

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="그룹" onAdd={handleCreateGroup} />

      <ScrollView flex={1}>
        {isLoading ? (
          <YStack padding="$8" alignItems="center" justifyContent="center">
            <Spinner size="large" color="$yellow9" />
          </YStack>
        ) : error ? (
          <YStack padding="$8" alignItems="center" justifyContent="center">
            <Text color="$red9">그룹 목록을 불러오는데 실패했습니다.</Text>
            <Button marginTop="$4" onPress={() => refetch()} themeInverse>
              다시 시도
            </Button>
          </YStack>
        ) : groupItems.length === 0 ? (
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

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </YStack>
  );
}
