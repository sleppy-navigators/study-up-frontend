import { match } from 'ts-pattern';

const APP_ID_PREFIX = 'com.sleppynavigators.studyup';
const APP_NAME_PREFIX = 'StudyUp';

const getUniqueIdentifier = () => {
  return match(process.env.APP_VARIANT)
    .with('development', () => `${APP_ID_PREFIX}.dev`)
    .with('preview', () => `${APP_ID_PREFIX}.preview`)
    .otherwise(() => APP_ID_PREFIX);
};

const getAppName = () => {
  return match(process.env.APP_VARIANT)
    .with('development', () => `${APP_NAME_PREFIX} (Dev)`)
    .with('preview', () => `${APP_NAME_PREFIX} (Preview)`)
    .otherwise(() => APP_NAME_PREFIX);
};

console.log('APP VARIANT', process.env.APP_VARIANT);
console.log('UNIQUE IDENTIFIER', getUniqueIdentifier());
console.log('APP NAME', getAppName());

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  slug: 'StudyUp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'studyup',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    config: {
      googleSignIn: {
        reservedClientId:
          '425832297557-vohrgrt63dp2trts5cput9kodgrqbu5e.apps.googleusercontent.com',
      },
    },
    googleServicesFile: './GoogleService-Info.plist',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#ffffff',
    },
    package: getUniqueIdentifier(),
    googleServicesFile: './google-services.json',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/icon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-splash-screen',
      {
        image: './assets/images/icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission:
          'Allow StudyUp to access your Face ID biometric data.',
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/pretendard/Pretendard-Thin.otf',
          './assets/fonts/pretendard/Pretendard-ExtraLight.otf',
          './assets/fonts/pretendard/Pretendard-Light.otf',
          './assets/fonts/pretendard/Pretendard-Regular.otf',
          './assets/fonts/pretendard/Pretendard-Medium.otf',
          './assets/fonts/pretendard/Pretendard-SemiBold.otf',
          './assets/fonts/pretendard/Pretendard-Bold.otf',
          './assets/fonts/pretendard/Pretendard-ExtraBold.otf',
          './assets/fonts/pretendard/Pretendard-Black.otf',
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '7537aea3-7b65-4ae8-b4e8-adf37b4768d1',
    },
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
