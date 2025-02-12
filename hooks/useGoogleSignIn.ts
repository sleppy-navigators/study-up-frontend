import { router } from 'expo-router';
import { client } from '../lib/api/client';
import { authActions } from '../lib/auth/store';
import { signInWithGoogle } from '../lib/firebase';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

interface SignInResponse {
  apiResult: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const useGoogleSignInMutation = () => {
  const setTokens = useSetAtom(authActions.setTokens);

  return useMutation({
    mutationFn: async () => {
      const idToken = await signInWithGoogle();
      return client
        .post('auth/sign-in', {
          searchParams: {
            provider: 'GOOGLE',
          },
          json: {
            idToken,
          },
        })
        .json<SignInResponse>();
    },
    throwOnError: true,
    onSuccess: async ({ apiResult, data }) => {
      if (apiResult === 'QUERY_OK') {
        await setTokens(data);
        router.replace('/');
      }
    },
  });
};
