import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from '@constants/storage';

export async function authTokenStorageSave(token: string) {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
  }catch(error) {
    throw error
  }
}

export async function getAuthTokenStorage() {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

    return token
  }catch(error){
    throw error
  }
}

export async function deleteAuthTokenStorage() {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
  }catch(error) {
    throw error
  }
}