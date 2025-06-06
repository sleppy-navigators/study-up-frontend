import { TaskCertificationDTO } from '../../base/api/types';

/**
 * Challenge 관련 타입 정의
 */

// 챌린지 생성 요청 - 태스크
export interface TaskRequest {
  title: string;
  deadline: string;
}

// 챌린지 생성 요청
export interface ChallengeCreationRequest {
  title: string;
  deadline: string;
  description?: string;
  tasks: TaskRequest[];
  deposit: number;
}

// 챌린지 응답
export interface ChallengeResponse {
  id: number;
  title: string;
  deadline: string;
  description?: string;
}

// 태스크 인증 요청
export interface TaskCertificationRequest {
  externalLinks: string[];
  imageUrls: string[];
}

// 태스크 응답
export interface TaskResponse {
  id: number;
  title: string;
  deadline: string;
  certification?: TaskCertificationDTO;
}

// 태스크 목록 아이템
export interface TaskListItem {
  id: number;
  title: string;
  deadline: string;
  certification?: TaskCertificationDTO;
}

// 태스크 목록 응답
export interface TaskListResponse {
  tasks: TaskListItem[];
}
