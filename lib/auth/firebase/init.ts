import { initializeApp, getApp, getApps } from 'firebase/app';
import { webConfig } from './config';

export const initializeFirebase = () => {
  // Initialize Firebase for web
  if (!getApps().length) {
    initializeApp(webConfig);
  }
  return getApp();
};
