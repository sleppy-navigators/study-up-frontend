import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signIn();
  const { idToken } = await GoogleSignin.getTokens();

  const credential = auth.GoogleAuthProvider.credential(idToken);

  const userCredential = await auth().signInWithCredential(credential);
  const firebaseIdToken = await userCredential.user.getIdToken(true);
  return firebaseIdToken;
};

export const signOutFromGoogle = async () => {
  await GoogleSignin.signOut();
};
