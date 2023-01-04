import { useEffect, useState } from "react";

import { api } from "@services/api";
import { deleteUserStorage, getUserStorage, userSaveStorage } from "@storage/userStorage";
import { authStore } from "@store/authStore";
import { User } from "@typings/user";

interface SignInProps {
  email: string
  password: string
}

export function useAuth() {
  const { user, setUser } = authStore()

  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function signIn({ email, password }: SignInProps) {
    try {
      const { data } = await api.post('sessions', {
        email, 
        password
      })
  
      if(data.user){
        setUser(data.user)
        await userSaveStorage(data.user)
      }
    }catch(error) {
      throw error
    }
  }

  async function getUser() {
    try {
      const userStorage = await getUserStorage()

      if(userStorage){
        setUser(userStorage)
      }
    }catch(error) {
      throw error
    }finally{
      setIsLoadingUserStorage(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  async function signOut() {
    try {
      setIsLoadingUserStorage(true)
      setUser({} as User)
      await deleteUserStorage()
    }catch(error) {
      throw error
    }finally{
      setIsLoadingUserStorage(false)
    }
    
  }

  return {
    signIn,
    user,
    signOut,
    isLoadingUserStorage
  }
}