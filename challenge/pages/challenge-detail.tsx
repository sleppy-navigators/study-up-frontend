import React, { useState } from 'react';
import { useChallengeTasksQuery } from '@/challenge/api';
import { TaskListItem } from '@/challenge/api/types';
import { H3, YStack, Paragraph, Spinner, Text, Button } from 'tamagui';
import { TagRow } from '@/app/components/TagRow';
import { Tag } from '@/app/components/Tag';
import { useRouter } from 'expo-router';
import { CheckCircle } from '@tamagui/lucide-icons';
import { Card } from 'tamagui';

interface ChallengeDetailPageProps {
  challengeId: number;
  challengeTitle?: string;
}

export default function ChallengeDetailPage({
  challengeId,
  challengeTitle = '챌린지',
}: ChallengeDetailPageProps) {
  const router = useRouter();
  const [activeTagId, setActiveTagId] = useState<'challenge' | 'title'>(
    'challenge'
  );

  // Fetch challenge tasks data
  const { data, isLoading, isError } = useChallengeTasksQuery(challengeId);

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
        <Text marginTop="$2">불러오는 중...</Text>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red10" fontSize="$5" fontWeight="bold">
          오류가 발생했습니다
        </Text>
        <Text marginTop="$2">데이터를 불러오는 중 문제가 발생했습니다.</Text>
        <Button marginTop="$4" onPress={() => router.back()} theme="red">
          돌아가기
        </Button>
      </YStack>
    );
  }

  // Categorize tasks into active and inactive
  const now = new Date();
  const tasks = data?.tasks || [];

  const activeTasks = tasks
    .filter((task) => new Date(task.deadline) >= now)
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

  const inactiveTasks = tasks
    .filter((task) => new Date(task.deadline) < now)
    .sort(
      (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    );

  // Handle tag press
  const handleTagPress = (tagId: 'challenge' | 'title') => {
    if (tagId === 'challenge') {
      // Return to default state or challenge list
      router.push('/');
    } else if (tagId === 'title') {
      // Navigate to challenge list
      router.back();
    }
    setActiveTagId(tagId);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // Today
    if (date.toDateString() === now.toDateString()) {
      return '오늘';
    }

    // Tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    }

    // Within a week
    const oneWeekLater = new Date(now);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    if (date < oneWeekLater) {
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      return `이번 주 ${days[date.getDay()]}요일`;
    }

    // Other cases
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // Handle certification button press
  const handleCertifyTask = (taskId: number) => {
    // For now, just log the event since we don't have a certification route yet
    console.log(`Certify task ${taskId} for challenge ${challengeId}`);
    // When the certification route is implemented, we'll use router.push
  };

  return (
    <YStack flex={1} padding="$4" space="$4">
      {/* Tags section */}
      <TagRow>
        <Tag
          label="챌린지"
          active={activeTagId === 'challenge'}
          onPress={() => handleTagPress('challenge')}
        />
        {challengeTitle && (
          <Tag
            label={challengeTitle}
            active={activeTagId === 'title'}
            onPress={() => handleTagPress('title')}
          />
        )}
      </TagRow>

      {/* Active tasks section */}
      <YStack space="$2">
        <H3>해야 할 테스크</H3>
        {activeTasks.length === 0 ? (
          <Paragraph theme="alt2" paddingVertical="$2">
            해야 할 테스크가 없습니다.
          </Paragraph>
        ) : (
          <YStack space="$2">
            {activeTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                formatDate={formatDate}
                onCertify={() => handleCertifyTask(task.id)}
              />
            ))}
          </YStack>
        )}
      </YStack>

      {/* Inactive tasks section */}
      <YStack space="$2">
        <H3>현재 수행할 수 없는 테스크</H3>
        {inactiveTasks.length === 0 ? (
          <Paragraph theme="alt2" paddingVertical="$2">
            현재 수행할 수 없는 테스크가 없습니다.
          </Paragraph>
        ) : (
          <YStack space="$2">
            {inactiveTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                formatDate={formatDate}
                isInactive
              />
            ))}
          </YStack>
        )}
      </YStack>
    </YStack>
  );
}

interface TaskCardProps {
  task: TaskListItem;
  formatDate: (dateString: string) => string;
  isInactive?: boolean;
  onCertify?: () => void;
}

function TaskCard({
  task,
  formatDate,
  isInactive = false,
  onCertify,
}: TaskCardProps) {
  const isCertified = !!task.certification;

  return (
    <Card padding="$3" bordered opacity={isInactive ? 0.7 : 1}>
      <YStack space="$2">
        <YStack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Text fontSize="$5" fontWeight="bold">
            {task.title}
          </Text>
          <Text fontSize="$3" color={isInactive ? '$gray9' : '$yellow9'}>
            {isInactive ? '마감됨' : `마감: ${formatDate(task.deadline)}`}
          </Text>
        </YStack>

        <YStack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          {isCertified ? (
            <YStack flexDirection="row" alignItems="center" space="$1">
              <CheckCircle size={16} color="$green9" />
              <Text fontSize="$3" color="$green9">
                인증 완료:{' '}
                {new Date(task.certification!.certificatedAt).toLocaleString(
                  'ko-KR',
                  {
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}
              </Text>
            </YStack>
          ) : (
            <Text fontSize="$3" color="$gray9">
              미인증
            </Text>
          )}

          {!isInactive && !isCertified && onCertify && (
            <Button size="$2" onPress={onCertify} theme="yellow">
              인증하기
            </Button>
          )}
        </YStack>
      </YStack>
    </Card>
  );
}
