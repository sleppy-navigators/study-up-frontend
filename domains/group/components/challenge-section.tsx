import React from 'react';
import { H3, Paragraph, YStack, XStack, Text, Card, Avatar } from 'tamagui';
import { GroupChallengeListItem } from '@/domains/group/api/types';

interface ChallengeSectionProps {
  title: string;
  description?: string;
  challenges: GroupChallengeListItem[];
  emptyMessage?: string;
  onChallengePress?: (challenge: GroupChallengeListItem) => void;
}

export function ChallengeSection({
  title,
  description,
  challenges,
  emptyMessage = '챌린지가 없습니다.',
  onChallengePress,
}: ChallengeSectionProps) {
  const handleChallengePress = (challenge: GroupChallengeListItem) => {
    if (onChallengePress) {
      onChallengePress(challenge);
    } else {
      // 콜백이 제공되지 않은 경우 기본 동작
      console.log(`챌린지 상세 페이지로 이동: ${challenge.id}`);
      // TODO: 챌린지 상세 페이지 구현 후 라우팅 추가
    }
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

  // 마감일 지난 챌린지와 아직 진행 중인 챌린지 분리
  const now = new Date();
  const activeChallenge = challenges.filter(
    (challenge) => new Date(challenge.deadline) >= now
  );
  const expiredChallenge = challenges.filter(
    (challenge) => new Date(challenge.deadline) < now
  );

  return (
    <YStack space="$2">
      <YStack>
        <H3>{title}</H3>
        {description && <Paragraph theme="alt2">{description}</Paragraph>}
      </YStack>

      {challenges.length === 0 ? (
        <YStack padding="$4" alignItems="center" justifyContent="center">
          <Paragraph theme="alt2">{emptyMessage}</Paragraph>
        </YStack>
      ) : (
        <YStack space="$4">
          {activeChallenge.length > 0 && (
            <YStack space="$2">
              <Text fontWeight="bold" color="$gray11">
                진행 중인 챌린지
              </Text>
              {activeChallenge.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onPress={() => handleChallengePress(challenge)}
                  formatDate={formatDate}
                />
              ))}
            </YStack>
          )}

          {expiredChallenge.length > 0 && (
            <YStack space="$2">
              <Text fontWeight="bold" color="$gray11">
                종료된 챌린지
              </Text>
              {expiredChallenge.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onPress={() => handleChallengePress(challenge)}
                  formatDate={formatDate}
                  isExpired
                />
              ))}
            </YStack>
          )}
        </YStack>
      )}
    </YStack>
  );
}

interface ChallengeCardProps {
  challenge: GroupChallengeListItem;
  onPress: () => void;
  formatDate: (dateString: string) => string;
  isExpired?: boolean;
}

function ChallengeCard({
  challenge,
  onPress,
  formatDate,
  isExpired = false,
}: ChallengeCardProps) {
  return (
    <Card
      padding="$3"
      bordered
      pressStyle={{ opacity: 0.8 }}
      onPress={onPress}
      opacity={isExpired ? 0.7 : 1}>
      <YStack space="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$5" fontWeight="bold">
            {challenge.title}
          </Text>
          <Text fontSize="$3" color={isExpired ? '$gray9' : '$yellow9'}>
            {isExpired ? '마감됨' : `마감: ${formatDate(challenge.deadline)}`}
          </Text>
        </XStack>

        {challenge.description && (
          <Text fontSize="$3" color="$gray9" numberOfLines={2}>
            {challenge.description}
          </Text>
        )}

        <XStack space="$2" alignItems="center">
          <Text fontSize="$2" color="$gray9">
            챌린저: {challenge.challengerDetail.challengerName}
          </Text>

          <Text
            fontSize="$2"
            color={challenge.isCompleted ? '$green10' : '$red10'}>
            {challenge.isCompleted ? '완료됨' : '진행 중'}
          </Text>
        </XStack>

        {challenge.recentCertification && (
          <XStack space="$2" marginTop="$1" alignItems="center">
            {challenge.recentCertification.imageUrls.length > 0 && (
              <Avatar circular size="$3">
                <Avatar.Image
                  source={{ uri: challenge.recentCertification.imageUrls[0] }}
                />
                <Avatar.Fallback backgroundColor="$gray5" />
              </Avatar>
            )}
            <Text fontSize="$2" color="$gray9">
              최근 인증:{' '}
              {new Date(
                challenge.recentCertification.certificatedAt
              ).toLocaleString('ko-KR', {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </XStack>
        )}
      </YStack>
    </Card>
  );
}
