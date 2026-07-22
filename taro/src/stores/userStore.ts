import { create } from 'zustand'
import type { User } from '@/types'

export const MOCK_USER: User = {
  id: 'user_001',
  phone: '13800138000',
  nickname: '舞者小A',
  avatar: '',
  balance: 50000,
  points: 100,
  createdAt: '2026-01-01T00:00:00+08:00'
}

interface UserState {
  user: User
  token: string
  isLoading: boolean

  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
  addBalance: (amount: number) => void
  addPoints: (amount: number) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: MOCK_USER,
  token: 'mock_token',
  isLoading: false,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () =>
    set({ user: { ...MOCK_USER, balance: 0, points: 0 }, token: '' }),
  addBalance: (amount) =>
    set((state) => ({
      user: { ...state.user, balance: state.user.balance + amount }
    })),
  addPoints: (amount) =>
    set((state) => ({
      user: { ...state.user, points: state.user.points + amount }
    }))
}))
