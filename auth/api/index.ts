import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
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
import { authActions } from '@/lib/auth/authStore';
import { signInWithGoogle } from '@/lib/firebase';
import { authStore, authAtom } from '@/lib/auth/authStore';

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
export function useSignInMutation(options?: { onSignIn: () => void }) {
  return useMutation<TokenResponse, Error, SignInParams>({
    mutationFn: async ({ provider }) => {
      if (provider === 'GOOGLE') {
        const idToken = await signInWithGoogle();
        return authApi.signIn(provider, idToken);
      }
      throw new Error('Invalid provider');
    },
    onSuccess: async (data) => {
      await authActions.setTokens(data);
      options?.onSignIn?.();
    },
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

/**
 * 인증 상태 쿼리 훅
 * 앱 시작 시 인증 상태를 초기화하고 가져오는 데 사용
 */
export function useAuthStateQuery() {
  return useSuspenseQuery({
    queryKey: ['auth', 'state'],
    queryFn: async () => {
      await authActions.loadTokens();
      const authState = authStore.get(authAtom);
      return {
        isAuthenticated: authState.isAuthenticated,
      };
    },
  });
}
