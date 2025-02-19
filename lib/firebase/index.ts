import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { webClientId } from './config';
import { initializeFirebase } from './init';

// Initialize Firebase based on platform
initializeFirebase();

// Configure Google Sign-In
if (Platform.OS !== 'web') {
  GoogleSignin.configure({
    scopes: ['email', 'profile'],
    webClientId,
    offlineAccess: true,
  });
}

// Native sign in implementation
const signInWithGoogleNative = async () => {
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signIn();
  const { idToken } = await GoogleSignin.getTokens();

  const credential = auth.GoogleAuthProvider.credential(idToken);

  const userCredential = await auth().signInWithCredential(credential);
  const firebaseIdToken = await userCredential.user.getIdToken(true);

  return firebaseIdToken;
};

// Web sign in implementation will be added in the next commit

export const signInWithGoogle = Platform.select({
  native: signInWithGoogleNative,
  default: signInWithGoogleNative, // Temporary, will be replaced with web implementation
});

export const signOutFromGoogle = async () => {
  if (Platform.OS !== 'web') {
    await GoogleSignin.signOut();
  }
  // Web sign out will be added in the next commit
};
