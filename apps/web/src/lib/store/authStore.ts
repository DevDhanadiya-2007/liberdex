import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import axios from 'axios';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

// Check if we're in the browser environment
const isBrowser = typeof window !== 'undefined';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: async (email: string, password: string) => {
                try {
                    const response = await axios.post<{ user: User }>(`${backend_url}/api/auth/login`, { email, password }, { withCredentials: true });
                    set({ isAuthenticated: true, user: response.data.user });
                } catch (error) {
                    console.error('Login error:', error);
                    throw error;
                }
            },
            logout: async () => {
                try {
                    await axios.post(`${backend_url}/api/auth/logout`, {}, { withCredentials: true });
                    set({ isAuthenticated: false, user: null });
                } catch (error) {
                    console.error('Logout error:', error);
                    throw error;
                }
            },
            checkAuthStatus: async () => {
                try {
                    const response = await axios.get<{ authenticated: boolean; user: User | null }>(`${backend_url}/api/auth/status`, { withCredentials: true });
                    set({ isAuthenticated: response.data.authenticated, user: response.data.user });
                } catch (error) {
                    set({ isAuthenticated: false, user: null });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: isBrowser ? (window.localStorage as unknown as PersistStorage<AuthState>) : undefined,
        }
    )
);
