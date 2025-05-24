import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '../../../lib/api/client';
import { SuccessResponse } from '../../base/api/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  ChallengeCreationRequest,
  ChallengeResponse,
  TaskCertificationRequest,
  TaskListResponse,
  TaskResponse,
} from './types';
import { userKeys } from '@/domains/user/api';
import { groupKeys } from '@/domains/group/api';

/**
 * Challenge Query Key Factory
 */
export const challengeKeys = createQueryKeys('challenge', {
  list: null,
  detail: (id: number) => ({
    queryKey: [id],
    contextQueries: {
      tasks: null,
    },
  }),
});

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
      queryClient.invalidateQueries({
        queryKey: groupKeys.detail(groupId)._ctx.challenges.queryKey,
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
        queryKey: challengeKeys.detail(challengeId)._ctx.tasks.queryKey,
      });
      // 유저의 태스크 목록을 갱신
      queryClient.invalidateQueries({
        queryKey: userKeys.me._ctx.tasks.queryKey,
      });
    },
  });
}

/**
 * 챌린지 태스크 목록 조회 훅
 */
export function useChallengeTasksQuery(challengeId: number) {
  return useQuery({
    queryKey: challengeKeys.detail(challengeId)._ctx.tasks.queryKey,
    queryFn: () => challengeApi.getChallengeTasks(challengeId),
  });
}
