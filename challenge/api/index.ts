import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '../../lib/api/client';
import { SuccessResponse } from '../../base/api/types';
import {
  ChallengeCreationRequest,
  ChallengeResponse,
  TaskCertificationRequest,
  TaskListResponse,
  TaskResponse,
} from './types';

/**
 * Challenge Query Key Factory
 */
export const challengeKeys = {
  all: ['challenge'] as const,
  lists: () => [...challengeKeys.all, 'list'] as const,
  list: (id: number) => [...challengeKeys.lists(), id] as const,
  tasks: (challengeId: number) =>
    [...challengeKeys.list(challengeId), 'tasks'] as const,
  task: (challengeId: number, taskId: number) =>
    [...challengeKeys.tasks(challengeId), taskId] as const,
};

/**
 * Challenge API 함수
 */
export const challengeApi = {
  /**
   * 챌린지 생성
   * @param groupId 그룹 ID
   * @param data 챌린지 생성 요청 데이터
   * @returns 챌린지 응답
   */
  createChallenge: (groupId: number, data: ChallengeCreationRequest) =>
    client
      .post(`groups/${groupId}/challenges`, {
        json: data,
      })
      .json<SuccessResponse<ChallengeResponse>>()
      .then((res) => res.data),

  /**
   * 태스크 완료
   * @param challengeId 챌린지 ID
   * @param taskId 태스크 ID
   * @param data 태스크 인증 요청 데이터
   * @returns 태스크 응답
   */
  completeTask: (
    challengeId: number,
    taskId: number,
    data: TaskCertificationRequest
  ) =>
    client
      .post(`challenges/${challengeId}/tasks/${taskId}/certify`, {
        json: data,
      })
      .json<SuccessResponse<TaskResponse>>()
      .then((res) => res.data),

  /**
   * 챌린지 태스크 목록 조회
   * @param challengeId 챌린지 ID
   * @returns 태스크 목록 응답
   */
  getChallengeTasks: (challengeId: number) =>
    client
      .get(`challenges/${challengeId}/tasks`)
      .json<SuccessResponse<TaskListResponse>>()
      .then((res) => res.data),
};

/**
 * 챌린지 생성 훅
 */
export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation<
    ChallengeResponse,
    Error,
    { groupId: number; data: ChallengeCreationRequest }
  >({
    mutationFn: ({ groupId, data }) =>
      challengeApi.createChallenge(groupId, data),
    onSuccess: (_, { groupId }) => {
      // 그룹의 챌린지 목록을 갱신
      queryClient.invalidateQueries({
        queryKey: ['group', 'list', groupId, 'challenges'],
      });
    },
  });
}

/**
 * 태스크 완료 훅
 */
export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation<
    TaskResponse,
    Error,
    {
      challengeId: number;
      taskId: number;
      data: TaskCertificationRequest;
    }
  >({
    mutationFn: ({ challengeId, taskId, data }) =>
      challengeApi.completeTask(challengeId, taskId, data),
    onSuccess: (_, { challengeId }) => {
      // 챌린지의 태스크 목록을 갱신
      queryClient.invalidateQueries({
        queryKey: challengeKeys.tasks(challengeId),
      });
      // 유저의 태스크 목록을 갱신
      queryClient.invalidateQueries({
        queryKey: ['user', 'tasks'],
      });
    },
  });
}

/**
 * 챌린지 태스크 목록 조회 훅
 */
export function useChallengeTasksQuery(challengeId: number) {
  return useQuery({
    queryKey: challengeKeys.tasks(challengeId),
    queryFn: () => challengeApi.getChallengeTasks(challengeId),
  });
}
