import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '../../lib/api/client';
import { Pageable, SuccessResponse } from '../../base/api/types';
import {
  ChatMessageListResponse,
  GroupChallengeListResponse,
  GroupCreationRequest,
  GroupInvitationAcceptRequest,
  GroupInvitationResponse,
  GroupResponse,
  GroupTaskListResponse,
} from './types';

/**
 * Group Query Key Factory
 */
export const groupKeys = {
  all: ['group'] as const,
  lists: () => [...groupKeys.all, 'list'] as const,
  list: (id: number) => [...groupKeys.lists(), id] as const,
  challenges: (id: number) => [...groupKeys.list(id), 'challenges'] as const,
  challenge: (groupId: number, challengeId: number) =>
    [...groupKeys.challenges(groupId), challengeId] as const,
  tasks: (groupId: number, challengeId: number) =>
    [...groupKeys.challenge(groupId, challengeId), 'tasks'] as const,
  messages: (id: number) => [...groupKeys.list(id), 'messages'] as const,
  invitations: (id: number) => [...groupKeys.list(id), 'invitations'] as const,
  invitation: (groupId: number, invitationId: number) =>
    [...groupKeys.invitations(groupId), invitationId] as const,
};

/**
 * Group API 함수
 */
export const groupApi = {
  /**
   * 그룹 생성
   * @param data 그룹 생성 요청 데이터
   * @returns 그룹 응답
   */
  createGroup: (data: GroupCreationRequest) =>
    client
      .post('groups', {
        json: data,
      })
      .json<SuccessResponse<GroupResponse>>()
      .then((res) => res.data),

  /**
   * 그룹 탈퇴
   * @param groupId 그룹 ID
   * @returns void
   */
  leaveGroup: (groupId: number) =>
    client
      .post(`groups/${groupId}/leave`)
      .json<SuccessResponse<void>>()
      .then((res) => res.data),

  /**
   * 그룹 초대
   * @param groupId 그룹 ID
   * @returns 그룹 초대 응답
   */
  inviteUser: (groupId: number) =>
    client
      .post(`groups/${groupId}/invitations`)
      .json<SuccessResponse<GroupInvitationResponse>>()
      .then((res) => res.data),

  /**
   * 그룹 초대 수락
   * @param groupId 그룹 ID
   * @param invitationId 초대 ID
   * @param data 초대 수락 요청 데이터
   * @returns 그룹 응답
   */
  acceptInvitation: (
    groupId: number,
    invitationId: number,
    data: GroupInvitationAcceptRequest
  ) =>
    client
      .post(`groups/${groupId}/invitations/${invitationId}/accept`, {
        json: data,
      })
      .json<SuccessResponse<GroupResponse>>()
      .then((res) => res.data),

  /**
   * 그룹 챌린지 목록 조회
   * @param groupId 그룹 ID
   * @returns 그룹 챌린지 목록 응답
   */
  getGroupChallenges: (groupId: number) =>
    client
      .get(`groups/${groupId}/challenges`)
      .json<SuccessResponse<GroupChallengeListResponse>>()
      .then((res) => res.data),

  /**
   * 그룹 태스크 목록 조회
   * @param groupId 그룹 ID
   * @returns 그룹 태스크 목록 응답
   */
  getGroupTasks: (groupId: number) =>
    client
      .get(`groups/${groupId}/tasks`)
      .json<SuccessResponse<GroupTaskListResponse>>()
      .then((res) => res.data),

  /**
   * 그룹 메시지 목록 조회
   * @param groupId 그룹 ID
   * @param pageable 페이지네이션 파라미터
   * @returns 채팅 메시지 목록 응답
   */
  getGroupMessages: (groupId: number, pageable: Pageable) => {
    // 쿼리 파라미터를 URL에 직접 추가
    const queryParams = `page=${pageable.page}&size=${pageable.size}${
      pageable.sort ? `&sort=${pageable.sort.join(',')}` : ''
    }`;

    return client
      .get(`groups/${groupId}/messages?${queryParams}`)
      .json<SuccessResponse<ChatMessageListResponse>>()
      .then((res) => res.data);
  },

  /**
   * 그룹 초대 조회
   * @param groupId 그룹 ID
   * @param invitationId 초대 ID
   * @returns 그룹 응답
   */
  getInvitation: (groupId: number, invitationId: number) =>
    client
      .get(`groups/${groupId}/invitations/${invitationId}`)
      .json<SuccessResponse<GroupResponse>>()
      .then((res) => res.data),
};

/**
 * 그룹 생성 훅
 */
export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation<GroupResponse, Error, GroupCreationRequest>({
    mutationFn: (data) => groupApi.createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
    },
  });
}

/**
 * 그룹 탈퇴 훅
 */
export function useLeaveGroup() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (groupId) => groupApi.leaveGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
    },
  });
}

/**
 * 그룹 초대 훅
 */
export function useInviteUser() {
  return useMutation<GroupInvitationResponse, Error, number>({
    mutationFn: (groupId) => groupApi.inviteUser(groupId),
  });
}

/**
 * 그룹 초대 수락 훅
 */
export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation<
    GroupResponse,
    Error,
    {
      groupId: number;
      invitationId: number;
      data: GroupInvitationAcceptRequest;
    }
  >({
    mutationFn: ({ groupId, invitationId, data }) =>
      groupApi.acceptInvitation(groupId, invitationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
    },
  });
}

/**
 * 그룹 챌린지 목록 조회 훅
 */
export function useGroupChallengesQuery(groupId: number) {
  return useQuery({
    queryKey: groupKeys.challenges(groupId),
    queryFn: () => groupApi.getGroupChallenges(groupId),
  });
}

/**
 * 그룹 태스크 목록 조회 훅
 */
export function useGroupTasksQuery(groupId: number) {
  return useQuery({
    queryKey: groupKeys.list(groupId),
    queryFn: () => groupApi.getGroupTasks(groupId),
  });
}

/**
 * 그룹 메시지 목록 조회 훅
 */
export function useGroupMessagesQuery(groupId: number, pageable: Pageable) {
  return useQuery({
    queryKey: [...groupKeys.messages(groupId), pageable],
    queryFn: () => groupApi.getGroupMessages(groupId, pageable),
  });
}

/**
 * 그룹 초대 조회 훅
 */
export function useInvitationQuery(groupId: number, invitationId: number) {
  return useQuery({
    queryKey: groupKeys.invitation(groupId, invitationId),
    queryFn: () => groupApi.getInvitation(groupId, invitationId),
  });
}
