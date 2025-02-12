import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '425832297557-7serit12s908077334e928rclpdu6uqm.apps.googleusercontent.com',
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signIn();
  const { idToken } = await GoogleSignin.getTokens();
  return idToken;
};

export const signOutFromGoogle = async () => {
  await GoogleSignin.signOut();
};
