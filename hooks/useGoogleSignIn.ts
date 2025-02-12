import { router } from 'expo-router';
import { client } from '../lib/api/client';
import { authActions } from '../lib/auth/store';
import { signInWithGoogle } from '../lib/firebase';

export const useGoogleSignIn = () => {
  const signIn = async () => {
    try {
      // Google 로그인 및 ID 토큰 획득
      const idToken = await signInWithGoogle();

      // 백엔드로 ID 토큰 전송
      const response = await client
        .post('auth/sign-in', {
          searchParams: {
            provider: 'GOOGLE',
          },
          json: {
            idToken,
          },
        })
        .json<{
          apiResult: string;
          data: {
            accessToken: string;
            refreshToken: string;
          };
        }>();

      if (response.apiResult === 'QUERY_OK') {
        // 토큰 저장 및 상태 업데이트
        await authActions.setTokens(response.data);

        // 채팅 화면으로 리다이렉트
        router.replace('/chat');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  return {
    signIn,
  };
};
