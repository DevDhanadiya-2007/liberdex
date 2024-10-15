import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'

export function useAuth() {
    const { isAuthenticated, user, login, logout, checkAuthStatus } = useAuthStore()

    useEffect(() => {
        checkAuthStatus()
    }, [checkAuthStatus])

    return {
        isAuthenticated,
        user,
        login,
        logout,
        checkAuthStatus,
    }
}