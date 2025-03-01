import { ScrollView, YStack } from 'tamagui';
import { useState } from 'react';
import { BountyHeader } from '@/bounty/components/bounty-header';
import { TaskSection } from '@/bounty/components/task-section';
import type { TaskItemProps } from '@/bounty/components/task-item';
import { ListSection } from '@/base/components/list-section';
import type { ListItemProps } from '@/base/components/list-item';
import { BottomNavigation } from '@/base/components/bottom-navigation';

export function BountyPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'community' | 'profile'>(
    'home'
  );

  const bountyItems: ListItemProps[] = [
    {
      imageUrl:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-zQRGS3q3iYCqcdrDEw4Pg9oqGrJCse.png',
      title: '김병찬, 박진명, 우이산',
      description: '김병찬(님)이 새로운 질문지를 생성했어요.',
      actionButton: {
        label: '수령하기',
        onPress: () => console.log('Claimed 김병찬 bounty'),
      },
    },
    {
      imageUrl:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-zQRGS3q3iYCqcdrDEw4Pg9oqGrJCse.png',
      title: '김병찬, 박진명, 우이산',
      description: '김병찬(님)이 새로운 질문지를 생성했어요.',
      actionButton: {
        label: '수령하기',
        onPress: () => console.log('Claimed 김병찬 bounty'),
      },
    },
    {
      imageUrl:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-zQRGS3q3iYCqcdrDEw4Pg9oqGrJCse.png',
      title: '정감초 고수님과 클라우드웰씬서스3',
      description: '직교 플레이킹! Steppy Navigators',
      actionButton: {
        label: '수령하기',
        onPress: () => console.log('Claimed 정감초 bounty'),
      },
    },
    {
      imageUrl:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-zQRGS3q3iYCqcdrDEw4Pg9oqGrJCse.png',
      title: '구글 원서 접수하기',
      description: '해외취업 화이팅! 화',
      actionButton: {
        label: '수령하기',
        onPress: () => console.log('Claimed 구글 bounty'),
      },
    },
  ];

  const tasks: TaskItemProps[] = [
    {
      title: '프로그래머스 15245 문제 풀기',
      description: '코딩테스트 준비 · Steppy Navigators',
      onVerify: () => console.log('Verify 프로그래머스 task'),
    },
    {
      title: '알고리즘 스터디 그룹 이번주 참여하기',
      description: '코딩테스트 준비 · Steppy Navigators',
      onVerify: () => console.log('Verify 알고리즘 task'),
    },
  ];

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView flex={1}>
        <BountyHeader />

        <ListSection items={bountyItems} />

        <TaskSection title="현재 수행중인 태스크" items={tasks} />

        <TaskSection title="현재 수행중인 태스크" items={tasks} />
      </ScrollView>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </YStack>
  );
}
