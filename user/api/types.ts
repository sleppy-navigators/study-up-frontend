import { TaskCertificationDTO } from '../../base/api/types';

/**
 * User 관련 타입 정의
 */

// 유저 태스크 챌린지 상세 정보
export interface UserTaskChallengeDetail {
  challengeId: number;
  challengeTitle: string;
}

// 유저 태스크 그룹 상세 정보
export interface UserTaskGroupDetail {
  groupId: number;
  groupName: string;
}

// 유저 태스크 목록 아이템
export interface UserTaskListItem {
  id: number;
  title: string;
  deadline: string;
  certification?: TaskCertificationDTO;
  challengeDetail: UserTaskChallengeDetail;
  groupDetail: UserTaskGroupDetail;
}

// 유저 태스크 목록 응답
export interface UserTaskListResponse {
  tasks: UserTaskListItem[];
}

// 그룹 목록 아이템
export interface GroupListItem {
  id: number;
  name: string;
  thumbnailUrl?: string;
  lastSystemMessage?: string;
}

// 그룹 목록 응답
export interface GroupListResponse {
  groups: GroupListItem[];
}
