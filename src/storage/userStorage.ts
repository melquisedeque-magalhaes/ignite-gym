import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_STORAGE } from '@constants/storage';

import { User } from "@typings/user";


export async function userSaveStorage(user: User) {
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
  }catch (error) {
    throw error
  }
}

export async function getUserStorage() {
  try {
    const storage = await AsyncStorage.getItem(USER_STORAGE)

    const user:User = storage ? JSON.parse(storage) : {}

    return user
  }catch (error) {
    throw error
  }
}

export async function deleteUserStorage() {
  try {
    await AsyncStorage.removeItem(USER_STORAGE)
  }catch (error) {
    throw error
  }
}