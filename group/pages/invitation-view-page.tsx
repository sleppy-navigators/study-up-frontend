import { useState, useEffect } from 'react';
import {
  H1,
  H2,
  Paragraph,
  YStack,
  XStack,
  Card,
  Button,
  Spinner,
} from 'tamagui';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Group, UserCheck, UserX } from '@tamagui/lucide-icons';
import { InvitationSuccessModal } from '../components/invitation-success-modal';

// 임시 타입 정의
interface InvitationDetails {
  groupId: string;
  groupName: string;
  groupDescription?: string;
  memberCount: number;
  inviterName: string;
}

export default function InvitationViewPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { inviteCode } = route.params as { inviteCode: string };

  const [invitation, setInvitation] = useState<InvitationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // 실제 구현에서는 API 호출로 초대 정보를 가져옵니다
    const fetchInvitationDetails = async () => {
      try {
        // 임시 데이터
        const mockInvitation: InvitationDetails = {
          groupId: 'group-123',
          groupName: '스터디 그룹',
          groupDescription: '함께 공부하는 그룹입니다.',
          memberCount: 12,
          inviterName: '김철수',
        };

        setInvitation(mockInvitation);
      } catch (error) {
        setError('초대 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvitationDetails();
  }, [inviteCode]);

  const handleAcceptInvitation = async () => {
    try {
      setLoading(true);
      // 실제 구현에서는 API 호출로 초대 수락 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSuccessModal(true);
    } catch (error) {
      setError('초대 수락에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineInvitation = () => {
    // 실제 구현에서는 API 호출로 초대 거절 처리
    navigation.goBack();
  };

  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Spinner size="large" />
        <Paragraph marginTop="$4">초대 정보를 불러오는 중...</Paragraph>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="$4"
        space="$4">
        <Paragraph color="$red10">{error}</Paragraph>
        <Button onPress={() => navigation.goBack()}>돌아가기</Button>
      </YStack>
    );
  }

  if (!invitation) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="$4"
        space="$4">
        <Paragraph>유효하지 않은 초대입니다.</Paragraph>
        <Button onPress={() => navigation.goBack()}>돌아가기</Button>
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding="$4" space="$6">
      <YStack alignItems="center" space="$2">
        <H1>그룹 초대</H1>
        <Paragraph textAlign="center">
          {invitation.inviterName}님이 '{invitation.groupName}' 그룹에
          초대했습니다.
        </Paragraph>
      </YStack>

      <Card padding="$4" elevate bordered>
        <YStack space="$4" alignItems="center">
          <Group size={48} color="$blue10" />

          <YStack space="$2" alignItems="center">
            <H2>{invitation.groupName}</H2>
            {invitation.groupDescription && (
              <Paragraph textAlign="center">
                {invitation.groupDescription}
              </Paragraph>
            )}
          </YStack>

          <XStack space="$2" alignItems="center">
            <Paragraph>멤버 {invitation.memberCount}명</Paragraph>
          </XStack>
        </YStack>
      </Card>

      <YStack space="$4">
        <Button
          onPress={handleAcceptInvitation}
          icon={<UserCheck />}
          theme="active"
          accessibilityLabel="초대 수락">
          초대 수락
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
        groupId={invitation.groupId}
        groupName={invitation.groupName}
      />
    </YStack>
  );
}
