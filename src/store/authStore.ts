import { User } from '@typings/user'
import create from 'zustand'

interface AuthStore {
  user: User
  setUser: (state: User) => void
  refreshedToken: string
  setRefreshedToken: (state: string) => void
}

export const authStore = create<AuthStore>(set => ({
  user: {} as User,
  setUser: user => set(() => ({ user })),
  refreshedToken: '',
  setRefreshedToken: token => set(() => ({ refreshedToken: token }))
}))