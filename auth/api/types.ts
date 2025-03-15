import { RefreshRequest, TokenResponse } from '../../base/api/types';

/**
 * Auth 관련 타입 정의
 */

// 로그인 요청 타입
export interface SignInRequest {
  idToken: string;
}

// 인증 제공자 타입
export type AuthProvider = 'GOOGLE';

// 로그인 파라미터 타입
export interface SignInParams {
  provider: AuthProvider;
  idToken: string;
}

// 토큰 갱신 파라미터 타입
export interface RefreshTokenParams {
  accessToken: string;
  refreshToken: string;
}

// 재내보내기
export { TokenResponse, RefreshRequest };
