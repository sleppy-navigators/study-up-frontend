import { useQuery } from '@tanstack/react-query';
import { client } from '../../lib/api/client';
import { SuccessResponse } from '../../base/api/types';
import { GroupListResponse, UserTaskListResponse } from './types';

/**
 * User Query Key Factory
 */
export const userKeys = {
  all: ['user'] as const,
  tasks: () => [...userKeys.all, 'tasks'] as const,
  groups: () => [...userKeys.all, 'groups'] as const,
};

/**
 * User API 함수
 */
export const userApi = {
  /**
   * 유저의 태스크 목록 조회
   * @returns 유저 태스크 목록 응답
   */
  getUserTasks: () =>
    client
      .get('users/me/tasks')
      .json<SuccessResponse<UserTaskListResponse>>()
      .then((res) => res.data),

  /**
   * 유저의 그룹 목록 조회
   * @returns 그룹 목록 응답
   */
  getUserGroups: () =>
    client
      .get('users/me/groups')
      .json<SuccessResponse<GroupListResponse>>()
      .then((res) => res.data),
};

/**
 * 유저 태스크 목록 조회 훅
 */
export function useUserTasksQuery() {
  return useQuery({
    queryKey: userKeys.tasks(),
    queryFn: () => userApi.getUserTasks(),
  });
}

/**
 * 유저 그룹 목록 조회 훅
 */
export function useUserGroupsQuery() {
  return useQuery({
    queryKey: userKeys.groups(),
    queryFn: () => userApi.getUserGroups(),
  });
}
