import { useState, useEffect } from 'react';
import {
  H1,
  Paragraph,
  YStack,
  XStack,
  Separator,
  Card,
  ScrollView,
} from 'tamagui';
import { useRoute } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { InviteUserButton } from '../components/invite-user-button';
import { InvitationLinkModal } from '../components/invitation-link-modal';
import {
  isInvitationModalOpenAtom,
  invitationGroupIdAtom,
} from '../atoms/invitation-atoms';

// 임시 타입 정의
interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  description?: string;
  members: GroupMember[];
}

export default function GroupDetailPage() {
  const route = useRoute();
  const { groupId } = route.params as { groupId: string };
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  // Jotai 아톰 직접 사용
  const [isOpen, setIsOpen] = useAtom(isInvitationModalOpenAtom);
  const [, setInvitationGroupId] = useAtom(invitationGroupIdAtom);

  useEffect(() => {
    // 실제 구현에서는 API 호출로 그룹 정보를 가져옵니다
    const fetchGroupDetails = async () => {
      try {
        // 임시 데이터
        const mockGroup: Group = {
          id: groupId,
          name: '스터디 그룹',
          description: '함께 공부하는 그룹입니다.',
          members: [
            { id: '1', name: '김철수' },
            { id: '2', name: '이영희' },
            { id: '3', name: '박지민' },
          ],
        };

        setGroup(mockGroup);
      } catch (error) {
        console.error('그룹 정보를 불러오는데 실패했습니다', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  // 모달 닫기 핸들러
  const closeInvitationModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Paragraph>로딩 중...</Paragraph>
      </YStack>
    );
  }

  if (!group) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Paragraph>그룹을 찾을 수 없습니다.</Paragraph>
      </YStack>
    );
  }

  return (
    <ScrollView>
      <YStack padding="$4" space="$4">
        <YStack space="$2">
          <H1>{group.name}</H1>
          {group.description && <Paragraph>{group.description}</Paragraph>}
        </YStack>

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph size="$5" fontWeight="bold">
            멤버 ({group.members.length})
          </Paragraph>
          <InviteUserButton groupId={group.id} />
        </XStack>

        <Separator />

        <YStack space="$2">
          {group.members.map((member) => (
            <Card key={member.id} padding="$3">
              <Paragraph>{member.name}</Paragraph>
            </Card>
          ))}
        </YStack>
      </YStack>

      {isOpen && (
        <InvitationLinkModal
          groupId={group.id}
          groupName={group.name}
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) closeInvitationModal();
          }}
        />
      )}
    </ScrollView>
  );
}
