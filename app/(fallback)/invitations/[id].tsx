import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Button,
  H1,
  H2,
  Paragraph,
  Spinner,
  Text,
  YStack,
  XStack,
  Card,
} from 'tamagui';
import { Group, UserCheck, UserX } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { useInvitationQuery, useAcceptInvitation } from '@/group/api';
import { InvitationSuccessModal } from '@/group/components/invitation-success-modal';
import { Header } from '@/base/components/header';

export default function InvitationView() {
  const router = useRouter();
  const { id, invitationKey } = useLocalSearchParams<{
    id: string;
    invitationKey: string;
  }>();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const groupId = parseInt(id, 10);
  const invitationId = parseInt(id, 10);

  const {
    data: invitationData,
    isLoading,
    isError,
  } = useInvitationQuery(groupId, invitationId);

  const { mutate: acceptInvitation, isPending: isAccepting } =
    useAcceptInvitation();

  const handleAcceptInvitation = () => {
    if (!invitationKey) return;

    acceptInvitation(
      {
        groupId,
        invitationId,
        data: { invitationKey },
      },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
        },
      }
    );
  };

  const handleDeclineInvitation = () => {
    router.back();
  };

  const handleGoToGroup = () => {
    setShowSuccessModal(false);
    router.replace(`/group/detail/${groupId}`);
  };

  if (isLoading) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <Header title="그룹 초대" onBack={() => router.back()} />
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4">
          <Spinner size="large" color="$yellow9" />
          <Paragraph marginTop="$4">초대 정보를 불러오는 중...</Paragraph>
        </YStack>
      </YStack>
    );
  }

  if (isError || !invitationData) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <Header title="그룹 초대" onBack={() => router.back()} />
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
          space="$4">
          <Paragraph color="$red10">
            초대 정보를 불러오는데 실패했습니다.
          </Paragraph>
          <Button onPress={() => router.back()}>돌아가기</Button>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <Header title="그룹 초대" onBack={() => router.back()} />

      <YStack flex={1} padding="$4" space="$6">
        <YStack alignItems="center" space="$2">
          <H1>그룹 초대</H1>
          <Paragraph textAlign="center">
            '{invitationData.name}' 그룹에 초대되었습니다.
          </Paragraph>
        </YStack>

        <Card padding="$4" elevate bordered>
          <YStack space="$4" alignItems="center">
            <Group size={48} color="$blue10" />

            <YStack space="$2" alignItems="center">
              <H2>{invitationData.name}</H2>
              {invitationData.description && (
                <Paragraph textAlign="center">
                  {invitationData.description}
                </Paragraph>
              )}
            </YStack>

            {/* <XStack space="$2" alignItems="center">
              <Paragraph>멤버 {invitationData.memberCount}명</Paragraph>
            </XStack> */}
          </YStack>
        </Card>

        <YStack space="$4">
          <Button
            onPress={handleAcceptInvitation}
            icon={<UserCheck />}
            theme="active"
            disabled={isAccepting}
            accessibilityLabel="초대 수락">
            {isAccepting ? '처리 중...' : '초대 수락'}
          </Button>

          <Button
            onPress={handleDeclineInvitation}
            icon={<UserX />}
            variant="outlined"
            theme="red"
            accessibilityLabel="초대 거절">
            초대 거절
          </Button>
        </YStack>

        <InvitationSuccessModal
          open={showSuccessModal}
          onOpenChange={setShowSuccessModal}
          groupId={groupId.toString()}
          groupName={invitationData.name}
        />
      </YStack>
    </YStack>
  );
}
