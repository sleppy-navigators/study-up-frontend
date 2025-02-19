import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { webClientId } from './config';
import { initializeFirebase } from './init';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as webSignOut,
} from 'firebase/auth';

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
  return userCredential.user.getIdToken(true);
};

// Web sign in implementation
const signInWithGoogleWeb = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');

  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user.getIdToken(true);
};

export const signInWithGoogle = Platform.select({
  web: signInWithGoogleWeb,
  default: signInWithGoogleNative,
});

export const signOutFromGoogle = async () => {
  if (Platform.OS === 'web') {
    const auth = getAuth();
    await webSignOut(auth);
  } else {
    await GoogleSignin.signOut();
  }
};
