import CreateChallengePage from '@/challenge/pages/create-challenge';
import { useLocalSearchParams } from 'expo-router';

export default function CreateChallengeRoute() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  // Ensure groupId is available
  if (!groupId) {
    throw new Error('Group ID is required for challenge creation');
  }

  return <CreateChallengePage />;
}
