import { useLocalSearchParams } from 'expo-router';
import { CertificationPage } from '../../../../certification/pages/certification-page';

export default function CertificationScreen() {
  const { challengeId, taskId } = useLocalSearchParams<{
    challengeId: string;
    taskId: string;
  }>();

  if (!challengeId || !taskId) {
    throw new Error('Challenge ID and Task ID are required');
  }

  return <CertificationPage challengeId={challengeId} taskId={taskId} />;
}
