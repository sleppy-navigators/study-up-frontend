import { useMutation } from '@tanstack/react-query';
import { client } from '../../lib/api/client';
import { SuccessResponse } from '../../base/api/types';
import {
  AuthProvider,
  RefreshRequest,
  RefreshTokenParams,
  SignInParams,
  SignInRequest,
  TokenResponse,
} from './types';

/**
 * Auth API 함수
 */
export const authApi = {
  /**
   * 로그인
   * @param provider 인증 제공자 (현재는 GOOGLE만 지원)
   * @param idToken 제공자로부터 받은 ID 토큰
   * @returns 토큰 응답
   */
  signIn: (provider: AuthProvider, idToken: string) =>
    client
      .post('auth/sign-in', {
        searchParams: { provider },
        json: { idToken } as SignInRequest,
      })
      .json<SuccessResponse<TokenResponse>>()
      .then((res) => res.data),

  /**
   * 토큰 갱신
   * @param accessToken 현재 액세스 토큰
   * @param refreshToken 리프레시 토큰
   * @returns 새로운 토큰 응답
   */
  refreshToken: (accessToken: string, refreshToken: string) =>
    client
      .post('auth/refresh', {
        json: { accessToken, refreshToken } as RefreshRequest,
      })
      .json<SuccessResponse<TokenResponse>>()
      .then((res) => res.data),
};

/**
 * 로그인 훅
 */
export function useSignInUser() {
  return useMutation<TokenResponse, Error, SignInParams>({
    mutationFn: ({ provider, idToken }) => authApi.signIn(provider, idToken),
  });
}

/**
 * 토큰 갱신 훅
 */
export function useRefreshToken() {
  return useMutation<TokenResponse, Error, RefreshTokenParams>({
    mutationFn: ({ accessToken, refreshToken }) =>
      authApi.refreshToken(accessToken, refreshToken),
  });
}
