// utils/authUtils.ts
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAppLockPreference } from '@/utils/helpers';
import { removeToken } from './token';
import { User } from '@/types';

let setIsLoggedGlobal: (value: boolean) => void = () => { };
let setUseAppLockGlobal: (value: boolean) => void = () => { };

export const initializeGlobalAuthFunctions = (
  setIsLogged: (value: boolean) => void,
  setUseAppLock: (value: boolean) => void
) => {
  setIsLoggedGlobal = setIsLogged;
  setUseAppLockGlobal = setUseAppLock;
};

export const setLoggedInUserId = async (userId: string | null) => {
  try {
    if (userId) {
      await AsyncStorage.setItem('userId', userId);
      return;
    }
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Error setting userId:', error);
  }
}

export const getLoggedInUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error('Error getting userId:', error);
    return null;
  }
};

export const setUserAccounts = async (user: User) => {
  try {
    const userAccounts = await AsyncStorage.getItem('userAccounts');
    const accounts: User[] = userAccounts ? JSON.parse(userAccounts) : [];

    const existingUserIndex = accounts.findIndex((account: User) => account._id === user._id);

    if (existingUserIndex !== -1) {
      // Update existing user
      accounts[existingUserIndex] = user;
    } else {
      // Add new user
      accounts.push(user);
    }

    await AsyncStorage.setItem('userAccounts', JSON.stringify(accounts));
  } catch (error) {
    console.error('Error setting userAccounts:', error);
  }
}

export const getUserAccounts = async () => {
  try {
    const userAccounts = await AsyncStorage.getItem('userAccounts');
    return userAccounts ? JSON.parse(userAccounts) as User[] : [];
  } catch (error) {
    console.error('Error getting userAccounts:', error);
    return [];
  }
}

export const removeUserAccount = async (userId: string) => {
  try {
    const userAccounts = await AsyncStorage.getItem('userAccounts');
    const accounts: User[] = userAccounts ? JSON.parse(userAccounts) : [];
    const updatedAccounts = accounts.filter((account: User) => account._id !== userId);
    await AsyncStorage.setItem('userAccounts', JSON.stringify(updatedAccounts));
  } catch (error) {
    console.error('Error removing userAccount:', error);
  }
}

export const globalLogout = async (logoutType: 'MANUAL_LOGOUT' | 'SESSION_EXPIRED' = 'SESSION_EXPIRED') => {
  const userId = await getLoggedInUserId() as string;
  await removeToken(`accessToken:${userId}`);
  await removeToken(`refreshToken:${userId}`);
  await removeUserAccount(userId);
  await setLoggedInUserId(null);
  await setAppLockPreference(false);
  setIsLoggedGlobal(false);
  setUseAppLockGlobal(false);

  if (logoutType === 'SESSION_EXPIRED') {
    router.replace('/sign-in');
    return Toast.show({
      type: 'info',
      text1: 'Session Expired, Please Login Again.',
    });
  }

  router.replace('/');
};