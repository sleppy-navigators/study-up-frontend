'use client';

import { YStack } from 'tamagui';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { CreateGroupForm } from '../components/create-group-form';
import { useCreateGroup } from '@/group/api';
import { Header } from '@/base/components/header';

export function CreateGroupPage() {
  const router = useRouter();
  const toast = useToastController();
  const { mutate: createGroup, isPending } = useCreateGroup();

  const handleBack = () => {
    router.back();
  };

  const handleCreateGroup = async (
    groupName: string,
    description: string = ''
  ) => {
    createGroup(
      {
        name: groupName,
        description: description,
      },
      {
        onSuccess: (data) => {
          console.log('그룹 생성 성공:', data);
          toast.show('그룹이 성공적으로 생성되었습니다', {
            type: 'success',
          });
          console.log('toast 표시');
          // 생성된 그룹 상세 페이지로 이동
          router.replace(`/group/detail/${data.id}`);
          console.log('그룹 생성 후 페이지 이동');
        },
        onError: (error) => {
          toast.show('그룹 생성에 실패했습니다', {
            type: 'error',
          });
          console.error('그룹 생성 실패:', error);
        },
      }
    );
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="그룹 생성" onBack={handleBack} />

      <YStack
        flex={1}
        padding="$4"
        space="$4"
        alignItems="center"
        justifyContent="center">
        <CreateGroupForm onSubmit={handleCreateGroup} isLoading={isPending} />
      </YStack>
    </YStack>
  );
}
