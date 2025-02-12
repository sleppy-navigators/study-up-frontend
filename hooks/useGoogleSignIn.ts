import { router } from 'expo-router';
import { client } from '../lib/api/client';
import { authActions } from '../lib/auth/store';
import { signInWithGoogle } from '../lib/firebase';

export const useGoogleSignIn = () => {
  const signIn = async () => {
    try {
      const idToken = await signInWithGoogle();

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
        await authActions.setTokens(response.data);
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
