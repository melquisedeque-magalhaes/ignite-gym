import { useEffect, useState } from "react";

import { api } from "@services/api";
import { deleteUserStorage, getUserStorage, userSaveStorage } from "@storage/userStorage";
import { authStore } from "@store/authStore";
import { User } from "@typings/user";
import { authTokenStorageSave, deleteAuthTokenStorage, getAuthTokenStorage } from "@storage/authTokenStorage";

interface SignInProps {
  email: string
  password: string
}

interface StorageUserAndTokenProps {
  userData: User
  token: string
}

export function useAuth() {
  const { user, setUser, setToken, token } = authStore()

  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function userAndTokenUpdate({ token, userData }: StorageUserAndTokenProps) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(userData)
  }

  async function signIn({ email, password }: SignInProps) {
    try {
      const { data } = await api.post('sessions', {
        email, 
        password
      })
  
      if(data.user && data.token && data.refresh_token){
        setIsLoadingUserStorage(true)

        await userSaveStorage(data.user)
        await authTokenStorageSave({ token: data.token, refreshToken: data.refresh_token })
        userAndTokenUpdate({ token: data.token, userData: data.user })
      }
    }catch(error) {
      throw error
    } finally{
      setIsLoadingUserStorage(false)
    }
  }

  async function updateUser(user: User) {
    try {
      setIsLoadingUserStorage(true)
      
      setUser(user)
      await userSaveStorage(user)
    }catch(error){
      throw error
    }finally{
      setIsLoadingUserStorage(false)
    }
  }

  async function getUser() {
    try {
      const userStorage = await getUserStorage()
      const { token } = await getAuthTokenStorage()

      if(userStorage && token)
        userAndTokenUpdate({ userData: userStorage, token })
      
    }catch(error) {
      throw error
    }finally{
      setIsLoadingUserStorage(false)
    }
  }

  function updateToken(token: string) {
    setToken(token) 
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager({ signOut })

    return () => {
      subscribe()
    }
  }, [])

  async function signOut() {
    try {
      setIsLoadingUserStorage(true)
      setUser({} as User)
      
      await deleteUserStorage()
      await deleteAuthTokenStorage()
    }catch(error) {
      throw error
    }finally{
      setIsLoadingUserStorage(false)
    }
    
  }

  return {
    signIn,
    user,
    updateUser,
    signOut,
    isLoadingUserStorage,
    token
  }
}