import { create } from 'zustand';
import * as Keychain from 'react-native-keychain';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'ADMIN';
  isOnboarded: boolean;
  studyPersona?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setCredentials: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setCredentials: async (user, token) => {
    try {
      set({ isLoading: true });
      // Store token securely in keychain. Using 'jwt' as username placeholder.
      await Keychain.setGenericPassword('jwt', token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Failed to save token to keychain:', error);
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await Keychain.resetGenericPassword();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error('Failed to remove token from keychain:', error);
      set({ isLoading: false });
    }
  },

  setUser: (user) => {
    set({ user });
  },
}));
