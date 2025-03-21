import { atom, createStore } from 'jotai';
import { tokenStorage } from './storage';
import { TokenResponse } from '@/auth/api/types';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  isLoading: true,
};

export const authAtom = atom<AuthState>(initialState);
export const authStore = createStore();

export const authActions = {
  setTokens: async (tokens: TokenResponse) => {
    await tokenStorage.save(tokens);
    authStore.set(authAtom, {
      isAuthenticated: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isLoading: false,
    });
  },

  clearTokens: async () => {
    await tokenStorage.clear();
    authStore.set(authAtom, initialState);
  },

  loadTokens: async () => {
    const tokens = await tokenStorage.get();
    authStore.set(authAtom, (prevState) => {
      if (tokens) {
        return {
          ...prevState,
          isAuthenticated: true,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        };
      }
      return { ...prevState, isLoading: false };
    });
  },
};
