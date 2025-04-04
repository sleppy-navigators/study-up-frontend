import * as SecureStore from 'expo-secure-store';
import { PersistStorage, StorageValue } from 'zustand/middleware';

const secureStoreOptions: SecureStore.SecureStoreOptions = {
  requireAuthentication: false,
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
};

export const tokenStorage = {
  async getItem(name: string): Promise<StorageValue<string> | null> {
    const value = await SecureStore.getItemAsync(name, secureStoreOptions);
    if (!value) return null;
    return JSON.parse(value);
  },

  async setItem(name: string, value: StorageValue<string>): Promise<void> {
    await SecureStore.setItemAsync(
      name,
      JSON.stringify(value),
      secureStoreOptions
    );
  },

  async removeItem(name: string): Promise<void> {
    await SecureStore.deleteItemAsync(name, secureStoreOptions);
  },
} satisfies PersistStorage<string>;
