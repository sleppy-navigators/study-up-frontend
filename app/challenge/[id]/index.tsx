import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'tamagui';
import ChallengeDetailPage from '@/challenge/pages/challenge-detail';

export default function ChallengeDetailRoute() {
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();

  // Ensure challenge ID is available
  if (!id) {
    return (
      <View padding="$4" flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$5" fontWeight="bold" color="$red10">
          오류
        </Text>
        <Text marginTop="$2">챌린지 ID가 필요합니다.</Text>
      </View>
    );
  }

  return (
    <ChallengeDetailPage
      challengeId={parseInt(id, 10)}
      challengeTitle={title}
    />
  );
}
