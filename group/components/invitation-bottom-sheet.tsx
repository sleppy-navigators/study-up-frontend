import React, { useState } from 'react';
import {
  Button,
  H3,
  Paragraph,
  Sheet,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { Copy, Check } from '@tamagui/lucide-icons';
import * as Clipboard from 'expo-clipboard';
import { useInviteUser } from '@/group/api';

interface InvitationBottomSheetProps {
  groupId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvitationBottomSheet({
  groupId,
  open,
  onOpenChange,
}: InvitationBottomSheetProps) {
  const [copied, setCopied] = useState(false);
  const {
    mutate: inviteUser,
    data: invitationData,
    isPending,
    isError,
  } = useInviteUser();

  // 초대 링크 생성
  const handleCreateInvitation = () => {
    inviteUser(groupId);
  };

  // 초대 ID 복사
  const handleCopyInvitationId = async () => {
    if (invitationData?.invitationId) {
      await Clipboard.setStringAsync(invitationData.invitationId.toString());
      setCopied(true);

      // 3초 후 복사 상태 초기화
      const timer = window.setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => window.clearTimeout(timer);
    }
  };

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[40]}
      dismissOnSnapToBottom
      position={0}
      zIndex={100000}>
      <Sheet.Overlay enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Handle />
      <Sheet.Frame padding="$4" justifyContent="flex-start" gap="$4">
        <H3>그룹 초대하기</H3>

        <YStack gap="$4">
          <Paragraph theme="alt2">
            초대 ID를 공유하여 다른 사용자를 그룹에 초대할 수 있습니다.
          </Paragraph>

          {isPending ? (
            <YStack height="$10" justifyContent="center" alignItems="center">
              <Spinner size="large" color="$yellow9" />
            </YStack>
          ) : isError ? (
            <YStack gap="$2">
              <Text color="$red9">초대 ID를 생성하는데 실패했습니다.</Text>
              <Button onPress={handleCreateInvitation} themeInverse>
                다시 시도
              </Button>
            </YStack>
          ) : invitationData ? (
            <YStack gap="$2">
              <XStack
                backgroundColor="$gray2"
                padding="$3"
                borderRadius="$4"
                justifyContent="space-between"
                alignItems="center">
                <Text fontSize="$5" fontWeight="bold">
                  {invitationData.invitationId}
                </Text>
                <Button
                  size="$3"
                  circular
                  backgroundColor={copied ? '$green9' : '$yellow9'}
                  onPress={handleCopyInvitationId}>
                  {copied ? (
                    <Check size="$1.5" color="$color" />
                  ) : (
                    <Copy size="$1.5" color="$color" />
                  )}
                </Button>
              </XStack>
              <Text fontSize="$2" color="$gray9">
                {copied ? '복사되었습니다!' : '클릭하여 복사하세요'}
              </Text>
            </YStack>
          ) : (
            <Button
              onPress={handleCreateInvitation}
              backgroundColor="$yellow9"
              color="$color"
              size="$4"
              height="$6">
              초대 ID 생성하기
            </Button>
          )}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
