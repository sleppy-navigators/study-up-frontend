import { Button } from 'tamagui';
import { UserPlus } from '@tamagui/lucide-icons';
import { useAtom } from 'jotai';
import {
  isInvitationModalOpenAtom,
  invitationGroupIdAtom,
} from '@/group/atoms/invitation-atoms';

interface InviteUserButtonProps {
  groupId: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export function InviteUserButton({
  groupId,
  variant = 'primary',
  size = 'medium',
}: InviteUserButtonProps) {
  const [, setIsOpen] = useAtom(isInvitationModalOpenAtom);
  const [, setGroupId] = useAtom(invitationGroupIdAtom);

  const handlePress = () => {
    // 모달 열기 및 그룹 ID 설정
    setGroupId(groupId);
    setIsOpen(true);
  };

  return (
    <Button
      icon={<UserPlus size={size === 'small' ? 16 : 20} />}
      onPress={handlePress}
      variant={variant}
      size={size}
      accessibilityLabel="유저 초대하기">
      유저 초대하기
    </Button>
  );
}
