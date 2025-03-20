import React, { useState } from 'react';
import { ScrollView, Spinner, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import {
  Header,
  createInviteAction,
  createSearchAction,
} from '@/base/components/header';
import { useGroupChallengesQuery, useGroupTasksQuery } from '@/group/api';
import { TaskSection } from '@/group/components/task-section';
import { ChallengeSection } from '@/group/components/challenge-section';
import { InvitationBottomSheet } from '@/group/components/invitation-bottom-sheet';

interface GroupDetailPageProps {
  groupId: number;
}

export function GroupDetailPage({ groupId }: GroupDetailPageProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const { data: challengesData, isLoading: isLoadingChallenges } =
    useGroupChallengesQuery(groupId);
  const { data: tasksData, isLoading: isLoadingTasks } =
    useGroupTasksQuery(groupId);

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 검색 핸들러
  const handleSearch = () => {
    setShowSearch(true);
  };

  // 초대 핸들러
  const handleInvite = () => {
    setShowInvitation(true);
  };

  // 헤더 액션 버튼 설정
  const headerActions = [
    createSearchAction(handleSearch),
    createInviteAction(handleInvite),
  ];

  // 마감이 임박한 태스크 필터링 (3일 이내)
  const getUpcomingTasks = () => {
    if (!tasksData?.tasks) return [];

    const now = new Date();
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(now.getDate() + 3);

    return tasksData.tasks
      .filter((task) => {
        const deadline = new Date(task.deadline);
        return deadline >= now && deadline <= threeDaysLater;
      })
      .sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
  };

  // 최근 인증된 태스크 필터링
  const getRecentCertifiedTasks = () => {
    if (!tasksData?.tasks) return [];

    return tasksData.tasks
      .filter((task) => task.certification)
      .sort((a, b) => {
        const dateA = new Date(a.certification?.certificatedAt || 0);
        const dateB = new Date(b.certification?.certificatedAt || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5); // 최근 5개만 표시
  };

  // 로딩 중인 경우
  if (isLoadingChallenges || isLoadingTasks) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <Header title="그룹 상세" onBack={handleBack} actions={headerActions} />
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$yellow9" />
        </YStack>
      </YStack>
    );
  }

  const upcomingTasks = getUpcomingTasks();
  const recentCertifiedTasks = getRecentCertifiedTasks();

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="그룹 상세" onBack={handleBack} actions={headerActions} />

      <ScrollView flex={1} padding="$4">
        <YStack space="$6">
          {/* 마감이 임박한 태스크 섹션 */}
          <TaskSection
            title="마감이 임박한 태스크"
            description="3일 이내에 마감되는 태스크입니다."
            tasks={upcomingTasks}
            emptyMessage="마감이 임박한 태스크가 없습니다."
          />

          {/* 최근 인증된 태스크 섹션 */}
          <TaskSection
            title="최근 인증된 태스크"
            description="최근에 인증된 태스크입니다."
            tasks={recentCertifiedTasks}
            emptyMessage="최근 인증된 태스크가 없습니다."
          />

          {/* 모든 챌린지 섹션 */}
          {showSearch && challengesData?.challenges && (
            <ChallengeSection
              title="모든 챌린지"
              challenges={challengesData.challenges}
              emptyMessage="챌린지가 없습니다."
            />
          )}
        </YStack>
      </ScrollView>

      {/* 초대 바텀시트 */}
      <InvitationBottomSheet
        groupId={groupId}
        open={showInvitation}
        onOpenChange={setShowInvitation}
      />
    </YStack>
  );
}
