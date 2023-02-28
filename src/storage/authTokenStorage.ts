import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE, AUTH_REFRESH_TOKEN_STORAGE } from '@constants/storage';

interface AuthTokenStorageSaveProps {
  token: string
  refreshToken: string
}

export async function authTokenStorageSave({ refreshToken, token }: AuthTokenStorageSaveProps) {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
    await AsyncStorage.setItem(AUTH_REFRESH_TOKEN_STORAGE, refreshToken)
  }catch(error) {
    throw error
  }
}

export async function getAuthTokenStorage() {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
    const refreshToken = await AsyncStorage.getItem(AUTH_REFRESH_TOKEN_STORAGE)

    return {
      token,
      refreshToken
    }
  }catch(error){
    throw error
  }
}

export async function deleteAuthTokenStorage() {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
    await AsyncStorage.removeItem(AUTH_REFRESH_TOKEN_STORAGE)
  }catch(error) {
    throw error
  }
}