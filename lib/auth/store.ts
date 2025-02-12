import { atom } from 'jotai';
import { tokenStorage } from './storage';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

export const authAtom = atom<AuthState>(initialState);

export const authActions = {
  setTokens: atom(
    null,
    async (get, set, tokens: { accessToken: string; refreshToken: string }) => {
      await tokenStorage.save(tokens);
      set(authAtom, {
        isAuthenticated: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    }
  ),

  clearTokens: atom(null, async (get, set) => {
    await tokenStorage.clear();
    set(authAtom, initialState);
  }),

  loadTokens: atom(null, async (get, set) => {
    const tokens = await tokenStorage.get();
    if (tokens) {
      set(authAtom, {
        isAuthenticated: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    }
  }),
};
