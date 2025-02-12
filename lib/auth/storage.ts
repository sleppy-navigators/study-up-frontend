import * as SecureStore from 'expo-secure-store';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const TOKEN_KEY = 'auth_tokens';

const secureStoreOptions: SecureStore.SecureStoreOptions = {
  requireAuthentication: false, // 생체인증이 필요한 경우 true로 설정
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
};

export const tokenStorage = {
  async save(tokens: Tokens) {
    await SecureStore.setItemAsync(
      TOKEN_KEY,
      JSON.stringify(tokens),
      secureStoreOptions
    );
  },

  async get(): Promise<Tokens | null> {
    const tokens = await SecureStore.getItemAsync(
      TOKEN_KEY,
      secureStoreOptions
    );
    return tokens ? JSON.parse(tokens) : null;
  },

  async clear() {
    await SecureStore.deleteItemAsync(TOKEN_KEY, secureStoreOptions);
  },
};
