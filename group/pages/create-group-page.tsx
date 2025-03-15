'use client';

import { useState } from 'react';
import { YStack, XStack, Button, Paragraph } from 'tamagui';
import { useToastController } from '@tamagui/toast';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { CreateGroupForm } from '../components/create-group-form';

export function CreateGroupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastController();

  const handleCreateGroup = async (groupName: string) => {
    setIsLoading(true);

    try {
      // 여기에 실제 그룹 생성 API 호출 로직이 들어갑니다
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 지연

      // 성공 메시지 표시
      toast.show('그룹이 성공적으로 생성되었습니다', {
        type: 'success',
      });

      // 성공 후 처리 (예: 그룹 목록 페이지로 이동)
      console.log('그룹 생성 성공:', groupName);
    } catch (error) {
      // 에러 메시지 표시
      toast.show('그룹 생성에 실패했습니다', {
        type: 'error',
      });
      console.error('그룹 생성 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack f={1} backgroundColor="$background" padding="$0">
      <YStack f={1} padding="$4" space="$4">
        <YStack
          space="$8"
          alignItems="center"
          justifyContent="center"
          f={1}
          maxWidth={440}
          mx="auto"
          width="100%">
          <CreateGroupForm onSubmit={handleCreateGroup} isLoading={isLoading} />
        </YStack>
      </YStack>
    </YStack>
  );
}
