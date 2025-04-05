import { router } from 'expo-router';

/**
 * Navigate to the task certification page
 * @param challengeId Challenge ID
 * @param taskId Task ID
 */
export function navigateToTaskCertification(
  challengeId: number | string,
  taskId: number | string
): void {
  // Navigate to certification page with route params using type assertion
  router.push(
    `/certification?challengeId=${challengeId}&taskId=${taskId}` as any
  );
}
