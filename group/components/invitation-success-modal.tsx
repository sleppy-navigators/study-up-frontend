import { useEffect } from 'react';
import { Button, Dialog, H2, Paragraph, YStack, Sheet } from 'tamagui';
import { CheckCircle } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';

import { Animated, Easing } from 'react-native';

interface InvitationSuccessModalProps {
  groupId: string;
  groupName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvitationSuccessModal({
  groupId,
  groupName,
  open,
  onOpenChange,
}: InvitationSuccessModalProps) {
  const navigation = useNavigation();

  const handleGoToGroup = () => {
    onOpenChange(false);
    // 그룹 페이지로 이동
    navigation.navigate('GroupDetail', { groupId });
  };

  const SuccessAnimation = () => {
    const scaleAnim = new Animated.Value(0);

    useEffect(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <CheckCircle size={64} color="$green10" />
      </Animated.View>
    );
  };

  const ModalContent = (
    <YStack space="$4" padding="$4" alignItems="center">
      <SuccessAnimation />

      <YStack space="$2" alignItems="center">
        <H2>그룹 참여 완료!</H2>
        <Paragraph textAlign="center">
          이제 '{groupName}' 그룹의 멤버입니다.
        </Paragraph>
      </YStack>

      <Button
        onPress={handleGoToGroup}
        theme="active"
        size="$4"
        accessibilityLabel="그룹으로 이동">
        그룹으로 이동
      </Button>
    </YStack>
  );

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[40]}
      dismissOnSnapToBottom>
      <Sheet.Frame>
        <Sheet.Handle />
        {ModalContent}
      </Sheet.Frame>
    </Sheet>
  );
}
