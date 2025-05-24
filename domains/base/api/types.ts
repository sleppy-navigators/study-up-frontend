/**
 * 공통 API 응답 타입 정의
 */

// 기본 성공 응답 타입
export interface SuccessResponse<T> {
  message: string;
  data: T;
}

// 에러 응답 타입
export interface ErrorResponse {
  code: string;
  message: string;
  requestUrl: string;
  timestamp: string;
}

// 페이지네이션 관련 타입
export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

// 인증 관련 공통 타입
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  accessToken: string;
  refreshToken: string;
}

// 인증 관련 공통 타입
export interface TaskCertificationDTO {
  externalLinks: string[];
  imageUrls: string[];
  certificatedAt: string;
}

// 미디어 관련 공통 타입
export interface UploadUrlResponse {
  url: string;
}
