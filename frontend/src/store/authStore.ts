import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User } from '../types'
import { authService } from '../services/api'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const response = await authService.login(email, password)
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        })
      },

      register: async (name: string, email: string, password: string) => {
        const response = await authService.register(name, email, password)
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
