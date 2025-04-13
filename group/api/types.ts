import { TaskCertificationDTO } from '../../base/api/types';

/**
 * Group 관련 타입 정의
 */

// 그룹 생성 요청
export interface GroupCreationRequest {
  name: string;
  description: string;
  thumbnailUrl?: string;
}

// 그룹 응답
export interface GroupResponse {
  id: number;
  name: string;
  description: string;
  thumbnailUrl?: string;
}

// 그룹 초대 응답
export interface GroupInvitationResponse {
  id: number; // invitationId
  invitationKey: string;
  inviterId: number;
  groupId: number;
}

// 그룹 초대 수락 요청
export interface GroupInvitationAcceptRequest {
  invitationKey: string;
}

// 그룹 태스크 챌린지 상세 정보
export interface GroupTaskChallengeDetail {
  challengeId: number;
  challengeTitle: string;
}

// 그룹 태스크 목록 아이템
export interface GroupTaskListItem {
  id: number;
  title: string;
  deadline: string;
  certification?: TaskCertificationDTO;
  challenge: GroupTaskChallengeDetail;
}

// 그룹 태스크 목록 응답
export interface GroupTaskListResponse {
  tasks: GroupTaskListItem[];
}

// 그룹 챌린지 목록 아이템
export interface GroupChallengeListItem {
  id: number;
  title: string;
  deadline: string;
  description?: string;
  challengerId: number;
  challengerName: string;
  recentCertification?: TaskCertificationDTO;
}

// 그룹 챌린지 목록 응답
export interface GroupChallengeListResponse {
  challenges: GroupChallengeListItem[];
}

// 채팅 메시지 DTO
export interface ChatMessageDto {
  id: string;
  senderId: number;
  content: string;
  createdAt: string;
}

// 채팅 메시지 목록 응답
export interface ChatMessageListResponse {
  messages: ChatMessageDto[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}
