import React from 'react';
import { H3, Paragraph, YStack, XStack, Text, Card, Image } from 'tamagui';
import { GroupTaskListItem } from '@/domains/group/api/types';

interface TaskSectionProps {
  title: string;
  description?: string;
  tasks: GroupTaskListItem[];
  emptyMessage?: string;
}

export function TaskSection({
  title,
  description,
  tasks,
  emptyMessage = '태스크가 없습니다.',
}: TaskSectionProps) {
  const handleTaskPress = (task: GroupTaskListItem) => {
    // 챌린지 상세 페이지로 이동 (현재는 구현되지 않음)
    console.log(
      `챌린지 상세 페이지로 이동: ${task.challengeDetail.challengeId}`
    );
    // TODO: 챌린지 상세 페이지 구현 후 라우팅 추가
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // 오늘인 경우
    if (date.toDateString() === now.toDateString()) {
      return '오늘';
    }

    // 내일인 경우
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    }

    // 일주일 이내인 경우
    const oneWeekLater = new Date(now);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    if (date < oneWeekLater) {
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      return `이번 주 ${days[date.getDay()]}요일`;
    }

    // 그 외의 경우
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <YStack space="$2">
      <YStack>
        <H3>{title}</H3>
        {description && <Paragraph theme="alt2">{description}</Paragraph>}
      </YStack>

      {tasks.length === 0 ? (
        <YStack padding="$4" alignItems="center" justifyContent="center">
          <Paragraph theme="alt2">{emptyMessage}</Paragraph>
        </YStack>
      ) : (
        <YStack space="$2">
          {tasks.map((task) => (
            <Card
              key={task.id}
              padding="$3"
              bordered
              pressStyle={{ opacity: 0.8 }}
              onPress={() => handleTaskPress(task)}>
              <YStack space="$2">
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="$5" fontWeight="bold">
                    {task.title}
                  </Text>
                  <Text
                    fontSize="$3"
                    color={
                      new Date(task.deadline) < new Date()
                        ? '$red9'
                        : '$yellow9'
                    }>
                    {formatDate(task.deadline)}
                  </Text>
                </XStack>

                <Text fontSize="$3" color="$gray9">
                  {task.challengeDetail.challengeTitle}
                </Text>

                {task.certification && (
                  <XStack space="$2" marginTop="$1">
                    {task.certification.imageUrls.length > 0 && (
                      <Image
                        source={{ uri: task.certification.imageUrls[0] }}
                        width={60}
                        height={60}
                        borderRadius="$2"
                      />
                    )}
                    <YStack flex={1} justifyContent="center">
                      <Text fontSize="$2" color="$gray9">
                        {new Date(
                          task.certification.certificatedAt
                        ).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        에 인증됨
                      </Text>
                    </YStack>
                  </XStack>
                )}
              </YStack>
            </Card>
          ))}
        </YStack>
      )}
    </YStack>
  );
}
