import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'tamagui';

export default function InvitationView() {
  const { id, invitationKey } = useLocalSearchParams<{
    id: string;
    invitationKey: string;
  }>();

  return (
    <View>
      <Text>Invitation View</Text>
    </View>
  );
}
