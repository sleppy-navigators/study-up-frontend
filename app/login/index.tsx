import React, { useEffect, useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { initializeApp as initializeAppWeb } from 'firebase/app';
import {
  getAuth as getAuthWeb,
  GoogleAuthProvider as GoogleAuthProviderWeb,
  signInWithPopup as signInWithPopupWeb,
} from 'firebase/auth';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '425832297557-7serit12s908077334e928rclpdu6uqm.apps.googleusercontent.com',
  offlineAccess: true,
});

function WebFirebaseProvider({ children }: { children: React.ReactNode }) {
  const firebaseConfig = {
    apiKey: 'AIzaSyATra033rQ0xvcrMyWLV9qDPMYNih9blqo',
    authDomain: 'study-up-448918.firebaseapp.com',
    projectId: 'study-up-448918',
    storageBucket: 'study-up-448918.firebasestorage.app',
    messagingSenderId: '425832297557',
    appId: '1:425832297557:web:9eba1d8a0b960cd58f50dc',
    measurementId: 'G-GREBL6N579',
  };

  const [app, setApp] = useState<ReturnType<typeof initializeAppWeb> | null>(
    null
  );

  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const app = initializeAppWeb(firebaseConfig);
      setApp(app);
    }
  }, [firebaseConfig]);

  const signInWithGoogle = async () => {
    try {
      const auth = getAuthWeb(app);
      const provider = new GoogleAuthProviderWeb();

      const result = await signInWithPopupWeb(auth, provider);

      // Get ID token
      const idToken = await result.user.getIdToken();
      console.log('ID Token:', idToken);
      setIdToken(idToken);

      // The signed-in user info
      const user = result.user;

      // Get Google Access Token
      const credential = GoogleAuthProviderWeb.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      return {
        idToken,
        user,
        accessToken,
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {idToken && <Text>{idToken}</Text>}
      {Platform.OS === 'web' && (
        <button onClick={signInWithGoogle}>Sign in with Google(web)</button>
      )}
      {children}
    </View>
  );
}

const GoogleSignInComponent = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      console.log(data);
    } catch (error) {
      console.error('Full error object:', JSON.stringify(error, null, 2));

      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Stack trace:', error.stack);
      }
    }
  };

  return (
    <WebFirebaseProvider>
      <View>
        <Button title="Sign in with Google" onPress={signInWithGoogle} />
        <View>{user && <Text>Signed in as: {user.email}</Text>}</View>
      </View>
    </WebFirebaseProvider>
  );
};

export default GoogleSignInComponent;
