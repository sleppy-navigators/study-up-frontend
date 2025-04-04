import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tokenStorage } from '@/lib/auth/storage';
import { TokenResponse } from '../api/types';

export interface AuthStateType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthActionsType {
  login: (tokenResponse: TokenResponse) => void;
  logout: () => void;
  load: () => void;
  setError: (error: boolean) => void;
  getTokens: () => {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

export type AuthStoreType = AuthStateType & AuthActionsType;

const initialState: AuthStateType = {
  isAuthenticated: false,
  isLoading: true,
  isError: false,
  accessToken: null,
  refreshToken: null,
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: ({ accessToken, refreshToken }: TokenResponse) => {
        set({
          isAuthenticated: true,
          isLoading: false,
          accessToken,
          refreshToken,
        });
      },

      logout: () => {
        set({
          ...initialState,
          isLoading: false,
        });
      },

      load: () => {
        const { accessToken, refreshToken } = get();
        const hasTokens = !!accessToken && !!refreshToken;
        set((state) => ({
          ...state,
          isLoading: false,
          isAuthenticated: hasTokens,
        }));
      },

      setError: (error: boolean) => {
        set((state) => ({
          ...state,
          isError: error,
        }));
      },

      getTokens: () => {
        return {
          accessToken: get().accessToken,
          refreshToken: get().refreshToken,
        };
      },
    }),
    {
      name: 'auth-storage',
      storage: tokenStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            state?.setError(true);
          }
          if (state) {
            state.load();
          }
        };
      },
    }
  )
);
