import React, { useState } from 'react';
import { ScrollView, Spinner, Text, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import {
  Header,
  createInviteAction,
  createSearchAction,
  createChallengeAction,
} from '@/base/components/header';
import { useGroupChallengesQuery, useGroupTasksQuery } from '@/group/api';
import { GroupChallengeListItem } from '@/group/api/types';
import { TaskSection } from '@/group/components/task-section';
import { ChallengeSection } from '@/group/components/challenge-section';
import { InvitationBottomSheet } from '@/group/components/invitation-bottom-sheet';
import { Tag } from '@/app/components/Tag';
import { TagRow } from '@/app/components/TagRow';
import { ChallengeDetailSection } from '@/challenge/components/challenge-detail-section';
import { navigateToTaskCertification } from '../../challenge/utils/navigation';

// Tab 상태를 나타내는 타입
type TabState = 'none' | 'chat' | 'challenge' | 'challenge-detail';

interface GroupDetailPageProps {
  groupId: number;
}

export function GroupDetailPage({ groupId }: GroupDetailPageProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [activeTab, setActiveTab] = useState<TabState>('none');
  const [selectedChallenge, setSelectedChallenge] =
    useState<GroupChallengeListItem | null>(null);

  const { data: challengesData, isLoading: isLoadingChallenges } =
    useGroupChallengesQuery(groupId);
  const { data: tasksData, isLoading: isLoadingTasks } =
    useGroupTasksQuery(groupId);

  // 뒤로가기 핸들러
  const handleBack = () => {
    // 챌린지 상세 화면에서는 챌린지 목록으로 돌아감
    if (activeTab === 'challenge-detail') {
      setActiveTab('challenge');
      setSelectedChallenge(null);
    } else {
      router.back();
    }
  };

  // 검색 핸들러
  const handleSearch = () => {
    setShowSearch(true);
  };

  // 초대 핸들러
  const handleInvite = () => {
    setShowInvitation(true);
  };

  // 챌린지 추가 핸들러
  const handleAddChallenge = () => {
    // Use href to navigate
    router.push(('/challenge/create?groupId=' + groupId) as any);
  };

  // 탭 선택 핸들러
  const handleTabPress = (tab: TabState) => {
    // 챌린지 상세 화면에서 챌린지 탭을 누르면 챌린지 목록으로 돌아감
    if (activeTab === 'challenge-detail' && tab === 'challenge') {
      setSelectedChallenge(null);
      setActiveTab('challenge');
      return;
    }

    // 같은 탭을 다시 클릭하면 기본 상태로 돌아감
    if (activeTab === tab) {
      setActiveTab('none');
    } else {
      setActiveTab(tab);
    }

    // 챌린지 상세에서 다른 탭으로 이동하면 선택된 챌린지 초기화
    if (activeTab === 'challenge-detail' && tab !== 'challenge-detail') {
      setSelectedChallenge(null);
    }
  };

  // 챌린지 선택 핸들러
  const handleChallengePress = (challenge: GroupChallengeListItem) => {
    setSelectedChallenge(challenge);
    setActiveTab('challenge-detail');
  };

  // 테스크 인증 핸들러
  const handleCertifyTask = (taskId: number) => {
    if (!selectedChallenge) return;

    // Navigate to the certification page with the challenge and task IDs
    navigateToTaskCertification(selectedChallenge.id, taskId);
  };

  // 헤더 액션 버튼 설정
  const headerActions = [
    createChallengeAction(handleAddChallenge),
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

  // 콘텐츠 렌더링 함수
  const renderContent = () => {
    // 챌린지 상세 화면이 활성화된 경우
    if (activeTab === 'challenge-detail' && selectedChallenge) {
      return (
        <ChallengeDetailSection
          challengeId={selectedChallenge.id}
          challengeTitle={selectedChallenge.title}
          onCertifyTask={handleCertifyTask}
        />
      );
    }

    // 챌린지 탭이 활성화된 경우
    if (activeTab === 'challenge' && challengesData?.challenges) {
      return (
        <ChallengeSection
          title="모든 챌린지"
          challenges={challengesData.challenges}
          emptyMessage="챌린지가 없습니다."
          onChallengePress={handleChallengePress}
        />
      );
    }

    // 채팅 탭이 활성화된 경우
    if (activeTab === 'chat') {
      return (
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          paddingVertical="$10">
          <Text color="$gray9" textAlign="center">
            기능 준비 중입니다
          </Text>
        </YStack>
      );
    }

    // 기본 상태 (탭이 선택되지 않은 경우)
    return (
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

        {/* 검색이 활성화된 경우에만 모든 챌린지 섹션 표시 */}
        {showSearch && challengesData?.challenges && (
          <ChallengeSection
            title="모든 챌린지"
            challenges={challengesData.challenges}
            emptyMessage="챌린지가 없습니다."
          />
        )}
      </YStack>
    );
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="그룹 상세" onBack={handleBack} actions={headerActions} />

      {/* 탭 버튼 */}
      <TagRow paddingHorizontal="$4">
        {activeTab !== 'challenge-detail' ? (
          // 기본 태그 (챌린지 상세가 아닌 경우)
          <>
            <Tag
              label="채팅"
              active={activeTab === 'chat'}
              onPress={() => handleTabPress('chat')}
            />
            <Tag
              label="챌린지"
              active={activeTab === 'challenge'}
              onPress={() => handleTabPress('challenge')}
            />
          </>
        ) : (
          // 챌린지 상세 태그
          <>
            <Tag
              label="챌린지"
              active={true}
              onPress={() => handleTabPress('challenge')}
            />
            {selectedChallenge && (
              <Tag
                label={selectedChallenge.title}
                active={false}
                onPress={() => handleTabPress('challenge')}
              />
            )}
          </>
        )}
      </TagRow>

      <ScrollView flex={1} padding="$4">
        {renderContent()}
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
