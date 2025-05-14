'use client';

import { useState } from 'react';
import { Button, H2, Input, Paragraph, XStack, YStack, Sheet } from 'tamagui';
import { useToastController } from '@tamagui/toast';
import { Copy, X, Share } from '@tamagui/lucide-icons';

import * as Clipboard from 'expo-clipboard';

interface InvitationLinkModalProps {
  groupId: string;
  groupName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvitationLinkModal({
  groupId,
  groupName,
  open,
  onOpenChange,
}: InvitationLinkModalProps) {
  const [invitationLink, setInvitationLink] = useState('');

  const toast = useToastController();

  // 실제 구현에서는 이 부분이 API 호출로 대체될 것입니다
  const generateInvitationLink = () => {
    const baseUrl = 'https://yourapp.com/invite';
    const uniqueCode = `${groupId}-${Date.now()}`;
    return `${baseUrl}/${uniqueCode}`;
  };

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(invitationLink);
      toast.show('초대 링크가 클립보드에 복사되었습니다', {
        type: 'success',
      });
    } catch (error) {
      toast.show('링크 복사에 실패했습니다', {
        type: 'error',
      });
    }
  };

  // 모달이 열릴 때 초대 링크 생성
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !invitationLink) {
      setInvitationLink(generateInvitationLink());
    }
    onOpenChange(isOpen);
  };

  const ModalContent = (
    <YStack space="$4" padding="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <H2>그룹 초대 링크</H2>
        <Button
          icon={<X />}
          onPress={() => onOpenChange(false)}
          size="$3"
          circular
          chromeless
          accessibilityLabel="닫기"
        />
      </XStack>

      <Paragraph>
        아래 링크를 복사하여 초대하고 싶은 사람에게 공유하세요.
      </Paragraph>

      <XStack space="$2">
        <Input
          flex={1}
          value={invitationLink}
          readOnly
          selectTextOnFocus
          borderColor="$borderColor"
        />
        <Button
          icon={<Copy />}
          onPress={handleCopyLink}
          accessibilityLabel="링크 복사">
          복사
        </Button>
      </XStack>

      <Button
        icon={<Share />}
        onPress={() => {
          // 공유 기능 구현 (네이티브 공유 API 활용)
        }}
        variant="outlined"
        accessibilityLabel="공유하기">
        공유하기
      </Button>
    </YStack>
  );

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpenChange}
      snapPoints={[50]}
      dismissOnSnapToBottom>
      <Sheet.Frame>
        <Sheet.Handle />
        {ModalContent}
      </Sheet.Frame>
    </Sheet>
  );
}
