import { User } from '@typings/user'
import create from 'zustand'

interface AuthStore {
  user: User
  setUser: (state: User) => void
  token: string
  setToken: (state: string) => void
}

export const authStore = create<AuthStore>(set => ({
  user: {} as User,
  setUser: user => set(() => ({ user })),
  token: '',
  setToken: token => set(() => ({ token }))
}))