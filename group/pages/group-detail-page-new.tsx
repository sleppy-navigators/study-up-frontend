import { ScrollView, Spinner, Text, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { Header } from '@/base/components/header';
import { useGroupChallengesQuery, useGroupTasksQuery } from '@/group/api';

interface GroupDetailPageProps {
  groupId: number;
}

export function GroupDetailPage({ groupId }: GroupDetailPageProps) {
  const router = useRouter();
  // 다음 단계에서 사용할 데이터이므로 주석 처리
  const { /* data: challengesData, */ isLoading: isLoadingChallenges } =
    useGroupChallengesQuery(groupId);
  const { /* data: tasksData, */ isLoading: isLoadingTasks } =
    useGroupTasksQuery(groupId);

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 다음 단계에서 구현할 함수들
  /*
  // 그룹 초대 핸들러
  const handleInvite = () => {
    console.log('초대 기능은 다음 단계에서 구현 예정');
  };

  // 검색 핸들러
  const handleSearch = () => {
    console.log('검색 기능은 다음 단계에서 구현 예정');
  };
  */

  // 로딩 중인 경우
  if (isLoadingChallenges || isLoadingTasks) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <Header title="그룹 상세" onBack={handleBack} />
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$yellow9" />
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="그룹 상세" onBack={handleBack} />

      <ScrollView flex={1} padding="$4">
        <Text>그룹 ID: {groupId}</Text>
        <Text>이 페이지는 다음 단계에서 상세 구현 예정입니다.</Text>
      </ScrollView>
    </YStack>
  );
}
