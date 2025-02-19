import { Platform } from 'react-native';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { webConfig } from './config';

export const initializeFirebase = () => {
  if (Platform.OS === 'web') {
    // Initialize Firebase for web
    if (!getApps().length) {
      initializeApp(webConfig);
    }
    return getApp();
  }

  // Native platforms use @react-native-firebase/app
  // which auto-initializes with google-services.json and GoogleService-Info.plist
  return null;
};
