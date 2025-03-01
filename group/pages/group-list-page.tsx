import { ScrollView, YStack } from 'tamagui';
import { useState } from 'react';
import { BottomNavigation } from '@/base/components/bottom-navigation';
import { GroupSection } from '@/group/components/group-section';
import type { GroupItemProps } from '@/group/components/group-item';

export function GroupListPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'community' | 'profile'>(
    'community'
  );

  const groupItems: GroupItemProps[] = [
    {
      imageUrl:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-mDSRTOIWK41ercqi1SkeJmmGyhoATk.png',
      title: '김병찬, 박진명, 우이산',
      description: '김병찬(님)이 새로운 챌린지를 생성했어요.',
      timestamp: '방금전',
    },
    {
      imageUrl:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-mDSRTOIWK41ercqi1SkeJmmGyhoATk.png',
      title: '양석준, 김병찬, 김지환 외 2명',
      description: '김병찬(님)이 새로운 챌린지를 생성했어요.',
      timestamp: '2주전',
    },
    {
      imageUrl:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-mDSRTOIWK41ercqi1SkeJmmGyhoATk.png',
      title: '김병찬, 조선재, 한지호, 이지용',
      description: '김병찬(님)이 새로운 챌린지를 생성했어요.',
      timestamp: '오래전',
    },
  ];

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView flex={1}>
        <GroupSection items={groupItems} />
      </ScrollView>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </YStack>
  );
}
