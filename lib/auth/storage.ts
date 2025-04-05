import * as SecureStore from 'expo-secure-store';
import { PersistStorage, StorageValue } from 'zustand/middleware';

const secureStoreOptions: SecureStore.SecureStoreOptions = {
  requireAuthentication: false,
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
};

interface StorageStateType {
  accessToken: string | null;
  refreshToken: string | null;
}

export const tokenStorage = {
  async getItem(name: string): Promise<StorageValue<StorageStateType> | null> {
    const value = await SecureStore.getItemAsync(name, secureStoreOptions);
    if (!value) return null;
    return JSON.parse(value) as StorageValue<StorageStateType>;
  },

  async setItem(
    name: string,
    value: StorageValue<StorageStateType>
  ): Promise<void> {
    await SecureStore.setItemAsync(
      name,
      JSON.stringify(value),
      secureStoreOptions
    );
  },

  async removeItem(name: string): Promise<void> {
    await SecureStore.deleteItemAsync(name, secureStoreOptions);
  },
} satisfies PersistStorage<StorageStateType>;
